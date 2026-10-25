import { useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import albumArt from "@/assets/album-art.jpg";
import { PetalField } from "@/components/PetalField";
import petal from "@/assets/rose-petal.png";
import { useAudio, LYRICS_WITH_TIMESTAMPS } from "@/context/AudioContext";
import { Play, Pause, SkipForward, SkipBack, Disc } from "lucide-react";

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function MusicSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const {
    playing,
    toggle,
    progress,
    currentTime,
    duration,
    seek,
    seekToTime,
    activeLyric,
    audioError,
  } = useAudio();

  const progressBarRef = useRef<HTMLDivElement>(null);
  const lyricRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Smoothly center active lyric in container
  useEffect(() => {
    if (activeLyric >= 0 && lyricRefs.current[activeLyric]) {
      lyricRefs.current[activeLyric]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeLyric]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressBarRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    seek(ratio);
  };

  const handleSkip = (direction: "forward" | "back") => {
    const nextIdx = direction === "forward" ? Math.min(LYRICS_WITH_TIMESTAMPS.length - 1, activeLyric + 1) : Math.max(0, activeLyric - 1);
    seekToTime(LYRICS_WITH_TIMESTAMPS[nextIdx].time);
  };

  return (
    <section id="music" ref={ref} className="relative py-28 md:py-40">
      <div className="mx-auto max-w-5xl px-6">
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
              II. Midnight Melodies
            </span>
            <span className="h-px w-8 bg-gold/40" />
          </div>
          <h2 className="font-serif text-4xl md:text-6xl italic text-gold-shimmer tracking-tight">
            The Songs That Haunt Us
          </h2>
          <p className="mt-4 font-serif text-base italic text-muted-foreground/80 max-w-md mx-auto">
            &ldquo;Dancing in the dark in the pale moonlight...&rdquo;
          </p>
        </motion.div>

        {/* Master Player Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="glass-panel relative overflow-hidden rounded-2xl border border-gold/25 p-6 md:p-12 shadow-2xl backdrop-blur-2xl"
        >
          <PetalField count={8} size={18} className="opacity-40" />

          <div className="relative flex flex-col items-center gap-10 lg:flex-row lg:items-start">
            {/* Spinning Vinyl Record & Album Art */}
            <div className="relative flex flex-col items-center shrink-0">
              <div className="relative group">
                {/* Glow ring */}
                <div
                  className={`absolute -inset-4 rounded-full bg-gold/15 blur-2xl transition-opacity duration-1000 ${
                    playing ? "opacity-100" : "opacity-30"
                  }`}
                />

                {/* Vinyl Record Behind Art */}
                <motion.div
                  animate={{ rotate: playing ? 360 : 0 }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  className="relative h-52 w-52 md:h-64 md:w-64 rounded-full bg-radial from-neutral-900 via-black to-neutral-950 p-2 shadow-2xl border border-gold/30 flex items-center justify-center"
                  style={{
                    boxShadow: "0 0 35px rgba(0,0,0,0.9), inset 0 0 25px rgba(212,175,55,0.2)",
                  }}
                >
                  {/* Subtle vinyl grooves */}
                  <div className="absolute inset-4 rounded-full border border-neutral-800/80 pointer-events-none" />
                  <div className="absolute inset-8 rounded-full border border-neutral-800/60 pointer-events-none" />
                  <div className="absolute inset-12 rounded-full border border-neutral-800/40 pointer-events-none" />

                  {/* Album Cover inside Center */}
                  <div className="relative h-28 w-28 md:h-36 md:w-36 rounded-full overflow-hidden border-2 border-gold/50 shadow-inner">
                    <img
                      src={albumArt}
                      alt="Album art - Lana Del Rey"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    {/* Vinyl Center Hole */}
                    <div className="absolute inset-0 m-auto h-5 w-5 rounded-full bg-background border border-gold/60 shadow" />
                  </div>
                </motion.div>
              </div>

              {/* Status Badge */}
              <div className="mt-4 flex items-center gap-2">
                <Disc className={`w-3.5 h-3.5 ${playing ? "text-gold animate-spin" : "text-muted-foreground"}`} />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold/80">
                  {playing ? "Groove Active · Playing" : "Vinyl Paused"}
                </span>
              </div>
            </div>

            {/* Player Controls & Visualizer */}
            <div className="flex-1 w-full text-center lg:text-left flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-center lg:justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground flex items-center justify-center lg:justify-start gap-2">
                      <img src={petal} alt="" className="h-4 w-4 opacity-75 inline" aria-hidden />
                      Summertime Sadness
                    </h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.3em] text-gold/80">
                      Lana Del Rey · Born to Die
                    </p>
                  </div>

                  {/* Edition Tag */}
                  <span className="hidden sm:inline-block rounded-full border border-gold/25 px-3 py-1 font-mono text-[10px] tracking-widest text-gold/90 bg-gold/5">
                    MASTER HI-FI
                  </span>
                </div>

                {/* Animated Frequency Bars */}
                <div className="mt-6 flex items-end justify-center lg:justify-start gap-[4px] h-10 px-1 py-1 bg-black/20 rounded-lg border border-gold/10">
                  {Array.from({ length: 36 }, (_, i) => (
                    <span
                      key={i}
                      className="inline-block w-[3px] rounded-full bg-gradient-to-t from-gold/40 to-gold"
                      style={{
                        height: playing ? undefined : "6px",
                        animationName: playing ? "bar" : "none",
                        animationDuration: `${0.45 + (i % 7) * 0.12}s`,
                        animationTimingFunction: "ease-in-out",
                        animationIterationCount: "infinite",
                        animationDelay: `${i * 0.03}s`,
                        transformOrigin: "bottom",
                        minHeight: "4px",
                        maxHeight: "36px",
                      }}
                    />
                  ))}
                </div>

                {/* Seekable Progress Bar */}
                <div
                  ref={progressBarRef}
                  onClick={handleProgressClick}
                  className="group mt-6 h-[8px] w-full cursor-pointer overflow-hidden rounded-full bg-muted/60 transition-all hover:h-[10px] relative border border-gold/15"
                  role="progressbar"
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold via-gold-soft to-white transition-[width] duration-150 relative"
                    style={{ width: `${progress}%` }}
                  >
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#d4af37]" />
                  </div>
                </div>

                {/* Timers */}
                <div className="mt-2 flex justify-between font-mono text-[11px] tracking-wider text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-gold/60">{formatTime(duration)}</span>
                </div>

                {/* Playback Controls */}
                <div className="mt-6 flex items-center justify-center lg:justify-start gap-4">
                  <button
                    onClick={() => handleSkip("back")}
                    className="p-3 rounded-full border border-gold/20 text-gold hover:border-gold hover:text-gold-soft hover:bg-gold/10 transition-all cursor-pointer"
                    title="Previous Lyric"
                    aria-label="Previous Lyric"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>

                  <button
                    onClick={toggle}
                    disabled={audioError}
                    className="flex items-center justify-center gap-3 rounded-full bg-gold px-8 py-3 font-mono text-xs uppercase tracking-[0.3em] font-semibold text-black transition-all hover:bg-gold-soft hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(212,175,55,0.4)] cursor-pointer disabled:opacity-40"
                  >
                    {playing ? (
                      <>
                        <Pause className="w-4 h-4 fill-black" /> Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-black ml-0.5" /> Play Sanctuary
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleSkip("forward")}
                    className="p-3 rounded-full border border-gold/20 text-gold hover:border-gold hover:text-gold-soft hover:bg-gold/10 transition-all cursor-pointer"
                    title="Next Lyric"
                    aria-label="Next Lyric"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Active Singing Callout */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLyric}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 rounded-xl border border-gold/15 bg-gold/5 p-3.5 text-center lg:text-left backdrop-blur-sm"
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-soft block mb-1">
                    ✦ Singing Now ✦
                  </span>
                  <p className="font-serif italic text-lg text-foreground/95">
                    {activeLyric >= 0 ? LYRICS_WITH_TIMESTAMPS[activeLyric].text : "🎵 [Melancholic Introduction] 🎵"}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Interactive Synchronized Lyric Reel */}
          <div className="mt-12 pt-8 border-t border-gold/15">
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold/60">
                Synchronized Stanzas
              </p>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
                Click any line to jump
              </span>
            </div>

            <div
              className="h-64 overflow-y-auto px-4 py-6 space-y-3.5 scrollbar-none relative rounded-xl bg-black/25 border border-gold/10"
              style={{
                maskImage: "linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)",
              }}
            >
              {LYRICS_WITH_TIMESTAMPS.map((item, i) => {
                const isActive = i === activeLyric;
                return (
                  <button
                    key={i}
                    ref={(el) => {
                      lyricRefs.current[i] = el;
                    }}
                    onClick={() => seekToTime(item.time)}
                    className={`block w-full text-center font-serif italic cursor-pointer transition-all duration-400 py-1.5 rounded-lg ${
                      isActive
                        ? "text-gold text-xl scale-105 font-medium drop-shadow-[0_0_14px_rgba(212,175,55,0.7)] bg-gold/10"
                        : "text-muted-foreground/50 hover:text-foreground/80 hover:scale-102 text-base"
                    }`}
                  >
                    {item.text}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
