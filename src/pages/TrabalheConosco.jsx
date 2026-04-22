import { useState, useRef } from 'react'
import { CheckCircle, Upload, X } from 'lucide-react'

const beneficios = [
    { icon: '📈', title: 'Crescimento Profissional', desc: 'Investimos no desenvolvimento contínuo de todos os colaboradores.' },
    { icon: '🤝', title: 'Ambiente Colaborativo', desc: 'Uma equipe unida que trabalha com propósito e respeito mútuo.' },
    { icon: '💰', title: 'Benefícios Atrativos', desc: 'Remuneração competitiva e benefícios que valorizam seu trabalho.' },
]

const areas = ['Contabilidade', 'Departamento Pessoal', 'Fiscal/Tributário', 'Consultoria Empresarial', 'Tecnologia da Informação', 'Administrativo', 'Comercial']
const niveis = ['Estagiário', 'Júnior', 'Pleno', 'Sênior', 'Especialista']
const formacoes = ['Sim, tenho formação na área', 'Estou cursando', 'Não tenho formação específica']
const disponibilidades = ['Imediata', 'Em 15 dias', 'Em 30 dias', 'Em mais de 30 dias']

const initialForm = { nome: '', email: '', telefone: '', area: '', nivel: '', formacao: '', disponibilidade: '', motivacao: '' }

function validate(form, arquivo) {
    const errors = {}
    if (!form.nome.trim()) errors.nome = 'Nome é obrigatório'
    if (!form.email.trim()) errors.email = 'E-mail é obrigatório'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'E-mail inválido'
    if (!form.telefone.trim()) errors.telefone = 'Telefone é obrigatório'
    if (!form.area) errors.area = 'Selecione uma área'
    if (!form.nivel) errors.nivel = 'Selecione o nível'
    if (!form.formacao) errors.formacao = 'Selecione uma opção'
    if (!form.disponibilidade) errors.disponibilidade = 'Selecione a disponibilidade'
    if (!form.motivacao.trim()) errors.motivacao = 'Campo obrigatório'
    if (!arquivo) errors.arquivo = 'Anexe seu currículo'
    return errors
}

const inputClass = "w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
const inputErrorClass = "w-full bg-gray-800 border border-red-500 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"

function Field({ label, error, children }) {
    return (
        <div>
            <label className="text-white text-sm font-medium block mb-2">{label}</label>
            {children}
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
    )
}

export default function TrabalheConosco() {
    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})
    const [arquivo, setArquivo] = useState(null)
    const [enviado, setEnviado] = useState(false)
    const fileRef = useRef(null)

    const handle = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    const handleFile = (e) => {
        const file = e.target.files[0]
        if (!file) return
        if (file.size > 5 * 1024 * 1024) {
            setErrors((prev) => ({ ...prev, arquivo: 'Arquivo muito grande. Máximo 5MB.' }))
            return
        }
        setArquivo(file)
        setErrors((prev) => ({ ...prev, arquivo: undefined }))
    }

    const submit = (e) => {
        e.preventDefault()
        const erros = validate(form, arquivo)
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
                    <div className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center text-4xl mx-auto mb-6">💼</div>
                    <h1 className="text-5xl font-black text-white mb-6">Trabalhe Conosco</h1>
                    <p className="text-gray-300 text-lg">
                        Faça parte de uma equipe multidisciplinar de profissionais apaixonados por entregar
                        resultados excepcionais. Venha crescer com a gente!
                    </p>
                </div>
            </section>

            <section className="py-16 px-6 bg-gray-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-black text-white mb-3">Por Que Trabalhar Conosco?</h2>
                        <p className="text-gray-400">Veja o que oferecemos aos nossos colaboradores</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {beneficios.map((b) => (
                            <div key={b.title} className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                                <div className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center text-2xl mb-5">{b.icon}</div>
                                <h3 className="text-white font-bold text-lg mb-3">{b.title}</h3>
                                <p className="text-gray-400 text-sm">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-black">
                <div className="max-w-2xl mx-auto">
                    {enviado ? (
                        <div className="text-center py-16">
                            <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
                            <h2 className="text-3xl font-black text-white mb-4">Candidatura Enviada!</h2>
                            <p className="text-gray-400 text-lg">Recebemos seu currículo. Entraremos em contato em breve. Obrigado pelo interesse!</p>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-3xl font-black text-white mb-8 text-center">Formulário de Candidatura</h2>
                            <form onSubmit={submit} noValidate className="bg-gray-900 border border-gray-800 rounded-xl p-8 space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <Field label="Nome Completo *" error={errors.nome}>
                                        <input name="nome" value={form.nome} onChange={handle} placeholder="Seu nome completo"
                                            className={errors.nome ? inputErrorClass : inputClass} />
                                    </Field>
                                    <Field label="E-mail *" error={errors.email}>
                                        <input name="email" type="email" value={form.email} onChange={handle} placeholder="seu@email.com"
                                            className={errors.email ? inputErrorClass : inputClass} />
                                    </Field>
                                </div>

                                <Field label="Telefone *" error={errors.telefone}>
                                    <input name="telefone" value={form.telefone} onChange={handle} placeholder="(00) 00000-0000"
                                        className={errors.telefone ? inputErrorClass : inputClass} />
                                </Field>

                                <Field label="Área de atuação *" error={errors.area}>
                                    <select name="area" value={form.area} onChange={handle}
                                        className={errors.area ? inputErrorClass : inputClass}>
                                        <option value="">Selecione uma opção</option>
                                        {areas.map((a) => <option key={a} value={a}>{a}</option>)}
                                    </select>
                                </Field>

                                <Field label="Nível de experiência *" error={errors.nivel}>
                                    <select name="nivel" value={form.nivel} onChange={handle}
                                        className={errors.nivel ? inputErrorClass : inputClass}>
                                        <option value="">Selecione uma opção</option>
                                        {niveis.map((n) => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                </Field>

                                <Field label="Formação na área *" error={errors.formacao}>
                                    <select name="formacao" value={form.formacao} onChange={handle}
                                        className={errors.formacao ? inputErrorClass : inputClass}>
                                        <option value="">Selecione uma opção</option>
                                        {formacoes.map((f) => <option key={f} value={f}>{f}</option>)}
                                    </select>
                                </Field>

                                <Field label="Disponibilidade para início *" error={errors.disponibilidade}>
                                    <select name="disponibilidade" value={form.disponibilidade} onChange={handle}
                                        className={errors.disponibilidade ? inputErrorClass : inputClass}>
                                        <option value="">Selecione uma opção</option>
                                        {disponibilidades.map((d) => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </Field>

                                <Field label="Por que você quer trabalhar conosco? *" error={errors.motivacao}>
                                    <textarea name="motivacao" value={form.motivacao} onChange={handle} rows={4}
                                        placeholder="Conte-nos suas motivações..."
                                        className={`${errors.motivacao ? inputErrorClass : inputClass} resize-none`} />
                                </Field>

                                <Field label="Currículo (PDF ou Word) *" error={errors.arquivo}>
                                    <input
                                        ref={fileRef}
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        className="hidden"
                                        onChange={handleFile}
                                    />
                                    {arquivo ? (
                                        <div className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
                                            <span className="text-white text-sm truncate">{arquivo.name}</span>
                                            <button type="button" onClick={() => { setArquivo(null); fileRef.current.value = '' }}
                                                className="text-gray-400 hover:text-red-400 transition-colors ml-2 shrink-0">
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <button type="button" onClick={() => fileRef.current.click()}
                                            className={`w-full border-2 border-dashed ${errors.arquivo ? 'border-red-500' : 'border-gray-700 hover:border-orange-500'} rounded-lg p-8 text-center transition-colors cursor-pointer`}>
                                            <Upload size={32} className="text-gray-400 mx-auto mb-3" />
                                            <p className="text-gray-400 text-sm">Clique para selecionar ou arraste o arquivo</p>
                                            <p className="text-gray-500 text-xs mt-1">PDF ou Word, máximo 5MB</p>
                                        </button>
                                    )}
                                </Field>

                                <button type="submit"
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-colors text-lg">
                                    Enviar Candidatura
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </section>
        </>
    )
}
