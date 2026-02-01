"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Instagram, 
  Twitter, 
  Youtube, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Cog,
  ArrowUpRight,
  Heart
} from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/meraziitbh", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/meraziitbh", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com/@meraziitbh", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com/company/meraz-iitbhilai", label: "LinkedIn" },
];

const quickLinks = [
  { href: "/events", label: "Events" },
  { href: "/passes", label: "Get Passes" },
  { href: "/about", label: "About" },
];

const eventCategories = [
  { href: "/events?category=sci-tech", label: "Sci-Tech" },
  { href: "/events?category=cultural", label: "Cultural" },
  { href: "/events?category=sports", label: "Varchasva" },
  { href: "/events?category=e-cell", label: "E-Cell" },
];

export default function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#050508] to-transparent" />
        
        {/* Decorative gears */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -left-20 top-20 w-64 h-64 opacity-[0.02]"
        >
          <GearSVG />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute -right-16 bottom-32 w-48 h-48 opacity-[0.02]"
        >
          <GearSVG />
        </motion.div>
        
        {/* Gradient orbs */}
        <div className="absolute left-1/4 top-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px]" />
        <div className="absolute right-1/4 bottom-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px]" />
      </div>
      
      {/* Top Divider */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-flex items-center gap-4 mb-6 group">
                <motion.div 
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-amber-500 flex items-center justify-center shadow-lg shadow-cyan-500/20"
                >
                  <Cog className="w-8 h-8 text-black" />
                </motion.div>
                <div>
                  <span className="text-3xl font-heading font-black text-white block leading-none">MERAZ</span>
                  <span className="text-xs text-amber-400 font-mono tracking-wider">6.0 // Steampunk</span>
                </div>
              </Link>
              
              <p className="text-white/50 leading-relaxed mb-8 max-w-sm">
                Central India's largest techno-cultural festival. Where technology meets art, 
                and innovation dances with tradition under the gears of glory.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                Quick Links
              </h3>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Event Categories */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full" />
                Categories
              </h3>
              <ul className="space-y-4">
                {eventCategories.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-4">
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                Contact Us
              </h3>
              
              <div className="space-y-4">
                <a
                  href="mailto:meraz@iitbhilai.ac.in"
                  className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-white/40 text-xs font-mono uppercase tracking-wider">Email</span>
                    <p className="text-white group-hover:text-cyan-400 transition-colors text-sm">meraz@iitbhilai.ac.in</p>
                  </div>
                </a>
                
                <a
                  href="tel:+919407900542"
                  className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-amber-500/30 hover:bg-amber-500/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-white/40 text-xs font-mono uppercase tracking-wider">Phone</span>
                    <p className="text-white group-hover:text-amber-400 transition-colors text-sm">+91 94079 00542</p>
                  </div>
                </a>
                
                <div className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-white/40 text-xs font-mono uppercase tracking-wider">Venue</span>
                    <p className="text-white/70 text-sm">
                      IIT Bhilai, GEC Campus<br />
                      Sejbahar, Raipur - 492015
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Festival Dates Banner */}
          <div className="mt-16 p-6 bg-gradient-to-r from-cyan-500/10 via-amber-500/10 to-cyan-500/10 border border-white/10 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="text-center px-6 py-4 bg-black/30 rounded-xl">
                  <div className="text-4xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">
                    JAN 30 - FEB 1
                  </div>
                  <div className="text-white/50 font-mono text-sm mt-1">2025 • IIT Bhilai</div>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-white font-medium">3 Days of Non-Stop Action</p>
                  <p className="text-white/50 text-sm">100+ Events • 1000+ Participants • ₹5L+ Prize Pool</p>
                </div>
              </div>
              
              <Link 
                href="/passes"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-amber-500 text-black font-bold rounded-full hover:shadow-xl hover:shadow-cyan-500/30 transition-all"
              >
                Get Your Pass
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/30 text-sm text-center md:text-left flex items-center gap-1">
                © 2025 MERAZ - IIT Bhilai. Crafted with 
                <Heart className="w-4 h-4 text-red-500 fill-red-500" /> 
                by the Web Team
              </p>
              <div className="flex gap-6 text-sm text-white/30">
                <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-cyan-400 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function GearSVG() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white">
      <path d="M50 25c-1.4 0-2.7.1-4 .3V15h-9v12.5c-2.8 1.2-5.4 2.9-7.6 5l-8.8-8.8-6.4 6.4 8.8 8.8c-2.1 2.2-3.8 4.8-5 7.6H5v9h12.5c-.2 1.3-.3 2.6-.3 4s.1 2.7.3 4H5v9h12.5c1.2 2.8 2.9 5.4 5 7.6l-8.8 8.8 6.4 6.4 8.8-8.8c2.2 2.1 4.8 3.8 7.6 5V95h9V82.7c1.3.2 2.6.3 4 .3s2.7-.1 4-.3V95h9V82.5c2.8-1.2 5.4-2.9 7.6-5l8.8 8.8 6.4-6.4-8.8-8.8c2.1-2.2 3.8-4.8 5-7.6H95v-9H82.5c.2-1.3.3-2.6.3-4s-.1-2.7-.3-4H95v-9H82.5c-1.2-2.8-2.9-5.4-5-7.6l8.8-8.8-6.4-6.4-8.8 8.8c-2.2-2.1-4.8-3.8-7.6-5V15h-9v10.3c-1.3-.2-2.6-.3-4-.3zm0 12c7.2 0 13 5.8 13 13s-5.8 13-13 13-13-5.8-13-13 5.8-13 13-13z"/>
    </svg>
  );
}
