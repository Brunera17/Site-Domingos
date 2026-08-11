import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowRight, TrendingUp, Users, BookOpen, Coffee,
    CheckCircle, Upload, FileText, MessageSquare, ChevronDown
} from 'lucide-react'
import Card from '../components/Card'
import SEOHead from '../components/SEOHead'

// ── DADOS ─────────────────────────────────────────────────────────────────────

const beneficios = [
    {
        icon: TrendingUp,
        title: 'Plano de Carreira',
        desc: 'Trilha de crescimento clara e estruturada. Sabemos onde você pode chegar e trabalhamos juntos para isso.',
    },
    {
        icon: BookOpen,
        title: 'Treinamentos Contínuos',
        desc: 'Investimos no seu desenvolvimento com cursos, workshops e acesso a plataformas de capacitação.',
    },
    {
        icon: Coffee,
        title: 'Vale Refeição/Alimentação',
        desc: 'Benefício de alimentação para que você foque no que realmente importa: crescer junto com a gente.',
    },
    {
        icon: Users,
        title: 'Ambiente Descontraído',
        desc: 'Um time que trabalha sério mas sabe se divertir. Cultura de respeito, colaboração e leveza no dia a dia.',
    },
]

const processo = [
    {
        numero: '01',
        titulo: 'Inscrição',
        desc: 'Preencha o formulário abaixo com seus dados e envie seu currículo. Analisamos todas as candidaturas com atenção.',
        icon: FileText,
    },
    {
        numero: '02',
        titulo: 'Entrevista',
        desc: 'Se o seu perfil combinar com a vaga, nossa equipe de RH entrará em contato para agendar uma conversa.',
        icon: MessageSquare,
    },
]

// 🔁 Substitua pelas vagas reais quando disponíveis
const vagas = [
    {
        id: 1,
        titulo: 'Analista Contábil',
        departamento: 'Contabilidade',
        tipo: 'CLT',
        modelo: 'Presencial',
        cidade: 'Itaí - SP',
        nivel: 'Pleno',
        descricao: 'Responsável pela escrituração contábil, elaboração de balanços e demonstrações financeiras de clientes da carteira.',
        requisitos: [
            'Formação em Ciências Contábeis (concluída ou cursando)',
            'Experiência mínima de 2 anos em escritório contábil',
            'Conhecimento em SPED Contábil',
            'Domínio do pacote Office',
        ],
    },
    {
        id: 2,
        titulo: 'Assistente de Departamento Pessoal',
        departamento: 'Departamento Pessoal',
        tipo: 'CLT',
        modelo: 'Presencial',
        cidade: 'Itaí - SP',
        nivel: 'Júnior',
        descricao: 'Apoio nas rotinas de DP: admissões, demissões, folha de pagamento e envio de obrigações do eSocial.',
        requisitos: [
            'Formação em Administração, RH ou área correlata',
            'Conhecimento básico em eSocial',
            'Organização e atenção aos detalhes',
            'Disponibilidade para aprender',
        ],
    },
    {
        id: 3,
        titulo: 'Estagiário(a) Fiscal',
        departamento: 'Fiscal / Tributário',
        tipo: 'Estágio',
        modelo: 'Presencial',
        cidade: 'Itaí - SP',
        nivel: 'Estagiário',
        descricao: 'Suporte nas rotinas fiscais: apuração de impostos, lançamentos e conferência de documentos fiscais.',
        requisitos: [
            'Cursando Ciências Contábeis, Direito ou Administração',
            'A partir do 3º semestre',
            'Proatividade e vontade de aprender',
            'Disponibilidade de 6h diárias',
        ],
    },
]

const areas = ['Contabilidade', 'Departamento Pessoal', 'Fiscal/Tributário', 'Consultoria Empresarial', 'Tecnologia da Informação', 'Administrativo', 'Comercial']
const niveis = ['Estagiário', 'Júnior', 'Pleno', 'Sênior', 'Especialista']
const disponibilidades = ['Imediata', 'Em 15 dias', 'Em 30 dias', 'Em mais de 30 dias']

// ── COMPONENTE ────────────────────────────────────────────────────────────────

const MAX_RESUME_BYTES = 3 * 1024 * 1024 // 3MB — mesmo limite validado em api/trabalhe-conosco.js

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

export default function TrabalheConosco() {
    const [vagaAberta, setVagaAberta] = useState(null)
    const [vagaSelecionada, setVagaSelecionada] = useState('')
    const [arquivo, setArquivo] = useState(null)
    const [form, setForm] = useState({ nome: '', email: '', telefone: '', area: '', nivel: '', disponibilidade: '', motivacao: '' })
    const [enviado, setEnviado] = useState(false)
    const [enviando, setEnviando] = useState(false)
    const [erro, setErro] = useState(null)

    const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleArquivo = (e) => {
        const file = e.target.files[0]
        if (!file) return
        if (file.size > MAX_RESUME_BYTES) {
            setErro('O arquivo do currículo deve ter no máximo 3MB.')
            e.target.value = ''
            return
        }
        setErro(null)
        setArquivo(file)
    }

    const submit = async (e) => {
        e.preventDefault()
        if (!arquivo) {
            setErro('Anexe seu currículo antes de enviar.')
            return
        }
        setErro(null)
        setEnviando(true)
        try {
            const resumeBase64 = await fileToBase64(arquivo)
            const resp = await fetch('/api/trabalhe-conosco', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    vagaSelecionada,
                    resumeBase64,
                    resumeFilename: arquivo.name,
                    resumeMimeType: arquivo.type,
                }),
            })
            const data = await resp.json().catch(() => ({}))
            if (!resp.ok) {
                throw new Error(data.error || 'Não foi possível enviar sua candidatura.')
            }
            setEnviado(true)
        } catch (err) {
            setErro(err.message || 'Não foi possível enviar sua candidatura. Tente novamente.')
        } finally {
            setEnviando(false)
        }
    }

    const candidatarVaga = (vaga) => {
        setVagaSelecionada(vaga.titulo)
        setForm(prev => ({ ...prev, area: vaga.departamento, nivel: vaga.nivel }))
        document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="bg-black">
            <SEOHead
                title="Trabalhe Conosco"
                description="Faça parte do time da Domingos Assessoria Empresarial. Confira as vagas abertas e envie seu currículo."
                canonicalPath="/trabalhe-conosco"
                keywords="vagas contabilidade, trabalhe conosco, emprego assessoria empresarial, carreira contábil"
                noIndex
            />

            {/* ── HERO ── */}
            <section className="pt-36 pb-20 px-6 md:px-8 lg:px-10 bg-black relative overflow-hidden">
                <div
                    className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #E8610A 0%, transparent 60%)' }}
                />
                <div className="max-w-6xl mx-auto relative z-10">
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">
                        Faça parte do time
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                        <div>
                            <h1
                                className="font-black text-white leading-[0.95] mb-6"
                                style={{ fontSize: 'clamp(34px, 4.5vw, 55px)' }}
                            >
                                Venha crescer
                                <br />
                                <span className="text-orange-500">com a gente.</span>
                            </h1>
                            <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                                Buscamos profissionais apaixonados por resultados para compor
                                um time multidisciplinar que faz a diferença na vida de centenas de empresas.
                            </p>
                        </div>

                        {/* Stats rápidos */}
                        <div className="w-10 h-px bg-zinc-700 mb-6" />
                        <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:flex-wrap sm:gap-8">
                            {[
                                { value: '30+', label: 'Colaboradores' },
                                { value: '10+', label: 'Anos de empresa' },
                                { value: '4', label: 'Vagas abertas' },
                            ].map(s => (
                                <div key={s.label} className="flex flex-col">
                                    <span className="text-2xl font-black text-white leading-none mb-1">{s.value}</span>
                                    <span className="text-zinc-500 text-xs uppercase tracking-widest">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── BENEFÍCIOS ── */}
            <section className="py-20 px-6 md:px-8 lg:px-10 bg-zinc-950">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-12">
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                            Por que trabalhar conosco
                        </span>
                        <h2 className="text-3xl font-black text-white">
                            O que oferecemos a <span className="text-orange-500">você</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {beneficios.map((b, i) => {
                            const Icon = b.icon
                            return (
                                <Card
                                    key={b.title}
                                    className="group hover:bg-zinc-800/60 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    <span className="absolute top-4 right-4 text-zinc-800 font-black text-2xl select-none">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <div className="w-11 h-11 rounded-xl bg-zinc-800 border border-zinc-700 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 flex items-center justify-center mb-5 transition-all duration-300">
                                        <Icon size={19} className="text-zinc-400 group-hover:text-orange-500 transition-colors duration-300" />
                                    </div>
                                    <h3 className="text-white font-bold mb-2">{b.title}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{b.desc}</p>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── VAGAS ABERTAS ── */}
            <section className="py-20 px-6 md:px-8 lg:px-10 bg-black">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-12">
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                            Oportunidades
                        </span>
                        <h2 className="text-3xl font-black text-white">
                            Vagas <span className="text-orange-500">abertas</span>
                        </h2>
                    </div>

                    <div className="flex flex-col gap-4">
                        {vagas.map((vaga) => (
                            <div key={vaga.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">

                                {/* Header da vaga */}
                                <button
                                    onClick={() => setVagaAberta(vagaAberta === vaga.id ? null : vaga.id)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-800/50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-white font-bold text-lg">{vaga.titulo}</h3>
                                                <span className="bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold px-2.5 py-0.5 rounded-full">
                                                    {vaga.nivel}
                                                </span>
                                                <span className="bg-zinc-800 text-zinc-400 text-xs px-2.5 py-0.5 rounded-full">
                                                    {vaga.tipo}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-zinc-500 text-sm">
                                                <span>{vaga.departamento}</span>
                                                <span>·</span>
                                                <span>{vaga.modelo}</span>
                                                <span>·</span>
                                                <span>{vaga.cidade}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronDown
                                        size={20}
                                        className={`text-zinc-500 transition-transform duration-300 shrink-0 ml-4 ${vagaAberta === vaga.id ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {/* Detalhes da vaga */}
                                <AnimatePresence>
                                    {vagaAberta === vaga.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 pt-2 border-t border-zinc-800">
                                                <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                                                    {vaga.descricao}
                                                </p>
                                                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                                                    <span className="w-3 h-px bg-orange-500" />
                                                    Requisitos
                                                </h4>
                                                <ul className="space-y-2 mb-6">
                                                    {vaga.requisitos.map((r, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-zinc-500 text-sm">
                                                            <CheckCircle size={14} className="text-orange-500 mt-0.5 shrink-0" />
                                                            {r}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <button
                                                    onClick={() => candidatarVaga(vaga)}
                                                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm"
                                                >
                                                    Candidatar-me a esta vaga <ArrowRight size={15} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PROCESSO SELETIVO ── */}
            <section className="py-20 px-6 md:px-8 lg:px-10 bg-zinc-950">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-12">
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                            Como funciona
                        </span>
                        <h2 className="text-3xl font-black text-white">
                            Processo <span className="text-orange-500">Seletivo</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                        {processo.map((etapa, i) => {
                            const Icon = etapa.icon
                            return (
                                <div key={etapa.numero} className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                                    <span className="absolute top-5 right-6 text-zinc-800 font-black text-3xl select-none leading-none">
                                        {etapa.numero}
                                    </span>
                                    <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5">
                                        <Icon size={19} className="text-orange-500" />
                                    </div>
                                    <h3 className="text-white font-bold text-lg mb-2">{etapa.titulo}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{etapa.desc}</p>
                                </div>
                            )
                        })}
                    </div>

                    <p className="text-zinc-600 text-sm mt-6">
                        ⏱ Prazo médio de retorno: <span className="text-zinc-400">até 5 dias úteis</span> após o envio da candidatura.
                    </p>
                </div>
            </section>

            {/* ── FORMULÁRIO ── */}
            <section id="formulario" className="py-20 px-6 md:px-8 lg:px-10 bg-black">
                <div className="max-w-2xl mx-auto">
                    {enviado ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-16"
                        >
                            <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={36} className="text-green-500" />
                            </div>
                            <h2 className="text-2xl font-black text-white mb-3">Candidatura Enviada!</h2>
                            <p className="text-zinc-400 text-lg mb-8">
                                Recebemos sua candidatura. Nossa equipe vai analisar seu perfil
                                e entrará em contato em até 5 dias úteis.
                            </p>
                            <button
                                onClick={() => {
                                    setForm({ nome: '', email: '', telefone: '', area: '', nivel: '', disponibilidade: '', motivacao: '' })
                                    setArquivo(null)
                                    setVagaSelecionada('')
                                    setEnviado(false)
                                }}
                                className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors"
                            >
                                Enviar outra candidatura
                            </button>
                        </motion.div>
                    ) : (
                        <>
                            <div className="mb-10">
                                <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                                    Candidatura
                                </span>
                                <h2 className="text-3xl font-black text-white">
                                    {vagaSelecionada
                                        ? <>Candidatura para<br /><span className="text-orange-500">{vagaSelecionada}</span></>
                                        : <>Banco de <span className="text-orange-500">Talentos</span></>
                                    }
                                </h2>
                                {!vagaSelecionada && (
                                    <p className="text-zinc-500 text-sm mt-3">
                                        Não encontrou a vaga ideal? Envie seu currículo e entraremos em contato quando surgir uma oportunidade para o seu perfil.
                                    </p>
                                )}
                            </div>

                            <form onSubmit={submit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5">

                                {/* Nome + Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="text-white text-xs font-semibold uppercase tracking-wider block mb-2">Nome Completo *</label>
                                        <input name="nome" required value={form.nome} onChange={handle}
                                            placeholder="Seu nome completo"
                                            className="w-full bg-zinc-800 border border-zinc-700 focus:border-zinc-500 text-white placeholder-zinc-600 rounded-xl px-4 py-3 outline-none transition-colors text-sm" />
                                    </div>
                                    <div>
                                        <label className="text-white text-xs font-semibold uppercase tracking-wider block mb-2">E-mail *</label>
                                        <input name="email" type="email" required value={form.email} onChange={handle}
                                            placeholder="seu@email.com"
                                            className="w-full bg-zinc-800 border border-zinc-700 focus:border-zinc-500 text-white placeholder-zinc-600 rounded-xl px-4 py-3 outline-none transition-colors text-sm" />
                                    </div>
                                </div>

                                {/* Telefone */}
                                <div>
                                    <label className="text-white text-xs font-semibold uppercase tracking-wider block mb-2">Telefone *</label>
                                    <input name="telefone" required value={form.telefone} onChange={handle}
                                        placeholder="(14) 99999-9999"
                                        className="w-full bg-zinc-800 border border-zinc-700 focus:border-zinc-500 text-white placeholder-zinc-600 rounded-xl px-4 py-3 outline-none transition-colors text-sm" />
                                </div>

                                {/* Área + Nível */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="text-white text-xs font-semibold uppercase tracking-wider block mb-2">Área de interesse *</label>
                                        <select name="area" required value={form.area} onChange={handle}
                                            className="w-full bg-zinc-800 border border-zinc-700 focus:border-zinc-500 text-white rounded-xl px-4 py-3 outline-none transition-colors text-sm">
                                            <option value="">Selecione</option>
                                            {areas.map(a => <option key={a} value={a}>{a}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-white text-xs font-semibold uppercase tracking-wider block mb-2">Nível de experiência *</label>
                                        <select name="nivel" required value={form.nivel} onChange={handle}
                                            className="w-full bg-zinc-800 border border-zinc-700 focus:border-zinc-500 text-white rounded-xl px-4 py-3 outline-none transition-colors text-sm">
                                            <option value="">Selecione</option>
                                            {niveis.map(n => <option key={n} value={n}>{n}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* Disponibilidade */}
                                <div>
                                    <label className="text-white text-xs font-semibold uppercase tracking-wider block mb-2">Disponibilidade para início *</label>
                                    <select name="disponibilidade" required value={form.disponibilidade} onChange={handle}
                                        className="w-full bg-zinc-800 border border-zinc-700 focus:border-zinc-500 text-white rounded-xl px-4 py-3 outline-none transition-colors text-sm">
                                        <option value="">Selecione</option>
                                        {disponibilidades.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>

                                {/* Motivação */}
                                <div>
                                    <label className="text-white text-xs font-semibold uppercase tracking-wider block mb-2">Por que quer trabalhar conosco? *</label>
                                    <textarea name="motivacao" required value={form.motivacao} onChange={handle}
                                        rows={4} placeholder="Conte um pouco sobre você e suas motivações..."
                                        className="w-full bg-zinc-800 border border-zinc-700 focus:border-zinc-500 text-white placeholder-zinc-600 rounded-xl px-4 py-3 outline-none transition-colors text-sm resize-none" />
                                </div>

                                {/* Upload */}
                                <div>
                                    <label className="text-white text-xs font-semibold uppercase tracking-wider block mb-2">Currículo (PDF ou Word) *</label>
                                    <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition-colors ${arquivo ? 'border-orange-500/40 bg-orange-500/5' : 'border-zinc-700 hover:border-zinc-600'}`}>
                                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleArquivo} className="hidden" />
                                        {arquivo ? (
                                            <>
                                                <CheckCircle size={28} className="text-orange-500 mb-2" />
                                                <p className="text-white text-sm font-medium">{arquivo.name}</p>
                                                <p className="text-zinc-500 text-xs mt-1">Clique para trocar o arquivo</p>
                                            </>
                                        ) : (
                                            <>
                                                <Upload size={28} className="text-zinc-500 mb-2" />
                                                <p className="text-zinc-400 text-sm">Clique para selecionar ou arraste o arquivo</p>
                                                <p className="text-zinc-600 text-xs mt-1">PDF ou Word · máximo 3MB</p>
                                            </>
                                        )}
                                    </label>
                                </div>

                                {erro && (
                                    <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                                        {erro}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={enviando}
                                    className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors text-sm"
                                >
                                    {enviando ? 'Enviando...' : <>Enviar Candidatura <ArrowRight size={16} /></>}
                                </button>

                                <p className="text-zinc-600 text-xs text-center">
                                    Seus dados são tratados com confidencialidade e usados apenas para fins de recrutamento.
                                </p>
                            </form>
                        </>
                    )}
                </div>
            </section>
        </div>
    )
}