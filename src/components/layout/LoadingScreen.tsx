"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useProgress, Html, OrbitControls, Environment, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

function Artifact() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.5}>
      <icosahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial 
        roughness={0.2} 
        metalness={0.8}
        color="#1a1a1a"
        emissive="#4f46e5"
        emissiveIntensity={0.2}
        wireframe={false}
        clearcoat={1}
      />
      <lineSegments>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(1, 0)]} />
        <lineBasicMaterial color="#e0e0e0" transparent opacity={0.3} />
      </lineSegments>
    </mesh>
  );
}

function LoaderStyles({ progress }: { progress: number }) {
  return (
    <Html center>
      <div className="text-chrome font-mono text-xl tracking-[0.2em] font-bold whitespace-nowrap">
        LOADING // {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const { progress } = useProgress();
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setFinished(true);
        onComplete();
      }, 1000); // Wait 1s after load for effect
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] bg-obsidian flex flex-col items-center justify-center p-0 m-0"
    >
      <div className="w-full h-full relative">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#4f46e5" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Artifact />
          <Environment preset="city" />
          <LoaderStyles progress={progress} />
          <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} />
        </Canvas>
      </div>
      
      {/* Bottom Text */}
      <div className="absolute bottom-10 left-0 w-full text-center">
        <p className="text-text-secondary text-xs uppercase tracking-widest opacity-50">
          Initializing Meraz v6.0 Core
        </p>
      </div>
    </motion.div>
  );
}
