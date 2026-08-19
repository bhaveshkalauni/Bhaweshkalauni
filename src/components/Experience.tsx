import React from "react";
import { experienceTimeline } from "../data";

export default function Experience() {
  return (
    <div className="space-y-8">
      <div className="text-xs font-mono font-bold tracking-widest text-[#111214] uppercase border-b-2 border-[#111214] pb-2">
        // PROFESSIONAL EXPERIENCE &amp; OPERATIONS
      </div>

      <div className="space-y-8 divide-y-2 divide-[#111214]">
        {experienceTimeline.map((exp, idx) => (
          <div key={exp.id} className={idx > 0 ? "pt-8" : ""}>
            <div className="space-y-4">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h3 className="text-lg font-black text-[#111214] uppercase tracking-tight">
                    {exp.role}
                  </h3>
                  <div className="text-xs font-mono font-bold text-[#20A0B5]">
                    {exp.company} · {exp.location}
                  </div>
                </div>
                <div className="text-xs font-mono font-bold text-[#3F454A]">
                  {exp.period}
                </div>
              </div>

              {/* Quantified Metrics Highlight Bar */}
              {exp.impactMetrics && exp.impactMetrics.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {exp.impactMetrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="px-2.5 py-1 text-[11px] font-mono border border-[#111214] bg-[#20A0B5] text-[#111214] flex items-center gap-1.5 shadow-[1px_1px_0px_#111214]"
                    >
                      <span className="font-black text-[#111214]">{m.value}</span>
                      <span className="text-[#111214] text-[10px] font-bold uppercase">{m.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Deliverables Bullet List */}
              <div className="space-y-2 pt-2">
                {exp.deliverables.map((item, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2.5 text-xs text-[#3F454A] leading-normal">
                    <span className="font-mono text-[#111214] font-bold shrink-0">→</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 border border-[#111214] bg-[#F3F2F0] text-[#111214]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
