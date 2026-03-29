import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Servicos from './pages/Servicos'
import ServicoDetalhe from './pages/ServicoDetalhe'
import Blog from './pages/Blog'
import TrabalheConosco from './pages/TrabalheConosco'
import Contato from './pages/Contato'
import Planos from './pages/Planos'
import Proposta from './pages/Proposta'
import { PlanProvider } from './context/PlanContext'

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/servicos/:id" element={<ServicoDetalhe />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/proposta" element={<Proposta />} />
          <Route path="/planos" element={<Planos />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}