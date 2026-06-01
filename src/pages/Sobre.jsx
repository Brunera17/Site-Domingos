import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Target, Eye, Heart, Users, MapPin, Award, TrendingUp, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import lucimarafoto from '../assets/colaboradores/lucimara.webp'
import dayanefoto from '../assets/colaboradores/Dayane Pasin.webp'
import marcelofoto from '../assets/colaboradores/Marcelo 2.webp'

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

const equipe = [
    {
        nome: 'Marcelo Domingos',
        cargo: 'Sócio Fundador e Contador',
        departamento: 'Administrativo',
        bio: 'Contador com mais de 15 anos de experiência, especialista em planejamento tributário e gestão contábil.',
        foto: marcelofoto
    },
    {
        nome: 'Ágata',
        cargo: 'Contadora e Consultora',
        departamento: 'Administrativo',
        bio: 'Especialista em consultoria empresarial e gestão financeira estratégica para empresas em crescimento.',
        foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face'
    },
    {
        nome: 'Maylon',
        cargo: 'Advogado Tributarista',
        departamento: 'Fiscal / Tributário',
        bio: 'Especialista em direito tributário, recuperação de créditos e compliance fiscal.',
        foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face'
    },
    {
        nome: 'Odair Domingos',
        cargo: 'Gerente de DP',
        departamento: 'Departamento Pessoal',
        bio: 'Administrador com expertise em departamento pessoal, eSocial e legislação trabalhista.',
        foto: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face'
    },
    {
        nome: 'Nelson Kayki',
        cargo: 'Analista Fiscal',
        departamento: 'Fiscal / Tributário',
        bio: 'Especialista em apuração de impostos, obrigações acessórias e planejamento fiscal.',
        foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face'
    },
    {
        nome: 'Gabriela Amabily',
        cargo: 'Analista Contábil',
        departamento: 'Contabilidade',
        bio: 'Responsável pela escrituração contábil e elaboração de demonstrações financeiras.',
        foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face'
    },
    {
        nome: 'Flávia Marques',
        cargo: 'Consultora Comercial',
        departamento: 'Comercial',
        bio: 'Responsável pelo relacionamento com novos clientes e expansão do portfólio.',
        foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face'
    },
    {
        nome: 'Adriely Maria de Oliveira',
        cargo: 'Financeiro',
        departamento: 'Financeiro',
        bio: 'Atua nas rotinas administrativas e financeiras, responsável por organização financeira, emissão de boletos, controle de pagamentos e atendimento aos clientes.',
        foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'
    },
    {
        nome: 'Daniele da Silva',
        cargo: 'Analista Fiscal',
        departamento: 'Fiscal / Tributário',
        bio: 'Experiência em apuração de empresas nos regimes MEI, Simples Nacional, Lucro Presumido e Lucro Real. Emissão de NF-e, CT-e, NFS e MDF-e, controle de planilhas e atendimento ao cliente.',
        foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
    },
    {
        nome: 'Daniele Fátima Almeida de Oliveira',
        cargo: 'Auxiliar de Departamento Contábil',
        departamento: 'Contabilidade',
        bio: 'Atua com lançamentos contábeis, conferências, apurações e lançamentos rurais, com foco em organização, agilidade e atendimento ao cliente.',
        foto: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face'
    },
    {
        nome: 'Dayane Pasin de Almeida',
        cargo: 'Gerente de Relacionamento',
        departamento: 'Administrativo',
        bio: 'Oferece suporte e atendimento personalizado aos clientes, fortalecendo relações de confiança e garantindo a melhor experiência no atendimento.',
        foto: dayanefoto
    },
    {
        nome: 'Iasmin Sthefania Antunes de Oliveira',
        cargo: 'Estagiária – Departamento Pessoal',
        departamento: 'Departamento Pessoal',
        bio: 'Estagiária e estudante de Técnico em Administração. Atua com organização de documentos, atendimento e apoio nas rotinas administrativas.',
        foto: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face'
    },
    {
        nome: 'João Brayan da Silva Fabricio',
        cargo: 'Societário',
        departamento: 'Legalização Empresarial',
        bio: 'Atua com abertura, alteração e baixa de empresas, elaboração de documentos societários, processos na Junta Comercial, Redesim e viabilidade.',
        foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    },
    {
        nome: 'Laura Cristina Chiara',
        cargo: 'Assistente Fiscal',
        departamento: 'Fiscal / Tributário',
        bio: 'Experiência em rotinas fiscais, apuração de impostos, análise de documentos e interpretação de legislações federais, estaduais e municipais.',
        foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face'
    },
    {
        nome: 'Lílian Maria de Souza',
        cargo: 'Coordenadora – Departamento Pessoal',
        departamento: 'Departamento Pessoal',
        bio: 'Experiência em rotinas de folha de pagamento, emissão de guias de FGTS, rescisões contratuais e suporte à equipe e clientes.',
        foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face'
    },
    {
        nome: 'Lucimara Rondino de Oliveira',
        cargo: 'Auxiliar – Departamento Pessoal',
        departamento: 'Departamento Pessoal',
        bio: 'Atua no fechamento da folha mensal e rotinas correlatas, com conhecimento em emissão de notas fiscais e demais processos do setor.',
        foto: lucimarafoto
    },
    {
        nome: 'Márcio José de Oliveira Junior',
        cargo: 'Auxiliar – Departamento Fiscal',
        departamento: 'Fiscal / Tributário',
        bio: 'Auxilia nas rotinas fiscais, organização de documentos, apuração de impostos e atendimento a clientes, com foco em responsabilidade e eficiência.',
        foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face'
    },
    {
        nome: 'Maria Isabel Travassi Rodrigues',
        cargo: 'Auxiliar Administrativo / Recepcionista',
        departamento: 'Administrativo',
        bio: 'Atua com rotinas administrativas e fiscais, organização de documentos e recepção de clientes, prezando pelo atendimento com simpatia e eficiência.',
        foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face'
    },
    {
        nome: 'Miguel Oliveira de Sousa Coelho',
        cargo: 'Assistente de Legalização',
        departamento: 'Legalização Empresarial',
        bio: 'Executa todo o processo de constituição de empresas do início ao fim, incluindo Holdings e Consórcios. Também atua com IR, declarações de MEI, planejamentos personalizados e regularização de empresas.',
        foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face'
    },
    {
        nome: 'Pedro Henrique Campos de Camargo',
        cargo: 'Coordenador de Legalização',
        departamento: 'Legalização Empresarial',
        bio: 'Quase 5 anos de experiência societária e empresarial. Coordena equipe e processos junto à JUCESP, Receita Federal, cartórios e órgãos de registro, além de regularização de Produtores Rurais.',
        foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face'
    },
    {
        nome: 'Taynara Cristina de Oliveira',
        cargo: 'Auxiliar – Departamento Societário',
        departamento: 'Legalização Empresarial',
        bio: 'Atua com abertura, alteração e regularização de empresas, licenças, enquadramentos e acompanhamento de demandas junto a órgãos públicos.',
        foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face'
    },
    {
        nome: 'Vanessa Leonidia de Almeida',
        cargo: 'Analista – Departamento Pessoal',
        departamento: 'Departamento Pessoal',
        bio: 'Experiência em rotinas trabalhistas, folha de pagamento, controle de ponto, admissões, demissões e atendimento aos colaboradores.',
        foto: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face'
    },
    {
        nome: 'Yasmin Christine Melo dos Santos',
        cargo: 'Estagiária – Departamento Contábil',
        departamento: 'Contabilidade',
        bio: 'Estagiária na área contábil, atuando com lançamentos contábeis e rurais. Cursa o ensino médio conciliando estudos e experiência profissional.',
        foto: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face'
    },
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
                        <div className="absolute left-[88px] top-0 bottom-0 w-px bg-zinc-800 hidden md:block" />
                        <div className="flex flex-col gap-8">
                            {timeline.map((item) => (
                                <div key={item.ano} className="flex gap-8 items-start">
                                    <div className="shrink-0 w-16 text-right hidden md:block">
                                        <span className="text-orange-500 font-black text-sm">{item.ano}</span>
                                    </div>
                                    <div className="shrink-0 hidden md:flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 border-4 border-black mt-0.5 z-10" />
                                    <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-orange-500 font-black text-xs md:hidden">{item.ano}</span>
                                            <h3 className="text-white font-bold">{item.titulo}</h3>
                                        </div>
                                        <p className="text-zinc-500 text-sm leading-relaxed mb-3">{item.desc}</p>
                                        <p className="text-orange-400/80 text-xs font-medium italic border-l-2 border-orange-500/40 pl-3">
                                            → {item.frase}
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
                            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                                <img
                                    src={marcelofoto}
                                    alt="Marcelo Domingos"
                                    className="w-full h-full object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-zinc-900 border border-zinc-800 rounded-xl p-4 max-w-[200px]">
                                <div className="text-2xl font-black text-orange-500">10+</div>
                                <div className="text-zinc-400 text-xs">anos liderando a empresa</div>
                            </div>
                        </div>

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
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                                <Target size={22} className="text-orange-500" />
                            </div>
                            <h3 className="text-white font-bold text-xl mb-3">Missão</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Entregar clareza fiscal, segurança jurídica e vantagem tributária para empresas do
                                agronegócio, comércio, serviço e indústria — com atendimento humano, próximo e
                                resultado mensurável no caixa do cliente.
                            </p>
                        </div>

                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
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

                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
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
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
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
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${filtro === dep
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

                    {/* ── Grid — SEM layout no container, SEM layout nos cards ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        <AnimatePresence mode="popLayout">
                            {equipeFiltrada.map((membro) => (
                                <motion.div
                                    key={membro.nome}
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
                                            loading="lazy"
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
                    </div>

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
                                    loading="lazy"
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
