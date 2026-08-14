import { ArrowRight, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import pessoas from "../assets/1.webp";
import { buildWhatsAppLink } from '../utils/whatsapp'

export default function CTASection() {
    return (
        <section
            className="relative overflow-hidden bg-zinc-950 md:h-screen"
        >
            {/* Imagem — em cima no mobile (altura fixa), à esquerda com clip diagonal no desktop */}
            <div
                className="relative h-64 sm:h-80 md:h-auto md:absolute md:left-0 md:top-0 md:bottom-0 md:w-[55%] md:[clip-path:polygon(0_0,85%_0,100%_100%,0_100%)]"
            >
                <img
                    src={pessoas}
                    alt="Equipe Domingos Assessoria"
                    className="w-full h-full object-cover"
                />
                {/* Overlay escuro leve para não competir */}
                <div className="absolute inset-0 bg-black/30" />
                {/* Degradê para o texto respirar no mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent md:hidden" />
            </div>


            {/* Conteúdo — pr no lg+ usa calc() pra acompanhar a mesma margem direita
                que o resto do site tem via max-w-6xl + mx-auto (esse painel é
                ancorado com right-0/w-45%, então não passa pelo centralizador
                automático; sem o calc(), o conteúdo "vaza" além da margem em
                telas largas, já que um padding fixo não cresce como o auto-margin) */}
            <div className="relative px-6 md:px-8 py-12 md:absolute md:right-0 md:top-0 md:bottom-0 md:w-[45%] md:flex md:items-center md:py-0 lg:pl-10 lg:pr-[max(2.5rem,calc((100vw-1232px)/2+2.5rem))]">
                <div className="w-full max-w-lg">

                    {/* Badge */}
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-7 block">
                        Fale com um especialista
                    </span>

                    {/* Título */}
                    <h2 className="text-h2-compact text-white mb-5">
                        Vamos começar
                        <br />
                        <span style={{ color: '#E8610A' }}>hoje mesmo.</span>
                    </h2>

                    {/* Linha decorativa */}
                    <div className="w-12 h-0.5 mb-5" style={{ backgroundColor: '#E8610A' }} />

                    {/* Subtítulo */}
                    <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-sm">
                        Agende uma conversa com nosso time e descubra quanto
                        sua empresa pode economizar com um planejamento
                        tributário inteligente e personalizado.
                    </p>

                    {/* Botões */}
                    <div className="flex flex-wrap gap-3 mb-12">
                        <a
                            href={buildWhatsAppLink('Olá! Vim pelo site e gostaria de agendar uma conversa sobre planejamento tributário para minha empresa.')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 font-bold px-6 py-3 rounded-lg transition-all duration-200 text-sm text-white"
                            style={{ backgroundColor: '#E8610A' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#C8520A'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#E8610A'}
                        >
                            <Phone size={14} />
                            Solicite uma análise da sua empresa
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </a>
                        <Link
                            to="/planos"
                            className="group flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 text-sm"
                        >
                            Ver Planos
                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="w-10 h-px bg-zinc-700 mb-6" />
                    <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:flex-wrap sm:gap-8">
                        {[
                            { value: '530+', label: 'Clientes ativos' },
                            { value: '10+', label: 'Anos de mercado' },
                            { value: '30%', label: 'Economia média' },
                        ].map((s) => (
                            <div key={s.label} className="flex flex-col">
                                <span className="text-2xl font-black text-white leading-none mb-1">{s.value}</span>
                                <span className="text-zinc-400 text-xs uppercase tracking-widest">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
