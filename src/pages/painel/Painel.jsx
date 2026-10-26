import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import {
    BarChart3, Clock, FileText, LogOut, Map, Menu, MonitorSmartphone,
    MousePointerClick, RefreshCw, Share2, ShieldCheck, X,
} from "lucide-react";
import { Conversoes, Dispositivos, Horarios, Origens, Paginas, Regioes, Seguranca, VisaoGeral } from "./secoes";

const GRUPOS = [
    {
        titulo: "Análise",
        itens: [
            { id: "geral", rotulo: "Visão geral", icone: BarChart3, Componente: VisaoGeral },
            { id: "regioes", rotulo: "Regiões", icone: Map, Componente: Regioes },
            { id: "paginas", rotulo: "Páginas", icone: FileText, Componente: Paginas },
            { id: "origens", rotulo: "Origem do tráfego", icone: Share2, Componente: Origens },
            { id: "dispositivos", rotulo: "Dispositivos", icone: MonitorSmartphone, Componente: Dispositivos },
            { id: "horarios", rotulo: "Horários", icone: Clock, Componente: Horarios },
        ],
    },
    {
        titulo: "Resultados",
        itens: [{ id: "conversoes", rotulo: "Conversões", icone: MousePointerClick, Componente: Conversoes }],
    },
    {
        titulo: "Sistema",
        itens: [{ id: "seguranca", rotulo: "Segurança", icone: ShieldCheck, Componente: Seguranca }],
    },
];
const SECOES = GRUPOS.flatMap((g) => g.itens);

const PERIODOS = [
    { dias: 1, rotulo: "Hoje" },
    { dias: 7, rotulo: "7 dias" },
    { dias: 30, rotulo: "30 dias" },
    { dias: 90, rotulo: "90 dias" },
];

function Login({ aoEntrar }) {
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function entrar(e) {
        e.preventDefault();
        setCarregando(true);
        setErro("");
        try {
            const response = await fetch("/api/painel/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ senha }),
            });
            const json = await response.json().catch(() => ({}));
            if (!response.ok) {
                setErro(json.error || "Não foi possível entrar.");
                return;
            }
            setSenha("");
            aoEntrar();
        } catch {
            setErro("Falha de conexão.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form onSubmit={entrar} className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="text-amber-500" size={22} />
                    <h1 className="text-lg font-semibold">Painel de acessos</h1>
                </div>
                <label className="block text-sm">
                    Senha
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="mt-1 w-full rounded-lg bg-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500"
                        autoComplete="current-password"
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
        </div>
    );
}

function Sidebar({ ativa, aoEscolher, aoSair, aberta, aoFechar }) {
    return (
        <>
            {aberta && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={aoFechar} />}
            <aside
                className={`fixed z-40 inset-y-0 left-0 w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col transition-transform lg:translate-x-0 ${
                    aberta ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-800">
                    <div>
                        <p className="font-semibold leading-tight">Domingos Assessoria</p>
                        <p className="text-xs text-zinc-500">Painel analítico</p>
                    </div>
                    <button onClick={aoFechar} className="lg:hidden p-1 text-zinc-400" aria-label="Fechar menu">
                        <X size={20} />
                    </button>
                </div>
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
                    {GRUPOS.map((grupo) => (
                        <div key={grupo.titulo}>
                            <p className="px-3 mb-2 text-[11px] uppercase tracking-wider text-zinc-500">{grupo.titulo}</p>
                            <ul className="space-y-1">
                                {grupo.itens.map(({ id, rotulo, icone: Icone }) => (
                                    <li key={id}>
                                        <button
                                            onClick={() => aoEscolher(id)}
                                            aria-current={ativa === id ? "page" : undefined}
                                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                                                ativa === id
                                                    ? "bg-amber-500/10 text-amber-400 font-medium"
                                                    : "text-zinc-300 hover:bg-zinc-900"
                                            }`}
                                        >
                                            <Icone size={18} />
                                            {rotulo}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
                <div className="p-3 border-t border-zinc-800">
                    <button
                        onClick={aoSair}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-900"
                    >
                        <LogOut size={18} />
                        Sair
                    </button>
                </div>
            </aside>
        </>
    );
}

export default function Painel() {
    const [params, setParams] = useSearchParams();
    const secao = SECOES.find((s) => s.id === params.get("secao")) || SECOES[0];
    const [estado, setEstado] = useState("verificando"); // verificando | login | pronto
    const [periodo, setPeriodo] = useState(30);
    const [dados, setDados] = useState(null);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [atualizadoEm, setAtualizadoEm] = useState(null);
    const [menuAberto, setMenuAberto] = useState(false);

    const carregar = useCallback(async (dias) => {
        setCarregando(true);
        setErro("");
        try {
            const response = await fetch(`/api/painel/dados?dias=${dias}`, { credentials: "same-origin" });
            const json = await response.json().catch(() => ({}));
            if (response.status === 401) {
                setEstado("login");
                setDados(null);
                return;
            }
            if (!response.ok) {
                setErro(json.error || "Não foi possível carregar os dados.");
                setEstado((e) => (e === "verificando" ? "login" : e));
                return;
            }
            setDados(json);
            setAtualizadoEm(new Date());
            setEstado("pronto");
        } catch {
            setErro("Falha de conexão.");
        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => {
        carregar(periodo);
    }, [carregar, periodo]);

    async function sair() {
        await fetch("/api/painel/logout", { method: "POST" }).catch(() => {});
        setDados(null);
        setEstado("login");
    }

    function escolher(id) {
        setParams({ secao: id });
        setMenuAberto(false);
    }

    const cabecalho = (
        <Helmet>
            <title>Painel de acessos</title>
            <meta name="robots" content="noindex, nofollow" />
        </Helmet>
    );

    if (estado === "verificando") {
        return <div className="min-h-screen bg-black text-zinc-400 flex items-center justify-center">{cabecalho}Carregando…</div>;
    }

    if (estado === "login") {
        return (
            <div className="min-h-screen bg-black text-white">
                {cabecalho}
                <Login aoEntrar={() => carregar(periodo)} />
                {erro && <p className="text-center text-red-400 text-sm -mt-16">{erro}</p>}
            </div>
        );
    }

    const { Componente } = secao;

    return (
        <div className="min-h-screen bg-black text-white">
            {cabecalho}
            <Sidebar ativa={secao.id} aoEscolher={escolher} aoSair={sair} aberta={menuAberto} aoFechar={() => setMenuAberto(false)} />

            <div className="lg:pl-64">
                <header className="sticky top-0 z-20 bg-black/85 backdrop-blur border-b border-zinc-800">
                    <div className="flex flex-wrap items-center gap-3 px-4 sm:px-8 py-3">
                        <button onClick={() => setMenuAberto(true)} className="lg:hidden p-1 -ml-1 text-zinc-300" aria-label="Abrir menu">
                            <Menu size={22} />
                        </button>
                        <h1 className="text-lg font-semibold mr-auto">{secao.rotulo}</h1>
                        <div className="flex items-center gap-1 bg-zinc-900 rounded-full p-1">
                            {PERIODOS.map((p) => (
                                <button
                                    key={p.dias}
                                    onClick={() => setPeriodo(p.dias)}
                                    disabled={carregando}
                                    className={`rounded-full px-3 py-1 text-sm ${
                                        p.dias === periodo ? "bg-amber-500 text-black font-semibold" : "text-zinc-300"
                                    }`}
                                >
                                    {p.rotulo}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => carregar(periodo)}
                            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900"
                            aria-label="Atualizar"
                            title={atualizadoEm ? `Atualizado às ${atualizadoEm.toLocaleTimeString("pt-BR")}` : "Atualizar"}
                        >
                            <RefreshCw size={18} className={carregando ? "animate-spin" : ""} />
                        </button>
                    </div>
                </header>

                <main className="px-4 sm:px-8 py-6 max-w-6xl">
                    {erro && <p className="text-red-400 text-sm mb-4">{erro}</p>}
                    {dados && <Componente dados={dados} />}
                </main>
            </div>
        </div>
    );
}
