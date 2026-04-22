import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { navLinks, contactInfo } from '../data/data'

const socialLinks = [
    { href: 'https://instagram.com/domingosassessoria', label: 'Instagram', svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg> },
    { href: 'https://facebook.com/domingosassessoria', label: 'Facebook', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg> },
    { href: 'https://youtube.com/domingosassessoria', label: 'YouTube', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" /></svg> },
    { href: 'https://linkedin.com/company/domingosassessoria', label: 'LinkedIn', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg> },
]

const footerServices = [
    { id: 'assessoria-contabil', label: 'Assessoria Contábil' },
    { id: 'assessoria-fiscal', label: 'Assessoria Fiscal' },
    { id: 'consultoria-empresarial', label: 'Consultoria Empresarial' },
    { id: 'assessoria-dp-pessoal', label: 'Departamento Pessoal' },
]

export default function Footer() {
    return (
        <footer className="bg-black border-t border-gray-800 pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
                    <div>
                        <Link to="/" className="flex items-center gap-3 mb-4">
                            <div className="bg-orange-500 rounded-lg w-10 h-10 flex items-center justify-center font-bold text-white text-sm">DA</div>
                            <div>
                                <div className="font-bold text-white leading-tight">Domingos Assessoria</div>
                                <div className="text-gray-400 text-xs">Empresarial</div>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm mb-4">Contabilidade para sua empresa pagar menos impostos e lucrar mais!</p>
                        <div className="flex items-start gap-2 text-gray-400 text-sm">
                            <MapPin size={16} className="mt-0.5 shrink-0 text-orange-500" />
                            <span>{contactInfo.address}</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Links Rápidos</h4>
                        <ul className="space-y-2">
                            {navLinks.map((l) => (
                                <li key={l.to}><Link to={l.to} className="text-gray-400 hover:text-white text-sm transition-colors">{l.label}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Serviços</h4>
                        <ul className="space-y-2">
                            {footerServices.map((s) => (
                                <li key={s.id}><Link to={`/servicos/${s.id}`} className="text-gray-400 hover:text-white text-sm transition-colors">{s.label}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Contato</h4>
                        <ul className="space-y-3 mb-4">
                            <li>
                                <a href={contactInfo.phoneTel} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                                    <Phone size={16} className="text-orange-500" /> {contactInfo.phone}
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                                    <Mail size={16} className="text-orange-500" /> {contactInfo.email}
                                </a>
                            </li>
                        </ul>
                        <div className="flex gap-3">
                            {socialLinks.map(({ href, label, svg }) => (
                                <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                                    className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                                    {svg}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">© 2026 Domingos Assessoria Empresarial. Todos os direitos reservados.</p>
                    <div className="flex gap-4">
                        <Link to="/politica-privacidade" className="text-gray-500 hover:text-white text-sm transition-colors">Política de Privacidade</Link>
                        <Link to="/termos-uso" className="text-gray-500 hover:text-white text-sm transition-colors">Termos de Uso</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
