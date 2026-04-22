import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-black text-white px-6 text-center">
            <div className="text-8xl font-black text-orange-500 mb-4">404</div>
            <h1 className="text-3xl font-black text-white mb-4">Página não encontrada</h1>
            <p className="text-gray-400 text-lg mb-8 max-w-md">
                A página que você está procurando não existe ou foi removida.
            </p>
            <Link to="/" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-lg transition-colors flex items-center gap-2">
                <ArrowLeft size={18} /> Voltar ao Início
            </Link>
        </div>
    )
}
