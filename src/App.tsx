import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Gallery from "./pages/Gallery";
import Booking from "./pages/Booking";
import CorporateGifts from "./pages/CorporateGifts";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import NotFound from "./pages/NotFound";
import StickyEnquiry from "./components/StickyEnquiry";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Inbox from "./pages/dashboard/Inbox";
import Properties from "./pages/dashboard/Properties";
import Inquiries from "./pages/dashboard/Inquiries";
import Contacts from "./pages/dashboard/Contacts";
import Plans from "./pages/dashboard/Plans";
import Transactions from "./pages/dashboard/Transactions";
import Profile from "./pages/dashboard/Profile";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/dashboard/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <StickyEnquiry />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/corporate" element={<CorporateGifts />} />
            <Route path="/corporate/:category" element={<CorporateGifts />} />
            <Route path="/corporate/:category/:productId" element={<CorporateGifts />} />
            <Route path="/corporate-gifts" element={<CorporateGifts />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/inbox"
              element={
                <ProtectedRoute>
                  <Inbox />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/properties"
              element={
                <ProtectedRoute>
                  <Properties />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/inquiries"
              element={
                <ProtectedRoute>
                  <Inquiries />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/contacts"
              element={
                <ProtectedRoute>
                  <Contacts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/plans"
              element={
                <ProtectedRoute>
                  <Plans />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/transactions"
              element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
