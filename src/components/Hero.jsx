import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, TrendingDown, Users, MapPin, Award } from 'lucide-react'

const stats = [
    { value: '530+', label: 'Clientes Ativos', icon: Users },
    { value: '14', label: 'Estados', icon: MapPin },
    { value: '80+', label: 'Cidades', icon: MapPin },
    { value: '10+', label: 'Anos de experiência', icon: Award },
]

export default function Hero() {
    const heroRef = useRef(null)

    // Parallax leve no fundo
    useEffect(() => {
        const handleScroll = () => {
            if (!heroRef.current) return
            const scrollY = window.scrollY
            const bg = heroRef.current.querySelector('.hero-bg')
            if (bg) bg.style.transform = `translateY(${scrollY * 0.3}px)`
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <section
            ref={heroRef}
            className="relative flex flex-col justify-center overflow-hidden min-h-[100dvh] md:h-screen"
        >
            {/* Background com parallax */}
            <div
                className="hero-bg absolute inset-0 -top-20 -bottom-20 bg-cover bg-center will-change-transform"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&h=1000&fit=crop)',
                }}
            />

            {/* Camadas de overlay */}
            <div className="absolute inset-0 bg-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            {/* Linha decorativa lateral */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-60" />

            {/* Grain texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '128px',
                }}
            />

            {/* Conteúdo */}
            <div className="relative z-10 w-full h-full px-6 md:px-8 lg:px-10">
                <div className="max-w-7xl mx-auto h-full flex flex-col justify-between py-24 md:py-12 gap-12 md:gap-0">
                    <div className="max-w-3xl mt-8">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 mb-6 opacity-0 animate-[fadeInDown_0.6s_ease_0.1s_forwards]">
                            <span className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full tracking-wider uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                                Mais de 10 anos de experiência
                            </span>
                        </div>

                        {/* Título principal */}
                        <h1
                            className="font-black text-white leading-[0.95] mb-5 opacity-0 animate-[fadeInUp_0.7s_ease_0.2s_forwards]"
                            style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}
                        >
                            Sua empresa
                            <br />
                            <span className="text-orange-500 italic">pagando menos</span>
                            <br />
                            e lucrando mais.
                        </h1>

                        {/* Subtítulo */}
                        <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-lg opacity-0 animate-[fadeInUp_0.7s_ease_0.35s_forwards]">
                            Hub completo de soluções empresariais com atendimento
                            humanizado e ágil. Contabilidade, fiscal, DP e consultoria. Tudo em um só lugar.
                        </p>

                        {/* Botões */}
                        <div className="flex flex-wrap gap-4 opacity-0 animate-[fadeInUp_0.7s_ease_0.5s_forwards]">
                            <Link
                                to="/planos"
                                className="group flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-lg transition-all duration-200 text-sm hover:shadow-[0_0_30px_rgba(234,88,12,0.4)]"
                            >
                                Solicitar Proposta
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                to="/planos"
                                className="group flex items-center gap-2 border border-zinc-600 text-zinc-300 hover:border-white hover:text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 text-sm backdrop-blur-sm"
                            >
                                Ver Planos
                                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                            </Link>
                        </div>
                    </div>

                    {/* Stats na base */}
                    <div className="opacity-0 animate-[fadeInUp_0.7s_ease_0.7s_forwards]">
                        <div className="w-10 h-px bg-zinc-700 mb-6" />
                        <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:flex-wrap sm:gap-8">
                            {stats.map((s) => (
                                <div key={s.label} className="flex flex-col">
                                    <span className="text-2xl font-black text-white leading-none mb-1">{s.value}</span>
                                    <span className="text-zinc-500 text-xs uppercase tracking-widest">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Keyframes via style tag */}
            <style>{`
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
            `}</style>
        </section>
    )
}