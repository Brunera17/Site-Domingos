import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Mail } from 'lucide-react'

const navLinks = [
    { to: '/', label: 'Início' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/servicos', label: 'Serviços' },
    { to: '/blog', label: 'Blog' },
    { to: '/trabalhe-conosco', label: 'Trabalhe Conosco' },
    { to: '/contato', label: 'Contato' },
]

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()

    return (
        <>
            <div className="bg-black border-b border-gray-800 text-sm py-2 px-6 hidden md:flex justify-between items-center">
                <div className="flex gap-6 text-gray-400">
                    <a href="tel:01499658-0459" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                        <Phone size={14} /> 014.9.9658-0459
                    </a>
                    <a href="mailto:sucessodocliente@domingosassessoria.com.br" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                        <Mail size={14} /> sucessodocliente@domingosassessoria.com.br
                    </a>
                </div>
                <a href="#" className="text-orange-500 hover:underline font-medium">Área do Cliente</a>
            </div>

            <header className="bg-black sticky top-0 z-50 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="bg-orange-500 rounded-lg w-10 h-10 flex items-center justify-center font-bold text-white text-sm">DA</div>
                        <div>
                            <div className="font-bold text-white text-lg leading-tight">Domingos Assessoria</div>
                            <div className="text-gray-400 text-xs">Empresarial</div>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link key={link.to} to={link.to}
                                className={`text-sm font-medium transition-colors px-2 py-1 rounded ${location.pathname === link.to ? 'text-white bg-gray-800' : 'text-gray-300 hover:text-white'
                                    }`}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <a href="http://localhost:5173/planos" target="_blank" rel="noopener noreferrer"
                        className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
                        Solicitar Proposta
                    </a>

                    <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {menuOpen && (
                    <div className="md:hidden bg-black border-t border-gray-800 px-6 py-4 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
                                className={`text-sm font-medium ${location.pathname === link.to ? 'text-orange-500' : 'text-gray-300'}`}>
                                {link.label}
                            </Link>
                        ))}
                        <a href="http://localhost:5173/planos" target="_blank" rel="noopener noreferrer"
                            className="bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-lg text-center text-sm">
                            Solicitar Proposta
                        </a>
                    </div>
                )}
            </header>
        </>
    )
}