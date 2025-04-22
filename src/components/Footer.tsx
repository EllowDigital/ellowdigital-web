
import { Mail, Phone, Facebook, Instagram, Linkedin, Github } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#191921] text-foreground border-t border-border py-14 md:py-16">
      <div className="max-w-7xl px-6 mx-auto flex flex-col md:flex-row md:justify-between md:items-start space-y-8 md:space-y-0">
        <div className="md:max-w-xs space-y-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Logo />
            <h3 className="text-2xl font-extrabold tracking-tight gradient-text">Ellow<span className="text-brand-yellow">Digitals</span></h3>
          </div>
          <p className="text-muted-foreground text-base">
            Crafting innovative digital experiences.<br />
            <span className="text-brand-yellow font-semibold">Empowering your brand online.</span>
          </p>
          <div className="flex gap-3 mt-4">
            <a href="mailto:hello@ellowdigitals.com" aria-label="Mail" className="w-9 h-9 rounded-full flex items-center justify-center bg-brand-yellow/15 hover:bg-brand-yellow hover:text-black text-brand-yellow/90 transition"><Mail className="w-5 h-5" /></a>
            <a href="tel:+919876543210" aria-label="Phone" className="w-9 h-9 rounded-full flex items-center justify-center bg-brand-yellow/15 hover:bg-brand-yellow hover:text-black text-brand-yellow/90 transition"><Phone className="w-5 h-5" /></a>
            <a href="https://facebook.com/ellowdigitals" aria-label="Facebook" className="w-9 h-9 rounded-full flex items-center justify-center bg-brand-yellow/15 hover:bg-brand-yellow hover:text-black text-brand-yellow/90 transition"><Facebook className="w-5 h-5" /></a>
            <a href="https://instagram.com/ellowdigitals" aria-label="Instagram" className="w-9 h-9 rounded-full flex items-center justify-center bg-brand-yellow/15 hover:bg-brand-yellow hover:text-black text-brand-yellow/90 transition"><Instagram className="w-5 h-5" /></a>
            <a href="https://linkedin.com/company/ellowdigitals" aria-label="LinkedIn" className="w-9 h-9 rounded-full flex items-center justify-center bg-brand-yellow/15 hover:bg-brand-yellow hover:text-black text-brand-yellow/90 transition"><Linkedin className="w-5 h-5" /></a>
            <a href="https://github.com/ellowdigitals" aria-label="Github" className="w-9 h-9 rounded-full flex items-center justify-center bg-brand-yellow/15 hover:bg-brand-yellow hover:text-black text-brand-yellow/90 transition"><Github className="w-5 h-5" /></a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-6 sm:grid-cols-3 flex-1">
          <div>
            <h4 className="font-bold mb-2 text-brand-yellow">Quick Links</h4>
            <ul className="space-y-2 text-base">
              <li>
                <a href="#home" className="hover:text-brand-yellow transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-brand-yellow transition-colors">About Us</a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-yellow transition-colors">Services</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-brand-yellow transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-brand-yellow">Services</h4>
            <ul className="space-y-2 text-base">
              <li>
                <a href="#services" className="hover:text-brand-yellow transition-colors">Web Development</a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-yellow transition-colors">Mobile Apps</a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-yellow transition-colors">UI/UX Design</a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-yellow transition-colors">SEO & Performance</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-brand-yellow">Contact</h4>
            <ul className="space-y-2 text-base">
              <li>
                <a href="mailto:hello@ellowdigitals.com" className="hover:text-brand-yellow transition-colors">hello@ellowdigitals.com</a>
              </li>
              <li>
                <a href="tel:+919876543210" className="hover:text-brand-yellow transition-colors">+91 98765 43210</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-brand-yellow transition-colors">Contact Form</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-muted-foreground text-sm">
        <span>&copy; {currentYear} EllowDigitals. All Rights Reserved.</span>
        <span className="hidden sm:inline-block">|</span>
        <span className="text-brand-yellow font-semibold">Making Digital Simple.</span>
        <div className="flex gap-3 mt-2 sm:mt-0">
          <a href="#" className="hover:text-brand-yellow">Privacy Policy</a>
          <a href="#" className="hover:text-brand-yellow">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
