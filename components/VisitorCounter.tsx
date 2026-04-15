"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ethers, BrowserProvider } from "ethers";
import confetti from "canvas-confetti";
import { COUNTER_ABI, CONTRACT_ADDRESS, RPC_URL } from "@/lib/contract";
import { AlertCircle, CheckCircle2, Loader2, Sparkles } from "lucide-react";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [interacting, setInteracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [hasProvider, setHasProvider] = useState(false);

  useEffect(() => {
    // Check if ethereum object is available
    if (typeof window !== "undefined" && (window as any).ethereum) {
      setHasProvider(true);
    }
    fetchCount();
  }, []);

  const fetchCount = async () => {
    try {
      setLoading(true);
      setError(null);
      // Read-only logic: Use default RPC provider
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, COUNTER_ABI, provider);
      
      const currentCount = await contract.getCount();
      setCount(Number(currentCount));
    } catch (err: any) {
      console.error("Error fetching count:", err);
      // Fail gracefully
      setError("Failed to fetch count. Note: Using a placeholder contract address on Sepolia.");
    } finally {
      setLoading(false);
    }
  };

  const handleVisit = async () => {
    if (!hasProvider) {
      setError("Please install MetaMask to leave your mark on-chain!");
      return;
    }

    try {
      setInteracting(true);
      setError(null);
      setSuccess(false);

      // Connect to the injected provider (MetaMask)
      const browserProvider = new BrowserProvider((window as any).ethereum as any);
      await browserProvider.send("eth_requestAccounts", []);
      
      const signer = await browserProvider.getSigner();
      
      const contract = new ethers.Contract(CONTRACT_ADDRESS, COUNTER_ABI, signer);
      
      // Execute the 'visit' transaction
      const tx = await contract.visit();
      await tx.wait(); // Wait for confirmation
      
      // Success!
      setSuccess(true);
      
      // Fire confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#6c63ff", "#ffffff", "#e8e8f0"]
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#6c63ff", "#ffffff", "#e8e8f0"]
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      // Refresh count
      await fetchCount();

    } catch (err: any) {
      console.error("Error signing transaction:", err);
      setError(err.reason || err.message || "Transaction failed or user denied request.");
    } finally {
      setInteracting(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-[var(--accent)] opacity-5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-[700px] mx-auto px-6 max-md:px-4 relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="neu-raised p-10 md:p-14 rounded-[32px] border border-[var(--border)] text-center flex flex-col items-center"
        >
          <div className="mb-8 p-4 neu-inset rounded-2xl text-[var(--accent)] border border-[var(--border)] relative">
            <Sparkles strokeWidth={1.5} size={32} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">
            On-Chain Visitor Counter
          </h2>
          <p className="font-mono text-sm text-[var(--text-muted)] mb-10 tracking-wide">
            // deployed on Ethereum Sepolia testnet
          </p>

          <div className="neu-inset w-full max-w-[280px] py-8 rounded-[24px] border border-[var(--border)] mb-10 relative overflow-hidden">
            {/* Subtle inner glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-30" />
            
            {loading ? (
              <div className="flex justify-center items-center h-16">
                <Loader2 className="animate-spin text-[var(--text-muted)]" size={32} />
              </div>
            ) : (
              <div className="text-6xl md:text-7xl font-bold font-sora text-[var(--text-primary)] tracking-tighter">
                {count !== null ? count : "--"}
              </div>
            )}
          </div>

          <button 
            onClick={handleVisit}
            disabled={interacting || loading}
            className={`neu-raised w-full sm:w-auto px-10 py-5 rounded-xl font-bold tracking-wider text-sm transition-all flex items-center justify-center gap-3 relative overflow-hidden group ${
              interacting || loading ? "opacity-70 cursor-not-allowed" : "hover:brightness-110 active:scale-95"
            }`}
            style={{ 
              backgroundColor: "var(--bg-raised)",
              boxShadow: "6px 6px 14px var(--shadow-dark), -6px -6px 14px var(--shadow-light), inset 0 0 0 1px var(--accent)"
            }}
          >
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[var(--accent-glow)] opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <span className="relative z-10 text-[var(--text-primary)] flex items-center gap-2">
              {interacting ? (
                <><Loader2 className="animate-spin" size={20} /> Connecting & Signing...</>
              ) : hasProvider ? (
                "Connect MetaMask to Mark Presence"
              ) : (
                "Install MetaMask to Mark Presence"
              )}
            </span>
          </button>

          <p className="mt-8 font-mono text-xs text-[var(--text-muted)]">
            {count !== null ? `${count} people have marked their presence on-chain` : "Loading network data..."}
          </p>

          {error && (
            <div className="mt-6 p-4 rounded-xl neu-inset border border-red-500/20 text-red-400 text-sm flex items-center gap-3 max-w-[400px]">
              <AlertCircle size={20} className="shrink-0" />
              <span className="text-left font-mono">{error}</span>
            </div>
          )}

          {success && (
            <div className="mt-6 p-4 rounded-xl neu-inset border border-green-500/20 text-green-400 text-sm flex items-center gap-3">
              <CheckCircle2 size={20} className="shrink-0" />
              <span className="font-mono">Presence marked successfully! You are part of history.</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
