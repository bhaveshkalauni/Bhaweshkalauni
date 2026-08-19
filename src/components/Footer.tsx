import React from "react";
import { ArrowUp } from "lucide-react";
import { personalInfo } from "../data";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-[#F3F2F0] border-t-2 border-[#111214] text-[#111214] text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b-2 border-[#111214]">
          
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-7 h-7 bg-[#111214] text-[#F3F2F0] font-black font-mono text-xs flex items-center justify-center">
              BK
            </div>
            <div>
              <div className="font-black uppercase tracking-wider text-[#111214]">
                Bhawesh Kalauni
              </div>
              <div className="text-[#3F454A]">
                Supply Chain &amp; Operations · NEOMA Business School
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[#111214] font-bold">
            <a
              href={personalInfo.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#20A0B5] transition-colors"
            >
              LINKEDIN ↗
            </a>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.contact.email}&su=Inquiry`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#20A0B5] transition-colors"
            >
              GMAIL ↗
            </a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 px-2.5 py-1 border-2 border-[#111214] bg-[#F7F7F6] hover:bg-[#20A0B5] transition-colors cursor-pointer"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#3F454A] text-[11px]">
          <div>
            © {new Date().getFullYear()} BHAWESH KALAUNI. ALL RIGHTS RESERVED.
          </div>
          <div>
            SUPPLY CHAIN &amp; OPERATIONS // ROUEN, FRANCE
          </div>
        </div>
      </div>
    </footer>
  );
}
