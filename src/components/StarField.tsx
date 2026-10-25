import { useMemo } from "react";

interface StarFieldProps {
  count?: number;
  className?: string;
}

export function StarField({ count = 80, className = "" }: StarFieldProps) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2.5 + 0.4,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 5,
        opacity: 0.4 + Math.random() * 0.6,
      })),
    [count],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-moon"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            boxShadow: `0 0 ${s.size * 4}px color-mix(in oklab, var(--moon) 70%, transparent)`,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
