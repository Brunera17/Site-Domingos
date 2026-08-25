// Validações compartilhadas pelas funções de formulário (api/contato.js e
// api/trabalhe-conosco.js).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value) {
    return typeof value === 'string' && value.length <= 254 && EMAIL_RE.test(value)
}

export function isWithinLength(value, max) {
    return typeof value === 'string' && value.length <= max
}
