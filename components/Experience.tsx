"use client";

import { motion, Variants } from "framer-motion";
import { experience } from "@/lib/data";

export default function Experience() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="max-w-[800px] mx-auto px-6 max-md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
            Experience
          </h2>
        </motion.div>

        <motion.div 
          className="relative before:absolute before:inset-0 before:ml-[11px] md:before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-[var(--accent)] before:to-transparent"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {experience.map((job, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-12 last:mb-0"
            >
              {/* Timeline Dot */}
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-[var(--bg)] bg-[var(--accent)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_var(--accent)] z-10" />
              
              {/* Card */}
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] neu-raised p-6 md:p-8 rounded-2xl border border-[var(--border)] transition-transform duration-300 hover:-translate-y-1">
                <div className="flex flex-col mb-4">
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">{job.role}</h3>
                  <div className="flex flex-wrap items-center gap-2 justify-between">
                    <span className="font-mono text-[var(--accent)] text-sm">{job.company}</span>
                    <span className="font-mono text-[var(--text-muted)] text-xs">{job.period}</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  {job.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-[var(--text-muted)] text-sm leading-relaxed flex items-start gap-3">
                      <span className="text-[var(--accent)] mt-1.5 opacity-60">▹</span>
                      <span className="flex-1">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
