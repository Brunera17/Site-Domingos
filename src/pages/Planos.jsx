import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Minus, ArrowRight, Zap } from 'lucide-react'

// ── DADOS ─────────────────────────────────────────────────────────────────────

const features = [
    { id: 'escrituracao', label: 'Escrituração contábil' },
    { id: 'balancete',    label: 'Balancete mensal' },
    { id: 'sped',         label: 'SPED Contábil' },
    { id: 'dp',           label: 'DP básico' },
    { id: 'folha',        label: 'Folha de pagamento' },
    { id: 'ferias',       label: 'Férias e 13º' },
    { id: 'esocial',      label: 'eSocial' },
    { id: 'fgts',         label: 'FGTS / INSS' },
    { id: 'tributario',   label: 'Planejamento tributário' },
    { id: 'bpo',          label: 'BPO Financeiro' },
    { id: 'consultoria',  label: 'Consultoria mensal' },
    { id: 'relatorios',   label: 'Relatórios gerenciais' },
    { id: 'reunioes',     label: 'Participação em reuniões' },
]

const planos = [
    {
        id: 'bronze',
        nome: 'Bronze',
        desc: 'Compliance essencial para empresas do Simples Nacional.',
        features: {
            escrituracao: true,  balancete: true,  sped: true,
            dp: true,            folha: false,     ferias: false,
            esocial: false,      fgts: false,      tributario: false,
            bpo: false,          consultoria: false, relatorios: false,
            reunioes: false,
        },
    },
    {
        id: 'prata',
        nome: 'Prata',
        desc: 'Estrutura completa para empresas em crescimento.',
        features: {
            escrituracao: true,  balancete: true,  sped: true,
            dp: true,            folha: true,      ferias: true,
            esocial: true,       fgts: true,       tributario: false,
            bpo: false,          consultoria: false, relatorios: false,
            reunioes: false,
        },
    },
    {
        id: 'ouro',
        nome: 'Ouro',
        desc: 'Gestão contábil completa com estratégia tributária.',
        destaque: true,
        features: {
            escrituracao: true,  balancete: true,  sped: true,
            dp: true,            folha: true,      ferias: true,
            esocial: true,       fgts: true,       tributario: true,
            bpo: false,          consultoria: true, relatorios: true,
            reunioes: false,
        },
    },
    {
        id: 'platina',
        nome: 'Platina',
        desc: 'Solução estratégica completa para alto crescimento.',
        features: {
            escrituracao: true,  balancete: true,  sped: true,
            dp: true,            folha: true,      ferias: true,
            esocial: true,       fgts: true,       tributario: true,
            bpo: true,           consultoria: true, relatorios: true,
            reunioes: true,
        },
    },
]

// ── COMPONENTE ────────────────────────────────────────────────────────────────

export default function Planos() {
    const [annual, setAnnual] = useState(false)

    return (
        <div className="bg-black">

            {/* ── 1. HERO ── */}
            <section className="pt-36 pb-20 px-6 bg-black border-b border-zinc-900">
                <div className="max-w-7xl mx-auto">
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">
                        Planos e preços
                    </span>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <h1
                            className="font-black text-white leading-[0.95]"
                            style={{ fontSize: 'clamp(42px, 6vw, 80px)' }}
                        >
                            Escolha o plano
                            <br />
                            <span className="text-orange-500">certo</span> para sua empresa.
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-md leading-relaxed md:text-right">
                            Contabilidade consultiva, planejamento fiscal e compliance
                            do essencial ao estratégico.
                        </p>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mt-10">
                        {['Atendimento 100% digital', '+530 clientes ativos', '14 estados · 85 cidades', 'Equipe multidisciplinar'].map(b => (
                            <div key={b} className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 text-zinc-400 text-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                                {b}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 2. TOGGLE MENSAL / ANUAL ── */}
            <section className="py-10 px-6 bg-black">
                <div className="max-w-7xl mx-auto flex items-center gap-4">
                    <span className={`text-sm font-semibold transition-colors ${!annual ? 'text-white' : 'text-zinc-600'}`}>
                        Mensal
                    </span>
                    <button
                        onClick={() => setAnnual(!annual)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${annual ? 'bg-orange-500' : 'bg-zinc-700'}`}
                    >
                        <motion.div
                            animate={{ x: annual ? 24 : 2 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
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
                                className="flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold px-3 py-1 rounded-full"
                            >
                                <Zap size={11} /> 2 meses grátis
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* ── 3. CARDS ── */}
            <section className="pb-24 px-6 bg-black">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {planos.map((plano) => {
                        const featAtivas = features.filter(f => plano.features[f.id]).length
                        const total = features.length

                        return (
                            <div
                                key={plano.id}
                                className={`relative flex flex-col bg-zinc-900 border rounded-xl p-6 transition-all duration-300
                                    ${plano.destaque
                                        ? 'border-orange-500/50 ring-1 ring-orange-500/20'
                                        : 'border-zinc-800 hover:border-zinc-700'
                                    }`}
                            >
                                {/* Badge destaque */}
                                {plano.destaque && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            Mais escolhido
                                        </span>
                                    </div>
                                )}

                                {/* Header */}
                                <div className="mb-5">
                                    <h3 className="text-white font-black text-xl mb-1">{plano.nome}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{plano.desc}</p>
                                </div>

                                {/* Preço */}
                                <div className="mb-6 pb-6 border-b border-zinc-800">
                                    <div className="text-orange-500 font-black text-xl">Sob consulta</div>
                                    <p className="text-zinc-600 text-xs mt-1">Valor personalizado para seu negócio</p>
                                </div>

                                {/* Cobertura visual */}
                                <div className="mb-5">
                                    <div className="flex justify-between text-xs text-zinc-500 mb-1.5">
                                        <span>Cobertura</span>
                                        <span className="text-orange-500 font-bold">{featAtivas}/{total}</span>
                                    </div>
                                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-orange-500 rounded-full transition-all duration-500"
                                            style={{ width: `${(featAtivas / total) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Features */}
                                <ul className="space-y-2 flex-1 mb-6">
                                    {features.map(f => {
                                        const ativo = plano.features[f.id]
                                        return (
                                            <li key={f.id} className={`flex items-center gap-2.5 text-xs ${ativo ? 'text-zinc-300' : 'text-zinc-700'}`}>
                                                {ativo
                                                    ? <Check size={13} className="text-orange-500 shrink-0" />
                                                    : <Minus size={13} className="text-zinc-800 shrink-0" />
                                                }
                                                {f.label}
                                            </li>
                                        )
                                    })}
                                </ul>

                                {/* CTA */}
                                <a
                                    href="https://wa.me/5514996580459"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all duration-200
                                        ${plano.destaque
                                            ? 'bg-orange-500 hover:bg-orange-600 text-white'
                                            : 'border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white'
                                        }`}
                                >
                                    Solicitar proposta <ArrowRight size={14} />
                                </a>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* ── 4. TABELA COMPARATIVA ── */}
            <section className="py-24 px-6 bg-zinc-950">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-14">
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                            Comparativo completo
                        </span>
                        <h2 className="text-4xl font-black text-white">
                            O que está <span className="text-orange-500">incluso</span> em cada plano
                        </h2>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-zinc-800">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="bg-zinc-900 border-b border-zinc-800">
                                    <th className="text-left px-6 py-4 text-zinc-500 text-xs font-bold uppercase tracking-widest w-1/3">
                                        Recurso
                                    </th>
                                    {planos.map(p => (
                                        <th key={p.id} className="px-4 py-4 text-center">
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
                                        className={`border-b border-zinc-800/50 hover:bg-zinc-900/40 transition-colors ${i % 2 === 0 ? 'bg-zinc-900/20' : ''}`}
                                    >
                                        <td className="px-6 py-3.5 text-zinc-400 text-sm">{f.label}</td>
                                        {planos.map(p => (
                                            <td key={p.id} className="px-4 py-3.5 text-center">
                                                {p.features[f.id]
                                                    ? <Check size={16} className="text-orange-500 mx-auto" />
                                                    : <Minus size={16} className="text-zinc-800 mx-auto" />
                                                }
                                            </td>
                                        ))}
                                    </tr>
                                ))}

                                {/* Linha CTA */}
                                <tr className="bg-zinc-900 border-t border-zinc-700">
                                    <td className="px-6 py-5 text-zinc-500 text-xs">Todos os planos sob consulta</td>
                                    {planos.map(p => (
                                        <td key={p.id} className="px-4 py-5 text-center">
                                            <a
                                                href="https://wa.me/5514996580459"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-all
                                                    ${p.destaque
                                                        ? 'bg-orange-500 hover:bg-orange-600 text-white'
                                                        : 'border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white'
                                                    }`}
                                            >
                                                Contratar <ArrowRight size={11} />
                                            </a>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ── 5. CTA FINAL ── */}
            <section className="py-24 px-6 bg-black border-t border-zinc-900">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-4 block">
                        Ainda com dúvidas?
                    </span>
                    <h2 className="text-4xl font-black text-white mb-4">
                        Fale com um <span className="text-orange-500">especialista</span>
                    </h2>
                    <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
                        Nosso time analisa o perfil da sua empresa e indica o plano ideal —
                        sem compromisso e sem enrolação.
                    </p>
                    <a
                        href="https://wa.me/5514996580459"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-lg transition-colors"
                    >
                        Falar pelo WhatsApp <ArrowRight size={16} />
                    </a>
                </div>
            </section>

        </div>
    )
}