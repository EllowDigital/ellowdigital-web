
import { 
  UserCheck, 
  Zap, 
  Clock, 
  RefreshCw, 
  MessageSquare,
  ArrowRight
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { init3DTiltEffect } from "@/utils/animationUtils";

const reasons = [
  {
    title: "Personalized Collaboration",
    description: "Direct 1-on-1 communication throughout the project lifecycle for a truly personalized experience.",
    icon: UserCheck,
    color: "from-brand-gold/40 to-brand-yellow/40"
  },
  {
    title: "Fast & Responsive Architecture",
    description: "Optimized performance for lightning-fast load times and seamless user experiences across all devices.",
    icon: Zap,
    color: "from-brand-gold/40 to-brand-yellow/60"
  },
  {
    title: "On-time, Within Budget",
    description: "Strict adherence to project timelines and budget constraints without compromising on quality.",
    icon: Clock,
    color: "from-brand-gold/50 to-brand-yellow/50"
  },
  {
    title: "Post-launch Support",
    description: "Comprehensive support and real-time updates even after your project goes live.",
    icon: RefreshCw,
    color: "from-brand-gold/60 to-brand-yellow/40"
  },
  {
    title: "Transparent Communication",
    description: "Clear, jargon-free communication with regular updates on project milestones and progress.",
    icon: MessageSquare,
    color: "from-brand-gold/70 to-brand-yellow/30"
  }
];

const WhyChooseUs = () => {
  const tiltCardsRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  useEffect(() => {
    // Add 3D tilt effect to the cards
    const cleanupTiltEffect = init3DTiltEffect();
    
    return () => {
      cleanupTiltEffect();
    };
  }, []);

  return (
    <section id="why-us" className="py-24 relative overflow-hidden">
      {/* Enhanced background elements with depth */}
      <div className="absolute -z-10 top-1/4 right-1/4 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl morph-shape opacity-80"></div>
      <div className="absolute -z-10 bottom-1/3 left-1/4 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl morph-shape opacity-80" style={{ animationDelay: '5s' }}></div>
      <div className="absolute -z-10 top-2/3 right-1/3 w-64 h-64 bg-white/5 rounded-full blur-3xl morph-shape opacity-60" style={{ animationDelay: '8s' }}></div>
      
      <div className="section-container max-w-6xl mx-auto">
        <h2 className="section-title text-4xl font-bold mb-3 reveal-animate" data-animation="fade-up">Why Choose EllowDigitals?</h2>
        <div className="animated-divider reveal-animate mb-4" data-animation="zoom-in"></div>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-16 reveal-animate" data-animation="fade-up">
          We pride ourselves on delivering exceptional value and building lasting relationships with our clients.
        </p>

        <div ref={tiltCardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="tilt-effect bg-card/80 backdrop-blur-sm p-8 rounded-xl border border-border/60 shadow-lg hover:shadow-xl transition-all duration-500 card-hover reveal-animate group"
              data-animation="fade-up"
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Enhanced glare element for 3D effect */}
              <div className="glare"></div>
              
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${reason.color} flex items-center justify-center mb-6 transform transition-all duration-300 group-hover:scale-110`}>
                <reason.icon className="h-7 w-7 text-brand-gold" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-brand-yellow transition-colors duration-300">{reason.title}</h3>
              <p className="text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">{reason.description}</p>
              
              {/* Animated link indicator */}
              <div className="mt-4 h-0.5 w-0 bg-brand-yellow group-hover:w-12 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-brand-gold/90 to-brand-yellow/90 rounded-2xl p-10 flex flex-col md:flex-row justify-between items-center gap-8 tilt-effect reveal-animate transform hover:scale-[1.01] transition-all duration-500 shadow-xl" style={{ perspective: "1000px" }} data-animation="fade-up">
          <div className="glare"></div>
          <div className="text-center md:text-left max-w-2xl">
            <h3 className="text-3xl font-bold mb-4 text-black">Ready to elevate your digital presence?</h3>
            <p className="mb-0 text-black/90 text-lg">
              Let's collaborate to create something exceptional that elevates your brand and engages your audience.
            </p>
          </div>
          <a 
            href="#contact" 
            className="inline-block relative overflow-hidden bg-black text-brand-yellow font-medium py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <span className="relative z-10 flex items-center group-hover:translate-x-1 transition-transform">
              Let's Talk
              <ArrowRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </span>
            
            {/* Enhanced 3D hover glow effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-black to-black/90 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"></span>
            <span className="absolute -inset-1 bg-gradient-to-r from-brand-gold/20 to-brand-yellow/20 blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
