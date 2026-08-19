import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { personalInfo } from "../data";

interface NavLink {
  label: string;
  index: string;
  href: string;
}

const navLinks: NavLink[] = [
  { index: "01", label: "WORK", href: "#projects" },
  { index: "02", label: "EXPERTISE", href: "#expertise" },
  { index: "03", label: "ABOUT", href: "#background" },
  { index: "04", label: "TIMELINE", href: "#timeline" },
  { index: "05", label: "CONTACT", href: "#contact" }
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["projects", "expertise", "background", "timeline", "contact"];
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-50 w-full bg-[#F3F2F0] border-b-2 border-[#111214]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand identity: KB style badge */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 bg-[#111214] text-[#F3F2F0] font-black font-mono text-sm flex items-center justify-center tracking-tighter">
            BK
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm sm:text-base tracking-tight uppercase text-[#111214]">
              Bhawesh Kalauni
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-xs font-mono font-bold tracking-widest transition-all ${
                  isActive
                    ? "text-[#111214] border-b-2 border-[#20A0B5] pb-0.5"
                    : "text-[#3F454A] hover:text-[#111214]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop Action: Karol Binkowski signature CTA button */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.contact.email}&su=Supply%20Chain%20%26%20Operations%20Inquiry`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#20A0B5] text-[#111214] font-mono text-xs font-bold tracking-wider uppercase border-2 border-[#111214] shadow-[3px_3px_0px_#111214] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#111214] transition-all cursor-pointer"
          >
            <span>BOOK A CALL →</span>
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#111214] border-2 border-[#111214] bg-[#F7F7F6] shadow-[2px_2px_0px_#111214] cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-[#111214] bg-[#F7F7F6] px-4 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="flex items-center justify-between text-sm font-mono font-bold tracking-wider py-2 border-b border-[#111214]/20 text-[#111214]"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#20A0B5]">→</span>
              </a>
            ))}
          </div>

          <div className="pt-2">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.contact.email}&su=Supply%20Chain%20%26%20Operations%20Inquiry`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-mono font-bold tracking-wider uppercase bg-[#20A0B5] text-[#111214] border-2 border-[#111214] shadow-[3px_3px_0px_#111214]"
            >
              <span>BOOK A CALL / OPEN GMAIL →</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
