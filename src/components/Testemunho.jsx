import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
    {
        id: 1,
        text: 'A Domingos Assessoria transformou nossa gestão contábil. Reduzimos custos tributários em 30% no primeiro ano. Atendimento excepcional e equipe altamente qualificada!',
        name: 'Carlos Silva',
        role: 'Diretor Financeiro',
        company: 'Indústria Silva & Cia',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face',
    },
    {
        id: 2,
        text: 'Parceria de mais de 7 anos. A equipe é sempre atenciosa, rápida e resolve tudo com excelência. Recomendo de olhos fechados para qualquer empresário!',
        name: 'Ana Paula Rodrigues',
        role: 'Proprietária',
        company: 'Comércio Rodrigues',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face',
    },
    {
        id: 3,
        text: 'Excelente assessoria para o setor rural. Conhecem profundamente as particularidades do agronegócio e sempre apresentam soluções inteligentes e personalizadas.',
        name: 'João Mendes',
        role: 'Produtor Rural',
        company: 'Fazenda Santa Rita',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    },
    {
        id: 4,
        text: 'O atendimento humanizado e a competência técnica fazem toda diferença. Nossa gestão financeira melhorou significativamente desde que migramos para a Domingos.',
        name: 'Maria Oliveira',
        role: 'Diretora Administrativa',
        company: 'Hospital São Lucas',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    },
    {
        id: 5,
        text: 'Profissionais extremamente competentes. Nos ajudaram a economizar muito na parte tributária e hoje temos total segurança na conformidade fiscal da nossa empresa.',
        name: 'Roberto Campos',
        role: 'CEO',
        company: 'Tech Solutions Ltda',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    },
]

export default function TestemunhosSection() {
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(1)
    const intervalRef = useRef(null)

    const go = (index, dir) => {
        setDirection(dir)
        setCurrent((index + testimonials.length) % testimonials.length)
    }

    const next = () => go(current + 1, 1)
    const prev = () => go(current - 1, -1)

    // Auto-play
    useEffect(() => {
        intervalRef.current = setInterval(next, 5000)
        return () => clearInterval(intervalRef.current)
    }, [current])

    const resetTimer = (fn) => {
        clearInterval(intervalRef.current)
        fn()
    }

    const t = testimonials[current]

    return (
        <section
            className="px-6 bg-black overflow-hidden"
            style={{ height: '100vh' }}
        >
            <div className="max-w-7xl mx-auto h-full flex flex-col py-8 gap-8">

                {/* Cabeçalho */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                            O que dizem sobre nós
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                            Clientes que <span className="text-orange-500">confiam</span>
                        </h2>
                    </div>

                    {/* Rating geral */}
                    <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3">
                        <div>
                            <div className="text-3xl font-black text-white leading-none">4.9</div>
                            <div className="text-zinc-500 text-xs mt-0.5">média geral</div>
                        </div>
                        <div className="w-px h-10 bg-zinc-800" />
                        <div>
                            <div className="flex gap-0.5 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} className="text-orange-500 fill-orange-500" />
                                ))}
                            </div>
                            <div className="text-zinc-500 text-xs">200+ avaliações</div>
                        </div>
                    </div>
                </div>

                {/* Carrossel principal */}
                <div className="flex-1 min-h-0 relative">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={{
                                enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
                                center: { opacity: 1, x: 0 },
                                exit: (d) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
                            }}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {/* Card principal — depoimento ativo */}
                            <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col justify-between overflow-hidden">

                                {/* Aspas decorativas */}
                                <div
                                    className="absolute top-4 right-6 text-zinc-800 font-black select-none leading-none"
                                    style={{ fontSize: '120px' }}
                                >
                                    "
                                </div>

                                <div className="relative z-10">
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} className="text-orange-500 fill-orange-500" />
                                        ))}
                                    </div>

                                    <p className="text-white text-lg leading-relaxed font-medium">
                                        "{t.text}"
                                    </p>
                                </div>

                                {/* Avatar */}
                                <div className="relative z-10 flex items-center gap-4 mt-8 pt-6 border-t border-zinc-800">
                                    <img
                                        src={t.avatar}
                                        alt={t.name}
                                        className="w-14 h-14 rounded-full object-cover ring-2 ring-orange-500/30"
                                    />
                                    <div>
                                        <div className="text-white font-bold">{t.name}</div>
                                        <div className="text-zinc-400 text-sm">{t.role}</div>
                                        <div className="text-orange-500 text-xs font-medium">{t.company}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Coluna direita — outros depoimentos em miniatura */}
                            <div className="flex flex-col gap-3 justify-between">
                                {testimonials
                                    .filter((_, i) => i !== current)
                                    .slice(0, 3)
                                    .map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                const idx = testimonials.findIndex(t => t.id === item.id)
                                                resetTimer(() => go(idx, idx > current ? 1 : -1))
                                            }}
                                            className="group text-left bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 flex items-start gap-4 transition-all duration-200"
                                        >
                                            <img
                                                src={item.avatar}
                                                alt={item.name}
                                                className="w-10 h-10 rounded-full object-cover shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                                            />
                                            <div className="min-w-0">
                                                <div className="text-white text-sm font-semibold mb-1">{item.name}</div>
                                                <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 group-hover:text-zinc-400 transition-colors">
                                                    "{item.text}"
                                                </p>
                                            </div>
                                        </button>
                                    ))}

                                {/* Controles */}
                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex gap-2">
                                        {testimonials.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => resetTimer(() => go(i, i > current ? 1 : -1))}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                                    i === current
                                                        ? 'w-6 bg-orange-500'
                                                        : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
                                                }`}
                                            />
                                        ))}
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => resetTimer(prev)}
                                            className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                                        >
                                            <ChevronLeft size={18} />
                                        </button>
                                        <button
                                            onClick={() => resetTimer(next)}
                                            className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Rodapé */}
                <div className="flex items-center justify-between shrink-0 pt-4 border-t border-zinc-800/60">
                    <p className="text-zinc-500 text-sm">
                        Junte-se a mais de{' '}
                        <span className="text-white font-semibold">530 empresas</span>{' '}
                        que já confiam na Domingos Assessoria.
                    </p>
                    <a
                        href="https://wa.me/5514996580459"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors"
                    >
                        Quero ser o próximo →
                    </a>
                </div>
            </div>
        </section>
    )
}