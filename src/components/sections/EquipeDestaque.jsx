import SectionHeading from '../ui/SectionHeading'
import fotoDayane from '../../assets/colaboradores/otimizadas/DAYANE_RECORTE.webp'

// Versão alternativa do bloco da equipe, para comparar com o carrossel
// (EquipeSection): texto à esquerda e uma pessoa do time recortada à direita,
// sobre o fundo cinza das outras seções.
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
