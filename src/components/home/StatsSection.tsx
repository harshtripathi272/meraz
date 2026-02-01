"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Zap, Users, Trophy, Calendar, Music, Cpu, Gamepad2, Briefcase } from "lucide-react";

const stats = [
  { 
    icon: Zap, 
    end: 100, 
    suffix: "+", 
    label: "Events",
    description: "Competitions & Activities",
    gradient: "from-cyan-500 to-blue-500",
    glow: "cyan"
  },
  { 
    icon: Users, 
    end: 1000, 
    suffix: "+", 
    label: "Participants",
    description: "From Across India",
    gradient: "from-amber-500 to-orange-500",
    glow: "amber"
  },
  { 
    icon: Trophy, 
    end: 5, 
    prefix: "₹", 
    suffix: "L+", 
    label: "Prize Pool",
    description: "In Total Rewards",
    gradient: "from-purple-500 to-pink-500",
    glow: "purple"
  },
  { 
    icon: Calendar, 
    end: 3, 
    suffix: "", 
    label: "Days",
    description: "Of Non-Stop Action",
    gradient: "from-emerald-500 to-teal-500",
    glow: "emerald"
  },
];

const categories = [
  { icon: Cpu, name: "Sci-Tech", events: "25+", color: "cyan" },
  { icon: Music, name: "Cultural", events: "30+", color: "purple" },
  { icon: Gamepad2, name: "Gaming", events: "15+", color: "emerald" },
  { icon: Briefcase, name: "E-Cell", events: "10+", color: "amber" },
];

export default function StatsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-white/60 text-sm font-mono tracking-wider uppercase">The Numbers</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-heading font-black text-white mb-6">
            MERAZ at a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">Glance</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Central India's largest techno-cultural festival brings together the brightest minds
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white/80">Event Categories</h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`group flex items-center gap-4 px-6 py-4 rounded-2xl backdrop-blur-xl border transition-all cursor-pointer ${
                  cat.color === "cyan" 
                    ? "bg-cyan-500/5 border-cyan-500/20 hover:bg-cyan-500/10 hover:border-cyan-500/40" 
                    : cat.color === "purple"
                    ? "bg-purple-500/5 border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-500/40"
                    : cat.color === "emerald"
                    ? "bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/40"
                    : "bg-amber-500/5 border-amber-500/20 hover:bg-amber-500/10 hover:border-amber-500/40"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                  cat.color === "cyan" 
                    ? "bg-cyan-500/20" 
                    : cat.color === "purple"
                    ? "bg-purple-500/20"
                    : cat.color === "emerald"
                    ? "bg-emerald-500/20"
                    : "bg-amber-500/20"
                }`}>
                  <cat.icon className={`w-6 h-6 ${
                    cat.color === "cyan" 
                      ? "text-cyan-400" 
                      : cat.color === "purple"
                      ? "text-purple-400"
                      : cat.color === "emerald"
                      ? "text-emerald-400"
                      : "text-amber-400"
                  }`} />
                </div>
                <div>
                  <div className="text-white font-bold">{cat.name}</div>
                  <div className="text-white/40 text-sm font-mono">{cat.events} Events</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Animated counter stat card
function StatCard({ stat, index, isInView }: { 
  stat: typeof stats[0]; 
  index: number; 
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000;
    const steps = 60;
    const stepValue = stat.end / steps;
    const stepDuration = duration / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= stat.end) {
        setCount(stat.end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, stat.end]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <div className={`absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${
        stat.glow === "cyan" ? "bg-cyan-500/20" :
        stat.glow === "amber" ? "bg-amber-500/20" :
        stat.glow === "purple" ? "bg-purple-500/20" :
        "bg-emerald-500/20"
      }`} />
      
      <div className="relative h-full p-6 md:p-8 bg-[#0a0a14]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden group-hover:border-white/20 transition-all">
        {/* Background gradient */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 blur-2xl rounded-full transform translate-x-8 -translate-y-8`} />
        
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <stat.icon className="w-7 h-7 text-white" />
        </div>
        
        {/* Counter */}
        <div className="mb-2">
          <span className={`text-4xl md:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}>
            {stat.prefix || ''}{count}{stat.suffix}
          </span>
        </div>
        
        {/* Label */}
        <div className="text-white font-bold text-lg mb-1">{stat.label}</div>
        <div className="text-white/40 text-sm">{stat.description}</div>
      </div>
    </motion.div>
  );
}
