
import { User, Mail, Briefcase, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FounderSection = () => {
  return (
    <section id="founder" className="section-container py-20 relative overflow-hidden">
      {/* Floating blob background */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-brand-yellow/5 rounded-full blur-3xl morph-shape"></div>
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl morph-shape" style={{ animationDelay: '7s' }}></div>
      
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title reveal-animate">Meet Our Founder</h2>
        <div className="animated-divider reveal-animate mb-12"></div>
        
        <Card className="glass-effect hover-scale transition-all duration-300 neo-effect overflow-hidden tilt-effect reveal-animate">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-5 gap-0">
              {/* Image section (2/5 width) */}
              <div className="md:col-span-2 relative aspect-square md:aspect-auto overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Founder"
                  className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
                />
                {/* Social icons */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-yellow hover:text-black transition-colors">
                    <Mail className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-yellow hover:text-black transition-colors">
                    <User className="h-5 w-5" />
                  </a>
                </div>
              </div>
              
              {/* Content section (3/5 width) */}
              <div className="md:col-span-3 p-8 space-y-4">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <h3 className="text-2xl font-bold">John Doe</h3>
                    <p className="text-brand-yellow">Founder & CEO</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-yellow/10 text-brand-yellow">
                      <Briefcase className="w-3 h-3 mr-1" /> Tech Visionary
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-yellow/10 text-brand-yellow">
                      <Award className="w-3 h-3 mr-1" /> 10+ Yrs Exp
                    </span>
                  </div>
                </div>
                
                <p className="text-base">
                  With over a decade of experience in digital innovation, I founded EllowDigitals 
                  with a vision to transform how businesses approach their digital presence. 
                  Our commitment to excellence and personalized service drives everything we do.
                </p>
                
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold">Our Vision</p>
                  <p className="text-muted-foreground">
                    "To empower businesses through innovative digital solutions that drive growth 
                    and success in an ever-evolving digital landscape. We believe technology should 
                    make life simpler, not more complex."
                  </p>
                </div>
                
                <Button className="mt-4 bg-brand-yellow text-black hover:bg-brand-gold">
                  Connect With Me
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FounderSection;
