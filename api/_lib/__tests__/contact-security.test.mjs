// Verifica dois comportamentos de segurança de api/contato.js e
// api/trabalhe-conosco.js (ver PR de correção do relay aberto e a issue de
// follow-up sobre rate limit real / e-mail de confirmação):
//   1. Nenhum e-mail de confirmação é enviado (só a notificação interna) —
//      mocka o SDK do Resend e conta exatamente quantas vezes `emails.send`
//      é chamado.
//   2. Rate limit por IP funciona — tanto a lógica isolada (isRateLimited,
//      com janela curta pra não precisar esperar 10 min de verdade) quanto
//      o comportamento fim-a-fim do handler (a 6ª requisição do mesmo IP
//      volta 429).
//
// Roda com: npm test
// (usa node:test embutido + --experimental-test-module-mocks pra interceptar
// o SDK do Resend sem precisar de uma API key real nem de rede)

import { test, mock } from 'node:test'
import assert from 'node:assert/strict'

process.env.RESEND_API_KEY = 'dummy_key_for_test'
process.env.CONTACT_EMAIL_TO = 'notificacao@example.com'

function mockRes() {
    return {
        statusCode: null,
        body: null,
        status(code) { this.statusCode = code; return this },
        json(payload) { this.body = payload; return this },
        setHeader() { return this },
    }
}

function mockReq(body, ip) {
    return { method: 'POST', body, headers: { 'x-forwarded-for': ip }, socket: { remoteAddress: ip } }
}

// ── Mock do SDK do Resend: registra toda chamada de emails.send() ──────────
// Registrado uma única vez para o processo inteiro; cada teste só limpa o
// array antes de rodar (chamar mock.module de novo pro mesmo specifier não
// é necessário e evita depender de comportamento de re-registro).
//
// Nota de manutenção: se a lógica de e-mail de confirmação mudar (ex.: a
// issue de follow-up decidir reintroduzi-la), os testes da seção 1 abaixo
// vão falhar de propósito — é o sinal de que as asserções (e a intenção que
// elas documentam) precisam ser atualizadas junto com o código.
let sendCalls = []
mock.module('resend', {
    exports: {
        Resend: class {
            constructor(apiKey) { this.apiKey = apiKey }
            emails = {
                send: async (payload) => {
                    sendCalls.push(payload)
                    return { data: { id: 'fake-id' }, error: null }
                },
            }
        },
    },
})
function resetSendCalls() {
    sendCalls.length = 0
}

// ── 1. Confirmação não é mais enviada ───────────────────────────────────────

test('contato.js: submissão válida dispara só a notificação interna, nunca a confirmação', async () => {
    resetSendCalls()
    const { default: handler } = await import('../../contato.js?v=' + Date.now())

    const res = mockRes()
    await handler(mockReq({
        nome: 'Maria Cliente', email: 'maria@example.com', assunto: 'Dúvida', mensagem: 'Olá, gostaria de um orçamento.',
    }, '10.0.0.1'), res)

    assert.equal(res.statusCode, 200, 'deveria responder 200 em submissão válida')
    assert.equal(sendCalls.length, 1, 'deveria chamar resend.emails.send exatamente 1 vez (só a notificação)')
    assert.equal(sendCalls[0].to, 'notificacao@example.com', 'o único e-mail deve ir para CONTACT_EMAIL_TO, não para o requisitante')
    assert.notEqual(sendCalls[0].to, 'maria@example.com', 'o e-mail do requisitante nunca deve aparecer como destinatário')
})

test('trabalhe-conosco.js: submissão válida dispara só a notificação interna, nunca a confirmação', async () => {
    resetSendCalls()
    const { default: handler } = await import('../../trabalhe-conosco.js?v=' + Date.now())

    const res = mockRes()
    await handler(mockReq({
        nome: 'João Candidato', email: 'joao@example.com', telefone: '14999999999',
        area: 'Fiscal', nivel: 'Júnior', disponibilidade: 'Imediata', motivacao: 'Quero muito a vaga.',
        resumeBase64: 'data:application/pdf;base64,JVBERi0xLjQK',
    }, '10.0.0.2'), res)

    assert.equal(res.statusCode, 200, 'deveria responder 200 em submissão válida')
    assert.equal(sendCalls.length, 1, 'deveria chamar resend.emails.send exatamente 1 vez (só a notificação)')
    assert.equal(sendCalls[0].to, 'notificacao@example.com')
    assert.notEqual(sendCalls[0].to, 'joao@example.com', 'o e-mail do candidato nunca deve aparecer como destinatário')
})

// ── 2. Rate limit — lógica isolada, com janela curta (sem esperar 10min) ───
//
// Nota de manutenção: estes testes chamam isRateLimited(ip, { max, windowMs })
// diretamente e esperam um retorno síncrono (boolean). Se a issue de rate
// limit real (Vercel KV/Upstash) trocar a implementação para uma chamada de
// rede, a função provavelmente vira async — e estes testes vão quebrar até
// serem ajustados para `await isRateLimited(...)` e, idealmente, mockar o
// cliente do KV/Upstash do mesmo jeito que mockamos o Resend acima.

test('isRateLimited: libera até o limite, bloqueia acima dele, e libera de novo após a janela expirar', async () => {
    const { isRateLimited } = await import('../rateLimit.js?v=' + Date.now())
    const ip = 'unit-test-ip-' + Date.now()
    const opts = { max: 3, windowMs: 150 } // janela curta só para o teste não precisar esperar 10min de verdade

    assert.equal(isRateLimited(ip, opts), false, '1ª requisição: liberada')
    assert.equal(isRateLimited(ip, opts), false, '2ª requisição: liberada')
    assert.equal(isRateLimited(ip, opts), false, '3ª requisição: liberada (no limite)')
    assert.equal(isRateLimited(ip, opts), true, '4ª requisição: bloqueada (acima do limite)')
    assert.equal(isRateLimited(ip, opts), true, '5ª requisição: continua bloqueada')

    await new Promise((r) => setTimeout(r, 200)) // espera a janela de 150ms expirar

    assert.equal(isRateLimited(ip, opts), false, 'após a janela expirar, volta a liberar')
})

test('isRateLimited: contadores de IPs diferentes não se misturam', async () => {
    const { isRateLimited } = await import('../rateLimit.js?v=' + Date.now())
    const opts = { max: 1, windowMs: 60_000 }
    const ipA = 'unit-test-ip-a-' + Date.now()
    const ipB = 'unit-test-ip-b-' + Date.now()

    assert.equal(isRateLimited(ipA, opts), false)
    assert.equal(isRateLimited(ipA, opts), true, 'IP A já estourou o limite')
    assert.equal(isRateLimited(ipB, opts), false, 'IP B não deveria ser afetado pelo limite do IP A')
})

// ── 3. Rate limit — comportamento fim-a-fim no handler real (usa o default de 5/10min) ─

test('contato.js: a 6ª requisição do mesmo IP em 10min volta 429, sem chamar o Resend', async () => {
    resetSendCalls()
    const { default: handler } = await import('../../contato.js?v=' + Date.now())
    const ip = 'e2e-rate-limit-ip-' + Date.now()
    const payload = { nome: 'X', email: 'x@example.com', assunto: 'x', mensagem: 'x' }

    let last
    for (let i = 0; i < 6; i++) {
        const res = mockRes()
        await handler(mockReq(payload, ip), res)
        last = res
    }

    assert.equal(last.statusCode, 429, '6ª requisição do mesmo IP deveria ser bloqueada')
    assert.equal(sendCalls.length, 5, 'só as 5 primeiras requisições deveriam ter chegado a enviar e-mail')
})

test('contato.js: requisição de outro IP não é afetada pelo rate limit do primeiro', async () => {
    resetSendCalls()
    const { default: handler } = await import('../../contato.js?v=' + Date.now())
    const busyIp = 'e2e-busy-ip-' + Date.now()
    const freshIp = 'e2e-fresh-ip-' + Date.now()
    const payload = { nome: 'X', email: 'x@example.com', assunto: 'x', mensagem: 'x' }

    for (let i = 0; i < 6; i++) {
        await handler(mockReq(payload, busyIp), mockRes())
    }

    const res = mockRes()
    await handler(mockReq(payload, freshIp), res)
    assert.equal(res.statusCode, 200, 'IP que nunca requisitou antes deveria passar normalmente')
})
