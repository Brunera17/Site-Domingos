import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { PlanProvider } from "./context/PlanContext";

import MainLayout from "./layouts/MainLayout";
import CleanLayout from "./layouts/CleanLayout";

import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Servicos from "./pages/Servicos";
import ServicoDetalhe from "./pages/ServicoDetalhe";
import Blog from "./pages/Blog";
import TrabalheConosco from "./pages/TrabalheConosco";
import Contato from "./pages/Contato";
import Planos from "./pages/Planos";
import Proposta from "./pages/Proposta";
import BlogPost from './pages/BlogPost'

export default function App() {
  return (
    <HelmetProvider>
      <PlanProvider>
        <Routes>

          {/* 🔥 ROTAS COM HEADER */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/servicos/:id" element={<ServicoDetalhe />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Route>

          {/* 🧼 ROTAS SEM HEADER */}
          <Route element={<CleanLayout />}>
            <Route path="/planos" element={<Planos />} />
            <Route path="/proposta" element={<Proposta />} />
          </Route>

        </Routes>
      </PlanProvider>
    </HelmetProvider>
  );
}