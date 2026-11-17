import { Link } from 'react-router-dom'
import { Calculator, FileText, Users, Building2, DollarSign, Headset, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

// Como o escritório se organiza, sem fotos de pessoas: cada área com o que
// entrega. Textos seguem os serviços de src/data/services.js.
const departamentos = [
    {
        icon: Calculator,
        nome: 'Contábil',
        texto: 'Escrituração, balanços e relatórios gerenciais para decisões com base em números reais.',
        to: '/servicos/assessoria-contabil',
    },
    {
        icon: FileText,
        nome: 'Fiscal',
        texto: 'Apuração mensal de impostos, obrigações acessórias e recuperação de créditos tributários.',
        to: '/servicos/assessoria-fiscal',
    },
    {
        icon: Users,
        nome: 'Departamento Pessoal',
        texto: 'Folha de pagamento, admissões, demissões, férias, 13º e envio do eSocial.',
        to: '/servicos/assessoria-dp-pessoal',
    },
    {
        icon: Building2,
        nome: 'Societário',
        texto: 'Abertura, alterações contratuais, licenças, alvarás e regularização de empresas.',
        to: '/servicos/abertura-regularizacao-empresas',
    },
    {
        icon: DollarSign,
        nome: 'BPO Financeiro',
        texto: 'Contas a pagar e receber, fluxo de caixa, conciliação bancária e cobranças.',
        to: '/servicos/bpo-financeiro',
    },
    {
        icon: Headset,
        nome: 'Relacionamento',
        texto: 'Um ponto de contato que acompanha sua empresa e conecta você a todas as áreas.',
        to: '/contato',
    },
]

export default function DepartamentosSection() {
    return (
        <section className="py-section px-6 md:px-8 lg:px-10 bg-zinc-950">
            <div className="max-w-6xl mx-auto">
                <SectionHeading
                    eyebrow="Como nos organizamos"
                    title={<>Uma área dedicada para <span className="text-orange-500">cada necessidade</span></>}
                    subtitle="Cada departamento tem coordenação própria e processos definidos — e todos conversam entre si para cuidar da sua empresa por inteiro."
                    className="mb-12"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {departamentos.map(({ icon: Icon, nome, texto, to }) => (
                        <Link
                            key={nome}
                            to={to}
                            className="group bg-black border border-zinc-800 hover:border-orange-500/50 rounded-xl p-6 flex flex-col transition-colors"
                        >
                            <span className="w-11 h-11 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5">
                                <Icon size={20} className="text-orange-500" />
                            </span>
                            <h3 className="text-white font-bold text-base mb-2">{nome}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-5">{texto}</p>
                            <span className="mt-auto inline-flex items-center gap-1.5 text-orange-500 text-sm font-semibold">
                                Saiba mais
                                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
