"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { 
  Calendar, 
  Users, 
  Mic2, 
  Trophy,
  Cog,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  Code,
  Music,
  Palette,
  Zap,
  Award
} from "lucide-react";

const stats = [
  { icon: Calendar, value: "100+", label: "Events", color: "cyan" },
  { icon: Users, value: "1000+", label: "Participants", color: "amber" },
  { icon: Mic2, value: "3", label: "Pro-Nights", color: "purple" },
  { icon: Trophy, value: "₹5L+", label: "Prize Pool", color: "emerald" },
];

const timeline = [
  { year: "2020", title: "MERAZ 1.0", description: "First edition launched virtually during pandemic" },
  { year: "2021", title: "MERAZ 2.0", description: "Hybrid format with limited on-campus events" },
  { year: "2022", title: "MERAZ 3.0", description: "Full in-person festival with 50+ events" },
  { year: "2023", title: "MERAZ 4.0", description: "Expanded to 75+ events, first Pro-Night concerts" },
  { year: "2024", title: "MERAZ 5.0", description: "100+ events, 1000+ participants, national recognition" },
  { year: "2025", title: "MERAZ 6.0", description: "Steampunk: Gears of Glory - Our most ambitious edition!" },
];

const themeHighlights = [
  { icon: Cog, title: "Steampunk Aesthetics", description: "Victorian elegance meets futuristic innovation" },
  { icon: Code, title: "Cutting-Edge Tech", description: "Hackathons, robotics, and AI competitions" },
  { icon: Music, title: "Cultural Fusion", description: "Pro-Nights with renowned artists" },
  { icon: Palette, title: "Creative Expression", description: "Art, design, and performance events" },
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-[#030303]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
          
          {/* Gradient Orbs */}
          <motion.div 
            style={{ y: heroY }}
            className="absolute -left-32 top-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[180px]" 
          />
          <motion.div 
            style={{ y: heroY }}
            className="absolute -right-32 bottom-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[150px]" 
          />
          
          {/* Decorative Gears */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 md:left-20 w-32 md:w-48 h-32 md:h-48 opacity-[0.04]"
          >
            <GearSVG />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-10 md:right-20 w-24 md:w-40 h-24 md:h-40 opacity-[0.04]"
          >
            <GearSVG />
          </motion.div>
        </div>
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-8"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-mono tracking-widest uppercase">IIT Bhilai's Pride</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </motion.div>
            
            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black mb-8">
              <span className="text-white">About </span>
              <span 
                className="text-transparent bg-clip-text"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #fbbf24 50%, #00d4ff 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  animation: 'shimmer 4s ease-in-out infinite',
                }}
              >
                MERAZ
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed">
              The pulsating heart of IIT Bhilai — where technology, art, and imagination 
              unite to create an unforgettable celebration of innovation and culture.
            </p>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1.5"
          >
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-3 bg-cyan-400 rounded-full" 
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Theme Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[200px]" />
        </div>
        
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
                <Cog className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 text-xs font-mono tracking-wider uppercase">Theme 2025</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-4">
                Steampunk:
              </h2>
              <h2 className="text-4xl md:text-5xl font-heading font-black mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                  Gears of Glory
                </span>
              </h2>
              
              <div className="space-y-6 text-white/60 text-lg leading-relaxed">
                <p>
                  MERAZ 6.0 embraces the timeless allure of Victorian-era invention fused with 
                  futuristic innovation — where imagination meets engineering in a world 
                  powered by steam, brass, and boundless creativity.
                </p>
                <p>
                  The theme celebrates the intricate harmony between tradition and technology — 
                  gears turning not just in machines, but in the minds of innovators striving 
                  for greatness. It's a tribute to visionaries who dare to dream beyond 
                  convention.
                </p>
              </div>
              
              <Link 
                href="/events"
                className="inline-flex items-center gap-3 mt-10 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold rounded-full hover:shadow-xl hover:shadow-cyan-500/30 transition-all group"
              >
                Explore Events
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Version Card */}
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-amber-500/30 rounded-3xl blur-xl opacity-50" />
                
                <div className="relative p-8 md:p-12 bg-[#0a0a12]/90 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden">
                  {/* Background pattern */}
                  <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                      backgroundSize: '30px 30px'
                    }}
                  />
                  
                  <div className="relative z-10 text-center">
                    <div 
                      className="text-9xl font-heading font-black mb-6"
                      style={{
                        background: 'linear-gradient(135deg, #00d4ff 0%, #fbbf24 50%, #00d4ff 100%)',
                        backgroundSize: '200% 200%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'shimmer 4s ease-in-out infinite',
                      }}
                    >
                      6.0
                    </div>
                    <p className="text-white/50 font-mono tracking-wider mb-8">
                      Our Most Ambitious Edition Yet
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-5 bg-black/40 rounded-2xl border border-white/5">
                        <Calendar className="w-7 h-7 mx-auto mb-3 text-cyan-400" />
                        <div className="text-white font-bold text-lg">Jan 30 - Feb 1</div>
                        <div className="text-white/40 text-sm">2025</div>
                      </div>
                      <div className="p-5 bg-black/40 rounded-2xl border border-white/5">
                        <Clock className="w-7 h-7 mx-auto mb-3 text-amber-400" />
                        <div className="text-white font-bold text-lg">3 Days</div>
                        <div className="text-white/40 text-sm">Non-Stop</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Theme Highlights */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-4">
              What Makes Us <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">Special</span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {themeHighlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-8 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-amber-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/50">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[200px]" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">Our Journey</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              From a virtual beginning to Central India's largest fest — watch us grow
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-amber-500 to-cyan-500" />
            
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ml-12 md:ml-0 ${
                  index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                }`}>
                  <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-white/20 transition-colors">
                    <div className="text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400 mb-2">
                      {item.year}
                    </div>
                    <div className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </div>
                    <p className="text-white/50">
                      {item.description}
                    </p>
                  </div>
                </div>
                
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-amber-400 -translate-x-1/2 shadow-lg shadow-cyan-500/50">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-amber-400 animate-ping opacity-25" />
                </div>
                
                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-amber-500/10 rounded-3xl blur-3xl opacity-30" />
            
            <div className="relative p-8 md:p-12 bg-white/[0.02] border border-white/10 rounded-3xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h2 className="text-3xl font-heading font-black text-white">Find Us</h2>
                  </div>
                  
                  <div className="space-y-6 text-white/60">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">IIT Bhilai</h3>
                      <p>GEC Campus, Sejbahar<br />Raipur, Chhattisgarh - 492015</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-black/30 rounded-xl">
                        <p className="text-cyan-400 font-medium text-sm mb-1">Nearest Airport</p>
                        <p className="text-white/50 text-sm">Swami Vivekananda Airport (RAI) - 25km</p>
                      </div>
                      <div className="p-4 bg-black/30 rounded-xl">
                        <p className="text-amber-400 font-medium text-sm mb-1">Nearest Railway</p>
                        <p className="text-white/50 text-sm">Raipur Junction - 20km</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-white/40">
                      * Shuttle services available from airport and railway station during the fest.
                    </p>
                  </div>
                </div>
                
                {/* Map Placeholder */}
                <div className="h-72 md:h-80 rounded-2xl overflow-hidden bg-[#0a0a12] border border-white/10 relative">
                  <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                      backgroundSize: '30px 30px'
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <MapPin className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                      </motion.div>
                      <p className="text-white/40 font-mono text-sm">Interactive map coming soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-6">
              Ready to Experience the 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400"> Glory?</span>
            </h2>
            <p className="text-white/50 text-xl mb-10 max-w-2xl mx-auto">
              Join us for three days of innovation, celebration, and unforgettable memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/passes" 
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-amber-500 text-black font-bold text-lg rounded-full hover:shadow-xl hover:shadow-cyan-500/30 transition-all"
              >
                <Award className="w-5 h-5" />
                Get Your Pass
              </Link>
              <Link 
                href="/events" 
                className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/20 text-white font-bold text-lg rounded-full hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
              >
                <Zap className="w-5 h-5" />
                Browse Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Stat Card Component
function StatCard({ stat, index }: { stat: typeof stats[0], index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const colorMap: Record<string, string> = {
    cyan: 'from-cyan-500 to-cyan-400',
    amber: 'from-amber-500 to-amber-400',
    purple: 'from-purple-500 to-purple-400',
    emerald: 'from-emerald-500 to-emerald-400',
  };
  
  const glowMap: Record<string, string> = {
    cyan: 'shadow-cyan-500/30',
    amber: 'shadow-amber-500/30',
    purple: 'shadow-purple-500/30',
    emerald: 'shadow-emerald-500/30',
  };
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative p-8 bg-white/[0.02] border border-white/10 rounded-2xl text-center group hover:border-white/20 transition-all hover:shadow-xl ${glowMap[stat.color]}`}
    >
      <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${colorMap[stat.color]} flex items-center justify-center shadow-lg ${glowMap[stat.color]} group-hover:scale-110 transition-transform`}>
        <stat.icon className="w-8 h-8 text-black" />
      </div>
      <div className={`text-5xl font-heading font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r ${colorMap[stat.color]}`}>
        {stat.value}
      </div>
      <div className="text-white/40 text-sm uppercase tracking-wider font-mono">
        {stat.label}
      </div>
    </motion.div>
  );
}

function GearSVG() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white">
      <path d="M50 25c-1.4 0-2.7.1-4 .3V15h-9v12.5c-2.8 1.2-5.4 2.9-7.6 5l-8.8-8.8-6.4 6.4 8.8 8.8c-2.1 2.2-3.8 4.8-5 7.6H5v9h12.5c-.2 1.3-.3 2.6-.3 4s.1 2.7.3 4H5v9h12.5c1.2 2.8 2.9 5.4 5 7.6l-8.8 8.8 6.4 6.4 8.8-8.8c2.2 2.1 4.8 3.8 7.6 5V95h9V82.7c1.3.2 2.6.3 4 .3s2.7-.1 4-.3V95h9V82.5c2.8-1.2 5.4-2.9 7.6-5l8.8 8.8 6.4-6.4-8.8-8.8c2.1-2.2 3.8-4.8 5-7.6H95v-9H82.5c.2-1.3.3-2.6.3-4s-.1-2.7-.3-4H95v-9H82.5c-1.2-2.8-2.9-5.4-5-7.6l8.8-8.8-6.4-6.4-8.8 8.8c-2.2-2.1-4.8-3.8-7.6-5V15h-9v10.3c-1.3-.2-2.6-.3-4-.3zm0 12c7.2 0 13 5.8 13 13s-5.8 13-13 13-13-5.8-13-13 5.8-13 13-13z"/>
    </svg>
  );
}
