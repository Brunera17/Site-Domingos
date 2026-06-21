// resize-fotos.js
// Redimensiona todas as .webp de uma pasta para no máximo 400px (lado maior),
// mantendo a proporção original (sem distorcer, sem cortar), e recomprime em WebP.
//
// Uso:
//   node resize-fotos.js
//
// Requer: npm install sharp

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const PASTA_ORIGEM = './'              // pasta onde estão as fotos atuais
const PASTA_SAIDA = './otimizadas'     // pasta de saída
const LADO_MAXIMO = 800                // px
const QUALIDADE = 78                   // 0-100

async function main() {
  if (!fs.existsSync(PASTA_SAIDA)) {
    fs.mkdirSync(PASTA_SAIDA)
  }

  const arquivos = fs.readdirSync(PASTA_ORIGEM).filter(f =>
    f.toLowerCase().endsWith('.webp')
  )

  if (arquivos.length === 0) {
    console.log('Nenhum arquivo .webp encontrado nesta pasta.')
    return
  }

  console.log(`Encontrados ${arquivos.length} arquivos. Processando...\n`)

  for (const arquivo of arquivos) {
    const origem = path.join(PASTA_ORIGEM, arquivo)
    const destino = path.join(PASTA_SAIDA, arquivo)

    const statsAntes = fs.statSync(origem)
    const tamanhoAntesKB = (statsAntes.size / 1024).toFixed(0)

    await sharp(origem)
      .resize({
        width: LADO_MAXIMO,
        height: LADO_MAXIMO,
        fit: 'inside',           // mantém proporção, não corta, não distorce
        withoutEnlargement: true // não aumenta fotos que já são menores
      })
      .webp({ quality: QUALIDADE })
      .toFile(destino)

    const statsDepois = fs.statSync(destino)
    const tamanhoDepoisKB = (statsDepois.size / 1024).toFixed(0)
    const economia = (100 - (statsDepois.size / statsAntes.size) * 100).toFixed(0)

    console.log(`${arquivo.padEnd(30)} ${tamanhoAntesKB}KB → ${tamanhoDepoisKB}KB  (-${economia}%)`)
  }

  console.log('\nConcluído! Fotos otimizadas estão em ./otimizadas')
  console.log('Confira o resultado antes de substituir os arquivos originais.')
}

main().catch(err => {
  console.error('Erro:', err)
  process.exit(1)
})
