"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Send, Sparkles, RefreshCw } from "lucide-react";
import { analyzeVibe, type VibeResponse } from "@/lib/data/vibeResponses";

export default function VibeCheck() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<VibeResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const vibeResult = analyzeVibe(input);
    setResult(vibeResult);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setInput("");
    setResult(null);
  };

  return (
    <section className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-magenta/5 via-transparent to-neon-teal/5" />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="section-title">Vibe Check ✨</h2>
          <p className="section-subtitle">
            How are you feeling about Meraz? Share your vibe and let the tribal 
            spirits respond!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-6 md:p-8"
        >
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="I'm feeling excited about the hackathon..."
                className="flex-1 px-4 py-3 rounded-xl bg-surface-dark border border-glass-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-neon-magenta transition-colors"
                disabled={isAnalyzing}
              />
              <button
                type="submit"
                disabled={!input.trim() || isAnalyzing}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-magenta to-neon-teal text-primary-dark font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-neon-magenta/20 transition-all"
              >
                {isAnalyzing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span className="hidden sm:inline">Check Vibe</span>
              </button>
            </div>
          </form>

          {/* Result */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="rounded-2xl p-6 text-center relative overflow-hidden"
                style={{ background: result.bgGradient }}
              >
                {/* Emoji */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-6xl mb-4"
                >
                  {result.emoji}
                </motion.div>

                {/* Phrase */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl font-medium mb-4"
                  style={{ color: result.color }}
                >
                  {result.phrase}
                </motion.p>

                {/* Vibe meter */}
                <div className="flex justify-center gap-2 mb-4">
                  {[-1, 0, 1].map((score) => (
                    <motion.div
                      key={score}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + score * 0.1 }}
                      className={`w-3 h-3 rounded-full ${
                        result.score === score 
                          ? "scale-150" 
                          : "opacity-30"
                      }`}
                      style={{ 
                        backgroundColor: score === -1 ? "#cc00cc" : score === 0 ? "#ffa500" : "#00ffff",
                        boxShadow: result.score === score ? `0 0 15px ${result.color}` : "none"
                      }}
                    />
                  ))}
                </div>

                {/* Reset button */}
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  Check another vibe
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Suggestions */}
          {!result && (
            <div className="text-center">
              <p className="text-text-muted text-sm mb-3">Try saying:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "I'm hyped for the concerts!",
                  "Feeling a bit nervous",
                  "Can't wait for robotics",
                  "Just exploring"
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="px-3 py-1.5 rounded-full text-xs border border-glass-border text-text-secondary hover:border-neon-magenta hover:text-neon-magenta transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
