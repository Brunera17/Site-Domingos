import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, ArrowRight, ChevronDown, CheckCircle } from 'lucide-react'
import WhatsAppIcon from '../components/icons/WhatsAppIcon'
import { buildWhatsAppLink } from '../utils/whatsapp'
import SEOHead from '../components/SEOHead'
import SectionHeading from '../components/SectionHeading'

// ── FAQ ────────────────────────────────────────────────────────────────────────
const faqs = [
    {
        q: 'Vocês atendem empresas de outros municípios?',
        a: 'Sim! Atendemos empresas de toda a região e também de forma remota para clientes de outros estados. Nossa estrutura permite atendimento presencial e online.',
    },
    {
        q: 'Como funciona a migração da minha contabilidade atual para a Domingos?',
        a: 'O processo é simples e nossa equipe cuida de toda a transição. Fazemos o contato com o escritório anterior, solicitamos os documentos necessários e garantimos uma migração sem burocracia para você.',
    },
    {
        q: 'Posso solicitar uma proposta sem compromisso?',
        a: 'Claro! A proposta é gratuita e sem nenhum compromisso. Basta preencher o formulário ou entrar em contato pelo WhatsApp e nosso time prepara uma solução personalizada para o seu negócio.',
    },
    {
        q: 'Quais segmentos de empresa vocês atendem?',
        a: 'Atendemos empresas de praticamente todos os segmentos: comércio, indústria, serviços, agronegócio, profissionais liberais e startups. Temos expertise em mais de 20 setores diferentes.',
    },
]

// ── COMPONENTE ────────────────────────────────────────────────────────────────
export default function Contato() {
    const [form, setForm] = useState({ nome: '', email: '', telefone: '', empresa: '', assunto: '', mensagem: '', site: '' })
    const [enviado, setEnviado] = useState(false)
    const [enviando, setEnviando] = useState(false)
    const [erro, setErro] = useState(null)
    const [faqAberto, setFaqAberto] = useState(null)

    const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const submit = async (e) => {
        e.preventDefault()
        setErro(null)
        setEnviando(true)
        try {
            const resp = await fetch('/api/contato', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            const data = await resp.json().catch(() => ({}))
            if (!resp.ok) {
                throw new Error(data.error || 'Não foi possível enviar sua mensagem.')
            }
            setEnviado(true)
        } catch (err) {
            setErro(err.message || 'Não foi possível enviar sua mensagem. Tente novamente.')
        } finally {
            setEnviando(false)
        }
    }

    const assuntos = [
        'Contabilidade',
        'Departamento Pessoal',
        'Consultoria Empresarial',
        'Abertura / Encerramento de Empresa',
        'Planejamento Tributário',
        'Outro assunto',
    ]

    return (
        <div className="bg-black">
            <SEOHead
                title="Contato"
                description="Fale com a Domingos Assessoria Empresarial. Atendimento presencial em Itaí/SP e remoto para empresas de todo o Brasil."
                canonicalPath="/contato"
                keywords="contato domingos assessoria, fale conosco, atendimento contábil"
            />

            {/* ── HERO ── */}
            <section className="pt-hero-top pb-section px-6 md:px-8 lg:px-10 bg-black relative overflow-hidden">
                <div
                    className="absolute left-0 top-0 w-1/2 h-full opacity-5 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #E8610A 0%, transparent 60%)' }}
                />
                <div className="max-w-6xl mx-auto relative z-10">
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">
                        Fale com a gente
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                        <div>
                            <h1 className="text-display text-white mb-6">
                                Estamos aqui
                                <br />
                                <span className="text-orange-500">para ajudar.</span>
                            </h1>
                            <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                                Sua empresa merece uma assessoria que realmente entende o seu negócio.
                                Entre em contato e receba uma proposta personalizada, sem compromisso.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CONTATO + FORMULÁRIO ── */}
            <section className="py-section px-6 md:px-8 lg:px-10 bg-zinc-950">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">

                    {/* Coluna esquerda: infos */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <h2 className="text-h2 text-white mb-2">
                            Nossos <span className="text-orange-500">canais</span>
                        </h2>

                        {[
                            {
                                icon: Phone,
                                title: 'Telefone',
                                content: <a href="tel:+5514996580459" className="text-zinc-400 hover:text-orange-500 transition-colors text-sm">(14) 9 9658-0459</a>,
                            },
                            {
                                icon: Mail,
                                title: 'E-mail',
                                content: <a href="mailto:sucessodocliente@domingosassessoria.com.br" className="text-zinc-400 hover:text-orange-500 transition-colors text-sm break-all">
                                    sucessodocliente@domingosassessoria.com.br
                                </a>,
                            },
                            {
                                icon: MapPin,
                                title: 'Endereço',
                                content: <a
                                    href="https://maps.google.com/?q=Av.+Antônio+Justino+Viera,+350,+Itaí,+SP"
                                    target="_blank" rel="noopener noreferrer"
                                    className="text-zinc-400 hover:text-orange-500 transition-colors text-sm"
                                >
                                    Av. Antônio Justino Viera, 350<br />
                                    Jardim Planalto — Itaí/SP · 18730-136
                                </a>,
                            },
                            {
                                icon: Clock,
                                title: 'Horário de Atendimento',
                                content: <div className="text-zinc-400 text-sm space-y-0.5">
                                    <p>Segunda a Sexta: <span className="text-zinc-300">8h às 17h</span></p>
                                </div>,
                            },
                        ].map(({ icon: Icon, title, content }) => (
                            <div key={title} className="group flex items-start gap-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 transition-colors">
                                <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 group-hover:bg-orange-500/10 group-hover:border-orange-500/20 flex items-center justify-center shrink-0 transition-all">
                                    <Icon size={17} className="text-zinc-400 group-hover:text-orange-500 transition-colors" />
                                </div>
                                <div>
                                    <div className="text-white font-semibold text-sm mb-1">{title}</div>
                                    {content}
                                </div>
                            </div>
                        ))}

                        {/* WhatsApp CTA */}
                        <a
                            href={buildWhatsAppLink('Olá! Vim pelo site da Domingos Assessoria e gostaria de falar com a equipe.')}
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl transition-colors mt-2"
                        >
                            <WhatsAppIcon />
                            Falar pelo WhatsApp
                            <ArrowRight size={16} />
                        </a>
                    </div>

                    {/* Coluna direita: formulário */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            {enviado ? (
                                <motion.div
                                    key="sucesso"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center text-center h-full py-20 bg-zinc-900 border border-zinc-800 rounded-2xl px-8"
                                >
                                    <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
                                        <CheckCircle size={36} className="text-green-500" />
                                    </div>
                                    <h2 className="text-2xl font-black text-white mb-3">Mensagem Enviada!</h2>
                                    <p className="text-zinc-400 text-lg mb-8 max-w-sm">
                                        Recebemos sua mensagem e retornaremos em até 1 dia útil. Obrigado pelo contato!
                                    </p>
                                    <button
                                        onClick={() => {
                                            setForm({ nome: '', email: '', telefone: '', empresa: '', assunto: '', mensagem: '' })
                                            setEnviado(false)
                                        }}
                                        className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors"
                                    >
                                        Enviar outra mensagem
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
                                >
                                    <h2 className="text-2xl font-black text-white mb-6">Envie sua Mensagem</h2>
                                    <form onSubmit={submit} className="space-y-5">
                                        {/* Honeypot anti-spam: invisível para pessoas, atrativo para bots que preenchem todo input */}
                                        <input
                                            type="text"
                                            name="site"
                                            value={form.site}
                                            onChange={handle}
                                            tabIndex={-1}
                                            autoComplete="off"
                                            aria-hidden="true"
                                            className="absolute left-[-9999px] h-px w-px overflow-hidden"
                                        />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="text-white text-xs font-semibold uppercase tracking-wider block mb-2">Nome *</label>
                                                <input name="nome" required value={form.nome} onChange={handle} placeholder="Seu nome completo"
                                                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-zinc-500 text-white placeholder-zinc-600 rounded-xl px-4 py-3 outline-none transition-colors text-sm" />
                                            </div>
                                            <div>
                                                <label className="text-white text-xs font-semibold uppercase tracking-wider block mb-2">E-mail *</label>
                                                <input name="email" type="email" required value={form.email} onChange={handle} placeholder="seu@email.com"
                                                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-zinc-500 text-white placeholder-zinc-600 rounded-xl px-4 py-3 outline-none transition-colors text-sm" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="text-white text-xs font-semibold uppercase tracking-wider block mb-2">Telefone</label>
                                                <input name="telefone" value={form.telefone} onChange={handle} placeholder="(14) 99999-9999"
                                                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-zinc-500 text-white placeholder-zinc-600 rounded-xl px-4 py-3 outline-none transition-colors text-sm" />
                                            </div>
                                            <div>
                                                <label className="text-white text-xs font-semibold uppercase tracking-wider block mb-2">Empresa</label>
                                                <input name="empresa" value={form.empresa} onChange={handle} placeholder="Nome da sua empresa"
                                                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-zinc-500 text-white placeholder-zinc-600 rounded-xl px-4 py-3 outline-none transition-colors text-sm" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-white text-xs font-semibold uppercase tracking-wider block mb-2">Assunto *</label>
                                            <select name="assunto" required value={form.assunto} onChange={handle}
                                                className="w-full bg-zinc-800 border border-zinc-700 focus:border-zinc-500 text-white rounded-xl px-4 py-3 outline-none transition-colors text-sm">
                                                <option value="">Selecione o assunto</option>
                                                {assuntos.map(a => <option key={a} value={a}>{a}</option>)}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="text-white text-xs font-semibold uppercase tracking-wider block mb-2">Mensagem *</label>
                                            <textarea name="mensagem" required value={form.mensagem} onChange={handle} rows={5}
                                                placeholder="Como podemos ajudar sua empresa?"
                                                className="w-full bg-zinc-800 border border-zinc-700 focus:border-zinc-500 text-white placeholder-zinc-600 rounded-xl px-4 py-3 outline-none transition-colors text-sm resize-none" />
                                        </div>

                                        {erro && (
                                            <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                                                {erro}
                                            </p>
                                        )}

                                        <button type="submit" disabled={enviando}
                                            className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors text-sm">
                                            {enviando ? 'Enviando...' : <>Enviar Mensagem <ArrowRight size={16} /></>}
                                        </button>

                                        <p className="text-zinc-400 text-xs text-center">
                                            Retornamos em até 1 dia útil. Seus dados são tratados com total sigilo.
                                        </p>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* ── MAPA ── */}
            <section className="bg-black px-6 md:px-8 lg:px-10 py-0">
                <div className="max-w-6xl mx-auto">
                    <div className="rounded-2xl overflow-hidden border border-zinc-800" style={{ height: '400px' }}>
                        <iframe
                            title="Domingos Assessoria Empresarial"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.447!2d-49.0883!3d-23.4167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAv.+Ant%C3%B4nio+Justino+Viera%2C+350%2C+Jardim+Planalto%2C+Ita%C3%AD+-+SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(90%)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                    <p className="text-zinc-400 text-xs text-center py-3">
                        Av. Antônio Justino Viera, 350 — Jardim Planalto, Itaí/SP ·{' '}
                        <a href="https://maps.google.com/?q=Av.+Antônio+Justino+Viera,+350,+Itaí,+SP" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 transition-colors">
                            Abrir no Google Maps
                        </a>
                    </p>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-section px-6 md:px-8 lg:px-10 bg-zinc-950">
                <div className="max-w-3xl mx-auto">
                    <SectionHeading
                        eyebrow="Dúvidas frequentes"
                        title={<>Perguntas <span className="text-orange-500">frequentes</span></>}
                        align="center"
                        className="mb-12"
                    />

                    <div className="flex flex-col gap-3">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                                <button
                                    onClick={() => setFaqAberto(faqAberto === i ? null : i)}
                                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-zinc-800/50 transition-colors"
                                >
                                    <span className="text-white font-semibold text-sm leading-snug">{faq.q}</span>
                                    <ChevronDown
                                        size={18}
                                        className={`text-zinc-500 shrink-0 transition-transform duration-300 ${faqAberto === i ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {faqAberto === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.22 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800 pt-4">
                                                {faq.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <p className="text-zinc-400 text-sm mb-4">Ainda tem dúvidas? Fale diretamente com a nossa equipe.</p>
                        <a
                            href={buildWhatsAppLink('Olá! Tenho uma dúvida e gostaria de falar com a equipe da Domingos Assessoria.')}
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 hover:border-orange-500/40 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
                        >
                            <WhatsAppIcon />
                            Perguntar pelo WhatsApp
                        </a>
                    </div>
                </div>
            </section>

        </div>
    )
}
