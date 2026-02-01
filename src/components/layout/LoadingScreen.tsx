"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, TorusKnot, Icosahedron, Octahedron } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

function ReactorCore() {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.x = time * 0.1;
      outerRef.current.rotation.y = time * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -time * 0.2;
      innerRef.current.rotation.z = time * 0.1;
    }
  });

  return (
    <group>
      <group ref={outerRef}>
        <Icosahedron args={[1.8, 1]}>
          <meshPhongMaterial 
            color="#2a2a2a" 
            emissive="#4f46e5" 
            emissiveIntensity={0.1}
            wireframe 
            transparent 
            opacity={0.3} 
          />
        </Icosahedron>
        <ScatterPoints count={40} radius={2.5} />
      </group>

      <group ref={innerRef}>
        <TorusKnot args={[0.8, 0.25, 128, 16]}>
          <meshPhysicalMaterial 
            color="#000000"
            emissive="#4f46e5"
            emissiveIntensity={2}
            roughness={0.1}
            metalness={1}
            clearcoat={1}
          />
        </TorusKnot>
        <Float speed={5} rotationIntensity={1} floatIntensity={0.5}>
          <Octahedron args={[0.3]} position={[1.2, 0, 0]}>
             <meshBasicMaterial color="#e0e0e0" wireframe />
          </Octahedron>
          <Octahedron args={[0.3]} position={[-1.2, 0.5, 0]}>
             <meshBasicMaterial color="#e0e0e0" wireframe />
          </Octahedron>
        </Float>
      </group>
    </group>
  );
}

function ScatterPoints({ count, radius }: { count: number; radius: number }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = THREE.MathUtils.randFloatSpread(360); 
        const phi = THREE.MathUtils.randFloatSpread(360); 
        p[i*3] = radius * Math.sin(theta) * Math.cos(phi);
        p[i*3+1] = radius * Math.sin(theta) * Math.sin(phi);
        p[i*3+2] = radius * Math.cos(theta);
    }
    return p;
  }, [count, radius]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#4f46e5" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate the progress counter
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    // Force complete after 3 seconds
    const timeout = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.05, 
        transition: { duration: 0.8, ease: "easeInOut" } 
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        background: '#000',
      }}
    >
      {/* 3D Canvas - Full Screen */}
      <Canvas 
        camera={{ position: [0, 0, 4.5], fov: 45 }} 
        gl={{ antialias: true }}
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 12]} />
        <ambientLight intensity={0.5} />
        <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <ReactorCore />
      </Canvas>
      
      {/* UI Overlay - Centered */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontSize: 'clamp(4rem, 15vw, 10rem)',
          fontWeight: 900,
          fontFamily: 'var(--font-mono), monospace',
          background: 'linear-gradient(to top, #4f46e5, #ffffff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.05em',
        }}>
          {Math.min(100, Math.round(progress))}
        </div>
        <div style={{
          width: '8rem',
          height: '2px',
          background: 'rgba(255,255,255,0.2)',
          margin: '1rem 0',
        }} />
        <div style={{
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5em',
          color: '#818cf8',
          fontFamily: 'var(--font-mono), monospace',
        }}>
          Initializing System
        </div>
      </div>
      
      {/* Version Tag */}
      <div style={{
        position: 'absolute',
        bottom: '3rem',
        left: '3rem',
        fontSize: '0.75rem',
        color: 'rgba(255,255,255,0.2)',
        fontFamily: 'monospace',
      }}>
        MERAZ.OS v6.0.0
      </div>
    </motion.div>
  );
}
