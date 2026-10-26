import {
    classificarOrigem, ehRobo, horaLocal, incrementar, navegador,
    normalizarPagina, regiaoDaRequisicao, tipoDispositivo,
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

    if (tipo === 'sessao') {
        const { estado, cidade } = regiaoDaRequisicao(req.headers)
        campos.push(
            't:sessoes',
            `estado:${estado}`,
            `cidade:${cidade}`,
            `disp:${tipoDispositivo(ua)}`,
            `nav:${navegador(ua)}`,
            `origem:${classificarOrigem(origem)}`,
            `hora:${horaLocal()}`,
        )
        if (caminho) campos.push(`entrada:${caminho}`)
    } else if (tipo === 'pagina' && caminho) {
        campos.push('t:paginas', `pagina:${caminho}`)
    } else if (CLIQUES.has(tipo)) {
        const { estado } = regiaoDaRequisicao(req.headers)
        campos.push(`t:${tipo}`, `lead_estado:${estado}`)
        if (caminho) campos.push(`clique_pagina:${caminho}`)
    }

    await incrementar(campos)
    return res.status(204).end()
}
