import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import albumArt from "@/assets/album-art.jpg";
import { PetalField } from "@/components/PetalField";
import petal from "@/assets/rose-petal.png";
import songAudio from "@/assets/summertime-sadness.mp3";

const AUDIO_URL = songAudio;

const lyricsWithTimestamps = [
  { time: 0, text: "🎵 (Intro Melancholy Music) 🎵" },
  { time: 13.5, text: "I got my red dress on tonight" },
  { time: 18.5, text: "Dancing in the dark in the pale moonlight" },
  { time: 23.5, text: "Done my hair up real big, beauty queen style" },
  { time: 28.5, text: "High heels off, I'm feeling alive" },
  { time: 33.5, text: "Oh my God, I feel it in the air" },
  { time: 38.5, text: "Telephone wires above all sizzlin' like a snare" },
  { time: 43.5, text: "Honey, I'm on fire, I feel it everywhere" },
  { time: 48.0, text: "Nothing scares me anymore" },
  { time: 52.0, text: "Kiss me hard before you go..." },
  { time: 56.0, text: "Summertime sadness..." },
  { time: 60.5, text: "I just wanted you to know" },
  { time: 64.5, text: "That baby, you're the best..." },
];

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function MusicSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeLyric, setActiveLyric] = useState(-1);
  const [audioReady, setAudioReady] = useState(false);
  const [audioError, setAudioError] = useState(false);

  // Collection of refs for all lyric buttons
  const lyricRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const getActiveLyricIndex = useCallback((time: number) => {
    let activeIndex = -1;
    for (let i = 0; i < lyricsWithTimestamps.length; i++) {
      if (time >= lyricsWithTimestamps[i].time) {
        activeIndex = i;
      } else {
        break;
      }
    }
    return activeIndex;
  }, []);

  // Smoothly scroll active lyric to container center
  useEffect(() => {
    if (activeLyric >= 0 && lyricRefs.current[activeLyric]) {
      lyricRefs.current[activeLyric]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeLyric]);

  // Seek and play from a specific lyric timestamp
  const handleLyricClick = useCallback((index: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const targetTime = lyricsWithTimestamps[index].time;
    audio.currentTime = targetTime;
    setCurrentTime(targetTime);
    setActiveLyric(index);
    if (duration > 0) {
      setProgress((targetTime / duration) * 100);
    }

    if (!playing) {
      audio.play().then(() => setPlaying(true)).catch((err) => {
        console.log("Playback failed to start:", err);
      });
    }
  }, [duration, playing]);

  // Sync play/pause state with the audio element
  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        // Browser may block autoplay; silently handle
        setPlaying(false);
      });
    }
  }, [playing]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      setActiveLyric(-1);
    };
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      setAudioReady(true);
    };
    const onCanPlay = () => setAudioReady(true);
    const onError = () => setAudioError(true);
    const onTimeUpdate = () => {
      const cur = audio.currentTime;
      const dur = audio.duration;
      setCurrentTime(cur);
      if (dur > 0) {
        setProgress((cur / dur) * 100);
      }
      setActiveLyric(getActiveLyricIndex(cur));
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("error", onError);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [getActiveLyricIndex]);

  // Click on progress bar to seek
  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      const bar = progressBarRef.current;
      if (!audio || !bar || !Number.isFinite(audio.duration)) return;

      const rect = bar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      const newTime = ratio * audio.duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(ratio * 100);
      setActiveLyric(getActiveLyricIndex(newTime));
    },
    [getActiveLyricIndex],
  );

  return (
    <section ref={ref} className="relative py-32 md:py-44">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={AUDIO_URL}
        preload="metadata"
      />

      <div className="mx-auto max-w-4xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.5em] text-gold/60"
        >
          II. Midnight Melodies
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.15 }}
          className="mb-16 text-center font-serif text-4xl italic text-gold-shimmer md:text-5xl"
        >
          The Songs That Haunt Us
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="glass-panel relative overflow-hidden rounded-xl p-6 md:p-10"
        >
          {/* Drifting rose petals across the player */}
          <PetalField count={8} size={16} className="opacity-60" />

          <div className="relative flex flex-col items-center gap-8 md:flex-row">
            {/* Album art */}
            <div className="relative shrink-0">
              <div
                className={`h-44 w-44 overflow-hidden rounded-lg shadow-gold md:h-52 md:w-52 ${playing ? "animate-glow-pulse" : ""}`}
              >
                <img
                  src={albumArt}
                  alt="Album art"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Player */}
            <div className="flex-1 text-center md:text-left">
              <p className="flex items-center justify-center gap-2 font-serif text-xl text-foreground md:justify-start md:text-2xl">
                <img
                  src={petal}
                  alt=""
                  width={18}
                  height={18}
                  className="h-4 w-4 opacity-80"
                  aria-hidden
                />
                Lana Del Rey
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.3em] text-gold/70">
                Midnight Melodies
              </p>

              {/* Visualizer bars */}
              <div
                className="mt-6 flex items-end justify-center gap-[3px] md:justify-start"
                style={{ height: 36 }}
              >
                {Array.from({ length: 28 }, (_, i) => (
                  <span
                    key={i}
                    className="inline-block w-[3px] rounded-full bg-gold/80"
                    style={{
                      height: playing ? undefined : 4,
                      animationName: playing ? "bar" : "none",
                      animationDuration: `${0.5 + Math.random() * 0.6}s`,
                      animationTimingFunction: "ease-in-out",
                      animationIterationCount: "infinite",
                      animationDelay: `${i * 0.04}s`,
                      transformOrigin: "bottom",
                      minHeight: 4,
                      maxHeight: 36,
                    }}
                  />
                ))}
              </div>

              {/* Seekable Progress Bar */}
              <div
                ref={progressBarRef}
                onClick={handleProgressClick}
                className="group mt-4 h-[6px] w-full cursor-pointer overflow-hidden rounded-full bg-muted transition-all hover:h-[8px]"
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                title="Click to seek"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold to-gold-soft transition-[width] duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Time display */}
              <div className="mt-1.5 flex justify-between font-mono text-[10px] tracking-wider text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Error message */}
              {audioError && (
                <p className="mt-2 font-mono text-[10px] text-destructive">
                  Audio failed to load. Check your connection.
                </p>
              )}

              <button
                onClick={toggle}
                disabled={audioError}
                className="magnetic mt-4 inline-flex items-center gap-3 rounded-full border border-gold/30 px-6 py-2 font-mono text-xs uppercase tracking-[0.3em] text-gold transition-colors hover:border-gold hover:text-gold-soft disabled:cursor-not-allowed disabled:opacity-40"
              >
                {playing ? "❚❚ Pause" : "▶ Play"}
              </button>
            </div>
          </div>

          {/* Song Play Caption Overlay */}
          <AnimatePresence mode="wait">
            {playing && (
              <motion.div
                key={activeLyric}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.4, cubicBezier: [0.16, 1, 0.3, 1] }}
                className="mt-8 border-y border-gold/15 bg-gradient-to-r from-transparent via-gold/5 to-transparent py-4 px-6 text-center backdrop-blur-[2px]"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-gold-soft/80 block mb-1.5 animate-pulse">
                  Now Singing
                </span>
                <p className="font-serif text-xl italic text-gold text-moonlight transition-all duration-300">
                  {activeLyric >= 0 ? lyricsWithTimestamps[activeLyric].text : "🎵 [Instrumental Intro] 🎵"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Lyrics viewport container with custom fade mask */}
          <div className="mt-10 text-center">
            <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/30">
              — Click a line to play from there —
            </p>
            <div
              className="h-64 overflow-y-auto px-4 py-8 space-y-4 scrollbar-none relative border-t border-gold/10"
              style={{
                maskImage: "linear-gradient(to bottom, transparent, white 25%, white 75%, transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent, white 25%, white 75%, transparent)",
              }}
            >
              {lyricsWithTimestamps.map((item, i) => (
                <button
                  key={i}
                  ref={(el) => {
                    lyricRefs.current[i] = el;
                  }}
                  onClick={() => handleLyricClick(i)}
                  className="block w-full text-center font-serif italic cursor-pointer outline-none focus:ring-0 py-1"
                  style={{
                    color: i === activeLyric ? "#d4af37" : "rgba(150, 150, 160, 0.35)",
                    opacity: i === activeLyric ? 1.0 : 0.35,
                    transform: i === activeLyric ? "scale(1.08)" : "scale(0.96)",
                    textShadow: i === activeLyric ? "0 0 15px rgba(212, 175, 55, 0.65)" : "none",
                    transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
                  }}
                >
                  {item.text}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
