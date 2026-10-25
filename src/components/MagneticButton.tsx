import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import petal from "@/assets/rose-petal.png";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function MagneticButton({ children, className = "", onClick, ...props }: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
        
        // Random velocity outwards in 360 degrees
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
          // Inline SVG Gold Heart
          p.innerHTML = `<svg viewBox="0 0 24 24" fill="var(--gold)" width="100%" height="100%"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
          p.style.filter = "drop-shadow(0 0 8px rgba(224, 184, 110, 0.75))";
        } else {
          // Black Ruby Rose Petal
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
        
        p.style.animation = `whimsicalBurst ${1.0 + Math.random() * 0.5}s cubic-bezier(0.1, 0.8, 0.2, 1) forwards`;
        burst.appendChild(p);
      }
      el.appendChild(burst);
      setTimeout(() => burst.remove(), 1600);
    }
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={handleClick}
      className={`magnetic group relative inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-background/40 px-7 py-3 font-sans text-sm uppercase tracking-[0.25em] text-gold transition-colors duration-500 hover:border-gold hover:text-gold-soft ${className}`}
      style={{ transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.4s, color 0.4s" }}
      {...props}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "0 0 40px -5px color-mix(in oklab, var(--gold) 75%, transparent), inset 0 0 25px -10px color-mix(in oklab, var(--gold) 60%, transparent)" }}
      />
      {/* Ghostly rose outline revealed on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-700 group-hover:opacity-25"
        style={{
          backgroundImage: `url(${petal})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          filter: "blur(0.5px)",
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
