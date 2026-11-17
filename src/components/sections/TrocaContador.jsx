import { Link } from 'react-router-dom'
import { ArrowRight, MessageSquare, Handshake, FileStack, CircleCheck } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { buildWhatsAppLink } from '../../utils/whatsapp'

// Explica a troca de contador em passos (o parecer deu nota 2/5 para
// "onboarding e troca de contador"). Textos seguem o FAQ da página de Contato.
const passos = [
    {
        icon: MessageSquare,
        titulo: 'Conversa e proposta',
        texto: 'Entendemos o momento da sua empresa e enviamos uma proposta gratuita e sem compromisso.',
    },
    {
        icon: Handshake,
        titulo: 'Contato com o contador atual',
        texto: 'Nós mesmos falamos com o escritório anterior. Você não precisa intermediar nada.',
    },
    {
        icon: FileStack,
        titulo: 'Documentos e transição',
        texto: 'Solicitamos os documentos necessários e conferimos tudo antes de assumir a sua contabilidade.',
    },
    {
        icon: CircleCheck,
        titulo: 'Tudo em dia, sem burocracia',
        texto: 'A empresa segue funcionando normalmente enquanto cuidamos da migração.',
    },
]

export default function TrocaContadorSection() {
    return (
        <section className="py-section px-6 md:px-8 lg:px-10 bg-black">
            <div className="max-w-6xl mx-auto">
                <SectionHeading
                    eyebrow="Já tem contador?"
                    title={<>Trocar de contador <span className="text-orange-500">é simples</span></>}
                    subtitle="Nós cuidamos de toda a transição. Você só precisa dar o primeiro passo."
                    className="mb-12"
                />

                <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {passos.map(({ icon: Icon, titulo, texto }, i) => (
                        <li key={titulo} className="relative bg-zinc-950 border border-zinc-800 rounded-xl p-6">
                            <span className="absolute top-5 right-5 text-4xl font-black text-zinc-800 leading-none select-none">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="w-11 h-11 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5">
                                <Icon size={20} className="text-orange-500" />
                            </span>
                            <h3 className="text-white font-bold text-base mb-2">{titulo}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">{texto}</p>
                        </li>
                    ))}
                </ol>

                <div className="mt-10 flex flex-wrap gap-4">
                    <Link
                        to="/planos"
                        className="group flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-lg transition-colors text-sm"
                    >
                        Solicitar proposta
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                    <a
                        href={buildWhatsAppLink('Olá! Tenho contador hoje e gostaria de saber como funciona a troca para a Domingos Assessoria.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 border border-zinc-600 text-zinc-300 hover:border-white hover:text-white font-semibold px-7 py-3.5 rounded-lg transition-colors text-sm"
                    >
                        Tirar dúvidas no WhatsApp
                    </a>
                </div>
            </div>
        </section>
    )
}
