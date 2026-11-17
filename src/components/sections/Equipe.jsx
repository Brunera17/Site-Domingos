import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import fotoEquipe from '../../assets/colaboradores/otimizadas/FOTO COM TODOS.webp'
import fotoMarcelo from '../../assets/colaboradores/otimizadas/MARCELO_2.webp'

// Mostra quem atende o cliente — o parecer de SEO apontou que a home só tinha
// fotos de banco de imagens e nenhuma da equipe ou dos sócios.
export default function EquipeSection() {
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
                    <div className="lg:col-span-2 relative rounded-xl overflow-hidden aspect-[16/9]">
                        <img
                            src={fotoEquipe}
                            alt="Equipe da Domingos Assessoria Empresarial no escritório de Itaí-SP"
                            loading="lazy"
                            className="w-full h-full object-cover"
                            style={{ objectPosition: 'center 30%' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <p className="absolute bottom-5 left-5 text-white font-black text-xl">30+ colaboradores</p>
                    </div>

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
