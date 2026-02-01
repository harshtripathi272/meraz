"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Send, Sparkles, RefreshCw, Zap, Brain, Music, Code, Palette, Heart } from "lucide-react";
import { analyzeVibe, type VibeResponse } from "@/lib/data/vibeResponses";

const quickPrompts = [
  { label: "I love coding!", icon: Code },
  { label: "Music is my life", icon: Music },
  { label: "I'm a creative soul", icon: Palette },
  { label: "Tech enthusiast here", icon: Zap },
];

export default function VibeCheck() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<VibeResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate analysis time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const response = analyzeVibe(input);
    setResult(response);
    setIsAnalyzing(false);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const handleReset = () => {
    setInput("");
    setResult(null);
    inputRef.current?.focus();
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-mono tracking-wider uppercase">AI Powered</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-4">
            Vibe <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Check</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Tell us about yourself and we'll match you with the perfect MERAZ events!
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-[2rem] blur-xl opacity-50" />
          
          {/* Card */}
          <div className="relative bg-[#0a0a14]/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="input"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 md:p-10"
                >
                  {/* Input Form */}
                  <form onSubmit={handleSubmit} className="mb-8">
                    <div className="relative group">
                      {/* Input glow */}
                      <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-focus-within:opacity-100 blur-sm transition-opacity" />
                      
                      <div className="relative flex gap-3 bg-[#0f0f1a] border border-white/10 rounded-2xl p-2 group-focus-within:border-transparent">
                        <input
                          ref={inputRef}
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Tell us what excites you..."
                          className="flex-1 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:outline-none text-lg"
                        />
                        <motion.button
                          type="submit"
                          disabled={!input.trim() || isAnalyzing}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {isAnalyzing ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <RefreshCw className="w-5 h-5" />
                              </motion.div>
                              <span className="hidden sm:inline">Analyzing...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              <span className="hidden sm:inline">Check Vibe</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </form>

                  {/* Quick Prompts */}
                  <div>
                    <p className="text-white/30 text-sm mb-4 font-mono uppercase tracking-wider">Quick picks:</p>
                    <div className="flex flex-wrap gap-3">
                      {quickPrompts.map((prompt) => (
                        <motion.button
                          key={prompt.label}
                          onClick={() => handleQuickPrompt(prompt.label)}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                        >
                          <prompt.icon className="w-4 h-4" />
                          <span className="text-sm">{prompt.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-8 md:p-10"
                >
                  {/* Result Content */}
                  <div className="text-center mb-8">
                    {/* Emoji */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="text-7xl mb-6"
                    >
                      {result.emoji}
                    </motion.div>
                    
                    {/* Vibe Title */}
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl md:text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3"
                    >
                      {result.vibeTitle}
                    </motion.h3>
                    
                    {/* Response Message */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-white/60 text-lg max-w-lg mx-auto"
                    >
                      {result.response}
                    </motion.p>
                  </div>

                  {/* Suggested Events */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                  >
                    <p className="text-white/30 text-sm mb-4 font-mono uppercase tracking-wider text-center">
                      Perfect events for you:
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {result.suggestedEvents.map((event, i) => (
                        <motion.div
                          key={event}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                          className="px-4 py-2.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl text-purple-300 text-sm font-medium"
                        >
                          {event}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Match Score */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center justify-center gap-2 mb-8"
                  >
                    <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
                    <span className="text-white/60">Match Score:</span>
                    <span className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      {result.matchScore}%
                    </span>
                  </motion.div>

                  {/* Try Again Button */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-center"
                  >
                    <motion.button
                      onClick={handleReset}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Try Again
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Fun Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-white/30 text-sm mt-8"
        >
          <Sparkles className="w-4 h-4 inline mr-2" />
          Powered by MERAZ AI • Just for fun, not an actual recommendation engine
        </motion.p>
      </div>
    </section>
  );
}
