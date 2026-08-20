import { useState } from 'react'
import { HeadphonesIcon, TrendingDown, Users, Clock, Shield, Award } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from './SectionHeading'

const diferenciais = [
    {
        icon: HeadphonesIcon,
        title: 'Atendimento de Excelência',
        desc: 'Atendimento humano, personalizado e ágil. Você não é apenas um número, cada cliente tem um consultor dedicado ao seu negócio.',
        stat: '98%',
        statLabel: 'de satisfação dos clientes',
    },
    {
        icon: TrendingDown,
        title: 'Redução de Custos',
        desc: 'Planejamento tributário eficiente para sua empresa pagar menos impostos legalmente e aumentar a lucratividade real.',
        stat: '30%',
        statLabel: 'de redução média em impostos',
    },
    {
        icon: Clock,
        title: 'Agilidade e Prazos Cumpridos',
        desc: 'Cumprimos todos os prazos fiscais e trabalhistas com antecedência. Sua empresa nunca paga multa por atraso.',
        stat: '+450',
        statLabel: 'guias enviadas por mês',
    },
    {
        icon: Shield,
        title: 'Segurança e Compliance',
        desc: 'Sua empresa 100% em conformidade com a legislação. Auditoria preventiva para evitar riscos fiscais e trabalhistas.',
        stat: '100%',
        statLabel: 'de conformidade fiscal',
    },
    {
        icon: Award,
        title: 'Experiência Consolidada',
        desc: 'Mais de 10 anos atendendo 530+ clientes em 14 estados. Reputação construída com resultados reais e mensuráveis.',
        stat: '10+',
        statLabel: 'anos de mercado',
    },
]

export default function DiferenciaisSection() {
    const [active, setActive] = useState(0)
    const current = diferenciais[active]
    const Icon = current.icon

    return (
        <section
            className="px-6 md:px-8 lg:px-10 bg-black overflow-hidden md:h-screen md:max-h-section-screen py-16 md:py-0"
        >
            <div className="max-w-6xl mx-auto md:h-full flex flex-col md:py-8 gap-6">

                {/* Cabeçalho */}
                <SectionHeading
                    eyebrow="Por que nos escolher"
                    title={<>Nossos <span className="text-orange-500">Diferenciais</span></>}
                    variant="compact"
                />

                {/* Layout principal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0">

                    {/* Coluna esquerda — destaque do item ativo */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="relative bg-zinc-900 border border-orange-500/20 rounded-2xl p-6 flex flex-col justify-between overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        >
                            {/* Glow de fundo */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 via-transparent to-transparent pointer-events-none" />

                            {/* Número grande decorativo */}
                            <span className="absolute bottom-6 right-8 text-zinc-800/80 font-black select-none"
                                style={{ fontSize: 'clamp(65px, 10vw, 112px)', lineHeight: 1 }}>
                                {String(active + 1).padStart(2, '0')}
                            </span>

                            <div className="relative z-10">
                                {/* Ícone */}
                                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-8">
                                    <Icon size={26} className="text-orange-500" />
                                </div>

                                <h3 className="text-white font-black text-2xl mb-4 leading-tight">
                                    {current.title}
                                </h3>
                                <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                                    {current.desc}
                                </p>
                            </div>

                            {/* Stat em destaque */}
                            <div className="relative z-10 mt-6">
                                <div className="w-12 h-px bg-orange-500 mb-4" />
                                <div className="text-5xl font-black text-white mb-1">
                                    {current.stat}
                                </div>
                                <div className="text-zinc-400 text-xs uppercase tracking-widest">
                                    {current.statLabel}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Coluna direita — lista vertical clicável */}
                    <div className="flex flex-col justify-between gap-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {diferenciais.map((item, i) => {
                            const ItemIcon = item.icon
                            const isActive = i === active
                            return (
                                <button
                                    key={item.title}
                                    onClick={() => setActive(i)}
                                    className={`group w-full text-left rounded-xl px-5 py-4 flex items-center gap-4 transition-all duration-200 border
                                        ${isActive
                                            ? 'bg-zinc-900 border-orange-500/40 shadow-[0_0_20px_rgba(234,88,12,0.06)]'
                                            : 'bg-transparent border-transparent hover:bg-zinc-900/60 hover:border-zinc-800'
                                        }`}
                                >
                                    {/* Indicador lateral */}
                                    <div className={`w-0.5 h-8 rounded-full shrink-0 transition-all duration-200 ${isActive ? 'bg-orange-500' : 'bg-zinc-800 group-hover:bg-zinc-700'}`} />

                                    {/* Ícone */}
                                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200
                                        ${isActive
                                            ? 'bg-orange-500/10 border border-orange-500/30'
                                            : 'bg-zinc-800 border border-zinc-700 group-hover:border-zinc-600'
                                        }`}>
                                        <ItemIcon size={16} className={`transition-colors duration-200 ${isActive ? 'text-orange-500' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                                    </div>

                                    {/* Texto */}
                                    <div className="flex-1 min-w-0">
                                        <div className={`font-semibold text-sm transition-colors duration-200 ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                                            {item.title}
                                        </div>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="text-zinc-400 text-xs mt-0.5 leading-relaxed line-clamp-1"
                                            >
                                                {item.stat} — {item.statLabel}
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Stat à direita */}
                                    <span className={`text-sm font-black shrink-0 transition-colors duration-200 ${isActive ? 'text-orange-500' : 'text-zinc-400 group-hover:text-zinc-300'}`}>
                                        {item.stat}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Rodapé */}
                <div className="flex items-center justify-between shrink-0 pt-4 border-t border-zinc-800/60">
                    <p className="text-zinc-400 text-sm">
                        Quer conhecer mais sobre nossa metodologia?{' '}
                        <a href="/sobre" className="text-orange-500 hover:text-orange-400 font-medium transition-colors">
                            Conheça nossa história →
                        </a>
                    </p>
                    <div className="flex items-center gap-2 text-zinc-400 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        530+ clientes satisfeitos
                    </div>
                </div>
            </div>
        </section>
    )
}