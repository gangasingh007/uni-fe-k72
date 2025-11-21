import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SubjectPage from "./pages/Subject";
import CustomCursor from "./components/CustomCursor";
import StairTransition from "./components/StairTransition";
import Navbar from "./components/Navbar";
import SummaryPage from "./pages/SummaryPage";
import Syllabus from "./pages/Syllabus";
import DateSheet from "./pages/DateSheet";
import ExplorePage from "./ExplorePage";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== "/summary" && location.pathname !== "/syllabus" && location.pathname !== "/datesheet" ;

  return (
    <>
      <StairTransition />
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/subjects/resources" element={<SubjectPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/syllabus" element={<Syllabus />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/datesheet" element={<DateSheet />} />
      </Routes>
    </>
  );
};

const App = () => (
  <>
    <CustomCursor />
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </>
);

export default App;
