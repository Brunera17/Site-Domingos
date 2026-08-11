import { Link } from 'react-router-dom'
import { ArrowLeft, Search, Phone } from 'lucide-react'
import SEOHead from '../components/SEOHead'

export default function NotFound() {
    return (
        <div className="bg-black min-h-[70vh] flex items-center">
            <SEOHead
                title="Página não encontrada"
                description="A página que você procura não existe ou foi movida."
                canonicalPath="/404"
                noIndex
            />

            <div className="max-w-2xl mx-auto px-6 md:px-8 lg:px-10 py-24 text-center">
                <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">
                    Erro 404
                </span>
                <h1
                    className="font-black text-white leading-[0.95] mb-6"
                    style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
                >
                    Página não <span className="text-orange-500">encontrada</span>
                </h1>
                <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-md mx-auto">
                    O endereço que você tentou acessar não existe, foi movido ou removido.
                    Vamos te ajudar a chegar onde precisa.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-14">
                    <Link
                        to="/"
                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={16} /> Voltar para a Home
                    </Link>
                    <Link
                        to="/servicos"
                        className="flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                    >
                        <Search size={16} /> Ver nossos serviços
                    </Link>
                </div>

                <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm">
                    <Phone size={14} className="text-orange-500" />
                    Precisa de ajuda? Fale com a gente pelo{' '}
                    <a
                        href="tel:+5514996580459"
                        className="text-orange-500 hover:text-orange-400 font-medium transition-colors"
                    >
                        (14) 9 9658-0459
                    </a>
                </div>
            </div>
        </div>
    )
}
