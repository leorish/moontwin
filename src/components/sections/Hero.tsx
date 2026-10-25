import { motion } from "motion/react";
import { AntigravityParticles } from "@/components/AntigravityParticles";
import { InteractiveText } from "@/components/InteractiveText";
import moon from "@/assets/hero-moon.jpg";


export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0">
        <img
          src={moon}
          alt="Glowing crescent moon over cosmic midnight sky"
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>
      
      {/* Dynamic weightless antigravity particle field with mouse proximity physics */}
      <AntigravityParticles count={80} />


      <motion.div
        initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="mb-6 font-mono text-[10px] uppercase tracking-[0.6em] text-gold/70"
        >
          ⟢  A Sanctuary For Prachi  ⟣
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1.4 }}
          className="font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem]"
        >
          <span className="block italic text-foreground/85 flex justify-center">
            <InteractiveText text="Prachi" />:
          </span>
          <span className="mt-2 block text-gold-shimmer">The Celestial</span>
          <span className="mt-2 block italic text-foreground/85">Prologue</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.4 }}
          className="mx-auto mt-10 max-w-xl font-serif text-lg italic text-moonlight md:text-xl"
        >
          to my <InteractiveText text="Moon Twin" /> —
          <br />
          the quiet stanza I keep returning to.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 1 }}
          className="mt-14 flex items-center justify-center gap-6"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-muted-foreground">scroll</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
