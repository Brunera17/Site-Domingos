// Rate limit em memória, por IP. Best-effort: cada instância "quente" da
// function guarda seu próprio contador (não é compartilhado entre instâncias
// nem sobrevive a cold starts), então não segura um ataque distribuído — mas
// barra a maioria dos loops simples de um único IP, como o do exemplo de
// reprodução da issue de abuso do formulário, sem exigir nenhuma infra nova
// (Vercel KV / Upstash Redis). Trocar por um rate limit real requer um
// armazenamento compartilhado — ver a issue para o plano de migração.

const hits = new Map() // ip -> timestamps (ms) das requisições recentes

export function getClientIp(req) {
    const forwarded = req.headers['x-forwarded-for']
    if (typeof forwarded === 'string' && forwarded.length > 0) {
        return forwarded.split(',')[0].trim()
    }
    return req.socket?.remoteAddress || 'unknown'
}

export function isRateLimited(ip, { max = 5, windowMs = 10 * 60 * 1000 } = {}) {
    const now = Date.now()
    const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs)
    recent.push(now)
    hits.set(ip, recent)

    // Evita crescimento sem limite da Map ao longo da vida da instância.
    if (hits.size > 5000) hits.clear()

    return recent.length > max
}
