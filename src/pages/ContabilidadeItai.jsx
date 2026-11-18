import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Clock, Phone, Mail, Building2, Laptop, Check, ChevronRight } from 'lucide-react'
import SEOHead from '../components/seo/SEOHead'
import LocalBusinessSchema from '../components/seo/LocalBusinessSchema'
import SectionHeading from '../components/ui/SectionHeading'
import { featuredServices } from '../data/services'
import { empresa, enderecoCompleto } from '../data/empresa'
import { buildWhatsAppLink } from '../utils/whatsapp'
import fotoSalao from '../assets/espaco/area_trabalho.webp'

// Página local pedida no parecer de SEO ("Contabilidade em Itaí e região").
// A sede é em Itaí-SP e o atendimento cobre o Brasil inteiro, então a página
// fala das duas coisas: o escritório físico e o atendimento a distância.

const numeros = [
    { valor: '530+', label: 'Empresas atendidas' },
    { valor: '80+', label: 'Cidades' },
    { valor: '14', label: 'Estados' },
    { valor: '10+', label: 'Anos de experiência' },
]

const perguntas = [
    {
        q: 'Vocês atendem empresas de fora de Itaí?',
        a: 'Sim. A sede fica em Itaí-SP, mas atendemos empresas de todo o Brasil — hoje são mais de 530 clientes em 80 cidades de 14 estados. Todo o atendimento pode ser feito a distância.',
    },
    {
        q: 'Preciso ir ao escritório?',
        a: 'Não. Documentos, reuniões e dúvidas podem ser resolvidos pelo WhatsApp, por e-mail e pela área do cliente online. Quem é da região também pode nos visitar em Itaí.',
    },
    {
        q: 'Como funciona a troca de contador?',
        a: 'Nossa equipe cuida de toda a transição: fazemos o contato com o escritório anterior, solicitamos os documentos necessários e garantimos uma migração sem burocracia para você.',
    },
    {
        q: 'Onde fica o escritório?',
        a: `${enderecoCompleto}. Atendimento de segunda a sexta, das 8h às 17h.`,
    },
]

export default function ContabilidadeItai() {
    const whatsapp = buildWhatsAppLink('Olá! Vim pela página de contabilidade em Itaí e gostaria de falar com a Domingos Assessoria.')

    return (
        <div className="bg-black">
            <SEOHead
                title="Escritório de contabilidade em Itaí-SP | Domingos Assessoria"
                description="Escritório de contabilidade em Itaí-SP: contábil, fiscal, DP, abertura de empresas e BPO financeiro. Atendimento presencial em Itaí e remoto em todo o Brasil."
                canonicalPath="/contabilidade-itai-sp"
                keywords="contabilidade Itaí, contador em Itaí SP, escritório de contabilidade Itaí, contabilidade online, contabilidade para todo o Brasil"
            />
            <LocalBusinessSchema />

            {/* ── HERO ── */}
            <section className="pt-hero-top pb-section px-6 md:px-8 lg:px-10 bg-black relative overflow-hidden">
                <div
                    className="absolute left-0 top-0 w-1/2 h-full opacity-5 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #E8610A 0%, transparent 60%)' }}
                />
                <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">
                            Escritório de contabilidade
                        </span>
                        <h1 className="text-display text-white mb-6">
                            Contabilidade em <span className="text-orange-500">Itaí-SP</span>{' '}
                            <span className="block mt-3 text-zinc-300 text-xl md:text-2xl font-bold tracking-tight leading-snug">
                                com atendimento em todo o Brasil
                            </span>
                        </h1>
                        <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mb-8">
                            Desde Itaí, cuidamos da contabilidade de mais de 530 empresas em 80 cidades de 14
                            estados. Quem está na região pode vir ao escritório; quem está longe é atendido a
                            distância, com o mesmo time e a mesma agilidade.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/planos"
                                className="group flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-lg transition-colors text-sm"
                            >
                                Solicitar proposta
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                            <a
                                href={whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 border border-zinc-600 text-zinc-300 hover:border-white hover:text-white font-semibold px-7 py-3.5 rounded-lg transition-colors text-sm"
                            >
                                Falar no WhatsApp
                            </a>
                        </div>
                    </div>
                    <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                        <img
                            src={fotoSalao}
                            alt="Escritório da Domingos Assessoria Empresarial em Itaí-SP"
                            width="1600"
                            height="1200"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10 mt-14">
                    <div className="w-10 h-px bg-zinc-700 mb-6" />
                    <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:flex-wrap sm:gap-10">
                        {numeros.map((n) => (
                            <div key={n.label} className="flex flex-col">
                                <span className="text-2xl font-black text-white leading-none mb-1">{n.valor}</span>
                                <span className="text-zinc-400 text-xs uppercase tracking-widest">{n.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PRESENCIAL x REMOTO ── */}
            <section className="py-section px-6 md:px-8 lg:px-10 bg-zinc-950">
                <div className="max-w-6xl mx-auto">
                    <SectionHeading
                        eyebrow="Como atendemos"
                        title={<>Perto de você, <span className="text-orange-500">onde você estiver</span></>}
                        className="mb-10"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black border border-zinc-800 rounded-xl p-6 md:p-8">
                            <span className="w-11 h-11 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5">
                                <Building2 size={20} className="text-orange-500" />
                            </span>
                            <h2 className="text-white font-bold text-lg mb-2">Presencial em Itaí-SP</h2>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                                Para empresas de Itaí e da região que preferem conversar pessoalmente.
                            </p>
                            <ul className="space-y-3 text-sm text-zinc-300">
                                <li className="flex items-start gap-3">
                                    <MapPin size={16} className="mt-0.5 shrink-0 text-orange-500" />
                                    <span>{enderecoCompleto}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Clock size={16} className="mt-0.5 shrink-0 text-orange-500" />
                                    <span>{empresa.horario.texto}</span>
                                </li>
                            </ul>
                            <a
                                href={empresa.mapa}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group mt-6 inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-semibold text-sm"
                            >
                                Como chegar
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>

                        <div className="bg-black border border-zinc-800 rounded-xl p-6 md:p-8">
                            <span className="w-11 h-11 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5">
                                <Laptop size={20} className="text-orange-500" />
                            </span>
                            <h2 className="text-white font-bold text-lg mb-2">A distância, em todo o Brasil</h2>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                                Para empresas de qualquer cidade. Não é preciso vir ao escritório.
                            </p>
                            <ul className="space-y-3 text-sm text-zinc-300">
                                <li className="flex items-start gap-3">
                                    <Phone size={16} className="mt-0.5 shrink-0 text-orange-500" />
                                    <span>WhatsApp e telefone: {empresa.telefoneExibicao}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Mail size={16} className="mt-0.5 shrink-0 text-orange-500" />
                                    <span className="break-all">{empresa.email}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check size={16} className="mt-0.5 shrink-0 text-orange-500" />
                                    <span>Envio de documentos e acompanhamento pela área do cliente online</span>
                                </li>
                            </ul>
                            <a
                                href={whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group mt-6 inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-semibold text-sm"
                            >
                                Falar no WhatsApp
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SERVIÇOS ── */}
            <section className="py-section px-6 md:px-8 lg:px-10 bg-black">
                <div className="max-w-6xl mx-auto">
                    <SectionHeading
                        eyebrow="O que fazemos"
                        title={<>Serviços de contabilidade <span className="text-orange-500">em Itaí e no Brasil</span></>}
                        subtitle="Cada área com equipe e coordenação própria, trabalhando em conjunto para cuidar da sua empresa por inteiro."
                        className="mb-10"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {featuredServices.map((s) => {
                            const Icon = s.icon
                            return (
                                <Link
                                    key={s.id}
                                    to={`/servicos/${s.id}`}
                                    className="group bg-zinc-950 border border-zinc-800 hover:border-orange-500/50 rounded-xl p-6 flex flex-col transition-colors"
                                >
                                    <span className="w-11 h-11 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5">
                                        {Icon && <Icon size={20} className="text-orange-500" />}
                                    </span>
                                    <h3 className="text-white font-bold text-base mb-2">{s.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed mb-5">{s.description}</p>
                                    <span className="mt-auto inline-flex items-center gap-1 text-orange-500 text-sm font-semibold">
                                        Ver detalhes
                                        <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                    <Link
                        to="/servicos"
                        className="group mt-8 inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-semibold text-sm"
                    >
                        Ver todos os serviços
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </section>

            {/* ── PERGUNTAS FREQUENTES ── */}
            <section className="py-section px-6 md:px-8 lg:px-10 bg-zinc-950">
                <div className="max-w-3xl mx-auto">
                    <SectionHeading
                        eyebrow="Dúvidas comuns"
                        title={<>Perguntas <span className="text-orange-500">frequentes</span></>}
                        className="mb-8"
                    />
                    <div className="divide-y divide-zinc-800 border-y border-zinc-800">
                        {perguntas.map((p) => (
                            <details key={p.q} className="group py-5">
                                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-white font-semibold">
                                    {p.q}
                                    <ChevronRight size={18} className="shrink-0 text-orange-500 transition-transform group-open:rotate-90" />
                                </summary>
                                <p className="text-zinc-400 text-sm leading-relaxed mt-3">{p.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CHAMADA FINAL ── */}
            <section className="py-section px-6 md:px-8 lg:px-10 bg-black">
                <div className="max-w-3xl mx-auto text-center">
                    <SectionHeading
                        eyebrow="Próximo passo"
                        title={<>Vamos cuidar da <span className="text-orange-500">sua empresa?</span></>}
                        subtitle="Receba uma proposta gratuita e sem compromisso, esteja você em Itaí ou em qualquer cidade do Brasil."
                        align="center"
                        className="mb-8"
                    />
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/planos"
                            className="group flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-lg transition-colors text-sm"
                        >
                            Solicitar proposta
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                        <a
                            href={whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 border border-zinc-600 text-zinc-300 hover:border-white hover:text-white font-semibold px-7 py-3.5 rounded-lg transition-colors text-sm"
                        >
                            Falar no WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
