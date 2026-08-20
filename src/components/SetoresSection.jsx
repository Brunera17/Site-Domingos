import { useState } from 'react'
import { Building, ShoppingCart, Package, Leaf, Factory, ShoppingBag, Users, Heart, ArrowRight } from 'lucide-react'
import { buildWhatsAppLink } from '../utils/whatsapp'
import { sectorImages } from './Setores/sectorImages'

const sectors = [
    { label: 'Prestadores de Serviços', icon: Building, desc: 'Escritórios, clínicas, consultórios e profissionais liberais' },
    { label: 'Comércio', icon: ShoppingCart, desc: 'Lojas físicas e varejos de todos os segmentos' },
    { label: 'Atacados', icon: Package, desc: 'Distribuidoras e empresas de grande volume' },
    { label: 'Rural', icon: Leaf, desc: 'Produtores rurais, fazendas e agronegócio' },
    { label: 'Indústrias', icon: Factory, desc: 'Manufatura, produção e transformação' },
    { label: 'E-commerce', icon: ShoppingBag, desc: 'Lojas virtuais e marketplaces' },
    { label: 'Associações e Cooperativas', icon: Users, desc: 'Entidades sem fins lucrativos e cooperativas' },
    { label: 'Hospitais', icon: Heart, desc: 'Clínicas, hospitais e operadoras de saúde' },
]

const CLIP_CLASS = "lg:[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]"

export default function SetoresSection() {
    const [active, setActive] = useState(0)

    return (
        <section className="relative overflow-hidden bg-zinc-950 text-white lg:h-screen lg:max-h-[980px]">
            {/* Degradês nas bordas — suaviza a transição com as seções pretas vizinhas */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 md:h-28 bg-gradient-to-b from-black to-transparent z-10" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 md:h-28 bg-gradient-to-t from-black to-transparent z-10" />
            <div className="grid lg:h-full lg:grid-cols-[58%_42%]">

                {/* Conteúdo — esquerda */}
                <div className="order-2 flex flex-col justify-center px-6 md:px-8 py-12 lg:order-1 lg:pr-14 lg:pl-[max(2.5rem,calc((100vw-1232px)/2+2.5rem))]">
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest block">
                        Onde atuamos
                    </span>
                    <h2 className="text-h2-compact mt-6 tracking-tight">
                        Setores que
                        <br />
                        <span className="text-orange-500">atendemos.</span>
                    </h2>
                    <div className="mt-5 h-0.5 w-16 bg-orange-500" />
                    <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">
                        Expertise especializada para cada segmento, com soluções sob medida para o seu negócio.
                    </p>

                    {/* Grid 2 colunas — interativo, troca a imagem no hover/click */}
                    <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2">
                        {sectors.map((sector, i) => {
                            const Icon = sector.icon
                            const isActive = i === active
                            return (
                                <button
                                    key={sector.label}
                                    type="button"
                                    onMouseEnter={() => setActive(i)}
                                    onFocus={() => setActive(i)}
                                    onClick={() => setActive(i)}
                                    aria-pressed={isActive}
                                    className={`group flex items-start gap-3 rounded-lg p-2 text-left transition-colors ${
                                        isActive ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                                    }`}
                                >
                                    <Icon
                                        size={20}
                                        className={`mt-0.5 shrink-0 transition-colors ${
                                            isActive ? "text-orange-500" : "text-orange-500/60"
                                        }`}
                                    />
                                    <div className="min-w-0">
                                        <h3 className={`text-card-title leading-snug transition-colors ${
                                            isActive ? "text-white" : "text-white/85"
                                        }`}>
                                            {sector.label}
                                        </h3>
                                        <p className="mt-0.5 text-xs leading-relaxed text-white/50">{sector.desc}</p>
                                    </div>
                                </button>
                            )
                        })}
                    </div>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <a
                            href={buildWhatsAppLink('Olá! Não encontrei meu setor no site e gostaria de saber se vocês atendem minha área.')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-orange-600"
                        >
                            <span>Não encontrou seu setor? Fale conosco</span>
                            <ArrowRight size={14} className="shrink-0 transition-transform group-hover:translate-x-1" />
                        </a>
                        <span className="text-xs text-white/50">Atendemos 14 estados · 80+ cidades</span>
                    </div>
                </div>

                {/* Imagem — banner no mobile, diagonal à direita no desktop, troca conforme setor ativo */}
                <div className="relative order-1 h-64 sm:h-80 lg:order-2 lg:h-full">
                    {sectors.map((sector, i) => (
                        <img
                            key={sector.label}
                            src={sectorImages[sector.label]}
                            alt={`Setor ${sector.label}: ${sector.desc}`}
                            loading="lazy"
                            width={1280}
                            height={1600}
                            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                                i === active ? "opacity-100" : "opacity-0"
                            } ${CLIP_CLASS}`}
                        />
                    ))}
                    <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:bg-gradient-to-l lg:from-black/60 lg:via-black/10 lg:to-transparent ${CLIP_CLASS}`}
                    />
                    {/* Legenda do setor ativo */}
                    <div className="pointer-events-none absolute right-6 bottom-6 left-6 flex flex-col gap-1 lg:left-[22%]">
                        <span className="text-[11px] font-bold tracking-[0.2em] text-orange-400 uppercase">
                            {String(active + 1).padStart(2, "0")} / {String(sectors.length).padStart(2, "0")}
                        </span>
                        <span className="text-lg font-black">{sectors[active]?.label}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
