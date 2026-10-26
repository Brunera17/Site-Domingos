const CHAVE_SESSAO = 'visita-registrada'

// Avisa o servidor (api/visita.js) uma vez por sessão do navegador. O
// servidor descobre estado/cidade sozinho pelos cabeçalhos da Vercel — nada
// é enviado daqui além do próprio "ping".
export function registrarVisita() {
    if (import.meta.env.DEV) return
    // Não conta os acessos de quem está olhando o próprio painel.
    if (window.location.pathname.startsWith('/painel')) return

    try {
        if (sessionStorage.getItem(CHAVE_SESSAO)) return
        sessionStorage.setItem(CHAVE_SESSAO, '1')
    } catch {
        // sessionStorage bloqueado (modo privado restrito) — registra mesmo assim
    }

    fetch('/api/visita', { method: 'POST', keepalive: true }).catch(() => {})
}
