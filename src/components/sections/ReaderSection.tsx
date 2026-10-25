import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import roseCluster from "@/assets/rose-cluster.png";
import petal from "@/assets/rose-petal.png";
import { Heart, Sparkles, BookOpen } from "lucide-react";

const stanzas = [
  [
    "find a girl that reads and make her your wf.",
    "For if she reads, she's lived a thousand lives.",
    "Eloquent, intelligent, and mostly quiet,",
    "physically present, but a wandering mind.",
    "This world was never enough for her to thrive.",
  ],
  [
    "She probably thinks she's hard to love,",
    "but she's just a hopeless romantic.",
    "Find one, make her your friend first,",
    "and only if your intentions are pure,",
    "you'll find the love of your life.",
  ],
  [
    "Shy at first, but then the mask slowly uncovers",
    "to unveil stories upon stories.",
    "You'll never get bored once she starts talking.",
    "Her mind is a wonder, honestly, but she won't admit it.",
    "You'll know she's too smart for you,",
    "so don't even try arguing.",
  ],
  [
    "Her standard reach, the Eiffel Tower.",
    "Her imagination leaves clouds into cotton candy.",
    "If she reads, she isn't ordinary,",
    "so keep her like a fragile, leather-bound special edition",
    "you'll guard with your life.",
  ],
  [
    "She'll also be funny and kind,",
    "probably clumsy with bruises all over her arms and thighs,",
    "an over-thinker, a deep-feeler,",
    "waiting for enemies to turn into lovers at 3:00 in the morning.",
    "Wrap a blanket around her when you find her in a state like this.",
    "Put some coffee on her table, maybe a little sweet treat,",
    "and you'll be a romantic fable.",
  ],
  [
    "So if you're someone who wants to take care of someone",
    "and be taken care of, find a girl that reads.",
  ],
  [
    "Mind you, she has a heart that cannot handle another break.",
    "She cries over characters that are unliving, for God's sake.",
    "She needs to be protected.",
    "So find her and keep her and make her your wf.",
  ],
];

export function ReaderSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0.15, 0.65]);

  return (
    <section id="reader" ref={ref} className="relative overflow-hidden py-28 md:py-44">
      {/* Subtle cosmic vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-cosmic-deep/20 to-background opacity-80 pointer-events-none" />

      {/* Floating Rose Accents */}
      <motion.img
        src={roseCluster}
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        style={{ y: parallaxY }}
        className="pointer-events-none absolute -right-16 -top-20 z-10 w-72 select-none opacity-50 mix-blend-screen md:w-96"
      />

      <motion.img
        src={roseCluster}
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        style={{ y: parallaxY }}
        className="pointer-events-none absolute -bottom-16 -left-12 z-10 w-64 -scale-x-100 select-none opacity-40 mix-blend-screen md:w-80"
      />

      <div className="relative z-20 mx-auto max-w-3xl px-6">
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
              IV. A Letter To Him
            </span>
            <span className="h-px w-8 bg-gold/40" />
          </div>
          <h2 className="font-serif text-4xl md:text-6xl italic text-gold-shimmer tracking-tight">
            Find A Girl That Reads
          </h2>
          <p className="mt-4 font-serif text-base italic text-muted-foreground/80 max-w-md mx-auto">
            &ldquo;Keep her like a fragile, leather-bound special edition.&rdquo;
          </p>
        </motion.div>

        {/* Parchment Poem Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="gold-border relative overflow-hidden rounded-3xl border border-gold/30 bg-black/40 shadow-2xl backdrop-blur-2xl"
        >
          {/* Animated Glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              opacity: glowOpacity,
              boxShadow:
                "inset 0 0 80px -10px rgba(212, 175, 55, 0.35), 0 0 90px -15px rgba(212, 175, 55, 0.25)",
            }}
          />

          <div className="relative p-8 md:p-16">
            {/* Illuminated Header Bar */}
            <div className="flex items-center justify-between border-b border-gold/20 pb-6 mb-10">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gold" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold/80">
                  Folio Collection · Prachi's Stanzas
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-gold fill-gold/30" />
                <Sparkles className="w-3.5 h-3.5 text-gold" />
              </div>
            </div>

            {/* Stanzas in structured paragraphs */}
            <div className="space-y-8">
              {stanzas.map((stanza, sIdx) => (
                <motion.div
                  key={sIdx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 + sIdx * 0.1 }}
                  className="space-y-1.5 border-l border-gold/15 pl-4 md:pl-6 transition-all hover:border-gold/50"
                >
                  {stanza.map((line, lIdx) => (
                    <p
                      key={lIdx}
                      className={`font-serif leading-relaxed ${sIdx === 0 && lIdx === 0
                        ? "text-xl md:text-2xl italic text-gold font-medium"
                        : sIdx === stanzas.length - 1 && lIdx === stanza.length - 1
                          ? "text-lg md:text-xl italic text-gold-soft font-medium pt-1"
                          : "text-base md:text-lg italic text-foreground/85"
                        }`}
                    >
                      {line}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Signature Flourish */}
            <div className="mt-14 pt-8 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={petal} alt="" className="h-4 w-4 opacity-75" aria-hidden />
                <span className="font-serif italic text-sm text-foreground/80">
                  Dedicated to the one who reads in the dark.
                </span>
              </div>

              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold/60 border border-gold/20 px-3 py-1 rounded-full">
                Prachi's Stanza
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
