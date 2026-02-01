"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { Check, Crown, Ticket, Users, Sparkles, X, ArrowRight } from "lucide-react";
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
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
            <Ticket className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-mono tracking-wider uppercase">Tickets</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-4">
            Secure Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Pass</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg mb-8">
            Experience the full festival energy. Grab your passes early for the best rates!
          </p>

          <Link href="/passes">
            <motion.button
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <span className="text-white font-medium">View Pricing Details</span>
              <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Passes Cards Preview */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {passes.slice(0, 3).map((pass, index) => (
            <motion.div
              key={pass.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative group ${pass.featured ? "md:-mt-6 md:mb-6" : ""}`}
            >
              {/* Featured glow */}
              {pass.featured && (
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              )}
              
              <div 
                className={`relative h-full flex flex-col p-6 rounded-3xl transition-all border ${
                  pass.featured 
                    ? "bg-[#0a0a14]/90 backdrop-blur-xl border-amber-500/30 shadow-2xl shadow-amber-500/10" 
                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                }`}
              >
                {/* Featured badge */}
                {pass.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-amber-500 text-black text-xs font-bold shadow-lg shadow-cyan-500/20">
                      <Crown className="w-3.5 h-3.5" />
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="mb-6 pb-6 border-b border-white/5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    pass.featured 
                      ? "bg-gradient-to-br from-cyan-500 to-amber-500" 
                      : "bg-white/5 border border-white/10"
                  }`}>
                    <Ticket className={`w-6 h-6 ${pass.featured ? "text-black" : "text-white/70"}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{pass.title}</h3>
                  <p className="text-white/40 text-sm">{pass.subtitle}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">₹{pass.basePrice}</span>
                    <span className="text-white/30 text-sm">/ person</span>
                  </div>
                  {pass.groupDiscounts.length > 0 && (
                    <p className="text-amber-400 text-xs mt-2 font-medium">
                      Group discounts available (up to 30% off)
                    </p>
                  )}
                </div>

                {/* Benefits */}
                <ul className="space-y-3 mb-8 flex-1">
                  {pass.benefits.slice(0, 4).map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                        benefit.includes("NO") ? "bg-red-500/10" : "bg-emerald-500/10"
                      }`}>
                        {benefit.includes("NO") ? (
                          <X className="w-2.5 h-2.5 text-red-400" />
                        ) : (
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                        )}
                      </div>
                      <span className={`text-white/60 ${benefit.includes("NO") ? "line-through opacity-50" : ""}`}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                  {pass.benefits.length > 4 && (
                    <li className="text-white/30 text-sm pl-7 italic">
                      + {pass.benefits.length - 4} more benefits
                    </li>
                  )}
                </ul>

                {/* CTA */}
                <Link
                  href="/passes"
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                    pass.featured
                      ? "bg-amber-500 text-black hover:bg-amber-400"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Get Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
