"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LoadingScreen from "./LoadingScreen";
import SmoothScroll from "./SmoothScroll";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatBot from "@/components/features/ChatBot";
import RobotMascot from "@/components/features/RobotMascot";
import { AuthProvider } from "@/context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Only show loader on initial mount or home page
    // For now, let's show it once on mount per session? 
    // Or just let it run.
    
    // In a real app we might check a session storage flag
  }, []);

  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <SmoothScroll>
          <Navbar />
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen bg-obsidian text-white underline-offset-4"
          >
            {children}
          </motion.main>
          <Footer />
          <ChatBot />
          <RobotMascot />
        </SmoothScroll>
      )}
    </AuthProvider>
  );
}
