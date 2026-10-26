// Cliente mínimo do Upstash Redis via REST (sem dependência nova).
// A integração do Upstash no Marketplace da Vercel cria as variáveis
// KV_REST_API_URL / KV_REST_API_TOKEN; criando o banco direto no Upstash,
// os nomes são UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.

function config() {
    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
    return url && token ? { url, token } : null
}

export function isRedisConfigured() {
    return config() !== null
}

// Executa vários comandos numa única requisição. Retorna o `result` de cada
// comando, na mesma ordem.
export async function pipeline(commands) {
    const cfg = config()
    if (!cfg) throw new Error('Redis não configurado.')

    const response = await fetch(`${cfg.url}/pipeline`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${cfg.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(commands),
    })
    if (!response.ok) throw new Error(`Upstash respondeu ${response.status}`)

    const results = await response.json()
    return results.map((r) => {
        if (r.error) throw new Error(r.error)
        return r.result
    })
}
