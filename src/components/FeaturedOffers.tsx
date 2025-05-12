
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const offers = [
  {
    title: "Indian Business Website",
    price: "₹15,999",
    description: "Perfect for Indian businesses looking to establish a digital presence.",
    features: [
      "Fully responsive design",
      "SEO optimization for Indian market",
      "Contact form integration",
      "Social media links",
      "Fast loading times",
      "Basic analytics setup"
    ],
    isPopular: true
  },
  {
    title: "School CS Projects",
    price: "Starting at ₹4,999",
    description: "Expert-crafted projects to help Indian students score high.",
    features: [
      "Class 12 CBSE computer science projects",
      "Well-documented code with Hindi comments",
      "Fast delivery within India",
      "Live support in Hindi/English",
      "Report preparation",
      "Project demonstration help"
    ],
    isPopular: false
  }
];

const FeaturedOffers = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="offers" className="py-24 bg-gradient-to-b from-background to-background/95">
      <div className="section-container">
        <h2 className="section-title">Featured Offers</h2>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-16">
          Special packages designed to meet specific needs of Indian businesses with exceptional value.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {offers.map((offer, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden border ${
                offer.isPopular ? "border-brand-yellow" : "border-border/60"
              } hover:shadow-xl transition-all duration-500`}
            >
              {offer.isPopular && (
                <div className="absolute -right-12 top-6 rotate-45 bg-brand-yellow text-black text-xs font-medium py-1 px-10 shadow-md">
                  Popular
                </div>
              )}
              
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-brand-yellow to-brand-gold"></div>
              
              <CardHeader>
                <CardTitle className="flex items-center">
                  {offer.title}
                  {offer.isPopular && (
                    <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-brand-yellow text-black">
                      Best Value
                    </span>
                  )}
                </CardTitle>
                <CardDescription className="text-base">{offer.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="flex items-baseline">
                  <div className="text-3xl font-bold">{offer.price}</div>
                  <div className="ml-2 text-sm text-muted-foreground">{index === 0 ? "/website" : ""}</div>
                </div>
                
                <ul className="space-y-3">
                  {offer.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-brand-yellow shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={scrollToContact}
                  className="w-full bg-gradient-to-r from-brand-yellow to-brand-gold hover:from-brand-gold hover:to-brand-yellow text-black font-semibold py-2 px-4 rounded-md transition-colors"
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 w-full text-center px-4">
          <p className="text-sm text-muted-foreground mx-auto">
            All prices are in Indian Rupees (₹). GST applicable as per government regulations.
          </p>
          <p className="text-xs text-muted-foreground mt-1 mx-auto">
            Serving clients across India including Delhi, Mumbai, Bangalore, Chennai, Kolkata and more.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOffers;
