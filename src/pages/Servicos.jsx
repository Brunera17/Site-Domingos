import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { services } from '../data/data'

export default function Servicos() {
    return (
        <>
            <section className="py-20 px-6 bg-black text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-black text-white mb-6">Nossos Serviços</h1>
                    <p className="text-gray-300 text-lg">
                        Soluções completas e personalizadas para empresas de todos os portes e segmentos.
                        Conheça nossa gama de serviços especializados.
                    </p>
                </div>
            </section>

            <section className="py-16 px-6 bg-gray-950">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {services.map((s) => (
                            <Link key={s.id} to={`/servicos/${s.id}`}
                                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-orange-500/50 transition-all group">
                                <div className="text-3xl mb-4">{s.icon}</div>
                                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                                <p className="text-gray-400 text-sm mb-4">{s.description}</p>
                                <span className="text-orange-500 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Ver detalhes <ArrowRight size={14} />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-orange-500 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-black text-white mb-4">Não encontrou o serviço que procura?</h2>
                    <p className="text-orange-100 text-lg mb-8">
                        Entre em contato conosco! Como um hub de soluções empresariais, temos parceiros
                        especializados para atender todas as suas necessidades.
                    </p>
                    <a href="https://wa.me/5514996580459" target="_blank" rel="noopener noreferrer"
                        className="bg-white text-orange-500 hover:bg-orange-50 font-bold px-8 py-4 rounded-lg transition-colors inline-block">
                        Falar com Especialista
                    </a>
                </div>
            </section>
        </>
    )
}