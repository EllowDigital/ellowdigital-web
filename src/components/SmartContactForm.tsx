
// import { useState, useRef, useEffect } from "react";
// import { Send, Check, AlertCircle, Phone, Mail, Facebook, Instagram, Linkedin } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";

import { useRef, useEffect, useState } from "react";
import { Send, Check, AlertCircle, Phone, Mail, Facebook, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// FORM VALIDATION
function validateEmail(email: string) {
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
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (titleRef.current) observer.observe(titleRef.current);
    if (dividerRef.current) observer.observe(dividerRef.current);
    if (formRef.current) observer.observe(formRef.current);
    if (contactInfoRef.current) observer.observe(contactInfoRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

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
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      e.preventDefault();
      setFormStatus("error");
      toast.error("Please fix the errors in the form.");
      setTimeout(() => setFormStatus("idle"), 2000);
    } else {
      setFormStatus("submitting");
      // Allow FormSubmit to handle the actual submission
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden snap-start bg-gradient-to-b from-card/40 to-background dark:from-black/20 dark:to-background">
      <div className="section-container max-w-5xl mx-auto relative z-10">
        <h2 ref={titleRef} className="section-title reveal-animate">Contact Us</h2>
        <div ref={dividerRef} className="animated-divider reveal-animate mb-8"></div>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12 reveal-animate text-lg">
          Let's start your project! Reach out below and our experts will reply soon.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            action="https://formsubmit.co/ellowdigitals@gmail.com"
            method="POST"
            className="space-y-7 bg-card/80 rounded-2xl border border-border/30 shadow-2xl p-8 reveal-animate relative backdrop-blur-md"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://yourwebsite.com/thank-you" />

            {formStatus === "success" && (
              <div className="absolute inset-0 z-20 bg-black/80 flex flex-col items-center justify-center rounded-2xl transition-all animate-fade-in">
                <Check className="w-16 h-16 text-green-400 mb-2" />
                <div className="font-extrabold text-2xl text-green-300 mb-1">Thank you!</div>
                <p className="text-muted-foreground text-base">Your message was sent successfully.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block font-semibold text-brand-yellow pb-1">Name</label>
                <input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`rounded-xl border border-border bg-background/80 px-4 py-3 w-full text-base focus:ring-2 focus:ring-brand-yellow/60 focus:outline-none shadow transition placeholder:text-muted-foreground ${errors.name ? "border-red-500" : "border-border"}`}
                  disabled={formStatus === "submitting"}
                  required
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby="error-name"
                />
                {errors.name && <div id="error-name" className="text-xs text-red-400 mt-1">{errors.name}</div>}
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
                  className={`rounded-xl border bg-background/80 border-border px-4 py-3 w-full text-base focus:ring-2 focus:ring-brand-yellow/60 focus:outline-none shadow transition placeholder:text-muted-foreground ${errors.email ? "border-red-500" : "border-border"}`}
                  disabled={formStatus === "submitting"}
                  required
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby="error-email"
                />
                {errors.email && <div id="error-email" className="text-xs text-red-400 mt-1">{errors.email}</div>}
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
                  className="rounded-xl border border-border bg-background/80 px-4 py-3 w-full text-base focus:ring-2 focus:ring-brand-yellow/60 focus:outline-none shadow transition placeholder:text-muted-foreground"
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
                  className={`rounded-xl border border-border bg-background/80 px-4 py-3 w-full text-base focus:ring-2 focus:ring-brand-yellow/60 focus:outline-none shadow transition ${errors.subject ? "border-red-500" : "border-border"}`}
                  disabled={formStatus === "submitting"}
                  required
                  aria-invalid={!!errors.subject}
                  aria-describedby="error-subject"
                >
                  <option value="">-- Select --</option>
                  {subjectOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors.subject && <div id="error-subject" className="text-xs text-red-400 mt-1">{errors.subject}</div>}
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
                className={`rounded-xl border border-border bg-background/80 px-4 py-3 w-full text-base focus:ring-2 focus:ring-brand-yellow/60 focus:outline-none shadow transition resize-none min-h-[120px] placeholder:text-muted-foreground ${errors.message ? "border-red-500" : "border-border"}`}
                disabled={formStatus === "submitting"}
                required
                aria-invalid={!!errors.message}
                aria-describedby="error-message"
              />
              {errors.message && <div id="error-message" className="text-xs text-red-400 mt-1">{errors.message}</div>}
            </div>

            <Button
              type="submit"
              className={`
                w-full py-4 text-lg font-bold rounded-2xl transition-all duration-300 shadow-xl border-2 border-brand-yellow
                bg-gradient-to-r from-brand-yellow/80 to-brand-gold/90 hover:scale-105 hover:from-brand-yellow hover:to-brand-yellow
                active:scale-95 flex justify-center items-center gap-3
                ${formStatus === "submitting" ? "bg-gray-400 pointer-events-none opacity-80" : ""}
              `}
              disabled={formStatus === "submitting"}
            >
              {formStatus === "idle" && <>Send Message <Send className="ml-1 w-6 h-6" /></>}
              {formStatus === "submitting" && (
                <>
                  <span className="inline-block w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Sending...
                </>
              )}
              {formStatus === "error" && <>Error <AlertCircle className="ml-1 w-6 h-6" /></>}
              {formStatus === "success" && <>Sent! <Check className="ml-1 w-6 h-6" /></>}
            </Button>
          </form>

          {/* CONTACT INFO with WhatsApp icon */}
          <div
            ref={contactInfoRef}
            className="flex flex-col justify-between h-full rounded-2xl border border-brand-yellow/10 bg-card/80 p-8 shadow-xl"
          >
            <div>
              <h3 className="text-xl font-bold text-brand-yellow mb-5">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-full bg-brand-yellow/20 flex items-center justify-center"><Phone className="w-5 h-5 text-brand-yellow" /></span>
                  <span className="font-medium text-base">+91 89604 46756</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-full bg-brand-yellow/20 flex items-center justify-center"><Mail className="w-5 h-5 text-brand-yellow" /></span>
                  <span className="font-medium text-base">ellowdigitals@gmail.com</span>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="font-semibold text-base mb-2 text-muted-foreground">Follow us</h4>
                <div className="flex gap-3">
                  <a href="https://instagram.com/ellowdigitals" aria-label="Instagram" className="w-8 h-8 rounded-full flex items-center justify-center bg-brand-yellow/20 hover:bg-brand-yellow hover:text-black text-brand-yellow/90 transition shadow-md"><Instagram className="w-4 h-4" /></a>
                  <a href="https://wa.me/918960446756" aria-label="Whatsapp" className="w-8 h-8 rounded-full flex items-center justify-center bg-brand-yellow/20 hover:bg-brand-yellow hover:text-black text-brand-yellow/90 transition shadow-md"><MessageCircle className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
            <div className="mt-8 text-sm text-muted-foreground">
              <strong>Working Hours:</strong> Mon-Fri: 6pm - 11pm<br />
              <span>Saturday & Sunday: Closed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartContactForm;



