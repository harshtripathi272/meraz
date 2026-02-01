"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";

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
    offset: ["start start", "end end"],
  });

  // Preload all images on mount
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
        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
      };
      
      images.push(img);
    }
    
    imagesRef.current = images;
  }, [frameCount, pathPattern]);

  // Draw frame to canvas
  const drawFrame = useCallback((frameNum: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Clamp frame number
    const frame = Math.max(0, Math.min(frameNum, frameCount - 1));
    const img = imagesRef.current[frame];

    // Clear canvas
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (img && img.complete && img.naturalHeight !== 0) {
      // Draw image with "cover" behavior
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    } else {
      // Procedural fallback - animated grid
      drawFallback(ctx, canvas, frame);
    }
  }, [frameCount]);

  // Fallback renderer
  const drawFallback = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, frame: number) => {
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width
    );
    gradient.addColorStop(0, "#0a0a1a");
    gradient.addColorStop(1, "#000005");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Animated concentric rings
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    
    ctx.strokeStyle = "rgba(79, 70, 229, 0.15)";
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 15; i++) {
      const baseRadius = (i + 1) * 80;
      const animatedRadius = baseRadius + (frame % 80);
      
      ctx.beginPath();
      ctx.arc(cx, cy, animatedRadius, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    // Center text
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "center";
    ctx.fillText(`Loading frames... ${loadProgress}%`, cx, cy);
  };

  // Listen to scroll and update frame
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const targetFrame = Math.round(latest * (frameCount - 1));
    
    // Smooth interpolation for less jerky movement
    const currentFrame = currentFrameRef.current;
    const newFrame = Math.round(currentFrame + (targetFrame - currentFrame) * 0.3);
    
    if (newFrame !== currentFrame) {
      currentFrameRef.current = newFrame;
      drawFrame(newFrame);
    }
  });

  // Handle resize and initial draw
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
    
    // Initial draw after a short delay for images to start loading
    const timeout = setTimeout(() => drawFrame(0), 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, [drawFrame]);

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full"
        />
        
        {/* Dark vignette overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.4) 100%)'
          }}
        />
        
        {/* Children overlay (text content) */}
        <div className="absolute inset-0 z-10">
          {children && children({ scrollYProgress })}
        </div>
      </div>
    </div>
  );
}
