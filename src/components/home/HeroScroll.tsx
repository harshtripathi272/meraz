"use client";

import { useTransform, motion, MotionValue } from "framer-motion";
import ScrollSequence from "./ScrollSequence";

export default function HeroScroll() {
  return (
    <ScrollSequence 
      frameCount={456} 
      pathPattern="/assets/sequences/hero/%04d.jpg"
    >
      {({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => (
        <HeroContent scrollYProgress={scrollYProgress} />
      )}
    </ScrollSequence>
  );
}

function HeroContent({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.7, 1], [1, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.3]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.6, 0.8], [0, 1, 1, 0]);
  const guideOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center text-center px-4">
      
      {/* Scroll Guide */}
      <motion.div 
        style={{ opacity: guideOpacity }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </motion.div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono">
          Scroll to explore
        </span>
      </motion.div>

      {/* Main Hero Content */}
      <motion.div 
        style={{ opacity, scale, y }} 
        className="relative z-10"
      >
        <motion.div style={{ y: titleY }}>
          <div className="mb-8 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-white/50" />
            <span className="text-white/60 tracking-[0.5em] text-[10px] uppercase font-mono">
              IIT Bhilai Presents
            </span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-white/50" />
          </div>

          <h1 
            className="text-[clamp(4rem,20vw,16rem)] font-heading font-black tracking-tighter leading-[0.85]"
            style={{
              color: 'white',
              textShadow: '0 0 100px rgba(79, 70, 229, 0.5), 0 0 50px rgba(79, 70, 229, 0.3)',
            }}
          >
            MERAZ
          </h1>
        </motion.div>

        <motion.div style={{ opacity: subtitleOpacity }} className="mt-10">
          <p className="text-xl md:text-3xl font-mono text-indigo-400 tracking-[0.2em] uppercase font-light">
            6.0 // Steampunk: Gears of Glory
          </p>
          
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <div className="px-5 py-2 border border-white/20 rounded-full text-xs text-white/70 bg-black/40 backdrop-blur-md font-mono">
              JAN 30 - FEB 1
            </div>
            <div className="px-5 py-2 border border-indigo-500/30 rounded-full text-xs text-indigo-400 bg-indigo-500/10 backdrop-blur-md font-mono">
              REGISTER NOW
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
