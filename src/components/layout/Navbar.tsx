"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cog, Sparkles } from "lucide-react";

const links = [
  { name: "Events", href: "/events" },
  { name: "Passes", href: "/passes" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "py-3 bg-[#050508]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50" 
            : "py-5 bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 via-cyan-400 to-amber-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Cog className="w-7 h-7 text-black" />
              </div>
              {/* Rotating outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 border border-cyan-500/30 rounded-xl pointer-events-none"
              />
            </motion.div>
            
            <div className="flex flex-col">
              <span className="text-2xl font-heading font-black tracking-tight leading-none">
                <span className="text-white">MER</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">AZ</span>
              </span>
              <span className="text-[10px] font-mono tracking-[0.3em] text-amber-400/80 uppercase">
                6.0 // Steampunk
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="relative px-5 py-2.5 group"
              >
                <span className={`relative z-10 text-sm font-medium tracking-wide transition-colors ${
                  pathname === link.href 
                    ? 'text-cyan-400' 
                    : 'text-white/70 group-hover:text-white'
                }`}>
                  {link.name}
                </span>
                
                {/* Active indicator */}
                {pathname === link.href && (
                  <motion.div 
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/30 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
            
            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="ml-4"
            >
              <Link 
                href="/passes"
                className="relative inline-flex items-center gap-2 px-6 py-2.5 overflow-hidden group"
              >
                {/* Gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-full" />
                <div className="absolute inset-[1.5px] bg-[#0a0a12] rounded-full" />
                
                {/* Content */}
                <span className="relative z-10 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400 tracking-wide">
                  Get Tickets
                </span>
                <Sparkles className="relative z-10 w-4 h-4 text-amber-400" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Toggle */}
          <motion.button 
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            className="md:hidden relative w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#050508]/98 backdrop-blur-xl"
            />
            
            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center gap-8 p-6">
              {/* Decorative gears */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-20 right-10 w-32 h-32 opacity-5"
              >
                <Cog className="w-full h-full text-white" />
              </motion.div>
              
              {links.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`text-4xl font-heading font-black tracking-tight transition-colors ${
                      pathname === link.href 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400'
                        : 'text-white hover:text-cyan-400'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <Link
                  href="/passes"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-cyan-500 to-amber-500 text-black font-bold rounded-full text-lg"
                >
                  <Sparkles className="w-5 h-5" />
                  Get Tickets
                </Link>
              </motion.div>
              
              {/* Festival info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-12 text-center"
              >
                <p className="text-white/40 font-mono text-xs tracking-wider">
                  JAN 30 - FEB 1, 2025
                </p>
                <p className="text-white/30 font-mono text-xs mt-1">
                  IIT Bhilai, Raipur
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
