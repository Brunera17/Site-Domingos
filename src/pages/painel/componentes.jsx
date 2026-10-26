const fmt = new Intl.NumberFormat("pt-BR");

function numero(n) {
    return fmt.format(n || 0);
}

export function Cartao({ titulo, descricao, children, className = "" }) {
    return (
        <section className={`bg-zinc-900 border border-zinc-800 rounded-2xl p-5 ${className}`}>
            {titulo && <h2 className="text-base font-semibold">{titulo}</h2>}
            {descricao && <p className="text-xs text-zinc-400 mt-0.5">{descricao}</p>}
            <div className={titulo ? "mt-4" : ""}>{children}</div>
        </section>
    );
}

function Variacao({ atual, anterior }) {
    if (!anterior) return <span className="text-xs text-zinc-500">sem base de comparação</span>;
    const pct = Math.round(((atual - anterior) / anterior) * 100);
    const cor = pct > 0 ? "text-emerald-400" : pct < 0 ? "text-red-400" : "text-zinc-400";
    const seta = pct > 0 ? "▲" : pct < 0 ? "▼" : "■";
    return (
        <span className={`text-xs ${cor}`}>
            {seta} {Math.abs(pct)}% vs. anterior
        </span>
    );
}

export function Kpi({ rotulo, valor, anterior, formato = numero, ajuda }) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5" title={ajuda}>
            <p className="text-sm text-zinc-400">{rotulo}</p>
            <p className="text-3xl font-bold mt-1 tabular-nums">{formato(valor)}</p>
            {anterior !== undefined && (
                <div className="mt-1">
                    <Variacao atual={valor} anterior={anterior} />
                </div>
            )}
        </div>
    );
}

export function Ranking({ itens, limite = 10, vazio = "Nenhum dado no período." }) {
    const lista = (itens || []).slice(0, limite);
    if (lista.length === 0) return <p className="text-zinc-400 text-sm">{vazio}</p>;
    const total = (itens || []).reduce((s, i) => s + i.total, 0);
    const maior = lista[0].total || 1;
    return (
        <ol className="space-y-3">
            {lista.map((item, i) => (
                <li key={item.nome}>
                    <div className="flex justify-between gap-3 text-sm mb-1">
                        <span className="truncate">
                            <span className="text-zinc-500 mr-2 tabular-nums">{i + 1}.</span>
                            {item.nome}
                        </span>
                        <span className="shrink-0 tabular-nums">
                            <strong>{numero(item.total)}</strong>
                            <span className="text-zinc-500 ml-2">{Math.round((item.total / total) * 100)}%</span>
                        </span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(item.total / maior) * 100}%` }} />
                    </div>
                </li>
            ))}
        </ol>
    );
}

// Barras verticais de uma série só. Cada barra mostra o valor ao passar o
// mouse (ou tocar) e também no atributo title, pra leitores de tela.
export function GraficoBarras({ dados, rotulo, altura = 160, unidade = "", marcarCada }) {
    const maior = Math.max(1, ...dados.map((d) => d.valor));
    const marcas = new Set([0, Math.floor((dados.length - 1) / 2), dados.length - 1]);
    const marcado = (i) => (marcarCada ? i % marcarCada === 0 : marcas.has(i));
    return (
        <div>
            <div className="flex items-end gap-[2px]" style={{ height: altura }} role="img" aria-label={rotulo}>
                {dados.map((d) => (
                    <div key={d.chave} className="group relative flex-1 h-full flex items-end" title={`${d.legenda}: ${numero(d.valor)}${unidade}`}>
                        <div
                            className="w-full bg-amber-500/80 group-hover:bg-amber-400 rounded-t-[4px] min-h-[2px]"
                            style={{ height: `${(d.valor / maior) * 100}%` }}
                        />
                        <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block whitespace-nowrap rounded-md bg-zinc-100 text-zinc-900 text-xs px-2 py-1 z-10">
                            {d.legenda}: <strong>{numero(d.valor)}</strong>{unidade}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-[2px] mt-2 text-[11px] text-zinc-500">
                {dados.map((d, i) => (
                    <div key={d.chave} className="flex-1 text-center overflow-visible whitespace-nowrap">
                        {marcado(i) ? d.curta : ""}
                    </div>
                ))}
            </div>
        </div>
    );
}
