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
        'Patua One',
        'url(https://fonts.gstatic.com/s/patuaone/v20/ZXuke1cDvLCKLDcimxB44_luFgxbuQ.woff2)'
      );
      try {
        await font.load();
        document.fonts.add(font);
        console.log('Patua One font loaded successfully');
      } catch (error) {
        console.error('Error loading Patua One font:', error);
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