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
        manualChunks: {
          // Vendor principal - React ecosystem
          'vendor-react': [
            'react',
            'react-dom',
            'react-router-dom',
            'react-helmet-async',
          ],

          // Animações - Framer Motion (pesado)
          'vendor-framer': [
            'framer-motion',
          ],

          // Ícones - Lucide
          'vendor-icons': [
            'lucide-react',
          ],

          // Utilidades - Tailwind (gerado automaticamente, mas separar ajuda)
          'vendor-utils': [
            'clsx',
            'classnames',
          ],
        },

        // ── PADRÃO DE NOMES DOS CHUNKS ────────────────────────────────────
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
})
