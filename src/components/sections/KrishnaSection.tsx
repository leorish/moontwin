import { useRef } from "react";
import { motion, useInView } from "motion/react";
import fluteImg from "@/assets/krishna-flute.jpg";
import petal from "@/assets/rose-petal.png";


const thoughts = [
  { title: "On Love", text: "The soul is neither born, and nor does it die. When you love with divine purity, you become eternal." },
  { title: "On Surrender", text: "Abandon all varieties of paths and simply surrender unto Me. I shall deliver you from all sinful reactions. Do not fear." },
  { title: "On Being", text: "You have the right to perform your prescribed duties, but you are not entitled to the fruits of your actions." },
];

export function KrishnaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-32 md:py-44">
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-deep via-cosmic to-background opacity-60" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.5em] text-gold/60"
        >
          IV. The Cosmic Flute
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.15 }}
          className="mb-16 text-center font-serif text-4xl italic text-gold-shimmer md:text-5xl"
        >
          Divine Mysticism
        </motion.h2>

        <div className="flex flex-col items-center gap-16 lg:flex-row">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.3, delay: 0.3 }}
            className="shrink-0"
          >
            <div className="relative animate-float overflow-hidden rounded-2xl shadow-gold" style={{ width: 280 }}>
              <img src={fluteImg} alt="Golden peacock feather and flute" loading="lazy" width={280} height={373} className="h-auto w-full" />
              {/* Stylized black rose silhouette near flute */}
              <img
                src={petal}
                alt=""
                aria-hidden
                width={120}
                height={120}
                className="pointer-events-none absolute -bottom-6 -right-6 w-28 opacity-80"
                style={{ filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.8))" }}
              />
            </div>
          </motion.div>


          {/* Cards */}
          <div className="flex flex-1 flex-col gap-6">
            {thoughts.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                className="glass-panel magnetic rounded-xl p-8"
              >
                <p className="mb-3 font-serif text-xl text-gold">{t.title}</p>
                <p className="font-serif italic leading-relaxed text-muted-foreground">{t.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
