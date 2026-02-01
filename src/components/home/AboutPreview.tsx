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
          <span className="block text-amber-500 font-mono text-xs tracking-[0.3em] mb-6 uppercase">
            The Philosophy
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-black leading-tight mb-8">
            GEARS OF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">GLORY</span>
          </h2>
          <div className="space-y-6 text-lg text-white/60 leading-relaxed">
            <p>
              Meraz isn't just a festival; it's a convergence. Where the raw energy of 
              <span className="text-amber-400"> tribal rhythms</span> fuses with the precision of 
              <span className="text-cyan-400"> steampunk innovation</span>.
            </p>
            <p>
              The 6th edition embraces the "Steampunk: Gears of Glory" theme, blending 
              Victorian-era aesthetics with futuristic technology. We build a sanctuary for creators, 
              hackers, and artists to explore the boundaries of what is possible.
            </p>
          </div>
          
          <div className="mt-10">
             <Link 
               href="/about"
               className="inline-flex items-center gap-4 text-sm font-bold tracking-widest uppercase hover:text-amber-400 transition-colors group"
             >
               Explore the Lore
               <span className="w-8 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-amber-500 transition-all" />
             </Link>
          </div>
        </div>

        {/* Video/Image Container */}
        <div className="relative">
          <motion.div style={{ y }} className="relative z-10">
            <div className="aspect-[4/5] relative overflow-hidden border border-amber-500/20 bg-black">
               {/* Video Background */}
               <motion.div style={{ scale: videoScale }} className="absolute inset-0">
                 <video 
                   autoPlay 
                   loop 
                   muted 
                   playsInline
                   className="w-full h-full object-cover grayscale contrast-125 sepia-[0.3]"
                 >
                   <source src="/assets/video/dance.mp4" type="video/mp4" />
                 </video>
               </motion.div>
               
               {/* Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
               
               {/* Stats */}
               <div className="absolute bottom-6 left-6 right-6 z-10">
                 <div className="flex justify-between items-end border-b border-amber-500/30 pb-4">
                   <div className="text-5xl font-mono text-amber-500 font-bold">03</div>
                   <div className="text-xs text-white/60 font-mono text-right uppercase tracking-wider">
                     Days of<br/>Action
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>
          
          {/* Decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-600/10 blur-3xl rounded-full z-0" />
        </div>
      </div>
    </section>
  );
}
