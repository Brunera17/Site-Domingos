// Sessão do painel: depois do login, o navegador recebe um cookie HttpOnly
// assinado (HMAC) com validade de 8h. A senha nunca fica guardada no
// navegador e o JavaScript da página não consegue ler o cookie.
//
// A chave de assinatura deriva de PAINEL_SEGREDO (ou, na falta dele, da
// própria PAINEL_SENHA): trocar qualquer um dos dois na Vercel derruba
// todas as sessões abertas na hora.

import { createHmac, createHash, randomBytes, timingSafeEqual } from 'node:crypto'

export const COOKIE = 'painel_sessao'
const DURACAO_S = 8 * 60 * 60

function chave() {
    const base = process.env.PAINEL_SEGREDO || process.env.PAINEL_SENHA
    return base ? createHmac('sha256', base).update('painel-sessao-v1').digest() : null
}

function assinar(texto, k) {
    return createHmac('sha256', k).update(texto).digest('base64url')
}

function iguais(a, b) {
    const x = Buffer.from(String(a))
    const y = Buffer.from(String(b))
    return x.length === y.length && timingSafeEqual(x, y)
}

export function senhaConfigurada() {
    return Boolean(process.env.PAINEL_SENHA)
}

export function senhaCorreta(recebida) {
    const esperada = process.env.PAINEL_SENHA
    if (!esperada || typeof recebida !== 'string') return false
    // Compara os hashes: mesmo tamanho sempre, sem vazar o tamanho da senha.
    const a = createHash('sha256').update(recebida).digest()
    const b = createHash('sha256').update(esperada).digest()
    return timingSafeEqual(a, b)
}

export function criarToken(agora = Date.now()) {
    const k = chave()
    const expira = Math.floor(agora / 1000) + DURACAO_S
    const corpo = `${expira}.${randomBytes(9).toString('base64url')}`
    return { token: `${corpo}.${assinar(corpo, k)}`, expira }
}

export function tokenValido(token, agora = Date.now()) {
    const k = chave()
    if (!k || typeof token !== 'string') return false
    const partes = token.split('.')
    if (partes.length !== 3) return false
    const [expira, nonce, assinatura] = partes
    if (!iguais(assinatura, assinar(`${expira}.${nonce}`, k))) return false
    return Number(expira) > Math.floor(agora / 1000)
}

export function lerCookie(req, nome = COOKIE) {
    const cabecalho = req.headers.cookie || ''
    for (const parte of cabecalho.split(';')) {
        const [k, ...v] = parte.trim().split('=')
        if (k === nome) return v.join('=')
    }
    return null
}

// Path=/api/painel: o cookie só vai junto nas chamadas do painel.
export function cookieSessao(token) {
    return `${COOKIE}=${token}; Path=/api/painel; Max-Age=${DURACAO_S}; HttpOnly; Secure; SameSite=Strict`
}

export function cookieExpirado() {
    return `${COOKIE}=; Path=/api/painel; Max-Age=0; HttpOnly; Secure; SameSite=Strict`
}

export function autenticado(req) {
    return tokenValido(lerCookie(req))
}
