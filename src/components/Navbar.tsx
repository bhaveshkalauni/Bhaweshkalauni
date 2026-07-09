import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "motion/react";
import { personalInfo } from "../data";

interface NavLink {
  label: string;
  href: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const navLinks: NavLink[] = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Interests", href: "#career-interests" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    // Scroll header background detection
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Active section detection using IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -60% 0px", // Trigger when section occupies the upper-middle region of screen
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    navLinks.forEach((link) => {
      const el = document.getElementById(link.href.replace("#", ""));
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 80; // height of fixed navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Manually set active state in case observer hasn't triggered yet
      setActiveSection(targetId);
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-navy-950/80 backdrop-blur-md border-b border-navy-100 dark:border-navy-900 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Monogram */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="flex items-center space-x-2 group cursor-pointer"
          >
            <span className="w-9 h-9 rounded-full bg-navy-900 dark:bg-white text-white dark:text-navy-950 font-mono font-bold text-sm tracking-widest flex items-center justify-center transition-all duration-300 group-hover:bg-brand-500 group-hover:text-white dark:group-hover:bg-brand-500">
              BK
            </span>
            <span className="font-sans font-semibold tracking-tight text-navy-900 dark:text-white text-base md:text-lg">
              Bhawesh <span className="text-brand-500 font-normal">Kalauni</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isSelected = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative px-3.5 py-2 rounded-md font-sans text-xs font-medium tracking-wide uppercase transition-colors duration-200 cursor-pointer ${
                    isSelected
                      ? "text-brand-500 dark:text-brand-100"
                      : "text-navy-500 hover:text-navy-900 dark:text-navy-400 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                  {isSelected && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-brand-500 dark:bg-brand-100"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right side elements */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.contact.email}&su=Consulting%20Inquiry`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-mono tracking-widest uppercase rounded bg-navy-900 text-white hover:bg-brand-600 dark:bg-white dark:text-navy-950 dark:hover:bg-brand-100 transition-all duration-200 shadow-sm cursor-pointer"
            >
              Consult Me <ArrowUpRight className="ml-1.5 w-3 h-3" />
            </a>
          </div>

          {/* Mobile menu button & Theme toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-navy-500 hover:text-navy-900 dark:text-navy-400 dark:hover:text-white hover:bg-navy-100 dark:hover:bg-navy-800 transition-colors cursor-pointer"
              aria-expanded="false"
              aria-label="Toggle main menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (AnimatePresence) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white dark:bg-navy-950 border-b border-navy-100 dark:border-navy-900 shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
              {navLinks.map((link) => {
                const isSelected = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`block px-4 py-3 rounded-md font-sans text-sm font-medium tracking-wide uppercase transition-colors ${
                      isSelected
                        ? "bg-brand-50 text-brand-500 dark:bg-brand-500/10 dark:text-brand-100 font-semibold border-l-4 border-brand-500"
                        : "text-navy-500 hover:text-navy-900 hover:bg-navy-50 dark:text-navy-400 dark:hover:text-white dark:hover:bg-navy-900"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-4 px-4 border-t border-navy-100 dark:border-navy-900 mt-4">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.contact.email}&su=Consulting%20Inquiry`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-4 py-3 text-xs font-mono tracking-widest uppercase rounded bg-navy-900 text-white hover:bg-brand-600 dark:bg-white dark:text-navy-950 hover:shadow-md transition-all duration-200"
                >
                  Consult Me <ArrowUpRight className="ml-1.5 w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
