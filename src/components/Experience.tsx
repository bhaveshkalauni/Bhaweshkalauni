import { professionalExperience } from "../data";
import { Briefcase, Calendar, MapPin, CheckCircle2, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-20 md:py-28 bg-white dark:bg-navy-900 border-t border-navy-100 dark:border-navy-950 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-600 dark:text-brand-500 uppercase">
            03 / Executive Career History
          </span>
          <h2 className="mt-2 font-sans text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            Professional Experience
          </h2>
          <div className="mt-4 w-12 h-1 bg-brand-500 mx-auto rounded-full" />
        </div>

        {/* Experience Cards Grid */}
        <div className="space-y-8">
          {professionalExperience.map((item, idx) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="relative overflow-hidden rounded-2xl border border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-950 p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                {/* Left accent color bar on hover */}
                <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Card Header Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy-100 dark:border-navy-800 pb-5 mb-5">
                  <div className="flex items-center space-x-4">
                    {/* Monogram Box */}
                    <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center font-mono font-bold text-sm text-brand-700 dark:text-brand-400 select-none">
                      {item.logoText}
                    </div>
                    
                    <div>
                      <h3 className="font-sans text-lg sm:text-xl font-bold text-navy-900 dark:text-white">
                        {item.role}
                      </h3>
                      <div className="flex items-center space-x-1 mt-0.5 text-navy-500 dark:text-navy-400">
                        <span className="font-sans font-semibold text-sm">
                          {item.company}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Meta Timing & Location */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 md:flex-col md:items-end text-xs font-mono text-navy-400 dark:text-navy-500">
                    <span className="inline-flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 text-brand-500" /> {item.period}
                    </span>
                    <span className="inline-flex items-center mt-0.5">
                      <MapPin className="w-3.5 h-3.5 mr-1.5 text-navy-400" /> {item.location}
                    </span>
                  </div>
                </div>

                {/* Accomplishments Bullet Points */}
                <div className="space-y-3.5">
                  <h4 className="font-mono text-[10px] tracking-widest text-navy-400 dark:text-navy-500 uppercase font-semibold flex items-center">
                    <TrendingUp className="w-3.5 h-3.5 mr-1 text-brand-500" /> Core Achievements &amp; Scope
                  </h4>
                  
                  <ul className="space-y-3">
                    {item.description.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 text-brand-500 dark:text-brand-400 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="font-sans text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Used tools / skill tags */}
                <div className="mt-6 pt-5 border-t border-navy-100 dark:border-navy-800">
                  <div className="flex flex-wrap gap-1.5">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono tracking-wider font-semibold px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
