import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react'
import { blogPosts } from '../data/data'

const categories = ['Todos', 'Tributário', 'Planejamento Tributário', 'Departamento Pessoal']

export default function Blog() {
    const [search, setSearch] = useState('')
    const [activeCategory, setActiveCategory] = useState('Todos')

    const filtered = blogPosts.filter((p) => {
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase())
        const matchCategory = activeCategory === 'Todos' || p.category === activeCategory
        return matchSearch && matchCategory
    })

    return (
        <>
            <section className="py-20 px-6 bg-black text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-black text-white mb-4">Blog</h1>
                    <p className="text-gray-300 text-lg mb-8">
                        Fique por dentro das últimas notícias, atualizações e dicas sobre contabilidade,
                        gestão empresarial e legislação.
                    </p>
                    <div className="relative max-w-lg mx-auto">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Buscar artigos..." value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-orange-500 transition-colors" />
                    </div>
                </div>
            </section>

            <section className="px-6 pb-8 bg-black">
                <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center">
                    {categories.map((cat) => (
                        <button key={cat} onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors border ${activeCategory === cat
                                    ? 'bg-orange-500 border-orange-500 text-white'
                                    : 'border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500'
                                }`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            <section className="py-16 px-6 bg-gray-950">
                <div className="max-w-7xl mx-auto">
                    {filtered.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            <p className="text-xl">Nenhum artigo encontrado.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {filtered.map((post) => (
                                <div key={post.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden group">
                                    <img src={post.image} alt={post.title}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                                    <div className="p-6">
                                        <span className="text-orange-500 text-xs font-bold uppercase tracking-wider">{post.category}</span>
                                        <h3 className="text-white font-bold text-lg mt-2 mb-3 leading-snug">{post.title}</h3>
                                        <p className="text-gray-400 text-sm mb-4">{post.description}</p>
                                        <div className="flex items-center gap-4 text-gray-500 text-xs mb-4">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                                            <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                                        </div>
                                        <button className="text-orange-500 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                                            Ler mais <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="py-20 px-6 bg-orange-500 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl font-black text-white mb-4">Receba Conteúdos Exclusivos</h2>
                    <p className="text-orange-100 text-lg mb-8">
                        Cadastre-se em nossa newsletter e receba dicas, novidades e materiais exclusivos direto no seu e-mail.
                    </p>
                    <Link to="/contato"
                        className="bg-white text-orange-500 hover:bg-orange-50 font-bold px-8 py-4 rounded-lg transition-colors inline-block">
                        Quero me Cadastrar
                    </Link>
                </div>
            </section>
        </>
    )
}