import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Minus, ArrowRight, Zap } from 'lucide-react'

// ── DADOS ─────────────────────────────────────────────────────────────────────

const features = [
    { id: 'escrituracao',    label: 'Escrituração contábil' },
    { id: 'balancete',       label: 'Balancete mensal' },
    { id: 'sped',            label: 'SPED Contábil' },
    { id: 'dp',              label: 'DP básico' },
    { id: 'folha',           label: 'Folha de pagamento' },
    { id: 'ferias',          label: 'Férias e 13º' },
    { id: 'esocial',         label: 'eSocial' },
    { id: 'fgts',            label: 'FGTS / INSS' },
    { id: 'tributario',      label: 'Planejamento tributário' },
    { id: 'bpo',             label: 'BPO Financeiro' },
    { id: 'consultoria',     label: 'Consultoria mensal' },
    { id: 'relatorios',      label: 'Relatórios gerenciais' },
    { id: 'reunioes',        label: 'Participação em reuniões' },
]

const planos = [
    {
        id: 'bronze',
        nome: 'Bronze',
        desc: 'Compliance essencial para empresas do Simples Nacional.',
        precoMensal: 490,
        precoAnual: 408,
        destaque: false,
        ctaLabel: 'Solicitar proposta',
        features: {
            escrituracao: true,
            balancete: true,
            sped: true,
            dp: true,
            folha: false,
            ferias: false,
            esocial: false,
            fgts: false,
            tributario: false,
            bpo: false,
            consultoria: false,
            relatorios: false,
            reunioes: false,
        },
    },
    {
        id: 'prata',
        nome: 'Prata',
        desc: 'Estrutura completa para empresas em crescimento.',
        precoMensal: 890,
        precoAnual: 741,
        destaque: false,
        ctaLabel: 'Solicitar proposta',
        features: {
            escrituracao: true,
            balancete: true,
            sped: true,
            dp: true,
            folha: true,
            ferias: true,
            esocial: true,
            fgts: true,
            tributario: false,
            bpo: false,
            consultoria: false,
            relatorios: false,
            reunioes: false,
        },
    },
    {
        id: 'ouro',
        nome: 'Ouro',
        desc: 'Gestão contábil completa com estratégia tributária.',
        precoMensal: 1690,
        precoAnual: 1408,
        destaque: true,
        badge: 'Mais popular',
        ctaLabel: 'Solicitar proposta',
        features: {
            escrituracao: true,
            balancete: true,
            sped: true,
            dp: true,
            folha: true,
            ferias: true,
            esocial: true,
            fgts: true,
            tributario: true,
            bpo: false,
            consultoria: true,
            relatorios: true,
            reunioes: false,
        },
    },
    {
        id: 'platina',
        nome: 'Platina',
        desc: 'Solução estratégica completa para empresas de alto crescimento.',
        precoMensal: null,
        precoAnual: null,
        destaque: false,
        badge: 'Sob consulta',
        ctaLabel: 'Falar com consultor',
        features: {
            escrituracao: true,
            balancete: true,
            sped: true,
            dp: true,
            folha: true,
            ferias: true,
            esocial: true,
            fgts: true,
            tributario: true,
            bpo: true,
            consultoria: true,
            relatorios: true,
            reunioes: true,
        },
    },
]

// Cores por plano
const cores = {
    bronze:  { ring: 'border-amber-700/40',  badge: 'bg-amber-900/30 text-amber-400 border-amber-700/40',  accent: 'text-amber-500',  btn: 'border border-amber-700/50 hover:border-amber-500 text-white hover:bg-amber-900/20' },
    prata:   { ring: 'border-zinc-500/40',   badge: 'bg-zinc-800 text-zinc-300 border-zinc-600/40',         accent: 'text-zinc-300',   btn: 'border border-zinc-600 hover:border-zinc-400 text-white hover:bg-zinc-800' },
    ouro:    { ring: 'border-orange-500/60', badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30', accent: 'text-orange-500', btn: 'bg-orange-500 hover:bg-orange-600 text-white' },
    platina: { ring: 'border-sky-500/40',    badge: 'bg-sky-900/30 text-sky-400 border-sky-600/40',          accent: 'text-sky-400',    btn: 'border border-sky-700/50 hover:border-sky-500 text-white hover:bg-sky-900/20' },
}

// ── COMPONENTE ────────────────────────────────────────────────────────────────

export default function Planos() {
    const [annual, setAnnual] = useState(false)

    const getPreco = (plano) => {
        if (!plano.precoMensal) return null
        return annual ? plano.precoAnual : plano.precoMensal
    }

    return (
        <div className="bg-black">

            {/* ── HERO (mantido) ── */}
            <section className="pt-36 pb-16 px-6 bg-black relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 60% 40%, #E8610A 0%, transparent 55%)' }}
                />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="h-px w-8 bg-orange-500/50" />
                        <span className="text-zinc-500 text-xs tracking-widest uppercase">
                            Domingos Assessoria Empresarial · CRC Nº 2SP 037.257/O-8
                        </span>
                        <span className="h-px w-8 bg-orange-500/50" />
                    </div>

                    <h1
                        className="font-black text-white leading-[0.92] mb-6"
                        style={{ fontSize: 'clamp(42px, 6vw, 80px)' }}
                    >
                        Escolha o plano{' '}
                        <em className="not-italic text-orange-500">certo</em>{' '}para sua
                        <br />empresa
                    </h1>

                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                        Contabilidade consultiva, planejamento fiscal e compliance integrados
                        em quatro níveis de cobertura — do essencial ao estratégico.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {[
                            'Atendimento 100% digital',
                            '+530 clientes ativos',
                            '14 estados · 85 cidades',
                            'Equipe multidisciplinar',
                        ].map(b => (
                            <div key={b} className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 text-zinc-400 text-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                                {b}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TOGGLE ── */}
            <div className="flex items-center justify-center gap-4 py-8 px-6">
                <span className={`text-sm font-semibold transition-colors ${!annual ? 'text-white' : 'text-zinc-600'}`}>
                    Mensal
                </span>
                <button
                    onClick={() => setAnnual(!annual)}
                    className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${annual ? 'bg-orange-500' : 'bg-zinc-700'}`}
                >
                    <motion.div
                        animate={{ x: annual ? 28 : 4 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="absolute top-1 w-5 h-5 bg-white rounded-full shadow"
                    />
                </button>
                <span className={`text-sm font-semibold transition-colors ${annual ? 'text-white' : 'text-zinc-600'}`}>
                    Anual
                </span>
                <AnimatePresence>
                    {annual && (
                        <motion.span
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            className="flex items-center gap-1 bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-bold px-3 py-1 rounded-full"
                        >
                            <Zap size={11} /> 2 meses grátis
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {/* ── CARDS ── */}
            <section className="px-6 pb-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                    {planos.map((plano) => {
                        const cor = cores[plano.id]
                        const preco = getPreco(plano)
                        const featuresAtivas = features.filter(f => plano.features[f.id])

                        return (
                            <div
                                key={plano.id}
                                className={`relative flex flex-col bg-zinc-900 border rounded-2xl p-6 transition-all duration-300 ${cor.ring} ${plano.destaque ? 'ring-1 ring-orange-500/30' : ''}`}
                            >
                                {/* Glow no ouro */}
                                {plano.destaque && (
                                    <div className="absolute inset-0 rounded-2xl bg-orange-500/5 pointer-events-none" />
                                )}

                                {/* Header */}
                                <div className="mb-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-white font-black text-xl">{plano.nome}</span>
                                        {plano.badge && (
                                            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${cor.badge}`}>
                                                {plano.badge}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{plano.desc}</p>
                                </div>

                                {/* Preço */}
                                <div className="mb-6 pb-6 border-b border-zinc-800">
                                    {preco ? (
                                        <div className="flex items-end gap-1">
                                            <span className="text-zinc-400 text-sm mb-1">R$</span>
                                            <AnimatePresence mode="wait">
                                                <motion.span
                                                    key={preco}
                                                    initial={{ opacity: 0, y: -8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 8 }}
                                                    className={`font-black text-4xl ${cor.accent}`}
                                                >
                                                    {preco.toLocaleString('pt-BR')}
                                                </motion.span>
                                            </AnimatePresence>
                                            <span className="text-zinc-500 text-sm mb-1">/mês</span>
                                        </div>
                                    ) : (
                                        <div className={`font-black text-2xl ${cor.accent}`}>Sob consulta</div>
                                    )}
                                    {annual && preco && (
                                        <p className="text-zinc-600 text-xs mt-1">
                                            Equivale a R$ {(preco * 10).toLocaleString('pt-BR')}/ano
                                        </p>
                                    )}
                                </div>

                                {/* Features */}
                                <ul className="space-y-2.5 flex-1 mb-6">
                                    {features.map(f => {
                                        const ativo = plano.features[f.id]
                                        return (
                                            <li key={f.id} className={`flex items-center gap-2.5 text-sm ${ativo ? 'text-zinc-300' : 'text-zinc-700'}`}>
                                                {ativo
                                                    ? <Check size={14} className={cor.accent} />
                                                    : <Minus size={14} className="text-zinc-800" />
                                                }
                                                {f.label}
                                            </li>
                                        )
                                    })}
                                </ul>

                                {/* CTA */}
                                <a
                                    href="https://wa.me/5514996580459"
                                    target="_blank" rel="noopener noreferrer"
                                    className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${cor.btn}`}
                                >
                                    {plano.ctaLabel} <ArrowRight size={15} />
                                </a>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* ── TABELA COMPARATIVA ── */}
            <section className="py-20 px-6 bg-zinc-950">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 text-center">
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                            Comparativo completo
                        </span>
                        <h2 className="text-4xl font-black text-white">
                            O que está <span className="text-orange-500">incluso</span> em cada plano
                        </h2>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-zinc-800">
                        <table className="w-full min-w-[640px]">
                            <thead>
                                <tr className="bg-zinc-900 border-b border-zinc-800">
                                    <th className="text-left px-6 py-5 text-zinc-500 text-xs font-bold uppercase tracking-widest w-1/3">
                                        Recurso
                                    </th>
                                    {planos.map(p => (
                                        <th key={p.id} className="px-4 py-5 text-center">
                                            <span className={`font-black text-sm ${p.destaque ? 'text-orange-500' : 'text-white'}`}>
                                                {p.nome}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {features.map((f, i) => (
                                    <tr
                                        key={f.id}
                                        className={`border-b border-zinc-800/50 transition-colors hover:bg-zinc-900/40 ${i % 2 === 0 ? 'bg-zinc-900/20' : ''}`}
                                    >
                                        <td className="px-6 py-4 text-zinc-400 text-sm">{f.label}</td>
                                        {planos.map(p => {
                                            const ativo = p.features[f.id]
                                            const cor = cores[p.id]
                                            return (
                                                <td key={p.id} className="px-4 py-4 text-center">
                                                    {ativo
                                                        ? <Check size={17} className={`${cor.accent} mx-auto`} />
                                                        : <Minus size={17} className="text-zinc-800 mx-auto" />
                                                    }
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}

                                {/* Linha de preço */}
                                <tr className="bg-zinc-900 border-t border-zinc-700">
                                    <td className="px-6 py-5 text-white font-bold text-sm">
                                        {annual ? 'Valor mensal (anual)' : 'Valor mensal'}
                                    </td>
                                    {planos.map(p => {
                                        const preco = getPreco(p)
                                        const cor = cores[p.id]
                                        return (
                                            <td key={p.id} className="px-4 py-5 text-center">
                                                {preco
                                                    ? <span className={`font-black text-sm ${cor.accent}`}>R$ {preco.toLocaleString('pt-BR')}</span>
                                                    : <span className={`font-bold text-sm ${cor.accent}`}>Consulte</span>
                                                }
                                            </td>
                                        )
                                    })}
                                </tr>

                                {/* Linha de CTA */}
                                <tr className="bg-zinc-900">
                                    <td className="px-6 py-5" />
                                    {planos.map(p => {
                                        const cor = cores[p.id]
                                        return (
                                            <td key={p.id} className="px-4 py-5 text-center">
                                                <a
                                                    href="https://wa.me/5514996580459"
                                                    target="_blank" rel="noopener noreferrer"
                                                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-all ${cor.btn}`}
                                                >
                                                    Contratar <ArrowRight size={12} />
                                                </a>
                                            </td>
                                        )
                                    })}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ── CTA FINAL ── */}
            <section className="py-20 px-6 bg-black">
                <div className="max-w-2xl mx-auto text-center">
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">
                        Ainda com dúvidas?
                    </span>
                    <h2 className="text-4xl font-black text-white mb-4">
                        Fale com um <span className="text-orange-500">especialista</span>
                    </h2>
                    <p className="text-zinc-400 mb-8 leading-relaxed">
                        Nosso time analisa o perfil da sua empresa e indica o plano ideal —
                        sem compromisso e sem enrolação.
                    </p>
                    <a
                        href="https://wa.me/5514996580459"
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-colors"
                    >
                        Falar pelo WhatsApp <ArrowRight size={16} />
                    </a>
                </div>
            </section>

        </div>
    )
}