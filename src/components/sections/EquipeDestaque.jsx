import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import fotoDayane from '../../assets/colaboradores/otimizadas/DAYANE_RECORTE.webp'

// Versão alternativa do bloco da equipe, para comparar com o carrossel
// (EquipeSection): texto à esquerda e uma pessoa do time recortada à direita,
// sobre o fundo cinza das outras seções.
const destaques = [
    'Cada área tem um coordenador responsável: contábil, fiscal, societário e departamento pessoal.',
    'Gerência de relacionamento dedicada a acompanhar a sua empresa de perto.',
    'Atendimento presencial em Itaí e remoto para empresas de todo o Brasil.',
]

const numeros = [
    { valor: '30+', label: 'Colaboradores' },
    { valor: '530+', label: 'Clientes' },
    { valor: '10+', label: 'Anos' },
]

export default function EquipeDestaqueSection() {
    return (
        <section className="relative overflow-hidden px-6 md:px-8 lg:px-10 bg-zinc-950">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Texto */}
                <div className="pt-16 md:py-section">
                    <SectionHeading
                        eyebrow="Nosso time em Itaí"
                        title={<>Quem cuida da <span className="text-orange-500">sua empresa</span></>}
                        subtitle="Mais de 30 colaboradores no nosso escritório em Itaí-SP, divididos entre contábil, fiscal, departamento pessoal, societário e BPO financeiro."
                    />

                    <p className="text-zinc-400 text-body mt-5 max-w-xl leading-relaxed">
                        Fundado em Itaí por Marcelo Domingos, o escritório cresceu junto com o interior
                        paulista: hoje são mais de 530 empresas atendidas em 80 cidades de 14 estados,
                        sem perder o atendimento próximo de quem conhece o cliente pelo nome.
                    </p>

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

                    <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                        {numeros.map((n) => (
                            <div key={n.label}>
                                <div className="text-2xl font-black text-white leading-none">{n.valor}</div>
                                <div className="text-zinc-400 text-xs uppercase tracking-widest mt-1">{n.label}</div>
                            </div>
                        ))}
                    </div>

                    <Link
                        to="/sobre"
                        className="group mt-8 inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-semibold text-sm"
                    >
                        Conheça nossa história e equipe
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Foto recortada, apoiada na base da seção */}
                <div className="relative self-end flex justify-center md:justify-end md:pt-12">
                    <div
                        aria-hidden="true"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 w-[90%] aspect-square rounded-full opacity-25 blur-3xl"
                        style={{ background: 'radial-gradient(circle, #E8610A 0%, transparent 65%)' }}
                    />
                    <img
                        src={fotoDayane}
                        alt="Dayane, Gerente de Relacionamentos da Domingos Assessoria"
                        loading="lazy"
                        width="800"
                        height="1210"
                        className="relative w-auto max-h-[420px] md:max-h-[560px] object-contain object-bottom"
                    />
                    {/* Suaviza o corte da foto na base */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent"
                    />
                </div>
            </div>
        </section>
    )
}
