import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

// Bloco de texto + uma pessoa do time recortada (PNG/WebP com fundo
// transparente). Usado para alternar seções na home: a foto pode ficar à
// direita ou à esquerda e o fundo pode ser cinza ou preto.
const FUNDOS = {
    cinza: { secao: 'bg-zinc-950', degrade: 'from-zinc-950' },
    preto: { secao: 'bg-black', degrade: 'from-black' },
}

export default function BlocoDestaque({
    eyebrow,
    title,
    subtitle,
    paragrafo,
    destaques = [],
    numeros = [],
    link,
    foto,
    fotoAlt,
    fotoLargura,
    fotoAltura,
    legenda,
    lado = 'direita',
    fundo = 'cinza',
}) {
    const cores = FUNDOS[fundo] ?? FUNDOS.cinza
    const fotoEsquerda = lado === 'esquerda'

    return (
        <section className={`relative overflow-hidden px-6 md:px-8 lg:px-10 ${cores.secao}`}>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Texto */}
                <div className={`pt-16 md:py-section ${fotoEsquerda ? 'md:order-2' : ''}`}>
                    <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />

                    {paragrafo && (
                        <p className="text-zinc-400 text-body mt-5 max-w-xl leading-relaxed">{paragrafo}</p>
                    )}

                    {destaques.length > 0 && (
                        <ul className="mt-6 space-y-3 max-w-xl">
                            {destaques.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-zinc-300 text-sm leading-relaxed">
                                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
                                        <Check size={12} className="text-orange-500" strokeWidth={3} />
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}

                    {numeros.length > 0 && (
                        <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                            {numeros.map((n) => (
                                <div key={n.label}>
                                    <div className="text-2xl font-black text-white leading-none">{n.valor}</div>
                                    <div className="text-zinc-400 text-xs uppercase tracking-widest mt-1">{n.label}</div>
                                </div>
                            ))}
                        </div>
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

                {/* Foto recortada, apoiada na base da seção */}
                <div
                    className={`relative self-end flex justify-center md:pt-12 ${
                        fotoEsquerda ? 'md:order-1 md:justify-start' : 'md:justify-end'
                    }`}
                >
                    <div
                        aria-hidden="true"
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 md:translate-x-0 w-[90%] aspect-square rounded-full opacity-25 blur-3xl ${
                            fotoEsquerda ? 'md:left-0' : 'md:left-auto md:right-0'
                        }`}
                        style={{ background: 'radial-gradient(circle, #E8610A 0%, transparent 65%)' }}
                    />
                    <img
                        src={foto}
                        alt={fotoAlt}
                        loading="lazy"
                        width={fotoLargura}
                        height={fotoAltura}
                        className="relative w-auto max-h-[420px] md:max-h-[560px] object-contain object-bottom"
                    />
                    {/* Suaviza o corte da foto na base */}
                    <div
                        aria-hidden="true"
                        className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t ${cores.degrade} to-transparent`}
                    />
                    {legenda && (
                        <div
                            className={`absolute bottom-6 z-10 bg-black/70 backdrop-blur-sm border border-zinc-800 rounded-lg px-4 py-2.5 ${
                                fotoEsquerda ? 'right-4 md:right-auto md:left-[55%]' : 'left-4 md:left-auto md:right-[55%]'
                            }`}
                        >
                            <div className="text-white font-bold text-sm leading-tight">{legenda.nome}</div>
                            <div className="text-orange-500 text-xs font-semibold mt-0.5">{legenda.cargo}</div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
