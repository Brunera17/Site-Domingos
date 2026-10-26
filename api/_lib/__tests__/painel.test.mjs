import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
    agruparDia, classificarOrigem, ehRobo, navegador, normalizarPagina,
    ranking, regiaoDaRequisicao, tipoDispositivo, ultimosDias,
} from '../analytics.js'
import { criarToken, lerCookie, senhaCorreta, tokenValido } from '../painelAuth.js'

const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
const CHROME_PC = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'

test('regiaoDaRequisicao decodifica a cidade e agrupa o exterior', () => {
    assert.deepEqual(
        regiaoDaRequisicao({ 'x-vercel-ip-country': 'BR', 'x-vercel-ip-country-region': 'SP', 'x-vercel-ip-city': 'S%C3%A3o%20Paulo' }),
        { estado: 'SP', cidade: 'São Paulo - SP' }
    )
    assert.deepEqual(regiaoDaRequisicao({ 'x-vercel-ip-country': 'US' }), { estado: 'Exterior (US)', cidade: 'Exterior (US)' })
    assert.deepEqual(regiaoDaRequisicao({}), { estado: 'Desconhecido', cidade: 'Desconhecida' })
})

test('classifica aparelho, navegador e robôs', () => {
    assert.equal(tipoDispositivo(IPHONE), 'Celular')
    assert.equal(tipoDispositivo(CHROME_PC), 'Computador')
    assert.equal(navegador(IPHONE), 'Safari')
    assert.equal(navegador(CHROME_PC), 'Chrome')
    assert.equal(ehRobo('Googlebot/2.1'), true)
    assert.equal(ehRobo(''), true)
    assert.equal(ehRobo(CHROME_PC), false)
})

test('classificarOrigem prioriza anúncio, depois utm, depois domínio', () => {
    assert.equal(classificarOrigem({ host: 'www.google.com.br' }), 'Google')
    assert.equal(classificarOrigem({ host: 'l.instagram.com' }), 'Instagram')
    assert.equal(classificarOrigem({ host: 'blog.exemplo.com' }), 'blog.exemplo.com')
    assert.equal(classificarOrigem({ host: 'google.com', utm: 'Instagram_Bio' }), 'Campanha: instagram_bio')
    assert.equal(classificarOrigem({ utm: 'x', anuncio: true }), 'Google Ads')
    assert.equal(classificarOrigem({ utm: '<script>' }), 'Direto')
    assert.equal(classificarOrigem({ host: 'a b' }), 'Outros sites')
    assert.equal(classificarOrigem(), 'Direto')
})

test('normalizarPagina só aceita rotas do site', () => {
    assert.equal(normalizarPagina('/Servicos/'), '/servicos')
    assert.equal(normalizarPagina('/blog/meu-post'), '/blog/meu-post')
    assert.equal(normalizarPagina('/wp-admin'), '(página não encontrada)')
    assert.equal(normalizarPagina(42), null)
})

test('agruparDia lê o formato do Upstash e ranking ordena', () => {
    const grupos = agruparDia(['t:sessoes', '3', 'estado:SP', '2', 'estado:MG', '5', 'cidade:Bauru - SP', '2'])
    assert.deepEqual(grupos.t, { sessoes: 3 })
    assert.deepEqual(ranking(grupos.estado), [{ nome: 'MG', total: 5 }, { nome: 'SP', total: 2 }])
    assert.deepEqual(grupos.cidade, { 'Bauru - SP': 2 })
})

test('ultimosDias começa por hoje no fuso de Brasília', () => {
    assert.deepEqual(ultimosDias(2, new Date('2026-10-26T02:00:00Z')), ['2026-10-25', '2026-10-24'])
})

test('sessão do painel: senha, token assinado e expiração', () => {
    process.env.PAINEL_SENHA = 'segredo-de-teste'
    assert.equal(senhaCorreta('segredo-de-teste'), true)
    assert.equal(senhaCorreta('errada'), false)
    assert.equal(senhaCorreta(undefined), false)

    const agora = Date.now()
    const { token } = criarToken(agora)
    assert.equal(tokenValido(token, agora), true)
    assert.equal(tokenValido(token, agora + 9 * 60 * 60 * 1000), false, 'expira em 8h')
    assert.equal(tokenValido(token.replace(/.$/, (c) => (c === 'A' ? 'B' : 'A')), agora), false, 'assinatura adulterada')
    const [exp, nonce, sig] = token.split('.')
    assert.equal(tokenValido(`${Number(exp) + 99999}.${nonce}.${sig}`, agora), false, 'validade adulterada')

    process.env.PAINEL_SENHA = 'outra-senha'
    assert.equal(tokenValido(token, agora), false, 'trocar a senha derruba as sessões')

    assert.equal(lerCookie({ headers: { cookie: 'a=1; painel_sessao=abc.def.ghi' } }), 'abc.def.ghi')
    delete process.env.PAINEL_SENHA
})
