import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import ScrollToTop from './components/layout/ScrollToTop'
import ErrorBoundary from './components/ui/ErrorBoundary'

// As páginas chegam pré-renderizadas (scripts/prerender.js). As tags de <head>
// geradas no build são removidas aqui porque o SEOHead volta a criá-las no
// navegador — sem isso ficariam dois <title> e o da página anterior
// continuaria valendo ao navegar. O conteúdo de #root é substituído pelo
// React na primeira renderização.
document.querySelectorAll('head [data-prerender]').forEach((el) => el.remove())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)