import { CheckCircle2, XCircle } from "lucide-react";
import { Cartao, GraficoBarras, Kpi, Ranking } from "./componentes";

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const NOMES_PAGINAS = {
    "/": "Início",
    "/sobre": "Sobre",
    "/servicos": "Serviços",
    "/blog": "Blog",
    "/contato": "Contato",
    "/planos": "Planos",
    "/proposta": "Proposta",
    "/trabalhe-conosco": "Trabalhe Conosco",
    "/politica-privacidade": "Política de Privacidade",
    "/termos-uso": "Termos de Uso",
};

function nomePagina(caminho) {
    if (NOMES_PAGINAS[caminho]) return NOMES_PAGINAS[caminho];
    const m = caminho.match(/^\/(servicos|blog)\/(.+)$/);
    if (m) return `${m[1] === "blog" ? "Blog" : "Serviço"}: ${m[2].replace(/-/g, " ")}`;
    return caminho;
}

function comNomes(itens = []) {
    return itens.map((i) => ({ ...i, nome: nomePagina(i.nome) }));
}

function curtaData(dia) {
    const [, m, d] = dia.split("-");
    return `${d}/${m}`;
}

function porcentagem(v) {
    return `${(v || 0).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;
}

function contatosTotais(t) {
    return t.contatos + t.whatsapp + t.telefone + t.email;
}

function serieDiaria(serie, campo) {
    return serie.map((d) => ({ chave: d.dia, legenda: curtaData(d.dia), curta: curtaData(d.dia), valor: campo(d) }));
}

export function VisaoGeral({ dados }) {
    const { totais: t, anterior: a, serie, rankings } = dados;
    const taxa = (x) => (x.sessoes ? (contatosTotais(x) / x.sessoes) * 100 : 0);
    const ppv = (x) => (x.sessoes ? x.paginas / x.sessoes : 0);
    return (
        <div className="space-y-6">
            <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
                <Kpi rotulo="Visitas" valor={t.sessoes} anterior={a.sessoes} ajuda="Sessões de navegação (uma por aba/visita)" />
                <Kpi rotulo="Páginas vistas" valor={t.paginas} anterior={a.paginas} />
                <Kpi rotulo="Contatos gerados" valor={contatosTotais(t)} anterior={contatosTotais(a)} ajuda="Formulário + cliques em WhatsApp, telefone e e-mail" />
                <Kpi rotulo="Taxa de contato" valor={taxa(t)} anterior={taxa(a)} formato={porcentagem} ajuda="Contatos gerados ÷ visitas" />
            </div>
            {serie.length > 1 && (
                <Cartao titulo="Visitas por dia">
                    <GraficoBarras dados={serieDiaria(serie, (d) => d.sessoes)} rotulo="Visitas por dia" />
                </Cartao>
            )}
            <div className="grid gap-6 lg:grid-cols-3">
                <Cartao titulo="Principais estados">
                    <Ranking itens={rankings.estados} limite={5} />
                </Cartao>
                <Cartao titulo="De onde vieram">
                    <Ranking itens={rankings.origens} limite={5} />
                </Cartao>
                <Cartao titulo="Páginas mais vistas">
                    <Ranking itens={comNomes(rankings.paginas)} limite={5} />
                </Cartao>
            </div>
            <p className="text-xs text-zinc-500">Páginas por visita: {ppv(t).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}</p>
        </div>
    );
}

export function Regioes({ dados }) {
    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <Cartao titulo="Estados" descricao="Visitas por estado. Acessos de fora do Brasil aparecem como “Exterior”.">
                <Ranking itens={dados.rankings.estados} limite={27} />
            </Cartao>
            <Cartao titulo="Cidades" descricao="Top 20 cidades por número de visitas.">
                <Ranking itens={dados.rankings.cidades} limite={20} />
            </Cartao>
        </div>
    );
}

export function Paginas({ dados }) {
    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <Cartao titulo="Páginas mais vistas" descricao="Total de visualizações de cada página.">
                <Ranking itens={comNomes(dados.rankings.paginas)} limite={20} />
            </Cartao>
            <Cartao titulo="Páginas de entrada" descricao="Primeira página que a pessoa abriu ao chegar no site.">
                <Ranking itens={comNomes(dados.rankings.entradas)} limite={20} />
            </Cartao>
        </div>
    );
}

export function Origens({ dados }) {
    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <Cartao titulo="Origem das visitas" descricao="Buscadores, redes sociais, campanhas ou acesso direto.">
                <Ranking itens={dados.rankings.origens} limite={20} />
            </Cartao>
            <Cartao titulo="Como medir campanhas">
                <div className="text-sm text-zinc-300 space-y-3">
                    <p>
                        Para saber quantas visitas vieram de um post, anúncio ou link específico, adicione
                        <code className="mx-1 px-1.5 py-0.5 rounded bg-zinc-800 text-amber-400">?utm_source=nome</code>
                        ao link divulgado.
                    </p>
                    <p className="text-zinc-400">Exemplo para a bio do Instagram:</p>
                    <code className="block break-all px-3 py-2 rounded-lg bg-zinc-800 text-xs">
                        https://domingosassessoria.com.br/?utm_source=instagram_bio
                    </code>
                    <p className="text-zinc-400">
                        Ele aparece aqui como “Campanha: instagram_bio”. Visitas vindas de anúncios do Google aparecem como
                        “Google Ads”.
                    </p>
                </div>
            </Cartao>
        </div>
    );
}

export function Dispositivos({ dados }) {
    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <Cartao titulo="Tipo de aparelho">
                <Ranking itens={dados.rankings.dispositivos} />
            </Cartao>
            <Cartao titulo="Navegador">
                <Ranking itens={dados.rankings.navegadores} />
            </Cartao>
        </div>
    );
}

export function Horarios({ dados }) {
    const horas = dados.horas.map((valor, h) => ({ chave: h, legenda: `${h}h`, curta: `${h}h`, valor }));
    const semana = dados.semana.map((valor, i) => ({ chave: i, legenda: DIAS_SEMANA[i], curta: DIAS_SEMANA[i], valor }));
    return (
        <div className="space-y-6">
            <Cartao titulo="Visitas por horário" descricao="Horário de Brasília em que as visitas começaram.">
                <GraficoBarras dados={horas} rotulo="Visitas por hora do dia" marcarCada={3} />
            </Cartao>
            <Cartao titulo="Visitas por dia da semana">
                <div className="max-w-xl">
                    <GraficoBarras dados={semana} rotulo="Visitas por dia da semana" altura={140} marcarCada={1} />
                </div>
            </Cartao>
        </div>
    );
}

export function Conversoes({ dados }) {
    const { totais: t, anterior: a, serie, rankings } = dados;
    return (
        <div className="space-y-6">
            <div className="grid gap-4 grid-cols-2 xl:grid-cols-5">
                <Kpi rotulo="Formulário de contato" valor={t.contatos} anterior={a.contatos} />
                <Kpi rotulo="Cliques no WhatsApp" valor={t.whatsapp} anterior={a.whatsapp} />
                <Kpi rotulo="Cliques no telefone" valor={t.telefone} anterior={a.telefone} />
                <Kpi rotulo="Cliques no e-mail" valor={t.email} anterior={a.email} />
                <Kpi rotulo="Candidaturas" valor={t.candidaturas} anterior={a.candidaturas} ajuda="Formulário Trabalhe Conosco" />
            </div>
            {serie.length > 1 && (
                <Cartao titulo="Contatos por dia" descricao="Formulário + cliques em WhatsApp, telefone e e-mail.">
                    <GraficoBarras dados={serieDiaria(serie, contatosTotais)} rotulo="Contatos por dia" />
                </Cartao>
            )}
            <div className="grid gap-6 lg:grid-cols-2">
                <Cartao titulo="Contatos por estado" descricao="De onde vêm as pessoas que entraram em contato.">
                    <Ranking itens={rankings.leadsEstados} />
                </Cartao>
                <Cartao titulo="Páginas que mais geraram cliques" descricao="Onde a pessoa estava ao clicar em WhatsApp, telefone ou e-mail.">
                    <Ranking itens={comNomes(rankings.cliquesPaginas)} />
                </Cartao>
            </div>
        </div>
    );
}

const PROTECOES = [
    "Sessão em cookie protegido (HttpOnly, Secure, SameSite=Strict), com validade de 8 horas",
    "A senha não fica salva no navegador",
    "Bloqueio de 15 minutos após 5 tentativas de senha erradas",
    "Trocar PAINEL_SENHA na Vercel encerra todas as sessões abertas",
    "Página fora do Google (noindex) e sem cache no navegador",
    "Contagem de visitas ignora robôs e limita abusos (120 eventos/hora por visitante)",
    "Nenhum IP ou dado pessoal guardado: só totais agregados",
];

function dataHora(iso) {
    return new Date(iso).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" });
}

export function Seguranca({ dados }) {
    const { totais: t, anterior: a, seguranca } = dados;
    return (
        <div className="space-y-6">
            <div className="grid gap-4 grid-cols-2">
                <Kpi rotulo="Entradas no painel" valor={t.login_ok} anterior={a.login_ok} />
                <Kpi rotulo="Tentativas com senha errada" valor={t.login_falha} anterior={a.login_falha} />
            </div>
            <Cartao titulo="Últimos acessos ao painel" descricao="Até 50 registros mais recentes, de qualquer período.">
                {seguranca.acessos.length === 0 ? (
                    <p className="text-zinc-400 text-sm">Nenhum acesso registrado ainda.</p>
                ) : (
                    <div className="overflow-x-auto -mx-5 px-5">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-zinc-400 border-b border-zinc-800">
                                    <th className="py-2 pr-4 font-medium">Quando</th>
                                    <th className="py-2 pr-4 font-medium">Resultado</th>
                                    <th className="py-2 pr-4 font-medium">Local</th>
                                    <th className="py-2 font-medium">Aparelho</th>
                                </tr>
                            </thead>
                            <tbody>
                                {seguranca.acessos.map((x, i) => (
                                    <tr key={`${x.em}-${i}`} className="border-b border-zinc-800/60">
                                        <td className="py-2 pr-4 whitespace-nowrap tabular-nums">{dataHora(x.em)}</td>
                                        <td className="py-2 pr-4 whitespace-nowrap">
                                            {x.ok ? (
                                                <span className="inline-flex items-center gap-1 text-emerald-400"><CheckCircle2 size={14} /> Entrou</span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-red-400"><XCircle size={14} /> Senha errada</span>
                                            )}
                                        </td>
                                        <td className="py-2 pr-4">{x.cidade}</td>
                                        <td className="py-2 whitespace-nowrap">{x.dispositivo} · {x.navegador}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Cartao>
            <Cartao titulo="Proteções ativas">
                <ul className="space-y-2 text-sm">
                    {PROTECOES.map((p) => (
                        <li key={p} className="flex gap-2">
                            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                            <span>{p}</span>
                        </li>
                    ))}
                </ul>
                <p className="text-xs text-zinc-500 mt-4">
                    Viu um acesso que não reconhece? Troque a PAINEL_SENHA na Vercel e faça um redeploy. Todas as sessões são encerradas na hora.
                </p>
            </Cartao>
        </div>
    );
}

