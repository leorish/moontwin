import { useMemo } from "react";
import petal from "@/assets/rose-petal.png";

interface Props {
  count?: number;
  className?: string;
  size?: number;
}

export function PetalField({ count = 14, className = "", size = 22 }: Props) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 16 + Math.random() * 18,
        size: size * (0.6 + Math.random() * 1.1),
        drift: (Math.random() - 0.5) * 120,
        rotate: Math.random() * 360,
        opacity: 0.25 + Math.random() * 0.55,
      })),
    [count, size],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {petals.map((p) => (
        <img
          key={p.id}
          src={petal}
          alt=""
          width={p.size}
          height={p.size}
          style={{
            position: "absolute",
            top: "-10%",
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.6))",
            animation: `petalFall ${p.duration}s linear ${p.delay}s infinite`,
            ["--drift" as string]: `${p.drift}px`,
            ["--rot" as string]: `${p.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}
