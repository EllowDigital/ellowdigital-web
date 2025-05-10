
import {
  UserCheck,
  Zap,
  Clock,
  RefreshCw,
  MessageSquare,
  ArrowRight,
  Shield
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const reasons = [
  {
    title: "Personalized Collaboration",
    description: "Direct 1-on-1 communication throughout the project lifecycle for a truly personalized experience.",
    icon: UserCheck,
    color: "from-brand-gold/40 to-brand-yellow/40"
  },
  {
    title: "Fast & Responsive Architecture",
    description: "Optimized performance for lightning-fast load times and seamless user experiences across all devices.",
    icon: Zap,
    color: "from-brand-gold/40 to-brand-yellow/60"
  },
  {
    title: "On-time, Within Budget",
    description: "Strict adherence to project timelines and budget constraints without compromising on quality.",
    icon: Clock,
    color: "from-brand-gold/50 to-brand-yellow/50"
  },
  {
    title: "Post-launch Support",
    description: "Comprehensive support and real-time updates even after your project goes live.",
    icon: RefreshCw,
    color: "from-brand-gold/60 to-brand-yellow/40"
  },
  {
    title: "Transparent Communication",
    description: "Clear, jargon-free communication with regular updates on project milestones and progress.",
    icon: MessageSquare,
    color: "from-brand-gold/70 to-brand-yellow/30"
  },
  {
    title: "Enhanced Security",
    description: "Implementation of industry-standard security practices to protect your digital assets and user data.",
    icon: Shield,
    color: "from-brand-gold/60 to-brand-yellow/50"
  }
];

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  // Staggered animation setup
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={sectionRef} id="why-us" className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      {/* Responsive background elements with depth and animation */}
      <div className="absolute -z-10 top-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-brand-yellow/10 rounded-full blur-3xl morph-shape opacity-80"></div>
      <div className="absolute -z-10 bottom-1/3 left-1/4 w-60 sm:w-80 h-60 sm:h-80 bg-brand-gold/10 rounded-full blur-3xl morph-shape opacity-80" style={{ animationDelay: '5s' }}></div>
      <div className="absolute -z-10 top-2/3 right-1/3 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full blur-3xl morph-shape opacity-60" style={{ animationDelay: '8s' }}></div>

      <div className="section-container max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.h2 
            className="section-title text-3xl sm:text-4xl font-bold mb-3"
            variants={itemVariants}
          >
            Why Choose EllowDigital?
          </motion.h2>
          
          <motion.div 
            className="h-1 w-24 mx-auto bg-gradient-to-r from-brand-gold to-brand-yellow rounded-full mb-4"
            variants={itemVariants}
          ></motion.div>
          
          <motion.p 
            className="text-center text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-12 sm:mb-16"
            variants={itemVariants}
          >
            We pride ourselves on delivering exceptional value and building lasting relationships with our clients.
          </motion.p>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
            variants={containerVariants}
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                className="bg-card/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-border/60 shadow-lg hover:shadow-xl transition-all duration-500 group h-full flex flex-col"
                variants={itemVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                {/* Icon container with gradient background */}
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${reason.color} flex items-center justify-center mb-5 sm:mb-6 transform transition-all duration-300 group-hover:scale-110`}>
                  <reason.icon className="h-6 w-6 text-brand-gold" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-3 text-foreground group-hover:text-brand-yellow transition-colors duration-300">{reason.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base group-hover:text-foreground/90 transition-colors duration-300 flex-grow">{reason.description}</p>

                {/* Animated underline */}
                <div className="mt-4 h-0.5 w-0 bg-brand-yellow group-hover:w-12 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Call to Action Section with responsive design */}
        <motion.div 
          className="mt-16 sm:mt-20 bg-gradient-to-r from-brand-gold/90 to-brand-yellow/90 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
        >
          <div className="text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-black">Ready to elevate your digital presence?</h3>
            <p className="mb-0 text-black/90 text-base sm:text-lg">
              Let's collaborate to create something exceptional that elevates your brand and engages your audience.
            </p>
          </div>
          <motion.a
            href="#contact"
            className="inline-block relative overflow-hidden bg-black text-brand-yellow font-medium py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-base sm:text-lg shadow-lg group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="relative z-10 flex items-center group-hover:translate-x-1 transition-transform">
              Let's Talk
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </span>

            {/* 3D glow effect on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-black to-black/90 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"></span>
            <span className="absolute -inset-1 bg-gradient-to-r from-brand-gold/20 to-brand-yellow/20 blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
