import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react'
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
// A liderança fica espalhada de forma uniforme ao longo da faixa (não em
// bloco); o card é igual aos demais, só com o selo "★ Liderança" na foto.
function intercalar(lideres, time) {
    const resultado = [...time]
    const total = lideres.length + time.length
    lideres.forEach((lider, i) => {
        // posição proporcional: 0, ~total/n, ~2·total/n...
        resultado.splice(Math.round((i * total) / lideres.length), 0, lider)
    })
    return resultado
}
const pessoas = intercalar(
    lideranca.map((p) => ({ ...p, lider: true })),
    equipe
)
const lista = [...pessoas, ...pessoas]

export default function EquipeSection() {
    const trilhoRef = useRef(null)
    const pausadoRef = useRef(false)
    const pausaAteRef = useRef(0)
    const posRef = useRef(0)
    const [visivel, setVisivel] = useState(false)

    // Distância entre o primeiro card e a sua cópia = tamanho de uma volta
    const tamanhoVolta = (trilho) => {
        const cards = trilho.querySelectorAll('[data-card]')
        return cards.length > pessoas.length
            ? cards[pessoas.length].offsetLeft - cards[0].offsetLeft
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Carrossel de colaboradores */}
                    <div className="lg:col-span-2 min-w-0">
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
                                    aria-hidden={i >= pessoas.length ? true : undefined}
                                    className="shrink-0 w-[62%] sm:w-[40%] md:w-[31%] bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden"
                                >
                                    <div className="relative aspect-[3/4] bg-zinc-900">
                                        {pessoa.lider && (
                                            <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 bg-orange-500 text-white text-[11px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1 shadow-lg">
                                                <Star size={11} className="fill-white" />
                                                Liderança
                                            </span>
                                        )}
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
                            <span className="text-zinc-400 text-sm">
                                <strong className="text-white">30+ colaboradores</strong> · conheça o time
                            </span>
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

                    {/* Sócio fundador */}
                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col">
                        <img
                            src={fotoMarcelo}
                            alt="Marcelo Domingos, sócio fundador da Domingos Assessoria"
                            loading="lazy"
                            className="w-24 h-24 rounded-full object-cover object-top ring-2 ring-orange-500/40 mb-5"
                        />
                        <div className="text-white font-bold text-lg">Marcelo Domingos</div>
                        <div className="text-zinc-400 text-sm mb-4">Sócio Fundador · CRC Nº 2SP 037.257/O-8</div>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                            Fundou o escritório em Itaí para levar contabilidade consultiva às pequenas e
                            médias empresas do interior paulista.
                        </p>
                        <Link
                            to="/sobre"
                            className="group mt-auto inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-semibold text-sm"
                        >
                            Conheça a equipe
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
