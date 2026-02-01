"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Sparkles } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

// Particle component for the floating tribal embers
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: i % 3 === 0 ? "#ff00ff" : i % 3 === 1 ? "#00ffff" : "#ffa500",
            boxShadow: `0 0 ${4 + Math.random() * 6}px currentColor`,
          }}
          animate={{
            y: [0, -100 - Math.random() * 200],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated tribal glyph ring
function TribalRing() {
  return (
    <motion.div
      className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-20"
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <linearGradient id="tribalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff00ff" />
            <stop offset="50%" stopColor="#00ffff" />
            <stop offset="100%" stopColor="#ffa500" />
          </linearGradient>
        </defs>
        {/* Outer ring */}
        <circle
          cx="200"
          cy="200"
          r="190"
          fill="none"
          stroke="url(#tribalGradient)"
          strokeWidth="1"
          strokeDasharray="10 5"
        />
        {/* Middle ring */}
        <circle
          cx="200"
          cy="200"
          r="160"
          fill="none"
          stroke="url(#tribalGradient)"
          strokeWidth="0.5"
        />
        {/* Tribal glyphs */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x = 200 + 175 * Math.cos(angle);
          const y = 200 + 175 * Math.sin(angle);
          return (
            <polygon
              key={i}
              points={`${x},${y - 8} ${x + 7},${y + 6} ${x - 7},${y + 6}`}
              fill="url(#tribalGradient)"
              opacity="0.6"
            />
          );
        })}
      </svg>
    </motion.div>
  );
}

export default function HeroNeon() {
  const festivalDate = new Date("2026-02-15T00:00:00");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-darker via-primary-dark to-surface-dark" />
      
      {/* Tribal pattern overlay */}
      <div className="absolute inset-0 tribal-pattern" />
      
      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <TribalRing />
      </div>
      
      {/* Floating particles */}
      <Particles />
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-darker via-transparent to-primary-darker/50" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="w-5 h-5 text-amber-glow" />
          <span className="text-amber-glow text-sm md:text-base font-medium tracking-widest uppercase">
            IIT Bhilai Presents
          </span>
          <Sparkles className="w-5 h-5 text-amber-glow" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-4"
        >
          <span className="neon-text-gradient animate-neon-flicker">MERAZ</span>
          <span className="text-3xl md:text-4xl lg:text-5xl text-amber-glow ml-2 align-top">
            6.0
          </span>
        </motion.h1>

        {/* Theme tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl lg:text-3xl font-light text-text-secondary mb-8"
        >
          <span className="tribal-text font-semibold">Neon Tribal Pulse</span>
          <span className="mx-3 text-neon-magenta">•</span>
          <span>Where Ancient Meets Electric</span>
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-text-secondary max-w-2xl mx-auto mb-12 text-sm md:text-base leading-relaxed"
        >
          Experience the fusion of tribal mysticism and futuristic energy. 
          Three days of innovation, art, and celebration that will ignite your soul.
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <p className="text-text-muted text-sm mb-4 uppercase tracking-wider">
            The Pulse Begins In
          </p>
          <CountdownTimer targetDate={festivalDate} />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/passes" className="btn-primary text-lg px-10 py-4">
            Get Your Pass
          </Link>
          <Link href="/events" className="btn-neon text-lg px-10 py-4">
            Explore Events
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-text-muted"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
