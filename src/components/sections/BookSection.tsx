import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import bookImg from "@/assets/book-adeline.jpg";
import roseCluster from "@/assets/rose-cluster.png";


const quote = `"His eyes are tracing my curves like they're scripture, and he's a sinner that is searching for proof of a God that he no longer can hear. When you make someone fall in love with the darkest parts of you, there's nothing you can do that will scare them away. They will be yours forever because they already love all the broken bits and pieces of you."`;

export function BookSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0.15, 0.7]);

  return (
    <section ref={ref} className="relative py-32 md:py-44">
      <div className="mx-auto max-w-5xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.5em] text-gold/60"
        >
          III. The Shadow's Whisper
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.15 }}
          className="mb-16 text-center font-serif text-4xl italic text-gold-shimmer md:text-5xl"
        >
          Haunting Adeline
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="gold-border relative overflow-hidden rounded-xl"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Creeping glow on the border */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{
              opacity: glowOpacity,
              boxShadow: hovered
                ? "inset 0 0 60px -10px color-mix(in oklab, var(--gold) 55%, transparent), 0 0 80px -10px color-mix(in oklab, var(--gold) 50%, transparent)"
                : "inset 0 0 30px -15px color-mix(in oklab, var(--gold) 25%, transparent), 0 0 30px -15px color-mix(in oklab, var(--gold) 20%, transparent)",
              transition: "box-shadow 1.2s ease",
            }}
          />

          <div className="relative flex flex-col items-stretch md:flex-row">
            {/* Rose cluster overlay on gold piping */}
            <img
              src={roseCluster}
              alt=""
              aria-hidden
              loading="lazy"
              width={1024}
              height={1024}
              className="pointer-events-none absolute -right-12 -top-16 z-20 w-56 select-none opacity-80 mix-blend-screen md:-right-16 md:-top-20 md:w-72"
              style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.8))" }}
            />
            <img
              src={roseCluster}
              alt=""
              aria-hidden
              loading="lazy"
              width={1024}
              height={1024}
              className="pointer-events-none absolute -bottom-14 -left-10 z-20 w-44 -scale-x-100 select-none opacity-70 mix-blend-screen md:-bottom-16 md:-left-14 md:w-60"
              style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.8))" }}
            />

            <div className="aspect-[3/4] w-full shrink-0 md:w-72 lg:w-80">
              <img src={bookImg} alt="Haunting Adeline" className="h-full w-full object-cover" loading="lazy" width={400} height={530} />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold/70">Haunting Adeline · USA Today Bestselling Author</p>
              <p className="mt-2 font-serif text-2xl text-foreground md:text-3xl">Haunting Adeline</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.3em] text-gold/60">by H.D. Carlton</p>


              <blockquote className="mt-8 border-l-2 border-gold/40 pl-6 font-serif text-base italic leading-relaxed text-muted-foreground md:text-lg">
                {quote}
              </blockquote>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
