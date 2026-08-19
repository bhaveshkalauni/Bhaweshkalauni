import React from "react";
import { expertiseAreas } from "../data";

export default function Skills() {
  return (
    <section id="expertise" className="py-20 md:py-28 border-b-2 border-[#111214] bg-[#F3F2F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b-2 border-[#111214]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#111214] uppercase mb-2">
              <span className="w-2.5 h-2.5 bg-[#20A0B5] inline-block"></span>
              <span>02 // SKILLS &amp; EXPERTISE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-[#111214]">
              Areas of Focus
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm font-mono text-[#3F454A] max-w-md">
            Capabilities developed across mechanical engineering fundamentals, management coursework, and supply chain data analytics.
          </p>
        </div>

        {/* 3-Column Structured Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expertiseAreas.map((area, idx) => (
            <div
              key={area.id}
              className="p-6 sm:p-8 bg-[#F7F7F6] border-2 border-[#111214] shadow-[4px_4px_0px_#111214] space-y-6 flex flex-col justify-between"
            >
              {/* Category Header */}
              <div className="space-y-2 pb-4 border-b-2 border-[#111214]">
                <div className="inline-block bg-[#20A0B5] text-[#111214] px-2 py-0.5 text-xs font-mono font-black uppercase">
                  INDEX // 0{idx + 1}
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-[#111214]">
                  {area.category}
                </h3>
                <p className="text-xs font-mono text-[#3F454A]">
                  {area.subtitle}
                </p>
              </div>

              {/* Skills Items List */}
              <div className="space-y-4 flex-1">
                {area.items.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-baseline justify-between text-sm font-bold text-[#111214]">
                      <span>{item.name}</span>
                      <span className="text-[10px] font-mono font-bold text-[#20A0B5]">
                        // SKILL
                      </span>
                    </div>
                    {item.detail && (
                      <p className="text-xs text-[#3F454A] leading-relaxed">
                        {item.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
