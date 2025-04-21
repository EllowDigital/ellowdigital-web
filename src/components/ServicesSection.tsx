
import { Code, Smartphone, Layout, Search, Server, HeartPulse } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Web Development",
    description: "Lightning-fast, mobile-first, SEO-optimized websites using modern technologies.",
    icon: Code,
    details: "HTML5, CSS3, React, Node.js"
  },
  {
    title: "Mobile App Development",
    description: "Beautiful and intuitive apps for Android and iOS platforms.",
    icon: Smartphone,
    details: "Flutter, React Native, Native Tools"
  },
  {
    title: "UI/UX Design",
    description: "Clean, user-centered, and accessible interfaces that drive engagement.",
    icon: Layout,
    details: "Wireframing, Prototyping, User Testing"
  },
  {
    title: "SEO & Performance",
    description: "Implementing rank-ready strategies and speed optimizations for conversions.",
    icon: Search,
    details: "Technical SEO, Speed Optimization"
  },
  {
    title: "Custom Software",
    description: "Tailored tools and automation systems to improve business efficiency.",
    icon: Server,
    details: "Business Solutions, Automation"
  },
  {
    title: "Maintenance & Support",
    description: "Ongoing updates, bug fixes, and expert consultation for your projects.",
    icon: HeartPulse,
    details: "Updates, Security, Performance"
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Services</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From concept to deployment, we provide comprehensive digital services
            to help your business thrive in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="card-hover border border-border/60 overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-brand-purple to-brand-cyan"></div>
              <CardHeader className="pb-2">
                <div className="text-brand-purple mb-3">
                  <service.icon className="h-10 w-10" />
                </div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs font-medium bg-secondary py-1 px-2 rounded-full inline-block">
                  {service.details}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
