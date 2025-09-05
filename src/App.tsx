import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AutomobilesPage from "./pages/AutomobilesPage";
import ClothingPage from "./pages/ClothingPage";
import RealEstatePage from "./pages/RealEstatePage";
import OtherPage from "./pages/OtherPage";
import CategoriesPage from "./pages/CategoriesPage";
import AdminPanel from "./pages/AdminPanel";
import CreateAdPage from "./pages/CreateAdPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/automobiles/*" element={<AutomobilesPage />} />
            <Route path="/clothing/*" element={<ClothingPage />} />
            <Route path="/real-estate/*" element={<RealEstatePage />} />
            <Route path="/other/*" element={<OtherPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/create-ad" element={<CreateAdPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
