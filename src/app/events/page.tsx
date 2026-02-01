"use client";

import { useState, useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Search, Calendar, MapPin, Filter, ArrowRight, Sparkles, Cog, Trophy, Users, X } from "lucide-react";
import { events, categories } from "@/lib/data/events";
import { formatDate } from "@/lib/utils";

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState("all");

  // Get unique dates
  const uniqueDates = useMemo(() => {
    const dates = [...new Set(events.map(e => e.date))];
    return dates.sort();
  }, []);

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
      const matchesDate = selectedDate === "all" || event.date === selectedDate;
      
      return matchesSearch && matchesCategory && matchesDate;
    });
  }, [searchQuery, selectedCategory, selectedDate]);

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, { gradient: string; glow: string; text: string }> = {
      'sci-tech': { gradient: 'from-cyan-500 to-blue-500', glow: 'shadow-cyan-500/30', text: 'text-cyan-400' },
      'cultural': { gradient: 'from-purple-500 to-pink-500', glow: 'shadow-purple-500/30', text: 'text-purple-400' },
      'sports': { gradient: 'from-emerald-500 to-green-500', glow: 'shadow-emerald-500/30', text: 'text-emerald-400' },
      'e-cell': { gradient: 'from-amber-500 to-orange-500', glow: 'shadow-amber-500/30', text: 'text-amber-400' },
      'informal': { gradient: 'from-red-500 to-rose-500', glow: 'shadow-red-500/30', text: 'text-red-400' },
    };
    return colorMap[category] || colorMap['sci-tech'];
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedDate !== "all" || searchQuery;

  return (
    <div className="min-h-screen bg-[#030303] pt-28 pb-20">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 opacity-[0.02]"
        >
          <GearSVG />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-60 h-60 opacity-[0.02]"
        >
          <GearSVG />
        </motion.div>
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-mono tracking-widest uppercase">Discover</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-black mb-6">
            <span className="text-white">All </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400">
              Events
            </span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            From hackathons to dance battles, robotics to fashion shows — 
            discover {events.length}+ events and find your stage.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative group">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 to-amber-500 rounded-xl opacity-0 group-focus-within:opacity-100 blur-sm transition-opacity" />
                <div className="relative flex items-center bg-[#0a0a12] border border-white/10 rounded-xl group-focus-within:border-transparent overflow-hidden">
                  <Search className="absolute left-4 w-5 h-5 text-white/30" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search events, keywords..."
                    className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder:text-white/30 focus:outline-none"
                  />
                </div>
              </div>

              {/* Category filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none z-10" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-12 pr-8 py-4 rounded-xl bg-[#0a0a12] border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none cursor-pointer min-w-[180px]"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Date filter */}
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none z-10" />
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="pl-12 pr-8 py-4 rounded-xl bg-[#0a0a12] border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none cursor-pointer min-w-[180px]"
                >
                  <option value="all">All Dates</option>
                  {uniqueDates.map(date => (
                    <option key={date} value={date}>{formatDate(date)}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active filters */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex flex-wrap items-center gap-3 mt-5 pt-5 border-t border-white/5"
              >
                <span className="text-white/40 text-sm">Active:</span>
                
                {searchQuery && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    &quot;{searchQuery}&quot;
                    <button onClick={() => setSearchQuery("")} className="hover:text-white transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory("all")} className="hover:text-white transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                
                {selectedDate !== "all" && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    {formatDate(selectedDate)}
                    <button onClick={() => setSelectedDate("all")} className="hover:text-white transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedDate("all");
                  }}
                  className="text-white/40 hover:text-white text-xs underline transition-colors"
                >
                  Clear all
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between mb-8"
        >
          <p className="text-white/40 text-sm font-mono">
            Showing <span className="text-white">{filteredEvents.length}</span> of {events.length} events
          </p>
        </motion.div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard 
                key={event.id} 
                event={event} 
                index={index}
                colorInfo={getCategoryColor(event.category)}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Search className="w-10 h-10 text-white/20" />
            </div>
            <p className="text-white/50 text-lg mb-6">No events found matching your filters.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedDate("all");
              }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-amber-500 text-black font-bold rounded-full hover:shadow-xl hover:shadow-cyan-500/30 transition-all"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Event Card Component with 3D tilt
function EventCard({ event, index, colorInfo }: { 
  event: typeof events[0]; 
  index: number;
  colorInfo: { gradient: string; glow: string; text: string };
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/events/${event.id}`}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ 
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
          whileHover={{ scale: 1.02 }}
          className={`relative cursor-pointer h-full bg-[#0a0a12] border border-white/10 rounded-2xl overflow-hidden group hover:border-white/20 transition-all hover:shadow-xl ${colorInfo.glow}`}
        >
          {/* Image/Gradient Header */}
          <div 
            className={`h-52 relative overflow-hidden bg-gradient-to-br ${colorInfo.gradient}/20`}
          >
            {/* Decorative pattern */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}
            />
            
            {/* Rotating gear accent */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-10 -right-10 w-32 h-32 opacity-10"
            >
              <GearSVG />
            </motion.div>
            
            {/* Category badge */}
            <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md bg-black/30 border border-white/10 ${colorInfo.text}`}>
              {event.category}
            </span>
            
            {/* Prize badge */}
            {event.prizePool && (
              <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 backdrop-blur-md">
                <Trophy className="w-3 h-3" />
                {event.prizePool}
              </span>
            )}
            
            {/* Bottom gradient */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a12] to-transparent" />
          </div>
          
          {/* Content */}
          <div className="p-6">
            <h3 className={`text-xl font-bold text-white mb-3 group-hover:${colorInfo.text.split(' ')[0].replace('text', 'text')} transition-colors`}>
              {event.name}
            </h3>
            <p className="text-white/50 text-sm mb-5 line-clamp-2">
              {event.shortDescription}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {event.tags.slice(0, 3).map(tag => (
                <span 
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-xs bg-white/5 text-white/40 border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Meta info */}
            <div className="flex flex-wrap gap-4 text-xs text-white/40 mb-5">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(event.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {event.venue}
              </span>
            </div>
            
            {/* CTA */}
            <div className={`flex items-center gap-2 ${colorInfo.text} text-sm font-medium group-hover:gap-3 transition-all`}>
              <span>View Details</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      </Link>
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
