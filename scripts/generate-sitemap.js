// Gera public/sitemap.xml a partir das rotas reais do site + do catálogo de
// serviços (src/data/services.js), usando a data do último commit de cada
// arquivo como <lastmod> — evita datas fixas/inventadas que ficam
// desatualizadas a cada mudança de conteúdo.
//
// Rodado automaticamente antes de cada build (ver "prebuild" em package.json).
//
// Blog, posts do blog e Trabalhe Conosco são propositalmente OMITIDOS: essas
// páginas existem no código mas ainda estão em desenvolvimento e não devem
// ser indexadas nem descobertas via sitemap (decisão do dono do site).

import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SITE_URL = 'https://domingosassessoria.com.br'

function lastModDate(...relativeFiles) {
    let latest = null
    for (const rel of relativeFiles) {
        try {
            const out = execSync(`git log -1 --format=%cd --date=short -- "${rel}"`, {
                cwd: ROOT,
                encoding: 'utf8',
            }).trim()
            if (out && (!latest || out > latest)) latest = out
        } catch {
            // git indisponível (ex.: checkout raso) — ignora e cai no fallback abaixo
        }
    }
    return latest || new Date().toISOString().slice(0, 10)
}

async function main() {
    const { services } = await import(pathToFileURL(path.join(ROOT, 'src/data/services.js')))

    const servicosListDate = lastModDate('src/pages/Servicos.jsx', 'src/data/services.js')
    const servicoDetalheDate = lastModDate('src/pages/ServicoDetalhe.jsx', 'src/data/services.js')

    const urls = [
        { loc: '/', lastmod: lastModDate('src/pages/Home.jsx'), changefreq: 'weekly', priority: '1.0' },
        { loc: '/sobre', lastmod: lastModDate('src/pages/Sobre.jsx'), changefreq: 'monthly', priority: '0.9' },
        { loc: '/servicos', lastmod: servicosListDate, changefreq: 'weekly', priority: '0.9' },
        ...services.map((s) => ({
            loc: `/servicos/${s.id}`,
            lastmod: servicoDetalheDate,
            changefreq: 'monthly',
            priority: '0.8',
        })),
        { loc: '/contato', lastmod: lastModDate('src/pages/Contato.jsx'), changefreq: 'monthly', priority: '0.8' },
        { loc: '/planos', lastmod: lastModDate('src/pages/Planos.jsx'), changefreq: 'monthly', priority: '0.7' },
        { loc: '/proposta', lastmod: lastModDate('src/pages/Proposta.jsx'), changefreq: 'monthly', priority: '0.7' },
        { loc: '/politica-privacidade', lastmod: lastModDate('src/pages/PoliticaPrivacidade.jsx'), changefreq: 'yearly', priority: '0.3' },
        { loc: '/termos-uso', lastmod: lastModDate('src/pages/TermosUso.jsx'), changefreq: 'yearly', priority: '0.3' },
    ]

    const body = urls
        .map(
            (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
        )
        .join('\n\n')

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">

${body}

</urlset>
`

    writeFileSync(path.join(ROOT, 'public/sitemap.xml'), xml)
    console.log(`sitemap.xml gerado com ${urls.length} URLs`)
}

main()
