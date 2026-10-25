import { createContext, useContext, useState, useRef, useEffect, useCallback, ReactNode } from "react";
import songAudio from "@/assets/summertime-sadness.mp3";

export interface LyricItem {
  time: number;
  text: string;
}

export const LYRICS_WITH_TIMESTAMPS: LyricItem[] = [
  { time: 0.06, text: "🎵 (Intro Melancholy Music) 🎵" },
  { time: 1, text: "I got my red dress on tonight" },
  { time: 3.5, text: "Dancing in the dark in the pale moonlight" },
  { time: 7, text: "Done my hair up real big, beauty queen style" },
  { time: 11.5, text: "High heels off, I'm feeling alive" },
  { time: 16, text: "Oh my God, I feel it in the air" },
  { time: 21, text: "Telephone wires above all sizzlin' like a snare" },
  { time: 25.5, text: "Honey, I'm on fire, I feel it everywhere" },
  { time: 29.5, text: "Nothing scares me anymore" },
];

interface AudioContextType {
  playing: boolean;
  toggle: () => void;
  play: () => void;
  pause: () => void;
  progress: number;
  currentTime: number;
  duration: number;
  seek: (ratio: number) => void;
  seekToTime: (time: number) => void;
  activeLyric: number;
  audioReady: boolean;
  audioError: boolean;
  isMuted: boolean;
  toggleMute: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeLyric, setActiveLyric] = useState(-1);
  const [audioReady, setAudioReady] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const getActiveLyricIndex = useCallback((time: number) => {
    let activeIndex = -1;
    for (let i = 0; i < LYRICS_WITH_TIMESTAMPS.length; i++) {
      if (time >= LYRICS_WITH_TIMESTAMPS[i].time) {
        activeIndex = i;
      } else {
        break;
      }
    }
    return activeIndex;
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => setPlaying(false));
    }
  }, [playing]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().catch(() => setPlaying(false));
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  }, []);

  const seek = useCallback((ratio: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
    const clamped = Math.max(0, Math.min(1, ratio));
    const target = clamped * audio.duration;
    audio.currentTime = target;
    setCurrentTime(target);
    setProgress(clamped * 100);
    setActiveLyric(getActiveLyricIndex(target));
  }, [getActiveLyricIndex]);

  const seekToTime = useCallback((targetTime: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = targetTime;
    setCurrentTime(targetTime);
    if (audio.duration > 0) {
      setProgress((targetTime / audio.duration) * 100);
    }
    setActiveLyric(getActiveLyricIndex(targetTime));
    if (!playing) {
      audio.play().catch(() => setPlaying(false));
    }
  }, [getActiveLyricIndex, playing]);

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

  return (
    <AudioContext.Provider
      value={{
        playing,
        toggle,
        play,
        pause,
        progress,
        currentTime,
        duration,
        seek,
        seekToTime,
        activeLyric,
        audioReady,
        audioError,
        isMuted,
        toggleMute,
        audioRef,
      }}
    >
      <audio ref={audioRef} src={songAudio} preload="metadata" />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
