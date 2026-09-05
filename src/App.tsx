import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Sonner removed: it injects a top-of-DOM <section> that pushed the navbar down
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import PressResources from "./pages/PressResources.tsx";
import AuctionPage from "./pages/AuctionPage.tsx";
import AuctionBidPage from "./pages/AuctionBidPage.tsx";
import { CookieBanner } from "@/components/CookieBanner.tsx";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Analytics />
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/press" element={<PressResources />} />
          <Route path="/auction" element={<AuctionPage />} />
          <Route path="/auction/bid" element={<AuctionBidPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <CookieBanner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

