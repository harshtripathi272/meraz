"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Trophy, Calendar, MapPin } from "lucide-react";

// Hardcoded featured events from MERAZ_CONTENT_OVERVIEW.md
const featuredEvents = [
  {
    id: "algo-clash",
    name: "AlgoClash",
    category: "Technical",
    date: "Jan 31 | 2:30 PM",
    venue: "L 104",
    image: "/assets/images/tech.png",
    pool: "₹50,000"
  },
  {
    id: "meraz-hackathon",
    name: "Meraz Hackathon",
    category: "Technical",
    date: "Jan 30-31 | 10:00 AM",
    venue: "Auditorium",
    image: "/assets/images/tech.png",
    pool: "₹2,00,000"
  },
  {
    id: "robowars",
    name: "RoboWars",
    category: "Technical",
    date: "Jan 31 | 9:00 AM",
    venue: "Tech Arena",
    image: "/assets/images/cyberpunk.png",
    pool: "₹1,50,000"
  },
  {
    id: "cult-nite",
    name: "Cult Nite",
    category: "Cultural",
    date: "Feb 1 | 6:00 PM",
    venue: "OAT",
    image: "/assets/images/cultural.png",
    pool: "Mega Event"
  },
  {
    id: "reverb",
    name: "Reverb",
    category: "Cultural",
    date: "Jan 31",
    venue: "Main Stage",
    image: "/assets/images/marble.png",
    pool: "₹35,000"
  },
  {
    id: "xpressions",
    name: "Xpressions",
    category: "Cultural",
    date: "Jan 31",
    venue: "Main Stage",
    image: "/assets/images/slab.png",
    pool: "₹40,000"
  }
];

export default function EventsPreview() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4 tracking-tighter text-white">
            HEADLINERS
          </h2>
          <p className="text-amber-500/80 max-w-md font-mono text-xs tracking-widest uppercase">
            Top events from the 100+ lineup.
          </p>
        </div>
        
        <Link 
          href="/events" 
          className="group flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-cyan-400 transition-colors"
        >
          View All Events
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.6 }}
            className="group cursor-pointer"
          >
            <Link href={`/events/${event.id}`} className="block h-full border border-white/5 bg-white/5 hover:border-cyan-500/30 hover:bg-white/10 transition-all rounded-xl overflow-hidden shadow-2xl hover:shadow-cyan-900/20">
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden bg-black/50">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full h-full relative"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 grayscale group-hover:grayscale-0 contrast-125 opacity-70 group-hover:opacity-100"
                    style={{ 
                      backgroundImage: `url('${event.image}')` 
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  
                  {/* Category Tag */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-[0.6rem] font-mono uppercase tracking-widest border backdrop-blur-md rounded-sm ${
                      event.category === 'Technical' 
                        ? 'bg-cyan-900/50 border-cyan-500/30 text-cyan-200' 
                        : 'bg-amber-900/50 border-amber-500/30 text-amber-200'
                    }`}>
                      {event.category}
                    </span>
                  </div>
                </motion.div>
                
                {/* Prize Pool Badge */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-black/80 border border-white/10 rounded-full">
                  <Trophy className="w-3 h-3 text-amber-400" />
                  <span className="text-[0.6rem] font-bold text-white tracking-wider">{event.pool}</span>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-5 flex flex-col gap-3">
                <h3 className="text-xl font-bold font-heading group-hover:text-cyan-400 transition-colors leading-none">
                  {event.name}
                </h3>
                
                <div className="flex flex-col gap-2 mt-auto">
                   <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
                     <Calendar className="w-3 h-3" />
                     {event.date}
                   </div>
                   <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
                     <MapPin className="w-3 h-3" />
                     {event.venue}
                   </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
