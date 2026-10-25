import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { MagneticButton } from "@/components/MagneticButton";

export function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (!note.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setNote("");
    }, 3000);
  };

  return (
    <section ref={ref} className="relative py-32 md:py-44">
      <div className="mx-auto max-w-2xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.5em] text-gold/60"
        >
          VI. The Epilogue
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.15 }}
          className="mb-16 text-center font-serif text-4xl italic text-gold-shimmer md:text-5xl"
        >
          Leave A Note
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="glass-panel overflow-hidden rounded-xl"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 border-b border-border px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-destructive/70" />
            <span className="h-3 w-3 rounded-full bg-gold/50" />
            <span className="h-3 w-3 rounded-full bg-accent/60" />
            <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">sanctuary_terminal</span>
          </div>

          <div className="p-6 md:p-8">
            <p className="mb-4 font-mono text-xs text-muted-foreground">
              <span className="text-gold">guest@midnight</span>
              <span className="text-foreground/50">:~$</span> echo &quot;your message here&quot;
            </p>

            <div className="relative">
              <span className="absolute left-0 top-3 font-mono text-sm text-gold">&gt;_</span>
              <textarea
                className="w-full resize-none rounded-md border-0 bg-transparent py-2 pl-6 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:ring-0"
                rows={3}
                placeholder="Leave something for Prachi..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <span className="absolute bottom-3 left-6 animate-blink font-mono text-foreground/60">▌</span>
            </div>

            <div className="mt-6 flex justify-end">
              {sent ? (
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-mono text-xs text-gold"
                >
                  ✦ Sent into the midnight ether ✦
                </motion.p>
              ) : (
                <MagneticButton onClick={submit}>
                  Send ✦
                </MagneticButton>
              )}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="mt-20 text-center font-serif text-sm italic text-muted-foreground"
        >
          crafted with moonlight & devotion · for Prachi, always.
        </motion.p>
      </div>
    </section>
  );
}
