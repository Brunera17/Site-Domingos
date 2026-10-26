import {
    camposDeContato, classificarOrigem, comandoCoordenada, ehRobo, horaLocal, incrementar,
    localDaRequisicao, navegador, normalizarPagina, tipoDispositivo,
} from './_lib/analytics.js'
import { excedeuLimite } from './_lib/seguranca.js'

// Recebe os eventos de navegação mandados por src/utils/rastreamento.js:
//   sessao   → primeira página da visita (região, aparelho, origem, horário)
//   pagina   → cada página vista
//   whatsapp / telefone / email → clique num botão de contato
const CLIQUES = new Set(['whatsapp', 'telefone', 'email'])

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST')
        return res.status(405).json({ error: 'Método não permitido.' })
    }

    // Sempre 204: quem estiver abusando não recebe sinal de que foi ignorado.
    const ua = req.headers['user-agent'] || ''
    if (ehRobo(ua)) return res.status(204).end()
    if (await excedeuLimite(req, 'evento', { max: 120, janelaS: 3600 })) return res.status(204).end()

    const { tipo, pagina, origem } = req.body || {}
    const caminho = normalizarPagina(pagina)
    const campos = []
    let extras = []

    if (tipo === 'sessao') {
        const local = localDaRequisicao(req.headers)
        const fonte = classificarOrigem(origem)
        campos.push(
            't:sessoes',
            `estado:${local.estado}`,
            `cidade:${local.cidade}`,
            `cidade_origem:${local.cidade}|${fonte}`,
            `dist:${local.faixa}`,
            `disp:${tipoDispositivo(ua)}`,
            `nav:${navegador(ua)}`,
            `origem:${fonte}`,
            `hora:${horaLocal()}`,
        )
        if (caminho) campos.push(`entrada:${caminho}`)
        extras = comandoCoordenada(local.cidade, local.coord)
    } else if (tipo === 'pagina' && caminho) {
        campos.push('t:paginas', `pagina:${caminho}`)
    } else if (CLIQUES.has(tipo)) {
        campos.push(...camposDeContato(tipo, localDaRequisicao(req.headers)))
        if (caminho) campos.push(`clique_pagina:${caminho}`)
    }

    await incrementar(campos, { extras })
    return res.status(204).end()
}
