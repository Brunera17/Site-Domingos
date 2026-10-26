import { useState } from "react";
import { Helmet } from "react-helmet-async";

const CHAVE_SENHA = "painel-senha";
const PERIODOS = [
    { dias: 1, rotulo: "Hoje" },
    { dias: 7, rotulo: "7 dias" },
    { dias: 30, rotulo: "30 dias" },
    { dias: 90, rotulo: "90 dias" },
];

function lerSenhaSalva() {
    try {
        return sessionStorage.getItem(CHAVE_SENHA) || "";
    } catch {
        return "";
    }
}

function Ranking({ titulo, itens }) {
    const maior = itens[0]?.total || 1;
    return (
        <section className="bg-zinc-900 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">{titulo}</h2>
            {itens.length === 0 ? (
                <p className="text-zinc-400 text-sm">Nenhum acesso no período.</p>
            ) : (
                <ol className="space-y-3">
                    {itens.map((item, i) => (
                        <li key={item.nome}>
                            <div className="flex justify-between text-sm mb-1">
                                <span>
                                    <span className="text-zinc-500 mr-2">{i + 1}.</span>
                                    {item.nome}
                                </span>
                                <span className="font-semibold">{item.total}</span>
                            </div>
                            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-amber-500 rounded-full"
                                    style={{ width: `${(item.total / maior) * 100}%` }}
                                />
                            </div>
                        </li>
                    ))}
                </ol>
            )}
        </section>
    );
}

export default function Painel() {
    const [senha, setSenha] = useState(lerSenhaSalva);
    const [periodo, setPeriodo] = useState(30);
    const [dados, setDados] = useState(null);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function carregar(dias = periodo, senhaAtual = senha) {
        setCarregando(true);
        setErro("");
        try {
            const response = await fetch(`/api/painel?dias=${dias}`, {
                headers: { Authorization: `Bearer ${senhaAtual}` },
            });
            const json = await response.json().catch(() => ({}));
            if (!response.ok) {
                setErro(json.error || "Não foi possível carregar os dados.");
                if (response.status === 401) setDados(null);
                return;
            }
            try {
                sessionStorage.setItem(CHAVE_SENHA, senhaAtual);
            } catch {
                // sem sessionStorage, só não lembra a senha
            }
            setPeriodo(dias);
            setDados(json);
        } catch {
            setErro("Falha de conexão.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="min-h-screen bg-black text-white px-4 py-10">
            <Helmet>
                <title>Painel de acessos</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Acessos por região</h1>

                {!dados ? (
                    <form
                        className="bg-zinc-900 rounded-2xl p-6 max-w-sm space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            carregar();
                        }}
                    >
                        <label className="block text-sm">
                            Senha
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                className="mt-1 w-full rounded-lg bg-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500"
                                autoFocus
                            />
                        </label>
                        <button
                            type="submit"
                            disabled={carregando || !senha}
                            className="w-full rounded-lg bg-amber-500 text-black font-semibold py-2 disabled:opacity-50"
                        >
                            {carregando ? "Entrando..." : "Entrar"}
                        </button>
                        {erro && <p className="text-red-400 text-sm">{erro}</p>}
                    </form>
                ) : (
                    <>
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                            {PERIODOS.map((p) => (
                                <button
                                    key={p.dias}
                                    onClick={() => carregar(p.dias)}
                                    disabled={carregando}
                                    className={`rounded-full px-4 py-1.5 text-sm ${
                                        p.dias === periodo ? "bg-amber-500 text-black font-semibold" : "bg-zinc-800"
                                    }`}
                                >
                                    {p.rotulo}
                                </button>
                            ))}
                            <span className="ml-auto text-zinc-300">
                                Total: <strong className="text-white">{dados.total}</strong> visitas
                            </span>
                        </div>
                        {erro && <p className="text-red-400 text-sm mb-4">{erro}</p>}
                        <div className="grid gap-6 md:grid-cols-2">
                            <Ranking titulo="Estados" itens={dados.estados} />
                            <Ranking titulo="Cidades (top 20)" itens={dados.cidades} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
