import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Comprar from "./pages/Comprar";
import Vender from "./pages/Vender";
import Testimonios from "./pages/Testimonios";
import Contacto from "./pages/Contacto";
import PoliticasPrivacidad from "./pages/PoliticasPrivacidad";
import TerminosCondiciones from "./pages/TerminosCondiciones";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/comprar" element={<Comprar />} />
              <Route path="/vender" element={<Vender />} />
              <Route path="/testimonios" element={<Testimonios />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/politicas-privacidad" element={<PoliticasPrivacidad />} />
              <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppFloat />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
