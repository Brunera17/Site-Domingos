import { useState } from 'react'
import { Building, ShoppingCart, Package, Leaf, Factory, ShoppingBag, Users, Heart } from 'lucide-react'
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

const CLIP = "polygon(12% 0, 100% 0, 100% 100%, 0 100%)"

export default function SetoresSection() {
    const [active, setActive] = useState(0)

    return (
        <section className="relative overflow-hidden bg-black text-white">
            <div className="grid lg:grid-cols-2">

                {/* Conteúdo — esquerda */}
                <div className="order-2 flex flex-col justify-center px-6 py-16 md:px-10 lg:order-1 lg:py-20 lg:pr-14">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1.5 text-[11px] font-bold tracking-widest text-orange-400 uppercase">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" /> Onde atuamos
                    </span>
                    <h2 className="mt-6 text-4xl leading-[0.95] font-black tracking-tight md:text-5xl">
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
                                        <h3 className={`text-sm leading-snug font-bold transition-colors ${
                                            isActive ? "text-white" : "text-white/85"
                                        }`}>
                                            {sector.label}
                                        </h3>
                                        <p className="mt-0.5 text-xs leading-relaxed text-white/40">{sector.desc}</p>
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
                            className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-orange-600"
                        >
                            Não encontrou seu setor? Fale conosco →
                        </a>
                        <span className="text-xs text-white/40">Atendemos 14 estados · 80+ cidades</span>
                    </div>
                </div>

                {/* Imagem — direita, diagonal, troca conforme setor ativo */}
                <div className="relative order-1 min-h-[320px] lg:order-2 lg:min-h-[720px]">
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
                            }`}
                            style={{ clipPath: CLIP }}
                        />
                    ))}
                    <div
                        className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/10 to-transparent"
                        style={{ clipPath: CLIP }}
                    />
                    {/* Legenda do setor ativo */}
                    <div className="pointer-events-none absolute right-6 bottom-6 left-[15%] flex flex-col gap-1">
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