
import { useEffect } from "react";
import { ThemeProvider } from "@/hooks/useTheme";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TechStack from "@/components/TechStack";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedOffers from "@/components/FeaturedOffers";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { initScrollRevealAnimations, init3DTiltEffect } from "@/utils/animationUtils";

const Index = () => {
  useEffect(() => {
    // Initialize animations when component mounts
    const cleanupScrollReveal = initScrollRevealAnimations();
    const cleanupTiltEffect = init3DTiltEffect();
    
    // Clean up event listeners on unmount
    return () => {
      cleanupScrollReveal();
      cleanupTiltEffect();
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <TechStack />
          <WhyChooseUs />
          <FeaturedOffers />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
