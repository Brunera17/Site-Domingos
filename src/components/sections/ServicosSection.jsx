import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { buildWhatsAppLink } from '../../utils/whatsapp'
import SectionHeading from '../ui/SectionHeading'
import { services as allServices } from '../../data/services'

const AUTOPLAY_DELAY = 12000     // tempo normal entre slides
const INTERACTION_DELAY = 17000   // tempo maior após interação manual

// Só os serviços em destaque aparecem no carrossel da home (têm detalhes/comoFazemos)
const services = allServices.filter((s) => s.destaque)

export default function ServicosSection() {
    const [selected, setSelected] = useState(0)
    const [activeDelay, setActiveDelay] = useState(AUTOPLAY_DELAY)
    const timerRef = useRef(null)
    const selectedService = services[selected]
    const otherServices = services.filter((_, i) => i !== selected)

    const startTimer = useCallback((delay = AUTOPLAY_DELAY) => {
        clearInterval(timerRef.current)
        timerRef.current = setInterval(() => {
            setSelected(prev => (prev + 1) % services.length)
        }, delay)
    }, [])

    // Autoplay normal ao montar
    useEffect(() => {
        startTimer(AUTOPLAY_DELAY)
        return () => clearInterval(timerRef.current)
    }, [startTimer])

    // Ao clicar manualmente, pausa mais tempo
    const handleSelect = (index) => {
        setSelected(index)
        setActiveDelay(INTERACTION_DELAY)
        startTimer(INTERACTION_DELAY)
    }

    return (
        <section
            className="px-6 md:px-8 lg:px-10 bg-black overflow-hidden md:h-screen md:max-h-section-screen py-16 md:py-0"
        >
            <div className="max-w-6xl mx-auto md:h-full flex flex-col md:py-8 gap-6 md:gap-4">

                {/* Cabeçalho */}
                <SectionHeading
                    eyebrow="O que fazemos"
                    title={<>Nossos <span className="text-orange-500">Serviços</span></>}
                    variant="compact"
                    className="mb-2"
                />

                {/* Grid expandido sempre ativo */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 min-h-0">

                    {/* Card expandido — 5 colunas (shell fica montado; só o conteúdo interno troca) */}
                    <div className="md:col-span-5 bg-zinc-900 border border-orange-500/30 rounded-2xl p-4 flex flex-col overflow-hidden relative">
                        {/* Barra de progresso do autoplay — anima de 0% a 100% de uma vez
                            (via rAF do Framer Motion) em vez de saltar em incrementos de 1%
                            por setInterval, o que causava um efeito de "travamento" visual */}
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-zinc-800 rounded-t-2xl overflow-hidden">
                            <motion.div
                                key={`${selected}-${activeDelay}`}
                                className="h-full bg-orange-500 rounded-t-2xl"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: activeDelay / 1000, ease: 'linear' }}
                            />
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selected}
                                className="flex flex-col flex-1 min-h-0"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                            >
                                <div className="flex items-center gap-3 shrink-0 mb-2 mt-2">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                                        <selectedService.icon size={18} className="text-orange-500" />
                                    </div>
                                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">
                                        {selectedService.departamento}
                                    </span>
                                </div>

                                <h3 className="text-h3 text-white leading-tight shrink-0 mb-2">
                                    {selectedService.title}
                                </h3>

                                <p className="text-zinc-400 text-xs leading-relaxed pb-3 border-b border-zinc-800 shrink-0">
                                    {selectedService.detalhes}
                                </p>

                                <h4 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 shrink-0 mt-3 mb-2">
                                    <span className="w-3 h-px bg-orange-500" />
                                    Como fazemos
                                    <span className="w-3 h-px bg-orange-500" />
                                </h4>

                                <ul className="space-y-1.5 flex-1 min-h-0 overflow-y-auto mb-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                    {selectedService.comoFazemos.map((item, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.15 + i * 0.05 }}
                                            className="flex items-start gap-2 text-zinc-400 text-xs leading-relaxed"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                                            {item}
                                        </motion.li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-800 shrink-0">
                                    <Link
                                        to={`/servicos/${selectedService.id}`}
                                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors"
                                    >
                                        Saiba mais <ArrowRight size={13} />
                                    </Link>
                                    <a
                                        href={buildWhatsAppLink(`Olá! Estava vendo os serviços de ${selectedService.title} da Domingos Assessoria no site e queria mais informações.`)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-4 py-2 rounded-lg text-xs transition-colors"
                                    >
                                        Falar com especialista
                                    </a>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Cards menores — 7 colunas */}
                    <div
                        className="md:col-span-7 grid grid-cols-2 auto-rows-min gap-3 content-start md:grid-rows-3 md:max-h-full md:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {otherServices.map((service, i) => {
                            const Icon = service.icon
                            return (
                                <motion.div
                                    key={service.id}
                                    onClick={() => handleSelect(services.findIndex(s => s.id === service.id))}
                                    className="group relative bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 rounded-2xl p-4 flex flex-col cursor-pointer overflow-hidden"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.04, duration: 0.25 }}
                                    whileHover={{ y: -3 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                    <div className="relative z-10">
                                        <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 flex items-center justify-center mb-3 transition-all duration-300">
                                            <Icon size={16} className="text-zinc-400 group-hover:text-orange-500 transition-colors duration-300" />
                                        </div>
                                        <h3 className="text-card-title text-white mb-1 leading-snug">{service.title}</h3>
                                        <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">{service.description}</p>
                                    </div>

                                    <div className="relative z-10 flex items-center gap-1 text-zinc-400 group-hover:text-orange-500 text-xs font-semibold mt-auto pt-3 transition-all duration-200">
                                        Ver detalhes <ArrowRight size={11} />
                                    </div>
                                </motion.div>
                            )
                        })}

                        {/* Botão ver todos os serviços no espaço vazio */}
                        <Link
                            to="/servicos"
                            className="group relative bg-zinc-900/40 border border-dashed border-zinc-700 hover:border-orange-500/40 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-300 hover:bg-zinc-900"
                        >
                            <div className="w-9 h-9 rounded-lg bg-zinc-800 group-hover:bg-orange-500/10 border border-zinc-700 group-hover:border-orange-500/30 flex items-center justify-center mb-3 transition-all duration-300">
                                <ArrowRight size={16} className="text-zinc-500 group-hover:text-orange-500 transition-colors duration-300" />
                            </div>
                            <p className="text-zinc-400 group-hover:text-white text-xs font-semibold text-center transition-colors duration-200">
                                Ver todos os serviços
                            </p>
                            <p className="text-zinc-400 text-xs text-center mt-1">
                                {allServices.length}+ disponíveis
                            </p>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    )
}