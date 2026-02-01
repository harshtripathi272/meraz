"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { events, categories } from "@/lib/data/events";
import { formatDate } from "@/lib/utils";

// Show featured events (first 6)
const featuredEvents = events.slice(0, 6);

export default function EventsPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || "neon-magenta";
  };

  return (
    <section ref={ref} className="section relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-neon-teal/5 rounded-full blur-3xl" />
      <div className="absolute left-1/4 bottom-0 w-96 h-96 bg-neon-magenta/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="section-title">Featured Events</h2>
          <p className="section-subtitle">
            From hackathons to dance battles, robotics to fashion shows — 
            find your stage and showcase your talent.
          </p>
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.slice(1, 6).map((category) => (
            <Link
              key={category.id}
              href={`/events?category=${category.id}`}
              className="px-4 py-2 rounded-full text-sm font-medium border transition-all hover:scale-105"
              style={{
                borderColor: `var(--${category.color})`,
                color: `var(--${category.color})`,
              }}
            >
              {category.name}
            </Link>
          ))}
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <Link href={`/events/${event.id}`}>
                <div className="glass-card group cursor-pointer h-full overflow-hidden hover:border-neon-magenta/30 transition-all duration-300">
                  {/* Image placeholder with gradient */}
                  <div 
                    className="h-40 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, var(--${getCategoryColor(event.category)})/20, var(--surface-dark))`,
                    }}
                  >
                    {/* Category badge */}
                    <span 
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                      style={{
                        backgroundColor: `var(--${getCategoryColor(event.category)})/20`,
                        color: `var(--${getCategoryColor(event.category)})`,
                        border: `1px solid var(--${getCategoryColor(event.category)})/30`,
                      }}
                    >
                      {event.category}
                    </span>
                    
                    {/* Prize badge */}
                    {event.prizePool && (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-amber-glow/20 text-amber-glow border border-amber-glow/30">
                        {event.prizePool}
                      </span>
                    )}
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent" />
                    
                    {/* Animated tribal pattern */}
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
                      <div 
                        className="absolute inset-0 tribal-pattern"
                        style={{ transform: "scale(0.5)" }}
                      />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-neon-teal transition-colors">
                      {event.name}
                    </h3>
                    <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                      {event.shortDescription}
                    </p>
                    
                    {/* Meta info */}
                    <div className="flex flex-wrap gap-3 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(event.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {event.venue}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Link 
            href="/events"
            className="btn-neon inline-flex items-center gap-2"
          >
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
