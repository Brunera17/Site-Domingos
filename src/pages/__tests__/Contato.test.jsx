import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import Contato from '../Contato'

// import() dinâmico dentro da própria factory de propósito: vi.mock é
// hoisted pro topo do arquivo (antes dos imports), então uma referência
// estática ao helper compartilhado quebraria com "Cannot access ... before
// initialization".
vi.mock('framer-motion', async () => {
    const { createFramerMotionMock } = await import('../../test/mocks/framerMotion')
    return createFramerMotionMock()
})

function renderPage() {
    return render(
        <HelmetProvider>
            <Contato />
        </HelmetProvider>
    )
}

function fillRequiredFields() {
    fireEvent.change(screen.getByPlaceholderText('Seu nome completo'), { target: { value: 'Maria Cliente' } })
    fireEvent.change(screen.getByPlaceholderText('seu@email.com'), { target: { value: 'maria@example.com' } })
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Contabilidade' } })
    fireEvent.change(screen.getByPlaceholderText('Como podemos ajudar sua empresa?'), { target: { value: 'Preciso de ajuda com minha contabilidade.' } })
}

describe('Contato — formulário', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn())
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('não envia a requisição se os campos obrigatórios estiverem vazios', () => {
        renderPage()
        fireEvent.click(screen.getByRole('button', { name: /Enviar Mensagem/i }))
        expect(fetch).not.toHaveBeenCalled()
    })

    it('envia os dados do formulário (incluindo o honeypot) e mostra a confirmação em caso de sucesso', async () => {
        fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ ok: true }) })
        renderPage()

        fillRequiredFields()
        fireEvent.click(screen.getByRole('button', { name: /Enviar Mensagem/i }))

        await waitFor(() => expect(screen.getByText('Mensagem Enviada!')).toBeInTheDocument())

        expect(fetch).toHaveBeenCalledWith('/api/contato', expect.objectContaining({ method: 'POST' }))
        const body = JSON.parse(fetch.mock.calls[0][1].body)
        expect(body).toMatchObject({
            nome: 'Maria Cliente',
            email: 'maria@example.com',
            assunto: 'Contabilidade',
            mensagem: 'Preciso de ajuda com minha contabilidade.',
            site: '', // honeypot vazio numa submissão legítima
        })
    })

    it('mostra a mensagem de erro devolvida pela API e mantém o formulário visível', async () => {
        fetch.mockResolvedValueOnce({ ok: false, json: async () => ({ error: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' }) })
        renderPage()

        fillRequiredFields()
        fireEvent.click(screen.getByRole('button', { name: /Enviar Mensagem/i }))

        await waitFor(() => expect(screen.getByText('Muitas tentativas. Aguarde alguns minutos e tente novamente.')).toBeInTheDocument())
        // Continua mostrando o formulário, não a tela de sucesso
        expect(screen.queryByText('Mensagem Enviada!')).not.toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Enviar Mensagem/i })).toBeInTheDocument()
    })
})

describe('Contato — FAQ', () => {
    it('mostra a resposta ao clicar numa pergunta, e esconde de novo ao clicar de novo', () => {
        renderPage()
        const pergunta = screen.getByText('Vocês atendem empresas de outros municípios?')

        expect(screen.queryByText(/Atendemos empresas de toda a região/)).not.toBeInTheDocument()

        fireEvent.click(pergunta)
        expect(screen.getByText(/Atendemos empresas de toda a região/)).toBeInTheDocument()

        fireEvent.click(pergunta)
        expect(screen.queryByText(/Atendemos empresas de toda a região/)).not.toBeInTheDocument()
    })
})
