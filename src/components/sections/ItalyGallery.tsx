import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import img1 from "@/assets/italy-1.jpg";
import img2 from "@/assets/italy-2.jpg";
import img3 from "@/assets/italy-3.jpg";
import img4 from "@/assets/italy-4.jpg";
import { Camera, MapPin, X, ZoomIn } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  location: string;
  time: string;
  notes: string;
  span: string;
}

const images: GalleryImage[] = [
  {
    src: img1,
    alt: "Rain-slicked Roman street at night",
    location: "Via Margutta, Roma",
    time: "02:14 AM",
    notes: "Cobblestone glistening under amber street lamps.",
    span: "col-span-1 row-span-2",
  },
  {
    src: img2,
    alt: "Dark Italian espresso bar",
    location: "Caffè Greco, Roma",
    time: "11:42 PM",
    notes: "Velvet banquettes and whispers of dark espresso.",
    span: "col-span-1 row-span-1",
  },
  {
    src: img3,
    alt: "Florence architecture under lamplight",
    location: "Piazza del Duomo, Firenze",
    time: "03:30 AM",
    notes: "Marble echoes beneath the quietest moonlight.",
    span: "col-span-1 row-span-1",
  },
  {
    src: img4,
    alt: "Venetian canal with hanging lanterns",
    location: "Canal Grande, Venezia",
    time: "01:05 AM",
    notes: "Water rippling gently against ancient stone walls.",
    span: "col-span-1 row-span-2",
  },
];

export function ItalyGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <section id="italy" ref={ref} className="relative py-28 md:py-44 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
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
              VI. Aesthetic Italian Evenings
            </span>
            <span className="h-px w-8 bg-gold/40" />
          </div>
          <h2 className="font-serif text-4xl md:text-6xl italic text-gold-shimmer tracking-tight">
            Italy, In Monochrome
          </h2>
          <p className="mt-4 font-serif text-base italic text-muted-foreground/80 max-w-md mx-auto">
            Where old-world romanticism lingers in every rain-slicked alley.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid auto-rows-[220px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:auto-rows-[280px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.12 }}
              onClick={() => setSelectedImage(img)}
              className={`group relative overflow-hidden rounded-2xl border border-gold/20 shadow-xl cursor-pointer ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                width={600}
                height={800}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                style={{ filter: "grayscale(0.2) contrast(1.05)" }}
              />

              {/* Gradient Vignette on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

              {/* Interactive Zoom Icon Badge */}
              <div className="absolute top-3 right-3 rounded-full bg-black/60 p-2 text-gold opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-gold/30">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Bottom Editorial Caption */}
              <div className="absolute bottom-0 inset-x-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <div className="flex items-center gap-1.5 text-gold-soft mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
                    {img.location}
                  </span>
                </div>
                <p className="font-serif italic text-sm text-foreground/90 leading-snug">
                  {img.notes}
                </p>
                <span className="mt-2 inline-block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                  {img.time}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl overflow-hidden rounded-2xl border border-gold/40 bg-neutral-950 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 rounded-full bg-black/70 p-2 text-gold hover:text-gold-soft border border-gold/30 cursor-pointer transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-h-[75vh] overflow-hidden">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 bg-black/80 border-t border-gold/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-gold">
                    <Camera className="w-4 h-4" />
                    <span className="font-mono text-xs uppercase tracking-[0.3em]">
                      {selectedImage.location}
                    </span>
                  </div>
                  <p className="mt-1 font-serif italic text-foreground/90 text-base">
                    {selectedImage.notes}
                  </p>
                </div>

                <div className="font-mono text-xs text-muted-foreground border border-gold/20 px-3 py-1.5 rounded-full text-center">
                  Midnight Archive · {selectedImage.time}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
