"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function AboutPreview() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <div className="relative z-10">
          <span className="block text-indigo-500 font-mono text-xs tracking-[0.3em] mb-6 uppercase">
            The Philosophy
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-black leading-tight mb-8">
            REDEFINING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-400">CULTURE</span>
          </h2>
          <div className="space-y-6 text-lg text-white/60 leading-relaxed">
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
               className="inline-flex items-center gap-4 text-sm font-bold tracking-widest uppercase hover:text-indigo-400 transition-colors group"
             >
               Explore the Lore
               <span className="w-8 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-indigo-500 transition-all" />
             </Link>
          </div>
        </div>

        {/* Video/Image Container */}
        <div className="relative">
          <motion.div style={{ y }} className="relative z-10">
            <div className="aspect-[4/5] relative overflow-hidden border border-white/10 bg-black">
               {/* Video Background */}
               <motion.div style={{ scale: videoScale }} className="absolute inset-0">
                 <video 
                   autoPlay 
                   loop 
                   muted 
                   playsInline
                   className="w-full h-full object-cover"
                 >
                   <source src="/assets/video/dance.mp4" type="video/mp4" />
                 </video>
               </motion.div>
               
               {/* Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
               
               {/* Stats */}
               <div className="absolute bottom-6 left-6 right-6 z-10">
                 <div className="flex justify-between items-end border-b border-white/20 pb-4">
                   <div className="text-5xl font-mono text-white font-bold">03</div>
                   <div className="text-xs text-white/60 font-mono text-right uppercase tracking-wider">
                     Days of<br/>Mayhem
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>
          
          {/* Decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-600/10 blur-3xl rounded-full z-0" />
        </div>
      </div>
    </section>
  );
}
