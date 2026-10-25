import { motion } from "motion/react";
import { AntigravityParticles } from "@/components/AntigravityParticles";
import { InteractiveText } from "@/components/InteractiveText";
import moon from "@/assets/hero-moon.jpg";
import { ChevronDown, Sparkles } from "lucide-react";

export function Hero() {
  const scrollToNext = () => {
    const el = document.getElementById("music");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="prologue"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Background imagery with layered atmospheric vignettes */}
      <div className="absolute inset-0 select-none">
        <img
          src={moon}
          alt="Glowing crescent moon over cosmic midnight sky"
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-50 scale-105 transition-transform duration-10000 ease-out"
        />
        <div className="absolute inset-0 bg-radial from-transparent via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </div>

      {/* Dynamic weightless particle field with cursor proximity physics */}
      <AntigravityParticles count={75} />

      {/* Hero Typography & Editorial Stanza */}
      <motion.div
        initial={{ opacity: 0, y: 50, filter: "blur(14px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        {/* Subtle pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-background/50 px-4 py-1.5 backdrop-blur-md mb-8"
        >
          <Sparkles className="w-3 h-3 text-gold animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-gold-soft">
            A Sanctuary For Prachi
          </span>
          <Sparkles className="w-3 h-3 text-gold animate-pulse" />
        </motion.div>

        {/* Grand Editorial Header */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.3 }}
          className="font-serif text-5xl leading-[1.08] tracking-tight md:text-7xl lg:text-[5.8rem]"
        >
          <span className="block italic text-foreground/80 flex justify-center">
            <InteractiveText text="Prachi" />:
          </span>
          <span className="mt-2 block text-gold-shimmer font-serif font-light">
            The Celestial
          </span>
          <span className="mt-1 block italic text-foreground/90">Prologue</span>
        </motion.h1>

        {/* Dedicated Stanza */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1.2 }}
          className="mx-auto mt-10 max-w-xl font-serif text-lg italic text-moonlight md:text-2xl leading-relaxed"
        >
          <p>
            to my <InteractiveText text="Moon Twin" /> —
          </p>
          <p className="mt-1 text-muted-foreground/90 text-base md:text-lg not-italic font-light tracking-wide">
            the quiet stanza I keep returning to when the rest of the world goes dark.
          </p>
        </motion.div>

        {/* Scroll Waypoint Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 1 }}
          className="mt-16 flex flex-col items-center justify-center gap-2"
        >
          <button
            onClick={scrollToNext}
            className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-gold transition-colors cursor-pointer"
            aria-label="Scroll to Melodies Section"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-gold/60 group-hover:text-gold transition-colors">
              Begin Journey
            </span>
            <div className="flex h-10 w-6 items-start justify-center rounded-full border border-gold/30 p-1 group-hover:border-gold transition-colors">
              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="h-1.5 w-1 rounded-full bg-gold"
              />
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gold/50 group-hover:text-gold group-hover:translate-y-0.5 transition-all" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
