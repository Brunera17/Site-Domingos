import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, Share2 } from 'lucide-react'
import { blogPosts } from '../data/blogData'
import { buildWhatsAppLink } from '../utils/whatsapp'
import SEOHead from '../components/seo/SEOHead'

export default function BlogPost() {
    const { id } = useParams()
    const post = blogPosts.find(p => p.id === id)

    if (!post) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 text-white">
                <h2 className="text-2xl font-black">Artigo não encontrado</h2>
                <Link to="/blog" className="text-orange-500 hover:text-orange-400 flex items-center gap-2 transition-colors">
                    <ArrowLeft size={16} /> Voltar ao Blog
                </Link>
            </div>
        )
    }

    const related = blogPosts
        .filter(p => p.id !== post.id && p.category === post.category)
        .slice(0, 3)

    const otherRelated = related.length < 3
        ? [...related, ...blogPosts.filter(p => p.id !== post.id && p.category !== post.category)]
            .slice(0, 3)
        : related

    // Renderiza markdown simples (## = h2, ### = h3, \n = parágrafo)
    const renderContent = (content) => {
        return content.split('\n\n').map((block, i) => {
            if (block.startsWith('## ')) {
                return <h2 key={i} className="text-white font-black text-2xl mt-10 mb-4">{block.replace('## ', '')}</h2>
            }
            if (block.startsWith('### ')) {
                return <h3 key={i} className="text-h3 text-white mt-8 mb-3">{block.replace('### ', '')}</h3>
            }
            if (block.startsWith('- ')) {
                const items = block.split('\n').filter(l => l.startsWith('- '))
                return (
                    <ul key={i} className="space-y-2 my-4">
                        {items.map((item, j) => (
                            <li key={j} className="flex items-start gap-3 text-zinc-400 text-base">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                                {item.replace('- ', '')}
                            </li>
                        ))}
                    </ul>
                )
            }
            if (block.match(/^\d+\./)) {
                const items = block.split('\n').filter(l => l.match(/^\d+\./))
                return (
                    <ol key={i} className="space-y-2 my-4">
                        {items.map((item, j) => (
                            <li key={j} className="flex items-start gap-3 text-zinc-400 text-base">
                                <span className="text-orange-500 font-bold shrink-0">{j + 1}.</span>
                                {item.replace(/^\d+\.\s/, '')}
                            </li>
                        ))}
                    </ol>
                )
            }
            return <p key={i} className="text-zinc-400 text-base leading-relaxed my-4">{block}</p>
        })
    }

    return (
        <div className="bg-black">
            <SEOHead
                title={post.title}
                description={post.description}
                canonicalPath={`/blog/${post.id}`}
                keywords={`${post.category}, blog, contabilidade, domingos assessoria`}
                ogImage={post.image}
                noIndex
            />

            {/* ── HERO DO ARTIGO ── */}
            <section className="relative overflow-hidden" style={{ height: '50vh', minHeight: '380px' }}>
                <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

                <div className="absolute bottom-0 left-0 right-0 px-6 md:px-8 lg:px-10 pb-10">
                    <div className="max-w-4xl mx-auto">
                        <Link to="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm mb-6 transition-colors">
                            <ArrowLeft size={16} /> Voltar ao Blog
                        </Link>
                        <span className="inline-flex items-center gap-1.5 text-orange-500 text-xs font-bold uppercase tracking-wider mb-3 block">
                            <Tag size={11} /> {post.category}
                        </span>
                        <h1 className="text-white font-black text-2xl md:text-3xl leading-tight max-w-3xl">
                            {post.title}
                        </h1>
                    </div>
                </div>
            </section>

            {/* ── CONTEÚDO ── */}
            <section className="px-6 md:px-8 lg:px-10 py-16 bg-black">
                <div className="max-w-4xl mx-auto">

                    {/* Meta */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-zinc-900">
                        <div className="flex items-center gap-4">
                            <img src={post.authorAvatar} alt={post.author}
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-500/30" />
                            <div>
                                <div className="text-white font-semibold">{post.author}</div>
                                <div className="text-zinc-400 text-sm">{post.authorRole}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 text-zinc-400 text-sm">
                            <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                            <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime} de leitura</span>
                            <button
                                onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
                                className="flex items-center gap-1.5 hover:text-white transition-colors"
                            >
                                <Share2 size={14} /> Compartilhar
                            </button>
                        </div>
                    </div>

                    {/* Descrição em destaque */}
                    <p className="text-zinc-300 text-xl leading-relaxed mb-10 pb-10 border-b border-zinc-900 font-medium">
                        {post.description}
                    </p>

                    {/* Corpo do artigo */}
                    <article className="prose prose-invert max-w-none">
                        {renderContent(post.content)}
                    </article>

                    {/* CTA inline */}
                    <div className="mt-16 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-card-title text-white mb-2">Precisa de ajuda com isso?</h3>
                            <p className="text-zinc-400 text-sm">Nosso time está pronto para orientar sua empresa.</p>
                        </div>
                        <a
                            href={buildWhatsAppLink(`Olá! Li o artigo "${post.title}" no blog e gostaria de saber mais sobre esse assunto.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm whitespace-nowrap shrink-0"
                        >
                            Falar com especialista <ArrowRight size={15} />
                        </a>
                    </div>
                </div>
            </section>

            {/* ── ARTIGOS RELACIONADOS ── */}
            {otherRelated.length > 0 && (
                <section className="px-6 md:px-8 lg:px-10 py-16 bg-zinc-950 border-t border-zinc-900">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-black text-white mb-8">
                            Artigos <span className="text-orange-500">relacionados</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {otherRelated.map((p) => (
                                <Link
                                    key={p.id}
                                    to={`/blog/${p.id}`}
                                    className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300 block"
                                >
                                    <div className="overflow-hidden h-40">
                                        <img src={p.image} alt={p.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-5">
                                        <span className="text-orange-500 text-xs font-bold uppercase tracking-wider">{p.category}</span>
                                        <h3 className="text-card-title text-white mt-2 mb-2 leading-snug">{p.title}</h3>
                                        <div className="flex items-center gap-3 text-zinc-400 text-xs">
                                            <Calendar size={11} /> {p.date}
                                            <Clock size={11} /> {p.readTime}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}