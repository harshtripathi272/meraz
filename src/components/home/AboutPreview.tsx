"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Play, ArrowRight, Calendar, Users, Music, Sparkles } from "lucide-react";

export default function AboutPreview() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const videoY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const textY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: videoY }}
          className="absolute -left-32 top-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[180px]"
        />
        <motion.div
          style={{ y: textY }}
          className="absolute -right-32 bottom-1/3 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[150px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Video/Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: videoY }}
            className="relative"
          >
            {/* Main Video Container */}
            <div className="relative group">
              {/* Outer glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/10 to-amber-500/20 rounded-[2rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              
              {/* Video Frame */}
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a14]">
                {/* Placeholder for video */}
                <div className="aspect-video relative overflow-hidden">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-[#0a0a14] to-amber-500/20" />
                  
                  {/* Grid Pattern */}
                  <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px',
                    }}
                  />
                  
                  {/* Play Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute inset-0 flex items-center justify-center group/play"
                  >
                    <div className="relative">
                      {/* Outer ring */}
                      <div className="absolute -inset-6 rounded-full border-2 border-white/10 group-hover/play:border-white/20 group-hover/play:scale-110 transition-all duration-300" />
                      
                      {/* Play button */}
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 flex items-center justify-center shadow-2xl shadow-cyan-500/30 group-hover/play:shadow-cyan-500/50 transition-all">
                        <Play className="w-8 h-8 text-black ml-1" fill="black" />
                      </div>
                    </div>
                  </motion.button>
                  
                  {/* LIVE Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-red-500/20 backdrop-blur-xl border border-red-500/30 rounded-full">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Aftermovie</span>
                  </div>
                  
                  {/* Year badge */}
                  <div className="absolute bottom-4 right-4 px-4 py-2 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full">
                    <span className="text-white/80 text-sm font-mono">MERAZ 5.0</span>
                  </div>
                </div>
              </div>
              
              {/* Corner Decorations */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-cyan-500/50 rounded-tl-lg" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-cyan-500/50 rounded-tr-lg" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-amber-500/50 rounded-bl-lg" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-amber-500/50 rounded-br-lg" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: textY }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-mono tracking-wider uppercase">About the Fest</span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-6 leading-tight">
              Where Innovation
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400">
                Meets Celebration
              </span>
            </h2>

            {/* Description */}
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              MERAZ is the annual techno-cultural festival of IIT Bhilai that brings together 
              the brightest minds from across the country. From cutting-edge hackathons to 
              electrifying Pro-Night concerts, experience three days of non-stop innovation, 
              art, and entertainment.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { icon: Calendar, value: "6th", label: "Edition" },
                { icon: Users, value: "1K+", label: "Footfall" },
                { icon: Music, value: "3", label: "Pro-Nights" },
              ].map((stat) => (
                <div 
                  key={stat.label}
                  className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl text-center hover:border-white/20 transition-colors"
                >
                  <stat.icon className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                  <div className="text-2xl font-heading font-bold text-white">{stat.value}</div>
                  <div className="text-white/40 text-xs font-mono uppercase">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link href="/about">
              <motion.button
                whileHover={{ x: 5 }}
                className="group flex items-center gap-3 text-cyan-400 font-bold text-lg"
              >
                Discover Our Story
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
