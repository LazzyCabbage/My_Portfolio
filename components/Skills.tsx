"use client";

import { motion, Variants } from "framer-motion";
import { skills } from "@/lib/data";

export default function Skills() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="skills" className="py-24 md:py-32 relative">
      <div className="max-w-[1100px] mx-auto px-6 max-md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
            Skills
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {skills.map((skillGroup, idx) => (
            <motion.div 
              key={skillGroup.category}
              variants={itemVariants}
              className="neu-inset p-8 rounded-2xl border border-[var(--border)]"
            >
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 font-sora">
                {skillGroup.category}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map(item => (
                  <div key={item} className="neu-flat px-4 py-2 rounded-lg flex items-center gap-2 border border-[var(--border)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent)]" />
                    <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-primary)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
