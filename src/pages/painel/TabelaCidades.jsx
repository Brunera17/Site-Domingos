import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Search } from "lucide-react";
import { distanciaKm } from "./geo";

const fmt = new Intl.NumberFormat("pt-BR");

const COLUNAS = [
    { id: "nome", rotulo: "Cidade", alinhar: "left" },
    { id: "visitas", rotulo: "Visitas", alinhar: "right" },
    { id: "contatos", rotulo: "Contatos", alinhar: "right" },
    { id: "taxa", rotulo: "Taxa de contato", alinhar: "right" },
    { id: "km", rotulo: "Distância", alinhar: "right" },
    { id: "origem", rotulo: "Origem principal", alinhar: "left" },
];

const POR_PAGINA = 25;

// Remove acento pra busca: "sao paulo" encontra "São Paulo".
const normalizar = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function TabelaCidades({ cidades, escritorio, filtroUf }) {
    const [busca, setBusca] = useState("");
    const [ordem, setOrdem] = useState({ coluna: "visitas", desc: true });
    const [limite, setLimite] = useState(POR_PAGINA);

    const linhas = useMemo(() => {
        const termo = normalizar(busca.trim());
        const lista = (cidades || [])
            .filter((c) => !filtroUf || c.nome.endsWith(` - ${filtroUf}`))
            .filter((c) => !termo || normalizar(c.nome).includes(termo))
            .map((c) => ({
                ...c,
                taxa: c.visitas ? (c.contatos / c.visitas) * 100 : null,
                km: c.lat !== undefined && escritorio ? Math.round(distanciaKm(escritorio, c)) : null,
            }));
        const { coluna, desc } = ordem;
        return lista.sort((a, b) => {
            const va = a[coluna];
            const vb = b[coluna];
            // Vazios sempre no fim, em qualquer direção.
            if (va === null || va === undefined) return 1;
            if (vb === null || vb === undefined) return -1;
            const r = typeof va === "string" ? va.localeCompare(vb, "pt-BR") : va - vb;
            return desc ? -r : r;
        });
    }, [cidades, busca, ordem, escritorio, filtroUf]);

    function ordenar(coluna) {
        setOrdem((o) => ({ coluna, desc: o.coluna === coluna ? !o.desc : coluna !== "nome" && coluna !== "km" }));
    }

    return (
        <div>
            <label className="relative block max-w-xs mb-4">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                    type="search"
                    value={busca}
                    onChange={(e) => {
                        setBusca(e.target.value);
                        setLimite(POR_PAGINA);
                    }}
                    placeholder="Buscar cidade"
                    aria-label="Buscar cidade"
                    className="w-full rounded-lg bg-zinc-800 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500"
                />
            </label>

            {linhas.length === 0 ? (
                <p className="text-sm text-zinc-400">Nenhuma cidade encontrada.</p>
            ) : (
                <div className="overflow-x-auto -mx-5 px-5">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-zinc-800 text-zinc-400">
                                {COLUNAS.map((c) => (
                                    <th
                                        key={c.id}
                                        className={`py-2 px-2 first:pl-0 font-medium whitespace-nowrap ${c.alinhar === "right" ? "text-right" : "text-left"}`}
                                        aria-sort={ordem.coluna === c.id ? (ordem.desc ? "descending" : "ascending") : undefined}
                                    >
                                        <button onClick={() => ordenar(c.id)} className="inline-flex items-center gap-1 hover:text-white">
                                            {c.rotulo}
                                            {ordem.coluna === c.id && (ordem.desc ? <ArrowDown size={12} /> : <ArrowUp size={12} />)}
                                        </button>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {linhas.slice(0, limite).map((c) => (
                                <tr key={c.nome} className="border-b border-zinc-800/60">
                                    <td className="py-2 pr-2 whitespace-nowrap">{c.nome}</td>
                                    <td className="py-2 px-2 text-right tabular-nums">{fmt.format(c.visitas)}</td>
                                    <td className="py-2 px-2 text-right tabular-nums">{fmt.format(c.contatos)}</td>
                                    <td className="py-2 px-2 text-right tabular-nums">
                                        {c.taxa === null ? "—" : `${c.taxa.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`}
                                    </td>
                                    <td className="py-2 px-2 text-right tabular-nums whitespace-nowrap">
                                        {c.km === null ? "—" : `${fmt.format(c.km)} km`}
                                    </td>
                                    <td className="py-2 px-2 whitespace-nowrap text-zinc-300">{c.origem || "—"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {linhas.length > limite && (
                <button onClick={() => setLimite((l) => l + POR_PAGINA)} className="mt-4 text-sm text-amber-400 hover:text-amber-300">
                    Mostrar mais ({fmt.format(linhas.length - limite)} restantes)
                </button>
            )}
        </div>
    );
}
