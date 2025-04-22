
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TechStack from "@/components/TechStack";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedOffers from "@/components/FeaturedOffers";
import Footer from "@/components/Footer";
import FounderSection from "@/components/FounderSection";
import EngagementModel from "@/components/EngagementModel";
import WorkProcess from "@/components/WorkProcess";
import Testimonials from "@/components/Testimonials";
import Portfolio from "@/components/Portfolio";
import ImpactMetrics from "@/components/ImpactMetrics";
import SmartContactForm from "@/components/SmartContactForm";
import { initScrollRevealAnimations, init3DTiltEffect, init3DCodeAnimation, initTypingAnimation } from "@/utils/animationUtils";
import Preloader from "@/components/Preloader";
import { Toaster } from "sonner";

const Index = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize animations when component mounts
    const cleanupScrollReveal = initScrollRevealAnimations();
    const cleanupTiltEffect = init3DTiltEffect();
    const cleanup3DCode = init3DCodeAnimation();
    const cleanupTyping = initTypingAnimation();
    
    // Set initialized state to avoid re-initializing animations
    setIsInitialized(true);
    
    // Clean up event listeners on unmount
    return () => {
      cleanupScrollReveal();
      cleanupTiltEffect();
      cleanup3DCode();
      cleanupTyping();
    };
  }, []);

  return (
    <>
      {/* Preloader appears above all once, auto-removes when loaded */}
      <Preloader />
      <Toaster position="top-right" />
      <div className="min-h-screen flex flex-col transition-colors duration-300 bg-background text-foreground">
        <Navbar />
        <main className="flex-grow overflow-x-hidden">
          <HeroSection />
          <AboutSection />
          <FounderSection />
          <ServicesSection />
          <WorkProcess />
          <EngagementModel />
          <Portfolio />
          <ImpactMetrics />
          <Testimonials />
          <TechStack />
          <WhyChooseUs />
          <FeaturedOffers />
          <SmartContactForm />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
