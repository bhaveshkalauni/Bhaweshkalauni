import React from "react";
import { personalInfo } from "../data";
import { Linkedin, Mail, FileText, ArrowDown, MapPin, Compass } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = aboutSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-navy-50 to-white dark:from-navy-950 dark:to-navy-900"
    >
      {/* Decorative clean background mesh patterns */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-br from-brand-100/25 to-transparent dark:from-brand-500/5 dark:to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-brand-50/30 dark:bg-brand-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-navy-100/40 dark:bg-navy-900/10 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
            
            {/* Tagline/Header Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center self-start px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 dark:bg-brand-500/10 dark:border-brand-500/25"
            >
              <Compass className="w-4 h-4 text-brand-500 mr-2 animate-spin-slow" />
              <span className="font-mono text-[10px] md:text-xs font-semibold tracking-wider text-brand-700 dark:text-brand-100 uppercase">
                {personalInfo.role}
              </span>
            </motion.div>

            {/* Main Title Heading */}
            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-sans text-4xl sm:text-5xl md:text-6xl font-extrabold text-navy-900 dark:text-white tracking-tight leading-tight"
              >
                {personalInfo.name}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-mono text-xs sm:text-sm md:text-base font-semibold text-brand-600 dark:text-brand-500 uppercase tracking-widest max-w-2xl leading-relaxed"
              >
                {personalInfo.institution}
              </motion.p>
            </div>

            {/* Headline Block */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-sans text-lg sm:text-xl font-medium text-navy-700 dark:text-navy-300 leading-relaxed border-l-2 border-brand-500 pl-4 py-1"
            >
              &ldquo;Future Strategy Consultant | Supply Chain &amp; Operations Enthusiast | Data-Driven Problem Solver&rdquo;
            </motion.h2>

            {/* Paragraph Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-sans text-sm sm:text-base text-navy-500 dark:text-navy-400 leading-relaxed max-w-2xl"
            >
              {personalInfo.introduction}
            </motion.p>

            {/* Location indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center space-x-2 text-xs font-mono text-navy-400 dark:text-navy-500"
            >
              <MapPin className="w-4 h-4 text-brand-500" />
              <span>{personalInfo.location}</span>
            </motion.div>

            {/* CTA Actions */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a
                href="#resume"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded bg-navy-900 text-white hover:bg-brand-600 dark:bg-white dark:text-navy-950 dark:hover:bg-brand-100 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <FileText className="mr-2 w-4 h-4" /> Download Resume
              </a>

              <a
                href={personalInfo.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-5 py-3 border border-navy-200 dark:border-navy-700 text-sm font-medium rounded bg-white text-navy-700 hover:bg-navy-50 dark:bg-navy-800 dark:text-navy-200 dark:hover:bg-navy-700 shadow-sm transition-all duration-200 cursor-pointer"
              >
                <Linkedin className="mr-2 w-4 h-4 text-brand-500" /> LinkedIn
              </a>

              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="inline-flex items-center justify-center px-5 py-3 border border-navy-200 dark:border-navy-700 text-sm font-medium rounded bg-white text-navy-700 hover:bg-navy-50 dark:bg-navy-800 dark:text-navy-200 dark:hover:bg-navy-700 shadow-sm transition-all duration-200 cursor-pointer"
              >
                <Mail className="mr-2 w-4 h-4 text-red-500" /> Email Me
              </a>

              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-sm font-medium rounded bg-brand-50 hover:bg-brand-100 text-brand-600 dark:bg-brand-500/10 dark:text-brand-100 dark:hover:bg-brand-500/20 transition-all duration-200 cursor-pointer"
              >
                Contact Info
              </a>
            </motion.div>
          </div>

          {/* Right Hero Visual Column */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden glass-light dark:glass-dark shadow-2xl p-4 border border-navy-100/50 dark:border-navy-800/50"
            >
              {/* Inner container mimicking a physical photograph / artwork */}
              <div className="w-full h-full rounded-xl bg-gradient-to-tr from-navy-950 via-navy-900 to-brand-700 relative overflow-hidden flex flex-col justify-center items-center text-center p-6 select-none group">
                
                {/* Background soft lighting effects */}
                <div className="absolute inset-0 bg-radial-gradient from-brand-500/20 via-transparent to-transparent opacity-60" />
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full transform rotate-45 transition-transform duration-1000 group-hover:scale-125" />
                
                {/* Abstract corporate professional illustration */}
                <div className="relative z-10 space-y-6 flex flex-col items-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white/20 dark:border-white/10 flex items-center justify-center bg-white/5 shadow-inner">
                    <span className="font-mono text-3xl font-extrabold text-white tracking-widest">
                      BK
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="block font-mono text-[10px] tracking-widest text-brand-300 uppercase font-bold">
                      Operations &amp; Consulting
                    </span>
                    <h3 className="font-sans text-xl font-bold text-white tracking-wide">
                      Bhawesh Kalauni
                    </h3>
                    <span className="block text-xs text-navy-300 font-medium">
                      NEOMA Business School
                    </span>
                  </div>
                  
                  {/* Subtle decorative badges */}
                  <div className="flex gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono text-[9px] tracking-wide uppercase">
                      B.Eng Mechanical
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-500/30 text-brand-100 border border-brand-400/20 font-mono text-[9px] tracking-wide uppercase">
                      MIM NEOMA
                    </span>
                  </div>
                </div>

                {/* Corner accent lines mimicking drafting papers or architectural blueprints */}
                <div className="absolute top-4 left-4 w-6 h-[2px] bg-white/20" />
                <div className="absolute top-4 left-4 w-[2px] h-6 bg-white/20" />
                
                <div className="absolute top-4 right-4 w-6 h-[2px] bg-white/20" />
                <div className="absolute top-4 right-4 w-[2px] h-6 bg-white/20" />

                <div className="absolute bottom-4 left-4 w-6 h-[2px] bg-white/20" />
                <div className="absolute bottom-4 left-4 w-[2px] h-6 bg-white/20" />

                <div className="absolute bottom-4 right-4 w-6 h-[2px] bg-white/20" />
                <div className="absolute bottom-4 right-4 w-[2px] h-6 bg-white/20" />
              </div>
            </motion.div>
          </div>

        </div>

        {/* Scroll Down Anchor */}
        <div className="flex justify-center mt-12 md:mt-16">
          <button
            onClick={handleScrollToAbout}
            className="flex flex-col items-center space-y-2 text-navy-400 hover:text-navy-900 dark:hover:text-white transition-colors group cursor-pointer focus:outline-none"
            aria-label="Scroll down to About section"
          >
            <span className="font-mono text-[10px] tracking-widest uppercase font-semibold">
              Discover More
            </span>
            <div className="w-8 h-8 rounded-full border border-navy-200 dark:border-navy-800 flex items-center justify-center bg-white dark:bg-navy-900 shadow-sm group-hover:shadow group-hover:border-navy-400 dark:group-hover:border-navy-600 transition-all duration-300">
              <ArrowDown className="w-4 h-4 text-brand-500 animate-bounce" />
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}
