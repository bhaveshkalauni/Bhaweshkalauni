import { personalInfo, educationTimeline, professionalExperience, skillCategories } from "../data";
import { Download, Eye, FileText, Printer, Check, MapPin, Calendar, Award } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export default function Resume() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section
      id="resume"
      className="py-20 md:py-28 bg-navy-50 dark:bg-navy-950 border-t border-navy-100 dark:border-navy-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 print:hidden">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-600 dark:text-brand-500 uppercase">
            08 / Executive Dossier
          </span>
          <h2 className="mt-2 font-sans text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            Curriculum Vitae
          </h2>
          <div className="mt-4 w-12 h-1 bg-brand-500 mx-auto rounded-full" />
          <p className="mt-4 font-sans text-sm text-navy-500 dark:text-navy-400 max-w-2xl mx-auto">
            Review my professional credentials below. You can save, print, or copy individual sections to match your hiring dashboard.
          </p>
        </div>

        {/* Action Controls Header */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 print:hidden">
          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-mono tracking-widest uppercase rounded bg-navy-900 text-white hover:bg-brand-600 dark:bg-white dark:text-navy-950 dark:hover:bg-brand-100 shadow-sm transition-all duration-200 cursor-pointer"
          >
            <Printer className="w-4 h-4 mr-2" /> Print / Save PDF
          </button>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center justify-center px-5 py-2.5 border border-navy-200 dark:border-navy-800 text-xs font-mono tracking-widest uppercase rounded bg-white text-navy-700 hover:bg-navy-50 dark:bg-navy-900 dark:text-navy-200 dark:hover:bg-navy-800 shadow-sm transition-all duration-200 cursor-pointer"
          >
            {copiedEmail ? (
              <>
                <Check className="w-4 h-4 mr-2 text-emerald-500 animate-scale" /> Copied Address!
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2 text-brand-500" /> Copy Email Address
              </>
            )}
          </button>
        </div>

        {/* The Harvard Business School Standard Chronological Resume Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 shadow-2xl p-6 sm:p-12 md:p-16 rounded-xl relative print:border-none print:shadow-none print:bg-white print:text-black print:p-0"
        >
          {/* Subtle watermark or visual frame for non-print view */}
          <div className="absolute top-0 right-0 left-0 h-[4px] bg-brand-500 rounded-t-xl print:hidden" />

          {/* Core Content Sheet Container (Print optimization relies on standardized structure) */}
          <div className="space-y-8 select-text">
            
            {/* 1. Resume Header (Centered alignment, elite style) */}
            <div className="text-center pb-6 border-b border-navy-100 dark:border-navy-800 print:border-navy-200">
              <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white print:text-black tracking-tight uppercase">
                {personalInfo.name}
              </h3>
              
              <p className="mt-1 font-sans text-xs sm:text-sm font-semibold text-brand-600 dark:text-brand-500 print:text-brand-600 tracking-wide uppercase">
                {personalInfo.role} &bull; {personalInfo.institution}
              </p>

              {/* Contact Information Bar */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 font-mono text-[10px] sm:text-xs text-navy-500 dark:text-navy-400 print:text-navy-700 font-medium">
                <span className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-navy-400 print:text-navy-500" /> {personalInfo.location}
                </span>
                <span className="hidden sm:inline text-navy-300">&bull;</span>
                <a href={`mailto:${personalInfo.contact.email}`} className="hover:text-brand-500 hover:underline">
                  {personalInfo.contact.email}
                </a>
                <span className="hidden sm:inline text-navy-300">&bull;</span>
                <a href={personalInfo.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-brand-500 hover:underline">
                  LinkedIn Profile
                </a>
              </div>
            </div>

            {/* 2. Executive Statement Block */}
            <div className="space-y-2">
              <h4 className="font-sans text-xs font-bold text-navy-950 dark:text-white print:text-black tracking-wider uppercase border-b border-navy-150 dark:border-navy-800 print:border-navy-200 pb-1">
                Executive Profile
              </h4>
              <p className="font-sans text-xs sm:text-sm text-navy-600 dark:text-navy-300 print:text-navy-800 leading-relaxed text-justify">
                {personalInfo.introduction} {personalInfo.aboutDetailed.aspiration}
              </p>
            </div>

            {/* 3. Education Timeline Row */}
            <div className="space-y-4">
              <h4 className="font-sans text-xs font-bold text-navy-950 dark:text-white print:text-black tracking-wider uppercase border-b border-navy-150 dark:border-navy-800 print:border-navy-200 pb-1">
                Education
              </h4>

              <div className="space-y-4">
                {educationTimeline.map((edu) => (
                  <div key={edu.id} className="grid grid-cols-1 md:grid-cols-12 gap-1 items-start">
                    <div className="md:col-span-9">
                      <h5 className="font-sans text-sm font-bold text-navy-900 dark:text-white print:text-black">
                        {edu.institution}
                      </h5>
                      <p className="font-sans text-xs text-navy-600 dark:text-navy-400 print:text-navy-700 italic">
                        {edu.degree}
                      </p>
                      {edu.description && (
                        <p className="mt-1 font-sans text-xs text-navy-500 dark:text-navy-500 print:text-navy-600 leading-relaxed text-justify">
                          {edu.description}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-3 md:text-right text-xs font-mono text-navy-400 dark:text-navy-500 print:text-navy-700">
                      <div className="flex md:block items-center space-x-2 md:space-x-0">
                        <span className="font-semibold block">{edu.period}</span>
                        <span className="block italic text-[10px] md:mt-0.5">{edu.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Professional Experience Row */}
            <div className="space-y-4">
              <h4 className="font-sans text-xs font-bold text-navy-950 dark:text-white print:text-black tracking-wider uppercase border-b border-navy-150 dark:border-navy-800 print:border-navy-200 pb-1">
                Professional Experience
              </h4>

              <div className="space-y-5">
                {professionalExperience.map((exp) => (
                  <div key={exp.id} className="grid grid-cols-1 md:grid-cols-12 gap-1 items-start">
                    <div className="md:col-span-9 space-y-1.5">
                      <div>
                        <h5 className="font-sans text-sm font-bold text-navy-900 dark:text-white print:text-black inline">
                          {exp.company}
                        </h5>
                        <span className="text-xs text-navy-400 dark:text-navy-500 print:text-navy-500 mx-2">|</span>
                        <span className="font-sans text-xs font-bold text-navy-700 dark:text-navy-300 print:text-navy-700 italic inline">
                          {exp.role}
                        </span>
                      </div>
                      
                      <ul className="list-disc list-outside pl-4 space-y-1">
                        {exp.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="font-sans text-xs text-navy-600 dark:text-navy-400 print:text-navy-700 leading-relaxed text-justify">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="md:col-span-3 md:text-right text-xs font-mono text-navy-400 dark:text-navy-500 print:text-navy-700">
                      <div className="flex md:block items-center space-x-2 md:space-x-0">
                        <span className="font-semibold block">{exp.period}</span>
                        <span className="block italic text-[10px] md:mt-0.5">{exp.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Core Competency Grid Row */}
            <div className="space-y-3">
              <h4 className="font-sans text-xs font-bold text-navy-950 dark:text-white print:text-black tracking-wider uppercase border-b border-navy-150 dark:border-navy-800 print:border-navy-200 pb-1">
                Skills, Languages &amp; Core Interests
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skillCategories.map((cat) => (
                  <div key={cat.title} className="text-xs">
                    <span className="font-sans font-bold text-navy-800 dark:text-navy-200 print:text-navy-900 block mb-1">
                      {cat.title}
                    </span>
                    <p className="font-sans text-navy-600 dark:text-navy-400 print:text-navy-700 leading-relaxed">
                      {cat.skills.map(s => `${s.name}${s.level ? ` (${s.level})` : ""}`).join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Professional Affiliations, Extracurriculars & Certifications (McKinsey Style Footnote) */}
            <div className="space-y-2">
              <h4 className="font-sans text-xs font-bold text-navy-950 dark:text-white print:text-black tracking-wider uppercase border-b border-navy-150 dark:border-navy-800 print:border-navy-200 pb-1">
                Affiliations &amp; Certifications
              </h4>
              <ul className="list-disc list-outside pl-4 space-y-1 font-sans text-xs text-navy-600 dark:text-navy-400 print:text-navy-700 leading-relaxed">
                <li>
                  <strong>Business Analytics Certification:</strong> Specialized coursework in Power BI dashboards, advanced macros, and operational data auditing.
                </li>
                <li>
                  <strong>International Mobility Candidate:</strong> Relocated to Rouen, France in 2026 for high-end international commerce and strategy management education.
                </li>
                <li>
                  <strong>Member of Operational Societies:</strong> Participant in Kaizen continuous improvement workshops and engineering systems layout analytics during undergrad.
                </li>
              </ul>
            </div>

          </div>

          {/* Watermark badge inside the sheet (non-print) */}
          <div className="absolute bottom-6 right-12 font-mono text-[9px] tracking-widest text-navy-300 dark:text-navy-700 select-none pointer-events-none print:hidden uppercase">
            Executive Chronological Format
          </div>
        </motion.div>

        {/* Tip block */}
        <div className="mt-8 text-center print:hidden">
          <p className="text-xs font-mono text-navy-400 dark:text-navy-500">
            Tip: Pressing <kbd className="px-1.5 py-0.5 rounded border border-navy-200 bg-white text-navy-700 font-sans shadow-sm dark:bg-navy-800 dark:border-navy-700 dark:text-navy-300">Ctrl + P</kbd> (or Cmd+P) on this page opens a clean PDF layout of this resume.
          </p>
        </div>

      </div>
    </section>
  );
}
