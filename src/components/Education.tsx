import { educationTimeline } from "../data";
import { GraduationCap, MapPin, Calendar, BookOpen } from "lucide-react";
import { motion } from "motion/react";

export default function Education() {
  return (
    <section
      id="education"
      className="py-20 md:py-28 bg-navy-50 dark:bg-navy-950 border-t border-navy-100 dark:border-navy-900 relative overflow-hidden"
    >
      {/* Decorative architectural grid overlay */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-600 dark:text-brand-500 uppercase">
            02 / Academic Foundation
          </span>
          <h2 className="mt-2 font-sans text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            Education Timeline
          </h2>
          <div className="mt-4 w-12 h-1 bg-brand-500 mx-auto rounded-full" />
        </div>

        {/* Timeline Core */}
        <div className="relative border-l border-navy-200 dark:border-navy-800 ml-4 md:ml-24 space-y-12">
          {educationTimeline.map((item, idx) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Dot with School Code Monogram */}
                <span className="absolute -left-4.5 top-0 flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-navy-900 border-2 border-brand-500 dark:border-brand-500 shadow-md">
                  <span className="text-[9px] font-mono font-bold text-navy-800 dark:text-white uppercase">
                    {item.logoText}
                  </span>
                </span>

                {/* Timeline Card */}
                <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-sm hover:shadow-md transition-all duration-300">
                  {/* Meta Details Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="inline-flex items-center text-xs font-mono font-semibold tracking-wider text-brand-600 dark:text-brand-400 uppercase bg-brand-50 dark:bg-brand-500/10 px-2.5 py-1 rounded">
                      <GraduationCap className="w-3.5 h-3.5 mr-1" /> {item.degree}
                    </span>
                    
                    <div className="flex items-center space-x-4 text-xs font-mono text-navy-400 dark:text-navy-500">
                      <span className="inline-flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-navy-400" /> {item.period}
                      </span>
                      <span className="inline-flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-navy-400" /> {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Institution Name */}
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-navy-900 dark:text-white">
                    {item.institution}
                  </h3>

                  {/* Description text */}
                  <p className="mt-3 font-sans text-sm text-navy-500 dark:text-navy-400 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Highlight curriculum blocks */}
                  {item.logoText === "NBS" ? (
                    <div className="mt-5 pt-5 border-t border-navy-100 dark:border-navy-800">
                      <span className="inline-flex items-center text-xs font-semibold text-navy-800 dark:text-navy-200 uppercase tracking-wider mb-2.5">
                        <BookOpen className="w-3.5 h-3.5 mr-1 text-brand-500" /> Core Specialization Focus
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {["Business Strategy", "Supply Chain Operations", "Financial Forecasting", "Operational Dashboards", "Strategic Frameworks"].map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono tracking-wide px-2.5 py-1 rounded bg-navy-50 border border-navy-150 text-navy-600 dark:bg-navy-800 dark:border-navy-700 dark:text-navy-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-5 pt-5 border-t border-navy-100 dark:border-navy-800">
                      <span className="inline-flex items-center text-xs font-semibold text-navy-800 dark:text-navy-200 uppercase tracking-wider mb-2.5">
                        <BookOpen className="w-3.5 h-3.5 mr-1 text-brand-500" /> Quantitative Engineering Blocks
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {["Operations Research", "Production Planning & Control", "Systems Design", "Thermodynamics", "Quantitative Mathematics"].map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono tracking-wide px-2.5 py-1 rounded bg-navy-50 border border-navy-150 text-navy-600 dark:bg-navy-800 dark:border-navy-700 dark:text-navy-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
