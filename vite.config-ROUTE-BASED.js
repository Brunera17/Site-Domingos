import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// VERSÃO COM ROUTE-BASED CODE SPLITTING
export default defineConfig({
  plugins: [
    react({
      // Usar babel para otimizar transformações
      babel: {
        presets: ['@babel/preset-react'],
      },
    }),
  ],

  build: {
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },

    rollupOptions: {
      output: {
        manualChunks(id) {
          // ── VENDOR BUNDLES ────────────────────────────────────────────
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/react-router')) {
            return 'vendor-react-router'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-framer'
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons'
          }

          // ── ROUTE-BASED SPLITTING ─────────────────────────────────────
          if (id.includes('pages/Home')) {
            return 'route-home'
          }
          if (id.includes('pages/Sobre')) {
            return 'route-sobre'
          }
          if (id.includes('pages/Servicos')) {
            return 'route-servicos'
          }
          if (id.includes('pages/ServicoDetalhe')) {
            return 'route-servico-detalhe'
          }
          if (id.includes('pages/Contato')) {
            return 'route-contato'
          }
          if (id.includes('pages/Planos')) {
            return 'route-planos'
          }

          // ── COMPONENT BUNDLES ─────────────────────────────────────────
          if (id.includes('components/')) {
            return 'components'
          }

          // ── SHARED ────────────────────────────────────────────────────
          if (id.includes('layouts/')) {
            return 'layouts'
          }
          if (id.includes('context/')) {
            return 'context'
          }
        },

        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
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
  },

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

  server: {
    port: 5173,
    strictPort: false,
    open: false,
  },
})
