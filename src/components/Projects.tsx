import { featuredProjects } from "../data";
import { FolderGit2, Check, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-20 md:py-28 bg-white dark:bg-navy-900 border-t border-navy-100 dark:border-navy-950 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-600 dark:text-brand-500 uppercase">
            05 / Core Initiatives
          </span>
          <h2 className="mt-2 font-sans text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            Featured Projects
          </h2>
          <div className="mt-4 w-12 h-1 bg-brand-500 mx-auto rounded-full" />
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {featuredProjects.map((project, idx) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="flex flex-col h-full rounded-2xl border border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-950 p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 group relative"
              >
                {/* Decorative folder icon badge */}
                <div className="absolute top-6 right-6 p-2 rounded bg-brand-50 dark:bg-brand-500/5 text-brand-500 dark:text-brand-400">
                  <FolderGit2 className="w-5 h-5" />
                </div>

                {/* Project Category badge */}
                <span className="self-start text-[10px] font-mono font-semibold tracking-wider text-brand-600 dark:text-brand-400 uppercase bg-brand-50 dark:bg-brand-500/10 px-2 py-0.5 rounded mb-4">
                  {project.category}
                </span>

                {/* Project Title */}
                <h3 className="font-sans text-xl font-bold text-navy-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors pr-12">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="mt-3 font-sans text-sm text-navy-500 dark:text-navy-400 leading-relaxed flex-grow">
                  {project.description}
                </p>

                {/* Highlights list */}
                <div className="mt-5 space-y-2.5 border-t border-navy-100 dark:border-navy-800 pt-5 mb-6">
                  <span className="block font-mono text-[9px] font-bold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                    Key Outcomes &amp; Activities
                  </span>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, itemIdx) => (
                      <li key={itemIdx} className="flex items-start">
                        <Check className="w-4 h-4 text-brand-600 dark:text-brand-400 mt-0.5 mr-2.5 flex-shrink-0" />
                        <span className="font-sans text-xs text-navy-600 dark:text-navy-300 leading-relaxed">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech badges / terms used */}
                <div className="flex flex-wrap gap-1.5 pt-4 mt-auto border-t border-navy-100 dark:border-navy-800">
                  {project.tech.map((term) => (
                    <span
                      key={term}
                      className="text-[10px] font-mono tracking-wider font-semibold px-2.5 py-0.5 rounded bg-navy-50 text-navy-600 border border-navy-150 dark:bg-navy-900 dark:text-navy-300 dark:border-navy-800"
                    >
                      {term}
                    </span>
                  ))}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
