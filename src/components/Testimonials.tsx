
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "TechNova Inc.",
    position: "CEO",
    rating: 5,
    image: "/placeholder.svg",
    text: "Working with EllowDigitals transformed our online presence completely. Their team went above and beyond to deliver a website that perfectly captures our brand identity."
  },
  {
    name: "Michael Chen",
    company: "GrowthSprint",
    position: "Marketing Director",
    rating: 5,
    image: "/placeholder.svg",
    text: "The e-commerce platform EllowDigitals built for us exceeded our expectations. Sales have increased by 40% since launch, and customer feedback has been overwhelmingly positive."
  },
  {
    name: "Amanda Peters",
    company: "EduLearn Platform",
    position: "Product Manager",
    rating: 4,
    image: "/placeholder.svg",
    text: "Their understanding of UX/UI design principles helped us create an intuitive learning platform that our users love. The team was responsive and highly professional."
  },
  {
    name: "David Kim",
    company: "Startup Ventures",
    position: "Founder",
    rating: 5,
    image: "/placeholder.svg",
    text: "As a startup founder with a tight budget, I appreciated how EllowDigitals offered flexible options while still delivering premium quality work. They truly care about their clients' success."
  },
  {
    name: "Lisa Morgan",
    company: "Fashion Forward",
    position: "Creative Director",
    rating: 5,
    image: "/placeholder.svg",
    text: "The attention to detail and creative approach to our branding project was impressive. EllowDigitals helped us stand out in a crowded market with their innovative designs."
  }
];

const Testimonials = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (dividerRef.current) observer.observe(dividerRef.current);
    if (carouselRef.current) observer.observe(carouselRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (dividerRef.current) observer.unobserve(dividerRef.current);
      if (carouselRef.current) observer.unobserve(carouselRef.current);
    };
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < rating ? 'text-brand-yellow fill-brand-yellow' : 'text-muted'}`} 
      />
    ));
  };

  return (
    <section id="testimonials" className="section-container py-24 relative overflow-hidden snap-start bg-card/50 dark:bg-black/20">
      {/* Background blobs */}
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl morph-shape"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl morph-shape" style={{ animationDelay: '5s' }}></div>
      
      <div className="max-w-6xl mx-auto">
        <h2 ref={titleRef} className="section-title reveal-animate">Client Testimonials</h2>
        <div ref={dividerRef} className="animated-divider reveal-animate mb-12"></div>
        
        <div ref={carouselRef} className="reveal-animate">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="mx-auto max-w-5xl"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <Card className="h-full neo-effect card-3d transition-all duration-300 hover:shadow-lg border border-brand-yellow/10">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex">
                          {renderStars(testimonial.rating)}
                        </div>
                        <Quote className="w-10 h-10 text-brand-yellow/20" />
                      </div>
                      
                      <p className="text-muted-foreground mb-6 line-clamp-4">{testimonial.text}</p>
                      
                      <div className="flex items-center mt-auto pt-4 border-t border-border/30">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border border-brand-gold/20 bg-brand-yellow/5">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.position}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="static transform-none mx-2 bg-card border-brand-gold/20 hover:bg-brand-yellow/10 hover:text-brand-gold" />
              <CarouselNext className="static transform-none mx-2 bg-card border-brand-gold/20 hover:bg-brand-yellow/10 hover:text-brand-gold" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
