export const WHATSAPP_NUMBER = '5514996580459'

/**
 * Monta o link do WhatsApp, com mensagem pré-preenchida quando informada.
 * Sempre que possível, prefira passar uma mensagem com contexto da página/seção
 * em vez de deixar o chat em branco — reduz atrito e ajuda o time a triar o contato.
 */
export function buildWhatsAppLink(message) {
    const base = `https://wa.me/${WHATSAPP_NUMBER}`
    return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

const GREETING = 'Olá! '

/** Mensagens padrão por rota, usadas pelo botão flutuante (WhatsAppButton), que
 * não tem contexto de um serviço/plano específico — só sabe em que página está. */
const ROUTE_MESSAGES = [
    { test: (path) => path === '/', message: `${GREETING}Vim pelo site da Domingos Assessoria e gostaria de saber mais sobre os serviços de vocês.` },
    { test: (path) => path === '/sobre', message: `${GREETING}Estava conhecendo a história da Domingos Assessoria no site e gostaria de falar com vocês.` },
    { test: (path) => path === '/servicos', message: `${GREETING}Estava vendo os serviços da Domingos Assessoria no site e queria mais informações.` },
    { test: (path) => path.startsWith('/servicos/'), message: `${GREETING}Vi um dos serviços da Domingos Assessoria no site e gostaria de mais informações.` },
    { test: (path) => path === '/blog', message: `${GREETING}Vim pelo blog da Domingos Assessoria e gostaria de falar com vocês.` },
    { test: (path) => path.startsWith('/blog/'), message: `${GREETING}Li um artigo no blog da Domingos Assessoria e gostaria de saber mais.` },
    { test: (path) => path === '/planos', message: `${GREETING}Estava vendo os planos da Domingos Assessoria e gostaria de mais informações.` },
    { test: (path) => path === '/proposta', message: `${GREETING}Estava na página de proposta da Domingos Assessoria e gostaria de falar com vocês.` },
    { test: (path) => path === '/contato', message: `${GREETING}Vim pelo site da Domingos Assessoria.` },
    { test: (path) => path === '/trabalhe-conosco', message: `${GREETING}Vi as vagas da Domingos Assessoria no site e gostaria de mais informações.` },
]

const DEFAULT_MESSAGE = `${GREETING}Vim pelo site da Domingos Assessoria e gostaria de falar com vocês.`

export function getWhatsAppMessageForPath(pathname) {
    const match = ROUTE_MESSAGES.find(({ test }) => test(pathname))
    return match ? match.message : DEFAULT_MESSAGE
}
