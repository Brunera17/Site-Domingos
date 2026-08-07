import { Component } from 'react'
import { RefreshCw } from 'lucide-react'

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        console.error('ErrorBoundary capturou um erro:', error, info)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="bg-black min-h-screen flex items-center justify-center px-6">
                    <div className="max-w-md text-center">
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">
                            Erro inesperado
                        </span>
                        <h1 className="font-black text-white text-4xl md:text-5xl leading-tight mb-6">
                            Algo deu <span className="text-orange-500">errado</span>
                        </h1>
                        <p className="text-zinc-400 text-base leading-relaxed mb-10">
                            Encontramos um problema inesperado ao carregar esta página.
                            Tente recarregar — se o problema continuar, entre em contato com a gente.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={() => window.location.reload()}
                                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                            >
                                <RefreshCw size={16} /> Recarregar página
                            </button>
                            <a
                                href="/"
                                className="flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                            >
                                Voltar para a Home
                            </a>
                        </div>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
