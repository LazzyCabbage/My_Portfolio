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
          className="relative max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Centered Timeline Line (Desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-[1px] bg-gradient-to-b from-[var(--accent)] to-transparent opacity-30" />
          
          {/* Mobile Timeline Line */}
          <div className="md:hidden absolute left-[11px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--accent)] to-transparent opacity-30" />

          <div className="space-y-12">
            {experience.map((job, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="relative flex flex-col md:flex-row justify-between items-start md:items-center w-full group"
              >
                {/* Desktop layout: Alternate left/right, mobile layout: all on the right */}
                
                {/* Left space (empty for right-aligned items, filled for left-aligned) */}
                <div className={`hidden md:block w-[45%] ${index % 2 === 0 ? "order-1" : "order-3"}`}>
                  {index % 2 === 0 && (
                    <div className="w-full neu-raised p-6 md:p-8 rounded-2xl border border-[var(--border)] transition-transform duration-300 hover:-translate-y-1 text-right">
                      <div className="flex flex-col mb-4 items-end">
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">{job.role}</h3>
                        <div className="flex flex-col items-end gap-1">
                          <span className="font-mono text-[var(--accent)] text-sm">{job.company}</span>
                          <span className="font-mono text-[var(--text-muted)] text-xs">{job.period}</span>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {job.bullets.map((bullet, idx) => (
                          <li key={idx} className="text-[var(--text-muted)] text-sm leading-relaxed flex items-start justify-end gap-3 text-right">
                            <span className="flex-1">{bullet}</span>
                            <span className="text-[var(--accent)] mt-1.5 opacity-60">▹</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Timeline Dot (always centered on desktop, left on mobile) */}
                <div className="absolute left-0 md:left-1/2 top-6 md:top-1/2 md:order-2 -translate-y-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full border-4 border-[var(--bg)] bg-[var(--accent)] shadow-[0_0_10px_var(--accent)] z-10" />

                {/* Right space (filled for right-aligned items, empty for left-aligned) */}
                <div className={`w-full pl-12 md:pl-0 md:w-[45%] ${index % 2 === 0 ? "order-3" : "order-1"}`}>
                  {index % 2 !== 0 && (
                    <div className="w-full neu-raised p-6 md:p-8 rounded-2xl border border-[var(--border)] transition-transform duration-300 hover:-translate-y-1">
                       <div className="flex flex-col mb-4">
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">{job.role}</h3>
                        <div className="flex flex-col gap-1">
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
                  )}
                  {/* Mobile content for left-aligned items (since they only render on left for desktop) */}
                  {index % 2 === 0 && (
                    <div className="md:hidden w-full neu-raised p-6 md:p-8 rounded-2xl border border-[var(--border)] transition-transform duration-300 hover:-translate-y-1">
                      <div className="flex flex-col mb-4">
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">{job.role}</h3>
                        <div className="flex flex-col gap-1">
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
                  )}
                </div>

              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
