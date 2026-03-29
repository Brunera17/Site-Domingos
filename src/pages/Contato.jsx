import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react'

export default function Contato() {
    const [form, setForm] = useState({ nome: '', email: '', telefone: '', empresa: '', mensagem: '' })
    const [enviado, setEnviado] = useState(false)

    const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    const submit = (e) => { e.preventDefault(); setEnviado(true) }

    return (
        <>
            <section className="py-20 px-6 bg-black text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-5xl font-black text-white mb-6">Entre em Contato</h1>
                    <p className="text-gray-300 text-lg">
                        Estamos prontos para atender sua empresa. Fale com nossa equipe e descubra como
                        podemos ajudar seu negócio a crescer.
                    </p>
                </div>
            </section>

            <section className="py-16 px-6 bg-gray-950">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                    <div>
                        <h2 className="text-3xl font-black text-white mb-8">Informações de Contato</h2>
                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-4 bg-gray-900 border border-gray-800 rounded-xl p-5">
                                <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
                                    <Phone size={18} className="text-white" />
                                </div>
                                <div>
                                    <div className="text-white font-semibold">Telefone</div>
                                    <a href="tel:01499658-0459" className="text-gray-400 hover:text-orange-500 transition-colors">014.9.9658-0459</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 bg-gray-900 border border-gray-800 rounded-xl p-5">
                                <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
                                    <Mail size={18} className="text-white" />
                                </div>
                                <div>
                                    <div className="text-white font-semibold">E-mail</div>
                                    <a href="mailto:sucessodocliente@domingosassessoria.com.br" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                                        sucessodocliente@domingosassessoria.com.br
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 bg-gray-900 border border-gray-800 rounded-xl p-5">
                                <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
                                    <MapPin size={18} className="text-white" />
                                </div>
                                <div>
                                    <div className="text-white font-semibold">Endereço</div>
                                    <p className="text-gray-400 text-sm">Av. Antônio Justino Viera, 350 - Jardim Planalto, Itaí - SP, 18730-136</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 bg-gray-900 border border-gray-800 rounded-xl p-5">
                                <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
                                    <Clock size={18} className="text-white" />
                                </div>
                                <div>
                                    <div className="text-white font-semibold">Horário de Atendimento</div>
                                    <p className="text-gray-400 text-sm">Segunda a Sexta: 8h às 18h</p>
                                    <p className="text-gray-400 text-sm">Sábado: 8h às 12h</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                            <p className="text-white font-semibold mb-3">Prefere falar por WhatsApp?</p>
                            <a href="https://wa.me/5514996580459" target="_blank" rel="noopener noreferrer"
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Iniciar Conversa
                            </a>
                        </div>
                    </div>

                    <div>
                        {enviado ? (
                            <div className="text-center py-16">
                                <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
                                <h2 className="text-3xl font-black text-white mb-4">Mensagem Enviada!</h2>
                                <p className="text-gray-400 text-lg">Entraremos em contato em breve. Obrigado!</p>
                            </div>
                        ) : (
                            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                                <h2 className="text-2xl font-black text-white mb-6">Envie sua Mensagem</h2>
                                <form onSubmit={submit} className="space-y-5">
                                    <div>
                                        <label className="text-white text-sm font-medium block mb-2">Nome *</label>
                                        <input name="nome" required value={form.nome} onChange={handle} placeholder="Seu nome"
                                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="text-white text-sm font-medium block mb-2">E-mail *</label>
                                        <input name="email" type="email" required value={form.email} onChange={handle} placeholder="seu@email.com"
                                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="text-white text-sm font-medium block mb-2">Telefone</label>
                                        <input name="telefone" value={form.telefone} onChange={handle} placeholder="(00) 00000-0000"
                                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="text-white text-sm font-medium block mb-2">Empresa</label>
                                        <input name="empresa" value={form.empresa} onChange={handle} placeholder="Nome da sua empresa"
                                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="text-white text-sm font-medium block mb-2">Mensagem *</label>
                                        <textarea name="mensagem" required value={form.mensagem} onChange={handle} rows={5}
                                            placeholder="Como podemos ajudar sua empresa?"
                                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors resize-none" />
                                    </div>
                                    <button type="submit"
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-colors text-lg">
                                        Enviar Mensagem
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}