import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // ── BUILD OPTIMIZATION ──────────────────────────────────────────────────────
  build: {
    // Aumentar tamanho do aviso (padrão é 500kb)
    chunkSizeWarningLimit: 1000,
    
    // Otimizar minificação
    minify: 'terser',
    
    // Configurações do terser para melhor compressão
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log() em produção
        drop_debugger: true, // Remove debugger
      },
      format: {
        comments: false, // Remove comentários
      },
    },

    // ── MANUAL CHUNKS (Code Splitting) ────────────────────────────────────
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('/react/') ||
              id.includes('/react-dom/') ||
              id.includes('/react-router-dom/') ||
              id.includes('/react-helmet-async/')
            ) {
              return 'vendor-react'
            }
            if (id.includes('/framer-motion/')) {
              return 'vendor-framer'
            }
            if (id.includes('/lucide-react/')) {
              return 'vendor-icons'
            }
            if (id.includes('/clsx/') || id.includes('/classnames/')) {
              return 'vendor-utils'
            }
          }
        },

        // ── PADRÃO DE NOMES DOS CHUNKS ────────────────────────────────────
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || assetInfo.names?.[0] || assetInfo.originalFileNames?.[0] || ''
          const info = name.split('.')
          const ext = info[info.length - 1]

          if (/png|jpe?g|gif|svg|webp/.test(ext)) {
            return `images/[name]-[hash][extname]`
          } else if (/woff|woff2|eot|ttf|otf/.test(ext)) {
            return `fonts/[name]-[hash][extname]`
          } else if (ext === 'css') {
            return `css/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
      },
    },

    // ── SOURCE MAPS ────────────────────────────────────────────────────────
    sourcemap: false, // Desabilitar em produção para reduzir tamanho
  },

  // ── RESOLUÇÃO DE ALIASES ────────────────────────────────────────────────────
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@assets': '/src/assets',
      '@data': '/src/data',
      '@layouts': '/src/layouts',
      '@context': '/src/context',
    },
  },

  // ── SERVIDOR DE DESENVOLVIMENTO ────────────────────────────────────────────
  server: {
    port: 5173,
    strictPort: false,
    open: false,
  },

  // ── TESTES DE COMPONENTE (Vitest + Testing Library) ─────────────────────────
  // globals fica desligado de propósito: describe/it/expect são importados
  // explicitamente de 'vitest' em cada arquivo de teste, pra não precisar
  // ensinar o ESLint sobre mais um conjunto de globais.
  // include restrito a src/: api/_lib/__tests__ usa o runner nativo do Node
  // (node:test, rodado via `npm test`), não o Vitest — os dois usam a mesma
  // convenção de nome (*.test.*) mas não são compatíveis entre si.
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    include: ['src/**/*.test.{js,jsx}'],
    css: false,
  },
})
