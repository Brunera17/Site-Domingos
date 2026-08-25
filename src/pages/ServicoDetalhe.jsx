import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
    ArrowLeft, ArrowRight, CheckCircle, ChevronRight,
    FileText, TrendingUp, DollarSign, Shield,
    Search, Target, Clock, BadgeCheck, ClipboardList,
} from 'lucide-react'
import SEOHead from '../components/SEOHead'
import ServiceSchema from '../components/ServiceSchema'
import SectionHeading from '../components/SectionHeading'
import { services as rawServices, featureDescs } from '../data/services'
import { buildWhatsAppLink } from '../utils/whatsapp'

// ── Valor por categoria (o "porquê", não o "o quê") ──────────────────────────
const categoryBenefits = {
    'Contábil e Fiscal': [
        { icon: Shield, text: 'Sua empresa sempre em dia com o Fisco, sem risco de multas ou autuações surpresa.' },
        { icon: TrendingUp, text: 'Planejamento tributário que reduz a carga de impostos de forma inteiramente legal.' },
        { icon: FileText, text: 'Relatórios claros, sem jargão contábil, pra você decidir com segurança.' },
    ],
    'Gestão Empresarial': [
        { icon: Target, text: 'Decisões baseadas em números reais da sua empresa, não em achismo.' },
        { icon: Clock, text: 'Menos tempo apagando incêndio operacional, mais tempo pra pensar em crescimento.' },
        { icon: DollarSign, text: 'Visão clara do caixa e da lucratividade de cada parte do negócio.' },
    ],
    'Legalização': [
        { icon: BadgeCheck, text: 'Documentação 100% regularizada, sem risco de interdição ou embargo.' },
        { icon: Clock, text: 'Processos conduzidos de ponta a ponta, sem fila e sem retrabalho.' },
        { icon: Shield, text: 'Segurança jurídica pra fechar contratos maiores e participar de licitações.' },
    ],
    'Especialidades': [
        { icon: Target, text: 'Atendimento especializado nas particularidades do seu segmento.' },
        { icon: BadgeCheck, text: 'Conformidade com as exigências específicas da sua atividade.' },
        { icon: Clock, text: 'Suporte ágil de quem já resolveu esse tipo de demanda centenas de vezes.' },
    ],
}

// ── Como funciona — processo genérico, mesma lógica para qualquer serviço ────
const processSteps = [
    { icon: Search, title: 'Diagnóstico', desc: 'Entendemos a situação atual da sua empresa e mapeamos exatamente o que precisa ser feito.' },
    { icon: ClipboardList, title: 'Execução', desc: 'Nossa equipe assume as rotinas, coloca tudo em conformidade e mantém prazos claros com você.' },
    { icon: TrendingUp, title: 'Acompanhamento', desc: 'Relatórios periódicos e suporte contínuo, pra você sempre saber onde a empresa está.' },
]

// ── Feature row com accordion ────────────────────────────────────────────────
function FeatureRow({ f, i, total, isOpen, onToggle }) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 95%', 'start 70%'] })
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

    const desc = featureDescs[f]

    return (
        <motion.div
            ref={ref}
            style={{ opacity }}
            className={`relative overflow-hidden transition-colors ${i < total - 1 ? 'border-b border-zinc-800' : ''
                } ${isOpen ? 'bg-zinc-800/40' : ''}`}
        >
            {/* Header clicável */}
            <button
                onClick={onToggle}
                className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-zinc-800/40 transition-colors group"
            >
                <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 transition-all ${isOpen
                        ? 'bg-orange-500/10 border-orange-500/30'
                        : 'bg-zinc-800 border-zinc-700 group-hover:bg-orange-500/10 group-hover:border-orange-500/20'
                    }`}>
                    <CheckCircle size={13} className={`transition-colors ${isOpen ? 'text-orange-500' : 'text-zinc-500 group-hover:text-orange-500'}`} />
                </div>
                <span className={`font-medium text-sm transition-colors flex-1 ${isOpen ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                    {f}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                >
                    <ArrowRight size={13} className={`transition-colors ${isOpen ? 'text-orange-500' : 'text-zinc-700 group-hover:text-orange-500'}`} />
                </motion.div>
            </button>

            {/* Descrição expansível */}
            <AnimatePresence>
                {isOpen && desc && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-4 pl-[60px]">
                            <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-orange-500/30 pl-4">
                                {desc}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────────
export default function ServicoDetalhe() {
    const { id } = useParams()
    const service = rawServices.find((s) => s.id === id)

    // 1. Barra de progresso de leitura
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

    // 3. Parallax do hero
    const heroRef = useRef(null)
    const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const heroY = useTransform(heroScroll, [0, 1], [0, 60])
    const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0])

    // Accordion de features
    const [openFeature, setOpenFeature] = useState(null)
    useEffect(() => {
        setOpenFeature(null)
    }, [id])

    // 404
    if (!service) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-6">
                <div className="w-20 h-20 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-2">
                    <Search size={32} className="text-zinc-600" />
                </div>
                <h2 className="text-2xl font-black">Serviço não encontrado</h2>
                <p className="text-zinc-400">O serviço que você procura não existe ou foi removido.</p>
                <Link to="/servicos" className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                    <ArrowLeft size={16} /> Ver todos os serviços
                </Link>
            </div>
        )
    }

    const Icon = service.icon ?? FileText
    const categoria = service.categoria ?? 'Serviços'
    const others = rawServices.filter((s) => s.id !== id && s.categoria === categoria).slice(0, 3)
    const fallbackOthers = rawServices.filter((s) => s.id !== id).slice(0, 3)
    const relacionados = others.length >= 2 ? others : fallbackOthers

    return (
        <div className="bg-black">

            <SEOHead
                title={`${service.title} | Domingos Assessoria Empresarial`}
                description={service.description}
                canonicalPath={`/servicos/${id}`}
                keywords={`${service.title}, ${categoria}, assessoria, consultoria, domingos`}
            />
            <ServiceSchema
                name={service.title}
                description={service.description}
                serviceType="ProfessionalService"
                url={`https://domingosassessoria.com.br/servicos/${id}`}
            />

            {/* ── HERO com PARALLAX (3) ── */}
            <section ref={heroRef} className="pt-hero-top pb-section px-6 md:px-8 lg:px-10 bg-black relative overflow-hidden">
                <div
                    className="absolute left-0 top-0 w-1/2 h-full opacity-5 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #E8610A 0%, transparent 60%)' }}
                />
                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="max-w-6xl mx-auto relative z-10"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                    >
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">
                            {categoria}
                        </span>

                        {/* ── ÍCONE ── */}
                        <div className="relative w-16 h-16 mb-6">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.35, ease: 'easeOut', delay: 0.1 }}
                                className="w-16 h-16 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center"
                            >
                                <Icon size={28} className="text-orange-500" />
                            </motion.div>
                        </div>

                        <h1 className="text-display text-white mb-6">
                            {service.title}
                        </h1>

                        <p className="text-zinc-400 text-xl leading-relaxed max-w-2xl">
                            {service.description}
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* ── BARRA DE CONFIANÇA ── */}
            <section className="py-8 px-6 md:px-8 lg:px-10 bg-black border-y border-zinc-900">
                <div className="max-w-6xl mx-auto">
                    <div className="w-10 h-px bg-zinc-700 mb-6" />
                    <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:flex-wrap sm:gap-8">
                        {[
                            { value: '530+', label: 'Empresas atendidas' },
                            { value: '10+', label: 'Anos de experiência' },
                            { value: '30+', label: 'Especialistas no time' },
                        ].map((s) => (
                            <div key={s.label} className="flex flex-col">
                                <span className="text-2xl font-black text-white leading-none mb-1">{s.value}</span>
                                <span className="text-zinc-400 text-xs uppercase tracking-widest">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── POR QUE TER ESSE SERVIÇO (valor, não recurso) ── */}
            <section className="py-section px-6 md:px-8 lg:px-10 bg-black">
                <div className="max-w-6xl mx-auto">
                    <SectionHeading
                        eyebrow="Valor real pro seu negócio"
                        title={<>Por que ter isso <span className="text-orange-500">na sua empresa</span></>}
                        className="mb-10"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {(categoryBenefits[categoria] ?? categoryBenefits['Contábil e Fiscal']).map((b, i) => {
                            const BIcon = b.icon
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: i * 0.08 }}
                                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4">
                                        <BIcon size={17} className="text-orange-500" />
                                    </div>
                                    <p className="text-zinc-300 text-sm leading-relaxed">{b.text}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── FEATURES com LINE-DRAW (4) ── */}
            {service.features.length > 0 && (
                <section className="py-section px-6 md:px-8 lg:px-10 bg-zinc-950">
                    <div className="max-w-6xl mx-auto">
                        <SectionHeading
                            eyebrow="Cobertura completa"
                            title={<>O que está <span className="text-orange-500">incluso</span></>}
                            className="mb-10"
                        />
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                            {service.features.map((f, i) => (
                                <FeatureRow
                                    key={f}
                                    f={f}
                                    i={i}
                                    total={service.features.length}
                                    isOpen={openFeature === i}
                                    onToggle={() => setOpenFeature(openFeature === i ? null : i)}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── COMO FUNCIONA ── */}
            <section className="py-section px-6 md:px-8 lg:px-10 bg-black">
                <div className="max-w-6xl mx-auto">
                    <SectionHeading
                        eyebrow="Do primeiro contato à rotina"
                        title={<>Como <span className="text-orange-500">funciona</span></>}
                        className="mb-12"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 relative">
                        {/* linha conectora (desktop) */}
                        <div className="hidden md:block absolute top-6 left-[16.5%] right-[16.5%] h-px bg-zinc-800" />
                        {processSteps.map((step, i) => {
                            const SIcon = step.icon
                            return (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: i * 0.1 }}
                                    className="relative md:px-6 md:text-center flex md:flex-col gap-4 md:gap-0 items-start md:items-center"
                                >
                                    <div className="relative z-10 w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0 md:mb-5">
                                        <SIcon size={18} className="text-orange-500" />
                                    </div>
                                    <div>
                                        <span className="text-zinc-400 text-xs font-mono block mb-1">0{i + 1}</span>
                                        <h3 className="text-card-title text-white mb-2">{step.title}</h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-section px-6 md:px-8 lg:px-10 bg-zinc-950">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative overflow-hidden"
                    >
                        <div
                            className="absolute inset-0 opacity-5 pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #E8610A 0%, transparent 60%)' }}
                        />
                        <div className="relative z-10">
                            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">
                                Pronto para começar?
                            </span>
                            <h2 className="text-2xl font-black text-white mb-3">
                                Solicite uma proposta <span className="text-orange-500">gratuita</span>
                            </h2>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Nossa equipe analisa o perfil da sua empresa e apresenta uma
                                solução personalizada, sem compromisso.
                            </p>
                        </div>
                        <div className="relative z-10 flex flex-col gap-3">
                            <a
                                href={buildWhatsAppLink(`Olá! Estava vendo os serviços de ${service.title} da Domingos Assessoria no site e gostaria de solicitar uma proposta.`)}
                                target="_blank" rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-4 rounded-xl transition-colors"
                            >
                                Solicitar pelo WhatsApp <ArrowRight size={16} />
                            </a>
                            <Link
                                to="/contato"
                                className="flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold px-6 py-4 rounded-xl transition-colors text-sm"
                            >
                                Falar com especialista
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── OUTROS SERVIÇOS ── */}
            <section className="py-section px-6 md:px-8 lg:px-10 bg-black">
                <div className="max-w-6xl mx-auto">
                    <SectionHeading
                        eyebrow="Continue explorando"
                        title={<>Outros <span className="text-orange-500">serviços</span></>}
                        action={
                            <Link to="/servicos" className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium transition-colors">
                                Ver todos <ArrowRight size={14} />
                            </Link>
                        }
                        className="mb-10"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relacionados.map((s, i) => {
                            const OtherIcon = s.icon ?? FileText
                            return (
                                <motion.div
                                    key={s.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: i * 0.08 }}
                                >
                                    <Link
                                        to={`/servicos/${s.id}`}
                                        className="group bg-zinc-900 border border-zinc-800 hover:border-orange-500/30 rounded-xl p-5 flex flex-col transition-all duration-300 hover:bg-zinc-800/60 h-full"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 group-hover:bg-orange-500/10 group-hover:border-orange-500/20 flex items-center justify-center mb-4 transition-all duration-300">
                                            <OtherIcon size={17} className="text-zinc-400 group-hover:text-orange-500 transition-colors duration-300" />
                                        </div>
                                        <h3 className="text-card-title text-white mb-2 leading-snug">{s.title}</h3>
                                        <p className="text-zinc-400 text-xs leading-relaxed flex-1 mb-4">{s.description}</p>
                                        <span className="flex items-center gap-1.5 text-zinc-400 group-hover:text-orange-500 text-xs font-semibold transition-all duration-200">
                                            Ver detalhes
                                            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </div>

                    <div className="mt-6 md:hidden text-center">
                        <Link to="/servicos" className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors">
                            Ver todos os serviços →
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    )
}