"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float, OrbitControls } from "@react-three/drei";
import { useScroll, useMotionValue, useSpring } from "framer-motion";
import * as THREE from "three";

// Preload
useGLTF.preload("/assets/robot_playground.glb");

function Robot({ scrollY }: { scrollY: number }) {
  const { scene } = useGLTF("/assets/robot_playground.glb");
  const robotRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!robotRef.current) return;
    
    // Base animation
    const t = state.clock.getElapsedTime();
    robotRef.current.position.y = Math.sin(t * 1) * 0.2 - 0.5; // Bobbing
    
    // Scroll interaction: Rotate robot based on scroll Y
    // 0.005 is sensitivity
    const targetRotation = scrollY * 0.002;
    robotRef.current.rotation.y = THREE.MathUtils.lerp(
      robotRef.current.rotation.y,
      targetRotation + Math.PI / 4, // Initial offset
      0.1
    );
  });

  return (
    <primitive 
      ref={robotRef} 
      object={scene} 
      scale={2.0} 
      position={[0, -1.0, 0]}
    />
  );
}

export default function RobotMascot() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-24 right-6 z-40 w-48 h-48 md:w-64 md:h-64 pointer-events-none">
      {/* Container Frame */}
      <div className="relative w-full h-full">
        {/* Glow/Backdrop */}
        <div className="absolute inset-4 bg-cyan-500/10 rounded-full blur-2xl animate-pulse-soft" />
        
        {/* Interactive Zone (pointer-events-auto for OrbitControls) */}
        <div className="absolute inset-0 pointer-events-auto">
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 40 }} gl={{ alpha: true }}>
            <ambientLight intensity={0.8} />
            <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} color="#00d4ff" />
            <pointLight position={[-10, -5, -5]} intensity={1} color="#fbbf24" />
            
            <Robot scrollY={scrollY} />
            
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
            <Environment preset="city" />
          </Canvas>
        </div>

        {/* Decorative Ring */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 100 100">
             <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.5" />
                </linearGradient>
             </defs>
             {/* Rotating Ring */}
             <circle 
                cx="50" cy="50" r="46" 
                fill="none" 
                stroke="url(#grad1)" 
                strokeWidth="0.5" 
                strokeDasharray="4 2"
                className="animate-spin-slow origin-center"
             />
        </svg>
      </div>
    </div>
  );
}
