import SEOHead from '../components/SEOHead'

export default function Proposta() {
    return (
        <div className="bg-[#111] text-white min-h-screen">
            <SEOHead
                title="Proposta de Assessoria"
                description="Proposta comercial personalizada da Domingos Assessoria Empresarial."
                canonicalPath="/proposta"
            />
            {/* HERO */}
            <section className="px-6 py-20 bg-black relative">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

                    <div>
                        <h1 className="text-6xl font-black uppercase leading-none">
                            Proposta de <span className="text-primary italic">Assessoria</span>
                        </h1>

                        <div className="flex gap-3 mt-6 flex-wrap">
                            <span className="bg-card px-3 py-1 rounded-full text-sm">Exclusiva</span>
                            <span className="bg-card px-3 py-1 rounded-full text-sm">30 dias</span>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6">
                        <p className="text-muted text-xs uppercase">Referência</p>
                        <h3 className="text-primary font-bold text-xl">
                            PROP-2026-001
                        </h3>
                        <p className="text-muted text-sm mt-2">
                            Válida por 30 dias
                        </p>
                    </div>
                </div>
            </section>

            {/* DADOS */}
            <section className="max-w-6xl mx-auto px-6 py-10">

                <h2 className="text-3xl font-bold mb-6 uppercase">
                    Dados da Empresa
                </h2>

                <div className="grid md:grid-cols-3 gap-4">

                    <input className="bg-card border border-border p-3 rounded" placeholder="Empresa" />
                    <input className="bg-card border border-border p-3 rounded" placeholder="Cidade" />
                    <input className="bg-card border border-border p-3 rounded" placeholder="CNPJ" />

                </div>
            </section>
        </div>
    );
}