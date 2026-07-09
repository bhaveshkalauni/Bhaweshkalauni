import { achievements } from "../data";
import { Award, Zap, Smile, TrendingDown } from "lucide-react";
import { motion } from "motion/react";

export default function Achievements() {
  const getStatIcon = (id: string) => {
    switch (id) {
      case "ach-1": return Award;
      case "ach-2": return Zap;
      case "ach-3": return Smile;
      default: return TrendingDown;
    }
  };

  const getIconColorClass = (id: string) => {
    switch (id) {
      case "ach-1": return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-500/10";
      case "ach-2": return "text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10";
      case "ach-3": return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10";
      default: return "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10";
    }
  };

  return (
    <section
      id="achievements"
      className="py-16 md:py-24 bg-navy-50 dark:bg-navy-950 border-t border-navy-100 dark:border-navy-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-600 dark:text-brand-500 uppercase">
            06 / Measurable Impact
          </span>
          <h2 className="mt-2 font-sans text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            Key Performance Indicators &amp; Achievements
          </h2>
          <div className="mt-4 w-12 h-1 bg-brand-500 mx-auto rounded-full" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {achievements.map((ach, idx) => {
            const Icon = getStatIcon(ach.id);
            const iconColor = getIconColorClass(ach.id);
            
            return (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl border border-navy-150 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative group"
              >
                {/* Visual Icon Badge */}
                <div className={`absolute top-6 right-6 p-2 rounded-lg ${iconColor} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* KPI Display Value */}
                <span className="block font-sans text-4xl md:text-5xl font-black text-navy-900 dark:text-white tracking-tight">
                  {ach.value}
                </span>

                {/* Metric Label */}
                <span className="block mt-2 font-sans text-sm font-bold text-navy-800 dark:text-navy-100 uppercase tracking-wider">
                  {ach.label}
                </span>

                {/* Subtext explanation */}
                <p className="mt-2 font-sans text-xs text-navy-500 dark:text-navy-400 leading-relaxed">
                  {ach.description}
                </p>

                {/* Decorative bottom bar accent */}
                <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-navy-100 dark:bg-navy-800 group-hover:bg-brand-500 dark:group-hover:bg-brand-400 transition-colors duration-300" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
