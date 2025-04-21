
import { 
  UserCheck, 
  Zap, 
  Clock, 
  RefreshCw, 
  MessageSquare 
} from "lucide-react";

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
  return (
    <section id="why-us" className="py-24">
      <div className="section-container">
        <h2 className="section-title">Why Choose EllowDigitals?</h2>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-16">
          We pride ourselves on delivering exceptional value and building lasting relationships with our clients.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="bg-card p-6 rounded-xl border border-border/60 shadow-sm card-hover"
            >
              <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                <reason.icon className="h-6 w-6 text-brand-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-brand-blue to-brand-purple rounded-xl p-8 text-white">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to elevate your digital presence?</h3>
            <p className="mb-6">
              Let's collaborate to create something exceptional that elevates your brand and engages your audience.
            </p>
            <a 
              href="#contact" 
              className="inline-block bg-white text-brand-purple font-medium py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
