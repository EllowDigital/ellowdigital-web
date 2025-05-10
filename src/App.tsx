
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import TeamPage from "./pages/TeamPage";
import RefundPolicy from "./pages/RefundPolicy";
import CookiesPolicy from "./pages/CookiesPolicy";
import { initPerformanceOptimizations } from "@/utils/performanceUtils";
import { initPerformanceMonitoring } from "@/utils/performanceMonitoring";
import { SkipToContent } from "@/components/accessibility/SkipToContent";
import { AxiosInterceptor } from "@/utils/axiosInterceptor";

// Create and configure the React Query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      networkMode: "offlineFirst", // Network-first approach for initial fetch, then cache
    },
  },
});

const App = () => {
  useEffect(() => {
    // Initialize performance optimizations and monitoring on mount
    const cleanupPerformance = initPerformanceOptimizations();
    initPerformanceMonitoring();

    // Cleanup performance optimizations on unmount
    return () => cleanupPerformance();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <TooltipProvider>
          {/* Accessibility skip link */}
          <SkipToContent />

          {/* API request interceptor */}
          <AxiosInterceptor />

          {/* Toaster notifications */}
          <Toaster />
          <Sonner />

          {/* Routing setup */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/cookies-policy" element={<CookiesPolicy />} />
            <Route path="/team" element={<TeamPage />} />
            {/* Add additional custom routes here */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
