import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ServicosSection from '../components/ServicosSection'
import SetoresSection from '../components/SetoresSection'
import DiferenciaisSection from '../components/Diferenciais'
import TestemunhosSection from '../components/Testemunho'

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
            <SetoresSection />
            <DiferenciaisSection />
            <TestemunhosSection />

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