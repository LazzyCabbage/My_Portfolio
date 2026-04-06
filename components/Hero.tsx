"use client";

import { motion } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import ParticleCanvas from "./ParticleCanvas";
import { personalInfo } from "@/lib/data";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <ParticleCanvas />
      
      <div className="max-w-[1100px] w-full mx-auto px-6 max-md:px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="font-mono text-[var(--accent)] mb-4 tracking-wide text-sm md:text-base">
            // {personalInfo.role}
          </p>
          
          <h1 className="text-5xl md:text-7xl lg:text-[96px] font-bold text-[var(--text-primary)] mb-6 leading-[1.1] tracking-[-0.04em]">
            Ashutosh<br />Bansal
          </h1>
          
          <p className="text-lg md:text-xl text-[var(--text-muted)] mb-10 max-w-2xl leading-relaxed">
            {personalInfo.subtitle}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-12">
            <a 
              href="#projects"
              className="neu-raised bg-[var(--accent)] text-white px-8 py-3.5 rounded-xl font-semibold tracking-wide transition-all hover:brightness-110 active:scale-95 flex items-center gap-2 group"
              style={{ boxShadow: "0 0 15px var(--accent-glow), 6px 6px 14px var(--shadow-dark), -6px -6px 14px var(--shadow-light)" }}
            >
              View Projects
            </a>
            <a 
              href="/resume.pdf"
              download
              className="neu-inset text-[var(--text-primary)] px-8 py-3.5 rounded-xl font-semibold tracking-wide transition-all hover:text-[var(--accent)] active:scale-95 flex items-center gap-2 border border-[var(--border)]"
            >
              <Download size={18} /> Download Resume
            </a>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <span className="neu-flat font-mono text-xs uppercase tracking-wider px-4 py-2 text-[var(--text-muted)] border border-[var(--border)]">
              IIT Roorkee • B.Sc Math & Computing
            </span>
            <span className="neu-flat font-mono text-xs uppercase tracking-wider px-4 py-2 text-[var(--text-muted)] border border-[var(--border)]">
              EthMumbai 2026 Winner
            </span>
            <span className="neu-flat font-mono text-xs uppercase tracking-wider px-4 py-2 text-[var(--text-muted)] border border-[var(--border)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
              Open to Opportunities
            </span>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <a href="#about" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
          <ChevronDown size={32} />
        </a>
      </motion.div>
    </section>
  );
}
