"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPreview() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative z-10">
          <span className="block text-indigo-500 font-mono text-xs tracking-[0.3em] mb-6 uppercase">
            The Philosophy
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-black leading-tight mb-8">
            REDEFINING <br />
            <span className="text-chrome">CULTURE</span>
          </h2>
          <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
            <p>
              Meraz isn't just a festival; it's a convergence. Where the raw energy of 
              tribal rhythms fuses with the precision of modern technology.
            </p>
            <p>
              For three days, we suspend reality. We build a sanctuary for creators, 
              hackers, and artists to explore the boundaries of what is possible.
            </p>
          </div>
          
          <div className="mt-10">
             <Link 
               href="/about"
               className="inline-flex items-center gap-4 text-sm font-bold tracking-widest uppercase hover:text-white transition-colors group"
             >
               Explore the Lore
               <span className="w-8 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-indigo-500 transition-all" />
             </Link>
          </div>
        </div>

        <div className="relative">
          <motion.div style={{ y }} className="relative z-10">
            <div className="aspect-[4/5] bg-charcoal relative overflow-hidden border border-white/5">
               {/* 3D Model Placeholder or Abstract Art */}
               <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 to-transparent mix-blend-overlay" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-64 h-64 border border-white/10 rounded-full animate-spin-slow" />
                 <div className="absolute w-48 h-48 border border-white/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
               </div>
               <div className="absolute bottom-6 left-6 right-6">
                 <div className="flex justify-between items-end border-b border-white/20 pb-4">
                   <div className="text-4xl font-mono text-white">03</div>
                   <div className="text-xs text-text-secondary font-mono text-right">
                     DAYS OF<br/>MAYHEM
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>
          
          {/* Decorative background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-600/5 blur-3xl rounded-full z-0" />
        </div>
      </div>
    </section>
  );
}
