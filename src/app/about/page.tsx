"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { 
  Calendar, 
  Users, 
  Mic2, 
  Trophy,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock
} from "lucide-react";

const stats = [
  { icon: Calendar, value: "100+", label: "Events", color: "neon-magenta" },
  { icon: Users, value: "1000+", label: "Participants", color: "neon-teal" },
  { icon: Mic2, value: "3", label: "Pro-Nights", color: "amber-glow" },
  { icon: Trophy, value: "₹10L+", label: "Prize Pool", color: "tribal-gold" },
];

const timeline = [
  { year: "2021", title: "Meraz 1.0", description: "First edition launched virtually during pandemic" },
  { year: "2022", title: "Meraz 2.0", description: "Hybrid format with limited on-campus events" },
  { year: "2023", title: "Meraz 3.0", description: "Full in-person festival with 50+ events" },
  { year: "2024", title: "Meraz 4.0", description: "Expanded to 75+ events, first Pro-Night concerts" },
  { year: "2025", title: "Meraz 5.0", description: "100+ events, 1000+ participants, national recognition" },
  { year: "2026", title: "Meraz 6.0", description: "Neon Tribal Pulse - Our most ambitious edition yet!" },
];

export default function AboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 tribal-pattern opacity-20" />
        <div className="absolute left-0 top-0 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl" />
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-neon-teal/10 rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-amber-glow" />
              <span className="text-amber-glow text-sm font-medium tracking-widest uppercase">
                IIT Bhilai&apos;s Pride
              </span>
              <Sparkles className="w-5 h-5 text-amber-glow" />
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="neon-text-gradient">About Meraz</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              The pulsating heart of IIT Bhilai — where technology, art, and imagination 
              unite to create an unforgettable celebration of innovation and culture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="glass-card p-6 text-center group hover:border-neon-magenta/30 transition-all"
              >
                <stat.icon 
                  className="w-10 h-10 mx-auto mb-4 transition-transform group-hover:scale-110"
                  style={{ color: `var(--${stat.color})` }}
                />
                <div 
                  className="text-4xl font-bold mb-1"
                  style={{ color: `var(--${stat.color})` }}
                >
                  {stat.value}
                </div>
                <div className="text-text-muted text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Theme Section */}
      <section ref={ref} className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                This Year&apos;s Theme:
                <br />
                <span className="tribal-text">Neon Tribal Pulse</span>
              </h2>
              
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Meraz 6.0 embraces the timeless allure of tribal mysticism fused with 
                  futuristic neon energy — where imagination meets innovation in a world 
                  powered by ancient wisdom and electric ambition.
                </p>
                <p>
                  The theme celebrates the intricate harmony between tradition and technology — 
                  glyphs glowing not just in caves, but in the hearts of innovators striving 
                  for creation. It&apos;s a tribute to visionaries who dare to dream beyond 
                  convention, fusing the elegance of ancestral patterns with the pulse of 
                  tomorrow&apos;s design.
                </p>
                <p>
                  As the neon lights ignite and tribal drums echo, witness creativity, 
                  technology, and passion intertwine to craft a spectacle of pure brilliance 
                  and boundless possibility.
                </p>
              </div>
              
              <Link 
                href="/events"
                className="inline-flex items-center gap-2 mt-8 text-neon-teal hover:text-neon-magenta transition-colors group"
              >
                <span className="font-medium">Explore Events</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-card p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-magenta/10 to-neon-teal/10" />
                <div className="absolute inset-0 tribal-pattern opacity-30" />
                
                <div className="relative z-10">
                  <div className="text-8xl font-black neon-text-gradient mb-4 text-center">
                    6.0
                  </div>
                  <p className="text-center text-text-secondary">
                    Our Most Ambitious Edition Yet
                  </p>
                  
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-xl bg-surface-dark/50">
                      <Calendar className="w-6 h-6 mx-auto mb-2 text-neon-magenta" />
                      <div className="text-text-primary font-medium">Feb 15-17</div>
                      <div className="text-text-muted text-xs">2026</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-surface-dark/50">
                      <Clock className="w-6 h-6 mx-auto mb-2 text-neon-teal" />
                      <div className="text-text-primary font-medium">3 Days</div>
                      <div className="text-text-muted text-xs">Non-Stop</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            <span className="neon-text-gradient">Our Journey</span>
          </motion.h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-magenta via-neon-teal to-amber-glow" />
            
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ml-16 md:ml-0 ${
                  index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                }`}>
                  <div className="glass-card p-5">
                    <div className="text-2xl font-bold neon-text-gradient mb-1">
                      {item.year}
                    </div>
                    <div className="text-lg font-semibold text-text-primary mb-2">
                      {item.title}
                    </div>
                    <p className="text-text-secondary text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
                
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-neon-magenta -translate-x-1/2 shadow-lg shadow-neon-magenta/50" />
                
                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-4">
                  <MapPin className="inline-block w-8 h-8 text-neon-magenta mr-2" />
                  Find Us
                </h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    <strong className="text-text-primary">IIT Bhilai</strong><br />
                    GEC Campus, Sejbahar<br />
                    Raipur, Chhattisgarh - 492015
                  </p>
                  <p>
                    <strong className="text-neon-teal">Nearest Airport:</strong><br />
                    Swami Vivekananda Airport, Raipur (RAI) - 25 km
                  </p>
                  <p>
                    <strong className="text-neon-teal">Nearest Railway Station:</strong><br />
                    Raipur Junction (R) - 20 km
                  </p>
                  <p className="text-sm">
                    * Shuttle services will be available from airport and railway station during the fest.
                  </p>
                </div>
              </div>
              
              <div className="h-64 md:h-80 rounded-xl overflow-hidden bg-surface-dark relative">
                {/* Map placeholder */}
                <div className="absolute inset-0 flex items-center justify-center tribal-pattern opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-neon-magenta mx-auto mb-2 animate-bounce" />
                    <p className="text-text-secondary text-sm">Interactive map coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="neon-text-gradient">Ready to Experience the Pulse?</span>
            </h2>
            <p className="text-text-secondary mb-8">
              Join us for three days of innovation, celebration, and unforgettable memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/passes" className="btn-primary text-lg px-8 py-4">
                Get Your Pass
              </Link>
              <Link href="/events" className="btn-neon text-lg px-8 py-4">
                Browse Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
