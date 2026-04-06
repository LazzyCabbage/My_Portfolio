"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navLinks.map(link => link.href.substring(1));
      let current = "home";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 150) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? "bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)] py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-6 max-md:px-4 flex justify-between items-center">
        <a href="#home" className="neu-raised flex items-center justify-center w-10 h-10 border-none">
          <span className="font-mono text-[var(--accent)] font-bold text-lg tracking-tight">AB</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`font-mono text-sm uppercase tracking-wide transition-colors relative group ${
                activeSection === link.href.substring(1) ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-[var(--accent)] transition-all duration-300 ${
                activeSection === link.href.substring(1) ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </a>
          ))}
        </nav>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden text-[var(--text-primary)] p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Content */}
      <motion.div 
        initial={false}
        animate={{ height: mobileMenuOpen ? "auto" : 0, opacity: mobileMenuOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden bg-[var(--bg)] border-b border-[var(--border)] backdrop-blur-xl absolute top-full left-0 w-full"
      >
        <div className="flex flex-col py-4 px-6 gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`font-mono text-sm uppercase tracking-wide transition-colors ${
                activeSection === link.href.substring(1) ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </motion.div>
    </header>
  );
}
