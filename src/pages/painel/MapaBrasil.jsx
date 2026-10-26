import { useMemo, useState } from "react";
import brasil from "@svg-maps/brazil";

// Escala sequencial de uma cor só (âmbar), do mais escuro (pouco) ao mais
// claro (muito) — no fundo escuro do painel, mais claro = mais destaque.
const CORES = ["#78350f", "#b45309", "#d97706", "#f59e0b", "#fcd34d"];
const SEM_DADOS = "#27272a";

// Raiz quadrada: com SP concentrando a maioria das visitas, uma escala
// linear deixaria todos os outros estados na mesma cor.
function faixa(valor, maior) {
    if (!valor) return -1;
    return Math.min(CORES.length - 1, Math.ceil(Math.sqrt(valor / maior) * CORES.length) - 1);
}

function limiteDaFaixa(i, maior) {
    return Math.max(1, Math.round(maior * (i / CORES.length) ** 2));
}

const fmt = new Intl.NumberFormat("pt-BR");

export default function MapaBrasil({ itens, unidade = "visitas" }) {
    const [foco, setFoco] = useState(null); // { uf, x, y }

    const { porUf, maior, total } = useMemo(() => {
        const porUf = {};
        let total = 0;
        for (const { nome, total: n } of itens || []) {
            total += n;
            if (/^[A-Z]{2}$/.test(nome)) porUf[nome.toLowerCase()] = n;
        }
        return { porUf, total, maior: Math.max(1, ...Object.values(porUf)) };
    }, [itens]);

    const estadoEmFoco = foco && brasil.locations.find((l) => l.id === foco.uf);
    const valorEmFoco = foco ? porUf[foco.uf] || 0 : 0;

    function posicionar(e, uf) {
        const caixa = e.currentTarget.ownerSVGElement.getBoundingClientRect();
        setFoco({ uf, x: e.clientX - caixa.left, y: e.clientY - caixa.top });
    }

    return (
        <div>
            <div className="relative">
                <svg
                    viewBox={brasil.viewBox}
                    className="w-full h-auto max-h-[520px]"
                    role="img"
                    aria-label={`Mapa do Brasil com ${unidade} por estado`}
                    onMouseLeave={() => setFoco(null)}
                >
                    {brasil.locations.map((l) => {
                        const valor = porUf[l.id] || 0;
                        const f = faixa(valor, maior);
                        const ativo = foco?.uf === l.id;
                        return (
                            <path
                                key={l.id}
                                d={l.path}
                                fill={f < 0 ? SEM_DADOS : CORES[f]}
                                stroke={ativo ? "#ffffff" : "#18181b"}
                                strokeWidth={ativo ? 2 : 1}
                                className="cursor-pointer outline-none transition-[fill]"
                                tabIndex={0}
                                aria-label={`${l.name}: ${fmt.format(valor)} ${unidade}`}
                                onMouseMove={(e) => posicionar(e, l.id)}
                                onFocus={(e) => {
                                    const r = e.currentTarget.getBBox();
                                    const svg = e.currentTarget.ownerSVGElement;
                                    const escala = svg.getBoundingClientRect().width / svg.viewBox.baseVal.width;
                                    setFoco({ uf: l.id, x: (r.x + r.width / 2) * escala, y: r.y * escala });
                                }}
                                onBlur={() => setFoco(null)}
                            />
                        );
                    })}
                </svg>

                {estadoEmFoco && (
                    <div
                        className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full -mt-3 whitespace-nowrap rounded-lg bg-zinc-100 text-zinc-900 text-xs px-3 py-2 shadow-lg"
                        style={{ left: foco.x, top: foco.y - 8 }}
                    >
                        <p className="font-semibold">{estadoEmFoco.name}</p>
                        <p>
                            <strong>{fmt.format(valorEmFoco)}</strong> {unidade}
                            {total > 0 && <span className="text-zinc-500"> · {Math.round((valorEmFoco / total) * 100)}%</span>}
                        </p>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm" style={{ background: SEM_DADOS }} /> 0
                </span>
                {CORES.map((cor, i) => {
                    const de = i === 0 ? 1 : limiteDaFaixa(i, maior) + 1;
                    const ate = limiteDaFaixa(i + 1, maior);
                    if (de > ate) return null;
                    return (
                        <span key={cor} className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-sm" style={{ background: cor }} />
                            {de === ate ? fmt.format(de) : `${fmt.format(de)}–${fmt.format(ate)}`}
                        </span>
                    );
                })}
            </div>
            <p className="text-[11px] text-zinc-600 mt-3">
                Mapa: <a href="https://github.com/VictorCazanave/svg-maps" target="_blank" rel="noreferrer" className="underline">svg-maps</a> (CC BY 4.0)
            </p>
        </div>
    );
}
