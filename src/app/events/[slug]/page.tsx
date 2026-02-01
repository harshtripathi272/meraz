"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Download,
  ExternalLink,
  Share2,
  Users
} from "lucide-react";
import { events, categories } from "@/lib/data/events";
import { formatDate, formatTime, downloadICS } from "@/lib/utils";

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.slug as string;
  
  const event = events.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text-primary mb-4">Event Not Found</h1>
          <p className="text-text-secondary mb-8">The event you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/events" className="btn-primary">
            Browse All Events
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || "neon-magenta";
  };

  const handleAddToCalendar = () => {
    downloadICS({
      name: event.name,
      description: event.fullDescription,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      venue: event.venue,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${event.name} - Meraz 6.0`,
          text: event.shortDescription,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Get related events (same category, excluding current)
  const relatedEvents = events
    .filter(e => e.category === event.category && e.id !== event.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            href="/events"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-neon-teal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Events</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* Category & Prize */}
          <div className="flex flex-wrap gap-3 mb-4">
            <span 
              className="px-4 py-1.5 rounded-full text-sm font-medium"
              style={{
                backgroundColor: `var(--${getCategoryColor(event.category)})/20`,
                color: `var(--${getCategoryColor(event.category)})`,
                border: `1px solid var(--${getCategoryColor(event.category)})/30`,
              }}
            >
              {event.category}
            </span>
            {event.prizePool && (
              <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-amber-glow/20 text-amber-glow border border-amber-glow/30">
                Prize Pool: {event.prizePool}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="neon-text-gradient">{event.name}</span>
          </h1>

          {/* Short description */}
          <p className="text-xl text-text-secondary mb-6">
            {event.shortDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {event.tags.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 rounded-lg text-sm bg-surface-light text-text-muted"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Event details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            {/* Hero image placeholder */}
            <div 
              className="rounded-2xl h-64 md:h-80 mb-8 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, var(--${getCategoryColor(event.category)})/30, var(--surface-dark))`,
              }}
            >
              <div className="absolute inset-0 tribal-pattern opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 opacity-50"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon
                      points="50,10 90,90 10,90"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-text-primary"
                    />
                  </svg>
                </motion.div>
              </div>
            </div>

            {/* Description */}
            <div className="glass-card p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">About This Event</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-text-secondary leading-relaxed">
                  {event.fullDescription}
                </p>
              </div>
            </div>

            {/* Rules/Guidelines placeholder */}
            <div className="glass-card p-6 md:p-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">Event Guidelines</h2>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-neon-magenta mt-2 flex-shrink-0" />
                  <span>Registration is mandatory. Walk-ins may not be entertained.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-neon-teal mt-2 flex-shrink-0" />
                  <span>Participants must carry valid college ID and Meraz pass.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-glow mt-2 flex-shrink-0" />
                  <span>Decision of the judges/organizers will be final and binding.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-tribal-gold mt-2 flex-shrink-0" />
                  <span>Report to the venue 15 minutes before scheduled time.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right: Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Quick Info Card */}
            <div className="glass-card p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Event Details</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-neon-magenta mt-0.5" />
                  <div>
                    <div className="text-text-primary font-medium">{formatDate(event.date)}</div>
                    <div className="text-text-muted text-sm">Date</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-neon-teal mt-0.5" />
                  <div>
                    <div className="text-text-primary font-medium">
                      {formatTime(event.startTime)} - {formatTime(event.endTime)}
                    </div>
                    <div className="text-text-muted text-sm">Time</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-glow mt-0.5" />
                  <div>
                    <div className="text-text-primary font-medium">{event.venue}</div>
                    <div className="text-text-muted text-sm">Venue</div>
                  </div>
                </div>
              </div>

              {/* Contact info */}
              <div className="border-t border-glass-border pt-4 mb-6">
                <h4 className="text-sm font-medium text-text-muted mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Event Coordinator
                </h4>
                <div className="space-y-2">
                  <div className="text-text-primary font-medium">{event.contact.name}</div>
                  <a 
                    href={`tel:${event.contact.phone}`}
                    className="flex items-center gap-2 text-text-secondary hover:text-neon-teal transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    {event.contact.phone}
                  </a>
                  <a 
                    href={`mailto:${event.contact.email}`}
                    className="flex items-center gap-2 text-text-secondary hover:text-neon-teal transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    {event.contact.email}
                  </a>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <a 
                  href={event.registerUrl}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Register Now
                </a>
                
                <button
                  onClick={handleAddToCalendar}
                  className="btn-neon w-full flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Add to Calendar
                </button>
                
                <button
                  onClick={handleShare}
                  className="w-full py-3 rounded-lg border border-glass-border text-text-secondary hover:text-text-primary hover:border-neon-teal transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share Event
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              More in {event.category}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedEvents.map((relatedEvent) => (
                <Link key={relatedEvent.id} href={`/events/${relatedEvent.id}`}>
                  <div className="glass-card p-5 hover:border-neon-magenta/30 transition-all group">
                    <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-neon-teal transition-colors">
                      {relatedEvent.name}
                    </h3>
                    <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                      {relatedEvent.shortDescription}
                    </p>
                    <div className="text-xs text-text-muted flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(relatedEvent.date)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
