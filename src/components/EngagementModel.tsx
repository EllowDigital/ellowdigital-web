
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    title: "Consultation",
    description: "In-depth discussion of your project requirements and goals"
  },
  {
    title: "Custom Proposal",
    description: "Detailed project scope, timeline, and cost estimation"
  },
  {
    title: "Design & Development",
    description: "Iterative development with regular updates and feedback"
  },
  {
    title: "Delivery & Support",
    description: "Project deployment and continued maintenance support"
  }
];

const EngagementModel = () => {
  return (
    <section id="engagement" className="section-container bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">Our Engagement Model</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full p-6 glass-effect hover-scale transition-all duration-300">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-4 h-4 text-brand-purple" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngagementModel;
