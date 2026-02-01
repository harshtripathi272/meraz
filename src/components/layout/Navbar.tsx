"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

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

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/5 ${
          isScrolled 
            ? "glass-panel py-4 bg-obsidian/80 supports-[backdrop-filter]:bg-obsidian/20" 
            : "bg-transparent py-6 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
             <div className="w-2 h-8 bg-indigo-600 group-hover:bg-chrome transition-colors duration-300" />
             <div className="flex flex-col">
               <span className="text-xl font-heading font-bold tracking-[0.2em] leading-none group-hover:text-chrome transition-colors">MERAZ</span>
               <span className="text-[0.6rem] font-mono tracking-widest text-text-secondary">SIX.ZERO</span>
             </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="relative text-xs font-bold uppercase tracking-[0.2em] text-text-secondary hover:text-white transition-colors py-2"
              >
                {pathname === link.href && (
                  <motion.span 
                    layoutId="underline" 
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-indigo-500" 
                  />
                )}
                {link.name}
              </Link>
            ))}
            
            <Link 
              href="/passes"
              className="px-6 py-2 border border-white/20 hover:border-indigo-500 hover:bg-indigo-500/10 text-xs font-bold uppercase tracking-widest transition-all duration-300"
            >
              Get Tickets
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
        className="fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8"
      >
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-2xl font-heading font-bold tracking-widest text-white hover:text-indigo-500 transition-colors"
          >
            {link.name}
          </Link>
        ))}
        <Link
          href="/passes"
          onClick={() => setIsOpen(false)}
          className="mt-8 px-8 py-3 bg-indigo-600 text-white font-mono tracking-widest text-xs uppercase"
        >
          Secure Entry
        </Link>
      </motion.div>
    </>
  );
}
