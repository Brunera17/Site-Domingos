import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import Testemunho from '../Testemunho'
import { testimonials } from '../../../data/testimonials'

// import() dinâmico dentro da própria factory de propósito: vi.mock é
// hoisted pro topo do arquivo (antes dos imports), então uma referência
// estática ao helper compartilhado quebraria com "Cannot access ... before
// initialization".
vi.mock('framer-motion', async () => {
    const { createFramerMotionMock } = await import('../../../test/mocks/framerMotion')
    return createFramerMotionMock()
})

describe('Testemunho', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('mostra o primeiro depoimento ao montar', () => {
        render(<Testemunho />)
        expect(screen.getByText(testimonials[0].name)).toBeInTheDocument()
        expect(screen.getByText(`"${testimonials[0].text}"`)).toBeInTheDocument()
    })

    it('avança pro próximo depoimento ao clicar na seta de próximo', () => {
        render(<Testemunho />)
        fireEvent.click(screen.getByLabelText('Próximo depoimento'))
        expect(screen.getByText(testimonials[1].name)).toBeInTheDocument()
    })

    it('volta pro último depoimento ao clicar em anterior a partir do primeiro (wrap-around)', () => {
        render(<Testemunho />)
        fireEvent.click(screen.getByLabelText('Depoimento anterior'))
        expect(screen.getByText(testimonials[testimonials.length - 1].name)).toBeInTheDocument()
    })

    it('vai direto pro depoimento clicado numa bolinha de navegação', () => {
        render(<Testemunho />)
        fireEvent.click(screen.getByLabelText('Ver depoimento 4'))
        expect(screen.getByText(testimonials[3].name)).toBeInTheDocument()
    })

    it('vai direto pro depoimento clicado num card lateral', () => {
        render(<Testemunho />)
        // Os cards laterais mostram os depoimentos que não são o atual —
        // clicar no nome do 3º depoimento deve selecioná-lo.
        fireEvent.click(screen.getByText(testimonials[2].name))
        expect(screen.getAllByText(testimonials[2].name).length).toBeGreaterThan(0)
        // O card principal (com as aspas ao redor do texto) deve mostrar o texto do depoimento 3
        expect(screen.getByText(`"${testimonials[2].text}"`)).toBeInTheDocument()
    })

    it('avança sozinho pro próximo depoimento a cada 5 segundos (autoplay)', () => {
        render(<Testemunho />)
        act(() => {
            vi.advanceTimersByTime(5000)
        })
        expect(screen.getByText(testimonials[1].name)).toBeInTheDocument()
    })

    it('para o autoplay definitivamente depois de qualquer interação manual', () => {
        render(<Testemunho />)
        fireEvent.click(screen.getByLabelText('Próximo depoimento')) // vai pro índice 1

        act(() => {
            vi.advanceTimersByTime(20000) // tempo de sobra pra várias voltas de autoplay, se estivesse ativo
        })

        // Se o autoplay não tivesse sido cancelado, o índice já teria avançado várias vezes.
        expect(screen.getByText(testimonials[1].name)).toBeInTheDocument()
    })
})
