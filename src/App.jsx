import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosUso from "./pages/TermosUso";
import NotFound from "./pages/NotFound";
import { registrarPagina } from "./utils/rastreamento";

// Carregado só quando alguém abre /painel — o mapa e os gráficos não pesam no site.
const Painel = lazy(() => import("./pages/painel/Painel"));

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    registrarPagina(pathname);
  }, [pathname]);

  return (
    <HelmetProvider>
      <PlanProvider>
        <Analytics />
        <SpeedInsights />
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
            <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/termos-uso" element={<TermosUso />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/planos" element={<Planos />} />
            <Route path="/proposta" element={<Proposta />} />
          </Route>

          {/* Painel interno de acessos — fora dos layouts do site */}
          <Route
            path="/painel"
            element={
              <Suspense fallback={<div className="min-h-screen bg-black" />}>
                <Painel />
              </Suspense>
            }
          />

          {/* 🧼 ROTAS SEM HEADER */}
          <Route element={<CleanLayout />}>

          </Route>

        </Routes>
      </PlanProvider>
    </HelmetProvider>
  );
}
