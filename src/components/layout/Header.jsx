import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronRight, Phone } from 'lucide-react'
import logo from "../../assets/logo_domingos_transparente.png"
import WhatsAppIcon from '../icons/WhatsAppIcon'
import { buildWhatsAppLink, getWhatsAppMessageForPath } from '../../utils/whatsapp'

const navLinks = [
    { to: '/', label: 'Início' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/servicos', label: 'Serviços' },
//    { to: '/blog', label: 'Blog' },
//    { to: '/trabalhe-conosco', label: 'Trabalhe Conosco' },
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
            <header className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-8 lg:px-10 transition-all duration-700 ease-in-out ${headerBg} ${
                visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            }`}>
                <div className="max-w-6xl mx-auto h-20 flex items-center justify-between gap-8">

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
                            href="https://onvio.com.br/login/#/"
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
                    <div className="border-t border-zinc-800 py-4 flex flex-col gap-1">
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
                                <a href={buildWhatsAppLink(getWhatsAppMessageForPath(location.pathname))} target="_blank" rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 px-3 py-2.5 rounded-lg text-xs transition-colors">
                                    <WhatsAppIcon className="w-3.5 h-3.5" />
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
