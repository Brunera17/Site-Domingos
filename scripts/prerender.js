// Pré-renderiza cada página listada no sitemap e grava o HTML pronto em
// dist/<rota>/index.html. Sem isso, o servidor entrega um <div id="root">
// vazio e o título, a descrição e o texto só aparecem depois que o JavaScript
// roda — o Google lê com atraso e as prévias de link (WhatsApp, redes
// sociais) não veem nada.
//
// Fluxo (ver "build" em package.json):
//   1. vite build               → dist/ (site normal, com o index.html base)
//   2. vite build --ssr         → dist-ssr/ (App compilado para rodar no Node)
//   3. node scripts/prerender.js → injeta o HTML de cada rota em dist/ e
//      grava dist/spa.html (casca vazia para as rotas não pré-renderizadas)
//
// No navegador nada muda: src/main.jsx descarta as tags de <head> marcadas
// com data-prerender e o React assume a página normalmente.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'
import process from 'node:process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const SSR_DIR = path.join(ROOT, 'dist-ssr')
const SITE_URL = 'https://domingosassessoria.com.br'

// As rotas vêm do sitemap (gerado no prebuild), para as duas listas não
// saírem de sincronia.
function rotasDoSitemap() {
    const xml = readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8')
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE_URL, '') || '/')
}

// O React 19 coloca <title>, <meta> e <link> das páginas no começo da string
// renderizada. Separa esse bloco (vai para o <head>) do corpo da página.
function separarHead(html) {
    const tag = /^\s*(<title>[\s\S]*?<\/title>|<(?:meta|link|base)\b[^>]*\/?>)/
    let head = ''
    let resto = html
    let m
    while ((m = resto.match(tag))) {
        head += m[1].replace(/^<(\w+)/, '<$1 data-prerender=""')
        resto = resto.slice(m[0].length)
    }
    return { head, body: resto }
}

async function main() {
    const entrada = readdirSync(path.join(SSR_DIR, 'js')).find((f) => f.startsWith('entry-server'))
    const { render } = await import(pathToFileURL(path.join(SSR_DIR, 'js', entrada)))
    const modelo = readFileSync(path.join(DIST, 'index.html'), 'utf8')

    if (!modelo.includes('<div id="root"></div>')) {
        throw new Error('dist/index.html sem <div id="root"></div> — não dá para pré-renderizar')
    }

    // Cópia limpa do index.html para as rotas que não são pré-renderizadas
    // (blog, 404...): o vercel.json manda essas rotas para cá, em vez de
    // entregar o HTML da home com o título e o canonical da home.
    writeFileSync(path.join(DIST, 'spa.html'), modelo)

    for (const rota of rotasDoSitemap()) {
        const { head, body } = separarHead(render(rota))
        if (!head.includes('<title')) throw new Error(`Rota ${rota} renderizou sem <title>`)

        const html = modelo
            .replace('</head>', `${head}\n  </head>`)
            .replace('<div id="root"></div>', `<div id="root">${body}</div>`)

        const destino = rota === '/' ? DIST : path.join(DIST, rota)
        mkdirSync(destino, { recursive: true })
        writeFileSync(path.join(destino, 'index.html'), html)
        console.log(`pré-renderizado: ${rota}`)
    }

    rmSync(SSR_DIR, { recursive: true, force: true })
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
