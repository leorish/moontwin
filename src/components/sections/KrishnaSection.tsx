import { useRef } from "react";
import { motion, useInView } from "motion/react";
import fluteImg from "@/assets/krishna-flute.jpg";
import petal from "@/assets/rose-petal.png";
import { SunMedium, Moon, Sparkles, Feather } from "lucide-react";

const thoughts = [
  {
    title: "On Eternal Love",
    sanskrit: "नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः",
    text: "The soul is never born, nor does it ever die. When you love with divine purity, you cease to be finite; you become eternal.",
    icon: Sparkles,
  },
  {
    title: "On Sacred Surrender",
    sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज",
    text: "Abandon all varieties of paths and rest your quiet heart in divine trust. I shall deliver you from all fear and sorrow.",
    icon: Moon,
  },
  {
    title: "On Being & Devotion",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
    text: "You have a right to your sacred devotion and purpose, but never to anxiety over the fruits. Love fully, without fear.",
    icon: SunMedium,
  },
];

export function KrishnaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="krishna" ref={ref} className="relative overflow-hidden py-28 md:py-44">
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-deep/40 via-background to-background pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-gold/40" />
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-gold/80">
              V. The Cosmic Flute
            </span>
            <span className="h-px w-8 bg-gold/40" />
          </div>
          <h2 className="font-serif text-4xl md:text-6xl italic text-gold-shimmer tracking-tight">
            Divine Mysticism
          </h2>
          <p className="mt-4 font-serif text-base italic text-muted-foreground/80 max-w-md mx-auto">
            Sacred wisdom, boundless serenity, and the flute that echoes across lifetimes.
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-14 lg:flex-row lg:items-center">
          {/* Sacred Imagery Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="shrink-0 flex flex-col items-center"
          >
            <div className="relative group">
              {/* Golden Halo glow */}
              <div className="absolute -inset-4 rounded-3xl bg-gold/20 blur-2xl group-hover:bg-gold/30 transition-all duration-700" />

              <div className="relative overflow-hidden rounded-2xl border border-gold/40 shadow-2xl bg-black/60 w-72 md:w-80">
                <img
                  src={fluteImg}
                  alt="Peacock feather and divine golden flute"
                  loading="lazy"
                  width={320}
                  height={420}
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay Badge */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/70 to-transparent p-5 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Feather className="w-4 h-4 text-gold" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-soft font-semibold">
                      Shree Krishna
                    </span>
                  </div>
                  <p className="font-serif italic text-xs text-muted-foreground">
                    The Eternal Guide & Guardian
                  </p>
                </div>

                {/* Black rose petal accent */}
                <img
                  src={petal}
                  alt=""
                  aria-hidden
                  width={100}
                  height={100}
                  className="pointer-events-none absolute -top-4 -right-4 w-20 opacity-70"
                  style={{ filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.8))" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Meditative Sacred Cards */}
          <div className="flex flex-1 flex-col gap-5 w-full">
            {thoughts.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.35 + i * 0.15 }}
                  className="glass-panel group relative rounded-2xl border border-gold/20 p-6 md:p-8 transition-all duration-500 hover:border-gold/50 hover:bg-gold/5 hover:translate-x-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-gold/10 border border-gold/30 text-gold group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl text-gold font-normal">
                        {item.title}
                      </h3>
                    </div>

                    <span className="font-mono text-[10px] text-gold/60 border border-gold/20 px-2.5 py-1 rounded-full">
                      {`0${i + 1}`}
                    </span>
                  </div>

                  {/* Sanskrit Stanza */}
                  <p className="mt-3 font-serif text-xs md:text-sm text-gold-soft/80 tracking-wide font-normal">
                    {item.sanskrit}
                  </p>

                  {/* Reflection Text */}
                  <p className="mt-2 font-serif text-base italic leading-relaxed text-foreground/80">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
