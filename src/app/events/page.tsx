"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Calendar, MapPin, Filter, ArrowRight } from "lucide-react";
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
    const cat = categories.find(c => c.id === category);
    return cat?.color || "neon-magenta";
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="neon-text-gradient">Events</span>
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            From hackathons to dance battles, robotics to fashion shows — 
            discover {events.length}+ events and find your stage.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-4 md:p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events, keywords..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface-dark border border-glass-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-neon-magenta transition-colors"
              />
            </div>

            {/* Category filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-12 pr-8 py-3 rounded-xl bg-surface-dark border border-glass-border text-text-primary focus:outline-none focus:border-neon-magenta transition-colors appearance-none cursor-pointer min-w-[180px]"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Date filter */}
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-12 pr-8 py-3 rounded-xl bg-surface-dark border border-glass-border text-text-primary focus:outline-none focus:border-neon-magenta transition-colors appearance-none cursor-pointer min-w-[180px]"
              >
                <option value="all">All Dates</option>
                {uniqueDates.map(date => (
                  <option key={date} value={date}>{formatDate(date)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active filters */}
          {(selectedCategory !== "all" || selectedDate !== "all" || searchQuery) && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-glass-border">
              <span className="text-text-muted text-sm">Active filters:</span>
              {searchQuery && (
                <span className="px-3 py-1 rounded-full text-xs bg-neon-magenta/20 text-neon-magenta border border-neon-magenta/30">
                  Search: &quot;{searchQuery}&quot;
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="px-3 py-1 rounded-full text-xs bg-neon-teal/20 text-neon-teal border border-neon-teal/30">
                  {selectedCategory}
                </span>
              )}
              {selectedDate !== "all" && (
                <span className="px-3 py-1 rounded-full text-xs bg-amber-glow/20 text-amber-glow border border-amber-glow/30">
                  {formatDate(selectedDate)}
                </span>
              )}
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedDate("all");
                }}
                className="px-3 py-1 rounded-full text-xs text-text-muted hover:text-text-primary transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </motion.div>

        {/* Results count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-text-muted text-sm mb-6"
        >
          Showing {filteredEvents.length} of {events.length} events
        </motion.p>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={`/events/${event.id}`}>
                  <div className="glass-card group cursor-pointer h-full overflow-hidden hover:border-neon-magenta/30 transition-all duration-300">
                    {/* Image placeholder */}
                    <div 
                      className="h-48 relative overflow-hidden"
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
                      
                      {/* Tribal pattern */}
                      <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
                        <div className="absolute inset-0 tribal-pattern" style={{ transform: "scale(0.5)" }} />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-neon-teal transition-colors">
                        {event.name}
                      </h3>
                      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                        {event.shortDescription}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.tags.slice(0, 3).map(tag => (
                          <span 
                            key={tag}
                            className="px-2 py-0.5 rounded text-xs bg-surface-light text-text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Meta info */}
                      <div className="flex flex-wrap gap-4 text-xs text-text-muted mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(event.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {event.venue}
                        </span>
                      </div>
                      
                      {/* CTA */}
                      <div className="flex items-center gap-2 text-neon-magenta text-sm font-medium group-hover:gap-3 transition-all">
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-text-muted text-lg mb-4">No events found matching your filters.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedDate("all");
              }}
              className="btn-neon"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
