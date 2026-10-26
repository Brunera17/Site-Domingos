import { isRedisConfigured, pipeline } from './_lib/redis.js'
import { chaveCidades, chaveEstados, diaLocal, regiaoDaRequisicao, RETENCAO_DIAS } from './_lib/visitas.js'

// Chamada pelo site uma vez por sessão do visitante (ver src/utils/registrarVisita.js).
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST')
        return res.status(405).json({ error: 'Método não permitido.' })
    }

    // Sem banco configurado, só ignora — o site não pode quebrar por causa disso.
    if (!isRedisConfigured()) {
        return res.status(204).end()
    }

    const { estado, cidade } = regiaoDaRequisicao(req.headers)
    const dia = diaLocal()
    const ttl = RETENCAO_DIAS * 24 * 60 * 60

    try {
        await pipeline([
            ['HINCRBY', chaveEstados(dia), estado, 1],
            ['HINCRBY', chaveCidades(dia), cidade, 1],
            ['EXPIRE', chaveEstados(dia), ttl],
            ['EXPIRE', chaveCidades(dia), ttl],
        ])
    } catch (error) {
        console.error('Falha ao registrar visita:', error)
    }

    return res.status(204).end()
}
