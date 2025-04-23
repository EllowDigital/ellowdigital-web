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
          {/* Left Section: Introduction */}
          <div className="space-y-6 order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold">
              About <span className="gradient-text">EllowDigitals</span>
            </h2>

            <p className="text-muted-foreground text-lg md:text-xl">
              At EllowDigitals, we are a solo-powered micro-agency dedicated to delivering high-performance websites,
              mobile apps, and software solutions that are tailored to your unique business needs.
            </p>

            <p className="text-muted-foreground text-lg md:text-xl">
              We believe that every project is an opportunity to make a lasting impact. That's why we focus on quality,
              efficiency, and user-centric design to ensure that our solutions not only meet your needs but exceed expectations.
            </p>

            {/* Highlights List */}
            <ul className="space-y-3 mt-6">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-purple" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section: Mission and Philosophy */}
          <div className="relative order-1 lg:order-2">
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-purple/20 to-brand-cyan/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-card rounded-2xl overflow-hidden shadow-lg">
              <div className="p-6 space-y-6">
                <div className="w-20 h-1 bg-brand-purple"></div>

                {/* Mission Section */}
                <h3 className="text-2xl font-bold">Our Mission</h3>
                <p className="text-muted-foreground md:text-lg">
                  Our mission is to empower businesses with meaningful digital experiences. By blending innovative
                  technology, agile development, and human-centered design, we create results that not only meet your
                  goals but resonate with your audience.
                </p>

                {/* Philosophy Section */}
                <h3 className="text-2xl font-bold mt-8">Our Philosophy</h3>
                <p className="text-muted-foreground md:text-lg">
                  Our philosophy is simple: technology should empower people. With a passion for creating impactful digital experiences,
                  we blend innovative technology with human-centered design to bring your boldest ideas to life. Every solution is
                  crafted to be scalable, intuitive, and future-proof.
                </p>

                {/* Quote */}
                <div className="bg-muted p-4 rounded-lg mt-6">
                  <p className="text-sm italic">
                    "Every line of code and every pixel should serve a purpose — to create beautiful experiences that solve real problems."
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
