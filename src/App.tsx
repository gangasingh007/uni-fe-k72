import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SubjectPage from "./pages/Subject";
import CustomCursor from "./components/CustomCursor";
import StairTransition from "./components/StairTransition";
import Navbar from "./components/Navbar";
import { Footer } from "react-day-picker";

const queryClient = new QueryClient();

const App = () => (
  <>
  <StairTransition />
    <CustomCursor />
    <Navbar />
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/subjects/resources" element={<SubjectPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
   
  </>
);

export default App;
