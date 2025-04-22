
import { useState, useRef, useEffect } from "react";
import { Send, Check, AlertCircle, Phone, Mail, Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// FORM VALIDATION
function validateEmail(email: string) {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const subjectOptions = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "SEO & Performance",
  "Other",
];

const SmartContactForm = () => {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  
  // Create refs at the component level, not inside useEffect
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  // ScrollReveal effect
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

    // Use the refs defined at component level
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

  // Inline validation
  const validate = () => {
    const errs: { [k: string]: string } = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.email.trim()) errs.email = "Email is required.";
    else if (!validateEmail(formData.email)) errs.email = "Please enter a valid email.";
    if (!formData.subject) errs.subject = "Please select a subject.";
    if (!formData.message.trim()) errs.message = "Message is required.";
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Re-validate the field
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setFormStatus("error");
      toast.error("Please fix the errors in the form.");
      setTimeout(() => setFormStatus("idle"), 2000);
      return;
    }
    setFormStatus("submitting");

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });

      toast.success("Message sent! We'll get back to you soon.", {
        position: "top-right",
        duration: 4000,
      });

      setTimeout(() => {
        setFormStatus("idle");
      }, 2500);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden snap-start bg-gradient-to-b from-card/30 to-background dark:from-black/20 dark:to-background">
      {/* Decorative gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/5 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl morph-shape"></div>
        <div className="absolute bottom-1/4 left-1/6 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl morph-shape"></div>
      </div>
      
      <div className="section-container max-w-5xl mx-auto relative z-10">
        <h2 ref={titleRef} className="section-title reveal-animate">Contact Us</h2>
        <div ref={dividerRef} className="animated-divider reveal-animate mb-8"></div>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12 reveal-animate text-lg">
          Let's start your project! Reach out below and our experts will reply soon.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* CONTACT FORM */}
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-7 bg-card/70 rounded-2xl border border-border/30 shadow-lg shadow-brand-yellow/5 p-8 reveal-animate relative"
          >
            {/* ANIMATED SUCCESS MESSAGE */}
            {formStatus === "success" && (
              <div className="absolute inset-0 z-20 bg-black/70 bg-opacity-80 flex flex-col items-center justify-center rounded-2xl transition-all animate-fade-in">
                <Check className="w-16 h-16 text-green-400 mb-2" />
                <div className="font-extrabold text-2xl text-green-300 mb-1">Thank you!</div>
                <p className="text-muted-foreground text-base">Your message was sent successfully.</p>
              </div>
            )}

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block font-semibold text-brand-yellow pb-1">Name</label>
                <input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`rounded-xl border border-border bg-background/60 px-4 py-3 w-full text-base focus:ring-2 focus:ring-brand-yellow/60 focus:outline-none shadow transition ${errors.name ? "border-red-500" : "border-border"}`}
                  disabled={formStatus === "submitting"}
                  required
                />
                {errors.name && <div className="text-xs text-red-400 mt-1">{errors.name}</div>}
              </div>
              <div>
                <label htmlFor="email" className="block font-semibold text-brand-yellow pb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`rounded-xl border bg-background/60 border-border px-4 py-3 w-full text-base focus:ring-2 focus:ring-brand-yellow/60 focus:outline-none shadow transition ${errors.email ? "border-red-500" : "border-border"}`}
                  disabled={formStatus === "submitting"}
                  required
                />
                {errors.email && <div className="text-xs text-red-400 mt-1">{errors.email}</div>}
              </div>
              <div>
                <label htmlFor="phone" className="block font-semibold text-brand-yellow pb-1">Phone<span className="text-muted-foreground text-xs ml-1">(Optional)</span></label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Your phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="rounded-xl border border-border bg-background/60 px-4 py-3 w-full text-base focus:ring-2 focus:ring-brand-yellow/60 focus:outline-none shadow transition"
                  disabled={formStatus === "submitting"}
                  autoComplete="tel"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block font-semibold text-brand-yellow pb-1">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`rounded-xl border border-border bg-background/60 px-4 py-3 w-full text-base focus:ring-2 focus:ring-brand-yellow/60 focus:outline-none shadow transition ${errors.subject ? "border-red-500" : "border-border"}`}
                  disabled={formStatus === "submitting"}
                  required
                >
                  <option value="">-- Select --</option>
                  {subjectOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors.subject && <div className="text-xs text-red-400 mt-1">{errors.subject}</div>}
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block font-semibold text-brand-yellow pb-1">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Type your message..."
                value={formData.message}
                onChange={handleChange}
                className={`rounded-xl border border-border bg-background/60 px-4 py-3 w-full text-base focus:ring-2 focus:ring-brand-yellow/60 focus:outline-none shadow transition resize-none min-h-[120px] ${errors.message ? "border-red-500" : "border-border"}`}
                disabled={formStatus === "submitting"}
                required
              />
              {errors.message && <div className="text-xs text-red-400 mt-1">{errors.message}</div>}
            </div>

            <Button
              type="submit"
              className={`w-full py-4 text-lg font-bold rounded-2xl transition-all duration-300 shadow-xl border-2 border-brand-yellow bg-gradient-to-r from-brand-yellow/80 to-brand-gold/90 hover:scale-105 hover:from-brand-yellow hover:to-brand-yellow active:scale-95 flex justify-center items-center gap-3
                ${formStatus === "submitting" ? "bg-gray-400 pointer-events-none opacity-80" : ""}
              `}
              disabled={formStatus === "submitting"}
            >
              {formStatus === "idle" && (
                <>
                  Send Message <Send className="ml-1 w-6 h-6" />
                </>
              )}
              {formStatus === "submitting" && (
                <>
                  <span className="inline-block w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Sending...
                </>
              )}
              {formStatus === "error" && (
                <>
                  Error <AlertCircle className="ml-1 w-6 h-6" />
                </>
              )}
              {formStatus === "success" && (
                <>
                  Sent! <Check className="ml-1 w-6 h-6" />
                </>
              )}
            </Button>
          </form>

          {/* CONTACT INFORMATION */}
          <div ref={contactInfoRef} className="flex flex-col justify-between h-full rounded-2xl border border-brand-yellow/10 bg-card/80 p-8 shadow-lg">
            <div>
              <h3 className="text-xl font-bold text-brand-yellow mb-5">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-full bg-brand-yellow/20 flex items-center justify-center"><Phone className="w-5 h-5 text-brand-yellow" /></span>
                  <span className="font-medium text-base">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-full bg-brand-yellow/20 flex items-center justify-center"><Mail className="w-5 h-5 text-brand-yellow" /></span>
                  <span className="font-medium text-base">hello@ellowdigitals.com</span>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="font-semibold text-base mb-2 text-muted-foreground">Follow us</h4>
                <div className="flex gap-3">
                  <a href="https://facebook.com/ellowdigitals" aria-label="Facebook" className="w-8 h-8 rounded-full flex items-center justify-center bg-brand-yellow/20 hover:bg-brand-yellow hover:text-black text-brand-yellow/90 transition"><Facebook className="w-4 h-4" /></a>
                  <a href="https://instagram.com/ellowdigitals" aria-label="Instagram" className="w-8 h-8 rounded-full flex items-center justify-center bg-brand-yellow/20 hover:bg-brand-yellow hover:text-black text-brand-yellow/90 transition"><Instagram className="w-4 h-4" /></a>
                  <a href="https://linkedin.com/company/ellowdigitals" aria-label="LinkedIn" className="w-8 h-8 rounded-full flex items-center justify-center bg-brand-yellow/20 hover:bg-brand-yellow hover:text-black text-brand-yellow/90 transition"><Linkedin className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
            <div className="mt-8 text-sm text-muted-foreground">
              <strong>Working Hours:</strong> Mon-Fri: 9am - 6pm<br />
              <span>Saturday & Sunday: Closed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartContactForm;
