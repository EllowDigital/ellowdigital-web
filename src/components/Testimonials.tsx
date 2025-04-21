
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const maxVisibleItems = 3;
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

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

  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : testimonials.length - maxVisibleItems
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex < testimonials.length - maxVisibleItems ? prevIndex + 1 : 0
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < rating ? 'text-brand-yellow fill-brand-yellow' : 'text-muted'}`} 
      />
    ));
  };

  const visibleTestimonials = testimonials.slice(
    activeIndex,
    activeIndex + maxVisibleItems
  );

  return (
    <section id="testimonials" className="section-container py-24 relative overflow-hidden snap-start">
      {/* Background blobs */}
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl morph-shape"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl morph-shape" style={{ animationDelay: '5s' }}></div>
      
      <div className="max-w-6xl mx-auto">
        <h2 ref={titleRef} className="section-title reveal-animate">Client Testimonials</h2>
        <div ref={dividerRef} className="animated-divider reveal-animate mb-12"></div>
        
        <div ref={carouselRef} className="reveal-animate relative">
          {/* Carousel */}
          <div className="overflow-hidden">
            <div 
              className="flex flex-col md:flex-row gap-6 transition-all duration-700 ease-out"
              style={{ transform: `translateX(0px)` }}
            >
              {visibleTestimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  ref={(el) => testimonialRefs.current[index] = el}
                  className="flex-shrink-0 w-full md:w-1/3 neo-effect card-3d transition-all duration-300 tilt-effect mb-6 md:mb-0"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex">
                        {renderStars(testimonial.rating)}
                      </div>
                      <Quote className="w-10 h-10 text-brand-yellow/20" />
                    </div>
                    
                    <p className="text-muted-foreground mb-6">{testimonial.text}</p>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
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
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-card neo-effect flex items-center justify-center transition-all hover:bg-brand-yellow/10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-card neo-effect flex items-center justify-center transition-all hover:bg-brand-yellow/10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: testimonials.length - maxVisibleItems + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeIndex === index ? 'bg-brand-yellow w-6' : 'bg-muted'
                }`}
                aria-label={`Go to testimonial group ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
