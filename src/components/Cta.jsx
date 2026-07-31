import { ArrowRight, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import pessoas from "../assets/1.webp";

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


            {/* Conteúdo */}
            <div className="relative px-6 py-12 md:absolute md:right-0 md:top-0 md:bottom-0 md:w-[45%] md:flex md:items-center md:px-14 md:py-0">
                <div className="w-full max-w-lg">

                    {/* Badge */}
                    <span className="inline-flex items-center gap-2 bg-[#E8610A]/15 border border-[#E8610A]/30 text-orange-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-7">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8610A] animate-pulse" />
                        Fale com um especialista
                    </span>

                    {/* Título */}
                    <h2
                        className="font-black text-white leading-[0.95] mb-5"
                        style={{ fontSize: 'clamp(36px, 4vw, 58px)' }}
                    >
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
                            href="https://wa.me/5514996580459"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 font-bold px-6 py-3 rounded-lg transition-all duration-200 text-sm text-white"
                            style={{ backgroundColor: '#E8610A' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#C8520A'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#E8610A'}
                        >
                            <Phone size={14} />
                            Falar no WhatsApp
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
                    <div className="flex gap-6 md:gap-8 pt-6 border-t border-zinc-800">
                        {[
                            { value: '530+', label: 'Clientes ativos' },
                            { value: '10+', label: 'Anos de mercado' },
                            { value: '30%', label: 'Economia média' },
                        ].map((s) => (
                            <div key={s.label}>
                                <div className="text-xl font-black text-white leading-none mb-1">{s.value}</div>
                                <div className="text-zinc-600 text-xs uppercase tracking-wider">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
