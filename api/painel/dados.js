import { agruparDia, chaveDia, ranking, ultimosDias } from '../_lib/analytics.js'
import { autenticado } from '../_lib/painelAuth.js'
import { isRedisConfigured, pipeline } from '../_lib/redis.js'
import { ultimosAcessosPainel } from '../_lib/seguranca.js'

const PERIODOS_PERMITIDOS = [1, 7, 30, 90]
const TOTAIS = ['sessoes', 'paginas', 'contatos', 'candidaturas', 'whatsapp', 'telefone', 'email', 'login_ok', 'login_falha']
const RANKINGS = {
    estados: 'estado',
    cidades: 'cidade',
    paginas: 'pagina',
    entradas: 'entrada',
    origens: 'origem',
    dispositivos: 'disp',
    navegadores: 'nav',
    leadsEstados: 'lead_estado',
    cliquesPaginas: 'clique_pagina',
}

function somar(dias) {
    const acumulado = {}
    for (const grupos of dias) {
        for (const [dim, valores] of Object.entries(grupos)) {
            acumulado[dim] ??= {}
            for (const [nome, n] of Object.entries(valores)) {
                acumulado[dim][nome] = (acumulado[dim][nome] || 0) + n
            }
        }
    }
    return acumulado
}

function totais(acumulado) {
    return Object.fromEntries(TOTAIS.map((t) => [t, acumulado.t?.[t] || 0]))
}

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store')
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET')
        return res.status(405).json({ error: 'Método não permitido.' })
    }
    if (!autenticado(req)) {
        return res.status(401).json({ error: 'Sessão expirada. Entre novamente.' })
    }
    if (!isRedisConfigured()) {
        return res.status(500).json({ error: 'Banco de dados não configurado no servidor.' })
    }

    const dias = Number(req.query?.dias)
    const periodo = PERIODOS_PERMITIDOS.includes(dias) ? dias : 30
    // Lê o período atual e o anterior, do mesmo tamanho, pra comparar.
    const listaDias = ultimosDias(periodo * 2)

    try {
        const hashes = await pipeline(listaDias.map((dia) => ['HGETALL', chaveDia(dia)]))
        const grupos = hashes.map(agruparDia)
        const atual = somar(grupos.slice(0, periodo))
        const anterior = somar(grupos.slice(periodo))

        const serie = listaDias.slice(0, periodo).map((dia, i) => ({ dia, ...totais(grupos[i]) })).reverse()

        const semana = Array(7).fill(0)
        serie.forEach(({ dia, sessoes }) => {
            semana[new Date(`${dia}T12:00:00Z`).getUTCDay()] += sessoes
        })
        const horas = Array.from({ length: 24 }, (_, h) => atual.hora?.[h] || 0)

        const rankings = Object.fromEntries(
            Object.entries(RANKINGS).map(([nome, dim]) => [nome, ranking(atual[dim])])
        )

        return res.status(200).json({
            periodo,
            totais: totais(atual),
            anterior: totais(anterior),
            serie,
            horas,
            semana,
            rankings,
            seguranca: { acessos: await ultimosAcessosPainel(50) },
        })
    } catch (error) {
        console.error('Falha ao ler métricas:', error)
        return res.status(500).json({ error: 'Não foi possível carregar os dados.' })
    }
}
