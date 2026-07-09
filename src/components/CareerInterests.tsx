import { careerInterests } from "../data";
import { Compass, GitMerge, TrendingUp, BarChart3, Cpu, Workflow } from "lucide-react";
import { motion } from "motion/react";

export default function CareerInterests() {
  const getInterestIcon = (iconName: string) => {
    switch (iconName) {
      case "Compass": return Compass;
      case "GitMerge": return GitMerge;
      case "TrendingUp": return TrendingUp;
      case "BarChart3": return BarChart3;
      case "Cpu": return Cpu;
      default: return Workflow;
    }
  };

  return (
    <section
      id="career-interests"
      className="py-20 md:py-28 bg-white dark:bg-navy-900 border-t border-navy-100 dark:border-navy-950 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-600 dark:text-brand-500 uppercase">
            07 / Future Trajectory
          </span>
          <h2 className="mt-2 font-sans text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            Career Interests &amp; Aspirations
          </h2>
          <div className="mt-4 w-12 h-1 bg-brand-500 mx-auto rounded-full" />
        </div>

        {/* Interests Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {careerInterests.map((interest, idx) => {
            const Icon = getInterestIcon(interest.iconName);
            
            return (
              <motion.div
                key={interest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="p-6 rounded-2xl border border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-950 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Visual Background Ripple Effect on hover */}
                <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-brand-50/10 dark:bg-brand-500/5 group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                <div>
                  {/* Icon Frame */}
                  <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-5 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title */}
                  <h3 className="font-sans text-base font-bold text-navy-900 dark:text-white tracking-tight">
                    {interest.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 font-sans text-xs sm:text-sm text-navy-500 dark:text-navy-400 leading-relaxed">
                    {interest.description}
                  </p>
                </div>

                {/* Footnote decoration */}
                <div className="mt-6 pt-4 border-t border-navy-50 dark:border-navy-900 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-navy-400 dark:text-navy-500">
                  <span>Priority Focus</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
