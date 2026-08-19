import React, { useState, useEffect } from "react";
import { ArrowUpRight, X, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { caseStudies } from "../data";
import { CaseStudyItem } from "../types";

export default function Projects() {
  const [selectedCase, setSelectedCase] = useState<CaseStudyItem | null>(null);

  // Keyboard navigation & modal body lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCase(null);
      }
    };

    if (selectedCase) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCase]);

  const handleNextCase = () => {
    if (!selectedCase) return;
    const currentIndex = caseStudies.findIndex((c) => c.id === selectedCase.id);
    const nextIndex = (currentIndex + 1) % caseStudies.length;
    setSelectedCase(caseStudies[nextIndex]);
  };

  const handlePrevCase = () => {
    if (!selectedCase) return;
    const currentIndex = caseStudies.findIndex((c) => c.id === selectedCase.id);
    const prevIndex = (currentIndex - 1 + caseStudies.length) % caseStudies.length;
    setSelectedCase(caseStudies[prevIndex]);
  };

  return (
    <section id="projects" className="py-20 md:py-28 border-b-2 border-[#111214] bg-[#F3F2F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b-2 border-[#111214]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#111214] uppercase mb-2">
              <span className="w-2.5 h-2.5 bg-[#20A0B5] inline-block"></span>
              <span>01 // PROJECTS &amp; CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-[#111214]">
              Selected Work
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm font-mono text-[#3F454A] max-w-md">
            A collection of quantitative models, operations analyses, and strategic sourcing case studies documenting my analytical approaches.
          </p>
        </div>

        {/* Case Studies Index Cards */}
        <div className="space-y-6">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              onClick={() => setSelectedCase(study)}
              className="group p-6 sm:p-8 bg-[#F7F7F6] border-2 border-[#111214] shadow-[4px_4px_0px_#111214] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111214] transition-all cursor-pointer"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
                
                {/* Index & Category */}
                <div className="lg:col-span-3 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#111214]">
                    <span className="bg-[#20A0B5] px-1.5 py-0.5 text-[#111214]">
                      {study.index}
                    </span>
                    <span className="text-[#3F454A] uppercase tracking-wider text-[11px]">
                      {study.category}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[#3F454A]">
                    {study.timeline}
                  </div>
                </div>

                {/* Title & Core Summary */}
                <div className="lg:col-span-6 space-y-3">
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-[#111214] group-hover:text-[#20A0B5] transition-colors leading-tight">
                    {study.title}
                  </h3>
                  <p className="text-sm text-[#3F454A] leading-relaxed">
                    {study.summary}
                  </p>
                  
                  {/* Tools snippet */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {study.toolsUsed.map((tool) => (
                      <span
                        key={tool}
                        className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 border border-[#111214] bg-[#F3F2F0] text-[#111214]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Primary Metric & Action */}
                <div className="lg:col-span-3 flex lg:flex-col lg:items-end justify-between items-center gap-3 pt-2 lg:pt-0">
                  <div className="border-2 border-[#111214] bg-[#20A0B5] px-3 py-1.5 shadow-[2px_2px_0px_#111214] text-right">
                    <div className="font-mono font-black text-base sm:text-lg text-[#111214] leading-none">
                      {study.heroMetric.value}
                    </div>
                    <div className="font-mono text-[10px] font-bold uppercase text-[#111214]">
                      {study.heroMetric.label}
                    </div>
                  </div>
                  
                  <div className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase text-[#111214] group-hover:translate-x-1 transition-transform">
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Case Study Full Reader Modal */}
      {selectedCase && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-[#111214]/80 backdrop-blur-xs flex justify-center p-3 sm:p-6 md:p-10"
          onClick={() => setSelectedCase(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-[#F3F2F0] text-[#111214] border-3 border-[#111214] shadow-[8px_8px_0px_#111214] overflow-hidden my-auto max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[#111214] bg-[#20A0B5] sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-black text-[#111214] uppercase tracking-wider">
                  CASE STUDY // {selectedCase.index}
                </span>
                <span className="text-[11px] font-mono font-bold uppercase px-2 py-0.5 border border-[#111214] bg-[#F7F7F6] text-[#111214]">
                  {selectedCase.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevCase}
                  className="p-1.5 bg-[#F7F7F6] border border-[#111214] hover:bg-white text-[#111214] transition-colors cursor-pointer"
                  title="Previous Case"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextCase}
                  className="p-1.5 bg-[#F7F7F6] border border-[#111214] hover:bg-white text-[#111214] transition-colors cursor-pointer"
                  title="Next Case"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="p-1.5 ml-2 bg-[#111214] text-[#F3F2F0] hover:bg-[#3F454A] transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 md:p-10 overflow-y-auto space-y-8 bg-[#F3F2F0]">
              
              {/* Header Title & Key Metric */}
              <div className="space-y-4 pb-6 border-b-2 border-[#111214]">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase text-[#111214]">
                  {selectedCase.title}
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="p-3 bg-[#F7F7F6] border-2 border-[#111214]">
                    <div className="text-[10px] font-mono font-bold tracking-widest text-[#3F454A] uppercase">ROLE</div>
                    <div className="text-xs font-bold text-[#111214] mt-1">{selectedCase.role}</div>
                  </div>
                  <div className="p-3 bg-[#F7F7F6] border-2 border-[#111214]">
                    <div className="text-[10px] font-mono font-bold tracking-widest text-[#3F454A] uppercase">TIMELINE</div>
                    <div className="text-xs font-bold text-[#111214] mt-1">{selectedCase.timeline}</div>
                  </div>
                  <div className="p-3 bg-[#20A0B5] border-2 border-[#111214] col-span-2 sm:col-span-2 shadow-[2px_2px_0px_#111214]">
                    <div className="text-[10px] font-mono font-bold tracking-widest text-[#111214] uppercase">KEY QUANTIFIED IMPACT</div>
                    <div className="text-sm font-black text-[#111214] mt-0.5">
                      {selectedCase.heroMetric.value} · {selectedCase.heroMetric.label}
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytical Progression Steps */}
              <div className="p-4 bg-[#F7F7F6] border-2 border-[#111214]">
                <div className="text-[11px] font-mono font-bold tracking-widest text-[#111214] uppercase mb-2">
                  STRUCTURED ANALYTICAL PROGRESSION
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2 text-[#111214] font-bold">
                    <span className="w-5 h-5 bg-[#111214] text-white flex items-center justify-center text-[10px]">1</span>
                    <span>Problem Scope</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#111214] font-bold">
                    <span className="w-5 h-5 bg-[#111214] text-white flex items-center justify-center text-[10px]">2</span>
                    <span>Methodology</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#111214] font-bold">
                    <span className="w-5 h-5 bg-[#111214] text-white flex items-center justify-center text-[10px]">3</span>
                    <span>Model Discovery</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#111214] font-bold">
                    <span className="w-5 h-5 bg-[#20A0B5] text-[#111214] flex items-center justify-center text-[10px]">4</span>
                    <span>Execution &amp; ROI</span>
                  </div>
                </div>
              </div>

              {/* Problem & Operational Context */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 p-5 bg-[#F7F7F6] border-2 border-[#111214]">
                  <div className="text-xs font-mono font-bold text-[#111214] uppercase">
                    01 // THE PROBLEM &amp; OBJECTIVE
                  </div>
                  <p className="text-sm text-[#3F454A] leading-relaxed">
                    {selectedCase.problem}
                  </p>
                  <p className="text-xs text-[#111214] font-mono font-semibold pt-1 border-t border-[#111214]/20">
                    Target: {selectedCase.objective}
                  </p>
                </div>

                <div className="space-y-2 p-5 bg-[#F7F7F6] border-2 border-[#111214]">
                  <div className="text-xs font-mono font-bold text-[#111214] uppercase">
                    02 // OPERATIONAL CONTEXT
                  </div>
                  <p className="text-sm text-[#3F454A] leading-relaxed">
                    {selectedCase.context}
                  </p>
                </div>
              </div>

              {/* Approach & Methodology */}
              <div className="space-y-4 p-6 bg-[#F7F7F6] border-2 border-[#111214]">
                <div className="text-xs font-mono font-bold text-[#111214] uppercase">
                  03 // ANALYTICAL APPROACH &amp; ALGORITHMS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedCase.approach.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-[#3F454A]">
                      <span className="font-mono text-xs font-bold text-[#111214] bg-[#20A0B5] px-1.5 py-0.5 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantitative Analysis Box */}
              <div className="p-6 bg-[#111214] text-[#F3F2F0] border-2 border-[#111214] space-y-3 font-mono">
                <div className="text-xs font-bold tracking-widest text-[#20A0B5] uppercase">
                  04 // QUANTITATIVE ANALYSIS &amp; EMPIRICAL INSIGHTS
                </div>
                <div className="space-y-2">
                  {selectedCase.analysis.map((line, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F7F6]">
                      <span className="text-[#20A0B5] font-bold">&gt;</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Findings & Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 p-5 bg-[#F7F7F6] border-2 border-[#111214]">
                  <div className="text-xs font-mono font-bold text-[#111214] uppercase">
                    05 // KEY FINDINGS
                  </div>
                  <ul className="space-y-2">
                    {selectedCase.keyFindings.map((finding, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[#3F454A]">
                        <span className="font-mono text-[#111214] font-bold mt-0.5">▪</span>
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 p-5 bg-[#F7F7F6] border-2 border-[#111214]">
                  <div className="text-xs font-mono font-bold text-[#111214] uppercase">
                    06 // OPERATIONAL RECOMMENDATIONS
                  </div>
                  <ul className="space-y-2">
                    {selectedCase.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[#3F454A]">
                        <CheckCircle2 className="w-4 h-4 text-[#1E7A62] shrink-0 mt-0.5" />
                        <span className="font-medium text-[#111214]">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tools & Stack Footer */}
              <div className="pt-4 border-t-2 border-[#111214] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#111214] uppercase mr-2">
                    STACK:
                  </span>
                  {selectedCase.toolsUsed.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 text-xs font-mono font-bold uppercase bg-[#20A0B5] text-[#111214] border border-[#111214]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedCase(null)}
                  className="px-5 py-2.5 text-xs font-mono font-bold uppercase bg-[#111214] text-[#F3F2F0] hover:bg-[#3F454A] border-2 border-[#111214] cursor-pointer"
                >
                  CLOSE CASE STUDY [ESC]
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
