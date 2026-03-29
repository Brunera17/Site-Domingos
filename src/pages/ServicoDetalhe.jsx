import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react'
import { services } from '../data/data'

export default function ServicoDetalhe() {
    const { id } = useParams()
    const service = services.find((s) => s.id === id)

    if (!service) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-4">
                <h2 className="text-3xl font-bold">Serviço não encontrado</h2>
                <Link to="/servicos" className="text-orange-500 hover:underline flex items-center gap-2">
                    <ArrowLeft size={18} /> Voltar aos serviços
                </Link>
            </div>
        )
    }

    const others = services.filter((s) => s.id !== id).slice(0, 3)

    return (
        <>
            <section className="py-20 px-6 bg-black">
                <div className="max-w-4xl mx-auto">
                    <Link to="/servicos" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors">
                        <ArrowLeft size={16} /> Voltar aos serviços
                    </Link>
                    <div className="text-5xl mb-6">{service.icon}</div>
                    <h1 className="text-5xl font-black text-white mb-6">{service.title}</h1>
                    <p className="text-gray-300 text-xl leading-relaxed">{service.description}</p>
                </div>
            </section>

            {service.features.length > 0 && (
                <section className="py-16 px-6 bg-gray-950">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-black text-white mb-8">O que está incluído</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {service.features.map((f) => (
                                <div key={f} className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-xl p-4">
                                    <CheckCircle size={20} className="text-orange-500 shrink-0" />
                                    <span className="text-white font-medium">{f}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="py-16 px-6 bg-orange-500 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black text-white mb-4">Interessado neste serviço?</h2>
                    <p className="text-orange-100 text-lg mb-8">
                        Entre em contato e solicite uma proposta gratuita e personalizada para sua empresa.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="https://wa.me/5514996580459" target="_blank" rel="noopener noreferrer"
                            className="bg-white text-orange-500 hover:bg-orange-50 font-bold px-8 py-4 rounded-lg transition-colors">
                            Solicitar Proposta Gratuita
                        </a>
                        <Link to="/contato"
                            className="border-2 border-white text-white hover:bg-white hover:text-orange-500 font-bold px-8 py-4 rounded-lg transition-colors">
                            Falar com Especialista
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-black text-white mb-8">Outros Serviços</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {others.map((s) => (
                            <Link key={s.id} to={`/servicos/${s.id}`}
                                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-orange-500/50 transition-all group">
                                <div className="text-3xl mb-3">{s.icon}</div>
                                <h3 className="text-white font-bold mb-2">{s.title}</h3>
                                <p className="text-gray-400 text-sm mb-4">{s.description}</p>
                                <span className="text-orange-500 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Ver detalhes <ArrowRight size={14} />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}