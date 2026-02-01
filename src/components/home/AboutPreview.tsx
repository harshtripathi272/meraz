"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Users, Mic2, Trophy } from "lucide-react";

const stats = [
  { icon: Calendar, value: "100+", label: "Events", color: "neon-magenta" },
  { icon: Users, value: "1000+", label: "Participants", color: "neon-teal" },
  { icon: Mic2, value: "3", label: "Pro-Nights", color: "amber-glow" },
  { icon: Trophy, value: "₹10L+", label: "Prize Pool", color: "tribal-gold" },
];

function AnimatedCounter({ value, color }: { value: string; color: string }) {
  return (
    <span className={`text-${color}`} style={{ color: `var(--${color})` }}>
      {value}
    </span>
  );
}

export default function AboutPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section relative">
      {/* Background decoration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-neon-magenta/5 rounded-full blur-3xl" />
      <div className="absolute right-0 top-1/4 w-64 h-64 bg-neon-teal/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">The Pulse of Innovation</h2>
          <p className="section-subtitle">
            Meraz is where technology, art, and tribal energy collide to create 
            an unforgettable celebration of creativity and culture.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              Experience the 
              <span className="neon-text-gradient"> Neon Tribal Pulse</span>
            </h3>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Meraz 6.0 brings together the ancient wisdom of tribal aesthetics 
                with the electric energy of modern innovation. This year, we 
                transcend boundaries to create an immersive experience that 
                celebrates both heritage and future.
              </p>
              <p>
                From cutting-edge tech showcases and coding battles to captivating 
                performances, fashion artistry, and culinary delights — Meraz 
                embraces every shade of human creativity. More than an event, 
                it&apos;s a movement.
              </p>
            </div>
            <Link 
              href="/about"
              className="inline-flex items-center gap-2 mt-8 text-neon-teal hover:text-neon-magenta transition-colors group"
            >
              <span className="font-medium">Discover Our Story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right: Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="glass-card p-8 relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neon-magenta/10 to-transparent" />
              
              <div className="relative z-10">
                <div className="text-6xl font-black neon-text-gradient mb-4">6.0</div>
                <h4 className="text-xl font-semibold text-text-primary mb-2">
                  Sixth Edition
                </h4>
                <p className="text-text-secondary text-sm mb-6">
                  Each year, Meraz evolves. This edition marks our most ambitious 
                  festival yet, with expanded venues, international collaborations, 
                  and experiences that push creative boundaries.
                </p>
                
                {/* Feature list */}
                <ul className="space-y-3">
                  {["Immersive Theme Experiences", "Pro-Night Concerts", "National Level Competitions", "Startup Expo"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <span 
                        className="w-2 h-2 rounded-full"
                        style={{ 
                          backgroundColor: i % 2 === 0 ? "var(--neon-magenta)" : "var(--neon-teal)",
                          boxShadow: `0 0 10px ${i % 2 === 0 ? "var(--neon-magenta)" : "var(--neon-teal)"}`
                        }}
                      />
                      <span className="text-text-primary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="glass-card p-6 text-center group hover:border-neon-magenta/30 transition-colors"
            >
              <stat.icon 
                className="w-8 h-8 mx-auto mb-3 transition-transform group-hover:scale-110"
                style={{ color: `var(--${stat.color})` }}
              />
              <div 
                className="text-3xl md:text-4xl font-bold mb-1"
                style={{ color: `var(--${stat.color})` }}
              >
                {stat.value}
              </div>
              <div className="text-text-muted text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
