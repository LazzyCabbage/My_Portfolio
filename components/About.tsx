"use client";

import { motion } from "framer-motion";
import { personalInfo, stats } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="max-w-[1100px] mx-auto px-6 max-md:px-4">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-center"
        >
          {/* Avatar Side */}
          <div className="flex justify-center md:justify-start">
            <div className="w-[240px] h-[240px] neu-raised relative rounded-2xl overflow-hidden group border border-[var(--border)]">
              {/* Optional glow effect behind avatar */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-bold text-[var(--accent)] mb-2 font-sora">AB</span>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="border-l-[3px] border-[var(--accent)] pl-6 md:pl-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
              About Me
            </h2>
            
            <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed mb-10">
              {personalInfo.bio}
            </p>
            
            <div className="flex flex-wrap gap-4">
              {stats.map((stat) => (
                <div 
                  key={stat.key}
                  className="neu-inset px-5 py-3 rounded-xl border border-[var(--border)] flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
                  <span className="font-mono text-sm uppercase tracking-wider text-[var(--text-primary)]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
