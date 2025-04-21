import { Mail, Phone, Github } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t py-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Logo />
            <h3 className="text-2xl font-bold gradient-text">
              Ellow<span className="text-brand-purple">Digitals</span>
            </h3>
            <p className="text-muted-foreground">
              Crafting innovative digital experiences with passion & precision.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple hover:bg-brand-purple hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple hover:bg-brand-purple hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple hover:bg-brand-purple hover:text-white transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-brand-purple transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-brand-purple transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-brand-purple transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#offers" className="text-muted-foreground hover:text-brand-purple transition-colors">
                  Offers
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-brand-purple transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-muted-foreground hover:text-brand-purple transition-colors">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-brand-purple transition-colors">
                  Mobile App Development
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-brand-purple transition-colors">
                  UI/UX Design
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-brand-purple transition-colors">
                  Custom Software
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-brand-purple transition-colors">
                  SEO & Performance
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/60 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} EllowDigitals. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-brand-purple transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-brand-purple transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
