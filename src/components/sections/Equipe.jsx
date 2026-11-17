import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { equipe } from '../../data/equipe'
import fotoMarcelo from '../../assets/colaboradores/otimizadas/MARCELO_2.webp'

// Mostra quem atende o cliente — o parecer de SEO apontou que a home só tinha
// fotos de banco de imagens e nenhuma da equipe ou dos sócios.
//
// O carrossel é uma faixa com scroll-snap: no celular arrasta com o dedo, no
// desktop as setas rolam um card por vez. Sem biblioteca e sem autoplay.
export default function EquipeSection() {
    const trilhoRef = useRef(null)

    const rolar = (direcao) => {
        const trilho = trilhoRef.current
        if (!trilho) return
        const card = trilho.querySelector('[data-card]')
        const passo = card ? card.offsetWidth + 16 : trilho.clientWidth
        trilho.scrollBy({ left: direcao * passo, behavior: 'smooth' })
    }

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
                            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                            aria-label="Colaboradores da Domingos Assessoria"
                        >
                            {equipe.map((pessoa) => (
                                <article
                                    key={pessoa.nome + pessoa.cargo}
                                    data-card
                                    className="snap-start shrink-0 w-[62%] sm:w-[40%] md:w-[31%] bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden"
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
                            <span className="text-zinc-400 text-sm">
                                <strong className="text-white">30+ colaboradores</strong> · arraste para conhecer
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
