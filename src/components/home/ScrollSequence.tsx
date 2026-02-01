"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion, MotionValue } from "framer-motion";

interface ScrollSequenceProps {
  frameCount?: number;
  pathPattern?: string;
  children?: (props: { scrollYProgress: MotionValue<number> }) => React.ReactNode;
}

export default function ScrollSequence({ 
  frameCount = 456,
  pathPattern = "/assets/sequences/hero/%04d.jpg",
  children
}: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const currentFrameRef = useRef(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Preload images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const number = i.toString().padStart(4, '0');
      img.src = pathPattern.replace('%04d', number);
      
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
      };
      img.onerror = () => {
        loadedCount++;
      };
      
      images.push(img);
    }
    
    imagesRef.current = images;
  }, [frameCount, pathPattern]);

  const drawFrame = useCallback((frameNum: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const frame = Math.max(0, Math.min(frameNum, frameCount - 1));
    const img = imagesRef.current[frame];

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (img && img.complete && img.naturalHeight !== 0) {
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    } else {
      drawFallback(ctx, canvas, frame);
    }
  }, [frameCount]);

  const drawFallback = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, frame: number) => {
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width
    );
    gradient.addColorStop(0, "#0a0a1a");
    gradient.addColorStop(1, "#000005");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    
    ctx.strokeStyle = "rgba(79, 70, 229, 0.12)";
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 15; i++) {
      const baseRadius = (i + 1) * 80;
      const animatedRadius = baseRadius + (frame % 80);
      ctx.beginPath();
      ctx.arc(cx, cy, animatedRadius, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.font = "bold 12px monospace";
    ctx.textAlign = "center";
    ctx.fillText(`Loading ${loadProgress}%`, cx, cy);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const targetFrame = Math.round(latest * (frameCount - 1));
    const currentFrame = currentFrameRef.current;
    const newFrame = Math.round(currentFrame + (targetFrame - currentFrame) * 0.25);
    
    if (newFrame !== currentFrame) {
      currentFrameRef.current = newFrame;
      drawFrame(newFrame);
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        drawFrame(currentFrameRef.current);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    setTimeout(() => drawFrame(0), 100);

    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  const heroOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0.7, 1], [1, 0.95]);

  return (
    <div ref={containerRef} className="h-[200vh] relative">
      {/* Fixed hero background */}
      <div className="fixed top-0 left-0 w-screen h-screen z-0">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.5) 100%)' }}
        />
        
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 z-10">
          {children && children({ scrollYProgress })}
        </motion.div>
      </div>
    </div>
  );
}

// ============================================
// SECOND SEQUENCE - Background for content sections
// ============================================
interface ContentBackgroundProps {
  children: React.ReactNode;
}

export function ContentBackground({ children }: ContentBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  
  const frameCount = 165;
  const pathPattern = "/assets/sequences/more/ezgif-frame-%03d.jpg";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Preload second sequence
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const number = i.toString().padStart(3, '0');
      img.src = pathPattern.replace('%03d', number);
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  const drawFrame = useCallback((frameNum: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const frame = Math.max(0, Math.min(frameNum, frameCount - 1));
    const img = imagesRef.current[frame];

    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (img && img.complete && img.naturalHeight !== 0) {
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      ctx.globalAlpha = 0.3; // Semi-transparent for background effect
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      ctx.globalAlpha = 1;
    }
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const targetFrame = Math.round(latest * (frameCount - 1));
    const currentFrame = currentFrameRef.current;
    const newFrame = Math.round(currentFrame + (targetFrame - currentFrame) * 0.2);
    
    if (newFrame !== currentFrame) {
      currentFrameRef.current = newFrame;
      drawFrame(newFrame);
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        drawFrame(currentFrameRef.current);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    setTimeout(() => drawFrame(0), 200);

    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed background canvas for second sequence */}
      <div className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-obsidian/80" /> {/* Darken overlay */}
      </div>
      
      {/* Content that sits on top */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
