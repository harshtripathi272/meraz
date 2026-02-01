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
  Sparkles 
} from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/meraz_iitbhilai", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/meraz_iitbhilai", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com/@meraz_iitbhilai", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com/company/meraz-iitbhilai", label: "LinkedIn" },
];

const quickLinks = [
  { href: "/about", label: "About Meraz" },
  { href: "/events", label: "Events" },
  { href: "/passes", label: "Get Passes" },
  { href: "/gallery", label: "Gallery" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/team", label: "Team" },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Tribal Pattern Background */}
      <div className="absolute inset-0 tribal-pattern opacity-30" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-darker via-primary-dark to-transparent" />
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-magenta to-neon-teal flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-primary-dark" />
                </div>
                <div>
                  <span className="text-2xl font-bold neon-text-gradient block">MERAZ</span>
                  <span className="text-xs text-amber-glow">Neon Tribal Pulse</span>
                </div>
              </Link>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                The annual techno-cultural festival of IIT Bhilai. Where technology meets art, 
                and innovation dances with tradition under neon lights.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg glass flex items-center justify-center text-text-secondary hover:text-neon-teal hover:border-neon-teal transition-colors"
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text-secondary hover:text-neon-magenta transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-magenta opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:meraz@iitbhilai.ac.in"
                    className="flex items-start gap-3 text-text-secondary hover:text-neon-teal transition-colors text-sm"
                  >
                    <Mail size={18} className="mt-0.5 flex-shrink-0" />
                    <span>meraz@iitbhilai.ac.in</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+919407900542"
                    className="flex items-start gap-3 text-text-secondary hover:text-neon-teal transition-colors text-sm"
                  >
                    <Phone size={18} className="mt-0.5 flex-shrink-0" />
                    <span>+91 94079 00542</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-text-secondary text-sm">
                    <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                    <span>
                      IIT Bhilai, GEC Campus,<br />
                      Sejbahar, Raipur,<br />
                      Chhattisgarh - 492015
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Festival Dates */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-6">Festival Dates</h3>
              <div className="glass-card p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold neon-text-gradient mb-1">15 - 17</div>
                  <div className="text-amber-glow font-medium">February 2026</div>
                  <div className="text-text-muted text-xs mt-2">3 Days of Pure Energy</div>
                </div>
                <div className="mt-4 pt-4 border-t border-glass-border">
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <div className="text-neon-magenta font-bold text-lg">100+</div>
                      <div className="text-text-muted">Events</div>
                    </div>
                    <div>
                      <div className="text-neon-teal font-bold text-lg">1K+</div>
                      <div className="text-text-muted">Participants</div>
                    </div>
                    <div>
                      <div className="text-amber-glow font-bold text-lg">50+</div>
                      <div className="text-text-muted">Colleges</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-glass-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-text-muted text-sm text-center md:text-left">
                © 2026 Meraz - IIT Bhilai. Crafted with 💜 by the Web Team.
              </p>
              <div className="flex gap-6 text-sm text-text-muted">
                <Link href="/privacy" className="hover:text-neon-teal transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-neon-teal transition-colors">
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
