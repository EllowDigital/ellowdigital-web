import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const offers = [
  {
    title: "Static Website Package",
    price: "₹1599",
    description: "Perfect for portfolios, startups, and small businesses.",
    features: [
      "Fully responsive design",
      "SEO optimization",
      "Contact form integration",
      "Social media links",
      "Fast loading times",
      "Basic analytics setup"
    ],
    isPopular: true
  },
  {
    title: "School CS Projects",
    price: "Contact for pricing",
    description: "Expert-crafted projects to help students score high.",
    features: [
      "Class 12 computer science projects",
      "Well-documented code",
      "Fast delivery",
      "Live support",
      "Report preparation",
      "Project demonstration help"
    ],
    isPopular: false
  }
];

const FeaturedOffers = () => {
  return (
    <section id="offers" className="py-24 bg-muted/30">
      <div className="section-container">
        <h2 className="section-title">Featured Offers</h2>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-16">
          Special packages designed to meet specific needs with exceptional value.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {offers.map((offer, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden border ${offer.isPopular ? "border-brand-purple" : "border-border/60"} card-hover`}
            >
              {offer.isPopular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-brand-purple text-white text-xs font-medium py-1 px-3 rounded-bl-lg">
                    Popular
                  </div>
                </div>
              )}
              
              <CardHeader>
                <CardTitle>{offer.title}</CardTitle>
                <CardDescription className="text-base">{offer.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="text-3xl font-bold">{offer.price}</div>
                
                <ul className="space-y-2">
                  {offer.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-brand-purple shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md transition-colors">
                  <a href="#contact">Get Started</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedOffers;
