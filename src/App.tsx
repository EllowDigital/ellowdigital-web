import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { initPerformanceOptimizations } from "@/utils/performanceUtils";

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
    // Initialize performance optimizations on mount
    const cleanupPerformance = initPerformanceOptimizations();

    // Cleanup performance optimizations on unmount
    return () => cleanupPerformance();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <TooltipProvider>
          {/* Toaster notifications */}
          <Toaster />
          <Sonner />

          {/* Routing setup */}
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Add additional custom routes here */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
