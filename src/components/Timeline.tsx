import React, { useState } from "react";
import Experience from "./Experience";
import Education from "./Education";

export default function Timeline() {
  const [activeTab, setActiveTab] = useState<"all" | "experience" | "education">("all");

  return (
    <section id="timeline" className="py-20 md:py-28 border-b-2 border-[#111214] bg-[#F3F2F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b-2 border-[#111214]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#111214] uppercase mb-2">
              <span className="w-2.5 h-2.5 bg-[#20A0B5] inline-block"></span>
              <span>04 // TRACK RECORD</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-[#111214]">
              Experience &amp; Education
            </h2>
          </div>
          
          {/* Filter Tabs with Karol Binkowski styling */}
          <div className="mt-4 md:mt-0 inline-flex items-center border-2 border-[#111214] bg-[#F7F7F6] p-1 shadow-[3px_3px_0px_#111214]">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                activeTab === "all"
                  ? "bg-[#20A0B5] text-[#111214] border border-[#111214]"
                  : "text-[#3F454A] hover:text-[#111214]"
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={`px-4 py-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                activeTab === "experience"
                  ? "bg-[#20A0B5] text-[#111214] border border-[#111214]"
                  : "text-[#3F454A] hover:text-[#111214]"
              }`}
            >
              EXPERIENCE
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`px-4 py-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                activeTab === "education"
                  ? "bg-[#20A0B5] text-[#111214] border border-[#111214]"
                  : "text-[#3F454A] hover:text-[#111214]"
              }`}
            >
              ACADEMIC
            </button>
          </div>
        </div>

        {/* Content Layout */}
        {activeTab === "all" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="p-6 sm:p-8 bg-[#F7F7F6] border-2 border-[#111214] shadow-[4px_4px_0px_#111214]">
              <Experience />
            </div>
            <div className="p-6 sm:p-8 bg-[#F7F7F6] border-2 border-[#111214] shadow-[4px_4px_0px_#111214]">
              <Education />
            </div>
          </div>
        ) : activeTab === "experience" ? (
          <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-[#F7F7F6] border-2 border-[#111214] shadow-[4px_4px_0px_#111214]">
            <Experience />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-[#F7F7F6] border-2 border-[#111214] shadow-[4px_4px_0px_#111214]">
            <Education />
          </div>
        )}

      </div>
    </section>
  );
}
