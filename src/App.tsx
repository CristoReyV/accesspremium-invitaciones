import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WeddingEditorial from "./pages/templates/WeddingEditorial";
import TemplateDemoPage from "./pages/TemplateDemoPage";
import { DEMO_ROUTE_CATEGORIES } from "./config/routes";
import InvitationRouting from "./routing/InvitationRouting";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <InvitationRouting>
        <Routes>
          {/* Landing principal */}
          <Route path="/" element={<Index />} />

          {/* Demo legacy (compatibilidad hacia atrás) */}
          <Route path="/demo/boda-editorial" element={<WeddingEditorial />} />

          {/*
           * Rutas dinámicas de demos — /:category/:slug
           * Cada categoría registra su propia ruta para que React Router
           * pueda matchear correctamente y evitar colisiones con rutas futuras.
           * En Fase 3 cada plantilla tendrá su propio componente visual.
           */}
          {DEMO_ROUTE_CATEGORIES.map((category) => (
            <Route
              key={category}
              path={`/${category}/:slug`}
              element={<TemplateDemoPage />}
            />
          ))}

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </InvitationRouting>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
