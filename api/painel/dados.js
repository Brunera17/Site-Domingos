import {
    agruparDia, CHAVE_COORDENADAS, chaveDia, ESCRITORIO, FAIXAS_DISTANCIA, paresDoHash,
    ranking, SEM_LOCALIZACAO, ultimosDias,
} from '../_lib/analytics.js'
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

// Uma linha por cidade: visitas, contatos, origem principal e coordenada.
function detalharCidades(atual, coordenadas) {
    const visitas = atual.cidade || {}
    const contatos = atual.lead_cidade || {}
    const origens = {}
    for (const [chave, n] of Object.entries(atual.cidade_origem || {})) {
        const i = chave.lastIndexOf('|')
        const cidade = chave.slice(0, i)
        const origem = chave.slice(i + 1)
        if (!origens[cidade] || n > origens[cidade].n) origens[cidade] = { origem, n }
    }
    const nomes = new Set([...Object.keys(visitas), ...Object.keys(contatos)])
    return [...nomes]
        .map((nome) => {
            const [lat, lon] = (coordenadas[nome] || '').split(',').map(Number)
            return {
                nome,
                visitas: visitas[nome] || 0,
                contatos: contatos[nome] || 0,
                origem: origens[nome]?.origem || null,
                ...(Number.isFinite(lat) && Number.isFinite(lon) && coordenadas[nome] ? { lat, lon } : {}),
            }
        })
        .sort((a, b) => b.visitas - a.visitas || b.contatos - a.contatos)
        .slice(0, 500)
}

function porDistancia(atual, totalSessoes) {
    const linhas = FAIXAS_DISTANCIA.map(([, faixa]) => ({
        faixa,
        visitas: atual.dist?.[faixa] || 0,
        contatos: atual.dist_lead?.[faixa] || 0,
    }))
    // Visitas de fora do Brasil ou sem coordenada.
    const comLocal = linhas.reduce((s, l) => s + l.visitas, 0)
    linhas.push({
        faixa: SEM_LOCALIZACAO,
        visitas: Math.max(0, totalSessoes - comLocal),
        contatos: atual.dist_lead?.[SEM_LOCALIZACAO] || 0,
    })
    return linhas
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
        const resultados = await pipeline([
            ...listaDias.map((dia) => ['HGETALL', chaveDia(dia)]),
            ['HGETALL', CHAVE_COORDENADAS],
        ])
        const coordenadas = Object.fromEntries(paresDoHash(resultados.pop()))
        const grupos = resultados.map(agruparDia)
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
            cidades: detalharCidades(atual, coordenadas),
            distancias: porDistancia(atual, totais(atual).sessoes),
            escritorio: ESCRITORIO,
            seguranca: { acessos: await ultimosAcessosPainel(50) },
        })
    } catch (error) {
        console.error('Falha ao ler métricas:', error)
        return res.status(500).json({ error: 'Não foi possível carregar os dados.' })
    }
}
