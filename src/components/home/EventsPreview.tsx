"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { events } from "@/lib/data/events";

const featuredEvents = events.slice(0, 4);

export default function EventsPreview() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4 tracking-tighter">
            HEADLINERS
          </h2>
          <p className="text-text-secondary max-w-md font-mono text-xs tracking-widest uppercase">
            Curated experiences for the forward thinking.
          </p>
        </div>
        
        <Link 
          href="/events" 
          className="group flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-indigo-500 transition-colors"
        >
          Full Lineup
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8">
        {featuredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="group cursor-pointer"
          >
            <Link href={`/events/${event.id}`} className="block">
              {/* Image Container with Reveal Effect */}
              <div className="relative aspect-[16/9] overflow-hidden bg-charcoal mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full h-full relative"
                >
                  {/* Grayscale to Color hover */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 will-change-transform grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                    style={{ backgroundImage: `url('/assets/images/placeholder-${index % 3}.jpg')` }} // Placeholder, user will replace
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 text-[0.6rem] font-mono uppercase tracking-widest text-white">
                      {event.category}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Text Content */}
              <div className="flex justify-between items-start border-t border-white/10 pt-4">
                <div>
                  <h3 className="text-2xl font-bold font-heading mb-1 group-hover:text-indigo-500 transition-colors">
                    {event.name}
                  </h3>
                  <p className="text-text-secondary text-sm max-w-xs line-clamp-2">
                    {event.shortDescription}
                  </p>
                </div>
                <div className="text-right">
                  <span className="block font-mono text-xs text-text-secondary mb-1">
                    {event.date}
                  </span>
                  <span className="block font-mono text-xs text-indigo-400">
                    {event.venue}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
