import { ArrowRight, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import pessoas from '../assets/colaboradores/FOTO_COM_TODOS_GRANDE.webp'

export default function CTASection() {
    return (
        <section
            className="relative overflow-hidden bg-zinc-950"
            style={{ height: '100vh' }}
        >
            {/* Imagem à esquerda com clip diagonal */}
            <div
                className="absolute left-0 top-0 bottom-0 w-[55%]"
                style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 100%)' }}
            >
                <img
                    src={pessoas}
                    alt="Equipe Domingos Assessoria"
                    className="w-full h-full object-cover"
                />
                {/* Overlay escuro leve para não competir */}
                <div className="absolute inset-0 bg-black/30" />
            </div>


            {/* Conteúdo à direita */}
            <div className="absolute right-0 top-0 bottom-0 w-[45%] flex items-center px-14">
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
                    <div className="flex gap-8 pt-6 border-t border-zinc-800">
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
