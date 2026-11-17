import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

// Bloco de um departamento, sem fotos: texto de um lado e, do outro, um card
// com o ícone da área e o que ela entrega. O lado do card e a cor do fundo
// alternam entre os blocos para dar ritmo à página.
const FUNDOS = {
    cinza: { secao: 'bg-zinc-950', card: 'bg-black' },
    preto: { secao: 'bg-black', card: 'bg-zinc-950' },
}

export default function BlocoDepartamento({
    icon: Icon,
    eyebrow,
    title,
    subtitle,
    paragrafo,
    destaques = [],
    link,
    lado = 'direita',
    fundo = 'cinza',
}) {
    const cores = FUNDOS[fundo] ?? FUNDOS.cinza
    const cardEsquerda = lado === 'esquerda'

    return (
        <section className={`py-section px-6 md:px-8 lg:px-10 ${cores.secao}`}>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                {/* Texto */}
                <div className={cardEsquerda ? 'md:order-2' : ''}>
                    <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
                    {paragrafo && (
                        <p className="text-zinc-400 text-body mt-5 max-w-xl leading-relaxed">{paragrafo}</p>
                    )}
                    {link && (
                        <Link
                            to={link.to}
                            className="group mt-8 inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-semibold text-sm"
                        >
                            {link.texto}
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    )}
                </div>

                {/* Card com o que o departamento faz */}
                <div className={cardEsquerda ? 'md:order-1' : ''}>
                    <div className={`relative overflow-hidden ${cores.card} border border-zinc-800 rounded-2xl p-8 md:p-10`}>
                        {/* Ícone grande ao fundo, como marca d'água */}
                        <Icon
                            aria-hidden="true"
                            size={220}
                            strokeWidth={1}
                            className="absolute -right-10 -bottom-10 text-orange-500/[0.06] pointer-events-none"
                        />
                        <span className="relative w-14 h-14 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                            <Icon size={26} className="text-orange-500" />
                        </span>
                        <p className="relative text-zinc-400 text-xs font-bold uppercase tracking-widest mb-5">O que fazemos</p>
                        <ul className="relative space-y-4">
                            {destaques.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-zinc-200 text-sm leading-relaxed">
                                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
                                        <Check size={12} className="text-orange-500" strokeWidth={3} />
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
