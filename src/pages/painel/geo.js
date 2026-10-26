import brasil from "@svg-maps/brazil";

// Converte latitude/longitude para as coordenadas do desenho dos estados
// (@svg-maps/brazil, viewBox 613×639). O desenho usa projeção de Mercator;
// os parâmetros vêm dos extremos do Brasil casados com a caixa do SVG e
// foram conferidos com o Distrito Federal (erro < 1px).
const LON_OESTE = -73.99;
const LON_LESTE = -34.79;
const LAT_NORTE = 5.27;
const LAT_SUL = -33.75;
const X0 = 0.3;
const Y0 = 0.3;
const LARGURA = 612;
const ALTURA = 638.5;

const merc = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
const ESCALA_X = LARGURA / (LON_LESTE - LON_OESTE);
const ESCALA_Y = ALTURA / (merc(LAT_NORTE) - merc(LAT_SUL));

export function projetar(lat, lon) {
    return { x: X0 + (lon - LON_OESTE) * ESCALA_X, y: Y0 + (merc(LAT_NORTE) - merc(lat)) * ESCALA_Y };
}

export function distanciaKm(a, b) {
    const rad = (g) => (g * Math.PI) / 180;
    const dLat = rad(b.lat - a.lat);
    const dLon = rad(b.lon - a.lon);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
    return 2 * 6371 * Math.asin(Math.sqrt(h));
}

// "Bauru - SP" → "SP"
export function ufDaCidade(nome) {
    const m = nome.match(/ - ([A-Z]{2})$/);
    return m ? m[1] : null;
}

const NOME_UF = Object.fromEntries(brasil.locations.map((l) => [l.id.toUpperCase(), l.name]));

export function nomeDoEstado(uf) {
    return NOME_UF[uf] || uf;
}

// Caixa [x1, y1, x2, y2] de cada estado no desenho, medida com getBBox() no
// @svg-maps/brazil 2.0.0 (versão fixada no package.json). Usada pra aproximar
// o mapa num estado sem precisar medir o DOM.
export const CAIXAS_UF = {
    ac: [0.3, 192.8, 115.2, 255.9],
    al: [558.5, 219.6, 606.7, 245.8],
    ap: [300.4, 14.1, 376.7, 100.4],
    am: [3.5, 47.6, 275.5, 235.4],
    ba: [428.4, 215, 571.1, 371.3],
    ce: [508.6, 125.5, 574.1, 204.3],
    df: [401.8, 325.3, 417, 334.1],
    es: [501.6, 364.2, 536.2, 419.9],
    go: [324.6, 277, 438.7, 390.3],
    ma: [394.4, 98.8, 502.6, 243],
    mt: [193.6, 196.2, 371.3, 366.5],
    ms: [247.6, 352.7, 360.5, 466.6],
    mg: [358.9, 305.3, 533.2, 447.1],
    pa: [234.9, 42.6, 436, 235.5],
    pb: [550.5, 175.6, 612.3, 211],
    pr: [302.9, 440.8, 404.8, 512.3],
    pe: [509.6, 195.1, 612.1, 229.9],
    pi: [437.7, 125, 524.5, 252.1],
    rj: [455.1, 411.6, 516, 454.8],
    rn: [552.7, 157.1, 609.6, 190.7],
    rs: [256.2, 518.7, 379.6, 638.8],
    ro: [112.2, 206.6, 221.1, 296.3],
    rr: [143.9, 0.3, 236.5, 104.2],
    sc: [315, 499.6, 400.3, 558.9],
    sp: [325.7, 395.2, 466.1, 488.2],
    se: [558.4, 230.6, 587.1, 262.8],
    to: [363.3, 162.3, 441.1, 290.4],
};
