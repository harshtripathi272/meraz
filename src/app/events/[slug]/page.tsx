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
  Users,
  Trophy,
  Cog,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { events, categories } from "@/lib/data/events";
import { formatDate, formatTime, downloadICS } from "@/lib/utils";

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.slug as string;
  
  const event = events.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-[#030303] pt-28 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Cog className="w-12 h-12 text-white/20" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-white mb-4">Event Not Found</h1>
          <p className="text-white/50 mb-8">The event you&apos;re looking for doesn&apos;t exist.</p>
          <Link 
            href="/events" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-amber-500 text-black font-bold rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse All Events
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, { gradient: string; bg: string; text: string; border: string }> = {
      'sci-tech': { gradient: 'from-cyan-500 to-blue-500', bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
      'cultural': { gradient: 'from-purple-500 to-pink-500', bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
      'sports': { gradient: 'from-emerald-500 to-green-500', bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
      'e-cell': { gradient: 'from-amber-500 to-orange-500', bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
      'informal': { gradient: 'from-red-500 to-rose-500', bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
    };
    return colorMap[category] || colorMap['sci-tech'];
  };

  const colors = getCategoryColor(event.category);

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
          title: `${event.name} - MERAZ 6.0`,
          text: event.shortDescription,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Get related events (same category, excluding current)
  const relatedEvents = events
    .filter(e => e.category === event.category && e.id !== event.id)
    .slice(0, 3);

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
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <Link 
            href="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white/60 hover:text-white hover:border-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Events</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          {/* Category & Prize Badges */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${colors.bg} ${colors.text} ${colors.border} border backdrop-blur-sm`}>
              {event.category}
            </span>
            {event.prizePool && (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 backdrop-blur-sm">
                <Trophy className="w-4 h-4" />
                Prize Pool: {event.prizePool}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black mb-6">
            <span 
              className="text-transparent bg-clip-text"
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #fbbf24 50%, #00d4ff 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                animation: 'shimmer 4s ease-in-out infinite',
              }}
            >
              {event.name}
            </span>
          </h1>

          {/* Short description */}
          <p className="text-xl text-white/50 mb-8 max-w-3xl">
            {event.shortDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {event.tags.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1.5 rounded-lg text-sm bg-white/5 text-white/40 border border-white/5"
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
            className="lg:col-span-2 space-y-8"
          >
            {/* Hero image placeholder */}
            <div 
              className={`rounded-2xl h-72 md:h-96 relative overflow-hidden bg-gradient-to-br ${colors.gradient}/20`}
            >
              {/* Grid Pattern */}
              <div 
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '30px 30px'
                }}
              />
              
              {/* Decorative gear */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-10 right-10 w-40 h-40 opacity-10"
              >
                <GearSVG />
              </motion.div>
              
              {/* Category label */}
              <div className="absolute bottom-6 left-6">
                <div className={`px-6 py-3 rounded-xl ${colors.bg} ${colors.text} ${colors.border} border backdrop-blur-xl font-bold`}>
                  {event.category.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="p-8 bg-white/[0.02] border border-white/10 rounded-2xl">
              <h2 className="text-2xl font-heading font-bold text-white mb-5 flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-amber-500 rounded-full" />
                About This Event
              </h2>
              <p className="text-white/60 leading-relaxed text-lg">
                {event.fullDescription}
              </p>
            </div>

            {/* Rules/Guidelines */}
            <div className="p-8 bg-white/[0.02] border border-white/10 rounded-2xl">
              <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-cyan-500 rounded-full" />
                Event Guidelines
              </h2>
              <ul className="space-y-4">
                {[
                  "Registration is mandatory. Walk-ins may not be entertained.",
                  "Participants must carry valid college ID and MERAZ pass.",
                  "Decision of the judges/organizers will be final and binding.",
                  "Report to the venue 15 minutes before scheduled time.",
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-white/60">{rule}</span>
                  </li>
                ))}
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
            <div className="sticky top-28 p-6 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-6">Event Details</h3>
              
              <div className="space-y-5 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{formatDate(event.date)}</div>
                    <div className="text-white/40 text-sm">Date</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {formatTime(event.startTime)} - {formatTime(event.endTime)}
                    </div>
                    <div className="text-white/40 text-sm">Time</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{event.venue}</div>
                    <div className="text-white/40 text-sm">Venue</div>
                  </div>
                </div>
              </div>

              {/* Contact info */}
              <div className="border-t border-white/10 pt-6 mb-8">
                <h4 className="text-sm font-medium text-white/40 mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Event Coordinator
                </h4>
                <div className="space-y-3">
                  <div className="text-white font-medium">{event.contact.name}</div>
                  <a 
                    href={`tel:${event.contact.phone}`}
                    className="flex items-center gap-3 text-white/50 hover:text-cyan-400 transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    {event.contact.phone}
                  </a>
                  <a 
                    href={`mailto:${event.contact.email}`}
                    className="flex items-center gap-3 text-white/50 hover:text-cyan-400 transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    {event.contact.email}
                  </a>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <motion.a 
                  href={event.registerUrl}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-cyan-500 to-amber-500 text-black font-bold rounded-xl hover:shadow-xl hover:shadow-cyan-500/30 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Register Now
                </motion.a>
                
                <motion.button
                  onClick={handleAddToCalendar}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Add to Calendar
                </motion.button>
                
                <motion.button
                  onClick={handleShare}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-4 border border-white/10 text-white/60 rounded-xl hover:text-white hover:border-white/20 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  Share Event
                </motion.button>
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
            className="mt-20"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-heading font-bold text-white">
                More in <span className={colors.text}>{event.category}</span>
              </h2>
              <Link 
                href={`/events?category=${event.category}`}
                className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {relatedEvents.map((relatedEvent, index) => (
                <motion.div
                  key={relatedEvent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Link href={`/events/${relatedEvent.id}`}>
                    <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-white/20 hover:bg-white/[0.03] transition-all group">
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {relatedEvent.name}
                      </h3>
                      <p className="text-white/50 text-sm mb-4 line-clamp-2">
                        {relatedEvent.shortDescription}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-white/40">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(relatedEvent.date)}
                        </span>
                        {relatedEvent.prizePool && (
                          <span className="flex items-center gap-1 text-amber-400">
                            <Trophy className="w-3.5 h-3.5" />
                            {relatedEvent.prizePool}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function GearSVG() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white">
      <path d="M50 25c-1.4 0-2.7.1-4 .3V15h-9v12.5c-2.8 1.2-5.4 2.9-7.6 5l-8.8-8.8-6.4 6.4 8.8 8.8c-2.1 2.2-3.8 4.8-5 7.6H5v9h12.5c-.2 1.3-.3 2.6-.3 4s.1 2.7.3 4H5v9h12.5c1.2 2.8 2.9 5.4 5 7.6l-8.8 8.8 6.4 6.4 8.8-8.8c2.2 2.1 4.8 3.8 7.6 5V95h9V82.7c1.3.2 2.6.3 4 .3s2.7-.1 4-.3V95h9V82.5c2.8-1.2 5.4-2.9 7.6-5l8.8 8.8 6.4-6.4-8.8-8.8c2.1-2.2 3.8-4.8 5-7.6H95v-9H82.5c.2-1.3.3-2.6.3-4s-.1-2.7-.3-4H95v-9H82.5c-1.2-2.8-2.9-5.4-5-7.6l8.8-8.8-6.4-6.4-8.8 8.8c-2.2-2.1-4.8-3.8-7.6-5V15h-9v10.3c-1.3-.2-2.6-.3-4-.3zm0 12c7.2 0 13 5.8 13 13s-5.8 13-13 13-13-5.8-13-13 5.8-13 13-13z"/>
    </svg>
  );
}
