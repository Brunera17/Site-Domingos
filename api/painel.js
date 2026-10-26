import { timingSafeEqual } from 'node:crypto'
import { getClientIp, isRateLimited } from './_lib/rateLimit.js'
import { isRedisConfigured, pipeline } from './_lib/redis.js'
import { chaveCidades, chaveEstados, somarRanking, ultimosDias } from './_lib/visitas.js'

const PERIODOS_PERMITIDOS = [1, 7, 30, 90]

function senhaCorreta(recebida) {
    const esperada = process.env.PAINEL_SENHA
    if (!esperada || typeof recebida !== 'string') return false
    const a = Buffer.from(recebida)
    const b = Buffer.from(esperada)
    return a.length === b.length && timingSafeEqual(a, b)
}

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET')
        return res.status(405).json({ error: 'Método não permitido.' })
    }

    // Sem a variável, nenhuma senha funcionaria — avisa em vez de dizer "senha incorreta".
    if (!process.env.PAINEL_SENHA) {
        return res.status(500).json({ error: 'Senha do painel não configurada no servidor (PAINEL_SENHA).' })
    }

    const auth = req.headers.authorization || ''
    const senha = auth.startsWith('Bearer ') ? auth.slice(7) : ''

    if (!senhaCorreta(senha)) {
        // Só conta tentativas erradas, pra dificultar chutar a senha.
        if (isRateLimited(`painel:${getClientIp(req)}`, { max: 10 })) {
            return res.status(429).json({ error: 'Muitas tentativas. Aguarde alguns minutos.' })
        }
        return res.status(401).json({ error: 'Senha incorreta.' })
    }

    if (!isRedisConfigured()) {
        return res.status(500).json({ error: 'Banco de dados não configurado no servidor.' })
    }

    const dias = Number(req.query?.dias)
    const periodo = PERIODOS_PERMITIDOS.includes(dias) ? dias : 30
    const listaDias = ultimosDias(periodo)

    try {
        const resultados = await pipeline([
            ...listaDias.map((dia) => ['HGETALL', chaveEstados(dia)]),
            ...listaDias.map((dia) => ['HGETALL', chaveCidades(dia)]),
        ])
        const estados = somarRanking(resultados.slice(0, periodo))
        const cidades = somarRanking(resultados.slice(periodo)).slice(0, 20)
        const total = estados.reduce((soma, e) => soma + e.total, 0)

        res.setHeader('Cache-Control', 'no-store')
        return res.status(200).json({ periodo, total, estados, cidades })
    } catch (error) {
        console.error('Falha ao ler visitas:', error)
        return res.status(500).json({ error: 'Não foi possível carregar os dados.' })
    }
}
