
import { CheckCircle } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    "Solo-powered micro-agency",
    "Creative UI/UX design",
    "Clean, efficient code",
    "Personalized strategies",
    "Future-proof solutions"
  ];

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold">
              About <span className="gradient-text">EllowDigitals</span>
            </h2>

            <p className="text-muted-foreground text-lg">
              EllowDigitals is a solo-powered micro-agency and digital studio specializing in crafting
              high-performance websites, mobile apps, and software solutions tailored to your unique needs.
            </p>

            <p className="text-muted-foreground text-lg">
              With a passion for creating impactful digital experiences, I blend innovative
              technology with human-centered design to transform bold ideas into intuitive,
              scalable, and future-proof solutions.
            </p>

            <ul className="space-y-3 mt-6">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-purple" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-purple/20 to-brand-cyan/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-card rounded-2xl overflow-hidden shadow-lg">
              <div className="p-6 space-y-6">
                <div className="w-20 h-1 bg-brand-purple"></div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
                <p className="text-muted-foreground">
                  We empower businesses through meaningful digital experiences by blending innovative
                  technology, agile development, and human-centered design to deliver results that resonate.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm italic">
                    "Every line of code and every pixel should serve a purpose — to create beautiful
                    experiences that solve real problems."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
