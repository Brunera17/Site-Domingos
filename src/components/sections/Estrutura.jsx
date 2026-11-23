import { useState } from 'react'
import { MapPin, ArrowRight, Building2 } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import fotoSalao from '../../assets/espaco/area_trabalho.webp'
import fotoRecepcao from '../../assets/espaco/recepcao.webp'
import fotoLobby from '../../assets/espaco/lobby.webp'
import fotoNovaSede from '../../assets/espaco/nova_sede.webp'

const ENDERECO = 'Av. Antônio Justino Viera, 350, Jardim Planalto, Itaí - SP,'
const CEP = '18730-136'
const MAPA = 'https://maps.google.com/?q=Av.+Antônio+Justino+Viera,+350,+Itaí,+SP'

// Imagens do painel. A primeira é o projeto (render) da futura sede; as demais
// são fotos reais do escritório atual (o parecer de SEO apontou que as fotos da
// home pareciam de banco de imagens). Clicar numa miniatura a leva para o fundo.
const IMAGENS = [
    {
        src: fotoNovaSede,
        label: 'Projeto da nova sede',
        tag: 'Em breve',
        futura: true,
        alt: 'Projeto ilustrativo da futura sede da Domingos Assessoria Empresarial em Itaí-SP',
        width: 1600,
        height: 1600,
        pos: 'center 20%',
    },
    { src: fotoSalao, label: 'Salão de atendimento', alt: 'Salão de trabalho do escritório atual da Domingos Assessoria em Itaí-SP', width: 1600, height: 1200 },
    { src: fotoRecepcao, label: 'Recepção', alt: 'Recepção do escritório atual da Domingos Assessoria', width: 1600, height: 1200 },
    { src: fotoLobby, label: 'Espaço de espera', alt: 'Espaço de espera do escritório atual da Domingos Assessoria', width: 1600, height: 1200 },
]

// Mesma margem lateral do resto do site (max-w-6xl + mx-auto): os painéis são
// ancorados nas bordas da tela, então o centralizador automático não se aplica.
// (valor usado em style inline: calc() exige espaços em volta de + e -)
const SITE_GUTTER = 'max(2.5rem, calc((100vw - 1232px) / 2 + 2.5rem))'

// Layout espelha o bloco CTA: imagens num painel à esquerda com corte diagonal
// (desktop) e texto à direita; no mobile, imagens em cima e texto embaixo.
export default function EstruturaSection() {
    const [ativa, setAtiva] = useState(0)
    const destaque = IMAGENS[ativa]

    return (
        <section className="relative overflow-hidden bg-zinc-950 md:h-screen md:max-h-section-screen">
            {/* Painel de imagens — à esquerda com clip diagonal no desktop */}
            <div className="relative md:absolute md:left-0 md:top-0 md:bottom-0 md:w-[55%] md:[clip-path:polygon(0_0,85%_0,100%_100%,0_100%)]">
                {/* Imagem em destaque no fundo do painel (todas empilhadas, troca com fade) */}
                <div className="relative h-72 sm:h-96 md:h-full">
                    {IMAGENS.map((img, i) => (
                        <img
                            key={img.label}
                            src={img.src}
                            alt={img.alt}
                            loading="lazy"
                            width={img.width}
                            height={img.height}
                            style={{ objectPosition: img.pos ?? 'center' }}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                                i === ativa ? 'opacity-100' : 'opacity-0'
                            }`}
                            aria-hidden={i !== ativa}
                        />
                    ))}
                    {/* Degradê para as miniaturas e a etiqueta se destacarem */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />
                    <span
                        className={`absolute bottom-3 left-6 md:bottom-auto md:top-8 md:left-8 lg:left-[var(--gutter)] text-white text-xs font-semibold rounded-md px-2.5 py-1 ${
                            destaque.futura ? 'bg-orange-500' : 'bg-black/60 backdrop-blur-sm'
                        }`}
                        style={{ '--gutter': SITE_GUTTER }}
                    >
                        {destaque.futura ? `${destaque.tag} · ${destaque.label}` : `Escritório atual · ${destaque.label}`}
                    </span>
                </div>

                {/* Miniaturas das demais imagens — abaixo da imagem no mobile,
                    sobrepostas à base do painel no desktop (longe da borda diagonal) */}
                <div
                    className="grid grid-cols-3 gap-3 px-6 pt-3 md:absolute md:bottom-8 md:left-8 md:right-[18%] md:px-0 md:pt-0 lg:left-[var(--gutter)]"
                    style={{ '--gutter': SITE_GUTTER }}
                >
                    {IMAGENS.map((img, i) => ({ img, i }))
                        .filter(({ i }) => i !== ativa)
                        .map(({ img, i }) => (
                            <button
                                key={img.label}
                                type="button"
                                onClick={() => setAtiva(i)}
                                aria-label={`Ver ${img.label.toLowerCase()} em destaque`}
                                className="group relative rounded-lg overflow-hidden aspect-[4/3] ring-1 ring-white/10 hover:ring-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500 outline-none shadow-lg shadow-black/40 transition"
                            >
                                <img
                                    src={img.src}
                                    alt=""
                                    loading="lazy"
                                    width={img.width}
                                    height={img.height}
                                    style={{ objectPosition: img.pos ?? 'center' }}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <span
                                    className={`absolute bottom-1.5 left-1.5 md:bottom-2 md:left-2 text-white text-[10px] md:text-xs font-semibold rounded-md px-2 py-0.5 leading-tight text-left ${
                                        img.futura ? 'bg-orange-500' : 'bg-black/60 backdrop-blur-sm'
                                    }`}
                                >
                                    {img.futura ? 'Nova sede' : img.label}
                                </span>
                            </button>
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
                        subtitle="Hoje atendemos sua empresa no nosso escritório em Itaí, presencialmente ou de forma remota, em qualquer lugar do Brasil. E estamos crescendo: uma sede nova está a caminho."
                    />

                    {/* Aviso: a imagem do prédio é um projeto, não o endereço atual */}
                    <div className="mt-8 flex items-start gap-3 rounded-xl border border-orange-500/30 bg-orange-500/5 p-4">
                        <span className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                            <Building2 size={16} className="text-white" />
                        </span>
                        <div className="text-sm leading-relaxed">
                            <p className="font-bold text-white">Em breve: nossa nova sede</p>
                            <p className="text-zinc-400">
                                O prédio da imagem é o projeto da futura sede da Domingos.
                                Até a inauguração, seguimos atendendo no endereço abaixo.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex items-start gap-3 text-sm leading-relaxed">
                        <span className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                            <MapPin size={16} className="text-orange-500" />
                        </span>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Endereço atual</p>
                            <p className="text-zinc-300">{ENDERECO} <span className="whitespace-nowrap">{CEP}</span></p>
                        </div>
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
