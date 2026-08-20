import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, User } from 'lucide-react'
import { buildWhatsAppLink } from '../utils/whatsapp'
import SectionHeading from './SectionHeading'

const testimonials = [
    {
        id: 1,
        text: 'Atendimento diferenciado, muito atenciosos, totalmente focados nas reais necessidades do cliente. Só posso recomendar e agradecer a sempre simpática e pronta atenção.',
        name: 'Silvio Adriano de Souza e Silva',
        meta: 'Local Guide · 4 avaliações',
    },
    {
        id: 2,
        text: 'Com certeza deixo meu elogio sincero e profissional dedicado a esta equipe de peso. Dia após dia trabalham com destreza, trazendo excelentes resultados á muitos empresários. Sabemos que as contabilidades tem uma vida árdua, sempre cumprindo prazos e entregando obrigações assessoras, mas vocês em especial, possuem diferenciais incríveis, algumas delas são de manifestar toda a preocupação e esforço necessário, minimizando os custos fiscais de forma lícita e exercendo soluções que estruturam o negócio dos seus clientes e amigos. Merecem todo o sucesso, no mundo dos negócios; e tenho certeza que o trajeto que vocês vem trilhando, será sempre abençoado!! Contem comigo sempre!!',
        name: 'Elaine Amaral',
        meta: '4 avaliações',
    },
    {
        id: 3,
        text: 'Equipe nota 10 ! Sempre dispostos a ajudar, sempre muito prestativos ! Dificilmente vc encontrará uma assessoria como essa por um preço melhor que eles ! Ligue lá e comprove.',
        name: 'Papellex Papelaria',
        meta: '1 avaliação',
    },
    {
        id: 4,
        text: 'Um atendimento excelente. Todos atenciosos, auxilia a empresa em todos os sentidos e soluciona todos os problemas desde departamento fiscal, contábil, recursos humanos, impostos etc. Muito confiável, indico a todos.',
        name: 'Magna Andreia Rodrigues da Costa',
        meta: '1 avaliação',
    },
    {
        id: 5,
        text: 'Excelentes profissionais mesmo a distância conseguem dar assistência necessária! Sucesso que Deus abençoe sempre.',
        name: 'Marilza Gabriel',
        meta: '1 avaliação',
    },
    {
        id: 6,
        text: 'Vendemos uma propriedade em Avaré e contamos com essa acessória maravilhosa sem transtorno algum. Parabéns equipe.',
        name: 'Sergio R Favarao',
        meta: 'Local Guide · 12 avaliações',
    },
]

function Avatar({ name, photo, size = 'w-14 h-14', iconSize = 24 }) {
    if (photo) {
        return (
            <img
                src={photo}
                alt={name}
                className={`${size} rounded-full object-cover ring-2 ring-orange-500/30 shrink-0`}
            />
        )
    }
    return (
        <div
            className={`${size} rounded-full bg-zinc-800 ring-2 ring-orange-500/30 flex items-center justify-center shrink-0`}
        >
            <User size={iconSize} className="text-orange-500" strokeWidth={2} />
        </div>
    )
}

export default function TestemunhosSection() {
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(1)
    const intervalRef = useRef(null)
    const currentRef = useRef(current)

    // Mantém a ref sincronizada fora do corpo de render (React 19 não
    // permite mutar refs durante a renderização)
    useEffect(() => {
        currentRef.current = current
    })

    const go = (index, dir) => {
        setDirection(dir)
        setCurrent((index + testimonials.length) % testimonials.length)
    }

    const next = () => go(currentRef.current + 1, 1)
    const prev = () => go(currentRef.current - 1, -1)

    // Auto-play — criado uma única vez ao montar. Usa currentRef (em vez de
    // depender de `current`) pra pegar o índice mais recente dentro do
    // callback do setInterval, sem precisar destruir/recriar o interval a
    // cada troca de depoimento.
    useEffect(() => {
        intervalRef.current = setInterval(next, 5000)
        return () => clearInterval(intervalRef.current)
    }, [])

    // Qualquer interação manual (seta, bolinha ou card lateral) pausa o
    // autoplay definitivamente — não volta a avançar sozinho depois.
    const resetTimer = (fn) => {
        clearInterval(intervalRef.current)
        fn()
    }

    const t = testimonials[current]

    return (
        <section
            className="relative px-6 md:px-8 lg:px-10 bg-zinc-950 overflow-hidden md:h-screen md:max-h-[980px] py-16 md:py-0"
        >
            {/* Degradês nas bordas — suaviza a transição com as seções pretas vizinhas */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 md:h-28 bg-gradient-to-b from-black to-transparent z-10" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 md:h-28 bg-gradient-to-t from-black to-transparent z-10" />
            <div className="max-w-6xl mx-auto md:h-full flex flex-col md:py-8 gap-8">

                {/* Cabeçalho */}
                <SectionHeading
                    eyebrow="O que dizem sobre nós"
                    title={<>Clientes que <span className="text-orange-500">confiam</span></>}
                    variant="compact"
                    action={
                        <a
                            href="https://www.google.com/search?q=Domingos+Assessoria+Empresarial+Itai+SP"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl px-5 py-3 transition-colors"
                        >
                            <div>
                                <div className="text-2xl font-black text-white leading-none">5,0</div>
                                <div className="text-zinc-400 text-xs mt-0.5">média geral</div>
                            </div>
                            <div className="w-px h-10 bg-zinc-800" />
                            <div>
                                <div className="flex gap-0.5 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className="text-orange-500 fill-orange-500" />
                                    ))}
                                </div>
                                <div className="text-zinc-400 text-xs">63 avaliações no Google</div>
                            </div>
                        </a>
                    }
                />

                {/* Carrossel principal */}
                <div className="md:flex-1 md:min-h-0 relative">
                    <div className="relative md:absolute md:inset-0 grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Card principal — shell fica montado; só o depoimento interno troca */}
                        <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 overflow-hidden">

                            {/* Aspas decorativas */}
                            <div
                                className="absolute top-4 right-6 text-zinc-800 font-black select-none leading-none"
                                style={{ fontSize: '120px' }}
                            >
                                "
                            </div>

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
                                    className="relative z-10 h-full flex flex-col justify-between"
                                >
                                    <div className="min-h-0 flex flex-col">
                                        {/* Stars */}
                                        <div className="flex gap-1 mb-6 shrink-0">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} className="text-orange-500 fill-orange-500" />
                                            ))}
                                        </div>

                                        <p className="text-white text-lg leading-relaxed font-medium overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                                            "{t.text}"
                                        </p>
                                    </div>

                                    {/* Avatar */}
                                    <div className="flex items-center gap-4 mt-8 pt-6 border-t border-zinc-800 shrink-0">
                                        <Avatar name={t.name} photo={t.avatar} />
                                        <div>
                                            <div className="text-white font-bold">{t.name}</div>
                                            <div className="text-orange-500 text-xs font-medium">{t.meta}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Coluna direita — outros depoimentos em miniatura (persistente, sem remount) */}
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
                                        className="group text-left bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl p-4 flex items-start gap-4 transition-all duration-200"
                                    >
                                        <Avatar name={item.name} photo={item.avatar} size="w-10 h-10" iconSize={18} />
                                        <div className="min-w-0">
                                            <div className="text-white text-sm font-semibold mb-1">{item.name}</div>
                                            <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2 group-hover:text-zinc-300 transition-colors">
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
                    </div>
                </div>

                {/* Rodapé */}
                <div className="flex items-center justify-between shrink-0 pt-4 border-t border-zinc-800/60">
                    <p className="text-zinc-400 text-sm">
                        Junte-se a mais de{' '}
                        <span className="text-white font-semibold">530 empresas</span>{' '}
                        que já confiam na Domingos Assessoria.
                    </p>
                    <a
                        href={buildWhatsAppLink('Olá! Vi os depoimentos de clientes no site e quero saber como a Domingos Assessoria pode ajudar minha empresa.')}
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