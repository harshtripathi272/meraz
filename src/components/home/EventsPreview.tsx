"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Trophy, Sparkles, Music, Code, Gamepad2, Mic2 } from "lucide-react";
import { events, type Event } from "@/lib/data/events";

const featuredEvents = (events as Event[]).slice(0, 6);

const categoryIcons: Record<string, any> = {
  'sci-tech': Code,
  'cultural': Music,
  'sports': Gamepad2,
  'e-cell': Mic2,
  'informal': Sparkles,
};

const categoryColors: Record<string, { gradient: string; glow: string; border: string }> = {
  'sci-tech': { gradient: 'from-cyan-500 to-blue-600', glow: 'shadow-cyan-500/30', border: 'border-cyan-500/30' },
  'cultural': { gradient: 'from-purple-500 to-pink-600', glow: 'shadow-purple-500/30', border: 'border-purple-500/30' },
  'sports': { gradient: 'from-emerald-500 to-green-600', glow: 'shadow-emerald-500/30', border: 'border-emerald-500/30' },
  'e-cell': { gradient: 'from-amber-500 to-orange-600', glow: 'shadow-amber-500/30', border: 'border-amber-500/30' },
  'informal': { gradient: 'from-red-500 to-rose-600', glow: 'shadow-red-500/30', border: 'border-red-500/30' },
};

export default function EventsPreview() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 text-sm font-mono tracking-wider uppercase">Featured</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-4">
              Spotlight <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Events</span>
            </h2>
            <p className="text-white/50 max-w-xl text-lg">
              Discover our most anticipated events — from intense hackathons to spectacular performances.
            </p>
          </div>

          <Link href="/events">
            <motion.button
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <span className="text-white font-medium">View All Events</span>
              <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event, index) => (
            <EventCard 
              key={event.id} 
              event={event} 
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Premium 3D Event Card
function EventCard({ event, index, isInView }: { 
  event: typeof featuredEvents[0]; 
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 30 });
  const brightness = useSpring(useTransform(mouseX, [-0.5, 0.5], [0.9, 1.1]), { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const catKey = (event.category ? String(event.category).toLowerCase() : 'sci-tech');
  const colors = categoryColors[catKey] ?? categoryColors['sci-tech'];
  const CategoryIcon = categoryIcons[catKey] ?? Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/events/${event.id}`}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
          className="relative h-full cursor-pointer"
        >
          {/* Glow effect */}
          <motion.div 
            className={`absolute -inset-1 rounded-3xl opacity-0 blur-xl transition-opacity duration-500 bg-gradient-to-r ${colors.gradient}`}
            animate={{ opacity: isHovered ? 0.3 : 0 }}
          />
          
          {/* Card */}
          <div className={`relative h-full bg-[#0a0a14]/90 backdrop-blur-xl border rounded-3xl overflow-hidden transition-all duration-300 ${
            isHovered ? `border-white/20 ${colors.glow} shadow-xl` : 'border-white/10'
          }`}>
            
            {/* Header with gradient */}
            <div className={`h-44 relative overflow-hidden bg-gradient-to-br ${colors.gradient}/20`}>
              {/* Grid pattern */}
              <div 
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
                  `,
                  backgroundSize: '25px 25px',
                }}
              />
              
              {/* Category badge */}
              <div className={`absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-xl border ${colors.border}`}>
                <CategoryIcon className="w-3.5 h-3.5 text-white/80" />
                <span className="text-xs text-white/80 font-medium capitalize">{event.category}</span>
              </div>
              
              {/* Prize badge */}
              {event.prizePool && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-xl border border-amber-500/30">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs text-amber-400 font-bold">{event.prizePool}</span>
                </div>
              )}
              
              {/* Decorative icon */}
              <div className="absolute bottom-4 right-4 opacity-10">
                <CategoryIcon className="w-24 h-24 text-white" />
              </div>
              
              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0a0a14] to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-cyan-400 transition-colors">
                {event.name}
              </h3>
              <p className="text-white/50 text-sm mb-5 line-clamp-2">
                {event.shortDescription}
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap gap-3 mb-5">
                <div className="flex items-center gap-1.5 text-xs text-white/40">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Jan 30 - Feb 1</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/40">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{event.venue}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {event.tags.slice(0, 3).map(tag => (
                  <span 
                    key={tag}
                    className="px-2.5 py-1 text-xs bg-white/5 text-white/40 rounded-lg border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Hover arrow */}
            <motion.div 
              className="absolute bottom-6 right-6"
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${colors.gradient} flex items-center justify-center`}>
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
