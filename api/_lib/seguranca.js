// Proteções compartilhadas (rate limit e registro de acessos ao painel),
// guardadas no Redis pra valer entre todas as instâncias da function. Sem
// Redis configurado, cai no rate limit em memória que já existe.

import { createHash } from 'node:crypto'
import { isRedisConfigured, pipeline } from './redis.js'
import { getClientIp, isRateLimited } from './rateLimit.js'

// Identificador temporário do visitante pros contadores de rate limit: hash
// do IP com um segredo do servidor, guardado no máximo por 1h. O IP em si
// nunca vai pro banco.
export function idCliente(req) {
    const segredo = process.env.PAINEL_SEGREDO || process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || ''
    return createHash('sha256').update(`${getClientIp(req)}|${segredo}`).digest('base64url').slice(0, 22)
}

// Conta uma ocorrência e diz se passou do limite na janela.
export async function excedeuLimite(req, nome, { max, janelaS }) {
    const id = idCliente(req)
    if (!isRedisConfigured()) {
        return isRateLimited(`${nome}:${id}`, { max, windowMs: janelaS * 1000 })
    }
    const chave = `rl:${nome}:${id}`
    try {
        const [total] = await pipeline([['INCR', chave], ['EXPIRE', chave, janelaS, 'NX']])
        return total > max
    } catch (error) {
        console.error('Falha no rate limit:', error)
        return false
    }
}

export async function zerarLimite(req, nome) {
    if (!isRedisConfigured()) return
    try {
        await pipeline([['DEL', `rl:${nome}:${idCliente(req)}`]])
    } catch {
        // não é crítico
    }
}

const LOG = 'seg:acessos'
const LOG_MAX = 200

export async function registrarAcessoPainel(entrada) {
    if (!isRedisConfigured()) return
    try {
        await pipeline([
            ['LPUSH', LOG, JSON.stringify({ em: new Date().toISOString(), ...entrada })],
            ['LTRIM', LOG, 0, LOG_MAX - 1],
        ])
    } catch (error) {
        console.error('Falha ao registrar acesso ao painel:', error)
    }
}

export async function ultimosAcessosPainel(quantidade = 50) {
    const [lista] = await pipeline([['LRANGE', LOG, 0, quantidade - 1]])
    return (lista || []).flatMap((item) => {
        try {
            return [JSON.parse(item)]
        } catch {
            return []
        }
    })
}
