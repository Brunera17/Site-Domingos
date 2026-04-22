import { Link } from 'react-router-dom'
import { CheckCircle, Star } from 'lucide-react'
import { testimonials, sectors } from '../data/data'
import Hero from '../components/Hero'
import ServicosSection from '../components/ServicosSection'


const diferenciais = [
    { icon: '✅', title: 'Atendimento de Excelência', desc: 'Atendimento humano, personalizado e ágil. Você não é apenas um número para nós.' },
    { icon: '📉', title: 'Redução de Custos', desc: 'Planejamento tributário eficiente para sua empresa pagar menos impostos legalmente.' },
    { icon: '👨‍💼', title: 'Equipe Multidisciplinar', desc: 'Contadores, advogados, administradores e profissionais de TI trabalhando pelo seu sucesso.' },
]

const resources = [
    { type: 'E-book', title: 'Guia Completo de Planejamento Tributário', desc: 'Aprenda estratégias para reduzir impostos de forma legal e aumentar a lucratividade.', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop' },
    { type: 'Calculadora', title: 'Calculadora de Impostos Gratuita', desc: 'Calcule quanto sua empresa paga de impostos e descubra oportunidades de economia.', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=200&fit=crop' },
    { type: 'Checklist', title: 'Checklist: Abertura de Empresa', desc: 'Tudo que você precisa saber para abrir sua empresa sem erros.', image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=200&fit=crop' },
]

export default function Home() {
    return (
        <>
            <Hero />
            <ServicosSection />

            {/* Setores */}
            <section className="py-20 px-6 bg-gray-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-black text-white mb-3">Setores que Atendemos</h2>
                        <p className="text-gray-400">Atendemos diversos segmentos com expertise e conhecimento especializado</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {sectors.map((s) => (
                            <div key={s} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center gap-3">
                                <CheckCircle size={20} className="text-orange-500 shrink-0" />
                                <span className="text-white font-medium text-sm">{s}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Diferenciais */}
            <section className="py-20 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-black text-white mb-3">Por Que Escolher a Domingos Assessoria?</h2>
                        <p className="text-gray-400">Nossos diferenciais que fazem a diferença no seu negócio</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {diferenciais.map((d) => (
                            <div key={d.title} className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                                <div className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center text-2xl mb-5">{d.icon}</div>
                                <h3 className="text-white font-bold text-lg mb-3">{d.title}</h3>
                                <p className="text-gray-400 text-sm">{d.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Depoimentos */}
            <section className="py-20 px-6 bg-gray-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-black text-white mb-3">Depoimentos</h2>
                        <p className="text-gray-400">O que nossos clientes dizem sobre nossos serviços</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {testimonials.map((t) => (
                            <div key={t.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-orange-500 fill-orange-500" />)}
                                </div>
                                <p className="text-gray-300 italic mb-5">"{t.text}"</p>
                                <div className="flex items-center gap-3">
                                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                                    <div>
                                        <div className="text-white font-semibold">{t.name}</div>
                                        <div className="text-gray-400 text-xs">{t.role}</div>
                                        <div className="text-gray-500 text-xs">{t.company}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recursos */}
            <section className="py-20 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-black text-white mb-3">Recursos Gratuitos</h2>
                        <p className="text-gray-400">Materiais gratuitos para ajudar sua empresa a crescer</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {resources.map((r) => (
                            <div key={r.title} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                                <img src={r.image} alt={r.title} className="w-full h-40 object-cover" />
                                <div className="p-6">
                                    <span className="text-orange-500 text-xs font-bold uppercase tracking-wider">{r.type}</span>
                                    <h3 className="text-white font-bold mt-2 mb-2">{r.title}</h3>
                                    <p className="text-gray-400 text-sm mb-4">{r.desc}</p>
                                    <Link to="/contato"
                                        className="text-white border border-white hover:bg-white hover:text-black font-semibold px-4 py-2 rounded-lg text-sm transition-colors inline-block">
                                        Baixar Gratuitamente
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 bg-orange-500">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl font-black text-white mb-4">Pronto para Transformar sua Gestão Empresarial?</h2>
                    <p className="text-orange-100 text-lg mb-8">Entre em contato conosco e descubra como podemos ajudar sua empresa a crescer, economizar e prosperar.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="https://wa.me/5514996580459" target="_blank" rel="noopener noreferrer"
                            className="bg-white text-orange-500 hover:bg-orange-50 font-bold px-8 py-4 rounded-lg transition-colors">
                            Falar com Especialista
                        </a>
                        <Link to="/contato"
                            className="border-2 border-white text-white hover:bg-white hover:text-orange-500 font-bold px-8 py-4 rounded-lg transition-colors">
                            Solicitar Contato
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}