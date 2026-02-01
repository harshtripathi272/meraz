"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, Ticket, Users, AlertCircle, Phone, Cog, Sparkles, X, ArrowRight, Zap } from "lucide-react";
import { passes } from "@/lib/data/passes";

export default function PassesPage() {
  const [groupSize, setGroupSize] = useState(1);

  const getPrice = (pass: typeof passes[0]) => {
    if (groupSize <= 2) return pass.basePrice;
    const discount = pass.groupDiscounts.find(
      d => groupSize >= d.minSize && groupSize <= d.maxSize
    );
    return discount?.pricePerPerson || pass.basePrice;
  };

  const getTotalPrice = (pass: typeof passes[0]) => {
    return getPrice(pass) * groupSize;
  };

  const getSavings = (pass: typeof passes[0]) => {
    return (pass.basePrice - getPrice(pass)) * groupSize;
  };

  return (
    <div className="min-h-screen bg-[#030303] pt-28 pb-20">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-80 h-80 opacity-[0.02]"
        >
          <GearSVG />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -right-20 w-60 h-60 opacity-[0.02]"
        >
          <GearSVG />
        </motion.div>
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6"
          >
            <Ticket className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-mono tracking-widest uppercase">Secure Your Spot</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-black mb-6">
            <span className="text-white">Grab Your </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">
              Pass
            </span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Unlock the full MERAZ experience. Entry to the campus requires a valid pass.
            Group discounts available for 3+ people!
          </p>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10"
        >
          <div className="p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-white font-medium mb-1">Important Information</p>
              <p className="text-white/60 text-sm">
                Entry to the Campus requires a valid Access/Student Pass. For any queries or issues, 
                contact: <a href="tel:+919407900542" className="text-cyan-400 hover:underline">+91 94079 00542</a>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Group Size Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-14"
        >
          <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-cyan-400" />
                </div>
                <span className="text-white font-medium">How many people?</span>
              </div>
              
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-cyan-500/20 hover:border-cyan-500/30 hover:text-cyan-400 transition-all text-xl font-bold"
                >
                  -
                </motion.button>
                
                <div className="w-24 text-center">
                  <span className="text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">
                    {groupSize}
                  </span>
                  <p className="text-white/40 text-xs font-mono">
                    {groupSize === 1 ? "person" : "people"}
                  </p>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setGroupSize(Math.min(50, groupSize + 1))}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-cyan-500/20 hover:border-cyan-500/30 hover:text-cyan-400 transition-all text-xl font-bold"
                >
                  +
                </motion.button>
              </div>
              
              {groupSize >= 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-sm font-medium">Group Discount Active!</span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Passes Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {passes.map((pass, index) => (
            <motion.div
              key={pass.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className={`relative ${pass.featured ? "md:-mt-6 md:mb-6" : ""}`}
            >
              {/* Featured badge */}
              {pass.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <motion.span 
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-amber-500 text-black text-sm font-bold shadow-xl shadow-cyan-500/30"
                  >
                    <Crown className="w-4 h-4" />
                    MOST POPULAR
                  </motion.span>
                </div>
              )}

              <div 
                className={`relative h-full flex flex-col rounded-2xl overflow-hidden transition-all ${
                  pass.featured 
                    ? "bg-gradient-to-b from-cyan-500/10 to-amber-500/10 border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/10" 
                    : "bg-white/[0.02] border border-white/10 hover:border-white/20"
                }`}
              >
                {/* Decorative gear */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-10 -right-10 w-24 h-24 opacity-5"
                >
                  <GearSVG />
                </motion.div>
                
                <div className="p-8 flex-1 flex flex-col">
                  {/* Pass icon */}
                  <div 
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                      pass.featured 
                        ? "bg-gradient-to-br from-cyan-500 to-amber-500 shadow-lg shadow-cyan-500/30" 
                        : "bg-white/5 border border-white/10"
                    }`}
                  >
                    <Ticket 
                      className={`w-8 h-8 ${pass.featured ? "text-black" : "text-cyan-400"}`} 
                    />
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-heading font-bold text-white mb-2">
                    {pass.title}
                  </h2>
                  <p className="text-white/40 mb-6">{pass.subtitle}</p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">
                        ₹{getPrice(pass)}
                      </span>
                      <span className="text-white/40 text-sm">/ person</span>
                    </div>
                    
                    {groupSize >= 3 && getSavings(pass) > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3"
                      >
                        <span className="text-white/30 line-through text-sm">
                          ₹{pass.basePrice} × {groupSize} = ₹{pass.basePrice * groupSize}
                        </span>
                        <div className="text-emerald-400 font-medium">
                          Total: ₹{getTotalPrice(pass)} 
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-xs">
                            Save ₹{getSavings(pass)}!
                          </span>
                        </div>
                      </motion.div>
                    )}
                    
                    {groupSize >= 3 && getSavings(pass) === 0 && (
                      <div className="mt-3 text-white/50">
                        Total: ₹{getTotalPrice(pass)} for {groupSize} people
                      </div>
                    )}
                    
                    {groupSize < 3 && groupSize > 1 && (
                      <div className="mt-3 text-white/50">
                        Total: ₹{getTotalPrice(pass)} for {groupSize} people
                      </div>
                    )}
                  </div>

                  {/* Benefits */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {pass.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          benefit.includes("NO") 
                            ? "bg-red-500/20" 
                            : "bg-cyan-500/20"
                        }`}>
                          {benefit.includes("NO") ? (
                            <X className="w-3 h-3 text-red-400" />
                          ) : (
                            <Check className="w-3 h-3 text-cyan-400" />
                          )}
                        </div>
                        <span className={`text-sm ${
                          benefit.includes("NO") 
                            ? "text-white/30 line-through" 
                            : "text-white/60"
                        }`}>
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Group discount info */}
                  {pass.groupDiscounts.length > 0 && (
                    <div className="mb-6 p-4 rounded-xl bg-black/30 border border-white/5">
                      <p className="text-xs text-white/40 mb-3 font-mono uppercase tracking-wider">Group Discounts:</p>
                      <div className="space-y-2">
                        {pass.groupDiscounts.map((discount, i) => (
                          <div 
                            key={i}
                            className={`text-sm flex justify-between ${
                              groupSize >= discount.minSize && groupSize <= discount.maxSize
                                ? "text-emerald-400 font-medium"
                                : "text-white/40"
                            }`}
                          >
                            <span>{discount.label}</span>
                            <span>₹{discount.pricePerPerson}/person</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <motion.a
                    href={pass.purchaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-lg transition-all ${
                      pass.featured
                        ? "bg-gradient-to-r from-cyan-500 to-amber-500 text-black hover:shadow-xl hover:shadow-cyan-500/30"
                        : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    Buy Now
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-black text-center mb-10">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">
              Frequently Asked Questions
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "What's the difference between Student Pass and Access Pass?",
                a: "Student Pass gives you complete access including Pro-Night concerts with celebrity performances. Access Pass allows campus entry for daytime events only - no Pro-Night access."
              },
              {
                q: "How do group discounts work?",
                a: "When you register as a group (3+ people), each member gets a discounted rate. Larger groups get bigger discounts! All group members must register together."
              },
              {
                q: "Is my pass transferable?",
                a: "No, passes are non-transferable and linked to your ID. You'll need to show both your pass and valid photo ID at entry."
              },
              {
                q: "Can I upgrade from Access Pass to Student Pass?",
                a: "Yes! Contact our help desk at the venue or email meraz@iitbhilai.ac.in. You'll pay the difference in price."
              },
            ].map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-white/20 transition-colors"
              >
                <h3 className="text-white font-bold mb-3 flex items-start gap-3">
                  <Zap className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  {faq.q}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed pl-8">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/[0.02] border border-white/10 rounded-full">
            <span className="text-white/50">Need help?</span>
            <a 
              href="tel:+919407900542" 
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              <Phone className="w-4 h-4" />
              +91 94079 00542
            </a>
          </div>
        </motion.div>
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
