// resize-foto-todos-grande.cjs
// Gera uma versão em resolução maior (1600px) da "FOTO COM TODOS",
// para uso no Hero (banner de tela cheia), sem afetar a versão pequena
// usada na seção Estrutura.
//
// Uso:
//   1. Coloque o arquivo ORIGINAL (alta resolução) nesta pasta
//      com o nome "FOTO_COM_TODOS_ORIGINAL.webp"
//   2. node resize-foto-todos-grande.cjs
//   3. O resultado sai como "FOTO_COM_TODOS_GRANDE.webp"

const sharp = require('sharp')
const fs = require('fs')

const ARQUIVO_ORIGEM = './FOTO_COM_TODOS_ORIGINAL.webp'
const ARQUIVO_SAIDA = './FOTO_COM_TODOS_GRANDE.webp'
const LADO_MAXIMO = 1600
const QUALIDADE = 80

async function main() {
  if (!fs.existsSync(ARQUIVO_ORIGEM)) {
    console.log(`Arquivo não encontrado: ${ARQUIVO_ORIGEM}`)
    console.log('Coloque o arquivo original nesta pasta com esse nome.')
    return
  }

  const statsAntes = fs.statSync(ARQUIVO_ORIGEM)

  await sharp(ARQUIVO_ORIGEM)
    .resize({
      width: LADO_MAXIMO,
      height: LADO_MAXIMO,
      fit: 'inside',
      withoutEnlargement: true
    })
    .webp({ quality: QUALIDADE })
    .toFile(ARQUIVO_SAIDA)

  const statsDepois = fs.statSync(ARQUIVO_SAIDA)
  console.log(`${(statsAntes.size / 1024).toFixed(0)}KB → ${(statsDepois.size / 1024).toFixed(0)}KB`)
  console.log(`Salvo em: ${ARQUIVO_SAIDA}`)
}

main().catch(err => {
  console.error('Erro:', err)
  process.exit(1)
})
