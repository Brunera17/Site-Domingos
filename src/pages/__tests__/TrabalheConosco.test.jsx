import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import TrabalheConosco from '../TrabalheConosco'

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
            <MemoryRouter>
                <TrabalheConosco />
            </MemoryRouter>
        </HelmetProvider>
    )
}

function makeFile({ name = 'curriculo.pdf', type = 'application/pdf', sizeBytes = 1024 } = {}) {
    const file = new File(['conteúdo'], name, { type })
    Object.defineProperty(file, 'size', { value: sizeBytes })
    return file
}

function fillRequiredFields() {
    fireEvent.change(screen.getByPlaceholderText('Seu nome completo'), { target: { value: 'João Candidato' } })
    fireEvent.change(screen.getByPlaceholderText('seu@email.com'), { target: { value: 'joao@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('(14) 99999-9999'), { target: { value: '14999999999' } })
    const [areaSelect, nivelSelect, disponibilidadeSelect] = screen.getAllByRole('combobox')
    fireEvent.change(areaSelect, { target: { value: 'Contabilidade' } })
    fireEvent.change(nivelSelect, { target: { value: 'Júnior' } })
    fireEvent.change(disponibilidadeSelect, { target: { value: 'Imediata' } })
    fireEvent.change(screen.getByPlaceholderText('Conte um pouco sobre você e suas motivações...'), {
        target: { value: 'Quero muito fazer parte do time.' },
    })
}

describe('TrabalheConosco — vagas', () => {
    it('expande e recolhe os detalhes da vaga ao clicar no cabeçalho', () => {
        renderPage()
        expect(screen.queryByText(/Formação em Ciências Contábeis/)).not.toBeInTheDocument()

        fireEvent.click(screen.getByText('Analista Contábil'))
        expect(screen.getByText(/Formação em Ciências Contábeis/)).toBeInTheDocument()

        fireEvent.click(screen.getByText('Analista Contábil'))
        expect(screen.queryByText(/Formação em Ciências Contábeis/)).not.toBeInTheDocument()
    })

    it('pré-preenche área e nível ao clicar em "Candidatar-me a esta vaga"', () => {
        renderPage()
        fireEvent.click(screen.getByText('Assistente de Departamento Pessoal'))
        fireEvent.click(screen.getByText('Candidatar-me a esta vaga'))

        expect(screen.getByText(/Candidatura para/)).toBeInTheDocument()
        // Aparece 2x: no cabeçalho da vaga (ainda expandida) e no título do formulário
        expect(screen.getAllByText('Assistente de Departamento Pessoal').length).toBeGreaterThanOrEqual(2)
        const [areaSelect, nivelSelect] = screen.getAllByRole('combobox')
        expect(areaSelect).toHaveValue('Departamento Pessoal')
        expect(nivelSelect).toHaveValue('Júnior')
    })
})

describe('TrabalheConosco — formulário de candidatura', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn())
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('bloqueia o envio (sem chamar a API) se nenhum currículo foi anexado', async () => {
        renderPage()
        fillRequiredFields()
        fireEvent.click(screen.getByRole('button', { name: /Enviar Candidatura/i }))

        await waitFor(() => expect(screen.getByText('Anexe seu currículo antes de enviar.')).toBeInTheDocument())
        expect(fetch).not.toHaveBeenCalled()
    })

    it('rejeita currículo acima de 3MB e não o anexa', () => {
        renderPage()
        const input = document.querySelector('input[type="file"]')
        fireEvent.change(input, { target: { files: [makeFile({ sizeBytes: 4 * 1024 * 1024 })] } })

        expect(screen.getByText('O arquivo do currículo deve ter no máximo 3MB.')).toBeInTheDocument()
        expect(screen.queryByText('curriculo.pdf')).not.toBeInTheDocument()
    })

    it('aceita um currículo dentro do limite e mostra o nome do arquivo', () => {
        renderPage()
        const input = document.querySelector('input[type="file"]')
        fireEvent.change(input, { target: { files: [makeFile({ name: 'meu-curriculo.pdf', sizeBytes: 500 * 1024 })] } })

        expect(screen.getByText('meu-curriculo.pdf')).toBeInTheDocument()
        expect(screen.queryByText('O arquivo do currículo deve ter no máximo 3MB.')).not.toBeInTheDocument()
    })

    it('envia a candidatura (com o currículo em base64 e o honeypot) e mostra a confirmação', async () => {
        fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ ok: true }) })
        renderPage()

        fillRequiredFields()
        const input = document.querySelector('input[type="file"]')
        fireEvent.change(input, { target: { files: [makeFile()] } })

        fireEvent.click(screen.getByRole('button', { name: /Enviar Candidatura/i }))

        await waitFor(() => expect(screen.getByText('Candidatura Enviada!')).toBeInTheDocument())

        expect(fetch).toHaveBeenCalledWith('/api/trabalhe-conosco', expect.objectContaining({ method: 'POST' }))
        const body = JSON.parse(fetch.mock.calls[0][1].body)
        expect(body).toMatchObject({
            nome: 'João Candidato',
            email: 'joao@example.com',
            area: 'Contabilidade',
            nivel: 'Júnior',
            disponibilidade: 'Imediata',
            motivacao: 'Quero muito fazer parte do time.',
            resumeFilename: 'curriculo.pdf',
            resumeMimeType: 'application/pdf',
            site: '',
        })
        expect(body.resumeBase64).toEqual(expect.stringContaining('base64,'))
    })

    it('mostra o erro devolvido pela API e mantém o formulário visível', async () => {
        fetch.mockResolvedValueOnce({ ok: false, json: async () => ({ error: 'Preencha todos os campos obrigatórios e anexe o currículo.' }) })
        renderPage()

        fillRequiredFields()
        const input = document.querySelector('input[type="file"]')
        fireEvent.change(input, { target: { files: [makeFile()] } })
        fireEvent.click(screen.getByRole('button', { name: /Enviar Candidatura/i }))

        await waitFor(() => expect(screen.getByText('Preencha todos os campos obrigatórios e anexe o currículo.')).toBeInTheDocument())
        expect(screen.queryByText('Candidatura Enviada!')).not.toBeInTheDocument()
    })
})
