import { Building, ShoppingCart, Package, Leaf, Factory, ShoppingBag, Users, Heart } from 'lucide-react'

const sectors = [
    { label: 'Prestadores de Serviços', icon: Building, desc: 'Escritórios, clínicas, consultórios e profissionais liberais' },
    { label: 'Comércio', icon: ShoppingCart, desc: 'Lojas físicas e varejos de todos os segmentos' },
    { label: 'Atacados', icon: Package, desc: 'Distribuidoras e empresas de grande volume' },
    { label: 'Rural', icon: Leaf, desc: 'Produtores rurais, fazendas e agronegócio' },
    { label: 'Indústrias', icon: Factory, desc: 'Manufatura, produção e transformação' },
    { label: 'E-commerce', icon: ShoppingBag, desc: 'Lojas virtuais e marketplaces' },
    { label: 'Associações e Cooperativas', icon: Users, desc: 'Entidades sem fins lucrativos e cooperativas' },
    { label: 'Hospitais', icon: Heart, desc: 'Clínicas, hospitais e operadoras de saúde' },
]

export default function SetoresSection() {
    return (
        <section
            className="px-6 bg-black overflow-hidden md:h-screen py-16 md:py-0"
        >
            <div className="max-w-7xl mx-auto md:h-full flex flex-col md:py-8 gap-8">

                {/* Cabeçalho */}
                <div>
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                        Onde atuamos
                    </span>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                            Setores que <span className="text-orange-500">Atendemos</span>
                        </h2>
                        <p className="text-zinc-500 text-sm max-w-sm text-right">
                            Expertise especializada para cada segmento,<br />
                            com soluções sob medida para o seu negócio.
                        </p>
                    </div>
                </div>

                {/* Grid de setores */}
                <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-min gap-4 flex-1 min-h-0 md:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {sectors.map((sector, i) => {
                        const Icon = sector.icon
                        return (
                            <div
                                key={sector.label}
                                className="group relative bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 rounded-2xl p-5 flex flex-col justify-between cursor-default overflow-hidden transition-all duration-300 hover:bg-zinc-800/60"
                                style={{ animationDelay: `${i * 60}ms` }}
                            >
                                {/* Glow no hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                {/* Número decorativo */}
                                <span className="absolute top-4 right-4 text-zinc-800 group-hover:text-zinc-700 font-black text-2xl transition-colors duration-300 select-none">
                                    {String(i + 1).padStart(2, '0')}
                                </span>

                                <div className="relative z-10">
                                    <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 flex items-center justify-center mb-4 transition-all duration-300">
                                        <Icon size={18} className="text-zinc-400 group-hover:text-orange-500 transition-colors duration-300" />
                                    </div>
                                    <h3 className="text-white font-bold text-sm leading-snug mb-1">
                                        {sector.label}
                                    </h3>
                                    <p className="text-zinc-600 text-xs leading-relaxed group-hover:text-zinc-500 transition-colors duration-300">
                                        {sector.desc}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Rodapé */}
                <div className="flex items-center justify-between shrink-0 pt-4 border-t border-zinc-800/60">
                    <p className="text-zinc-500 text-sm">
                        Não encontrou seu setor?{' '}
                        <a
                            href="https://wa.me/5514996580459"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-500 hover:text-orange-400 font-medium transition-colors"
                        >
                            Fale conosco →
                        </a>
                    </p>
                    <div className="flex items-center gap-2 text-zinc-600 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        Atendemos 14 estados · 80+ cidades
                    </div>
                </div>
            </div>
        </section>
    )
}