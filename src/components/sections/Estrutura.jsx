import { MapPin, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import fotoSalao from '../../assets/espaco/area_trabalho.webp'
import fotoRecepcao from '../../assets/espaco/recepcao.webp'
import fotoLobby from '../../assets/espaco/lobby.webp'
import fotoNovaSede from '../../assets/espaco/nova_sede.webp'

const ENDERECO = 'Av. Antônio Justino Viera, 350 — Jardim Planalto, Itaí - SP, 18730-136'
const MAPA = 'https://maps.google.com/?q=Av.+Antônio+Justino+Viera,+350,+Itaí,+SP'

// Fotos reais do escritório atual (o parecer de SEO apontou que as fotos da
// home pareciam de banco de imagens). Sem destaque a pessoas: só o espaço.
const FOTOS_ATUAIS = [
    { src: fotoSalao, label: 'Salão de atendimento', alt: 'Salão de trabalho do escritório da Domingos Assessoria em Itaí-SP' },
    { src: fotoRecepcao, label: 'Recepção', alt: 'Recepção do escritório da Domingos Assessoria' },
    { src: fotoLobby, label: 'Espaço de espera', alt: 'Espaço de espera do escritório da Domingos Assessoria' },
]

// Mesma margem lateral do resto do site (max-w-6xl + mx-auto): os painéis são
// ancorados nas bordas da tela, então o centralizador automático não se aplica.
// (valor usado em style inline: calc() exige espaços em volta de + e -)
const SITE_GUTTER = 'max(2.5rem, calc((100vw - 1232px) / 2 + 2.5rem))'

// Layout espelha o bloco CTA: imagens num painel à esquerda com corte diagonal
// (desktop) e texto à direita; no mobile, imagens em cima e texto embaixo.
export default function EstruturaSection() {
    return (
        <section className="relative overflow-hidden bg-zinc-950 md:h-screen md:max-h-section-screen">
            {/* Painel de imagens — à esquerda com clip diagonal no desktop */}
            <div className="relative md:absolute md:left-0 md:top-0 md:bottom-0 md:w-[55%] md:[clip-path:polygon(0_0,85%_0,100%_100%,0_100%)]">
                {/* Projeto da nova sede (imagem ilustrativa) como fundo do painel */}
                <div className="relative h-72 sm:h-96 md:h-full">
                    <img
                        src={fotoNovaSede}
                        alt="Projeto ilustrativo da futura sede da Domingos Assessoria Empresarial em Itaí-SP"
                        loading="lazy"
                        width="1600"
                        height="1600"
                        className="w-full h-full object-cover object-[center_20%]"
                    />
                    {/* Degradê para as miniaturas e a etiqueta se destacarem */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />
                    <span
                        className="absolute bottom-3 left-6 md:bottom-auto md:top-8 md:left-8 lg:left-[var(--gutter)] bg-orange-500 text-white text-xs font-semibold rounded-md px-2.5 py-1"
                        style={{ '--gutter': SITE_GUTTER }}
                    >
                        Projeto da nova sede
                    </span>
                </div>

                {/* Fotos reais do escritório atual — abaixo da imagem no mobile,
                    sobrepostas à base do painel no desktop (longe da borda diagonal) */}
                <div
                    className="grid grid-cols-3 gap-3 px-6 pt-3 md:absolute md:bottom-8 md:left-8 md:right-[18%] md:px-0 md:pt-0 lg:left-[var(--gutter)]"
                    style={{ '--gutter': SITE_GUTTER }}
                >
                    {FOTOS_ATUAIS.map((foto) => (
                        <figure
                            key={foto.label}
                            className="relative rounded-lg overflow-hidden aspect-[4/3] ring-1 ring-white/10 shadow-lg shadow-black/40"
                        >
                            <img
                                src={foto.src}
                                alt={foto.alt}
                                loading="lazy"
                                width="1600"
                                height="1200"
                                className="w-full h-full object-cover"
                            />
                            <figcaption className="absolute bottom-1.5 left-1.5 md:bottom-2 md:left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] md:text-xs font-semibold rounded-md px-2 py-0.5 leading-tight">
                                {foto.label}
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>

            {/* Conteúdo — à direita no desktop, com a mesma margem direita do site */}
            <div
                className="relative px-6 md:px-8 py-12 md:absolute md:right-0 md:top-0 md:bottom-0 md:w-[45%] md:flex md:items-center md:py-0 lg:pl-10 lg:pr-[var(--gutter)]"
                style={{ '--gutter': SITE_GUTTER }}
            >
                <div className="w-full max-w-lg">
                    <SectionHeading
                        eyebrow="Venha nos conhecer"
                        title={<>Nossa estrutura <span className="text-orange-500">em Itaí</span></>}
                        subtitle="Um escritório próprio, preparado para atender sua empresa de perto, presencialmente em Itaí ou de forma remota, em qualquer lugar do Brasil."
                    />

                    <div className="mt-8 flex items-start gap-3 text-zinc-300 text-sm leading-relaxed">
                        <span className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                            <MapPin size={16} className="text-orange-500" />
                        </span>
                        <span>{ENDERECO}</span>
                    </div>

                    <a
                        href={MAPA}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-8 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm"
                    >
                        Como chegar
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </a>
                </div>
            </div>
        </section>
    )
}
