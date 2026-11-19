import { MapPin, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import fotoSalao from '../../assets/espaco/area_trabalho.webp'
import fotoRecepcao from '../../assets/espaco/recepcao.webp'
import fotoLobby from '../../assets/espaco/lobby.webp'
import fotoNovaSede from '../../assets/espaco/nova_sede.webp'

const ENDERECO = 'Av. Antônio Justino Viera, 350 — Jardim Planalto, Itaí - SP, 18730-136'
const MAPA = 'https://maps.google.com/?q=Av.+Antônio+Justino+Viera,+350,+Itaí,+SP'

// Mostra o escritório real em Itaí (o parecer de SEO apontou que as fotos da
// home pareciam de banco de imagens). Sem destaque a pessoas: só o espaço.
export default function EstruturaSection() {
    return (
        <section className="py-section px-6 md:px-8 lg:px-10 bg-zinc-950">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-center">
                {/* Texto */}
                <div className="lg:col-span-2">
                    <SectionHeading
                        eyebrow="Venha nos conhecer"
                        title={<>Nossa estrutura <span className="text-orange-500">em Itaí</span></>}
                        subtitle="Um escritório próprio, preparado para atender sua empresa de perto — presencialmente em Itaí ou de forma remota, em qualquer lugar do Brasil."
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

                {/* Projeto da nova sede (imagem ilustrativa) + fotos reais do escritório atual */}
                <div className="lg:col-span-3 grid grid-cols-3 gap-3 md:gap-4">
                    <figure className="col-span-3 relative rounded-xl overflow-hidden aspect-[16/9]">
                        <img
                            src={fotoNovaSede}
                            alt="Projeto ilustrativo da futura sede da Domingos Assessoria Empresarial em Itaí-SP"
                            loading="lazy"
                            width="1600"
                            height="1600"
                            className="w-full h-full object-cover object-[center_20%]"
                        />
                        <figcaption className="absolute bottom-3 left-3 bg-orange-500 text-white text-xs font-semibold rounded-md px-2.5 py-1">
                            Projeto da nova sede
                        </figcaption>
                    </figure>
                    <figure className="relative rounded-xl overflow-hidden aspect-[4/3]">
                        <img
                            src={fotoSalao}
                            alt="Salão de trabalho do escritório da Domingos Assessoria em Itaí-SP"
                            loading="lazy"
                            width="1600"
                            height="1200"
                            className="w-full h-full object-cover"
                        />
                        <figcaption className="absolute bottom-2 left-2 md:bottom-3 md:left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] md:text-xs font-semibold rounded-md px-2 py-0.5 md:px-2.5 md:py-1">
                            Salão de atendimento
                        </figcaption>
                    </figure>
                    <figure className="relative rounded-xl overflow-hidden aspect-[4/3]">
                        <img
                            src={fotoRecepcao}
                            alt="Recepção do escritório da Domingos Assessoria"
                            loading="lazy"
                            width="1600"
                            height="1200"
                            className="w-full h-full object-cover"
                        />
                        <figcaption className="absolute bottom-2 left-2 md:bottom-3 md:left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] md:text-xs font-semibold rounded-md px-2 py-0.5 md:px-2.5 md:py-1">
                            Recepção
                        </figcaption>
                    </figure>
                    <figure className="relative rounded-xl overflow-hidden aspect-[4/3]">
                        <img
                            src={fotoLobby}
                            alt="Espaço de espera do escritório da Domingos Assessoria"
                            loading="lazy"
                            width="1600"
                            height="1200"
                            className="w-full h-full object-cover"
                        />
                        <figcaption className="absolute bottom-2 left-2 md:bottom-3 md:left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] md:text-xs font-semibold rounded-md px-2 py-0.5 md:px-2.5 md:py-1">
                            Espaço de espera
                        </figcaption>
                    </figure>
                </div>
            </div>
        </section>
    )
}
