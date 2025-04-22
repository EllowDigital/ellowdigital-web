
import { Award, ThumbsUp, Users, Timer } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const metrics = [
  {
    icon: Users,
    value: 150,
    label: "Happy Clients",
    suffix: "+",
    color: "from-brand-gold to-brand-yellow"
  },
  {
    icon: ThumbsUp,
    value: 98,
    label: "Client Satisfaction",
    suffix: "%",
    color: "from-brand-gold to-brand-yellow"
  },
  {
    icon: Award,
    value: 25,
    label: "Industry Awards",
    suffix: "+",
    color: "from-brand-gold to-brand-yellow"
  },
  {
    icon: Timer,
    value: 5,
    label: "Years of Experience",
    suffix: "+",
    color: "from-brand-gold to-brand-yellow"
  }
];

const ImpactMetrics = () => {
  const [counts, setCounts] = useState<number[]>(metrics.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            
            if (entry.target === sectionRef.current && !hasAnimated) {
              animateCounters();
              setHasAnimated(true);
            }
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (dividerRef.current) observer.observe(dividerRef.current);
    if (sectionRef.current) observer.observe(sectionRef.current);
    metricsRef.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (dividerRef.current) observer.unobserve(dividerRef.current);
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      metricsRef.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      
      const newCounts = metrics.map((metric, index) => {
        const progress = Math.min(frame / totalFrames, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4); // Easing function
        return Math.floor(metric.value * easeOutQuart);
      });
      
      setCounts(newCounts);
      
      if (frame === totalFrames) {
        clearInterval(interval);
        // Ensure final values are exact
        setCounts(metrics.map(metric => metric.value));
      }
    }, frameDuration);
  };

  return (
    <section 
      id="impact" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden snap-start"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-brand-yellow/5 dark:from-black/20 dark:to-brand-yellow/10 backdrop-blur-3xl -z-10"></div>
      
      <div className="section-container max-w-6xl mx-auto">
        <h2 ref={titleRef} className="section-title reveal-animate">Our Impact</h2>
        <div ref={dividerRef} className="animated-divider reveal-animate mb-20"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              ref={el => metricsRef.current[index] = el}
              className="reveal-animate"
              style={{ 
                transitionDelay: `${index * 100}ms`,
                opacity: 0,
                transform: 'translateY(20px)'
              }}
            >
              <div className="text-center p-6 neo-effect rounded-xl card-3d">
                <div className="mb-6 relative mx-auto">
                  <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center bg-gradient-to-br from-brand-gold/20 to-brand-yellow/20 backdrop-blur-sm border border-brand-yellow/30">
                    <metric.icon className="w-10 h-10 text-brand-yellow" />
                  </div>
                </div>
                
                <div className="relative">
                  <h3 className="text-4xl font-bold mb-2">
                    <span className="bg-gradient-to-r bg-clip-text text-transparent from-brand-gold to-brand-yellow">
                      {counts[index]}
                    </span>
                    <span className="text-brand-yellow">{metric.suffix}</span>
                  </h3>
                  <p className="text-lg font-medium">{metric.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
