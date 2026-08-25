// Rate limit em memória, por IP. Best-effort: cada instância "quente" da
// function guarda seu próprio contador (não é compartilhado entre instâncias
// nem sobrevive a cold starts), então não segura um ataque distribuído — mas
// barra a maioria dos loops simples de um único IP, como o do exemplo de
// reprodução da issue de abuso do formulário, sem exigir nenhuma infra nova
// (Vercel KV / Upstash Redis). Trocar por um rate limit real requer um
// armazenamento compartilhado — ver a issue para o plano de migração.

const hits = new Map() // ip -> timestamps (ms) das requisições recentes
const MAX_TRACKED_IPS = 5000
const EVICTION_BATCH_SIZE = 100
let evictionCursor = null // iterador retomado entre chamadas, ver evictExpired()

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
//
// A varredura é incremental (custo amortizado), não completa a cada
// chamada: com a Map no teto, um flood de IPs novos passa a chamar essa
// função em toda requisição — enquanto a janela de 10min não vira, quase
// nada está de fato expirado, então uma varredura completa (O(tamanho da
// Map) por chamada) vira ela mesma um jeito barato do atacante gastar CPU
// da function a cada requisição. Aqui só até EVICTION_BATCH_SIZE entradas
// são checadas por chamada, retomando de onde parou da vez anterior — o
// custo por requisição fica limitado a uma constante, independente de
// quantos IPs estão rastreados, e o cursor cicla pela Map inteira ao longo
// de chamadas sucessivas.
function evictExpired(now, windowMs) {
    if (evictionCursor === null) {
        evictionCursor = hits.entries()
    }
    for (let i = 0; i < EVICTION_BATCH_SIZE; i++) {
        const next = evictionCursor.next()
        if (next.done) {
            evictionCursor = null
            break
        }
        const [key, timestamps] = next.value
        if (timestamps.every((t) => now - t >= windowMs)) {
            hits.delete(key)
        }
    }
}
