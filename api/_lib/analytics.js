// Métricas do painel (/painel). Tudo é guardado como contagem agregada num
// único hash do Redis por dia ("a:AAAA-MM-DD"), com campos "dimensão:valor"
// (ex.: "estado:SP", "pagina:/servicos", "t:sessoes"). Um HGETALL por dia
// basta pra montar o painel inteiro. Nenhum IP ou dado pessoal é guardado.

import { isRedisConfigured, pipeline } from './redis.js'

export const RETENCAO_DIAS = 400
const TTL_DIA = RETENCAO_DIAS * 24 * 60 * 60

export function chaveDia(dia) {
    return `a:${dia}`
}

// ── Datas no fuso de Brasília ───────────────────────────────────────────────

export function diaLocal(date = new Date()) {
    return date.toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' })
}

export function horaLocal(date = new Date()) {
    return Number(date.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo', hour: '2-digit', hourCycle: 'h23' }))
}

// Do mais recente pro mais antigo, começando por hoje.
export function ultimosDias(quantidade, hoje = new Date()) {
    const dias = []
    for (let i = 0; i < quantidade; i++) {
        dias.push(diaLocal(new Date(hoje.getTime() - i * 24 * 60 * 60 * 1000)))
    }
    return dias
}

// ── Classificação da requisição ─────────────────────────────────────────────

// Localização aproximada que a Vercel injeta em toda requisição.
// A cidade vem codificada (ex.: "S%C3%A3o%20Paulo").
export function regiaoDaRequisicao(headers) {
    const pais = headers['x-vercel-ip-country']
    const uf = headers['x-vercel-ip-country-region']
    let cidade = headers['x-vercel-ip-city']
    try {
        cidade = cidade ? decodeURIComponent(cidade) : ''
    } catch {
        cidade = ''
    }

    if (!pais) return { estado: 'Desconhecido', cidade: 'Desconhecida' }
    if (pais !== 'BR') return { estado: `Exterior (${pais})`, cidade: `Exterior (${pais})` }

    const estado = uf || 'Desconhecido'
    return { estado, cidade: cidade ? `${cidade} - ${estado}` : `Desconhecida - ${estado}` }
}

const BOT_UA = /bot|crawl|spider|slurp|headless|lighthouse|preview|facebookexternalhit|whatsapp\//i

export function ehRobo(userAgent = '') {
    return !userAgent || BOT_UA.test(userAgent)
}

export function tipoDispositivo(userAgent = '') {
    if (/iPad|Tablet/i.test(userAgent)) return 'Tablet'
    if (/Mobi|Android|iPhone/i.test(userAgent)) return 'Celular'
    return 'Computador'
}

export function navegador(userAgent = '') {
    if (/Edg\//.test(userAgent)) return 'Edge'
    if (/OPR\//.test(userAgent)) return 'Opera'
    if (/SamsungBrowser/.test(userAgent)) return 'Samsung Internet'
    if (/Firefox\//.test(userAgent)) return 'Firefox'
    if (/Chrome\//.test(userAgent)) return 'Chrome'
    if (/Safari\//.test(userAgent)) return 'Safari'
    return 'Outro'
}

const ORIGENS_CONHECIDAS = [
    [/(^|\.)google\./, 'Google'],
    [/(^|\.)bing\.com$/, 'Bing'],
    [/(^|\.)instagram\.com$/, 'Instagram'],
    [/(^|\.)(facebook\.com|fb\.com|fb\.me)$/, 'Facebook'],
    [/(^|\.)(linkedin\.com|lnkd\.in)$/, 'LinkedIn'],
    [/(^|\.)(whatsapp\.com|wa\.me)$/, 'WhatsApp'],
    [/(^|\.)(youtube\.com|youtu\.be)$/, 'YouTube'],
    [/(^|\.)(t\.co|twitter\.com|x\.com)$/, 'X (Twitter)'],
    [/(^|\.)domingosassessoria\.com\.br$/, 'Direto'],
    [/(^|\.)vercel\.app$/, 'Direto'],
]

// O navegador manda só o domínio de onde a pessoa veio (nunca a URL inteira)
// e, se houver, o utm_source / a marca de anúncio do Google.
export function classificarOrigem({ host, utm, anuncio } = {}) {
    if (anuncio) return 'Google Ads'
    if (typeof utm === 'string' && /^[a-z0-9_.-]{1,30}$/i.test(utm)) return `Campanha: ${utm.toLowerCase()}`
    if (typeof host !== 'string' || !host) return 'Direto'

    const h = host.toLowerCase().replace(/^www\./, '')
    if (!/^[a-z0-9.-]{1,60}$/.test(h)) return 'Outros sites'
    const conhecida = ORIGENS_CONHECIDAS.find(([re]) => re.test(h))
    return conhecida ? conhecida[1] : h
}

// Só rotas que existem no site entram no ranking — evita que alguém encha o
// banco com caminhos inventados.
const ROTAS = new Set([
    '/', '/sobre', '/servicos', '/blog', '/contato', '/planos', '/proposta',
    '/trabalhe-conosco', '/politica-privacidade', '/termos-uso',
])
const ROTAS_COM_ID = /^\/(servicos|blog)\/[a-z0-9-]{1,80}$/

export function normalizarPagina(caminho) {
    if (typeof caminho !== 'string') return null
    const p = caminho.toLowerCase().replace(/\/+$/, '') || '/'
    if (ROTAS.has(p) || ROTAS_COM_ID.test(p)) return p
    return '(página não encontrada)'
}

// ── Escrita ─────────────────────────────────────────────────────────────────

// Soma +1 em cada campo informado, no hash do dia. Nunca lança exceção:
// métrica com problema não pode derrubar o site nem um formulário.
export async function incrementar(campos, date = new Date()) {
    if (!isRedisConfigured() || campos.length === 0) return
    const chave = chaveDia(diaLocal(date))
    try {
        await pipeline([...campos.map((campo) => ['HINCRBY', chave, campo, 1]), ['EXPIRE', chave, TTL_DIA]])
    } catch (error) {
        console.error('Falha ao registrar métrica:', error)
    }
}

// Chamado pelos formulários quando o envio dá certo.
export function registrarConversao(req, tipo) {
    const { estado } = regiaoDaRequisicao(req.headers)
    return incrementar([`t:${tipo}`, `lead_estado:${estado}`])
}

// ── Leitura ─────────────────────────────────────────────────────────────────

// A API REST do Upstash devolve HGETALL como array [campo, valor, ...].
function paresDoHash(hash) {
    if (!hash) return []
    if (!Array.isArray(hash)) return Object.entries(hash)
    const pares = []
    for (let i = 0; i < hash.length; i += 2) pares.push([hash[i], hash[i + 1]])
    return pares
}

// Separa "dimensão:valor" e soma por dimensão.
export function agruparDia(hash) {
    const grupos = {}
    for (const [campo, valor] of paresDoHash(hash)) {
        const i = campo.indexOf(':')
        if (i < 0) continue
        const dim = campo.slice(0, i)
        const nome = campo.slice(i + 1)
        grupos[dim] ??= {}
        grupos[dim][nome] = (grupos[dim][nome] || 0) + Number(valor)
    }
    return grupos
}

export function ranking(mapa = {}, limite = 50) {
    return Object.entries(mapa)
        .map(([nome, total]) => ({ nome, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, limite)
}
