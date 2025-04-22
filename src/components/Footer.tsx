import {
  Mail,
  Phone,
  Instagram,
  Github,
} from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#191921] text-foreground border-t border-border py-10 md:py-14">
      <div className="section-container max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row flex-wrap gap-12 lg:gap-16">
        {/* Brand & Social */}
        <div className="flex-1 min-w-[220px] flex flex-col items-start gap-4">
          <div className="flex items-center gap-3 mb-2">
            <Logo />
            <span className="text-2xl font-extrabold tracking-tight gradient-text">
              Ellow<span className="text-brand-yellow">Digitals</span>
            </span>
          </div>
          <p className="text-muted-foreground max-w-xs text-[1rem] leading-relaxed mb-0">
            Crafting innovative digital experiences.
            <br />
            <strong className="text-brand-yellow font-semibold">
              Empowering your brand online.
            </strong>
          </p>
          <div className="flex gap-3 mt-2">
            <a
              href="mailto:ellowdigitals@gmail.com"
              aria-label="Mail"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-brand-yellow/15 hover:bg-brand-yellow hover:text-black text-brand-yellow/90 transition shadow-md"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="tel:+918960446756"
              aria-label="Phone"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-brand-yellow/15 hover:bg-brand-yellow hover:text-black text-brand-yellow/90 transition shadow-md"
            >
              <Phone className="w-5 h-5" />
            </a>
            {/* <a
              href="https://facebook.com/ellowdigitals"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-brand-yellow/15 hover:bg-brand-yellow hover:text-black text-brand-yellow/90 transition shadow-md"
            >
              <Facebook className="w-5 h-5" />
            </a> */}
            <a
              href="https://instagram.com/ellowdigitals"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-brand-yellow/15 hover:bg-brand-yellow hover:text-black text-brand-yellow/90 transition shadow-md"
            >
              <Instagram className="w-5 h-5" />
            </a>
            {/* <a
              href="https://linkedin.com/company/ellowdigitals"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-brand-yellow/15 hover:bg-brand-yellow hover:text-black text-brand-yellow/90 transition shadow-md"
            >
              <Linkedin className="w-5 h-5" />
            </a> */}
            <a
              href="https://github.com/ellowdigitals"
              aria-label="Github"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-brand-yellow/15 hover:bg-brand-yellow hover:text-black text-brand-yellow/90 transition shadow-md"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Footer navigation - links in 2 cols on mobile, 3-4 on desktop */}
        <div className="flex-[2] min-w-[320px] w-full grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-brand-yellow mb-2 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2 text-base">
              <li>
                <a
                  href="#home"
                  className="hover:text-brand-yellow/90 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-brand-yellow/90 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-brand-yellow/90 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-brand-yellow/90 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-brand-yellow mb-2 tracking-wide">
              Services
            </h4>
            <ul className="space-y-2 text-base">
              <li>
                <a
                  href="#services"
                  className="hover:text-brand-yellow/90 transition-colors"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-brand-yellow/90 transition-colors"
                >
                  Mobile Apps
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-brand-yellow/90 transition-colors"
                >
                  UI/UX Design
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-brand-yellow/90 transition-colors"
                >
                  SEO & Performance
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-brand-yellow mb-2 tracking-wide">
              Contact
            </h4>
            <ul className="space-y-2 text-base">
              <li>
                <a
                  href="mailto:hello@ellowdigitals.com"
                  className="hover:text-brand-yellow/90 transition-colors"
                >
                  ellowdigitals@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="hover:text-brand-yellow/90 transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-brand-yellow/90 transition-colors"
                >
                  Contact Form
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 mt-7 pt-5 border-t border-border text-muted-foreground text-sm">
        <div>
          &copy; {currentYear}{" "}
          <span className="font-bold text-brand-yellow">EllowDigitals</span>.
          All Rights Reserved.
        </div>
        <div className="hidden md:inline-block">|</div>
        <div>
          <span className="text-brand-yellow font-semibold">
            Making Digital Simple.
          </span>
        </div>
        <div className="flex gap-3 mt-2 md:mt-0">
          <a href="#" className="hover:text-brand-yellow/90 text-xs sm:text-sm">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-brand-yellow/90 text-xs sm:text-sm">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
