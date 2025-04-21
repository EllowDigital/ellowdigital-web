
import { Users, Activity, Eye, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";

const processes = [
  {
    icon: Users,
    title: "Personalized Collaboration",
    description: "Direct communication and tailored solutions for your unique needs"
  },
  {
    icon: Activity,
    title: "Agile Methodology",
    description: "Iterative development with flexible adaptation to changes"
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Clear communication and regular progress updates"
  },
  {
    icon: Check,
    title: "Quality Delivery",
    description: "Rigorous testing and optimization for top performance"
  }
];

const WorkProcess = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    if (dividerRef.current) {
      observer.observe(dividerRef.current);
    }

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
      if (dividerRef.current) {
        observer.unobserve(dividerRef.current);
      }
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section id="how-we-work" className="section-container py-24 relative overflow-hidden snap-start">
      {/* Blob background */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl morph-shape"></div>
      
      <div className="max-w-6xl mx-auto">
        <h2 ref={titleRef} className="section-title reveal-animate">How We Work</h2>
        <div ref={dividerRef} className="animated-divider reveal-animate mb-16"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processes.map((process, index) => (
            <div 
              key={index} 
              className="relative"
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            >
              <Card 
                className="h-full neo-effect card-3d tilt-effect transition-all duration-300 border border-border reveal-animate"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  opacity: 0,
                  transform: 'translateY(20px)'
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-brand-yellow/10 rounded-full blur-xl"></div>
                    <div className="relative z-10 w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-gradient-to-br from-brand-gold/20 to-brand-yellow/20 backdrop-blur-sm border border-brand-yellow/30">
                      <process.icon className="w-8 h-8 text-brand-yellow" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{process.title}</h3>
                  <p className="text-muted-foreground">{process.description}</p>
                </CardContent>
              </Card>
              {index < processes.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                  <div className="w-6 h-6 rounded-full bg-brand-yellow/10 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
