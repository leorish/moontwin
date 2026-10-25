import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAudio } from "@/context/AudioContext";
import { Volume2, VolumeX, Play, Pause, Compass } from "lucide-react";

const SECTIONS = [
  { id: "prologue", label: "I. Prologue" },
  { id: "music", label: "II. Melodies" },
  { id: "book", label: "III. Shadow" },
  { id: "reader", label: "IV. The Reader" },
  { id: "krishna", label: "V. Mysticism" },
  { id: "italy", label: "VI. Italy" },
  { id: "terminal", label: "VII. Epilogue" },
];

export function NavigationHeader() {
  const [activeSection, setActiveSection] = useState("prologue");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { playing, toggle, isMuted, toggleMute } = useAudio();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);
      setIsScrolled(currentScroll > 80);

      // Identify active section
      for (const section of [...SECTIONS].reverse()) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top thin golden reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-background/20 backdrop-blur-xs">
        <motion.div
          className="h-full bg-gradient-to-r from-gold/50 via-gold to-gold-soft"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating editorial header */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-0 right-0 z-40 mx-auto max-w-5xl px-4 transition-all duration-500`}
      >
        <div
          className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
            isScrolled
              ? "glass-panel border border-gold/25 bg-background/70 shadow-2xl backdrop-blur-xl"
              : "bg-background/20 backdrop-blur-sm border border-gold/10"
          }`}
        >
          {/* Brand Monogram */}
          <button
            onClick={() => scrollToSection("prologue")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="font-serif italic text-base md:text-lg text-gold group-hover:text-gold-soft transition-colors tracking-wide">
              P · M
            </span>
            <span className="hidden sm:inline-block font-mono text-[9px] uppercase tracking-[0.35em] text-muted-foreground/80 group-hover:text-gold/80 transition-colors">
              Midnight Sanctuary
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5">
            {SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`text-[11px] font-mono uppercase tracking-[0.2em] transition-all cursor-pointer ${
                  activeSection === sec.id
                    ? "text-gold font-semibold scale-105 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                    : "text-muted-foreground/70 hover:text-foreground hover:scale-102"
                }`}
              >
                {sec.label}
              </button>
            ))}
          </nav>

          {/* Right Controls: Mini Audio Dock + Mobile Menu */}
          <div className="flex items-center gap-2.5">
            {/* Ambient Audio Pill */}
            <div className="flex items-center gap-2 rounded-full border border-gold/20 bg-background/50 px-3 py-1 backdrop-blur-md">
              <button
                onClick={toggle}
                className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-soft cursor-pointer transition-colors"
                title={playing ? "Pause Music" : "Play Music"}
                aria-label={playing ? "Pause Music" : "Play Music"}
              >
                {playing ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-gold text-gold" />
                    <span className="flex items-end gap-[2px] h-3">
                      <span className="w-[2px] bg-gold rounded-full animate-bar" style={{ height: "100%", animationDuration: "0.6s" }} />
                      <span className="w-[2px] bg-gold rounded-full animate-bar" style={{ height: "60%", animationDuration: "0.9s" }} />
                      <span className="w-[2px] bg-gold rounded-full animate-bar" style={{ height: "85%", animationDuration: "0.7s" }} />
                    </span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-gold text-gold" />
                    <span className="text-[10px] font-mono tracking-wider hidden sm:inline text-gold/80">Lana</span>
                  </>
                )}
              </button>

              <button
                onClick={toggleMute}
                className="text-muted-foreground hover:text-gold cursor-pointer transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Mobile Nav Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-full border border-gold/20 text-gold hover:text-gold-soft cursor-pointer transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              <Compass className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-4 right-4 z-40 lg:hidden rounded-2xl glass-panel border border-gold/25 p-5 shadow-2xl backdrop-blur-2xl"
          >
            <div className="grid grid-cols-2 gap-3">
              {SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`text-left p-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-colors ${
                    activeSection === sec.id
                      ? "bg-gold/15 text-gold border border-gold/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-gold/5"
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
