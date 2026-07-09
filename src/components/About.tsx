import { personalInfo } from "../data";
import { Award, Database, TrendingUp, Settings2, ShieldCheck, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const interests = [
    { name: "Strategy Consulting", icon: Award, desc: "Formulating MECE frameworks and business strategies for complex problems." },
    { name: "Supply Chain Coordination", icon: Settings2, desc: "Optimizing logistics flow, vendor operations, and lead-time systems." },
    { name: "Operations Excellence", icon: TrendingUp, desc: "Removing process inefficiencies, scheduling workflows, and boosting margins." },
    { name: "Business Analytics", icon: Database, desc: "Leveraging Power BI, SQL, and Excel to build actionable corporate dashboards." }
  ];

  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-white dark:bg-navy-900 border-t border-navy-100 dark:border-navy-950 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-600 dark:text-brand-500 uppercase">
            01 / Professional Journey
          </span>
          <h2 className="mt-2 font-sans text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            About Me
          </h2>
          <div className="mt-4 w-12 h-1 bg-brand-500 mx-auto rounded-full" />
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Narrative Text */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-sans text-xl font-bold text-navy-800 dark:text-white">
              Bridging Technical Engineering Rigor &amp; Corporate Strategic Vision
            </h3>
            
            <p className="font-sans text-sm sm:text-base text-navy-600 dark:text-navy-300 leading-relaxed">
              {personalInfo.aboutDetailed.story}
            </p>

            <p className="font-sans text-sm sm:text-base text-navy-600 dark:text-navy-300 leading-relaxed">
              {personalInfo.aboutDetailed.aspiration}
            </p>

            {/* MBB / Big 4 Target Badge */}
            <div className="p-4 rounded-lg bg-navy-50 border border-navy-100 dark:bg-navy-800/50 dark:border-navy-700/50 flex items-start space-x-3.5">
              <ShieldCheck className="w-5 h-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-sans text-xs font-bold text-navy-900 dark:text-white uppercase tracking-wider">
                  Target Trajectory
                </h4>
                <p className="mt-1 font-sans text-xs text-navy-500 dark:text-navy-400 leading-relaxed">
                  Deeply aligned with the standard requirements of McKinsey &amp; Co., Boston Consulting Group, Bain, and Big 4 firms. Actively preparing case studies, structuring hypothesis-driven issues, and mastering financial evaluation.
                </p>
              </div>
            </div>
          </div>

          {/* Core Areas Grid */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-sans text-lg font-bold text-navy-800 dark:text-white tracking-tight">
              Fields of Active Concentration
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {interests.map((interest, idx) => {
                const IconComponent = interest.icon;
                return (
                  <motion.div
                    key={interest.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="p-5 rounded-xl border border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-950 shadow-sm hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center mb-4 transition-colors group-hover:bg-brand-500 group-hover:text-white dark:group-hover:bg-brand-500">
                      <IconComponent className="w-5 h-5 text-brand-600 dark:text-brand-400 group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="font-sans text-sm font-bold text-navy-900 dark:text-white">
                      {interest.name}
                    </h4>
                    <p className="mt-1.5 font-sans text-xs text-navy-500 dark:text-navy-400 leading-relaxed">
                      {interest.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Philosophy callout */}
            <div className="p-4 rounded-xl border border-dashed border-navy-200 dark:border-navy-800 flex items-center space-x-3 text-xs text-navy-500 dark:text-navy-400">
              <HelpCircle className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span>
                <strong>Core Philosophy:</strong> Value creation is achieved by stripping waste from operations and validating strategy with rigid analytical frameworks.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
