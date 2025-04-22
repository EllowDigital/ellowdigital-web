
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Initialize animations when component mounts
    const cleanupScrollReveal = initScrollRevealAnimations();
    const cleanupTiltEffect = init3DTiltEffect();
    const cleanup3DCode = init3DCodeAnimation();
    const cleanupTyping = initTypingAnimation();
    
    // Set initialized state to avoid re-initializing animations
    setIsInitialized(true);
    
    // Clean up event listeners on unmount
    return () => {
      clearTimeout(timer);
      cleanupScrollReveal();
      cleanupTiltEffect();
      cleanup3DCode();
      cleanupTyping();
    };
  }, []);

  return (
    <>
      {/* Enhanced Preloader with smooth transition */}
      {isLoading && <Preloader />}
      
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#191919',
            color: '#F6F6F6',
            border: '1px solid #222222',
          },
          success: {
            style: {
              background: 'rgba(25, 25, 25, 0.95)',
              color: '#F6F6F6',
              border: '1px solid #FFD700',
            },
            icon: '✓'
          }
        }}
      />
      
      <div className={`min-h-screen flex flex-col transition-all duration-500 bg-background text-foreground ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
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
