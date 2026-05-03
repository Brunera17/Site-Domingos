import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Target, Eye, Heart, Users, MapPin, Award, TrendingUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// ── DADOS ─────────────────────────────────────────────────────────────────────

const stats = [
    { value: '10+', label: 'Anos de mercado', icon: Award },
    { value: '530+', label: 'Clientes ativos', icon: Users },
    { value: '14', label: 'Estados', icon: MapPin },
    { value: '30+', label: 'Colaboradores', icon: TrendingUp },
]

const timeline = [
    { ano: '2014', titulo: 'Fundação', desc: 'Dr. Domingos Santos abre o escritório em Itaí-SP com foco em pequenas empresas da região.' },
    { ano: '2016', titulo: 'Expansão Regional', desc: 'Crescimento para 5 cidades do interior paulista e contratação dos primeiros colaboradores.' },
    { ano: '2018', titulo: '100 Clientes', desc: 'Marco de 100 clientes ativos e abertura do departamento de consultoria empresarial.' },
    { ano: '2020', titulo: 'Presença Nacional', desc: 'Expansão para 8 estados com atendimento 100% digital. Equipe passa de 15 colaboradores.' },
    { ano: '2022', titulo: '400 Clientes', desc: 'Lançamento do BPO Financeiro e do setor de legalização empresarial. 14 estados atendidos.' },
    { ano: '2024', titulo: 'Hub de Soluções', desc: 'Consolidação como hub completo com 530+ clientes, 30+ colaboradores e 80+ cidades.' },
]

const valores = [
    { icon: Heart, label: 'Atendimento humano e próximo' },
    { icon: Award, label: 'Excelência técnica' },
    { icon: Eye, label: 'Ética e transparência' },
    { icon: TrendingUp, label: 'Atualização constante' },
    { icon: Target, label: 'Compromisso com resultados' },
    { icon: Users, label: 'Inovação e tecnologia' },
]

const departamentos = [
    'Todos',
    'Contabilidade',
    'Fiscal / Tributário',
    'Departamento Pessoal',
    'Consultoria',
    'Legalização Empresarial',
    'TI',
    'Administrativo',
    'Financeiro',
    'Comercial',
]

// 🔁 Substitua pelos dados reais
const equipe = [
    { nome: 'Dr. Domingos Santos', cargo: 'Sócio Fundador e Contador', departamento: 'Contabilidade', bio: 'Contador com mais de 15 anos de experiência, especialista em planejamento tributário e gestão contábil.', foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face' },
    { nome: 'Dra. Fernanda Costa', cargo: 'Contadora e Consultora', departamento: 'Consultoria', bio: 'Especialista em consultoria empresarial e gestão financeira estratégica para empresas em crescimento.', foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face' },
    { nome: 'Ricardo Almeida', cargo: 'Advogado Tributarista', departamento: 'Fiscal / Tributário', bio: 'Especialista em direito tributário, recuperação de créditos e compliance fiscal.', foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face' },
    { nome: 'Juliana Martins', cargo: 'Gerente de DP', departamento: 'Departamento Pessoal', bio: 'Administradora com expertise em departamento pessoal, eSocial e legislação trabalhista.', foto: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face' },
    { nome: 'Carlos Mendes', cargo: 'Analista Fiscal', departamento: 'Fiscal / Tributário', bio: 'Especialista em apuração de impostos, obrigações acessórias e planejamento fiscal.', foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face' },
    { nome: 'Ana Paula Lima', cargo: 'Analista Contábil', departamento: 'Contabilidade', bio: 'Responsável pela escrituração contábil e elaboração de demonstrações financeiras.', foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face' },
    { nome: 'Bruno Oliveira', cargo: 'Desenvolvedor Full Stack', departamento: 'TI', bio: 'Responsável pelos sistemas internos, automações e infraestrutura tecnológica da empresa.', foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face' },
    { nome: 'Patrícia Souza', cargo: 'Coordenadora Administrativa', departamento: 'Administrativo', bio: 'Gestora dos processos administrativos garantindo eficiência operacional em toda a empresa.', foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face' },
    { nome: 'Felipe Torres', cargo: 'Analista Financeiro', departamento: 'Financeiro', bio: 'Especialista em BPO financeiro, fluxo de caixa e relatórios gerenciais.', foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face' },
    { nome: 'Larissa Campos', cargo: 'Consultora Comercial', departamento: 'Comercial', bio: 'Responsável pelo relacionamento com novos clientes e expansão do portfólio.', foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face' },
    { nome: 'Rafael Nunes', cargo: 'Especialista em Legalização', departamento: 'Legalização Empresarial', bio: 'Especialista em abertura, alteração e regularização de empresas em todo o Brasil.', foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face' },
]

const estruturaImages = [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&h=500&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&h=500&fit=crop',
    'https://images.unsplash.com/photo-1551135049-8a33b5883817?w=700&h=500&fit=crop',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=700&h=500&fit=crop',
]

// ── COMPONENTE ────────────────────────────────────────────────────────────────

export default function Sobre() {
    const [filtro, setFiltro] = useState('Todos')

    const equipeFiltrada = filtro === 'Todos'
        ? equipe
        : equipe.filter(m => m.departamento === filtro)

    return (
        <div className="bg-black">

            {/* ── 1. HERO ── */}
            <section
                className="relative flex items-end overflow-hidden"
                style={{ height: '70vh', minHeight: '500px' }}
            >
                {/* Imagem de fundo */}
                <img
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&h=900&fit=crop"
                    alt="Equipe Domingos Assessoria"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
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
                        Mais de 10 anos transformando a gestão de empresas com atendimento
                        humano, tecnologia e expertise multidisciplinar.
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
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
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
                        {/* Linha vertical */}
                        <div className="absolute left-[88px] top-0 bottom-0 w-px bg-zinc-800 hidden md:block" />

                        <div className="flex flex-col gap-8">
                            {timeline.map((item, i) => (
                                <div key={item.ano} className="flex gap-8 items-start">
                                    {/* Ano */}
                                    <div className="shrink-0 w-16 text-right hidden md:block">
                                        <span className="text-orange-500 font-black text-sm">{item.ano}</span>
                                    </div>

                                    {/* Dot */}
                                    <div className="shrink-0 hidden md:flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 border-4 border-black mt-0.5 z-10" />

                                    {/* Conteúdo */}
                                    <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-orange-500 font-black text-xs md:hidden">{item.ano}</span>
                                            <h3 className="text-white font-bold">{item.titulo}</h3>
                                        </div>
                                        <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
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
                        {/* Foto */}
                        <div className="relative">
                            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop&crop=face"
                                    alt="Dr. Domingos Santos"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                            {/* Card flutuante */}
                            <div className="absolute -bottom-6 -right-6 bg-zinc-900 border border-zinc-800 rounded-xl p-4 max-w-[200px]">
                                <div className="text-2xl font-black text-orange-500">10+</div>
                                <div className="text-zinc-400 text-xs">anos liderando a empresa</div>
                            </div>
                        </div>

                        {/* Citação */}
                        <div>
                            <div
                                className="text-zinc-700 font-black leading-none mb-6 select-none"
                                style={{ fontSize: '120px' }}
                            >
                                "
                            </div>
                            <blockquote className="text-white text-xl md:text-2xl font-medium leading-relaxed mb-8 -mt-16">
                                Fundei a Domingos Assessoria com um propósito simples: ser o parceiro que os empresários merecem. Não apenas um contador, mas alguém que realmente se importa com o sucesso do seu negócio.
                            </blockquote>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-px bg-orange-500" />
                                <div>
                                    <div className="text-white font-bold">Dr. Domingos Santos</div>
                                    <div className="text-zinc-500 text-sm">Sócio Fundador · CRC Nº 2SP 037.257/O-8</div>
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                                <Target size={22} className="text-orange-500" />
                            </div>
                            <h3 className="text-white font-bold text-xl mb-3">Missão</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Oferecer soluções contábeis, fiscais e empresariais de excelência, atuando como
                                hub de soluções com atendimento humano, ágil e personalizado.
                            </p>
                        </div>

                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                                <Eye size={22} className="text-orange-500" />
                            </div>
                            <h3 className="text-white font-bold text-xl mb-3">Visão</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Ser referência nacional em assessoria empresarial, reconhecidos pela qualidade
                                técnica, inovação e compromisso com o sucesso dos clientes.
                            </p>
                        </div>

                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                                <Heart size={22} className="text-orange-500" />
                            </div>
                            <h3 className="text-white font-bold text-xl mb-3">Valores</h3>
                            <ul className="space-y-2.5">
                                {valores.map((v) => {
                                    const Icon = v.icon
                                    return (
                                        <li key={v.label} className="flex items-center gap-2.5 text-zinc-400 text-sm">
                                            <Icon size={14} className="text-orange-500 shrink-0" />
                                            {v.label}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 6. EQUIPE ── */}
            <section className="py-24 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10">
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                            Nosso time
                        </span>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                            <h2 className="text-4xl font-black text-white">
                                Conheça nossa <span className="text-orange-500">Equipe</span>
                            </h2>
                            <p className="text-zinc-500 text-sm">
                                {equipe.length} profissionais · {departamentos.length - 1} departamentos
                            </p>
                        </div>

                        {/* Filtros */}
                        <div className="flex flex-wrap gap-2">
                            {departamentos.map((dep) => (
                                <button
                                    key={dep}
                                    onClick={() => setFiltro(dep)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                                        filtro === dep
                                            ? 'bg-orange-500 border-orange-500 text-white'
                                            : 'bg-transparent border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
                                    }`}
                                >
                                    {dep}
                                    {dep !== 'Todos' && (
                                        <span className="ml-1.5 opacity-50">
                                            {equipe.filter(m => m.departamento === dep).length}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid */}
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        <AnimatePresence mode="popLayout">
                            {equipeFiltrada.map((membro) => (
                                <motion.div
                                    key={membro.nome}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300"
                                >
                                    <div className="relative overflow-hidden h-56">
                                        <img
                                            src={membro.foto}
                                            alt={membro.nome}
                                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-orange-400 text-xs font-bold px-2.5 py-1 rounded-full border border-orange-500/20">
                                            {membro.departamento}
                                        </span>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-white font-bold text-sm mb-0.5">{membro.nome}</h3>
                                        <p className="text-orange-500 text-xs font-medium mb-2">{membro.cargo}</p>
                                        <p className="text-zinc-500 text-xs leading-relaxed">{membro.bio}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {equipeFiltrada.length === 0 && (
                        <div className="text-center py-20 text-zinc-600 text-sm">
                            Nenhum funcionário neste departamento ainda.
                        </div>
                    )}
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

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {estruturaImages.map((img, i) => (
                            <div
                                key={i}
                                className={`overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                            >
                                <img
                                    src={img}
                                    alt={`Estrutura ${i + 1}`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    style={{ height: i === 0 ? '100%' : '200px' }}
                                />
                            </div>
                        ))}
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