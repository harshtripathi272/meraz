"use client";

import { useTransform, motion, MotionValue, useScroll } from "framer-motion";
import { HeroSequence } from "./ScrollSequence";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown, Play, Calendar, MapPin, ChevronRight } from "lucide-react";

export default function HeroScroll() {
  return (
    <HeroSequence>
      {({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => (
        <HeroContent scrollYProgress={scrollYProgress} />
      )}
    </HeroSequence>
  );
}

function HeroContent({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[130px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[200px]" 
        />
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ scale, y, opacity }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
            <span className="mx-4 px-6 py-2 text-xs font-mono tracking-[0.3em] text-cyan-400/80 uppercase border border-cyan-500/20 rounded-full bg-cyan-500/5 backdrop-blur-sm">
              IIT Bhilai Presents
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
          </div>
        </motion.div>

        {/* Main Title - MERAZ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6"
        >
          {/* Glow behind text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[80%] h-[120%] bg-gradient-to-r from-cyan-500/30 via-purple-500/20 to-amber-500/30 blur-[100px] animate-pulse" />
          </div>
          
          <h1 className="relative text-[clamp(4rem,18vw,14rem)] font-heading font-black tracking-[-0.02em] leading-[0.85]">
            <span 
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #00d4ff 20%, #ffffff 40%, #fbbf24 60%, #ffffff 80%, #00d4ff 100%)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shimmer 8s ease-in-out infinite',
              }}
            >
              MERAZ
            </span>
          </h1>
        </motion.div>

        {/* Version Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-4">
            <span className="text-6xl md:text-7xl font-heading font-black text-white/90">6.0</span>
            <div className="text-left">
              <div className="text-amber-400 font-mono text-sm tracking-widest uppercase">Steampunk</div>
              <div className="text-white/50 font-mono text-xs tracking-wider">Gears of Glory</div>
            </div>
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-10"
        >
          <CountdownTimer targetDate="2025-01-30T00:00:00" />
        </motion.div>

        {/* Event Info Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="text-white/80 text-sm font-medium">Jan 30 - Feb 1, 2025</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="text-white/80 text-sm font-medium">IIT Bhilai, Raipur</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link href="/events">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 50px rgba(0, 212, 255, 0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="group relative px-10 py-4 overflow-hidden rounded-full font-bold text-black"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />
              <span className="relative flex items-center gap-2 text-sm tracking-wide uppercase">
                Explore Events
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </Link>
          
          <Link href="/passes">
            <motion.button
              whileHover={{ scale: 1.03, borderColor: 'rgba(251, 191, 36, 0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="relative px-10 py-4 rounded-full font-bold text-amber-400 border-2 border-amber-500/30 bg-amber-500/5 backdrop-blur-xl hover:bg-amber-500/10 transition-all"
            >
              <span className="text-sm tracking-wide uppercase">Get Passes</span>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <div className="w-8 h-14 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3], y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-3 bg-gradient-to-b from-cyan-400 to-amber-400 rounded-full"
            />
          </div>
        </motion.div>
        <span className="text-[10px] text-white/30 font-mono tracking-[0.3em] uppercase">Scroll</span>
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-white/5 rounded-tl-3xl" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-white/5 rounded-tr-3xl" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-white/5 rounded-bl-3xl" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-white/5 rounded-br-3xl" />
    </div>
  );
}

// Premium Countdown Timer
function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Mins' },
    { value: timeLeft.seconds, label: 'Secs' },
  ];

  return (
    <div className="flex justify-center gap-3 md:gap-4">
      {units.map((unit, index) => (
        <div key={unit.label} className="flex items-center">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-b from-cyan-500/20 to-amber-500/20 rounded-2xl blur-lg opacity-50" />
            
            <div className="relative w-16 md:w-20 h-20 md:h-24 bg-[#0a0a14]/80 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col items-center justify-center">
              <motion.span 
                key={unit.value}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-heading font-black text-white"
              >
                {String(unit.value).padStart(2, '0')}
              </motion.span>
              <span className="text-[10px] text-white/40 font-mono uppercase tracking-wider mt-1">
                {unit.label}
              </span>
            </div>
          </div>
          
          {index < units.length - 1 && (
            <div className="mx-1 md:mx-2 flex flex-col gap-2">
              <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
              <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
