// Contadores de visitas por região, guardados no Redis em dois hashes por
// dia: um por estado e outro por cidade. Só contagens agregadas — nenhum IP
// ou dado pessoal é armazenado.

export const RETENCAO_DIAS = 400

export function chaveEstados(dia) {
    return `visitas:estados:${dia}`
}

export function chaveCidades(dia) {
    return `visitas:cidades:${dia}`
}

// Data no fuso de Brasília (YYYY-MM-DD), pra "dia" bater com o do escritório.
export function diaLocal(date = new Date()) {
    return date.toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' })
}

export function ultimosDias(quantidade, hoje = new Date()) {
    const dias = []
    for (let i = 0; i < quantidade; i++) {
        dias.push(diaLocal(new Date(hoje.getTime() - i * 24 * 60 * 60 * 1000)))
    }
    return dias
}

// Lê a localização aproximada que a Vercel injeta em toda requisição.
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

// Converte a lista de HGETALL (um objeto { campo: "n" } por dia) num ranking.
export function somarRanking(hashes) {
    const totais = new Map()
    for (const hash of hashes) {
        if (!hash) continue
        // A API REST do Upstash devolve HGETALL como array [campo, valor, ...].
        const pares = Array.isArray(hash) ? paresDeArray(hash) : Object.entries(hash)
        for (const [nome, valor] of pares) {
            totais.set(nome, (totais.get(nome) || 0) + Number(valor))
        }
    }
    return [...totais.entries()]
        .map(([nome, total]) => ({ nome, total }))
        .sort((a, b) => b.total - a.total)
}

function paresDeArray(lista) {
    const pares = []
    for (let i = 0; i < lista.length; i += 2) pares.push([lista[i], lista[i + 1]])
    return pares
}
