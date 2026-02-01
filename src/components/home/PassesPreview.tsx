"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { Check, Crown, Ticket, Users } from "lucide-react";
import { passes } from "@/lib/data/passes";

export default function PassesPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [groupSize, setGroupSize] = useState(1);

  const getPrice = (pass: typeof passes[0]) => {
    if (groupSize <= 2) return pass.basePrice;
    const discount = pass.groupDiscounts.find(
      d => groupSize >= d.minSize && groupSize <= d.maxSize
    );
    return discount?.pricePerPerson || pass.basePrice;
  };

  return (
    <section ref={ref} className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-dark/50 to-transparent" />
      <div className="absolute left-0 top-1/3 w-80 h-80 bg-neon-magenta/5 rounded-full blur-3xl" />
      <div className="absolute right-0 bottom-1/3 w-80 h-80 bg-neon-teal/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="section-title">Grab Your Pass</h2>
          <p className="section-subtitle">
            Unlock the full Meraz experience. Group discounts available!
          </p>
        </motion.div>

        {/* Group Size Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="glass-card p-4 flex items-center gap-4">
            <Users className="w-5 h-5 text-neon-teal" />
            <span className="text-text-secondary text-sm">Group Size:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                className="w-8 h-8 rounded-lg bg-surface-light text-text-primary hover:bg-neon-magenta/20 transition-colors"
              >
                -
              </button>
              <span className="w-12 text-center text-xl font-bold text-neon-teal">
                {groupSize}
              </span>
              <button
                onClick={() => setGroupSize(Math.min(20, groupSize + 1))}
                className="w-8 h-8 rounded-lg bg-surface-light text-text-primary hover:bg-neon-magenta/20 transition-colors"
              >
                +
              </button>
            </div>
            {groupSize >= 3 && (
              <span className="text-amber-glow text-sm font-medium animate-pulse">
                Group Discount Applied!
              </span>
            )}
          </div>
        </motion.div>

        {/* Passes Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {passes.map((pass, index) => (
            <motion.div
              key={pass.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className={`relative ${pass.featured ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {/* Featured badge */}
              {pass.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-neon-magenta to-neon-teal text-primary-dark text-xs font-bold">
                    <Crown className="w-3.5 h-3.5" />
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div 
                className={`glass-card p-6 h-full transition-all hover:scale-105 ${
                  pass.featured 
                    ? "border-neon-magenta/50 shadow-lg shadow-neon-magenta/10" 
                    : "hover:border-neon-teal/30"
                }`}
              >
                {/* Pass icon */}
                <div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    pass.featured 
                      ? "bg-gradient-to-br from-neon-magenta to-neon-teal" 
                      : "bg-surface-light"
                  }`}
                >
                  <Ticket 
                    className={`w-6 h-6 ${pass.featured ? "text-primary-dark" : "text-neon-teal"}`} 
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-text-primary mb-1">
                  {pass.title}
                </h3>
                <p className="text-text-muted text-sm mb-4">{pass.subtitle}</p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-black neon-text-gradient">
                    ₹{getPrice(pass)}
                  </span>
                  <span className="text-text-muted text-sm ml-2">/ person</span>
                  {groupSize >= 3 && getPrice(pass) < pass.basePrice && (
                    <div className="text-xs text-text-muted mt-1">
                      <span className="line-through">₹{pass.basePrice}</span>
                      <span className="text-amber-glow ml-2">
                        Save ₹{(pass.basePrice - getPrice(pass)) * groupSize} total!
                      </span>
                    </div>
                  )}
                </div>

                {/* Benefits */}
                <ul className="space-y-3 mb-6">
                  {pass.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check 
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          benefit.includes("NO") ? "text-red-400" : "text-neon-teal"
                        }`}
                      />
                      <span className={`text-text-secondary ${
                        benefit.includes("NO") ? "line-through opacity-50" : ""
                      }`}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={pass.purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center py-3 rounded-lg font-medium transition-all ${
                    pass.featured
                      ? "btn-primary"
                      : "btn-neon"
                  }`}
                >
                  Buy Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-text-muted text-sm mt-8"
        >
          * Entry to the Campus requires a valid Access/Student Pass. 
          For queries contact: +91 94079 00542
        </motion.p>
      </div>
    </section>
  );
}
