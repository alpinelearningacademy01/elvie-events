import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import Booking from "./pages/Booking";
import CorporateGifts from "./pages/CorporateGifts";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import NotFound from "./pages/NotFound";
import StickyEnquiry from "./components/StickyEnquiry";
import { ThemeProvider } from "./context/ThemeContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <StickyEnquiry />
          <Routes>
                {/* ── Public routes ── */}
                <Route path="/" element={<Index />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/events" element={<Events />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/corporate" element={<CorporateGifts />} />
                <Route path="/corporate/:category" element={<CorporateGifts />} />
                <Route path="/corporate/:category/:productId" element={<CorporateGifts />} />
                <Route path="/corporate-gifts" element={<CorporateGifts />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

                {/* ── 404 ── */}
                <Route path="*" element={<NotFound />} />
              </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
