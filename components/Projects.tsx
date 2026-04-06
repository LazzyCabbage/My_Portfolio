"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ExternalLink, Database, Code2, Cpu, Code } from "lucide-react";
import { projects } from "@/lib/data";

const tagIcons: Record<string, React.ReactNode> = {
  "DeFi": <Database size={18} />,
  "Web3": <Code2 size={18} />,
  "AI": <Cpu size={18} />,
  "AI/Web3": <Cpu size={18} />,
  "Blockchain": <Database size={18} />,
  "Full-Stack": <Code size={18} />,
  "Frontend": <Code2 size={18} />
};

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 6);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="max-w-[1100px] mx-auto px-6 max-md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 flex justify-between items-end"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
            Projects
          </h2>
          {projects.length > 6 && (
            <button 
              onClick={() => setShowAll(!showAll)}
              className="font-mono text-sm text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors"
            >
              Show {showAll ? "Less" : "More"}
            </button>
          )}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <AnimatePresence>
            {displayedProjects.map((project, idx) => (
              <motion.div 
                key={project.name}
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                layout
                className="group w-full h-[320px] [perspective:1000px] cursor-pointer"
              >
                <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  
                  {/* Front Face */}
                  <div className="absolute inset-0 neu-raised p-8 rounded-2xl border border-[var(--border)] [backface-visibility:hidden] flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 neu-inset rounded-xl text-[var(--accent)] border border-[var(--border)]">
                          {tagIcons[project.category] || <Code size={18} />}
                        </div>
                        <span className="font-mono text-[var(--text-muted)] text-sm">{project.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{project.name}</h3>
                      <p className="font-mono text-[var(--accent)] text-xs uppercase tracking-wider">{project.category}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="neu-inset font-mono text-[10px] uppercase text-[var(--text-muted)] px-3 py-1.5 rounded-lg">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="neu-inset font-mono text-[10px] uppercase text-[var(--text-muted)]:opacity-50 px-3 py-1.5 rounded-lg">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Back Face */}
                  <div className="absolute inset-0 neu-raised bg-[var(--bg-inset)] p-8 rounded-2xl border border-[var(--border)] [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">{project.name}</h3>
                      <p className="text-[var(--text-muted)] text-sm leading-relaxed line-clamp-5">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <button className="flex items-center justify-center w-10 h-10 neu-raised text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
