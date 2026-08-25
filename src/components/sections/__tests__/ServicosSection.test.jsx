import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ServicosSection from '../ServicosSection'

// import() dinâmico dentro da própria factory de propósito: vi.mock é
// hoisted pro topo do arquivo (antes dos imports), então uma referência
// estática ao helper compartilhado quebraria com "Cannot access ... before
// initialization".
vi.mock('framer-motion', async () => {
    const { createFramerMotionMock } = await import('../../../test/mocks/framerMotion')
    return createFramerMotionMock()
})

// Dados mínimos e determinísticos — os testes não devem depender do
// conteúdo de negócio real em src/data/services.js, só da forma dos dados.
vi.mock('../../../data/services', () => {
    const Icon = () => <svg data-testid="icon" />
    return {
        services: [
            {
                id: 'svc-a', icon: Icon, title: 'Serviço A', description: 'Descrição A',
                departamento: 'Depto A', detalhes: 'Detalhes do serviço A',
                comoFazemos: ['Passo A1', 'Passo A2'], destaque: true,
            },
            {
                id: 'svc-b', icon: Icon, title: 'Serviço B', description: 'Descrição B',
                departamento: 'Depto B', detalhes: 'Detalhes do serviço B',
                comoFazemos: ['Passo B1'], destaque: true,
            },
            {
                id: 'svc-c', icon: Icon, title: 'Serviço C', description: 'Descrição C',
                departamento: 'Depto C', detalhes: 'Detalhes do serviço C',
                comoFazemos: ['Passo C1'], destaque: true,
            },
        ],
    }
})

function renderSection() {
    return render(
        <MemoryRouter>
            <ServicosSection />
        </MemoryRouter>
    )
}

describe('ServicosSection', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('mostra o primeiro serviço em destaque no card expandido ao montar', () => {
        renderSection()
        expect(screen.getByRole('heading', { name: 'Serviço A' })).toBeInTheDocument()
        expect(screen.getByText('Detalhes do serviço A')).toBeInTheDocument()
    })

    it('troca o serviço selecionado ao clicar num card da grid', () => {
        renderSection()

        // Serviço B começa como um card clicável na grid (não é o selecionado)
        fireEvent.click(screen.getByText('Serviço B'))

        expect(screen.getByRole('heading', { name: 'Serviço B' })).toBeInTheDocument()
        expect(screen.getByText('Detalhes do serviço B')).toBeInTheDocument()
        // O serviço que estava selecionado antes agora aparece na grid
        expect(screen.getByText('Serviço A')).toBeInTheDocument()
    })

    it('avança para o próximo serviço sozinho após o tempo de autoplay', () => {
        renderSection()
        expect(screen.getByRole('heading', { name: 'Serviço A' })).toBeInTheDocument()

        act(() => {
            vi.advanceTimersByTime(12000) // AUTOPLAY_DELAY
        })

        expect(screen.getByRole('heading', { name: 'Serviço B' })).toBeInTheDocument()
    })

    it('depois de uma seleção manual, espera o tempo de interação (mais longo) antes de avançar sozinho de novo', () => {
        renderSection()

        fireEvent.click(screen.getByText('Serviço C'))
        expect(screen.getByRole('heading', { name: 'Serviço C' })).toBeInTheDocument()

        // Ainda dentro do tempo de interação (17s) — não deveria ter avançado
        act(() => {
            vi.advanceTimersByTime(12000) // equivalente ao AUTOPLAY_DELAY normal
        })
        expect(screen.getByRole('heading', { name: 'Serviço C' })).toBeInTheDocument()

        // Completa o tempo de interação — agora sim avança
        act(() => {
            vi.advanceTimersByTime(5000) // completa os 17s (INTERACTION_DELAY)
        })
        expect(screen.getByRole('heading', { name: 'Serviço A' })).toBeInTheDocument()
    })
})
