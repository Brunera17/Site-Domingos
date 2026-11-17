import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { equipe, lideranca } from '../../data/equipe'
import fotoMarcelo from '../../assets/colaboradores/otimizadas/MARCELO_2.webp'

// Mostra quem atende o cliente — o parecer de SEO apontou que a home só tinha
// fotos de banco de imagens e nenhuma da equipe ou dos sócios.
//
// O carrossel anda sem parar, como uma esteira. A lista de pessoas é
// repetida duas vezes: quando a primeira cópia sai inteira da tela, a posição
// volta o equivalente a uma cópia — como a segunda é igual, o salto não
// aparece e o movimento parece infinito.
//
// Não para com o mouse em cima (decisão do dono do site). Pausa só ao
// tocar/arrastar no celular, com foco de teclado nos cards, quando a seção
// sai da tela, com a aba escondida e para quem pediu ao sistema menos
// animação. As setas (desktop) pulam um card.
const VELOCIDADE_PX_POR_SEG = 70
const RETOMAR_APOS_TOQUE_MS = 2000
const lista = [...equipe, ...equipe]

// Card maior para sócio e gestores: foto, nome e cargo em destaque.
function CardLider({ nome, cargo, detalhe, descricao, foto, fundador = false }) {
    return (
        <article
            className={`bg-zinc-950 rounded-xl overflow-hidden border ${
                fundador ? 'border-orange-500/60 ring-1 ring-orange-500/30' : 'border-zinc-800'
            }`}
        >
            <div className="aspect-[3/4] bg-zinc-900">
                <img
                    src={foto}
                    alt={`${nome}, ${cargo} da Domingos Assessoria`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                />
            </div>
            <div className="p-4">
                <h4 className="text-white font-bold text-base leading-tight">{nome}</h4>
                <span className="inline-block mt-2 bg-orange-500 text-white rounded-md px-2 py-0.5 text-xs font-semibold leading-snug">
                    {cargo}
                </span>
                {detalhe && <p className="text-zinc-400 text-xs mt-2">{detalhe}</p>}
                {descricao && <p className="text-zinc-400 text-sm leading-relaxed mt-3">{descricao}</p>}
            </div>
        </article>
    )
}

export default function EquipeSection() {
    const trilhoRef = useRef(null)
    const pausadoRef = useRef(false)
    const pausaAteRef = useRef(0)
    const posRef = useRef(0)
    const [visivel, setVisivel] = useState(false)

    // Distância entre o primeiro card e a sua cópia = tamanho de uma volta
    const tamanhoVolta = (trilho) => {
        const cards = trilho.querySelectorAll('[data-card]')
        return cards.length > equipe.length
            ? cards[equipe.length].offsetLeft - cards[0].offsetLeft
            : trilho.scrollWidth / 2
    }

    const pausar = (ms) => {
        pausaAteRef.current = performance.now() + ms
    }

    const rolar = (direcao) => {
        const trilho = trilhoRef.current
        if (!trilho) return
        pausar(900)
        const volta = tamanhoVolta(trilho)
        const card = trilho.querySelector('[data-card]')
        const passo = card ? card.offsetWidth + 16 : trilho.clientWidth
        // Antes de animar, reposiciona na cópia equivalente para nunca bater
        // numa ponta da faixa
        if (direcao < 0 && trilho.scrollLeft < passo) trilho.scrollLeft += volta
        if (direcao > 0 && trilho.scrollLeft + passo >= volta) trilho.scrollLeft -= volta
        trilho.scrollBy({ left: direcao * passo, behavior: 'smooth' })
    }

    // Só roda enquanto a seção estiver na tela
    useEffect(() => {
        const trilho = trilhoRef.current
        if (!trilho || typeof IntersectionObserver === 'undefined') return
        const obs = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.2 })
        obs.observe(trilho)
        return () => obs.disconnect()
    }, [])

    useEffect(() => {
        const trilho = trilhoRef.current
        if (!trilho || !visivel) return
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

        let quadro
        let anterior = performance.now()
        posRef.current = trilho.scrollLeft

        const passo = (agora) => {
            const dt = Math.min(agora - anterior, 100) // evita salto depois de aba escondida
            anterior = agora
            const parado =
                pausadoRef.current ||
                agora < pausaAteRef.current ||
                document.visibilityState !== 'visible'

            if (parado) {
                // Acompanha onde a pessoa deixou a faixa (arrastando ou pelas setas)
                posRef.current = trilho.scrollLeft
            } else {
                const volta = tamanhoVolta(trilho)
                posRef.current += (VELOCIDADE_PX_POR_SEG * dt) / 1000
                if (posRef.current >= volta) posRef.current -= volta
                trilho.scrollLeft = posRef.current
            }
            quadro = requestAnimationFrame(passo)
        }
        quadro = requestAnimationFrame(passo)
        return () => cancelAnimationFrame(quadro)
    }, [visivel])

    return (
        <section className="py-section px-6 md:px-8 lg:px-10 bg-black">
            <div className="max-w-6xl mx-auto">
                <SectionHeading
                    eyebrow="Nosso time em Itaí"
                    title={<>Quem cuida da <span className="text-orange-500">sua empresa</span></>}
                    subtitle="Mais de 30 colaboradores no nosso escritório em Itaí-SP, divididos entre contábil, fiscal, departamento pessoal, societário e BPO financeiro."
                    className="mb-10"
                />

                {/* Liderança em destaque */}
                <h3 className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-4">Liderança</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <CardLider
                        nome="Marcelo Domingos"
                        cargo="Sócio Fundador"
                        detalhe="CRC Nº 2SP 037.257/O-8"
                        foto={fotoMarcelo}
                        fundador
                    />
                    {lideranca.map((pessoa) => (
                        <CardLider key={pessoa.nome} {...pessoa} />
                    ))}
                </div>

                {/* Restante do time */}
                <div className="mt-14">
                    <h3 className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-4">Nosso time</h3>
                    <div
                        ref={trilhoRef}
                        className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        aria-label="Colaboradores da Domingos Assessoria"
                        onTouchStart={() => { pausadoRef.current = true }}
                        onTouchEnd={() => {
                            pausadoRef.current = false
                            pausar(RETOMAR_APOS_TOQUE_MS)
                        }}
                        onFocus={() => { pausadoRef.current = true }}
                        onBlur={() => { pausadoRef.current = false }}
                    >
                        {lista.map((pessoa, i) => (
                            <article
                                key={`${i}-${pessoa.nome}`}
                                data-card
                                aria-hidden={i >= equipe.length ? true : undefined}
                                className="shrink-0 w-[58%] sm:w-[36%] md:w-[24%] lg:w-[19%] bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden"
                            >
                                <div className="aspect-[3/4] bg-zinc-900">
                                    <img
                                        src={pessoa.foto}
                                        alt={`${pessoa.nome}${pessoa.cargo ? `, ${pessoa.cargo}` : ''} — Domingos Assessoria`}
                                        loading="lazy"
                                        width="600"
                                        height="800"
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-white font-bold text-base leading-tight">{pessoa.nome}</h3>
                                    {pessoa.cargo && (
                                        <span className="inline-block mt-2 text-orange-500 bg-orange-500/10 border border-orange-500/20 rounded-md px-2 py-0.5 text-xs font-semibold">
                                            {pessoa.cargo}
                                        </span>
                                    )}
                                    {pessoa.descricao && (
                                        <p className="text-zinc-400 text-sm leading-relaxed mt-3">{pessoa.descricao}</p>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <Link
                            to="/sobre"
                            className="group inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-semibold text-sm"
                        >
                            Conheça a nossa história
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                        <div className="hidden sm:flex gap-2">
                            <button
                                type="button"
                                onClick={() => rolar(-1)}
                                aria-label="Colaborador anterior"
                                className="w-10 h-10 rounded-full border border-zinc-700 text-zinc-300 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center transition-colors"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={() => rolar(1)}
                                aria-label="Próximo colaborador"
                                className="w-10 h-10 rounded-full border border-zinc-700 text-zinc-300 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center transition-colors"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
