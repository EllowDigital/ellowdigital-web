
import { 
  UserCheck, 
  Zap, 
  Clock, 
  RefreshCw, 
  MessageSquare 
} from "lucide-react";
import { useEffect, useRef } from "react";
import { init3DTiltEffect } from "@/utils/animationUtils";

const reasons = [
  {
    title: "Personalized Collaboration",
    description: "Direct 1-on-1 communication throughout the project lifecycle for a truly personalized experience.",
    icon: UserCheck
  },
  {
    title: "Fast & Responsive Architecture",
    description: "Optimized performance for lightning-fast load times and seamless user experiences across all devices.",
    icon: Zap
  },
  {
    title: "On-time, Within Budget",
    description: "Strict adherence to project timelines and budget constraints without compromising on quality.",
    icon: Clock
  },
  {
    title: "Post-launch Support",
    description: "Comprehensive support and real-time updates even after your project goes live.",
    icon: RefreshCw
  },
  {
    title: "Transparent Communication",
    description: "Clear, jargon-free communication with regular updates on project milestones and progress.",
    icon: MessageSquare
  }
];

const WhyChooseUs = () => {
  const tiltCardsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add 3D tilt effect to the cards
    const cleanupTiltEffect = init3DTiltEffect();
    
    return () => {
      cleanupTiltEffect();
    };
  }, []);

  return (
    <section id="why-us" className="py-24 relative overflow-hidden">
      {/* Background elements for depth */}
      <div className="absolute -z-10 top-1/4 right-1/4 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl morph-shape"></div>
      <div className="absolute -z-10 bottom-1/3 left-1/4 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl morph-shape" style={{ animationDelay: '5s' }}></div>
      
      <div className="section-container">
        <h2 className="section-title reveal-animate" data-animation="fade-up">Why Choose EllowDigitals?</h2>
        <div className="animated-divider reveal-animate" data-animation="zoom-in"></div>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-16 reveal-animate" data-animation="fade-up">
          We pride ourselves on delivering exceptional value and building lasting relationships with our clients.
        </p>

        <div ref={tiltCardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="tilt-effect bg-card p-6 rounded-xl border border-border/60 shadow-sm card-hover reveal-animate"
              data-animation="fade-up"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Add a subtle glare element for 3D effect - managed by our tilt effect JS */}
              <div className="glare"></div>
              
              <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4 transform transition-transform hover:scale-110 duration-300">
                <reason.icon className="h-6 w-6 text-brand-gold" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-brand-gold to-brand-yellow rounded-xl p-8 flex justify-center items-center tilt-effect" style={{ perspective: "1000px" }}>
          <div className="glare"></div>
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-black">Ready to elevate your digital presence?</h3>
            <p className="mb-6 text-black/90">
              Let's collaborate to create something exceptional that elevates your brand and engages your audience.
            </p>
            <a 
              href="#contact" 
              className="inline-block relative overflow-hidden bg-black text-brand-yellow font-medium py-3 px-8 rounded-lg text-lg shadow hover:bg-black/90 hover:text-brand-yellow border-2 border-black transition-all duration-300 group"
            >
              <span className="relative z-10 flex items-center group-hover:translate-x-1 transition-transform">
                Let's Talk
                <svg className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              
              {/* 3D hover glow effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-brand-gold/20 to-brand-yellow/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105"></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
