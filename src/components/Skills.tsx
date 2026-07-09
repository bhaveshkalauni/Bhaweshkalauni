import { skillCategories } from "../data";
import { CheckCircle, BarChart, Settings, Languages, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

export default function Skills() {
  const getCategoryIcon = (title: string) => {
    if (title.includes("Strategy")) return CheckCircle;
    if (title.includes("Supply Chain")) return Settings;
    if (title.includes("Analytics")) return BarChart;
    return Languages;
  };

  const getLevelColor = (level?: string) => {
    if (!level) return "bg-brand-500";
    if (level.includes("Expert") || level.includes("Native")) return "bg-brand-600 dark:bg-brand-400";
    if (level.includes("Advanced") || level.includes("Bilingual")) return "bg-brand-500";
    return "bg-brand-400/60 dark:bg-brand-500/40";
  };

  const getLevelWidth = (level?: string) => {
    if (!level) return "100%";
    if (level.includes("Expert") || level.includes("Native")) return "95%";
    if (level.includes("Advanced") || level.includes("Bilingual")) return "80%";
    if (level.includes("Intermediate")) return "65%";
    if (level.includes("A2") || level.includes("Elementary")) return "45%";
    return "75%";
  };

  return (
    <section
      id="skills"
      className="py-20 md:py-28 bg-navy-50 dark:bg-navy-950 border-t border-navy-100 dark:border-navy-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-600 dark:text-brand-500 uppercase">
            04 / Capabilities &amp; Toolkit
          </span>
          <h2 className="mt-2 font-sans text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            Skills &amp; Competencies
          </h2>
          <div className="mt-4 w-12 h-1 bg-brand-500 mx-auto rounded-full" />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIdx) => {
            const Icon = getCategoryIcon(category.title);
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1, duration: 0.5 }}
                className="p-6 md:p-8 rounded-2xl border border-navy-150 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-navy-100 dark:border-navy-800">
                  <div className="p-2 rounded bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans text-lg font-bold text-navy-900 dark:text-white tracking-tight">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List within Category */}
                <div className="space-y-4">
                  {category.skills.map((skill) => {
                    const width = getLevelWidth(skill.level);
                    const colorClass = getLevelColor(skill.level);
                    
                    return (
                      <div key={skill.name} className="group">
                        {/* Skill metadata */}
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="font-sans text-sm font-semibold text-navy-800 dark:text-navy-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                            {skill.name}
                          </span>
                          {skill.level && (
                            <span className="font-mono text-[10px] text-navy-400 dark:text-navy-500 font-medium uppercase tracking-wider">
                              {skill.level}
                            </span>
                          )}
                        </div>

                        {/* Subtle progress bar */}
                        <div className="w-full h-1.5 bg-navy-100 dark:bg-navy-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: width }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`h-full rounded-full ${colorClass}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Consulting framework notation note */}
        <div className="mt-12 text-center">
          <p className="inline-flex items-center space-x-2 text-xs font-mono text-navy-400 dark:text-navy-500 bg-white dark:bg-navy-900 px-4 py-2 rounded-full border border-navy-150 dark:border-navy-800 shadow-xs">
            <HelpCircle className="w-4 h-4 text-brand-500" />
            <span>Levels mapped using NEOMA Business School and industry consulting standard competency frameworks.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
