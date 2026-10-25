import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import bookImg from "@/assets/book-adeline.jpg";
import roseCluster from "@/assets/rose-cluster.png";
import petal from "@/assets/rose-petal.png";
import { Bookmark, Sparkles, Feather } from "lucide-react";

const quote = `"His eyes are tracing my curves like they're scripture, and he's a sinner that is searching for proof of a God that he no longer can hear. When you make someone fall in love with the darkest parts of you, there's nothing you can do that will scare them away. They will be yours forever because they already love all the broken bits and pieces of you."`;

export function BookSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0.2, 0.8]);
  const bookParallax = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section id="book" ref={ref} className="relative py-28 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">
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
              III. The Shadow's Whisper
            </span>
            <span className="h-px w-8 bg-gold/40" />
          </div>
          <h2 className="font-serif text-4xl md:text-6xl italic text-gold-shimmer tracking-tight">
            Haunting Adeline
          </h2>
          <p className="mt-4 font-serif text-base italic text-muted-foreground/80 max-w-md mx-auto">
            Where obsession meets devotion in the deepest dark.
          </p>
        </motion.div>

        {/* Book Showcase Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="gold-border relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-xl border border-gold/30 shadow-2xl"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Animated Gold Aura */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              opacity: glowOpacity,
              boxShadow: hovered
                ? "inset 0 0 80px -10px rgba(212, 175, 55, 0.4), 0 0 100px -10px rgba(212, 175, 55, 0.3)"
                : "inset 0 0 40px -15px rgba(212, 175, 55, 0.2), 0 0 50px -15px rgba(212, 175, 55, 0.15)",
              transition: "box-shadow 0.8s ease",
            }}
          />

          <div className="relative flex flex-col items-center md:flex-row md:items-stretch">
            {/* Rose Cluster Accent (Top Right) */}
            <img
              src={roseCluster}
              alt=""
              aria-hidden
              loading="lazy"
              width={1024}
              height={1024}
              className="pointer-events-none absolute -right-16 -top-20 z-20 w-64 select-none opacity-70 mix-blend-screen md:-right-20 md:-top-24 md:w-80"
              style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.9))" }}
            />

            {/* Rose Cluster Accent (Bottom Left) */}
            <img
              src={roseCluster}
              alt=""
              aria-hidden
              loading="lazy"
              width={1024}
              height={1024}
              className="pointer-events-none absolute -bottom-16 -left-12 z-20 w-52 -scale-x-100 select-none opacity-60 mix-blend-screen md:-bottom-20 md:-left-16 md:w-72"
              style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.9))" }}
            />

            {/* Book Cover with 3D Depth & Ribbon */}
            <div className="relative w-full shrink-0 md:w-80 lg:w-96 p-8 flex items-center justify-center">
              <motion.div
                style={{ y: bookParallax }}
                className="relative aspect-[3/4.2] w-56 md:w-64 rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-gold/40 group cursor-pointer"
              >
                <img
                  src={bookImg}
                  alt="Haunting Adeline by H.D. Carlton"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Silk Ribbon Bookmark */}
                <div className="absolute top-0 right-8 w-5 h-16 bg-red-900 shadow-md border-x border-red-700 flex flex-col justify-end">
                  <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[8px] border-b-black/40" />
                </div>

                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 opacity-60 group-hover:opacity-20 transition-opacity" />
              </motion.div>
            </div>

            {/* Editorial Stanza / Quote */}
            <div className="relative z-10 flex flex-col justify-center p-8 md:p-14 md:pl-6 flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Bookmark className="w-3.5 h-3.5 text-gold" />
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/80">
                  Dark Romance Edition · H.D. Carlton
                </span>
              </div>

              <h3 className="font-serif text-3xl md:text-4xl text-foreground font-normal tracking-wide">
                Haunting Adeline
              </h3>

              <div className="flex items-center gap-3 mt-1.5 mb-6">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-soft">
                  The Cat & Mouse Duet
                </span>
                <span className="h-1 w-1 rounded-full bg-gold/50" />
                <span className="font-mono text-[10px] text-muted-foreground tracking-wider">
                  Special Keepsake
                </span>
              </div>

              {/* Enhanced Illuminated Quote */}
              <div className="relative mt-2 rounded-xl bg-gold/5 border-l-2 border-gold/60 p-6 backdrop-blur-xs">
                <Feather className="absolute top-4 right-4 w-5 h-5 text-gold/20" />
                <p className="font-serif text-base md:text-lg italic leading-relaxed text-foreground/90">
                  <span className="font-serif text-4xl float-left mr-2 leading-none text-gold">
                    &ldquo;
                  </span>
                  {quote}
                </p>
                <div className="mt-4 flex items-center justify-between pt-4 border-t border-gold/10">
                  <div className="flex items-center gap-2">
                    <img src={petal} alt="" className="h-3 w-3 opacity-60" aria-hidden />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/70">
                      Zade Meadows & Adeline Reilly
                    </span>
                  </div>
                  <Sparkles className="w-3.5 h-3.5 text-gold/40" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
