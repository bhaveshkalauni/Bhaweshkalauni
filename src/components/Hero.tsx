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
      className="relative flex flex-col justify-center min-h-[calc(100svh-4.5rem)] py-8 sm:py-10 md:py-12 lg:py-8 xl:py-12 border-b-2 border-[#111214] bg-[#F3F2F0] box-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        
        {/* Main Grid: Left copy, Right Spec Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left Column: Bold Typography & Personal Manifesto */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-5 lg:space-y-4 xl:space-y-6">
            
            {/* Eyebrow with Cyan indicator */}
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#111214] uppercase">
              <span className="w-2.5 h-2.5 bg-[#20A0B5] inline-block shrink-0"></span>
              <span>SUPPLY CHAIN · OPERATIONS · ANALYTICS</span>
            </div>

            {/* Massive Bold Headline with balanced responsive scaling */}
            <div className="space-y-1.5 sm:space-y-2">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[3.6rem] xl:text-[4.5rem] 2xl:text-[5rem] font-black tracking-tight uppercase text-[#111214] leading-[0.92]">
                BUILDING.<br />
                LEARNING.<br />
                EVOLVING.
              </h1>
              <div className="inline-block bg-[#20A0B5] text-[#111214] px-2.5 py-1 sm:px-3 sm:py-1.5 mt-1 sm:mt-1.5">
                <span className="text-[11px] sm:text-xs md:text-sm font-black font-mono tracking-wider uppercase leading-snug">
                  A PORTFOLIO OF IDEAS, PROJECTS &amp; EXPERIENCES
                </span>
              </div>
            </div>

            {/* High-legibility Subtitle */}
            <p className="text-sm sm:text-base md:text-lg lg:text-base xl:text-lg text-[#3F454A] font-normal leading-relaxed max-w-2xl pt-0.5 sm:pt-1">
              Master in Management candidate at <strong className="text-[#111214] font-semibold">NEOMA Business School</strong> with a <strong className="text-[#111214] font-semibold">Mechanical Engineering</strong> background. Documenting my work in multi-echelon inventory modeling, process optimization, analytics, and operational strategy.
            </p>

            {/* Action Buttons (Always fully visible above the fold) */}
            <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.contact.email}&su=Hello%20Bhawesh%20-%20Portfolio%20Inquiry`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-[#20A0B5] text-[#111214] font-mono text-xs sm:text-sm font-bold tracking-wider uppercase border-2 border-[#111214] shadow-[4px_4px_0px_#111214] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111214] transition-all cursor-pointer"
              >
                <span>GET IN TOUCH →</span>
              </a>

              <button
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-[#F7F7F6] text-[#111214] font-mono text-xs sm:text-sm font-bold tracking-wider uppercase border-2 border-[#111214] shadow-[4px_4px_0px_#111214] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111214] transition-all cursor-pointer"
              >
                <span>EXPLORE MY WORK ↓</span>
              </button>
            </div>

          </div>

          {/* Right Column: Signature Spec Card */}
          <div className="lg:col-span-4 lg:pl-2 xl:pl-4">
            <div className="border-2 border-[#111214] shadow-[5px_5px_0px_#111214] xl:shadow-[6px_6px_0px_#111214] bg-[#F7F7F6] overflow-hidden">
              
              {/* Card Header */}
              <div className="bg-[#20A0B5] text-[#111214] px-4 py-2.5 sm:py-3 border-b-2 border-[#111214] font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-between">
                <span>PORTFOLIO SPEC</span>
                <span className="text-[10px] font-bold">2026 //</span>
              </div>

              {/* Spec Rows */}
              <div className="divide-y-2 divide-[#111214] text-xs font-mono">
                
                <div className="flex items-center px-4 py-2 sm:py-2.5 xl:py-3">
                  <span className="w-20 sm:w-24 text-[#3F454A] uppercase tracking-wider font-semibold">BASED</span>
                  <span className="text-[#111214] font-bold">Rouen, France / Global</span>
                </div>

                <div className="flex items-center px-4 py-2 sm:py-2.5 xl:py-3">
                  <span className="w-20 sm:w-24 text-[#3F454A] uppercase tracking-wider font-semibold">DEGREE</span>
                  <span className="text-[#111214] font-bold">MiM · NEOMA Business</span>
                </div>

                <div className="flex items-center px-4 py-2 sm:py-2.5 xl:py-3">
                  <span className="w-20 sm:w-24 text-[#3F454A] uppercase tracking-wider font-semibold">ORIGIN</span>
                  <span className="text-[#111214] font-bold">B.Tech Mechanical Eng.</span>
                </div>

                <div className="flex items-center px-4 py-2 sm:py-2.5 xl:py-3">
                  <span className="w-20 sm:w-24 text-[#3F454A] uppercase tracking-wider font-semibold">FOCUS</span>
                  <span className="text-[#111214] font-bold">Supply Chain · Ops · Analytics</span>
                </div>

                <div className="flex items-center px-4 py-2 sm:py-2.5 xl:py-3">
                  <span className="w-20 sm:w-24 text-[#3F454A] uppercase tracking-wider font-semibold">STACK</span>
                  <span className="text-[#111214] font-bold">Power BI · Excel · SQL · Solver</span>
                </div>

                <div className="flex items-center px-4 py-2 sm:py-2.5 xl:py-3 bg-[#F7F7F6]">
                  <span className="w-20 sm:w-24 text-[#3F454A] uppercase tracking-wider font-semibold">STATUS</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1E7A62] animate-pulse"></span>
                    <span className="text-[#1E7A62] font-bold uppercase text-[11px] sm:text-xs">Open to Opportunities</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Quick Micro Tag */}
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#3F454A] px-1">
              <span>RESPONSE TIME: &lt; 24 HRS</span>
              <span className="font-bold text-[#111214]">CET / UTC+1</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
