import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { blogPosts, categories } from '../data/blogData'
import SEOHead from '../components/SEOHead'

export default function Blog() {
    const [search, setSearch] = useState('')
    const [activeCategory, setActiveCategory] = useState('Todos')

    const filtered = blogPosts.filter((p) => {
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase())
        const matchCategory = activeCategory === 'Todos' || p.category === activeCategory
        return matchSearch && matchCategory
    })

    const featured = blogPosts.find(p => p.featured)
    const rest = filtered.filter(p => !p.featured || activeCategory !== 'Todos' || search)

    return (
        <div className="bg-black">
            <SEOHead
                title="Blog"
                description="Dicas, novidades e análises sobre contabilidade, gestão empresarial e legislação, escritos por quem entende do assunto."
                canonicalPath="/blog"
                keywords="blog contabilidade, dicas fiscais, gestão empresarial, legislação tributária"
            />

            {/* ── HERO ── */}
            <section className="pt-36 pb-16 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">
                        Conhecimento gratuito
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
                        <div>
                            <h1
                                className="font-black text-white leading-[0.95] mb-4"
                                style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
                            >
                                Blog e
                                <br />
                                <span className="text-orange-500">Conteúdos</span>
                            </h1>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                Dicas, novidades e análises sobre contabilidade, gestão empresarial
                                e legislação — escritos por quem entende do assunto.
                            </p>
                        </div>

                        {/* Busca */}
                        <div className="relative">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Buscar artigos..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-600 text-white placeholder-zinc-600 rounded-xl py-3.5 pl-11 pr-4 outline-none transition-colors text-sm"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FILTROS ── */}
            <section className="px-6 pb-10 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                                    activeCategory === cat
                                        ? 'bg-orange-500 border-orange-500 text-white'
                                        : 'bg-transparent border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
                                }`}
                            >
                                {cat}
                                {cat !== 'Todos' && (
                                    <span className="ml-1.5 opacity-50">
                                        {blogPosts.filter(p => p.category === cat).length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── POST EM DESTAQUE ── */}
            {featured && activeCategory === 'Todos' && !search && (
                <section className="px-6 pb-10 bg-black">
                    <div className="max-w-7xl mx-auto">
                        <Link
                            to={`/blog/${featured.id}`}
                            className="group grid grid-cols-1 md:grid-cols-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300"
                        >
                            {/* Imagem */}
                            <div className="relative overflow-hidden h-64 md:h-auto">
                                <img
                                    src={featured.image}
                                    alt={featured.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    Em destaque
                                </span>
                            </div>

                            {/* Conteúdo */}
                            <div className="p-8 flex flex-col justify-between">
                                <div>
                                    <span className="inline-flex items-center gap-1.5 text-orange-500 text-xs font-bold uppercase tracking-wider mb-4">
                                        <Tag size={11} />
                                        {featured.category}
                                    </span>
                                    <h2 className="text-white font-black text-2xl mb-3 leading-tight">
                                        {featured.title}
                                    </h2>
                                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                        {featured.description}
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-4 text-zinc-600 text-xs mb-6">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={12} /> {featured.date}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock size={12} /> {featured.readTime} de leitura
                                        </span>
                                    </div>

                                    {/* Autor */}
                                    <div className="flex items-center justify-between pt-5 border-t border-zinc-800">
                                        <div className="flex items-center gap-3">
                                            <img src={featured.authorAvatar} alt={featured.author}
                                                className="w-9 h-9 rounded-full object-cover" />
                                            <div>
                                                <div className="text-white text-sm font-semibold">{featured.author}</div>
                                                <div className="text-zinc-500 text-xs">{featured.authorRole}</div>
                                            </div>
                                        </div>
                                        <span className="flex items-center gap-1.5 text-orange-500 text-sm font-semibold group-hover:gap-2.5 transition-all">
                                            Ler artigo <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* ── GRID DE POSTS ── */}
            <section className="px-6 pb-20 bg-black">
                <div className="max-w-7xl mx-auto">

                    {/* Contador */}
                    <div className="flex items-center justify-between mb-8">
                        <p className="text-zinc-500 text-sm">
                            <span className="text-white font-semibold">{filtered.length}</span> artigos encontrados
                        </p>
                        {(activeCategory !== 'Todos' || search) && (
                            <button
                                onClick={() => { setActiveCategory('Todos'); setSearch('') }}
                                className="text-zinc-500 hover:text-white text-xs transition-colors"
                            >
                                Limpar filtros ×
                            </button>
                        )}
                    </div>

                    {filtered.length === 0 ? (
                        <div className="text-center py-24">
                            <p className="text-zinc-600 text-lg mb-2">Nenhum artigo encontrado.</p>
                            <button
                                onClick={() => { setActiveCategory('Todos'); setSearch('') }}
                                className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors"
                            >
                                Ver todos os artigos →
                            </button>
                        </div>
                    ) : (
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <AnimatePresence mode="popLayout">
                                {rest.map((post) => (
                                    <motion.div
                                        key={post.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.96 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Link
                                            to={`/blog/${post.id}`}
                                            className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 block"
                                        >
                                            {/* Imagem */}
                                            <div className="overflow-hidden h-48 relative">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>

                                            {/* Conteúdo */}
                                            <div className="p-6 flex flex-col flex-1">
                                                <span className="inline-flex items-center gap-1.5 text-orange-500 text-xs font-bold uppercase tracking-wider mb-3">
                                                    <Tag size={10} />
                                                    {post.category}
                                                </span>
                                                <h3 className="text-white font-bold text-lg mb-2 leading-snug flex-1">
                                                    {post.title}
                                                </h3>
                                                <p className="text-zinc-500 text-sm leading-relaxed mb-4 line-clamp-2">
                                                    {post.description}
                                                </p>

                                                <div className="flex items-center justify-between pt-4 border-t border-zinc-800 mt-auto">
                                                    <div className="flex items-center gap-3">
                                                        <img src={post.authorAvatar} alt={post.author}
                                                            className="w-7 h-7 rounded-full object-cover" />
                                                        <div>
                                                            <div className="text-zinc-300 text-xs font-medium">{post.author}</div>
                                                            <div className="flex items-center gap-2 text-zinc-600 text-xs">
                                                                <Calendar size={10} /> {post.date}
                                                                <span>·</span>
                                                                <Clock size={10} /> {post.readTime}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ArrowRight size={16} className="text-zinc-600 group-hover:text-orange-500 transition-colors" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* ── NEWSLETTER ── */}
            <section className="py-20 px-6 bg-zinc-950 border-t border-zinc-900">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">
                            Newsletter
                        </span>
                        <h2 className="text-3xl font-black text-white mb-3">
                            Receba conteúdos
                            <br />
                            <span className="text-orange-500">exclusivos no e-mail</span>
                        </h2>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Dicas tributárias, novidades legislativas e materiais
                            exclusivos direto na sua caixa de entrada. Sem spam.
                        </p>
                    </div>

                    <form
                        onSubmit={e => { e.preventDefault(); alert('Inscrição realizada!') }}
                        className="flex flex-col sm:flex-row gap-3"
                    >
                        <input
                            type="email"
                            required
                            placeholder="seu@email.com.br"
                            className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-zinc-600 text-white placeholder-zinc-600 rounded-xl px-5 py-3.5 outline-none transition-colors text-sm"
                        />
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-xl transition-colors text-sm whitespace-nowrap"
                        >
                            Quero receber <ArrowRight size={15} />
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}