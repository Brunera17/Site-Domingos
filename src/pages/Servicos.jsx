import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowRight, Calculator, FileText, Users, TrendingUp, DollarSign,
    Building2, Shield, Leaf, Key, RefreshCw, TreePine, ClipboardList,
    Search, Home, Flag, Star
} from 'lucide-react'

// ── DADOS ─────────────────────────────────────────────────────────────────────

const categorias = [
    'Todos',
    'Contábil e Fiscal',
    'Gestão Empresarial',
    'Legalização',
    'Especialidades',
]

const services = [
    {
        id: 'assessoria-contabil',
        icon: Calculator,
        title: 'Assessoria Contábil',
        description: 'Escrituração completa, balanços e planejamento tributário.',
        categoria: 'Contábil e Fiscal',
        destaque: true,
        tag: 'Mais procurado',
    },
    {
        id: 'assessoria-fiscal',
        icon: FileText,
        title: 'Assessoria Fiscal',
        description: 'Gestão de obrigações fiscais, apuração de impostos e recuperação de créditos.',
        categoria: 'Contábil e Fiscal',
        destaque: true,
    },
    {
        id: 'assessoria-dp-pessoal',
        icon: Users,
        title: 'Departamento Pessoal',
        description: 'Folha de pagamento, admissões, demissões e conformidade com eSocial.',
        categoria: 'Contábil e Fiscal',
        destaque: true,
    },
    {
        id: 'consultoria-empresarial',
        icon: TrendingUp,
        title: 'Consultoria Empresarial',
        description: 'Diagnóstico, planejamento estratégico e indicadores de desempenho.',
        categoria: 'Gestão Empresarial',
    },
    {
        id: 'bpo-financeiro',
        icon: DollarSign,
        title: 'BPO Financeiro',
        description: 'Terceirização financeira: contas a pagar/receber, fluxo de caixa.',
        categoria: 'Gestão Empresarial',
    },
    {
        id: 'abertura-regularizacao-empresas',
        icon: Building2,
        title: 'Abertura de Empresas',
        description: 'Abertura, alteração e regularização de empresas sem burocracia.',
        categoria: 'Legalização',
    },
    {
        id: 'assessoria-avcb-clcb',
        icon: Shield,
        title: 'AVCB e CLCB',
        description: 'Obtenção e renovação do Auto de Vistoria do Corpo de Bombeiros.',
        categoria: 'Legalização',
    },
    {
        id: 'assessoria-produtores-rurais',
        icon: Leaf,
        title: 'Assessoria Rural',
        description: 'ITR, DAE, CAFIR e contabilidade especializada para o agronegócio.',
        categoria: 'Especialidades',
    },
    {
        id: 'certificado-digital',
        icon: Key,
        title: 'Certificado Digital',
        description: 'Emissão e renovação de certificados A1 e A3 para PF e PJ.',
        categoria: 'Especialidades',
    },
    {
        id: 'recuperacao-tributaria',
        icon: RefreshCw,
        title: 'Recuperação Tributária',
        description: 'Identificação e recuperação de créditos tributários pagos indevidamente.',
        categoria: 'Contábil e Fiscal',
    },
    {
        id: 'licenciamento-ambiental',
        icon: TreePine,
        title: 'Licenciamento Ambiental',
        description: 'Assessoria em licenciamento ambiental com parceiros especializados.',
        categoria: 'Legalização',
    },
    {
        id: 'assessoria-licitacoes',
        icon: ClipboardList,
        title: 'Assessoria em Licitações',
        description: 'Apoio completo para participação em licitações públicas.',
        categoria: 'Especialidades',
    },
    {
        id: 'revisao-tributaria-cadastros',
        icon: Search,
        title: 'Revisão Tributária',
        description: 'Análise de cadastros fiscais para identificar oportunidades de economia.',
        categoria: 'Contábil e Fiscal',
    },
    {
        id: 'holding-familiar',
        icon: Home,
        title: 'Holding Familiar',
        description: 'Constituição de holdings para proteção patrimonial e planejamento sucessório.',
        categoria: 'Gestão Empresarial',
    },
    {
        id: 'prestacao-contas-partidaria',
        icon: Flag,
        title: 'Prestação de Contas Partidária',
        description: 'Assessoria em prestação de contas para partidos e campanhas eleitorais.',
        categoria: 'Especialidades',
    },
]

// ── COMPONENTE ────────────────────────────────────────────────────────────────

export default function Servicos() {
    const [filtro, setFiltro] = useState('Todos')
    const [busca, setBusca] = useState('')

    const servicosFiltrados = services.filter(s => {
        const matchCategoria = filtro === 'Todos' || s.categoria === filtro
        const matchBusca = s.title.toLowerCase().includes(busca.toLowerCase()) ||
            s.description.toLowerCase().includes(busca.toLowerCase())
        return matchCategoria && matchBusca
    })

    return (
        <div className="bg-black">

            {/* ── HERO ── */}
            <section className="pt-36 pb-20 px-6 bg-black relative overflow-hidden">
                {/* Elemento decorativo */}
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 70% 50%, #E8610A 0%, transparent 60%)',
                    }}
                />
                <div className="max-w-7xl mx-auto relative z-10">
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">
                        Soluções completas
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                        <div>
                            <h1
                                className="font-black text-white leading-[0.95] mb-6"
                                style={{ fontSize: 'clamp(42px, 5.5vw, 72px)' }}
                            >
                                Tudo que sua empresa
                                <br />
                                <span className="text-orange-500">precisa aqui.</span>
                            </h1>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                15+ serviços especializados para empresas de todos os
                                portes e segmentos. Do essencial ao estratégico.
                            </p>
                        </div>

                        {/* Stats rápidos */}
                        <div className="flex gap-8 md:justify-end">
                            {[
                                { value: '15+', label: 'Serviços' },
                                { value: '530+', label: 'Clientes' },
                                { value: '10+', label: 'Anos' },
                            ].map(s => (
                                <div key={s.label} className="text-center">
                                    <div className="text-3xl font-black text-white mb-1">{s.value}</div>
                                    <div className="text-zinc-600 text-xs uppercase tracking-wider">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FILTROS E BUSCA ── */}
            <section className="px-6 py-6 bg-black border-b border-zinc-900">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">

                    {/* Categorias */}
                    <div className="flex flex-wrap gap-2">
                        {categorias.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFiltro(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                                    filtro === cat
                                        ? 'bg-orange-500 border-orange-500 text-white'
                                        : 'bg-transparent border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
                                }`}
                            >
                                {cat}
                                {cat !== 'Todos' && (
                                    <span className="ml-1.5 opacity-50">
                                        {services.filter(s => s.categoria === cat).length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Busca */}
                    <div className="relative w-full md:w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Buscar serviço..."
                            value={busca}
                            onChange={e => setBusca(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-600 text-white text-sm placeholder-zinc-600 rounded-lg pl-9 pr-4 py-2 outline-none transition-colors"
                        />
                    </div>
                </div>
            </section>

            {/* ── GRID DE SERVIÇOS ── */}
            <section className="py-16 px-6 bg-black">
                <div className="max-w-7xl mx-auto">

                    {/* Resultado */}
                    <div className="flex items-center justify-between mb-8">
                        <p className="text-zinc-500 text-sm">
                            <span className="text-white font-semibold">{servicosFiltrados.length}</span> serviços encontrados
                        </p>
                        {(filtro !== 'Todos' || busca) && (
                            <button
                                onClick={() => { setFiltro('Todos'); setBusca('') }}
                                className="text-zinc-500 hover:text-white text-xs transition-colors"
                            >
                                Limpar filtros ×
                            </button>
                        )}
                    </div>

                    <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <AnimatePresence mode="popLayout">
                            {servicosFiltrados.map((service) => {
                                const Icon = service.icon
                                return (
                                    <motion.div
                                        key={service.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.96 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Link
                                            to={`/servicos/${service.id}`}
                                            className="group relative bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 rounded-2xl p-6 flex flex-col h-full overflow-hidden transition-all duration-300 hover:bg-zinc-800/60 block"
                                        >
                                            {/* Glow */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                            {/* Tag destaque */}
                                            {service.tag && (
                                                <span className="absolute top-4 right-4 bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                                    <Star size={9} className="fill-orange-400" />
                                                    {service.tag}
                                                </span>
                                            )}

                                            <div className="relative z-10 flex flex-col h-full">
                                                {/* Categoria */}
                                                <span className="text-zinc-600 text-xs uppercase tracking-wider mb-4">
                                                    {service.categoria}
                                                </span>

                                                {/* Ícone */}
                                                <div className="w-11 h-11 rounded-xl bg-zinc-800 border border-zinc-700 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 flex items-center justify-center mb-4 transition-all duration-300">
                                                    <Icon size={19} className="text-zinc-400 group-hover:text-orange-500 transition-colors duration-300" />
                                                </div>

                                                <h3 className="text-white font-bold text-lg mb-2 leading-snug">
                                                    {service.title}
                                                </h3>
                                                <p className="text-zinc-500 text-sm leading-relaxed flex-1">
                                                    {service.description}
                                                </p>

                                                <div className="flex items-center gap-2 text-zinc-600 group-hover:text-orange-500 text-sm font-semibold mt-5 transition-all duration-200">
                                                    Ver detalhes
                                                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </motion.div>

                    {servicosFiltrados.length === 0 && (
                        <div className="text-center py-24">
                            <p className="text-zinc-600 text-lg mb-2">Nenhum serviço encontrado.</p>
                            <button
                                onClick={() => { setFiltro('Todos'); setBusca('') }}
                                className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors"
                            >
                                Limpar filtros →
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 px-6 bg-zinc-950 border-t border-zinc-900">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">
                            Não encontrou o que procura?
                        </span>
                        <h2 className="text-3xl font-black text-white mb-4">
                            Temos parceiros para
                            <br />
                            <span className="text-orange-500">tudo que você precisa.</span>
                        </h2>
                        <p className="text-zinc-400 text-base leading-relaxed">
                            Como um hub de soluções empresariais, contamos com uma rede de
                            parceiros especializados para atender qualquer demanda da sua empresa.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
                        <a
                            href="https://wa.me/5514996580459"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-lg transition-colors"
                        >
                            Falar com especialista <ArrowRight size={18} />
                        </a>
                        <Link
                            to="/contato"
                            className="flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold px-8 py-4 rounded-lg transition-colors"
                        >
                            Enviar mensagem
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}