
import { Users, Activity, Eye, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <section id="how-we-work" className="section-container">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">How We Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processes.map((process, index) => (
            <Card key={index} className="glass-effect hover-scale transition-all duration-300 border border-border">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <process.icon className="w-12 h-12 mx-auto text-brand-yellow" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{process.title}</h3>
                <p className="text-sm text-muted-foreground">{process.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
