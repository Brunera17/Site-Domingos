import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
    ArrowLeft, ArrowRight, CheckCircle, ChevronRight,
    Calculator, FileText, Users, TrendingUp, DollarSign,
    Building2, Shield, Leaf, Key, RefreshCw, TreePine,
    ClipboardList, Search, Home, Flag, Target, Clock, BadgeCheck,
} from 'lucide-react'
import SEOHead from '../components/SEOHead'
import { services as rawServices } from '../data/data'

// ── Mapa de ícones Lucide ─────────────────────────────────────────────────────
const iconMap = {
    'assessoria-contabil':             Calculator,
    'assessoria-fiscal':               FileText,
    'assessoria-dp-pessoal':           Users,
    'consultoria-empresarial':         TrendingUp,
    'bpo-financeiro':                  DollarSign,
    'abertura-regularizacao-empresas': Building2,
    'assessoria-avcb-clcb':            Shield,
    'assessoria-produtores-rurais':    Leaf,
    'certificado-digital':             Key,
    'recuperacao-tributaria':          RefreshCw,
    'licenciamento-ambiental':         TreePine,
    'assessoria-licitacoes':           ClipboardList,
    'revisao-tributaria-cadastros':    Search,
    'holding-familiar':                Home,
    'prestacao-contas-partidaria':     Flag,
}

const categoriaMap = {
    'assessoria-contabil':             'Contábil e Fiscal',
    'assessoria-fiscal':               'Contábil e Fiscal',
    'assessoria-dp-pessoal':           'Contábil e Fiscal',
    'recuperacao-tributaria':          'Contábil e Fiscal',
    'revisao-tributaria-cadastros':    'Contábil e Fiscal',
    'consultoria-empresarial':         'Gestão Empresarial',
    'bpo-financeiro':                  'Gestão Empresarial',
    'holding-familiar':                'Gestão Empresarial',
    'abertura-regularizacao-empresas': 'Legalização',
    'assessoria-avcb-clcb':            'Legalização',
    'licenciamento-ambiental':         'Legalização',
    'assessoria-produtores-rurais':    'Especialidades',
    'certificado-digital':             'Especialidades',
    'assessoria-licitacoes':           'Especialidades',
    'prestacao-contas-partidaria':     'Especialidades',
}

// ── Valor por categoria (o "porquê", não o "o quê") ──────────────────────────
const categoryBenefits = {
    'Contábil e Fiscal': [
        { icon: Shield,     text: 'Sua empresa sempre em dia com o Fisco, sem risco de multas ou autuações surpresa.' },
        { icon: TrendingUp, text: 'Planejamento tributário que reduz a carga de impostos de forma inteiramente legal.' },
        { icon: FileText,   text: 'Relatórios claros, sem jargão contábil, pra você decidir com segurança.' },
    ],
    'Gestão Empresarial': [
        { icon: Target,     text: 'Decisões baseadas em números reais da sua empresa, não em achismo.' },
        { icon: Clock,      text: 'Menos tempo apagando incêndio operacional, mais tempo pra pensar em crescimento.' },
        { icon: DollarSign, text: 'Visão clara do caixa e da lucratividade de cada parte do negócio.' },
    ],
    'Legalização': [
        { icon: BadgeCheck, text: 'Documentação 100% regularizada, sem risco de interdição ou embargo.' },
        { icon: Clock,      text: 'Processos conduzidos de ponta a ponta, sem fila e sem retrabalho.' },
        { icon: Shield,     text: 'Segurança jurídica pra fechar contratos maiores e participar de licitações.' },
    ],
    'Especialidades': [
        { icon: Target,     text: 'Atendimento especializado nas particularidades do seu segmento.' },
        { icon: BadgeCheck, text: 'Conformidade com as exigências específicas da sua atividade.' },
        { icon: Clock,      text: 'Suporte ágil de quem já resolveu esse tipo de demanda centenas de vezes.' },
    ],
}

// ── Como funciona — processo genérico, mesma lógica para qualquer serviço ────
const processSteps = [
    { icon: Search,        title: 'Diagnóstico',      desc: 'Entendemos a situação atual da sua empresa e mapeamos exatamente o que precisa ser feito.' },
    { icon: ClipboardList, title: 'Execução',          desc: 'Nossa equipe assume as rotinas, coloca tudo em conformidade e mantém prazos claros com você.' },
    { icon: TrendingUp,    title: 'Acompanhamento',    desc: 'Relatórios periódicos e suporte contínuo, pra você sempre saber onde a empresa está.' },
]

// ── Partículas do ícone ───────────────────────────────────────────────────────

// ── Descrições das features ───────────────────────────────────────────────────
const featureDescs = {
    // Contábil
    'Escrituração contábil completa':       'Registro sistemático de todas as operações financeiras da empresa, garantindo conformidade com as normas contábeis brasileiras.',
    'Balanços e demonstrações financeiras': 'Elaboração do Balanço Patrimonial, DRE, DFC e demais demonstrações exigidas pela legislação, com clareza e precisão.',
    'Planejamento tributário':              'Análise estratégica do enquadramento fiscal da sua empresa para reduzir legalmente a carga de impostos.',
    'Controle patrimonial':                 'Gestão e controle de bens e ativos da empresa, com inventário atualizado e depreciação calculada corretamente.',
    'Relatórios gerenciais':                'Relatórios personalizados que traduzem os números em informações claras para apoiar a tomada de decisão.',
    // Fiscal
    'Apuração de impostos':                 'Cálculo e apuração mensal de todos os impostos devidos (ICMS, PIS, COFINS, ISS, etc.) com segurança e conformidade.',
    'Entrega de obrigações acessórias':     'Envio pontual de todas as obrigações acessórias: SPED, EFD, DCTF, REINF e demais declarações ao Fisco.',
    'Recuperação de créditos fiscais':      'Identificação e recuperação de tributos pagos a maior ou indevidamente nos últimos 5 anos, com segurança jurídica.',
    'Planejamento fiscal estratégico':      'Estruturação do calendário fiscal e estratégias para reduzir o impacto tributário no fluxo de caixa da empresa.',
    'Compliance tributário':                'Monitoramento contínuo das obrigações fiscais para manter sua empresa em dia com o Fisco e evitar autuações.',
    // DP
    'Folha de pagamento':                   'Processamento mensal da folha com cálculo de salários, descontos, benefícios e encargos trabalhistas.',
    'Admissões e demissões':                'Condução completa dos processos de entrada e saída de colaboradores, com geração de todos os documentos legais.',
    'eSocial e obrigações trabalhistas':    'Envio de todos os eventos do eSocial dentro dos prazos, garantindo conformidade com a legislação trabalhista vigente.',
    'Gestão de benefícios':                 'Administração de VR, VA, VT, plano de saúde e demais benefícios dos colaboradores com controle preciso.',
    'FGTS e INSS':                          'Cálculo, geração de guias e controle de recolhimento do FGTS e INSS para todos os colaboradores.',
    // Consultoria
    'Diagnóstico empresarial':              'Análise completa da situação financeira, fiscal e operacional da empresa para identificar gargalos e oportunidades.',
    'Planejamento estratégico':             'Desenvolvimento de um plano de ação estruturado com metas, indicadores e etapas para o crescimento do negócio.',
    'Reestruturação organizacional':        'Reorganização de processos internos, estrutura societária e fluxos operacionais para aumentar a eficiência.',
    'Gestão financeira':                    'Acompanhamento do fluxo de caixa, capital de giro e saúde financeira da empresa com orientação especializada.',
    'Indicadores de desempenho':            'Definição e monitoramento de KPIs financeiros e operacionais alinhados aos objetivos do negócio.',
    // BPO
    'Contas a pagar e receber':             'Gestão e controle de todas as obrigações financeiras e recebimentos, evitando inadimplências e atrasos.',
    'Fluxo de caixa':                       'Projeção e controle diário do fluxo de caixa para garantir liquidez e planejamento financeiro eficiente.',
    'Conciliação bancária':                 'Conferência e reconciliação entre os extratos bancários e os lançamentos contábeis da empresa.',
    'Relatórios financeiros':               'Geração de relatórios periódicos com visão clara da situação financeira para suporte à gestão.',
    'Gestão de cobrança':                   'Acompanhamento de títulos em aberto e estratégias de cobrança para reduzir a inadimplência.',
    // Abertura
    'Abertura de empresas':                 'Registro completo de novas empresas junto aos órgãos municipais, estaduais e federais com agilidade.',
    'Alterações contratuais':               'Atualização de dados cadastrais, mudança de sócios, capital social ou atividades da empresa.',
    'Regularização fiscal':                 'Resolução de pendências e irregularidades junto à Receita Federal, Estadual e Municipal.',
    'Licenças e alvarás':                   'Obtenção de alvarás de funcionamento e licenças específicas junto às prefeituras e órgãos competentes.',
    'Encerramento de empresas':             'Condução de todo o processo de distrato e baixa da empresa nos órgãos competentes.',
    // AVCB
    'AVCB - Auto de Vistoria':              'Obtenção do Auto de Vistoria do Corpo de Bombeiros para regularização do imóvel junto à Defesa Civil.',
    'CLCB - Certificado de Licença':        'Emissão do Certificado de Licença do Corpo de Bombeiros para empresas de baixo risco de incêndio.',
    'Laudos técnicos':                      'Elaboração de laudos técnicos de segurança contra incêndio e pânico por profissionais habilitados.',
    'Projetos de combate a incêndio':       'Desenvolvimento de projetos de sistemas de combate a incêndio aprovados pelo Corpo de Bombeiros.',
    'Acompanhamento de vistoria':           'Suporte e acompanhamento presencial durante todo o processo de vistoria do Corpo de Bombeiros.',
    // Rural
    'ITR - Imposto Territorial Rural':      'Elaboração e entrega da declaração do ITR com apuração correta da área tributável e isenções aplicáveis.',
    'DAE - Declaração de Aptidão ao Pronaf':'Obtenção do DAP/CAF para acesso ao crédito rural e programas governamentais do agronegócio.',
    'CAFIR e SNCR':                         'Inscrição, atualização e regularização do imóvel rural no CAFIR e no Sistema Nacional de Cadastro Rural.',
    'Contabilidade rural':                  'Escrituração contábil especializada para propriedades rurais, com controle de safras e atividades agropecuárias.',
    'Planejamento fiscal rural':            'Estratégias tributárias específicas para o produtor rural, explorando benefícios e isenções da legislação agrária.',
    // Certificado Digital
    'Certificado A1 e A3':                  'Emissão de certificados digitais nos padrões A1 (armazenado em arquivo) e A3 (armazenado em token ou smartcard).',
    'Pessoa Física e Jurídica':             'Certificados para CPF e CNPJ, habilitando a assinatura digital de documentos com validade jurídica.',
    'NFe, NFSe e eSocial':                  'Habilitação para emissão de notas fiscais eletrônicas e envio de obrigações ao eSocial.',
    'Validade de 1 a 3 anos':               'Opções de validade de 1, 2 ou 3 anos com renovação simplificada antes do vencimento.',
    'Suporte completo':                     'Assistência na instalação, configuração e uso do certificado digital nos principais sistemas contábeis.',
}

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
            className={`relative overflow-hidden transition-colors ${
                i < total - 1 ? 'border-b border-zinc-800' : ''
            } ${isOpen ? 'bg-zinc-800/40' : ''}`}
        >
            {/* Header clicável */}
            <button
                onClick={onToggle}
                className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-zinc-800/40 transition-colors group"
            >
                <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                    isOpen
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
                            <p className="text-zinc-500 text-sm leading-relaxed border-l-2 border-orange-500/30 pl-4">
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
    const heroY       = useTransform(heroScroll, [0, 1], [0, 60])
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
                <h2 className="text-3xl font-black">Serviço não encontrado</h2>
                <p className="text-zinc-500">O serviço que você procura não existe ou foi removido.</p>
                <Link to="/servicos" className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                    <ArrowLeft size={16} /> Ver todos os serviços
                </Link>
            </div>
        )
    }

    const Icon = iconMap[service.id] ?? FileText
    const categoria = categoriaMap[service.id] ?? 'Serviços'
    const others = rawServices.filter((s) => s.id !== id && categoriaMap[s.id] === categoria).slice(0, 3)
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

            {/* ── HERO com PARALLAX (3) ── */}
            <section ref={heroRef} className="pt-36 pb-20 px-6 bg-black relative overflow-hidden">
                <div
                    className="absolute left-0 top-0 w-1/2 h-full opacity-5 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #E8610A 0%, transparent 60%)' }}
                />
                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="max-w-7xl mx-auto relative z-10"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                    >
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-4 block">
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

                        <h1
                            className="font-black text-white leading-[0.95] mb-6"
                            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
                        >
                            {service.title}
                        </h1>

                        <p className="text-zinc-400 text-xl leading-relaxed max-w-2xl">
                            {service.description}
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* ── BARRA DE CONFIANÇA ── */}
            <section className="py-8 px-6 bg-black border-y border-zinc-900">
                <div className="max-w-7xl mx-auto grid grid-cols-3 divide-x divide-zinc-900">
                    {[
                        { value: '530+', label: 'Empresas atendidas' },
                        { value: '10+', label: 'Anos de experiência' },
                        { value: '30+', label: 'Especialistas no time' },
                    ].map((s) => (
                        <div key={s.label} className="text-center px-2">
                            <div className="text-2xl md:text-3xl font-black text-white mb-1">{s.value}</div>
                            <div className="text-zinc-600 text-[11px] md:text-xs uppercase tracking-wider">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── POR QUE TER ESSE SERVIÇO (valor, não recurso) ── */}
            <section className="py-20 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10">
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                            Valor real pro seu negócio
                        </span>
                        <h2 className="text-3xl font-black text-white">
                            Por que ter isso <span className="text-orange-500">na sua empresa</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {(categoryBenefits[categoria] ?? categoryBenefits['Contábil e Fiscal']).map((b, i) => {
                            const BIcon = b.icon
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: i * 0.08 }}
                                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
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
                <section className="py-20 px-6 bg-zinc-950">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-10">
                            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                                Cobertura completa
                            </span>
                            <h2 className="text-3xl font-black text-white">
                                O que está <span className="text-orange-500">incluso</span>
                            </h2>
                        </div>
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
            <section className="py-20 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                            Do primeiro contato à rotina
                        </span>
                        <h2 className="text-3xl font-black text-white">
                            Como <span className="text-orange-500">funciona</span>
                        </h2>
                    </div>
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
                                        <span className="text-zinc-600 text-xs font-mono block mb-1">0{i + 1}</span>
                                        <h3 className="text-white font-bold text-base mb-1.5">{step.title}</h3>
                                        <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 px-6 bg-zinc-950">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="bg-zinc-900 border border-zinc-800 rounded-xl p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative overflow-hidden"
                    >
                        <div
                            className="absolute inset-0 opacity-5 pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #E8610A 0%, transparent 60%)' }}
                        />
                        <div className="relative z-10">
                            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">
                                Pronto para começar?
                            </span>
                            <h2 className="text-3xl font-black text-white mb-3">
                                Solicite uma proposta <span className="text-orange-500">gratuita</span>
                            </h2>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Nossa equipe analisa o perfil da sua empresa e apresenta uma
                                solução personalizada, sem compromisso.
                            </p>
                        </div>
                        <div className="relative z-10 flex flex-col gap-3">
                            <a
                                href="https://wa.me/5514996580459"
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
            <section className="py-20 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                                Continue explorando
                            </span>
                            <h2 className="text-3xl font-black text-white">
                                Outros <span className="text-orange-500">serviços</span>
                            </h2>
                        </div>
                        <Link to="/servicos" className="hidden md:flex items-center gap-2 text-zinc-500 hover:text-white text-sm font-medium transition-colors">
                            Ver todos <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {relacionados.map((s, i) => {
                            const OtherIcon = iconMap[s.id] ?? FileText
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
                                        className="group bg-zinc-900 border border-zinc-800 hover:border-orange-500/30 rounded-xl p-6 flex flex-col transition-all duration-300 hover:bg-zinc-800/60 h-full"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 group-hover:bg-orange-500/10 group-hover:border-orange-500/20 flex items-center justify-center mb-4 transition-all duration-300">
                                            <OtherIcon size={17} className="text-zinc-400 group-hover:text-orange-500 transition-colors duration-300" />
                                        </div>
                                        <h3 className="text-white font-bold mb-2 text-sm leading-snug">{s.title}</h3>
                                        <p className="text-zinc-500 text-xs leading-relaxed flex-1 mb-4">{s.description}</p>
                                        <span className="flex items-center gap-1.5 text-zinc-600 group-hover:text-orange-500 text-xs font-semibold transition-all duration-200">
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