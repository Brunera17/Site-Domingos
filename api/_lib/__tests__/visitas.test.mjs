import { test } from 'node:test'
import assert from 'node:assert/strict'
import { regiaoDaRequisicao, somarRanking, ultimosDias } from '../visitas.js'

test('regiaoDaRequisicao decodifica a cidade e junta com o estado', () => {
    const r = regiaoDaRequisicao({
        'x-vercel-ip-country': 'BR',
        'x-vercel-ip-country-region': 'SP',
        'x-vercel-ip-city': 'S%C3%A3o%20Paulo',
    })
    assert.deepEqual(r, { estado: 'SP', cidade: 'São Paulo - SP' })
})

test('regiaoDaRequisicao agrupa acessos de fora do Brasil', () => {
    const r = regiaoDaRequisicao({ 'x-vercel-ip-country': 'US', 'x-vercel-ip-country-region': 'CA' })
    assert.deepEqual(r, { estado: 'Exterior (US)', cidade: 'Exterior (US)' })
})

test('regiaoDaRequisicao sem cabeçalhos não quebra', () => {
    assert.deepEqual(regiaoDaRequisicao({}), { estado: 'Desconhecido', cidade: 'Desconhecida' })
})

test('somarRanking soma os dias (array ou objeto) e ordena do maior pro menor', () => {
    const ranking = somarRanking([['SP', '3', 'MG', '1'], { MG: '5' }, null])
    assert.deepEqual(ranking, [
        { nome: 'MG', total: 6 },
        { nome: 'SP', total: 3 },
    ])
})

test('ultimosDias devolve a quantidade pedida, começando por hoje', () => {
    const dias = ultimosDias(3, new Date('2026-10-26T15:00:00Z'))
    assert.deepEqual(dias, ['2026-10-26', '2026-10-25', '2026-10-24'])
})
