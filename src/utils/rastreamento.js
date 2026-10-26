// Manda eventos de navegação pra api/evento.js. O servidor descobre região,
// aparelho e horário sozinho; daqui só vão a página, o domínio de onde a
// pessoa veio e cliques em botões de contato. Nada que identifique alguém.

const CHAVE_SESSAO = 'sessao-registrada'
let cliquesAtivos = false

function desligado(caminho) {
    // Não conta o ambiente de desenvolvimento nem quem está olhando o painel.
    return import.meta.env.DEV || caminho.startsWith('/painel')
}

function enviar(evento) {
    fetch('/api/evento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(evento),
        keepalive: true,
    }).catch(() => {})
}

function origemDaVisita() {
    const params = new URLSearchParams(window.location.search)
    let host = ''
    try {
        host = document.referrer ? new URL(document.referrer).hostname : ''
    } catch {
        host = ''
    }
    if (host === window.location.hostname) host = ''
    return { host, utm: params.get('utm_source') || undefined, anuncio: params.has('gclid') || undefined }
}

function primeiraVezNaSessao() {
    try {
        if (sessionStorage.getItem(CHAVE_SESSAO)) return false
        sessionStorage.setItem(CHAVE_SESSAO, '1')
    } catch {
        // sessionStorage bloqueado — conta mesmo assim
    }
    return true
}

// Chamado a cada troca de rota (ver App.jsx).
export function registrarPagina(caminho) {
    if (desligado(caminho)) return
    if (primeiraVezNaSessao()) {
        enviar({ tipo: 'sessao', pagina: caminho, origem: origemDaVisita() })
    }
    enviar({ tipo: 'pagina', pagina: caminho })
    ativarCliques()
}

// Um único listener pega os cliques em qualquer link de WhatsApp, telefone ou
// e-mail do site, sem precisar mexer em cada botão.
function ativarCliques() {
    if (cliquesAtivos) return
    cliquesAtivos = true
    document.addEventListener(
        'click',
        (e) => {
            const link = e.target.closest?.('a[href]')
            if (!link) return
            const href = link.getAttribute('href') || ''
            const tipo = /wa\.me|whatsapp\.com/i.test(href)
                ? 'whatsapp'
                : href.startsWith('tel:')
                  ? 'telefone'
                  : href.startsWith('mailto:')
                    ? 'email'
                    : null
            if (tipo && !desligado(window.location.pathname)) {
                enviar({ tipo, pagina: window.location.pathname })
            }
        },
        { capture: true }
    )
}
