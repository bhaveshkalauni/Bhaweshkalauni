import React from "react";
import { backgroundPhases } from "../data";

export default function About() {
  return (
    <section id="background" className="py-20 md:py-28 border-b-2 border-[#111214] bg-[#F3F2F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b-2 border-[#111214]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#111214] uppercase mb-2">
              <span className="w-2.5 h-2.5 bg-[#20A0B5] inline-block"></span>
              <span>03 // THE JOURNEY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-[#111214]">
              Background &amp; Evolution
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm font-mono text-[#3F454A] max-w-md">
            The progression connecting mechanical engineering fundamentals, management education, and supply chain operations.
          </p>
        </div>

        {/* 3-Stage Trajectory Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {backgroundPhases.map((phase) => (
            <div
              key={phase.phase}
              className="p-6 sm:p-8 bg-[#F7F7F6] border-2 border-[#111214] shadow-[4px_4px_0px_#111214] flex flex-col justify-between space-y-6"
            >
              {/* Phase Top Metadata */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold uppercase">
                  <span className="bg-[#20A0B5] text-[#111214] px-2 py-0.5">PHASE // {phase.phase}</span>
                  <span className="text-[#3F454A]">{phase.period}</span>
                </div>

                <h3 className="text-xl font-black uppercase tracking-tight text-[#111214] pt-2">
                  {phase.title}
                </h3>

                <div className="text-xs font-mono font-semibold text-[#3F454A] pb-2 border-b border-[#111214]/20">
                  {phase.institution}
                </div>

                <p className="text-sm text-[#3F454A] leading-relaxed font-normal">
                  {phase.summary}
                </p>
              </div>

              {/* Core Competencies / Learnings */}
              <div className="pt-4 border-t-2 border-[#111214] space-y-2">
                <div className="text-[10px] font-mono font-bold tracking-widest text-[#111214] uppercase">
                  KEY LEARNINGS &amp; FOUNDATIONS
                </div>
                <div className="space-y-1.5">
                  {phase.takeaways.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#3F454A]">
                      <span className="font-mono text-[#20A0B5] font-bold">■</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Editorial Narrative Banner */}
        <div className="mt-12 p-8 bg-[#111214] text-[#F3F2F0] border-2 border-[#111214] shadow-[6px_6px_0px_#20A0B5] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <div className="text-xs font-mono font-bold tracking-widest text-[#20A0B5] uppercase">
              PERSPECTIVE //
            </div>
            <p className="text-base sm:text-lg text-[#F7F7F6] font-normal leading-relaxed">
              &ldquo;Supply chains are complex networks governed by engineering constraints, statistical variance, and human decision systems. I am fascinated by the challenge of designing operations that are resilient, data-backed, and continuously evolving.&rdquo;
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase border-2 border-[#20A0B5] bg-[#111214] text-[#20A0B5]">
              <span>BHAWESH KALAUNI</span>
              <span className="text-[#F3F2F0]">/ PORTFOLIO</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
