import React from "react";
import { educationTimeline } from "../data";

export default function Education() {
  return (
    <div className="space-y-8">
      <div className="text-xs font-mono font-bold tracking-widest text-[#111214] uppercase border-b-2 border-[#111214] pb-2">
        // ACADEMIC FOUNDATION
      </div>

      <div className="space-y-8 divide-y-2 divide-[#111214]">
        {educationTimeline.map((edu, idx) => (
          <div key={edu.id} className={idx > 0 ? "pt-8" : ""}>
            <div className="space-y-4">
              
              {/* Institution Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h3 className="text-lg font-black text-[#111214] uppercase tracking-tight">
                    {edu.degree}
                  </h3>
                  <div className="text-xs font-mono font-bold text-[#20A0B5]">
                    {edu.institution} · {edu.location}
                  </div>
                </div>
                <div className="text-xs font-mono font-bold text-[#3F454A]">
                  {edu.period}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[#3F454A] leading-relaxed">
                {edu.description}
              </p>

              {/* Key Courses / Core Modules */}
              <div className="space-y-2 pt-2">
                <div className="text-[10px] font-mono font-bold tracking-widest text-[#111214] uppercase">
                  KEY STUDY MODULES &amp; RIGOR
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {edu.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-[#3F454A]">
                      <span className="font-mono text-[#20A0B5] font-bold shrink-0">■</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
