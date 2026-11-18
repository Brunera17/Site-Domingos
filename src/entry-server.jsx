// Entrada usada só no build (scripts/prerender.js) para gerar o HTML estático
// de cada rota. O navegador continua usando src/main.jsx.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'

export function render(url) {
    return renderToString(
        <StrictMode>
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        </StrictMode>
    )
}
