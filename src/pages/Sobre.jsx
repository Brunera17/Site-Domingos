import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Target, Eye, Heart, Users, MapPin, Award, TrendingUp } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import OrganizationSchema from '../components/OrganizationSchema'

// ── IMPORTS DE FOTOS ─────────────────────────────────────────────────────────
import marcelofoto from '../assets/colaboradores/MARCELO_2.webp'
import fotoComTodosFotoGrande from '../assets/colaboradores/FOTO_COM_TODOS_GRANDE.webp'

import areaTrabalhoFoto from '../assets/espaco/area_trabalho.webp'
import lobbyFoto from '../assets/espaco/lobby.webp'
import recepcaoFoto from '../assets/espaco/recepcao.webp'

// ── DADOS ─────────────────────────────────────────────────────────────────────

const stats = [
    { value: '10+', label: 'Anos de mercado', icon: Award },
    { value: '530+', label: 'Clientes ativos', icon: Users },
    { value: '14', label: 'Estados', icon: MapPin },
    { value: '30+', label: 'Colaboradores', icon: TrendingUp },
]

const timeline = [
    {
        ano: '2017',
        titulo: 'Fundação — O início de uma escolha',
        desc: 'Marcelo Domingos abre o escritório em Itaí-SP com um propósito claro: oferecer contabilidade de qualidade real para pequenas e médias empresas do interior, que até então tinham acesso apenas ao mínimo burocrático.',
        frase: 'Porque o empresário do interior merecia mais do que apenas cumprir obrigações.',
    },
    {
        ano: '2018',
        titulo: 'Expansão Regional — Além de Itaí',
        desc: 'O crescimento por indicação levou o escritório a atender empresas em outras cidades da região. Primeira contratação de colaboradores e estruturação de processos internos para manter a qualidade com escala.',
        frase: 'Crescemos por recomendação — o melhor sinal de que estávamos no caminho certo.',
    },
    {
        ano: '2019',
        titulo: 'Especialização — Mais do que contabilidade',
        desc: 'Abertura formal do departamento de consultoria tributária e empresarial. A partir daqui, o escritório passou a entregar planejamento fiscal estruturado, não apenas apuração de impostos.',
        frase: 'O cliente deixou de pagar mais imposto do que devia.',
    },
    {
        ano: '2020',
        titulo: 'Transformação Digital — Atendimento 100% remoto',
        desc: 'A pandemia acelerou o que já estava em curso: implantação de plataformas digitais, assinatura eletrônica e atendimento remoto sem perda de qualidade. A distância deixou de ser um obstáculo.',
        frase: 'Nossos clientes não sentiram a transição. Sentiram a melhora.',
    },
    {
        ano: '2022',
        titulo: 'Estrutura de Gestão — Time e processos maduros',
        desc: 'Consolidação de departamentos internos (Fiscal, Departamento Pessoal, Societário e Relacionamento). Implantação de indicadores de qualidade e SLAs de atendimento.',
        frase: 'Processos organizados = cliente bem atendido e equipe de alta performance.',
    },
    {
        ano: '2024',
        titulo: 'Referência Regional',
        desc: 'Domingos Assessoria consolida-se como referência em contabilidade consultiva no interior paulista, com carteira ativa em crescimento, equipe especializada e metodologia própria de planejamento tributário e gestão empresarial.',
        frase: '10 anos. Um propósito que não mudou: gerar resultado real para quem confia em nós.',
    },
    {
        ano: '2026',
        titulo: 'Hub Completo — 30 colaboradores, 14 estados',
        desc: 'A Domingos Assessoria alcança 30 colaboradores especializados e presença ativa em 14 estados brasileiros. O hub é ampliado com contabilidade, recuperação tributária, auditoria, perícia contábil e financeira sob o mesmo teto.',
        frase: 'Mais do que um escritório contábil: um hub estratégico para empresas que querem crescer com segurança.',
    },
]

const valores = [
    {
        icon: TrendingUp,
        label: 'Resultado visível',
        desc: 'Toda orientação que entregamos deve impactar o caixa, a segurança fiscal ou a estratégia do cliente. Não existimos para burocracia — existimos para gerar resultado.',
    },
    {
        icon: Heart,
        label: 'Atendimento humano e próximo',
        desc: 'O empresário não precisa de jargões — precisa de clareza. Respondemos rápido, explicamos com objetividade e tratamos cada cliente como prioridade, não como número de pasta.',
    },
    {
        icon: Award,
        label: 'Excelência técnica com atualização constante',
        desc: 'Atuamos em um ambiente tributário e trabalhista que muda continuamente. Nossa equipe se atualiza de forma sistemática para que o cliente nunca seja surpreendido.',
    },
    {
        icon: Eye,
        label: 'Ética e transparência absolutas',
        desc: 'Não vendemos o que o cliente não precisa. Não omitimos riscos para parecer conveniente. Nossa credibilidade é construída na verdade — mesmo quando a verdade é difícil.',
    },
]

// ── ORGANOGRAMA ───────────────────────────────────────────────────────────────
const orgData = {
    diretor: 'Diretor Controller',
    gerentes: ['Gerente de Relacionamento', 'Gerente de Operações', 'Gerente Tributário'],
    departamentos: [
        {
            coord: 'Coord. Comercial',
            cargos: ['Analista', 'Estagiário'],
        },
        {
            coord: 'Coord. Depto. Pessoal',
            cargos: ['Analista', 'Assistente', 'Auxiliar', 'Estagiário'],
        },
        {
            coord: 'Coord. Fiscal',
            cargos: ['Analista', 'Assistente', 'Auxiliar', 'Estagiário'],
        },
        {
            coord: 'Coord. Contábil / TI',
            cargos: ['Analista', 'Assistente', 'Auxiliar', 'Estagiário'],
        },
        {
            coord: 'Coord. Societário',
            cargos: ['Analista', 'Assistente', 'Auxiliar', 'Estagiário'],
        },
        {
            coord: 'Coord. Financeiro',
            cargos: ['Analista', 'Estagiário'],
        },
    ],
}

const estruturaImages = [
    { src: areaTrabalhoFoto, alt: 'Área de trabalho' },
    { src: lobbyFoto,        alt: 'Lobby' },
    { src: recepcaoFoto,     alt: 'Recepção' },
    // Para adicionar mais fotos: { src: novaFoto, alt: 'Descrição' }
]

// ── COMPONENTE ────────────────────────────────────────────────────────────────

export default function Sobre() {
    const [destaque, setDestaque] = useState(0)

    return (
        <div className="bg-black">

            <SEOHead
                title="Sobre Domingos Assessoria | 10+ Anos de Expertise em Contabilidade"
                description="Conheça a história, equipe e valores da Domingos Assessoria. 30 colaboradores especializados, presença em 14 estados e mais de 530 clientes ativos."
                canonicalPath="/sobre"
                keywords="sobre domingos, equipe contábil, história da empresa, valores, missão, contabilidade especializada"
            />
            <OrganizationSchema />

            {/* ── 1. HERO ── */}
            <section
                className="relative flex items-end overflow-hidden px-6"
                style={{ height: '70vh', minHeight: '500px' }}
            >
                <img
                    src={fotoComTodosFotoGrande}
                    alt="Equipe Domingos Assessoria"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: 'center 30%' }}
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/40" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />

                <div className="relative z-10 max-w-7xl mx-auto pb-16 w-full">
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">
                        Quem somos
                    </span>
                    <h1
                        className="font-black text-white leading-[0.95] mb-4"
                        style={{ fontSize: 'clamp(42px, 6vw, 80px)' }}
                    >
                        Pessoas cuidando
                        <br />
                        <span className="text-orange-500">do seu negócio.</span>
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
                        Mais de 10 anos entregando clareza fiscal, segurança jurídica e vantagem
                        tributária — com atendimento humano, próximo e resultado mensurável no caixa do cliente.
                    </p>
                </div>
            </section>

            {/* ── 2. STATS ── */}
            <section className="py-16 px-6 bg-black border-b border-zinc-900">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((s) => {
                        const Icon = s.icon
                        return (
                            <div key={s.label} className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                                    <Icon size={20} className="text-orange-500" />
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-white leading-none">{s.value}</div>
                                    <div className="text-zinc-500 text-xs mt-0.5">{s.label}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* ── 3. HISTÓRIA / TIMELINE ── */}
            <section className="py-24 px-6 bg-zinc-950">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-14">
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                            Nossa trajetória
                        </span>
                        <h2 className="text-4xl font-black text-white">
                            10 anos de <span className="text-orange-500">história</span>
                        </h2>
                    </div>

                    <div className="relative">
                        <div className="absolute left-[88px] top-0 bottom-0 w-px bg-zinc-800 hidden md:block" />
                        <div className="flex flex-col gap-8">
                            {timeline.map((item) => (
                                <div key={item.ano} className="flex gap-8 items-start">
                                    <div className="shrink-0 w-16 text-right hidden md:block">
                                        <span className="text-orange-500 font-black text-sm">{item.ano}</span>
                                    </div>
                                    <div className="shrink-0 hidden md:flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 border-4 border-black mt-0.5 z-10" />
                                    <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-colors">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-orange-500 font-black text-xs md:hidden">{item.ano}</span>
                                            <h3 className="text-white font-bold">{item.titulo}</h3>
                                        </div>
                                        <p className="text-zinc-500 text-sm leading-relaxed mb-3">{item.desc}</p>
                                        <p className="text-zinc-400 text-xs leading-relaxed border-l-2 border-orange-500/40 pl-3">
                                            {item.frase}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. CITAÇÃO DO FUNDADOR ── */}
            <section className="py-24 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="relative rounded-xl overflow-hidden aspect-[4/5]">
                                <img
                                    src={marcelofoto}
                                    alt="Marcelo Domingos"
                                    className="w-full h-full object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-zinc-900 border border-zinc-800 rounded-lg p-4 max-w-[200px]">
                                <div className="text-2xl font-black text-orange-500">10+</div>
                                <div className="text-zinc-400 text-xs">anos liderando a empresa</div>
                            </div>
                        </div>

                        <div>
                            <div className="w-10 h-1 bg-orange-500 mb-6" />
                            <blockquote className="text-white text-xl md:text-2xl font-medium leading-relaxed mb-8">
                                "Fundei a Domingos Assessoria com um propósito simples: ser o parceiro que os empresários merecem. Não apenas um contador, mas alguém que realmente se importa com o sucesso do seu negócio."
                            </blockquote>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-px bg-orange-500" />
                                <div>
                                    <div className="text-white font-bold">Marcelo Domingos</div>
                                    <div className="text-zinc-500 text-sm">Sócio Fundador · CRC Nº 2SP 037.257/O-B</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 5. MISSÃO VISÃO VALORES ── */}
            <section className="py-24 px-6 bg-zinc-950">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-14">
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                            Nossa essência
                        </span>
                        <h2 className="text-4xl font-black text-white">
                            Missão, Visão e <span className="text-orange-500">Valores</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
                            <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                                <Target size={22} className="text-orange-500" />
                            </div>
                            <h3 className="text-white font-bold text-xl mb-3">Missão</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Entregar clareza fiscal, segurança jurídica e vantagem tributária para empresas do
                                agronegócio, comércio, serviço e indústria — com atendimento humano, próximo e
                                resultado mensurável no caixa do cliente.
                            </p>
                        </div>

                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
                            <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                                <Eye size={22} className="text-orange-500" />
                            </div>
                            <h3 className="text-white font-bold text-xl mb-3">Visão</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Ser o escritório contábil mais recomendado pelos empresários do Brasil — reconhecido
                                pela excelência técnica, pela clareza na comunicação e pelo impacto financeiro real
                                gerado a cada cliente atendido.
                            </p>
                        </div>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                                <Heart size={22} className="text-orange-500" />
                            </div>
                            <h3 className="text-white font-bold text-xl">Valores</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {valores.map((v) => {
                                const Icon = v.icon
                                return (
                                    <div key={v.label} className="flex gap-4">
                                        <div className="shrink-0 mt-0.5">
                                            <Icon size={18} className="text-orange-500" />
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-semibold mb-1">{v.label}</p>
                                            <p className="text-zinc-500 text-xs leading-relaxed">{v.desc}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-10">
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-white font-semibold text-sm">
                            Quer uma contabilidade assim? Fale com a Domingos.
                        </p>
                        <a
                            href="https://wa.me/5514996580459"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm whitespace-nowrap"
                        >
                            Falar no WhatsApp <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </section>

            {/* ── 6. NOSSO TIME — foto + organograma (oculto no mobile) ── */}
            <section className="hidden md:block py-24 px-6 bg-black">
                <div className="max-w-7xl mx-auto">

                    {/* Cabeçalho */}
                    <div className="mb-14">
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                            Nosso time
                        </span>
                        <h2 className="text-4xl font-black text-white">
                            Conheça nossa <span className="text-orange-500">Equipe</span>
                        </h2>
                    </div>

                    {/* Foto da equipe */}
                    <div className="relative rounded-xl overflow-hidden mb-16" style={{ height: '420px' }}>
                        <img
                            src={fotoComTodosFotoGrande}
                            alt="Equipe Domingos Assessoria"
                            className="w-full h-full object-cover"
                            style={{ objectPosition: 'center 30%' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <div className="absolute bottom-8 left-8">
                            <p className="text-white font-black text-2xl">30+ colaboradores</p>
                            <p className="text-zinc-400 text-sm">dedicados ao sucesso do seu negócio</p>
                        </div>
                    </div>

                    {/* Organograma */}
                    <div className="mb-4">
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                            Estrutura interna
                        </span>
                        <h3 className="text-2xl font-black text-white mb-10">
                            Organograma
                        </h3>
                    </div>

                    {/* Diretor */}
                    <div className="flex justify-center mb-0">
                        <div className="bg-orange-500 text-white font-black text-sm px-6 py-3 rounded-lg tracking-wide">
                            {orgData.diretor}
                        </div>
                    </div>

                    {/* Linha vertical */}
                    <div className="flex justify-center">
                        <div className="w-px h-8 bg-zinc-700" />
                    </div>

                    {/* Linha horizontal dos gerentes */}
                    <div className="relative flex justify-center gap-6 mb-0">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px bg-zinc-700"
                            style={{ width: `${(orgData.gerentes.length - 1) * 220}px` }} />
                        {orgData.gerentes.map((g) => (
                            <div key={g} className="flex flex-col items-center" style={{ width: '200px' }}>
                                <div className="w-px h-8 bg-zinc-700" />
                                <div className="bg-zinc-900 border border-orange-500/40 text-white font-semibold text-xs px-4 py-2.5 rounded-lg text-center w-full">
                                    {g}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Linha vertical para coordenadores */}
                    <div className="flex justify-center">
                        <div className="w-px h-8 bg-zinc-700" />
                    </div>

                    {/* Label coordenadores */}
                    <div className="flex items-center gap-3 mb-6 max-w-5xl mx-auto">
                        <div className="flex-1 h-px bg-orange-500/20" />
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">Coordenadores</span>
                        <div className="flex-1 h-px bg-orange-500/20" />
                    </div>

                    {/* Grid de departamentos */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
                        {orgData.departamentos.map((dep) => (
                            <div key={dep.coord} className="flex flex-col items-center gap-0">
                                {/* Linha vertical até coord */}
                                <div className="w-px h-6 bg-zinc-700" />
                                {/* Card coordenador */}
                                <div className="bg-zinc-900 border border-zinc-700 hover:border-orange-500/50 transition-colors rounded-lg px-3 py-2.5 text-center w-full">
                                    <p className="text-white font-bold text-xs leading-snug">{dep.coord}</p>
                                </div>
                                {/* Cargos */}
                                <div className="flex flex-col items-center w-full mt-0">
                                    {dep.cargos.map((cargo, idx) => (
                                        <div key={cargo} className="flex flex-col items-center w-full">
                                            <div className="w-px h-4 bg-zinc-800" />
                                            <div className={`w-full px-3 py-1.5 rounded-md text-center text-xs border ${
                                                idx === 0
                                                    ? 'bg-zinc-900/50 border-zinc-700 text-zinc-300'
                                                    : 'bg-transparent border-zinc-800 text-zinc-500'
                                            }`}>
                                                {cargo}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 7. ESTRUTURA ── */}
            <section className="py-24 px-6 bg-zinc-950">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                            Onde trabalhamos
                        </span>
                        <h2 className="text-4xl font-black text-white">
                            Nossa <span className="text-orange-500">Estrutura</span>
                        </h2>
                    </div>

                    {/* Galeria com destaque clicável */}
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Imagem em destaque (grande) */}
                        <div className="flex-1 overflow-hidden rounded-xl" style={{ height: '480px' }}>
                            <img
                                src={estruturaImages[destaque].src}
                                alt={estruturaImages[destaque].alt}
                                className="w-full h-full object-cover transition-all duration-500"
                            />
                        </div>

                        {/* Miniaturas — todas exceto a em destaque */}
                        <div className="flex md:flex-col flex-row gap-4">
                            {estruturaImages
                                .map((img, i) => ({ img, i }))
                                .filter(({ i }) => i !== destaque)
                                .map(({ img, i }) => (
                                    <button
                                        key={i}
                                        onClick={() => setDestaque(i)}
                                        className="overflow-hidden rounded-xl relative group flex-1 md:flex-none"
                                        style={{ width: '280px', height: '232px' }}
                                    >
                                        <img
                                            src={img.src}
                                            alt={img.alt}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/0 transition-colors duration-300" />
                                        {/* Label ao hover */}
                                        <span className="absolute bottom-3 left-3 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {img.alt}
                                        </span>
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 8. CTA ── */}
            <section className="py-24 px-6 bg-black border-t border-zinc-900">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-4 block">
                        Próximo passo
                    </span>
                    <h2 className="text-4xl font-black text-white mb-4">
                        Pronto para ter esse time<br />
                        <span className="text-orange-500">trabalhando por você?</span>
                    </h2>
                    <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
                        Solicite uma proposta gratuita e descubra como podemos
                        transformar a gestão da sua empresa.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="https://wa.me/5514996580459"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-lg transition-colors"
                        >
                            Solicitar Proposta <ArrowRight size={18} />
                        </a>
                        <Link
                            to="/servicos"
                            className="flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold px-8 py-4 rounded-lg transition-colors"
                        >
                            Ver nossos serviços
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}