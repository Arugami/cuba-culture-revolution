import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const loadFont = async () => {
      const font = new FontFace(
        'Sorts Mill Goudy',
        'url(https://fonts.gstatic.com/s/sortsmillgoudy/v15/Qw3GZR9MED_6PSuS_50nEaVrfzgEbH8Eig.woff2)'
      );
      try {
        await font.load();
        document.fonts.add(font);
        console.log('Sorts Mill Goudy font loaded successfully');
      } catch (error) {
        console.error('Error loading Sorts Mill Goudy font:', error);
      }
    };
    loadFont();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;