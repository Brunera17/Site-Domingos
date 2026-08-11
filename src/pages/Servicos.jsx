import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Search, Star } from 'lucide-react'
import { buildWhatsAppLink } from '../utils/whatsapp'
import { services } from '../data/services'
import SEOHead from '../components/SEOHead'

// ── DADOS ─────────────────────────────────────────────────────────────────────

const categorias = [
    'Todos',
    'Contábil e Fiscal',
    'Gestão Empresarial',
    'Legalização',
    'Especialidades',
]

const categoryAbbr = {
    'Contábil e Fiscal': 'CF',
    'Gestão Empresarial': 'GE',
    'Legalização': 'LG',
    'Especialidades': 'ES',
}

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

    const stats = [
        { label: 'Serviços', value: `${services.length}+` },
        { label: 'Setores', value: '4+' },
        { label: 'Expecialistas', value: '10+' },
    ]

    return (
        <div className="bg-black">
            <SEOHead
                title="Serviços"
                description={`Conheça os ${services.length}+ serviços especializados da Domingos Assessoria Empresarial: contabilidade, fiscal, departamento pessoal, consultoria e muito mais.`}
                canonicalPath="/servicos"
                keywords="serviços contábeis, assessoria fiscal, consultoria empresarial, departamento pessoal"
            />

            {/* ── HERO ── */}
            <section className="pt-36 pb-20 px-6 md:px-8 lg:px-10 bg-black relative overflow-hidden">
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 70% 50%, #E8610A 0%, transparent 60%)',
                    }}
                />
                <div className="max-w-6xl mx-auto relative z-10">
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">
                        Soluções completas
                    </span>
                    <h1
                        className="font-black text-white leading-[0.95] mb-6"
                        style={{ fontSize: 'clamp(36px, 4.6vw, 55px)' }}
                    >
                        Tudo que sua empresa
                        <br />
                        <span className="text-orange-500">precisa para crescer</span>
                    </h1>
                    <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                        {services.length}+ serviços especializados para empresas de todos os
                        portes e segmentos. Do essencial ao estratégico.
                    </p>
                </div>
            </section>

            {/* ── BARRA DE CONFIANÇA ── */}
            <section className="py-8 px-6 md:px-8 lg:px-10 bg-black border-y border-zinc-900">
                <div className="max-w-6xl mx-auto">
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
            </section>

            {/* ── FILTROS E BUSCA ── */}
            <section className="px-6 md:px-8 lg:px-10 py-6 bg-black border-b border-zinc-900">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">

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

            {/* ── ÍNDICE DE SERVIÇOS ── */}
            <section className="py-16 px-6 md:px-8 lg:px-10 bg-black">
                <div className="max-w-6xl mx-auto">

                    <div className="flex items-center justify-between mb-2">
                        <p className="text-zinc-600 text-xs uppercase tracking-wider">
                            <span className="text-zinc-400 font-semibold">{servicosFiltrados.length}</span> {servicosFiltrados.length === 1 ? 'registro' : 'registros'}
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

                    <div className="border-t border-zinc-800">
                        <AnimatePresence mode="popLayout">
                            {servicosFiltrados.map((service) => {
                                const Icon = service.icon
                                const originalIndex = services.findIndex(s => s.id === service.id)
                                const code = String(originalIndex + 1).padStart(2, '0')
                                const abbr = categoryAbbr[service.categoria]

                                return (
                                    <motion.div
                                        key={service.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <Link
                                            to={`/servicos/${service.id}`}
                                            className="group relative flex items-center gap-4 md:gap-6 border-b border-zinc-800 py-5 px-2 md:px-3 hover:bg-zinc-900/40 transition-colors"
                                        >
                                            {/* Barra de destaque */}
                                            <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-orange-500 scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-200" />

                                            {/* Código de registro */}
                                            <span className="hidden sm:block font-mono text-xs text-zinc-600 group-hover:text-orange-500 transition-colors w-14 shrink-0 tracking-wider">
                                                {code}·{abbr}
                                            </span>

                                            {/* Ícone */}
                                            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-orange-500/40 flex items-center justify-center shrink-0 transition-colors">
                                                <Icon size={16} className="text-zinc-500 group-hover:text-orange-500 transition-colors" />
                                            </div>

                                            {/* Conteúdo */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <h3 className="text-white font-bold text-base md:text-lg truncate">
                                                        {service.title}
                                                    </h3>
                                                    {service.tag && (
                                                        <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-orange-400 font-semibold uppercase tracking-wider shrink-0">
                                                            <Star size={9} className="fill-orange-400" />
                                                            {service.tag}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-zinc-500 text-sm leading-relaxed truncate md:whitespace-normal md:line-clamp-1">
                                                    {service.description}
                                                </p>
                                            </div>

                                            <ArrowRight size={16} className="text-zinc-700 group-hover:text-orange-500 group-hover:translate-x-1 transition-all shrink-0" />
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </div>

                    {servicosFiltrados.length === 0 && (
                        <div className="text-center py-24 border-b border-zinc-800">
                            <p className="text-zinc-600 text-lg mb-2">Nenhum registro encontrado.</p>
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
            <section className="py-20 px-6 md:px-8 lg:px-10 bg-zinc-950 border-t border-zinc-900">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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
                            href={buildWhatsAppLink('Olá! Não encontrei o serviço que preciso no site. Vocês têm parceiros para isso?')}
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
