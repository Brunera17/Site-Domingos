import { useMemo, useRef, useState } from "react";
import brasil from "@svg-maps/brazil";
import { CAIXAS_UF, nomeDoEstado, projetar, ufDaCidade } from "./geo";

// Escala sequencial de uma cor só (âmbar), do mais escuro (pouco) ao mais
// claro (muito) — no fundo escuro do painel, mais claro = mais destaque.
const CORES = ["#78350f", "#b45309", "#d97706", "#f59e0b", "#fcd34d"];
const SEM_DADOS = "#27272a";
const FUNDO_CIDADES = "#27272a";
const BOLHA = "#f59e0b";
const LARGURA_TOTAL = 613;
const RAIO_MAX = 12; // em unidades do mapa inteiro; mantido na tela ao aproximar

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
function Legenda({ maior }) {
    return (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-400">
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
    );
}

function LegendaBolhas({ maior, unidade }) {
    const exemplos = [...new Set([1, Math.round(maior / 4), maior])].filter((v) => v > 0 && v <= maior);
    return (
        <div className="flex flex-wrap items-end gap-4 text-xs text-zinc-400">
            {exemplos.map((v) => {
                const r = Math.max(3, 14 * Math.sqrt(v / maior));
                return (
                    <span key={v} className="flex items-center gap-1.5">
                        <span className="rounded-full bg-amber-500/70 border border-zinc-900" style={{ width: r * 2, height: r * 2 }} />
                        {fmt.format(v)}
                    </span>
                );
            })}
            <span>{unidade} por cidade</span>
            <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rotate-45 bg-white" /> Escritório
            </span>
        </div>
    );
}

/**
 * camada "estados": estados coloridos pelo total.
 * camada "cidades": bolhas por cidade, do tamanho do total.
 * Clicar num estado aproxima nele (uf) e mostra só as cidades de lá.
 */
export default function MapaBrasil({ estados, cidades, medida, camada, uf, aoSelecionarUf, escritorio }) {
    const unidade = medida === "contatos" ? "contatos" : "visitas";
    const caixaRef = useRef(null);
    const [foco, setFoco] = useState(null); // { titulo, valor, total, x, y }

    const ufMin = uf?.toLowerCase();
    const caixaUf = ufMin && CAIXAS_UF[ufMin] && (() => {
        const [x1, y1, x2, y2] = CAIXAS_UF[ufMin];
        return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
    })();
    const viewBox = caixaUf
        ? (() => {
              const pad = Math.max(caixaUf.w, caixaUf.h) * 0.12 + 6;
              return `${caixaUf.x - pad} ${caixaUf.y - pad} ${caixaUf.w + pad * 2} ${caixaUf.h + pad * 2}`;
          })()
        : brasil.viewBox;
    const larguraVisivel = caixaUf ? Number(viewBox.split(" ")[2]) : LARGURA_TOTAL;
    const k = larguraVisivel / LARGURA_TOTAL; // < 1 quando aproximado

    const { porUf, maiorUf, totalUf } = useMemo(() => {
        const porUf = {};
        let totalUf = 0;
        for (const { nome, total } of estados || []) {
            totalUf += total;
            if (/^[A-Z]{2}$/.test(nome)) porUf[nome.toLowerCase()] = total;
        }
        return { porUf, totalUf, maiorUf: Math.max(1, ...Object.values(porUf)) };
    }, [estados]);

    const bolhas = useMemo(() => {
        const lista = (cidades || [])
            .filter((c) => c.lat !== undefined && c[medida] > 0 && (!uf || ufDaCidade(c.nome) === uf))
            .map((c) => ({ ...c, valor: c[medida], ...projetar(c.lat, c.lon) }));
        const maior = Math.max(1, ...lista.map((c) => c.valor));
        // Maiores primeiro, pra as pequenas ficarem por cima e clicáveis.
        return { maior, lista: lista.sort((a, b) => b.valor - a.valor) };
    }, [cidades, medida, uf]);
    const totalBolhas = bolhas.lista.reduce((s, c) => s + c.valor, 0);

    function mostrar(e, titulo, valor, total) {
        const caixa = caixaRef.current.getBoundingClientRect();
        setFoco({ titulo, valor, total, x: e.clientX - caixa.left, y: e.clientY - caixa.top });
    }

    function mostrarNoFoco(e, titulo, valor, total) {
        const caixa = caixaRef.current.getBoundingClientRect();
        const r = e.currentTarget.getBoundingClientRect();
        setFoco({ titulo, valor, total, x: r.left + r.width / 2 - caixa.left, y: r.top - caixa.top });
    }

    const escritorioXY = escritorio && projetar(escritorio.lat, escritorio.lon);

    return (
        <div>
            <div ref={caixaRef} className="relative">
                <svg
                    viewBox={viewBox}
                    className="w-full h-auto max-h-[520px]"
                    role="img"
                    aria-label={`Mapa ${uf ? `de ${nomeDoEstado(uf)}` : "do Brasil"} com ${unidade} por ${camada === "cidades" ? "cidade" : "estado"}`}
                    onMouseLeave={() => setFoco(null)}
                >
                    {brasil.locations.map((l) => {
                        const valor = porUf[l.id] || 0;
                        const selecionado = ufMin === l.id;
                        const apagado = ufMin && !selecionado;
                        let fill;
                        if (camada === "cidades") fill = selecionado ? "#3f3f46" : FUNDO_CIDADES;
                        else {
                            const f = faixa(valor, maiorUf);
                            fill = f < 0 ? SEM_DADOS : CORES[f];
                        }
                        return (
                            <path
                                key={l.id}
                                d={l.path}
                                fill={fill}
                                opacity={apagado ? 0.35 : 1}
                                stroke={camada === "cidades" ? "#52525b" : "#18181b"}
                                strokeWidth={k}
                                className="cursor-pointer outline-none hover:brightness-125 focus-visible:brightness-150"
                                tabIndex={0}
                                aria-label={`${l.name}: ${fmt.format(valor)} ${unidade}. Clique para ver as cidades.`}
                                onClick={() => aoSelecionarUf(selecionado ? null : l.id.toUpperCase())}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        aoSelecionarUf(selecionado ? null : l.id.toUpperCase());
                                    }
                                }}
                                onMouseMove={camada === "estados" ? (e) => mostrar(e, l.name, valor, totalUf) : undefined}
                                onFocus={camada === "estados" ? (e) => mostrarNoFoco(e, l.name, valor, totalUf) : undefined}
                                onBlur={() => setFoco(null)}
                            />
                        );
                    })}

                    {camada === "cidades" &&
                        bolhas.lista.map((c) => {
                            const r = Math.max(2.5, RAIO_MAX * Math.sqrt(c.valor / bolhas.maior)) * k;
                            return (
                                <circle
                                    key={c.nome}
                                    cx={c.x}
                                    cy={c.y}
                                    r={r}
                                    fill={BOLHA}
                                    fillOpacity={0.7}
                                    stroke="#18181b"
                                    strokeWidth={k}
                                    className="cursor-pointer outline-none hover:brightness-125 focus-visible:brightness-150"
                                    tabIndex={0}
                                    aria-label={`${c.nome}: ${fmt.format(c.valor)} ${unidade}`}
                                    onClick={() => !uf && aoSelecionarUf(ufDaCidade(c.nome))}
                                    onMouseMove={(e) => mostrar(e, c.nome, c.valor, totalBolhas)}
                                    onFocus={(e) => mostrarNoFoco(e, c.nome, c.valor, totalBolhas)}
                                    onBlur={() => setFoco(null)}
                                />
                            );
                        })}

                    {escritorioXY && (
                        <g pointerEvents="none">
                            <rect
                                x={escritorioXY.x - 4 * k}
                                y={escritorioXY.y - 4 * k}
                                width={8 * k}
                                height={8 * k}
                                fill="#ffffff"
                                stroke="#18181b"
                                strokeWidth={k}
                                transform={`rotate(45 ${escritorioXY.x} ${escritorioXY.y})`}
                            />
                        </g>
                    )}
                </svg>

                {foco && (
                    <div
                        className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-zinc-100 text-zinc-900 text-xs px-3 py-2 shadow-lg"
                        style={{ left: foco.x, top: foco.y - 10 }}
                    >
                        <p className="font-semibold">{foco.titulo}</p>
                        <p>
                            <strong>{fmt.format(foco.valor)}</strong> {unidade}
                            {foco.total > 0 && <span className="text-zinc-500"> · {Math.round((foco.valor / foco.total) * 100)}%</span>}
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-4">
                {camada === "estados" ? <Legenda maior={maiorUf} /> : <LegendaBolhas maior={bolhas.maior} unidade={unidade} />}
            </div>
            {camada === "cidades" && bolhas.lista.length === 0 && (
                <p className="text-sm text-zinc-400 mt-3">Nenhuma cidade com {unidade} no período{uf ? " neste estado" : ""}.</p>
            )}
            <p className="text-[11px] text-zinc-600 mt-3">
                Localização aproximada pela conexão: o estado é confiável, a cidade pode variar (ex.: internet móvel).
                Mapa: <a href="https://github.com/VictorCazanave/svg-maps" target="_blank" rel="noreferrer" className="underline">svg-maps</a> (CC BY 4.0)
            </p>
        </div>
    );
}
