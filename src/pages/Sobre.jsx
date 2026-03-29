import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { team } from '../data/data'

const stats = [
    { value: '10+', label: 'Anos de Experiência' },
    { value: '530+', label: 'Clientes Ativos' },
    { value: '14', label: 'Estados' },
    { value: '30+', label: 'Colaboradores' },
]

const valores = ['Excelência no atendimento', 'Ética e transparência', 'Atualização constante', 'Compromisso com resultados', 'Relacionamento humano e próximo', 'Inovação e tecnologia']

const estruturaImages = [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551135049-8a33b5883817?w=600&h=400&fit=crop',
]

export default function Sobre() {
    return (
        <>
            {/* Hero */}
            <section className="py-20 px-6 bg-black text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-black text-white mb-6">Sobre Nós</h1>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        A Domingos Assessoria Empresarial é um escritório de contabilidade que funciona como um hub de
                        soluções, com mais de 10 anos de atuação no mercado. Com uma equipe formada por mais de 30
                        colaboradores, incluindo contadores, administradores, profissionais de TI e advogados, atendemos
                        mais de 530 clientes em 14 estados e mais de 80 cidades brasileiras. Nosso diferencial está no
                        atendimento de excelência, humano e ágil, sempre focado em entregar serviços de qualidade e em
                        constante evolução tecnológica.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 px-6 bg-gray-950">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((s) => (
                        <div key={s.label}>
                            <div className="text-5xl font-black text-orange-500 mb-2">{s.value}</div>
                            <div className="text-gray-400">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Missão Visão Valores */}
            <section className="py-20 px-6 bg-black">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                        <div className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center text-2xl mb-5">🎯</div>
                        <h3 className="text-white font-bold text-xl mb-3">Missão</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Oferecer soluções contábeis, fiscais e empresariais de excelência, atuando como hub de soluções
                            para nossos clientes, sempre com atendimento humano, ágil e personalizado.
                        </p>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                        <div className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center text-2xl mb-5">👁️</div>
                        <h3 className="text-white font-bold text-xl mb-3">Visão</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Ser referência nacional em assessoria empresarial, reconhecidos pela qualidade técnica, inovação
                            e compromisso com o sucesso dos nossos clientes.
                        </p>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                        <div className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center text-2xl mb-5">❤️</div>
                        <h3 className="text-white font-bold text-xl mb-3">Valores</h3>
                        <ul className="space-y-2">
                            {valores.map((v) => (
                                <li key={v} className="flex items-center gap-2 text-gray-400 text-sm">
                                    <CheckCircle size={16} className="text-orange-500 shrink-0" /> {v}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Equipe */}
            <section className="py-20 px-6 bg-gray-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-black text-white mb-3">Nossa Equipe</h2>
                        <p className="text-gray-400">Conheça alguns dos profissionais que fazem a diferença</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {team.map((member) => (
                            <div key={member.name} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                                <img src={member.image} alt={member.name} className="w-full h-52 object-cover object-top" />
                                <div className="p-5">
                                    <h3 className="text-white font-bold">{member.name}</h3>
                                    <p className="text-orange-500 text-sm font-medium mb-2">{member.role}</p>
                                    <p className="text-gray-400 text-xs">{member.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Estrutura */}
            <section className="py-20 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-black text-white mb-3">Nossa Estrutura</h2>
                        <p className="text-gray-400">Conheça nossa estrutura moderna e acolhedora</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {estruturaImages.map((img, i) => (
                            <img key={i} src={img} alt={`Estrutura ${i + 1}`} className="w-full h-64 object-cover rounded-xl" />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 bg-orange-500 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-black text-white mb-4">Um Hub Completo de Soluções</h2>
                    <p className="text-orange-100 text-lg mb-2">
                        Com uma equipe multidisciplinar formada por contadores, administradores, profissionais de TI e
                        advogados, oferecemos soluções completas e integradas para todas as necessidades da sua empresa.
                    </p>
                    <p className="text-orange-100 text-lg">Nosso compromisso é com seu sucesso e crescimento sustentável.</p>
                </div>
            </section>
        </>
    )
}