"use client";

import { useRef, useState, useEffect, useCallback, ReactNode, useMemo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Zap, Users, Trophy, Sparkles } from "lucide-react";

// =============================================================================
// HERO SEQUENCE - For frame animation with scroll
// =============================================================================

interface HeroSequenceProps {
  children: (props: { scrollYProgress: MotionValue<number> }) => ReactNode;
}

export function HeroSequence({ children }: HeroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);
  const currentFrameRef = useRef(0);
  const [isReady, setIsReady] = useState(false);
  const frameCount = 478;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload all frames
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    contextRef.current = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Load frames
    let loaded = 0;
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Use correct path pattern
      img.src = `/assets/sequences/hero/${String(i).padStart(4, '0')}.jpg`;
      img.onload = () => {
        loaded++;
        loadedCountRef.current = loaded;
        // Show first frame
        if (loaded === 1) {
             drawFrame(0);
             setIsReady(true);
        }
      };
      imagesRef.current[i - 1] = img;
    }

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const drawFrame = useCallback((frameIndex: number) => {
    const ctx = contextRef.current;
    const canvas = canvasRef.current;
    const img = imagesRef.current[frameIndex];
    
    if (!ctx || !canvas || !img || !img.complete) return;
    
    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw cover
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;
    
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }, []);

  // Sync frame with scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const nextFrame = Math.min(Math.floor(latest * frameCount), frameCount - 1);
      if (nextFrame !== currentFrameRef.current && nextFrame >= 0) {
        currentFrameRef.current = nextFrame;
        drawFrame(nextFrame);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, drawFrame]);

  return (
    <section ref={containerRef} className="h-[350vh] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#030303]">
        {/* Fallback Background if canvas fails/loading */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a14] to-[#030303] flex items-center justify-center">
            {!isReady && (
                <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            )}
        </div>
        
        {/* Canvas */}
        <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`} />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050508]/80" />
        {children({ scrollYProgress })}
      </div>
    </section>
  );
}

// =============================================================================
// SECOND SEQUENCE - Video/Frame sequence with overlay content
// =============================================================================

export function SecondSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);
  const currentFrameRef = useRef(0);
  const [isReady, setIsReady] = useState(false);
  const frameCount = 165;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Content Animations
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    contextRef.current = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // ezgif frames have 3 digits padding (e.g. 001, 010, 100)
      img.src = `/assets/sequences/more/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      img.onload = () => {
        loadedCountRef.current++;
        if (loadedCountRef.current === 1) {
          drawFrame(0);
          setIsReady(true);
        }
      };
      imagesRef.current[i - 1] = img;
    }

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const drawFrame = useCallback((frameIndex: number) => {
    const ctx = contextRef.current;
    const canvas = canvasRef.current;
    const img = imagesRef.current[frameIndex];
    
    if (!ctx || !canvas || !img || !img.complete) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;
    
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const nextFrame = Math.min(Math.floor(latest * frameCount), frameCount - 1);
      if (nextFrame !== currentFrameRef.current && nextFrame >= 0) {
        currentFrameRef.current = nextFrame;
        drawFrame(nextFrame);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, drawFrame]);

  return (
    // Increased height to 400vh for longer scroll duration
    <section ref={containerRef} className="h-[400vh] relative bg-[#050508]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Fallback */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a14] to-[#050508]" />

        {/* Video Sequence Canvas */}
        <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isReady ? 'opacity-40' : 'opacity-0'}`} />
        
        {/* Dark Gradient Overlays to separate text from background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/80" />
        <div className="absolute inset-0 bg-black/40" />

        {/* Center Content Overlay */}
        <motion.div 
          style={{ opacity: textOpacity, scale: contentScale }}
          className="absolute inset-0 flex items-center justify-center p-4 z-20 pointer-events-none"
        >
          <div className="text-center px-6 max-w-5xl mx-auto backdrop-blur-sm bg-black/10 rounded-3xl p-8 border border-white/5">
            {/* Top Line Decoration */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500/50" />
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500/50" />
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-heading font-black text-white mb-6 leading-tight drop-shadow-2xl">
              Central India's
              <br />
              <span 
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #fbbf24 50%, #00d4ff 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shimmer 4s ease-in-out infinite',
                }}
              >
                Largest Festival
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Three days of innovation, culture, and unforgettable experiences await you 
              at the most anticipated techno-cultural festival.
            </p>
            
            {/* Floating Stats */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: Zap, value: "100+", label: "Events", color: "cyan" },
                { icon: Users, value: "1K+", label: "Parts", color: "amber" },
                { icon: Trophy, value: "₹5L+", label: "Prize", color: "purple" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`px-6 py-4 rounded-2xl backdrop-blur-xl border transition-all ${
                    stat.color === "cyan" 
                      ? "bg-cyan-500/20 border-cyan-500/30" 
                      : stat.color === "amber"
                      ? "bg-amber-500/20 border-amber-500/30"
                      : "bg-purple-500/20 border-purple-500/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <stat.icon className={`w-5 h-5 ${
                      stat.color === "cyan" ? "text-cyan-400" : 
                      stat.color === "amber" ? "text-amber-400" : "text-purple-400"
                    }`} />
                    <div className="text-left">
                      <div className="text-xl font-heading font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-white/60 font-mono uppercase">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// CONTENT SECTION - Wrapper with animated particles background
// =============================================================================

interface ContentSectionProps {
  children: ReactNode;
}

export function ContentSection({ children }: ContentSectionProps) {
  return (
    <section className="relative bg-[#050508]">
      {/* Animated particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <ParticleField />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}

// Lightweight particle effect
function ParticleField() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      color: Math.random() > 0.5 ? 'cyan' : 'amber',
    }));
  }, []);

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            particle.color === 'cyan' ? 'bg-cyan-400/30' : 'bg-amber-400/30'
          }`}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Large ambient orbs */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[120px]"
      />
    </>
  );
}
