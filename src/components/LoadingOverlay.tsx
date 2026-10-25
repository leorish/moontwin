import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingOverlayProps {
  onComplete: () => void;
}

export function LoadingOverlay({ onComplete }: LoadingOverlayProps) {
  const [text, setText] = useState("");
  const targetText = "Prachi: My Moon Twin";
  const [phase, setPhase] = useState<"black" | "particles" | "typing" | "glow" | "fade">("black");

  useEffect(() => {
    // Phase 1: Pure pitch black for 0.5s
    const t1 = setTimeout(() => {
      setPhase("particles");
    }, 500);

    // Phase 2: Fade in particles & transition overlay background
    const t2 = setTimeout(() => {
      setPhase("typing");
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (phase !== "typing") return;

    let index = 0;
    const interval = setInterval(() => {
      setText(targetText.slice(0, index + 1));
      index++;
      
      if (index >= targetText.length) {
        clearInterval(interval);
        
        // Wait and then trigger the celestial glowing phase
        setTimeout(() => {
          setPhase("glow");
          
          // Fade out the overlay entirely
          setTimeout(() => {
            setPhase("fade");
            
            // Invoke completion callback after exit transition finishes
            setTimeout(() => {
              onComplete();
            }, 1000);
          }, 1400);
        }, 600);
      }
    }, 85); // 85ms typing cadence

    return () => clearInterval(interval);
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "fade" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Subtle starry backdrop transitioning in */}
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,8,28,0.85)_0%,rgba(0,0,0,1)_100%)]"
            initial={{ opacity: 0 }}
            animate={phase !== "black" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <div className="relative flex flex-col items-center justify-center">
            {/* Glowing Typewritten text */}
            <motion.h1
              className="font-serif text-3xl md:text-5xl italic tracking-widest text-foreground/90 text-center px-4"
              initial={{ textShadow: "0 0 0px rgba(224,184,110,0)" }}
              animate={
                phase === "glow"
                  ? {
                      color: "var(--gold)",
                      textShadow: "0 0 25px rgba(224, 184, 110, 0.95), 0 0 50px rgba(224, 184, 110, 0.45)",
                      scale: 1.03,
                    }
                  : {}
              }
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {text}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block text-gold ml-1 font-mono"
              >
                |
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={phase === "glow" ? { opacity: 0.5, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-4 font-mono text-[9px] uppercase tracking-[0.6em] text-gold-soft"
            >
              entering the sanctuary
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
