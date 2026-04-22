import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react'
import { contactInfo } from '../data/data'

const initialForm = { nome: '', email: '', telefone: '', empresa: '', mensagem: '' }

function validate(form) {
    const errors = {}
    if (!form.nome.trim()) errors.nome = 'Nome é obrigatório'
    if (!form.email.trim()) errors.email = 'E-mail é obrigatório'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'E-mail inválido'
    if (!form.mensagem.trim()) errors.mensagem = 'Mensagem é obrigatória'
    return errors
}

function Field({ label, error, children }) {
    return (
        <div>
            <label className="text-white text-sm font-medium block mb-2">{label}</label>
            {children}
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
    )
}

const inputClass = "w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
const inputErrorClass = "w-full bg-gray-800 border border-red-500 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"

export default function Contato() {
    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})
    const [enviado, setEnviado] = useState(false)

    const handle = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    const submit = (e) => {
        e.preventDefault()
        const erros = validate(form)
        if (Object.keys(erros).length > 0) {
            setErrors(erros)
            return
        }
        setEnviado(true)
    }

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
                                    <a href={contactInfo.phoneTel} className="text-gray-400 hover:text-orange-500 transition-colors">{contactInfo.phone}</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 bg-gray-900 border border-gray-800 rounded-xl p-5">
                                <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
                                    <Mail size={18} className="text-white" />
                                </div>
                                <div>
                                    <div className="text-white font-semibold">E-mail</div>
                                    <a href={`mailto:${contactInfo.email}`} className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                                        {contactInfo.email}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 bg-gray-900 border border-gray-800 rounded-xl p-5">
                                <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
                                    <MapPin size={18} className="text-white" />
                                </div>
                                <div>
                                    <div className="text-white font-semibold">Endereço</div>
                                    <p className="text-gray-400 text-sm">{contactInfo.address}</p>
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
                            <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer"
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5" aria-hidden="true">
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
                                <form onSubmit={submit} className="space-y-5" noValidate>
                                    <Field label="Nome *" error={errors.nome}>
                                        <input name="nome" value={form.nome} onChange={handle} placeholder="Seu nome"
                                            className={errors.nome ? inputErrorClass : inputClass} />
                                    </Field>
                                    <Field label="E-mail *" error={errors.email}>
                                        <input name="email" type="email" value={form.email} onChange={handle} placeholder="seu@email.com"
                                            className={errors.email ? inputErrorClass : inputClass} />
                                    </Field>
                                    <Field label="Telefone" error={errors.telefone}>
                                        <input name="telefone" value={form.telefone} onChange={handle} placeholder="(00) 00000-0000"
                                            className={inputClass} />
                                    </Field>
                                    <Field label="Empresa" error={errors.empresa}>
                                        <input name="empresa" value={form.empresa} onChange={handle} placeholder="Nome da sua empresa"
                                            className={inputClass} />
                                    </Field>
                                    <Field label="Mensagem *" error={errors.mensagem}>
                                        <textarea name="mensagem" value={form.mensagem} onChange={handle} rows={5}
                                            placeholder="Como podemos ajudar sua empresa?"
                                            className={`${errors.mensagem ? inputErrorClass : inputClass} resize-none`} />
                                    </Field>
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
