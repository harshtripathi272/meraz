"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, Ticket, Users, AlertCircle, Phone } from "lucide-react";
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
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="neon-text-gradient">Grab Your Pass</span>
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Unlock the full Meraz experience. Entry to the campus requires a valid pass.
            Group discounts available for 3+ people!
          </p>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card p-4 mb-8 border-amber-glow/30"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-glow flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-text-primary font-medium">Important Information</p>
              <p className="text-text-secondary text-sm">
                Entry to the Campus requires a valid Access/Student Pass. For any queries or issues, 
                contact: <a href="tel:+919407900542" className="text-neon-teal hover:underline">+91 94079 00542</a>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Group Size Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="glass-card p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-neon-teal" />
                <span className="text-text-primary font-medium">How many people?</span>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                  className="w-10 h-10 rounded-xl bg-surface-light text-text-primary hover:bg-neon-magenta/20 hover:text-neon-magenta transition-colors text-xl font-bold"
                >
                  -
                </button>
                <div className="w-20 text-center">
                  <span className="text-3xl font-bold neon-text-gradient">{groupSize}</span>
                  <p className="text-xs text-text-muted">
                    {groupSize === 1 ? "person" : "people"}
                  </p>
                </div>
                <button
                  onClick={() => setGroupSize(Math.min(50, groupSize + 1))}
                  className="w-10 h-10 rounded-xl bg-surface-light text-text-primary hover:bg-neon-magenta/20 hover:text-neon-magenta transition-colors text-xl font-bold"
                >
                  +
                </button>
              </div>
              
              {groupSize >= 3 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-4 py-2 rounded-full bg-amber-glow/20 text-amber-glow text-sm font-medium"
                >
                  🎉 Group Discount Active!
                </motion.span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Passes Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
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
                  <span className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-neon-magenta to-neon-teal text-primary-dark text-sm font-bold shadow-lg shadow-neon-magenta/20">
                    <Crown className="w-4 h-4" />
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div 
                className={`glass-card p-6 md:p-8 h-full flex flex-col transition-all ${
                  pass.featured 
                    ? "border-neon-magenta/50 shadow-xl shadow-neon-magenta/10" 
                    : "hover:border-neon-teal/30"
                }`}
              >
                {/* Pass icon */}
                <div 
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                    pass.featured 
                      ? "bg-gradient-to-br from-neon-magenta to-neon-teal" 
                      : "bg-surface-light"
                  }`}
                >
                  <Ticket 
                    className={`w-8 h-8 ${pass.featured ? "text-primary-dark" : "text-neon-teal"}`} 
                  />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-text-primary mb-1">
                  {pass.title}
                </h2>
                <p className="text-text-muted mb-6">{pass.subtitle}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black neon-text-gradient">
                      ₹{getPrice(pass)}
                    </span>
                    <span className="text-text-muted">/ person</span>
                  </div>
                  
                  {groupSize >= 3 && getSavings(pass) > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2"
                    >
                      <span className="text-text-muted line-through text-sm">
                        ₹{pass.basePrice} × {groupSize} = ₹{pass.basePrice * groupSize}
                      </span>
                      <div className="text-amber-glow font-medium">
                        Total: ₹{getTotalPrice(pass)} (Save ₹{getSavings(pass)}!)
                      </div>
                    </motion.div>
                  )}
                  
                  {groupSize >= 3 && getSavings(pass) === 0 && (
                    <div className="mt-2 text-text-secondary">
                      Total: ₹{getTotalPrice(pass)} for {groupSize} people
                    </div>
                  )}
                  
                  {groupSize < 3 && groupSize > 1 && (
                    <div className="mt-2 text-text-secondary">
                      Total: ₹{getTotalPrice(pass)} for {groupSize} people
                    </div>
                  )}
                </div>

                {/* Benefits */}
                <ul className="space-y-3 mb-8 flex-1">
                  {pass.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check 
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          benefit.includes("NO") ? "text-red-400" : "text-neon-teal"
                        }`}
                      />
                      <span className={`text-text-secondary ${
                        benefit.includes("NO") ? "line-through opacity-60" : ""
                      }`}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Group discount info */}
                {pass.groupDiscounts.length > 0 && (
                  <div className="mb-6 p-4 rounded-xl bg-surface-dark/50">
                    <p className="text-xs text-text-muted mb-2">Group Discounts:</p>
                    <div className="space-y-1">
                      {pass.groupDiscounts.map((discount, i) => (
                        <div 
                          key={i}
                          className={`text-xs flex justify-between ${
                            groupSize >= discount.minSize && groupSize <= discount.maxSize
                              ? "text-amber-glow font-medium"
                              : "text-text-muted"
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
                <a
                  href={pass.purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center py-4 rounded-xl font-bold text-lg transition-all ${
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

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            <span className="neon-text-gradient">Frequently Asked Questions</span>
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
              <div key={i} className="glass-card p-6">
                <h3 className="text-text-primary font-semibold mb-2">{faq.q}</h3>
                <p className="text-text-secondary text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-text-muted">
            Need help? Contact us at{" "}
            <a href="tel:+919407900542" className="text-neon-teal hover:underline inline-flex items-center gap-1">
              <Phone className="w-4 h-4" />
              +91 94079 00542
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
