// Manda eventos de navegação pra api/evento.js. O servidor descobre região,
// aparelho e horário sozinho; daqui só vão a página, o domínio de onde a
// pessoa veio e cliques em botões de contato. Nada que identifique alguém.

const CHAVE_SESSAO = 'sessao-registrada'
const CHAVE_HUMANO = 'visitante-humano'
// Sinais de que há uma pessoa do outro lado. Robôs (buscadores, robôs de IA,
// ferramentas de SEO, scanners) carregam a página mas quase nunca mexem o
// mouse, tocam na tela ou usam o teclado — então nada é contado até um
// desses eventos acontecer. Rolagem sozinha não conta: robôs que tiram
// "print" da página costumam rolar.
const SINAIS_HUMANOS = ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'keydown']

let cliquesAtivos = false
let humano = lerFlag(CHAVE_HUMANO)
let fila = []
let sessaoPendente = null // { pagina, origem } da página de entrada

function lerFlag(chave) {
    try {
        return sessionStorage.getItem(chave) === '1'
    } catch {
        return false
    }
}

function gravarFlag(chave) {
    try {
        sessionStorage.setItem(chave, '1')
    } catch {
        // sessionStorage bloqueado — segue só em memória
    }
}

function desligado(caminho) {
    // Não conta o ambiente de desenvolvimento nem quem está olhando o painel.
    return import.meta.env.DEV || caminho.startsWith('/painel')
}

function postar(evento) {
    fetch('/api/evento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(evento),
        keepalive: true,
    }).catch(() => {})
}

// A sessão é marcada como registrada só quando de fato é enviada: se a pessoa
// recarregar antes de interagir, ela ainda é contada depois.
function enviarSessaoSePreciso() {
    if (!sessaoPendente || lerFlag(CHAVE_SESSAO)) return
    gravarFlag(CHAVE_SESSAO)
    postar({ tipo: 'sessao', ...sessaoPendente })
    sessaoPendente = null
}

function enviar(evento) {
    if (humano) postar(evento)
    else fila.push(evento)
}

function confirmarHumano() {
    if (humano) return
    humano = true
    gravarFlag(CHAVE_HUMANO)
    SINAIS_HUMANOS.forEach((tipo) => window.removeEventListener(tipo, confirmarHumano, true))
    enviarSessaoSePreciso()
    fila.forEach(postar)
    fila = []
}

function esperarHumano() {
    SINAIS_HUMANOS.forEach((tipo) => window.addEventListener(tipo, confirmarHumano, { capture: true, passive: true }))
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

// Chamado a cada troca de rota (ver App.jsx).
export function registrarPagina(caminho) {
    if (desligado(caminho)) return
    if (!sessaoPendente && !lerFlag(CHAVE_SESSAO)) {
        sessaoPendente = { pagina: caminho, origem: origemDaVisita() }
    }
    if (humano) enviarSessaoSePreciso()
    else esperarHumano()
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
