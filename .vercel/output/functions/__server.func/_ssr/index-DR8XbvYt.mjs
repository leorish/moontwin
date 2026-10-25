import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AnimatePresence, m as motion, a as useMotionValue, c as useSpring, u as useInView, b as useScroll, d as useTransform } from "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function AntigravityParticles({ count = 60, className = "" }) {
  const canvasRef = reactExports.useRef(null);
  const mouseRef = reactExports.useRef({ x: -1e3, y: -1e3 });
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId;
    let particles = [];
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };
    const initParticles = () => {
      particles = [];
      const types = ["moon", "star", "petal"];
      for (let i = 0; i < count; i++) {
        const type = types[i % 3];
        const size = type === "moon" ? 8 + Math.random() * 10 : type === "star" ? 2 + Math.random() * 4 : 6 + Math.random() * 8;
        const baseVy = -(0.3 + Math.random() * 0.7);
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: baseVy,
          baseVy,
          size,
          type,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          opacity: 0.15 + Math.random() * 0.45
        });
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1e3, y: -1e3 };
    };
    const container = canvas.parentElement || window;
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    const drawCrescentMoon = (c, x, y, r, rot, alpha) => {
      c.save();
      c.translate(x, y);
      c.rotate(rot);
      c.beginPath();
      c.arc(0, 0, r, Math.PI * 0.2, Math.PI * 1.8, false);
      c.arc(r * 0.45, 0, r * 0.85, Math.PI * 1.7, Math.PI * 0.3, true);
      c.closePath();
      c.fillStyle = `rgba(224, 184, 110, ${alpha})`;
      c.shadowBlur = 10;
      c.shadowColor = `rgba(224, 184, 110, ${alpha * 0.5})`;
      c.fill();
      c.restore();
    };
    const drawStar = (c, x, y, r, alpha) => {
      c.save();
      c.beginPath();
      c.arc(x, y, r, 0, Math.PI * 2);
      c.fillStyle = `rgba(180, 220, 255, ${alpha})`;
      c.shadowBlur = 15;
      c.shadowColor = `rgba(0, 243, 255, ${alpha})`;
      c.fill();
      c.restore();
    };
    const drawPetal = (c, x, y, r, rot, alpha) => {
      c.save();
      c.translate(x, y);
      c.rotate(rot);
      c.beginPath();
      c.ellipse(0, 0, r * 1.2, r * 0.7, 0, 0, Math.PI * 2);
      c.fillStyle = `rgba(20, 5, 12, ${alpha})`;
      c.strokeStyle = `rgba(106, 13, 173, ${alpha * 0.45})`;
      c.lineWidth = 1.2;
      c.shadowBlur = 6;
      c.shadowColor = `rgba(106, 13, 173, ${alpha * 0.3})`;
      c.fill();
      c.stroke();
      c.restore();
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;
      const repelRadius = 140;
      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 0.8;
          p.vy += Math.sin(angle) * force * 0.8;
        }
        p.vx *= 0.94;
        p.vy = p.vy * 0.94 + p.baseVy * 0.06;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
          p.vx = (Math.random() - 0.5) * 0.4;
          p.vy = p.baseVy;
        }
        if (p.x < -20) {
          p.x = canvas.width + 20;
        } else if (p.x > canvas.width + 20) {
          p.x = -20;
        }
        if (p.type === "moon") {
          drawCrescentMoon(ctx, p.x, p.y, p.size, p.rotation, p.opacity);
        } else if (p.type === "star") {
          drawStar(ctx, p.x, p.y, p.size, p.opacity);
        } else {
          drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.opacity);
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [count]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      className: `pointer-events-none absolute inset-0 block h-full w-full ${className}`,
      style: { mixBlendMode: "screen" }
    }
  );
}
function InteractiveText({ text, className = "" }) {
  const [isHovered, setIsHovered] = reactExports.useState(false);
  const letters = text.split("");
  const containerVariants = {
    initial: {},
    hover: {
      transition: {
        staggerChildren: 0.04
      }
    }
  };
  const letterVariants = {
    initial: { y: 0, scale: 1 },
    hover: {
      y: [0, -10, 0],
      scale: [1, 1.15, 1],
      transition: {
        duration: 0.65,
        ease: "easeInOut"
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.span,
    {
      className: `relative inline-block cursor-default ${className}`,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      variants: containerVariants,
      initial: "initial",
      animate: isHovered ? "hover" : "initial",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            className: "pointer-events-none absolute left-1/2 top-1/2 -z-10 h-32 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15",
            style: { filter: "blur(30px)" },
            initial: { scale: 0.4, opacity: 0 },
            animate: isHovered ? { scale: 1.4, opacity: 0.8, filter: "blur(35px)" } : { scale: 0.4, opacity: 0, filter: "blur(30px)" },
            transition: { duration: 0.5, ease: "easeOut" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative flex justify-center flex-wrap", children: letters.map((char, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            variants: letterVariants,
            className: "inline-block origin-bottom font-serif",
            style: {
              // Keep space characters formatted as normal spaces
              marginRight: char === " " ? "0.25em" : "0.02em"
            },
            children: char === " " ? " " : char
          },
          index
        )) })
      ]
    }
  );
}
const moon = "/assets/hero-moon-xLH8lPoP.jpg";
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: moon,
          alt: "Glowing crescent moon over cosmic midnight sky",
          width: 1920,
          height: 1080,
          className: "h-full w-full object-cover opacity-60"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AntigravityParticles, { count: 80 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 60, filter: "blur(20px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0)" },
        transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
        className: "relative z-10 mx-auto max-w-5xl text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.6, duration: 1.2 },
              className: "mb-6 font-mono text-[10px] uppercase tracking-[0.6em] text-gold/70",
              children: "⟢  A Sanctuary For Prachi  ⟣"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.h1,
            {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.9, duration: 1.4 },
              className: "font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block italic text-foreground/85 flex justify-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InteractiveText, { text: "Prachi" }),
                  ":"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 block text-gold-shimmer", children: "The Celestial" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 block italic text-foreground/85", children: "Prologue" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.p,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 1.6, duration: 1.4 },
              className: "mx-auto mt-10 max-w-xl font-serif text-lg italic text-moonlight md:text-xl",
              children: [
                "to my ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(InteractiveText, { text: "Moon Twin" }),
                " —",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "the quiet stanza I keep returning to."
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 2.1, duration: 1 },
              className: "mt-14 flex items-center justify-center gap-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-16 bg-gradient-to-r from-transparent to-gold/60" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-[0.5em] text-muted-foreground", children: "scroll" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-16 bg-gradient-to-l from-transparent to-gold/60" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const albumArt = "/assets/album-art-r6nA5FnO.jpg";
const petal = "/assets/rose-petal-D_STdajr.png";
function PetalField({ count = 14, className = "", size = 22 }) {
  const petals = reactExports.useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 16 + Math.random() * 18,
      size: size * (0.6 + Math.random() * 1.1),
      drift: (Math.random() - 0.5) * 120,
      rotate: Math.random() * 360,
      opacity: 0.25 + Math.random() * 0.55
    })),
    [count, size]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `pointer-events-none absolute inset-0 overflow-hidden ${className}`, "aria-hidden": true, children: petals.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: petal,
      alt: "",
      width: p.size,
      height: p.size,
      style: {
        position: "absolute",
        top: "-10%",
        left: `${p.left}%`,
        width: p.size,
        height: p.size,
        opacity: p.opacity,
        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.6))",
        animation: `petalFall ${p.duration}s linear ${p.delay}s infinite`,
        ["--drift"]: `${p.drift}px`,
        ["--rot"]: `${p.rotate}deg`
      }
    },
    p.id
  )) });
}
const songAudio = "/assets/summertime-sadness-C9Ny8Zp4.mp3";
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
  { time: 48, text: "Nothing scares me anymore" },
  { time: 52, text: "Kiss me hard before you go..." },
  { time: 56, text: "Summertime sadness..." },
  { time: 60.5, text: "I just wanted you to know" },
  { time: 64.5, text: "That baby, you're the best..." }
];
function formatTime(sec) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
function MusicSection() {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const audioRef = reactExports.useRef(null);
  const progressBarRef = reactExports.useRef(null);
  const [playing, setPlaying] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  const [currentTime, setCurrentTime] = reactExports.useState(0);
  const [duration, setDuration] = reactExports.useState(0);
  const [activeLyric, setActiveLyric] = reactExports.useState(-1);
  const [audioReady, setAudioReady] = reactExports.useState(false);
  const [audioError, setAudioError] = reactExports.useState(false);
  const lyricRefs = reactExports.useRef([]);
  const getActiveLyricIndex = reactExports.useCallback((time) => {
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
  reactExports.useEffect(() => {
    if (activeLyric >= 0 && lyricRefs.current[activeLyric]) {
      lyricRefs.current[activeLyric]?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [activeLyric]);
  const handleLyricClick = reactExports.useCallback((index) => {
    const audio = audioRef.current;
    if (!audio) return;
    const targetTime = lyricsWithTimestamps[index].time;
    audio.currentTime = targetTime;
    setCurrentTime(targetTime);
    setActiveLyric(index);
    if (duration > 0) {
      setProgress(targetTime / duration * 100);
    }
    if (!playing) {
      audio.play().then(() => setPlaying(true)).catch((err) => {
        console.log("Playback failed to start:", err);
      });
    }
  }, [duration, playing]);
  const toggle = reactExports.useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        setPlaying(false);
      });
    }
  }, [playing]);
  reactExports.useEffect(() => {
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
        setProgress(cur / dur * 100);
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
  const handleProgressClick = reactExports.useCallback(
    (e) => {
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
    [getActiveLyricIndex]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref, className: "relative py-32 md:py-44", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "audio",
      {
        ref: audioRef,
        src: AUDIO_URL,
        preload: "metadata"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 20 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 1 },
          className: "mb-4 text-center font-mono text-[10px] uppercase tracking-[0.5em] text-gold/60",
          children: "II. Midnight Melodies"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h2,
        {
          initial: { opacity: 0, y: 30 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 1.1, delay: 0.15 },
          className: "mb-16 text-center font-serif text-4xl italic text-gold-shimmer md:text-5xl",
          children: "The Songs That Haunt Us"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 40 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 1.2, delay: 0.3 },
          className: "glass-panel relative overflow-hidden rounded-xl p-6 md:p-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PetalField, { count: 8, size: 16, className: "opacity-60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center gap-8 md:flex-row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `h-44 w-44 overflow-hidden rounded-lg shadow-gold md:h-52 md:w-52 ${playing ? "animate-glow-pulse" : ""}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: albumArt,
                      alt: "Album art",
                      width: 400,
                      height: 400,
                      className: "h-full w-full object-cover",
                      loading: "lazy"
                    }
                  )
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center md:text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center justify-center gap-2 font-serif text-xl text-foreground md:justify-start md:text-2xl", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: petal,
                      alt: "",
                      width: 18,
                      height: 18,
                      className: "h-4 w-4 opacity-80",
                      "aria-hidden": true
                    }
                  ),
                  "Lana Del Rey"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-mono text-xs uppercase tracking-[0.3em] text-gold/70", children: "Midnight Melodies" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "mt-6 flex items-end justify-center gap-[3px] md:justify-start",
                    style: { height: 36 },
                    children: Array.from({ length: 28 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "inline-block w-[3px] rounded-full bg-gold/80",
                        style: {
                          height: playing ? void 0 : 4,
                          animationName: playing ? "bar" : "none",
                          animationDuration: `${0.5 + Math.random() * 0.6}s`,
                          animationTimingFunction: "ease-in-out",
                          animationIterationCount: "infinite",
                          animationDelay: `${i * 0.04}s`,
                          transformOrigin: "bottom",
                          minHeight: 4,
                          maxHeight: 36
                        }
                      },
                      i
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    ref: progressBarRef,
                    onClick: handleProgressClick,
                    className: "group mt-4 h-[6px] w-full cursor-pointer overflow-hidden rounded-full bg-muted transition-all hover:h-[8px]",
                    role: "progressbar",
                    "aria-valuenow": Math.round(progress),
                    "aria-valuemin": 0,
                    "aria-valuemax": 100,
                    title: "Click to seek",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-full rounded-full bg-gradient-to-r from-gold to-gold-soft transition-[width] duration-150",
                        style: { width: `${progress}%` }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex justify-between font-mono text-[10px] tracking-wider text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatTime(currentTime) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatTime(duration) })
                ] }),
                audioError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-mono text-[10px] text-destructive", children: "Audio failed to load. Check your connection." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: toggle,
                    disabled: audioError,
                    className: "magnetic mt-4 inline-flex items-center gap-3 rounded-full border border-gold/30 px-6 py-2 font-mono text-xs uppercase tracking-[0.3em] text-gold transition-colors hover:border-gold hover:text-gold-soft disabled:cursor-not-allowed disabled:opacity-40",
                    children: playing ? "❚❚ Pause" : "▶ Play"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: playing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 15, scale: 0.98 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: -15, scale: 0.98 },
                transition: { duration: 0.4, cubicBezier: [0.16, 1, 0.3, 1] },
                className: "mt-8 border-y border-gold/15 bg-gradient-to-r from-transparent via-gold/5 to-transparent py-4 px-6 text-center backdrop-blur-[2px]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] uppercase tracking-[0.4em] text-gold-soft/80 block mb-1.5 animate-pulse", children: "Now Singing" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-xl italic text-gold text-moonlight transition-all duration-300", children: activeLyric >= 0 ? lyricsWithTimestamps[activeLyric].text : "🎵 [Instrumental Intro] 🎵" })
                ]
              },
              activeLyric
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/30", children: "— Click a line to play from there —" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-64 overflow-y-auto px-4 py-8 space-y-4 scrollbar-none relative border-t border-gold/10",
                  style: {
                    maskImage: "linear-gradient(to bottom, transparent, white 25%, white 75%, transparent)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent, white 25%, white 75%, transparent)"
                  },
                  children: lyricsWithTimestamps.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      ref: (el) => {
                        lyricRefs.current[i] = el;
                      },
                      onClick: () => handleLyricClick(i),
                      className: "block w-full text-center font-serif italic cursor-pointer outline-none focus:ring-0 py-1",
                      style: {
                        color: i === activeLyric ? "#d4af37" : "rgba(150, 150, 160, 0.35)",
                        opacity: i === activeLyric ? 1 : 0.35,
                        transform: i === activeLyric ? "scale(1.08)" : "scale(0.96)",
                        textShadow: i === activeLyric ? "0 0 15px rgba(212, 175, 55, 0.65)" : "none",
                        transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)"
                      },
                      children: item.text
                    },
                    i
                  ))
                }
              )
            ] })
          ]
        }
      )
    ] })
  ] });
}
const bookImg = "/assets/book-adeline-ShgdaYvB.jpg";
const roseCluster = "/assets/rose-cluster-5_TRe-eJ.png";
const quote = `"His eyes are tracing my curves like they're scripture, and he's a sinner that is searching for proof of a God that he no longer can hear. When you make someone fall in love with the darkest parts of you, there's nothing you can do that will scare them away. They will be yours forever because they already love all the broken bits and pieces of you."`;
function BookSection() {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = reactExports.useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0.15, 0.7]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: "relative py-32 md:py-44", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.p,
      {
        initial: { opacity: 0, y: 20 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 1 },
        className: "mb-4 text-center font-mono text-[10px] uppercase tracking-[0.5em] text-gold/60",
        children: "III. The Shadow's Whisper"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.h2,
      {
        initial: { opacity: 0, y: 30 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 1.1, delay: 0.15 },
        className: "mb-16 text-center font-serif text-4xl italic text-gold-shimmer md:text-5xl",
        children: "Haunting Adeline"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 50 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 1.2, delay: 0.3 },
        className: "gold-border relative overflow-hidden rounded-xl",
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "pointer-events-none absolute inset-0 rounded-xl",
              style: {
                opacity: glowOpacity,
                boxShadow: hovered ? "inset 0 0 60px -10px color-mix(in oklab, var(--gold) 55%, transparent), 0 0 80px -10px color-mix(in oklab, var(--gold) 50%, transparent)" : "inset 0 0 30px -15px color-mix(in oklab, var(--gold) 25%, transparent), 0 0 30px -15px color-mix(in oklab, var(--gold) 20%, transparent)",
                transition: "box-shadow 1.2s ease"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-stretch md:flex-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: roseCluster,
                alt: "",
                "aria-hidden": true,
                loading: "lazy",
                width: 1024,
                height: 1024,
                className: "pointer-events-none absolute -right-12 -top-16 z-20 w-56 select-none opacity-80 mix-blend-screen md:-right-16 md:-top-20 md:w-72",
                style: { filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.8))" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: roseCluster,
                alt: "",
                "aria-hidden": true,
                loading: "lazy",
                width: 1024,
                height: 1024,
                className: "pointer-events-none absolute -bottom-14 -left-10 z-20 w-44 -scale-x-100 select-none opacity-70 mix-blend-screen md:-bottom-16 md:-left-14 md:w-60",
                style: { filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.8))" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] w-full shrink-0 md:w-72 lg:w-80", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: bookImg, alt: "Haunting Adeline", className: "h-full w-full object-cover", loading: "lazy", width: 400, height: 530 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center p-8 md:p-12", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-[0.4em] text-gold/70", children: "Haunting Adeline · USA Today Bestselling Author" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-serif text-2xl text-foreground md:text-3xl", children: "Haunting Adeline" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-mono text-[11px] uppercase tracking-[0.3em] text-gold/60", children: "by H.D. Carlton" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "mt-8 border-l-2 border-gold/40 pl-6 font-serif text-base italic leading-relaxed text-muted-foreground md:text-lg", children: quote })
            ] })
          ] })
        ]
      }
    )
  ] }) });
}
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
  "So find her and keep her and make her your wf."
];
function ReaderSection() {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.55], [0.1, 0.6]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref, className: "relative overflow-hidden py-32 md:py-48", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background via-cosmic-deep/30 to-background opacity-70 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.img,
      {
        src: roseCluster,
        alt: "",
        "aria-hidden": true,
        loading: "lazy",
        width: 1024,
        height: 1024,
        style: { y: parallaxY },
        className: "pointer-events-none absolute -right-20 -top-24 z-10 w-72 select-none opacity-60 mix-blend-screen md:w-96"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.img,
      {
        src: roseCluster,
        alt: "",
        "aria-hidden": true,
        loading: "lazy",
        width: 1024,
        height: 1024,
        style: { y: parallaxY },
        className: "pointer-events-none absolute -bottom-20 -left-16 z-10 w-60 -scale-x-100 select-none opacity-50 mix-blend-screen md:w-80"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: petal,
        alt: "",
        "aria-hidden": true,
        loading: "lazy",
        width: 120,
        height: 120,
        className: "pointer-events-none absolute right-12 top-1/3 z-10 w-16 animate-float select-none opacity-40 md:w-24",
        style: { animationDelay: "1.5s", filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.7))" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-20 mx-auto max-w-3xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 20 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 1 },
          className: "mb-4 text-center font-mono text-[10px] uppercase tracking-[0.5em] text-gold/60",
          children: "✦   A letter to him   ✦"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h2,
        {
          initial: { opacity: 0, y: 30 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 1.1, delay: 0.15 },
          className: "mb-6 text-center font-serif text-4xl italic text-gold-shimmer md:text-5xl",
          children: "Find a Girl That Reads"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { scaleX: 0, opacity: 0 },
          animate: isInView ? { scaleX: 1, opacity: 1 } : {},
          transition: { duration: 1.2, delay: 0.3 },
          className: "mx-auto mb-16 h-px w-32 origin-center bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 50 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 1.3, delay: 0.4 },
          className: "gold-border relative overflow-hidden rounded-2xl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "pointer-events-none absolute inset-0 rounded-2xl",
                style: {
                  opacity: glowOpacity,
                  boxShadow: "inset 0 0 60px -10px color-mix(in oklab, var(--gold) 40%, transparent), 0 0 80px -15px color-mix(in oklab, var(--gold) 35%, transparent)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-panel relative rounded-2xl px-8 py-12 md:px-14 md:py-16", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0.5", children: lines.map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { opacity: 0, x: -18, filter: "blur(5px)" },
                  animate: isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {},
                  transition: {
                    duration: 0.9,
                    delay: 0.55 + i * 0.035,
                    ease: [0.16, 1, 0.3, 1]
                  },
                  className: line === "" ? "h-5" : "font-serif text-base italic leading-relaxed text-muted-foreground md:text-lg",
                  children: line
                },
                i
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: isInView ? { opacity: 1, y: 0 } : {},
                  transition: { duration: 1, delay: 0.55 + lines.length * 0.035 + 0.2 },
                  className: "mt-12 flex items-center gap-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-[0.4em] text-gold/50", children: "— for the one who reads" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" })
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] })
  ] });
}
const fluteImg = "/assets/krishna-flute-DmsGFIw8.jpg";
const thoughts = [
  { title: "On Love", text: "The soul is neither born, and nor does it die. When you love with divine purity, you become eternal." },
  { title: "On Surrender", text: "Abandon all varieties of paths and simply surrender unto Me. I shall deliver you from all sinful reactions. Do not fear." },
  { title: "On Being", text: "You have the right to perform your prescribed duties, but you are not entitled to the fruits of your actions." }
];
function KrishnaSection() {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref, className: "relative overflow-hidden py-32 md:py-44", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-cosmic-deep via-cosmic to-background opacity-60" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mx-auto max-w-6xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 20 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 1 },
          className: "mb-4 text-center font-mono text-[10px] uppercase tracking-[0.5em] text-gold/60",
          children: "IV. The Cosmic Flute"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h2,
        {
          initial: { opacity: 0, y: 30 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 1.1, delay: 0.15 },
          className: "mb-16 text-center font-serif text-4xl italic text-gold-shimmer md:text-5xl",
          children: "Divine Mysticism"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-16 lg:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -50 },
            animate: isInView ? { opacity: 1, x: 0 } : {},
            transition: { duration: 1.3, delay: 0.3 },
            className: "shrink-0",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative animate-float overflow-hidden rounded-2xl shadow-gold", style: { width: 280 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: fluteImg, alt: "Golden peacock feather and flute", loading: "lazy", width: 280, height: 373, className: "h-auto w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: petal,
                  alt: "",
                  "aria-hidden": true,
                  width: 120,
                  height: 120,
                  className: "pointer-events-none absolute -bottom-6 -right-6 w-28 opacity-80",
                  style: { filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.8))" }
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 flex-col gap-6", children: thoughts.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 40 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 1, delay: 0.5 + i * 0.2 },
            className: "glass-panel magnetic rounded-xl p-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 font-serif text-xl text-gold", children: t.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif italic leading-relaxed text-muted-foreground", children: t.text })
            ]
          },
          i
        )) })
      ] })
    ] })
  ] });
}
const img1 = "/assets/italy-1-_pFqDh8x.jpg";
const img2 = "/assets/italy-2-uFLZOorm.jpg";
const img3 = "/assets/italy-3-DPgm-TYe.jpg";
const img4 = "/assets/italy-4-5lorlt6G.jpg";
const images = [
  { src: img1, alt: "Rain-slicked Roman street at night", span: "col-span-1 row-span-2" },
  { src: img2, alt: "Dark Italian espresso bar", span: "col-span-1 row-span-1" },
  { src: img3, alt: "Florence architecture under lamplight", span: "col-span-1 row-span-1" },
  { src: img4, alt: "Venetian alley with hanging lanterns", span: "col-span-1 row-span-2" }
];
function ItalyGallery() {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: "relative py-32 md:py-44", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.p,
      {
        initial: { opacity: 0, y: 20 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 1 },
        className: "mb-4 text-center font-mono text-[10px] uppercase tracking-[0.5em] text-gold/60",
        children: "V. Aesthetic Italian Evenings"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.h2,
      {
        initial: { opacity: 0, y: 30 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 1.1, delay: 0.15 },
        className: "mb-16 text-center font-serif text-4xl italic text-gold-shimmer md:text-5xl",
        children: "Italy, In Monochrome"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid auto-rows-[200px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4 md:gap-4", children: images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 50, scale: 0.95 },
        animate: isInView ? { opacity: 1, y: 0, scale: 1 } : {},
        transition: { duration: 1, delay: 0.3 + i * 0.15 },
        className: `magnetic group relative overflow-hidden rounded-lg ${img.span}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: img.src,
              alt: img.alt,
              loading: "lazy",
              width: 600,
              height: 800,
              className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110",
              style: { filter: "grayscale(0.15)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              "aria-hidden": true,
              className: "pointer-events-none absolute inset-0 rounded-lg",
              style: {
                boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--gold) 25%, transparent)",
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><g fill='none' stroke='%230a0a0a' stroke-width='0.6' opacity='0.6'><circle cx='8' cy='8' r='3'/><path d='M8 5 Q10 6.5 8 8 Q6 6.5 8 5Z M5 8 Q6.5 10 8 8 Q6.5 6 5 8Z'/><circle cx='52' cy='52' r='3'/></g></svg>")`,
                backgroundRepeat: "repeat",
                mixBlendMode: "overlay"
              }
            }
          )
        ]
      },
      i
    )) })
  ] }) });
}
function MagneticButton({ children, className = "", onClick, ...props }) {
  const ref = reactExports.useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  const handleClick = (e) => {
    const el = ref.current;
    if (el) {
      const burst = document.createElement("span");
      burst.style.position = "absolute";
      burst.style.inset = "0";
      burst.style.pointerEvents = "none";
      burst.style.overflow = "visible";
      const particleCount = 18;
      for (let i = 0; i < particleCount; i++) {
        const isHeart = Math.random() > 0.5;
        const size = isHeart ? 12 + Math.random() * 12 : 8 + Math.random() * 14;
        const angle = Math.random() * Math.PI * 2;
        const speed = 60 + Math.random() * 130;
        const bx = Math.cos(angle) * speed;
        const by = Math.sin(angle) * speed;
        const br = (Math.random() - 0.5) * 720;
        const p = document.createElement("span");
        p.style.position = "absolute";
        p.style.left = "50%";
        p.style.top = "50%";
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.marginLeft = `-${size / 2}px`;
        p.style.marginTop = `-${size / 2}px`;
        if (isHeart) {
          p.innerHTML = `<svg viewBox="0 0 24 24" fill="var(--gold)" width="100%" height="100%"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
          p.style.filter = "drop-shadow(0 0 8px rgba(224, 184, 110, 0.75))";
        } else {
          const img = document.createElement("img");
          img.src = petal;
          img.style.width = "100%";
          img.style.height = "100%";
          p.appendChild(img);
          p.style.filter = "brightness(0.12) sepia(1) hue-rotate(280deg) saturate(3.5) drop-shadow(0 4px 6px rgba(0,0,0,0.65))";
        }
        p.style.setProperty("--bx", `${bx}px`);
        p.style.setProperty("--by", `${by}px`);
        p.style.setProperty("--br", `${br}deg`);
        p.style.animation = `whimsicalBurst ${1 + Math.random() * 0.5}s cubic-bezier(0.1, 0.8, 0.2, 1) forwards`;
        burst.appendChild(p);
      }
      el.appendChild(burst);
      setTimeout(() => burst.remove(), 1600);
    }
    onClick?.(e);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      ref,
      onMouseMove: onMove,
      onMouseLeave: onLeave,
      onClick: handleClick,
      className: `magnetic group relative inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-background/40 px-7 py-3 font-sans text-sm uppercase tracking-[0.25em] text-gold transition-colors duration-500 hover:border-gold hover:text-gold-soft ${className}`,
      style: { transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.4s, color 0.4s" },
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            style: { boxShadow: "0 0 40px -5px color-mix(in oklab, var(--gold) 75%, transparent), inset 0 0 25px -10px color-mix(in oklab, var(--gold) 60%, transparent)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-700 group-hover:opacity-25",
            style: {
              backgroundImage: `url(${petal})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
              filter: "blur(0.5px)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10", children })
      ]
    }
  );
}
function Terminal() {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [note, setNote] = reactExports.useState("");
  const [sent, setSent] = reactExports.useState(false);
  const submit = () => {
    if (!note.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setNote("");
    }, 3e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: "relative py-32 md:py-44", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.p,
      {
        initial: { opacity: 0, y: 20 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 1 },
        className: "mb-4 text-center font-mono text-[10px] uppercase tracking-[0.5em] text-gold/60",
        children: "VI. The Epilogue"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.h2,
      {
        initial: { opacity: 0, y: 30 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 1.1, delay: 0.15 },
        className: "mb-16 text-center font-serif text-4xl italic text-gold-shimmer md:text-5xl",
        children: "Leave A Note"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 40 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 1.2, delay: 0.3 },
        className: "glass-panel overflow-hidden rounded-xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-border px-5 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-destructive/70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-gold/50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-accent/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground", children: "sanctuary_terminal" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-4 font-mono text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "guest@midnight" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/50", children: ":~$" }),
              ' echo "your message here"'
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-0 top-3 font-mono text-sm text-gold", children: ">_" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  className: "w-full resize-none rounded-md border-0 bg-transparent py-2 pl-6 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:ring-0",
                  rows: 3,
                  placeholder: "Leave something for Prachi...",
                  value: note,
                  onChange: (e) => setNote(e.target.value)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-3 left-6 animate-blink font-mono text-foreground/60", children: "▌" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-end", children: sent ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                className: "font-mono text-xs text-gold",
                children: "✦ Sent into the midnight ether ✦"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(MagneticButton, { onClick: submit, children: "Send ✦" }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.p,
      {
        initial: { opacity: 0 },
        animate: isInView ? { opacity: 1 } : {},
        transition: { delay: 1.5, duration: 1.5 },
        className: "mt-20 text-center font-serif text-sm italic text-muted-foreground",
        children: "crafted with moonlight & devotion · for Prachi, always."
      }
    )
  ] }) });
}
function LoadingOverlay({ onComplete }) {
  const [text, setText] = reactExports.useState("");
  const targetText = "Prachi: My Moon Twin";
  const [phase, setPhase] = reactExports.useState("black");
  reactExports.useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase("particles");
    }, 500);
    const t2 = setTimeout(() => {
      setPhase("typing");
    }, 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  reactExports.useEffect(() => {
    if (phase !== "typing") return;
    let index = 0;
    const interval = setInterval(() => {
      setText(targetText.slice(0, index + 1));
      index++;
      if (index >= targetText.length) {
        clearInterval(interval);
        setTimeout(() => {
          setPhase("glow");
          setTimeout(() => {
            setPhase("fade");
            setTimeout(() => {
              onComplete();
            }, 1e3);
          }, 1400);
        }, 600);
      }
    }, 85);
    return () => clearInterval(interval);
  }, [phase, onComplete]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: phase !== "fade" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black select-none",
      initial: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 1.2, ease: "easeInOut" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,8,28,0.85)_0%,rgba(0,0,0,1)_100%)]",
            initial: { opacity: 0 },
            animate: phase !== "black" ? { opacity: 1 } : { opacity: 0 },
            transition: { duration: 1.5, ease: "easeInOut" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.h1,
            {
              className: "font-serif text-3xl md:text-5xl italic tracking-widest text-foreground/90 text-center px-4",
              initial: { textShadow: "0 0 0px rgba(224,184,110,0)" },
              animate: phase === "glow" ? {
                color: "var(--gold)",
                textShadow: "0 0 25px rgba(224, 184, 110, 0.95), 0 0 50px rgba(224, 184, 110, 0.45)",
                scale: 1.03
              } : {},
              transition: { duration: 0.8, ease: "easeOut" },
              children: [
                text,
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    animate: { opacity: [0, 1, 0] },
                    transition: { repeat: Infinity, duration: 0.8 },
                    className: "inline-block text-gold ml-1 font-mono",
                    children: "|"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 15 },
              animate: phase === "glow" ? { opacity: 0.5, y: 0 } : { opacity: 0 },
              transition: { duration: 0.6 },
              className: "mt-4 font-mono text-[9px] uppercase tracking-[0.6em] text-gold-soft",
              children: "entering the sanctuary"
            }
          )
        ] })
      ]
    }
  ) });
}
function CustomCursor() {
  const [isVisible, setIsVisible] = reactExports.useState(false);
  const cursorRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const sparklesRef = reactExports.useRef([]);
  reactExports.useEffect(() => {
    document.body.classList.add("custom-cursor-active");
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animFrameId;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    const onMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      const { clientX, clientY } = e;
      cursorX.set(clientX);
      cursorY.set(clientY);
      const count = Math.random() > 0.4 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        sparklesRef.current.push({
          x: clientX,
          y: clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 + 0.3,
          // Slow drift down/out
          size: 1.5 + Math.random() * 3,
          alpha: 1,
          color: Math.random() > 0.3 ? "rgba(224, 184, 110, 1)" : "rgba(255, 235, 180, 1)"
          // Gold stardust
        });
      }
    };
    const onMouseLeave = () => {
      setIsVisible(false);
    };
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    const updateAndDrawSparkles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const sparkles = sparklesRef.current;
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.024;
        s.size *= 0.96;
        if (s.alpha <= 0 || s.size <= 0.2) {
          sparkles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color.replace(", 1)", `, ${s.alpha})`);
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(224, 184, 110, ${s.alpha})`;
        ctx.fill();
        ctx.restore();
      }
      animFrameId = requestAnimationFrame(updateAndDrawSparkles);
    };
    updateAndDrawSparkles();
    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animFrameId);
    };
  }, [isVisible]);
  if (!isVisible) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "canvas",
      {
        ref: canvasRef,
        className: "pointer-events-none fixed inset-0 z-50 h-full w-full select-none",
        style: { mixBlendMode: "screen" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        ref: cursorRef,
        style: {
          x: springX,
          y: springY,
          translateX: "-40%",
          translateY: "-40%"
        },
        className: "pointer-events-none fixed left-0 top-0 z-50 select-none mix-blend-difference",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "svg",
          {
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: "drop-shadow-[0_0_8px_rgba(200,220,255,0.7)]",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                d: "M12 3a9 9 0 0 0 9 9 9.005 9.005 0 0 1-9-9Z",
                fill: "#d1d5db",
                stroke: "#9ca3af",
                strokeWidth: "1",
                strokeLinejoin: "round"
              }
            )
          }
        )
      }
    )
  ] });
}
function Index() {
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const cascadeVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.28,
        delayChildren: 0.1
      }
    }
  };
  const blockVariants = {
    hidden: {
      opacity: 0,
      y: 45,
      filter: "blur(8px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomCursor, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 -z-10 pointer-events-none overflow-hidden h-screen w-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AntigravityParticles, { count: 35, className: "opacity-80" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { onComplete: () => setIsLoading(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.main, { variants: cascadeVariants, initial: "hidden", animate: "visible", className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: blockVariants, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: blockVariants, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MusicSection, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: blockVariants, children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookSection, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: blockVariants, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReaderSection, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: blockVariants, children: /* @__PURE__ */ jsxRuntimeExports.jsx(KrishnaSection, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: blockVariants, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItalyGallery, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: blockVariants, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, {}) })
    ] }) })
  ] });
}
export {
  Index as component
};
