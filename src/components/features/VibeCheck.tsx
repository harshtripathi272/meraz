"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Send, Sparkles, RefreshCw, Radio } from "lucide-react";
import { analyzeVibe, type VibeResponse } from "@/lib/data/vibeResponses";

export default function VibeCheck() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<VibeResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Longer "processing" feel
    const vibeResult = analyzeVibe(input);
    setResult(vibeResult);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setInput("");
    setResult(null);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-charcoal border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
             <Radio className="w-3 h-3 text-indigo-400 animate-pulse" />
             <span className="text-xs font-mono text-indigo-300 tracking-widest uppercase">System Check</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            VIBE CHECK
          </h2>
          <p className="text-text-secondary font-mono text-sm tracking-wide">
            Analyze your frequency resonance with the Meraz core.
          </p>
        </div>

        <div className="glass-panel p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent">
          <div className="bg-obsidian/80 rounded-xl p-8 backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="INPUT STATUS // Example: Hyped for the Pro-Nights..."
                  className="w-full bg-charcoal border border-white/10 rounded-lg px-6 py-4 text-white placeholder:text-white/20 font-mono text-sm focus:outline-none focus:border-indigo-500 transition-colors pr-32"
                  disabled={isAnalyzing}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isAnalyzing}
                  className="absolute right-2 top-2 bottom-2 px-6 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-indigo-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-md flex items-center gap-2"
                >
                  {isAnalyzing ? "Scanning..." : "Analyze"}
                </button>
              </div>
            </form>

            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-white/10 pt-8 text-center"
                >
                  <div className="mb-2 text-xs font-mono text-indigo-400 uppercase tracking-widest">
                    Analysis Complete
                  </div>
                  <div className="text-6xl mb-4 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
                    {result.emoji}
                  </div>
                  <div className="text-2xl font-heading font-bold mb-6 text-white">
                    {result.phrase}
                  </div>
                  <button 
                    onClick={handleReset}
                    className="text-xs text-text-secondary hover:text-white underline underline-offset-4"
                  >
                    RESET SYSTEM
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            
            {!result && !isAnalyzing && (
              <div className="flex flex-wrap justify-center gap-3">
                 {["Ready to hack", "Music vibes", "Just exploring"].map(tag => (
                   <button 
                     key={tag}
                     onClick={() => setInput(tag)}
                     className="px-3 py-1 border border-white/5 rounded-full text-xs text-text-secondary hover:border-indigo-500/50 hover:text-indigo-400 transition-colors"
                   >
                     {tag}
                   </button>
                 ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
