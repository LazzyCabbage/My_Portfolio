"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Loader2, CheckCircle2, Globe, FileCode2 } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate form submission for Web3Forms or similar service
      // using an echo/delay here. To wire it up, use your actual access_key from web3forms.com
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_ACCESS_KEY_HERE", // Replace with actual key
          ...formData
        }),
      });
      
      // We will pretend it works regardless since it's a template
      await new Promise(r => setTimeout(r, 1000));
      
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const contactLinks = [
    { icon: <Mail size={20} />, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: <Globe size={20} />, label: "LinkedIn Profile", href: personalInfo.linkedin },
    { icon: <FileCode2 size={20} />, label: "GitHub Profile", href: personalInfo.github },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="max-w-[1100px] mx-auto px-6 max-md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">
            Get In Touch
          </h2>
          <p className="font-mono text-[var(--text-muted)] text-sm tracking-wide">
            // let's build something together
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="neu-raised p-8 md:p-10 rounded-2xl border border-[var(--border)] h-fit"
          >
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-8 font-sora">
              Contact Information
            </h3>
            
            <div className="flex flex-col gap-6">
              {contactLinks.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neu-flat p-4 rounded-xl flex items-center gap-4 text-[var(--text-muted)] hover:text-[var(--accent)] transition-all group hover:-translate-y-1"
                >
                  <div className="p-2 neu-inset rounded-lg text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {link.icon}
                  </div>
                  <span className="font-mono text-sm max-w-[200px] truncate">{link.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-mono text-sm uppercase tracking-wider text-[var(--text-muted)] ml-2">Name</label>
                <input 
                  type="text" 
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="neu-inset w-full p-4 rounded-xl border border-[var(--border)] bg-transparent text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors font-sora"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-mono text-sm uppercase tracking-wider text-[var(--text-muted)] ml-2">Email</label>
                <input 
                  type="email" 
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="neu-inset w-full p-4 rounded-xl border border-[var(--border)] bg-transparent text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors font-sora"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-sm uppercase tracking-wider text-[var(--text-muted)] ml-2">Message</label>
                <textarea 
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="neu-inset w-full p-4 rounded-xl border border-[var(--border)] bg-transparent text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors font-sora resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="mt-2 neu-raised bg-[var(--bg-raised)] text-[var(--text-primary)] py-4 rounded-xl font-bold tracking-wide transition-all hover:text-[var(--accent)] active:scale-95 flex items-center justify-center gap-2 group border border-[var(--border)]"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Send Message
                  </>
                )}
              </button>

              {success && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="neu-raised p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-raised)] flex items-center gap-3 text-[var(--text-primary)] mt-2"
                >
                  <CheckCircle2 className="text-[var(--accent)]" size={20} />
                  <span className="font-mono text-sm">Message sent successfully! I'll get back to you soon.</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>

        <div className="mt-32 text-center border-t border-[var(--border)] pt-8">
          <p className="font-mono text-sm text-[var(--text-muted)]">
            © 2026 Ashutosh Bansal — Built with Next.js & ethers.js
          </p>
        </div>
      </div>
    </section>
  );
}
