import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

const Home = lazy(() => import('./pages/Home'))
const Sobre = lazy(() => import('./pages/Sobre'))
const Servicos = lazy(() => import('./pages/Servicos'))
const ServicoDetalhe = lazy(() => import('./pages/ServicoDetalhe'))
const Blog = lazy(() => import('./pages/Blog'))
const TrabalheConosco = lazy(() => import('./pages/TrabalheConosco'))
const Contato = lazy(() => import('./pages/Contato'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageLoader() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center bg-black">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
    )
}

export default function App() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <main>
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sobre" element={<Sobre />} />
                        <Route path="/servicos" element={<Servicos />} />
                        <Route path="/servicos/:id" element={<ServicoDetalhe />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
                        <Route path="/contato" element={<Contato />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    )
}
