import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import roseCluster from "@/assets/rose-cluster.png";
import petal from "@/assets/rose-petal.png";

const lines = [
  "Find a girl that reads and make her your wf.",
  "For if she reads, she's lived a thousand lives.",
  "Eloquent, intelligent, and mostly quiet,",
  "physically present, but a wandering mind.",
  "This world was never enough for her to thrive.",
  "",
  "She probably thinks she's hard to love,",
  "but she's just a hopeless romantic.",
  "Find one, make her your friend first,",
  "and only if your intentions are pure,",
  "you'll find the love of your life.",
  "",
  "Shy at first, but then the mask slowly uncovers",
  "to unveil stories upon stories.",
  "You'll never get bored once she starts talking.",
  "Her mind is a wonder, honestly, but she won't admit it.",
  "You'll know she's too smart for you,",
  "so don't even try arguing.",
  "",
  "Her standard reach, the Eiffel Tower.",
  "Her imagination leaves clouds into cotton candy.",
  "If she reads, she isn't ordinary,",
  "so keep her like a fragile, leather-bound special edition",
  "you'll guard with your life.",
  "",
  "She'll also be funny and kind,",
  "probably clumsy with bruises all over her arms and thighs,",
  "an over-thinker, a deep-feeler,",
  "waiting for enemies to turn into lovers at 3:00 in the morning.",
  "Wrap a blanket around her when you find her in a state like this.",
  "Put some coffee on her table, maybe a little sweet treat,",
  "and you'll be a romantic fable.",
  "",
  "So if you're someone who wants to take care of someone",
  "and be taken care of, find a girl that reads.",
  "",
  "Mind you, she has a heart that cannot handle another break.",
  "She cries over characters that are unliving, for God's sake.",
  "She needs to be protected.",
  "So find her and keep her and make her your wf.",
];

export function ReaderSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.55], [0.1, 0.6]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32 md:py-48">
      {/* Subtle cosmic wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-cosmic-deep/30 to-background opacity-70 pointer-events-none" />

      {/* Rose cluster — top right */}
      <motion.img
        src={roseCluster}
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        style={{ y: parallaxY }}
        className="pointer-events-none absolute -right-20 -top-24 z-10 w-72 select-none opacity-60 mix-blend-screen md:w-96"
      />

      {/* Rose cluster — bottom left (mirrored) */}
      <motion.img
        src={roseCluster}
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        style={{ y: parallaxY }}
        className="pointer-events-none absolute -bottom-20 -left-16 z-10 w-60 -scale-x-100 select-none opacity-50 mix-blend-screen md:w-80"
      />

      {/* Floating petal — right mid */}
      <img
        src={petal}
        alt=""
        aria-hidden
        loading="lazy"
        width={120}
        height={120}
        className="pointer-events-none absolute right-12 top-1/3 z-10 w-16 animate-float select-none opacity-40 md:w-24"
        style={{ animationDelay: "1.5s", filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.7))" }}
      />

      <div className="relative z-20 mx-auto max-w-3xl px-6">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.5em] text-gold/60"
        >
          ✦ &nbsp; A letter to him &nbsp; ✦
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.15 }}
          className="mb-6 text-center font-serif text-4xl italic text-gold-shimmer md:text-5xl"
        >
          Find a Girl That Reads
        </motion.h2>

        {/* Decorative rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mx-auto mb-16 h-px w-32 origin-center bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        />

        {/* Poem card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.3, delay: 0.4 }}
          className="gold-border relative overflow-hidden rounded-2xl"
        >
          {/* Animated glow overlay */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              opacity: glowOpacity,
              boxShadow:
                "inset 0 0 60px -10px color-mix(in oklab, var(--gold) 40%, transparent), 0 0 80px -15px color-mix(in oklab, var(--gold) 35%, transparent)",
            }}
          />

          <div className="glass-panel relative rounded-2xl px-8 py-12 md:px-14 md:py-16">
            {/* Poem lines with staggered reveal */}
            <div className="space-y-0.5">
              {lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -18, filter: "blur(5px)" }}
                  animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                  transition={{
                    duration: 0.9,
                    delay: 0.55 + i * 0.035,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={
                    line === ""
                      ? "h-5"
                      : "font-serif text-base italic leading-relaxed text-muted-foreground md:text-lg"
                  }
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Closing flourish */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.55 + lines.length * 0.035 + 0.2 }}
              className="mt-12 flex items-center gap-4"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold/50">
                — for the one who reads
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
