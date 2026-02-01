"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroScroll() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const yText = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  
  // Parallax for background video
  const yVideo = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="h-[150vh] relative z-0">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Video Layer */}
        <motion.div 
          style={{ y: yVideo, scale }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-obsidian/40 z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="/assets/images/hero-poster.jpg"
          >
            {/* User to add their generated video here */}
            {/* <source src="/assets/videos/hero-loop.mp4" type="video/mp4" /> */}
          </video>
          {/* Fallback pattern if no video */}
          <div className="absolute inset-0 bg-noise opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 to-transparent" />
        </motion.div>

        {/* Content Layer */}
        <motion.div 
          style={{ opacity, y: yText }}
          className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4"
        >
          <div className="mb-4 flex items-center gap-4">
             <span className="h-[1px] w-12 bg-chrome" />
             <span className="text-chrome tracking-[0.5em] text-sm uppercase font-mono">
               Est. 2017
             </span>
             <span className="h-[1px] w-12 bg-chrome" />
          </div>

          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-heading font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 leading-[0.8]">
            MERAZ
            <span className="block text-4xl md:text-6xl font-normal tracking-normal text-indigo-500 mt-2 font-mono">
              6.0
            </span>
          </h1>

          <p className="mt-8 text-lg font-body text-text-secondary max-w-xl mx-auto tracking-wide">
            NEON TRIBAL PULSE // WHERE ANCIENT RHYTHM MEETS FUTURE TECH
          </p>

          <div className="mt-12 flex flex-col gap-2 items-center">
             <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-chrome animate-pulse" />
             <span className="text-xs uppercase tracking-widest text-text-secondary">Scroll to Explore</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
