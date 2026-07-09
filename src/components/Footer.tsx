import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "../data";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer
      id="main-footer"
      className="py-12 bg-navy-50 dark:bg-navy-950 border-t border-navy-100 dark:border-navy-900 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          {/* Copyright, Name */}
          <div className="space-y-1 text-left">
            <span className="font-sans font-bold text-sm text-navy-900 dark:text-white uppercase tracking-wider block">
              BK &bull; {personalInfo.name}
            </span>
            <p className="font-sans text-xs text-navy-400 dark:text-navy-500">
              &copy; {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved. Styled for Consulting Excellence.
            </p>
          </div>

          {/* Social connections & Back to Top split */}
          <div className="flex flex-wrap items-center gap-6">
            
            {/* Social Icons */}
            <div className="flex items-center space-x-3.5">
              <a
                href={personalInfo.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full border border-navy-200 text-navy-500 hover:text-brand-500 hover:border-brand-400 dark:border-navy-800 dark:text-navy-400 dark:hover:text-white dark:hover:border-navy-600 transition-all cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.contact.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full border border-navy-200 text-navy-500 hover:text-navy-900 hover:border-navy-400 dark:border-navy-800 dark:text-navy-400 dark:hover:text-white dark:hover:border-navy-600 transition-all cursor-pointer"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="p-2 rounded-full border border-navy-200 text-navy-500 hover:text-red-500 hover:border-red-400 dark:border-navy-800 dark:text-navy-400 dark:hover:text-white dark:hover:border-navy-600 transition-all cursor-pointer"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Scroll back to top button */}
            <button
              onClick={handleScrollToTop}
              className="inline-flex items-center justify-center p-2.5 rounded bg-white hover:bg-navy-100 text-navy-500 hover:text-navy-900 border border-navy-200 dark:bg-navy-900 dark:hover:bg-navy-800 dark:text-navy-400 dark:hover:text-white dark:border-navy-800 shadow-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>
    </footer>
  );
}
