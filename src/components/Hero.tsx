import React from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { personalInfo } from "../data";

export default function Hero() {
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b-2 border-[#111214] bg-[#F3F2F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Left copy, Right Spec Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Bold Typography & Manifesto */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            
            {/* Eyebrow with Cyan indicator */}
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#111214] uppercase">
              <span className="w-2.5 h-2.5 bg-[#20A0B5] inline-block"></span>
              <span>SUPPLY CHAIN · OPERATIONS · ANALYTICS</span>
            </div>

            {/* Massive Bold Headline (Reference style) */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-black tracking-tight uppercase text-[#111214] leading-[0.92]">
                YOU HAVE BOTTLENECKS.
              </h1>
              <div className="inline-block bg-[#20A0B5] text-[#111214] px-3 py-1 mt-1">
                <span className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-black tracking-tight uppercase leading-[0.92]">
                  I SOLVE THEM.
                </span>
              </div>
            </div>

            {/* High-legibility Subtitle */}
            <p className="text-lg sm:text-xl text-[#3F454A] font-normal leading-relaxed max-w-2xl pt-2">
              Master in Management candidate at <strong className="text-[#111214] font-semibold">NEOMA Business School</strong> with a <strong className="text-[#111214] font-semibold">Mechanical Engineering</strong> background. I find where operations stall, model multi-echelon inventory, and build resilient, data-backed supply networks.
            </p>

            {/* Action Buttons (Reference style with hard drop shadows) */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.contact.email}&su=Supply%20Chain%20%26%20Operations%20Inquiry`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#20A0B5] text-[#111214] font-mono text-xs sm:text-sm font-bold tracking-wider uppercase border-2 border-[#111214] shadow-[4px_4px_0px_#111214] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111214] transition-all cursor-pointer"
              >
                <span>BOOK A 30-MIN CALL →</span>
              </a>

              <button
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#F7F7F6] text-[#111214] font-mono text-xs sm:text-sm font-bold tracking-wider uppercase border-2 border-[#111214] shadow-[4px_4px_0px_#111214] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111214] transition-all cursor-pointer"
              >
                <span>SEE THE WORK ↓</span>
              </button>
            </div>

          </div>

          {/* Right Column: Signature Spec Card (Exact Karol Binkowski layout) */}
          <div className="lg:col-span-4 lg:pl-4">
            <div className="border-2 border-[#111214] shadow-[6px_6px_0px_#111214] bg-[#F7F7F6] overflow-hidden">
              
              {/* Card Header */}
              <div className="bg-[#20A0B5] text-[#111214] px-4 py-3 border-b-2 border-[#111214] font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-between">
                <span>OPERATIONS SPEC</span>
                <span className="text-[10px] font-bold">2026 //</span>
              </div>

              {/* Spec Rows */}
              <div className="divide-y-2 divide-[#111214] text-xs font-mono">
                
                <div className="flex items-center px-4 py-3">
                  <span className="w-24 text-[#3F454A] uppercase tracking-wider font-semibold">BASED</span>
                  <span className="text-[#111214] font-bold">Rouen, France / Global</span>
                </div>

                <div className="flex items-center px-4 py-3">
                  <span className="w-24 text-[#3F454A] uppercase tracking-wider font-semibold">DEGREE</span>
                  <span className="text-[#111214] font-bold">MiM · NEOMA Business School</span>
                </div>

                <div className="flex items-center px-4 py-3">
                  <span className="w-24 text-[#3F454A] uppercase tracking-wider font-semibold">ORIGIN</span>
                  <span className="text-[#111214] font-bold">B.Tech Mechanical Engineering</span>
                </div>

                <div className="flex items-center px-4 py-3">
                  <span className="w-24 text-[#3F454A] uppercase tracking-wider font-semibold">ENGAGE</span>
                  <span className="text-[#111214] font-bold">Supply Chain · Ops · Strategy</span>
                </div>

                <div className="flex items-center px-4 py-3">
                  <span className="w-24 text-[#3F454A] uppercase tracking-wider font-semibold">STACK</span>
                  <span className="text-[#111214] font-bold">Power BI · Excel · SQL · Solver</span>
                </div>

                <div className="flex items-center px-4 py-3 bg-[#F7F7F6]">
                  <span className="w-24 text-[#3F454A] uppercase tracking-wider font-semibold">STATUS</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1E7A62] animate-pulse"></span>
                    <span className="text-[#1E7A62] font-bold uppercase">Available for Roles</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Quick Micro Tag */}
            <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-[#3F454A] px-1">
              <span>RESPONSE TIME: &lt; 24 HRS</span>
              <span className="font-bold text-[#111214]">CET / UTC+1</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
