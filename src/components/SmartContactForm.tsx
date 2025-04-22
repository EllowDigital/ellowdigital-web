
import { useState, useRef, useEffect } from "react";
import { Send, Check, AlertCircle, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

type FormStatus = "idle" | "submitting" | "success" | "error";

const SmartContactForm = () => {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

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
    if (formRef.current) observer.observe(formRef.current);
    if (contactInfoRef.current) observer.observe(contactInfoRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (dividerRef.current) observer.unobserve(dividerRef.current);
      if (formRef.current) observer.unobserve(formRef.current);
      if (contactInfoRef.current) observer.unobserve(contactInfoRef.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Simulate form submission
    setTimeout(() => {
      // Random success or error for demo purposes
      const randomSuccess = Math.random() > 0.2;
      setFormStatus(randomSuccess ? "success" : "error");

      if (randomSuccess) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });

        // Reset form status after 3 seconds
        setTimeout(() => {
          setFormStatus("idle");
        }, 3000);
      }
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden snap-start bg-background">
      {/* Background blobs */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl morph-shape"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl morph-shape" style={{ animationDelay: '10s' }}></div>
      
      <div className="section-container max-w-6xl mx-auto">
        <h2 ref={titleRef} className="section-title reveal-animate">Get In Touch</h2>
        <div ref={dividerRef} className="animated-divider reveal-animate mb-12"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-8">
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 neo-effect p-8 rounded-xl reveal-animate card-3d"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="float-label-input">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    className="border-brand-gold/20 focus:border-brand-gold focus:ring-brand-gold/20"
                  />
                  <label htmlFor="name">Your Name</label>
                </div>
                
                <div className="float-label-input">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    className="border-brand-gold/20 focus:border-brand-gold focus:ring-brand-gold/20"
                  />
                  <label htmlFor="email">Email Address</label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="float-label-input">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder=" "
                    className="border-brand-gold/20 focus:border-brand-gold focus:ring-brand-gold/20"
                  />
                  <label htmlFor="phone">Phone Number (Optional)</label>
                </div>
                
                <div className="float-label-input">
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="border-brand-gold/20 focus:border-brand-gold focus:ring-brand-gold/20 bg-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Other">Other</option>
                  </select>
                  <label htmlFor="subject">Subject</label>
                </div>
              </div>
              
              <div className="float-label-input">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder=" "
                  required
                  className="resize-none border-brand-gold/20 focus:border-brand-gold focus:ring-brand-gold/20"
                ></textarea>
                <label htmlFor="message">Your Message</label>
              </div>
              
              <Button
                type="submit"
                disabled={formStatus === "submitting"}
                className={`w-full py-3 flex items-center justify-center transition-all ${
                  formStatus === "success" 
                    ? "bg-green-600 hover:bg-green-700 text-white" 
                    : formStatus === "error"
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gradient-to-r from-brand-gold to-brand-yellow text-black hover:opacity-90"
                }`}
              >
                {formStatus === "idle" && (
                  <>
                    Send Message <Send className="ml-2 w-4 h-4" />
                  </>
                )}
                {formStatus === "submitting" && (
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                {formStatus === "success" && (
                  <>
                    Message Sent! <Check className="ml-2 w-4 h-4" />
                  </>
                )}
                {formStatus === "error" && (
                  <>
                    Error Sending <AlertCircle className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
              
              {formStatus === "error" && (
                <div className="p-4 bg-red-100 border border-red-200 text-red-700 rounded-md dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
                  There was an error sending your message. Please try again later.
                </div>
              )}
            </form>
          </div>
          
          {/* Contact Information */}
          <div 
            ref={contactInfoRef}
            className="lg:col-span-4 reveal-animate"
          >
            <div className="glass-effect p-8 rounded-xl h-full border border-brand-gold/10 bg-card/50 backdrop-blur-md">
              <h3 className="text-xl font-semibold mb-6 gradient-text">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-brand-yellow/10 flex items-center justify-center mr-4 flex-shrink-0 border border-brand-gold/10">
                    <Phone className="w-5 h-5 text-brand-yellow" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Phone</h4>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-brand-yellow/10 flex items-center justify-center mr-4 flex-shrink-0 border border-brand-gold/10">
                    <Mail className="w-5 h-5 text-brand-yellow" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Email</h4>
                    <p className="text-muted-foreground">hello@ellowdigitals.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-brand-yellow/10 flex items-center justify-center mr-4 flex-shrink-0 border border-brand-gold/10">
                    <MapPin className="w-5 h-5 text-brand-yellow" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Office</h4>
                    <p className="text-muted-foreground">123 Innovation Street,<br />San Francisco, CA 94103</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="text-sm font-medium mb-4">Working Hours</h4>
                <p className="text-muted-foreground mb-2">Monday - Friday: 9AM - 5PM</p>
                <p className="text-muted-foreground">Saturday - Sunday: Closed</p>
              </div>
              
              <div className="mt-10">
                <h4 className="text-sm font-medium mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-8 h-8 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow hover:bg-brand-yellow hover:text-black transition-colors border border-brand-gold/10">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow hover:bg-brand-yellow hover:text-black transition-colors border border-brand-gold/10">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" />
                      <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" />
                      <circle cx="18.406" cy="5.594" r="1.44" />
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow hover:bg-brand-yellow hover:text-black transition-colors border border-brand-gold/10">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow hover:bg-brand-yellow hover:text-black transition-colors border border-brand-gold/10">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartContactForm;
