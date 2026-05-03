import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronRight, Phone } from 'lucide-react'
import logo from "../assets/logo_domingos_transparente.png"

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
    const [visible, setVisible] = useState(true)
    const [scrolled, setScrolled] = useState(false)
    const lastScrollY = useRef(0)
    const location = useLocation()
    const isHome = location.pathname === '/'

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY
            setScrolled(currentY > 10)
            if (currentY < 10) {
                setVisible(true)
            } else if (currentY < lastScrollY.current) {
                setVisible(true)
            } else {
                setVisible(false)
                setMenuOpen(false)
            }
            lastScrollY.current = currentY
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Fecha menu ao navegar
    useEffect(() => { setMenuOpen(false) }, [location.pathname])

    const headerBg = 'bg-black/20 backdrop-blur-md'

    return (
        <>
            {/* Header principal */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${headerBg} ${
                visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            }`}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">

                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center">
                        <img
                            src={logo}
                            alt="Domingos Assessoria Empresarial"
                            className="h-14 w-auto object-contain brightness-0 invert"
                        />
                    </Link>

                    {/* Nav central */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.to
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`
                                        relative text-sm font-medium px-3 py-2 rounded-md transition-all duration-200
                                        ${isActive
                                            ? 'text-white'
                                            : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                        }
                                    `}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-orange-500 rounded-full" />
                                    )}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* CTA + Área do Cliente + Hamburguer */}
                    <div className="flex items-center gap-3">
                        <a
                            href="#"
                            className="hidden md:flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm font-medium transition-colors duration-200"
                        >
                            Área do Cliente
                            <ChevronRight size={14} />
                        </a>

                        <div className="hidden md:block w-px h-5 bg-zinc-700" />

                        <Link
                            to="/planos"
                            className="hidden md:flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 text-sm whitespace-nowrap"
                        >
                            Solicitar Proposta
                            <ChevronRight size={14} />
                        </Link>

                        <button
                            className="md:hidden text-zinc-400 hover:text-white p-2 rounded-md hover:bg-zinc-800 transition-colors"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
                        >
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Menu mobile */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="border-t border-zinc-800 px-6 py-4 flex flex-col gap-1">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.to
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`text-sm font-medium px-3 py-2.5 rounded-md transition-colors ${
                                        isActive
                                            ? 'text-orange-500 bg-orange-500/10'
                                            : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}

                        <div className="border-t border-zinc-800 mt-3 pt-3 flex flex-col gap-2">
                            <Link
                                to="/planos"
                                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-3 rounded-lg text-center text-sm transition-colors"
                            >
                                Solicitar Proposta
                            </Link>
                            <div className="flex gap-3">
                                <a href="tel:+5514996580459"
                                    className="flex-1 flex items-center justify-center gap-2 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 px-3 py-2.5 rounded-lg text-xs transition-colors">
                                    <Phone size={14} /> Ligar
                                </a>
                                <a href="https://wa.me/5514996580459" target="_blank" rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 px-3 py-2.5 rounded-lg text-xs transition-colors">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}