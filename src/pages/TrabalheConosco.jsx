import { useState } from 'react'
import { CheckCircle, Upload } from 'lucide-react'

const beneficios = [
    { icon: '📈', title: 'Crescimento Profissional', desc: 'Investimos no desenvolvimento contínuo de todos os colaboradores.' },
    { icon: '🤝', title: 'Ambiente Colaborativo', desc: 'Uma equipe unida que trabalha com propósito e respeito mútuo.' },
    { icon: '💰', title: 'Benefícios Atrativos', desc: 'Remuneração competitiva e benefícios que valorizam seu trabalho.' },
]

const areas = ['Contabilidade', 'Departamento Pessoal', 'Fiscal/Tributário', 'Consultoria Empresarial', 'Tecnologia da Informação', 'Administrativo', 'Comercial']
const niveis = ['Estagiário', 'Júnior', 'Pleno', 'Sênior', 'Especialista']
const formacoes = ['Sim, tenho formação na área', 'Estou cursando', 'Não tenho formação específica']
const disponibilidades = ['Imediata', 'Em 15 dias', 'Em 30 dias', 'Em mais de 30 dias']

export default function TrabalheConosco() {
    const [form, setForm] = useState({ nome: '', email: '', telefone: '', area: '', nivel: '', formacao: '', disponibilidade: '', motivacao: '' })
    const [enviado, setEnviado] = useState(false)

    const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    const submit = (e) => { e.preventDefault(); setEnviado(true) }

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
                            <form onSubmit={submit} className="bg-gray-900 border border-gray-800 rounded-xl p-8 space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="text-white text-sm font-medium block mb-2">Nome Completo *</label>
                                        <input name="nome" required value={form.nome} onChange={handle} placeholder="Seu nome completo"
                                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="text-white text-sm font-medium block mb-2">E-mail *</label>
                                        <input name="email" type="email" required value={form.email} onChange={handle} placeholder="seu@email.com"
                                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-white text-sm font-medium block mb-2">Telefone *</label>
                                    <input name="telefone" required value={form.telefone} onChange={handle} placeholder="(00) 00000-0000"
                                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors" />
                                </div>

                                <div>
                                    <label className="text-white text-sm font-medium block mb-2">Qual área de atuação você tem interesse? *</label>
                                    <select name="area" required value={form.area} onChange={handle}
                                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors">
                                        <option value="">Selecione uma opção</option>
                                        {areas.map((a) => <option key={a} value={a}>{a}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-white text-sm font-medium block mb-2">Qual seu nível de experiência? *</label>
                                    <select name="nivel" required value={form.nivel} onChange={handle}
                                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors">
                                        <option value="">Selecione uma opção</option>
                                        {niveis.map((n) => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-white text-sm font-medium block mb-2">Você possui formação na área? *</label>
                                    <select name="formacao" required value={form.formacao} onChange={handle}
                                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors">
                                        <option value="">Selecione uma opção</option>
                                        {formacoes.map((f) => <option key={f} value={f}>{f}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-white text-sm font-medium block mb-2">Disponibilidade para início: *</label>
                                    <select name="disponibilidade" required value={form.disponibilidade} onChange={handle}
                                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors">
                                        <option value="">Selecione uma opção</option>
                                        {disponibilidades.map((d) => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-white text-sm font-medium block mb-2">Por que você quer trabalhar conosco? *</label>
                                    <textarea name="motivacao" required value={form.motivacao} onChange={handle} rows={4}
                                        placeholder="Conte-nos suas motivações..."
                                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors resize-none" />
                                </div>

                                <div>
                                    <label className="text-white text-sm font-medium block mb-2">Currículo (PDF ou Word) *</label>
                                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-orange-500 transition-colors cursor-pointer">
                                        <Upload size={32} className="text-gray-400 mx-auto mb-3" />
                                        <p className="text-gray-400 text-sm">Clique para selecionar ou arraste o arquivo</p>
                                        <p className="text-gray-500 text-xs mt-1">PDF ou Word, máximo 5MB</p>
                                    </div>
                                </div>

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