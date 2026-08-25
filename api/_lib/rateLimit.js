// Rate limit em memória, por IP. Best-effort: cada instância "quente" da
// function guarda seu próprio contador (não é compartilhado entre instâncias
// nem sobrevive a cold starts), então não segura um ataque distribuído — mas
// barra a maioria dos loops simples de um único IP, como o do exemplo de
// reprodução da issue de abuso do formulário, sem exigir nenhuma infra nova
// (Vercel KV / Upstash Redis). Trocar por um rate limit real requer um
// armazenamento compartilhado — ver a issue para o plano de migração.

const hits = new Map() // ip -> timestamps (ms) das requisições recentes
const MAX_TRACKED_IPS = 5000

export function getClientIp(req) {
    const forwarded = req.headers['x-forwarded-for']
    if (typeof forwarded === 'string' && forwarded.length > 0) {
        return forwarded.split(',')[0].trim()
    }
    return req.socket?.remoteAddress || 'unknown'
}

export function isRateLimited(ip, { max = 5, windowMs = 10 * 60 * 1000 } = {}) {
    const now = Date.now()
    const isNewIp = !hits.has(ip)

    // Só tenta abrir espaço quando for preciso passar a rastrear um IP que
    // ainda não está na Map e ela já estiver no teto — nunca mexe nas
    // entradas de IPs já rastreados só porque a Map cresceu.
    if (isNewIp && hits.size >= MAX_TRACKED_IPS) {
        evictExpired(now, windowMs)
    }

    const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs)
    recent.push(now)

    // Se ainda estiver no teto depois de descartar o que expirou de verdade,
    // não há como abrir uma vaga pra um IP nunca visto antes sem sacrificar
    // o contador de outro IP — então a requisição é bloqueada (fail-closed)
    // em vez de liberada. Deixar passar aqui (fail-open) reabriria o
    // problema: como getClientIp confia em qualquer valor de
    // X-Forwarded-For, bastaria variar o header a cada requisição pra nunca
    // ser rastreado e nunca ser bloqueado.
    if (!isNewIp || hits.size < MAX_TRACKED_IPS) {
        hits.set(ip, recent)
        return recent.length > max
    }
    return true
}

// Descarta só entradas totalmente expiradas — nenhum timestamp dentro da
// janela restante. Nunca remove uma entrada que ainda importa, mesmo que a
// Map esteja cheia. É a diferença central em relação ao bug corrigido aqui:
// um `Map.clear()` (ou qualquer eviction por LRU/ordem de inserção) apagaria
// também o contador de um IP legitimamente bloqueado assim que atacantes
// suficientes — variando o IP, ou o cabeçalho X-Forwarded-For que
// getClientIp confia sem validar — empurrassem a Map além do teto. Com essa
// abordagem, o pior caso de um flood de IPs novos é a Map ficar
// temporariamente maior que o teto (até os próprios IPs do flood expirarem)
// ou deixar de rastrear IPs novos enquanto durar a pressão — nunca perder a
// proteção de um IP já rastreado.
function evictExpired(now, windowMs) {
    for (const [key, timestamps] of hits) {
        if (timestamps.every((t) => now - t >= windowMs)) {
            hits.delete(key)
        }
    }
}
