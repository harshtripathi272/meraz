"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  college: string;
  year: string;
  avatar: string;
  quote: string;
  rating: number;
}

// AI-Generated testimonials using the prompt:
// "Generate 4 positive, enthusiastic testimonials for a college cultural festival 
// called Meraz. Each testimonial should mention: the vibrant atmosphere, exciting 
// events, great organization, and unforgettable experience. Use names common in 
// India. Keep each under 50 words."
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Arjun Krishnan",
    college: "NIT Raipur",
    year: "Meraz 5.0",
    avatar: "AK",
    quote: "Meraz was absolutely electrifying! The vibrant atmosphere, perfectly organized events, and the energy of the crowd made it an unforgettable experience. From the hackathon to the pro-night concerts, every moment was pure magic. Can't wait for the next edition!",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Mehta",
    college: "IIIT Naya Raipur",
    year: "Meraz 5.0",
    avatar: "PM",
    quote: "The team at IIT Bhilai knows how to throw a festival! The seamless organization, incredible variety of events, and that infectious festive vibe - Meraz exceeded all my expectations. Made friends, won competitions, created memories for life!",
    rating: 5,
  },
  {
    id: 3,
    name: "Rahul Sharma",
    college: "VIT Bhopal",
    year: "Meraz 4.0",
    avatar: "RS",
    quote: "Participating in the robotics competition at Meraz was a game-changer. The technical events are world-class, the cultural nights are spectacular, and the hospitality is unmatched. Truly the best fest in Central India!",
    rating: 5,
  },
  {
    id: 4,
    name: "Sneha Patel",
    college: "IIT Indore",
    year: "Meraz 5.0",
    avatar: "SP",
    quote: "From the neon-lit stages to the adrenaline-pumping competitions, Meraz delivers an experience like no other. The organizing team's attention to detail and the campus energy made it three days of pure celebration. Highly recommend!",
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  const goToPrevious = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section ref={ref} className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-dark/30 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">What They Say</h2>
          <p className="section-subtitle">
            Hear from students who experienced the magic of Meraz.
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="glass-card p-8 md:p-12">
            {/* Quote icon */}
            <Quote className="w-12 h-12 text-neon-magenta/30 mb-6" />
            
            {/* Testimonial content */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Quote */}
              <p className="text-lg md:text-xl text-text-primary leading-relaxed mb-8">
                &quot;{testimonials[currentIndex].quote}&quot;
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonials[currentIndex].rating
                        ? "text-amber-glow fill-amber-glow"
                        : "text-text-muted"
                    }`}
                  />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-neon-magenta to-neon-teal flex items-center justify-center text-primary-dark font-bold text-lg"
                >
                  {testimonials[currentIndex].avatar}
                </div>
                <div>
                  <div className="font-semibold text-text-primary">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-text-secondary text-sm">
                    {testimonials[currentIndex].college}
                  </div>
                  <div className="text-neon-teal text-xs">
                    {testimonials[currentIndex].year}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2 md:-mx-6">
              <button
                onClick={goToPrevious}
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-neon-magenta transition-colors pointer-events-auto"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-neon-magenta transition-colors pointer-events-auto"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoplay(false);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-6 bg-neon-magenta"
                    : "bg-text-muted hover:bg-text-secondary"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* AI prompt note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-text-muted text-xs mt-8 italic"
        >
          * Testimonials generated using AI for demonstration purposes
        </motion.p>
      </div>
    </section>
  );
}
