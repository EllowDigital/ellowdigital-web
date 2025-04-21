
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-blue/10 via-brand-purple/5 to-transparent"></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-brand-purple/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl"></div>
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Crafting Innovative
              <span className="gradient-text block">Digital Experiences</span>
              with Passion & Precision
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Transforming bold ideas into intuitive, scalable, and future-proof solutions
              for businesses of all sizes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-brand-purple hover:bg-brand-darkPurple text-white">
                <a href="#contact">
                  Start Your Journey With Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#services">Explore Our Services</a>
              </Button>
            </div>
          </div>

          <div className="relative animate-fade-in-right hidden lg:block">
            <div className="absolute top-0 right-0 w-full h-full bg-brand-cyan/5 rounded-2xl transform rotate-3"></div>
            <div className="relative bg-card border shadow-lg p-6 rounded-2xl">
              <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
                <div className="text-white text-xl font-bold">EllowDigitals</div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-muted rounded-full w-3/4"></div>
                <div className="h-4 bg-muted rounded-full w-1/2"></div>
                <div className="h-4 bg-muted rounded-full w-5/6"></div>
                <div className="h-4 bg-muted rounded-full w-2/3"></div>
              </div>
              <div className="mt-6 flex justify-end">
                <div className="h-10 bg-brand-purple rounded-lg w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
