import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Calculator, FileText, Users, TrendingUp, DollarSign, Building2 } from 'lucide-react'

const services = [
    {
        id: 'assessoria-contabil',
        icon: Calculator,
        title: 'Assessoria Contábil',
        description: 'Escrituração completa, balanços e planejamento tributário para sua empresa pagar menos impostos legalmente.',
        detalhes: 'Cuidamos de toda a vida contábil da sua empresa com precisão e estratégia. Nosso time mantém seus registros em dia, garante conformidade e identifica oportunidades reais de economia fiscal.',
        comoFazemos: [
            'Escrituração contábil completa e atualizada',
            'Elaboração de balanços e demonstrações financeiras',
            'Planejamento tributário personalizado',
            'Controle e gestão do patrimônio empresarial',
            'Relatórios gerenciais para tomada de decisão',
        ],
        departamento: 'Contabilidade',
    },
    {
        id: 'assessoria-fiscal',
        icon: FileText,
        title: 'Assessoria Fiscal',
        description: 'Gestão completa de obrigações fiscais, apuração de impostos e recuperação de créditos tributários.',
        detalhes: 'Garantimos que sua empresa esteja sempre em dia com o fisco, sem pagar um centavo a mais do que o necessário. Identificamos créditos tributários e oportunidades de recuperação.',
        comoFazemos: [
            'Apuração mensal de todos os impostos',
            'Entrega de obrigações acessórias (SPED, EFD, etc.)',
            'Recuperação de créditos fiscais pagos indevidamente',
            'Planejamento fiscal estratégico',
            'Auditoria e revisão de compliance tributário',
        ],
        departamento: 'Fiscal / Tributário',
    },
    {
        id: 'assessoria-dp-pessoal',
        icon: Users,
        title: 'Departamento Pessoal',
        description: 'Folha de pagamento, admissões, demissões e conformidade total com eSocial e legislação trabalhista.',
        detalhes: 'Gerenciamos toda a relação trabalhista da sua empresa com segurança jurídica. Da admissão ao desligamento, passando por folha, férias, 13º e muito mais.',
        comoFazemos: [
            'Elaboração e processamento da folha de pagamento',
            'Gestão de admissões e demissões',
            'Envio de obrigações do eSocial',
            'Cálculo de férias, 13º salário e rescisões',
            'Gestão de benefícios e encargos (FGTS, INSS)',
        ],
        departamento: 'Departamento Pessoal',
    },
    {
        id: 'consultoria-empresarial',
        icon: TrendingUp,
        title: 'Consultoria Empresarial',
        description: 'Diagnóstico, planejamento estratégico e indicadores de desempenho para crescimento sustentável.',
        detalhes: 'Atuamos como parceiros estratégicos do seu negócio, trazendo visão analítica e experiência de mercado para ajudar sua empresa a crescer com segurança e inteligência.',
        comoFazemos: [
            'Diagnóstico completo da situação empresarial',
            'Definição de metas e indicadores de desempenho (KPIs)',
            'Estruturação de planejamento estratégico',
            'Reestruturação organizacional e de processos',
            'Acompanhamento contínuo dos resultados',
        ],
        departamento: 'Consultoria',
    },
    {
        id: 'bpo-financeiro',
        icon: DollarSign,
        title: 'BPO Financeiro',
        description: 'Terceirização financeira completa: contas a pagar e receber, fluxo de caixa e conciliação bancária.',
        detalhes: 'Assumimos a gestão financeira da sua empresa para que você foque no que realmente importa: crescer. Com processos organizados e relatórios claros, você toma decisões com confiança.',
        comoFazemos: [
            'Gestão de contas a pagar e a receber',
            'Controle e projeção de fluxo de caixa',
            'Conciliação bancária diária',
            'Emissão e gestão de cobranças',
            'Relatórios financeiros gerenciais mensais',
        ],
        departamento: 'Financeiro',
    },
    {
        id: 'abertura-regularizacao-empresas',
        icon: Building2,
        title: 'Abertura de Empresas',
        description: 'Abertura, alteração e regularização de empresas de forma rápida, segura e sem burocracia.',
        detalhes: 'Cuidamos de todo o processo burocrático para que sua empresa nasça ou se regularize da forma certa, no regime tributário mais vantajoso para o seu perfil.',
        comoFazemos: [
            'Abertura de MEI, ME, EPP e demais tipos societários',
            'Escolha do melhor regime tributário',
            'Obtenção de licenças e alvarás de funcionamento',
            'Alterações contratuais e societárias',
            'Regularização de empresas com pendências fiscais',
        ],
        departamento: 'Legalização Empresarial',
    },
]

export default function ServicosSection() {
    const [selected, setSelected] = useState(null)

    const selectedService = services.find(s => s.id === selected)
    const otherServices = services.filter(s => s.id !== selected)

    return (
        <section className="px-6 bg-black overflow-hidden" style={{ minHeight: 'calc(100vh - 80px)' }}>
            <div className="max-w-7xl mx-auto flex flex-col py-8 gap-5">

                {/* Cabeçalho */}
                <div className="mb-8">
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                        O que fazemos
                    </span>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                            Nossos <span className="text-orange-500">Serviços</span>
                        </h2>
                        <Link
                            to="/servicos"
                            className="group flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium transition-colors shrink-0"
                        >
                            Ver todos os serviços
                            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* Grid dinâmico */}
                <AnimatePresence mode="wait">
                    {!selected ? (
                        <motion.div
                            key="grid-normal"
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            style={{ gridAutoRows: 'calc((100vh - 80px - 180px) / 2)' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {services.map((service) => {
                                const Icon = service.icon
                                return (
                                    <motion.div
                                        key={service.id}
                                        onClick={() => setSelected(service.id)}
                                        className="group relative bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 rounded-2xl p-5 flex flex-col justify-between cursor-pointer overflow-hidden"
                                        whileHover={{ y: -4 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                        <div className="relative z-10">
                                            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 flex items-center justify-center mb-4 transition-all duration-300">
                                                <Icon size={18} className="text-zinc-400 group-hover:text-orange-500 transition-colors duration-300" />
                                            </div>
                                            <h3 className="text-white font-bold text-base mb-1.5">{service.title}</h3>
                                            <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">{service.description}</p>
                                        </div>

                                        <div className="relative z-10 flex items-center gap-2 text-zinc-600 group-hover:text-orange-500 text-xs font-semibold mt-4 transition-all duration-200">
                                            Ver detalhes
                                            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    ) : (
                        /* Estado expandido */
                        <motion.div
                            key="grid-expanded"
                            className="grid grid-cols-1 md:grid-cols-12 gap-4"
                            style={{ height: 'calc(100vh - 80px - 180px)' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            {/* Card expandido — 5 colunas */}
                            <motion.div
                                className="md:col-span-5 bg-zinc-900 border border-orange-500/30 rounded-2xl p-5 flex flex-col overflow-hidden"
                                style={{ height: 'calc(100vh - 80px - 180px)' }}
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            >
                                <div className="flex items-center gap-3 shrink-0 mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                                        <selectedService.icon size={18} className="text-orange-500" />
                                    </div>
                                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">
                                        {selectedService.departamento}
                                    </span>
                                </div>

                                <h3 className="text-white font-black text-lg leading-tight shrink-0 mb-2">
                                    {selectedService.title}
                                </h3>

                                <p className="text-zinc-400 text-xs leading-relaxed pb-3 border-b border-zinc-800 shrink-0">
                                    {selectedService.detalhes}
                                </p>

                                <h4 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 shrink-0 mt-3 mb-2">
                                    <span className="w-3 h-px bg-orange-500" />
                                    Como fazemos
                                </h4>

                                <ul className="space-y-1.5 flex-1 min-h-0 overflow-y-auto mb-3">
                                    {selectedService.comoFazemos.map((item, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.15 + i * 0.05 }}
                                            className="flex items-start gap-2 text-zinc-500 text-xs leading-relaxed"
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
                                        href="https://wa.me/5514996580459"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-4 py-2 rounded-lg text-xs transition-colors"
                                    >
                                        Falar com especialista
                                    </a>
                                    <button
                                        onClick={() => setSelected(null)}
                                        className="text-zinc-500 hover:text-white text-xs font-medium px-3 py-2 transition-colors ml-auto"
                                    >
                                        ← Voltar
                                    </button>
                                </div>
                            </motion.div>

                            {/* Os outros 5 cards — 7 colunas em grid 2x3 */}
                            <div className="md:col-span-7 grid grid-cols-2 gap-3 content-start" style={{ height: 'calc(100vh - 80px - 180px)' }}>
                                {otherServices.map((service, i) => {
                                    const Icon = service.icon
                                    return (
                                        <motion.div
                                            key={service.id}
                                            onClick={() => setSelected(service.id)}
                                            className="group relative bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 rounded-2xl p-5 flex flex-col cursor-pointer overflow-hidden"
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05, duration: 0.25 }}
                                            whileHover={{ y: -3 }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                            <div className="relative z-10">
                                                <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 flex items-center justify-center mb-3 transition-all duration-300">
                                                    <Icon size={16} className="text-zinc-400 group-hover:text-orange-500 transition-colors duration-300" />
                                                </div>
                                                <h3 className="text-white font-bold text-sm mb-1 leading-snug">{service.title}</h3>
                                                <p className="text-zinc-600 text-xs leading-relaxed line-clamp-2">{service.description}</p>
                                            </div>

                                            <div className="relative z-10 flex items-center gap-1 text-zinc-600 group-hover:text-orange-500 text-xs font-semibold mt-3 transition-all duration-200">
                                                Ver detalhes <ArrowRight size={11} />
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Rodapé */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800/60 shrink-0">
                    <p className="text-zinc-500 text-sm">
                        Mais de <span className="text-white font-semibold">15 serviços</span> disponíveis para sua empresa
                    </p>
                    <Link
                        to="/servicos"
                        className="group flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-all duration-200"
                    >
                        Ver catálogo completo
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    )
}