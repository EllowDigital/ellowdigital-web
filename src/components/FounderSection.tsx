
import { Card, CardContent } from "@/components/ui/card";

const FounderSection = () => {
  return (
    <section id="founder" className="section-container">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">Meet Our Founder</h2>
        <Card className="glass-effect hover-scale transition-all duration-300">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Founder"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">John Doe</h3>
                <p className="text-muted-foreground">Founder & CEO</p>
                <p className="text-base">
                  With over a decade of experience in digital innovation, I founded EllowDigitals 
                  with a vision to transform how businesses approach their digital presence. 
                  Our commitment to excellence and personalized service drives everything we do.
                </p>
                <div className="pt-4">
                  <p className="font-semibold">Our Vision</p>
                  <p className="text-muted-foreground">
                    To empower businesses through innovative digital solutions that drive growth 
                    and success in an ever-evolving digital landscape.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FounderSection;
