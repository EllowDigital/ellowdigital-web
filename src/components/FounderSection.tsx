
import { User, Mail, Briefcase, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FounderSection = () => {
  return (
    <section id="founder" className="section-container py-20 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/3 right-1/4 w-56 h-56 md:w-72 md:h-72 bg-brand-yellow/10 rounded-full blur-3xl morph-shape"></div>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 md:w-96 md:h-96 bg-brand-gold/10 rounded-full blur-3xl morph-shape" style={{ animationDelay: '7s' }}></div>

      <div className="max-w-4xl mx-auto">
        <h2 className="section-title reveal-animate">Meet Our Founder</h2>
        <div className="animated-divider reveal-animate mb-12"></div>

        <Card className="glass-effect hover-scale transition-all duration-300 neo-effect overflow-hidden tilt-effect reveal-animate">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row gap-0">
              {/* Founder Image */}
              <div className="md:w-2/5 w-full relative flex-shrink-0">
                <img
                  src="/images/founder.jpg"
                  alt="Founder"
                  className="object-cover w-full h-56 md:h-full rounded-t-xl md:rounded-t-none md:rounded-l-xl transition-transform duration-700 hover:scale-105"
                  style={{ aspectRatio: "1/1.1", objectFit: "cover", maxHeight: "360px" }}
                />
                {/* Social Icons */}
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <a href="mailto:sarwanyadav6174@gmail.com" className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-yellow hover:text-black transition-colors">
                    <Mail className="h-5 w-5" />
                  </a>
                  <a href="https://sarwan.netlify.app/" className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-yellow hover:text-black transition-colors">
                    <User className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                  <div>
                    <h3 className="text-2xl font-bold">Sarwan Yadav</h3>
                    <p className="text-brand-yellow">Founder & CEO</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-yellow/10 text-brand-yellow">
                      <Briefcase className="w-3 h-3 mr-1" /> Tech Visionary
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-yellow/10 text-brand-yellow">
                      <Award className="w-3 h-3 mr-1" /> 1+ Yrs Exp
                    </span>
                  </div>
                </div>

                <p className="text-base">
                  With over a decade of experience in digital innovation, I founded EllowDigitals to revolutionize how businesses approach their digital presence. Our focus on excellence and personalized service is what drives every aspect of our work.
                </p>

                <div className="pt-4 border-t border-border">
                  <p className="font-semibold">Our Vision</p>
                  <p className="text-muted-foreground">
                    "To empower businesses through innovative digital solutions that fuel growth and success in an ever-evolving landscape. We believe technology should simplify, not complicate, life."
                  </p>
                </div>

                <Button 
                  className="mt-4 bg-brand-yellow text-black hover:bg-brand-gold w-full md:w-auto rounded-xl py-3 text-lg font-semibold shadow-lg"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
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
