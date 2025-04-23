import { Mail, Phone, Instagram, Github } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const renderSocialLinks = () => (
    <div className="flex gap-3 mt-2">
      <SocialLink
        href="mailto:ellowdigitals@gmail.com"
        label="Mail"
        Icon={Mail}
      />
      <SocialLink
        href="tel:+918960446756"
        label="Phone"
        Icon={Phone}
      />
      <SocialLink
        href="https://instagram.com/ellowdigitals"
        label="Instagram"
        Icon={Instagram}
      />
      <SocialLink
        href="https://github.com/ellowdigitals"
        label="Github"
        Icon={Github}
      />
    </div>
  );

  const renderQuickLinks = () => (
    <div>
      <h4 className="font-bold text-brand-yellow mb-2 tracking-wide">Quick Links</h4>
      <ul className="space-y-2 text-base">
        <FooterLink href="#home" label="Home" />
        <FooterLink href="#about" label="About Us" />
        <FooterLink href="#services" label="Services" />
        <FooterLink href="#contact" label="Contact" />
      </ul>
    </div>
  );

  const renderServicesLinks = () => (
    <div>
      <h4 className="font-bold text-brand-yellow mb-2 tracking-wide">Services</h4>
      <ul className="space-y-2 text-base">
        <FooterLink href="#services" label="Web Development" />
        <FooterLink href="#services" label="Mobile Apps" />
        <FooterLink href="#services" label="UI/UX Design" />
        <FooterLink href="#services" label="SEO & Performance" />
      </ul>
    </div>
  );

  const renderContactLinks = () => (
    <div>
      <h4 className="font-bold text-brand-yellow mb-2 tracking-wide">Contact</h4>
      <ul className="space-y-2 text-base">
        <FooterLink href="mailto:hello@ellowdigitals.com" label="ellowdigitals@gmail.com" />
        <FooterLink href="tel:+919876543210" label="+91 89604 46756" />
        <FooterLink href="#contact" label="Contact Form" />
      </ul>
    </div>
  );

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
          {renderSocialLinks()}
        </div>

        {/* Footer navigation */}
        <div className="flex-[2] min-w-[320px] w-full grid grid-cols-2 md:grid-cols-3 gap-8">
          {renderQuickLinks()}
          {renderServicesLinks()}
          {renderContactLinks()}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 mt-7 pt-5 border-t border-border text-muted-foreground text-sm">
        <div>
          &copy; {currentYear}{" "}
          <span className="font-bold text-brand-yellow">EllowDigitals</span>. All Rights Reserved.
        </div>
        <div className="hidden md:inline-block">|</div>
        <div>
          <span className="text-brand-yellow font-semibold">Making Digital Simple.</span>
        </div>
        <div className="flex gap-3 mt-2 md:mt-0">
          <FooterLink href="#" label="Privacy Policy" />
          <FooterLink href="#" label="Terms of Service" />
        </div>
      </div>
    </footer>
  );
};

// Reusable component for social links
const SocialLink = ({ href, label, Icon }) => (
  <a
    href={href}
    aria-label={label}
    className="w-9 h-9 rounded-full flex items-center justify-center bg-brand-yellow/15 hover:bg-brand-yellow hover:text-black text-brand-yellow/90 transition shadow-md"
  >
    <Icon className="w-5 h-5" />
  </a>
);

// Reusable component for footer links
const FooterLink = ({ href, label }) => (
  <li>
    <a href={href} className="hover:text-brand-yellow/90 transition-colors">
      {label}
    </a>
  </li>
);

export default Footer;
