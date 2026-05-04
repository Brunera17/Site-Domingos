import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react'
import logo from "../assets/logo_domingos_transparente.png"

const socialLinks = [
    {
        href: 'https://instagram.com/domingosempresarial',
        label: 'Instagram',
        svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg>
    },
    {
        href: 'https://facebook.com/domingosempresarial',
        label: 'Facebook',
        svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
    },
    {
        href: 'https://linkedin.com/company/domingosempresarial',
        label: 'LinkedIn',
        svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
    },
]

const quickLinks = [
    { to: '/', label: 'Início' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/servicos', label: 'Serviços' },
    { to: '/blog', label: 'Blog' },
    { to: '/trabalhe-conosco', label: 'Trabalhe Conosco' },
    { to: '/contato', label: 'Contato' },
]

const serviceLinks = [
    { id: 'assessoria-contabil', label: 'Assessoria Contábil' },
    { id: 'assessoria-fiscal', label: 'Assessoria Fiscal' },
    { id: 'consultoria-empresarial', label: 'Consultoria Empresarial' },
    { id: 'assessoria-dp-pessoal', label: 'Departamento Pessoal' },
    { id: 'bpo-financeiro', label: 'BPO Financeiro' },
    { id: 'abertura-regularizacao-empresas', label: 'Abertura de Empresas' },
]

export default function Footer() {
    return (
        <footer className="bg-zinc-950 border-t border-zinc-800/60">

            {/* Corpo principal */}
            <div className="max-w-7xl mx-auto px-6 pt-12 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

                    {/* Coluna da logo — mais larga */}
                    <div className="md:col-span-4">
                        <Link to="/" className="inline-block mb-5">
                            <img
                                src={logo}
                                alt="Domingos Assessoria Empresarial"
                                className="h-20 w-auto object-contain brightness-0 invert"
                            />
                        </Link>

                        <p className="text-zinc-400 text-sm leading-relaxed mb-5 max-w-xs">
                            Hub completo de soluções empresariais com atendimento humanizado,
                            ágil e de excelência. Mais de 10 anos transformando negócios.
                        </p>

                        {/* Endereço */}
                        <div className="flex items-start gap-2.5 text-zinc-500 text-xs mb-6">
                            <MapPin size={14} className="mt-0.5 shrink-0 text-orange-500" />
                            <span>Av. Antônio Justino Viera, 350 — Jardim Planalto,<br />Itaí - SP, 18730-136</span>
                        </div>

                        {/* Redes sociais */}
                        <div className="flex gap-2">
                            {socialLinks.map(({ href, label, svg }) => (
                                <a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-orange-500 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200"
                                >
                                    {svg}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Rápidos */}
                    <div className="md:col-span-2">
                        <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                            Navegação
                        </h4>
                        <ul className="space-y-2.5">
                            {quickLinks.map((l) => (
                                <li key={l.to}>
                                    <Link
                                        to={l.to}
                                        className="text-zinc-500 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1 group"
                                    >
                                        <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 text-orange-500">›</span>
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Serviços */}
                    <div className="md:col-span-3">
                        <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                            Serviços
                        </h4>
                        <ul className="space-y-2.5">
                            {serviceLinks.map((s) => (
                                <li key={s.id}>
                                    <Link
                                        to={`/servicos/${s.id}`}
                                        className="text-zinc-500 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1 group"
                                    >
                                        <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 text-orange-500">›</span>
                                        {s.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contato */}
                    <div className="md:col-span-3">
                        <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                            Contato
                        </h4>

                        <ul className="space-y-3 mb-6">
                            <li>
                                <a
                                    href="tel:+5514996580459"
                                    className="flex items-center gap-2.5 text-zinc-500 hover:text-white text-sm transition-colors duration-200 group"
                                >
                                    <span className="w-7 h-7 rounded-md bg-zinc-800 group-hover:bg-orange-500 flex items-center justify-center transition-colors duration-200 shrink-0">
                                        <Phone size={13} className="text-orange-500 group-hover:text-white transition-colors" />
                                    </span>
                                    (14) 99658-0459
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:sucessodocliente@domingosassessoria.com.br"
                                    className="flex items-start gap-2.5 text-zinc-500 hover:text-white text-sm transition-colors duration-200 group"
                                >
                                    <span className="w-7 h-7 rounded-md bg-zinc-800 group-hover:bg-orange-500 flex items-center justify-center transition-colors duration-200 shrink-0 mt-0.5">
                                        <Mail size={13} className="text-orange-500 group-hover:text-white transition-colors" />
                                    </span>
                                    sucessodocliente@<br />domingosassessoria.com.br
                                </a>
                            </li>
                        </ul>

                        {/* Horário */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Horário de atendimento</p>
                            <p className="text-zinc-300 text-xs">Seg – Sex: 7h30 às 17h48</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rodapé inferior */}
            <div className="border-t border-zinc-800/60">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
                    <p className="text-zinc-600 text-xs">
                        © 2026 Domingos Assessoria Empresarial. Todos os direitos reservados.
                        <span className="mx-2 text-zinc-700">·</span>
                        CRC Nº 2SP 037.257/O-8
                    </p>
                    <div className="flex gap-5">
                        <Link to="/politica-privacidade" className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">
                            Política de Privacidade
                        </Link>
                        <Link to="/termos-uso" className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">
                            Termos de Uso
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}