import { useRef } from "react";
import { motion, useInView } from "motion/react";
import img1 from "@/assets/italy-1.jpg";
import img2 from "@/assets/italy-2.jpg";
import img3 from "@/assets/italy-3.jpg";
import img4 from "@/assets/italy-4.jpg";

const images = [
  { src: img1, alt: "Rain-slicked Roman street at night", span: "col-span-1 row-span-2" },
  { src: img2, alt: "Dark Italian espresso bar", span: "col-span-1 row-span-1" },
  { src: img3, alt: "Florence architecture under lamplight", span: "col-span-1 row-span-1" },
  { src: img4, alt: "Venetian alley with hanging lanterns", span: "col-span-1 row-span-2" },
];

export function ItalyGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 md:py-44">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.5em] text-gold/60"
        >
          V. Aesthetic Italian Evenings
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.15 }}
          className="mb-16 text-center font-serif text-4xl italic text-gold-shimmer md:text-5xl"
        >
          Italy, In Monochrome
        </motion.h2>

        <div className="grid auto-rows-[200px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4 md:gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
              className={`magnetic group relative overflow-hidden rounded-lg ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                width={600}
                height={800}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ filter: "grayscale(0.15)" }}
              />
              {/* Subtle dark rose silhouette frame pattern */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-lg"
                style={{
                  boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--gold) 25%, transparent)",
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><g fill='none' stroke='%230a0a0a' stroke-width='0.6' opacity='0.6'><circle cx='8' cy='8' r='3'/><path d='M8 5 Q10 6.5 8 8 Q6 6.5 8 5Z M5 8 Q6.5 10 8 8 Q6.5 6 5 8Z'/><circle cx='52' cy='52' r='3'/></g></svg>\")",
                  backgroundRepeat: "repeat",
                  mixBlendMode: "overlay",
                }}
              />
            </motion.div>

          ))}
        </div>
      </div>
    </section>
  );
}
