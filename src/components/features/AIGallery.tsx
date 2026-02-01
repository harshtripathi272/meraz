"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Info } from "lucide-react";

interface GalleryItem {
  id: string;
  imageUrl: string;
  prompt: string;
  alt: string;
  aspectRatio: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "tribal-tapestry",
    imageUrl: "/assets/gallery/tribal-tapestry.jpg",
    prompt: "Abstract neon tapestry of tribal glyphs forming a pulsing circle, electric magenta & neon teal palette, high-detail digital painting, 4k, cinematic rim lighting, geometric symmetry, --ar 4:3",
    alt: "Neon tribal tapestry forming a glowing circle",
    aspectRatio: "4/3",
  },
  {
    id: "aurora-crowd",
    imageUrl: "/assets/gallery/aurora-crowd.jpg",
    prompt: "Surreal crowd silhouette under neon aurora, laser threads forming mandala above stage, watercolor + synthwave fusion, ultra-detailed, 4k, --ar 16:9",
    alt: "Crowd silhouette beneath neon mandala aurora",
    aspectRatio: "16/9",
  },
  {
    id: "neon-mask",
    imageUrl: "/assets/gallery/neon-mask.jpg",
    prompt: "Neon sculptural mask floating over reflective floor, soft volumetric rays, photoreal + stylized blend, high-resolution 4k, --ar 3:4",
    alt: "Glowing neon mask sculpture over reflective surface",
    aspectRatio: "3/4",
  },
  {
    id: "festival-energy",
    imageUrl: "/assets/gallery/festival-energy.jpg",
    prompt: "Aerial view of festival crowd, neon tribal patterns projected on ground, magenta and teal lasers, cinematic night photography, --ar 21:9",
    alt: "Festival crowd with neon tribal projections",
    aspectRatio: "21/9",
  },
  {
    id: "cosmic-dancer",
    imageUrl: "/assets/gallery/cosmic-dancer.jpg",
    prompt: "Silhouette of dancer surrounded by swirling neon energy spirals, tribal symbols floating in space, digital art, ethereal glow, --ar 1:1",
    alt: "Dancer silhouette with swirling neon energy",
    aspectRatio: "1/1",
  },
  {
    id: "drum-circle",
    imageUrl: "/assets/gallery/drum-circle.jpg",
    prompt: "Tribal drum circle with neon flame effects, drummers in silhouette, magical particles rising, warm amber and cool teal contrast, --ar 16:9",
    alt: "Tribal drum circle with neon flames",
    aspectRatio: "16/9",
  },
];

export default function AIGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Generate placeholder gradient based on item id
  const getPlaceholderGradient = (id: string) => {
    const colors = [
      ["#ff00ff", "#00ffff"],
      ["#00ffff", "#ffa500"],
      ["#ffa500", "#ff00ff"],
      ["#d4af37", "#ff00ff"],
      ["#ff00ff", "#d4af37"],
      ["#00ffff", "#d4af37"],
    ];
    const index = galleryItems.findIndex(item => item.id === id) % colors.length;
    return `linear-gradient(135deg, ${colors[index][0]}40, ${colors[index][1]}40)`;
  };

  return (
    <section ref={ref} className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 tribal-pattern opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="section-title">AI Art Gallery</h2>
          <p className="section-subtitle">
            Hover over each piece to reveal the AI prompt that created it. 
            All artwork generated using cutting-edge AI tools.
          </p>
        </motion.div>

        {/* Prompt reveal hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-2 text-text-muted text-sm mb-8"
        >
          <Info className="w-4 h-4" />
          <span>Hover to see the generation prompt</span>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className={`relative group ${
                item.aspectRatio === "21/9" || item.aspectRatio === "16/9"
                  ? "md:col-span-2"
                  : ""
              }`}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div 
                className="relative rounded-2xl overflow-hidden glass-card"
                style={{ aspectRatio: item.aspectRatio }}
              >
                {/* Placeholder image with gradient */}
                <div 
                  className="absolute inset-0"
                  style={{ background: getPlaceholderGradient(item.id) }}
                >
                  {/* Animated tribal pattern */}
                  <div className="absolute inset-0 tribal-pattern opacity-30" />
                  
                  {/* Central decoration */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-32 h-32 opacity-40"
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <polygon
                          points="50,10 90,90 10,90"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="text-text-primary"
                        />
                        <circle
                          cx="50"
                          cy="60"
                          r="25"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="text-text-primary"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* Hover overlay with prompt */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: hoveredItem === item.id ? 1 : 0,
                  }}
                  className="absolute inset-0 bg-primary-dark/90 backdrop-blur-sm flex items-center justify-center p-6 pointer-events-none"
                >
                  <div className="text-center">
                    <p className="text-xs text-neon-magenta uppercase tracking-wider mb-2">
                      AI Prompt Used:
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed font-mono">
                      &quot;{item.prompt}&quot;
                    </p>
                  </div>
                </motion.div>

                {/* Alt text label */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary-dark to-transparent">
                  <p className="text-sm text-text-primary font-medium">{item.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-text-muted text-sm mt-8"
        >
          These artworks showcase the &quot;Neon Tribal Pulse&quot; theme. 
          Generated using Midjourney, DALL-E, and Google ImageFX.
        </motion.p>
      </div>
    </section>
  );
}
