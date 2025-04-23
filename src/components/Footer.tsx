import { Mail, Phone, Instagram, Github } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#000000] text-foreground border-t border-border py-10 md:py-14">
      <div className="section-container max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row flex-wrap gap-12 lg:gap-16">

        {/* Branding & Social Links */}
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
            {[
              {
                href: "mailto:ellowdigitals@gmail.com",
                label: "Mail",
                icon: <Mail className="w-5 h-5" />,
              },
              {
                href: "tel:+918960446756",
                label: "Phone",
                icon: <Phone className="w-5 h-5" />,
              },
              {
                href: "https://instagram.com/ellowdigitals",
                label: "Instagram",
                icon: <Instagram className="w-5 h-5" />,
              },
              {
                href: "https://github.com/ellowdigitals",
                label: "Github",
                icon: <Github className="w-5 h-5" />,
              },
            ].map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-brand-yellow/15 hover:bg-brand-yellow hover:text-black text-brand-yellow/90 transition shadow-md"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-[2] min-w-[320px] w-full grid grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              title: "Quick Links",
              links: [
                { label: "Home", href: "#home" },
                { label: "About Us", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Contact", href: "#contact" },
              ],
            },
            {
              title: "Services",
              links: [
                { label: "Web Development", href: "#services" },
                { label: "Mobile Apps", href: "#services" },
                { label: "UI/UX Design", href: "#services" },
                { label: "SEO & Performance", href: "#services" },
              ],
            },
            {
              title: "Contact",
              links: [
                { label: "ellowdigitals@gmail.com", href: "mailto:hello@ellowdigitals.com" },
                { label: "+91 89604 46756", href: "tel:+919876543210" },
                { label: "Contact Form", href: "#contact" },
              ],
            },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-brand-yellow mb-2 tracking-wide">{section.title}</h4>
              <ul className="space-y-2 text-base">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-brand-yellow/90 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 mt-7 pt-5 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-muted-foreground text-sm">
        <div>
          &copy; {currentYear}{" "}
          <span className="font-bold text-brand-yellow">EllowDigitals</span>. All Rights Reserved.
        </div>
        <div className="hidden md:inline-block">|</div>
        <div className="text-brand-yellow font-semibold">
          Making Digital Simple.
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
