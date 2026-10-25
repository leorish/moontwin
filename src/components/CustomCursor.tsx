import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // High fidelity springs for butter-smooth custom cursor delay
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const sparklesRef = useRef<Sparkle[]>([]);

  useEffect(() => {
    // Hide standard cursor globally
    document.body.classList.add("custom-cursor-active");

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      const { clientX, clientY } = e;
      cursorX.set(clientX);
      cursorY.set(clientY);

      // Spawn stardust sparkles
      const count = Math.random() > 0.4 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        sparklesRef.current.push({
          x: clientX,
          y: clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 + 0.3, // Slow drift down/out
          size: 1.5 + Math.random() * 3,
          alpha: 1.0,
          color: Math.random() > 0.3 ? "rgba(224, 184, 110, 1)" : "rgba(255, 235, 180, 1)", // Gold stardust
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
        s.alpha -= 0.024; // Fade out stardust trail
        s.size *= 0.96;   // Shrinbk stardust size

        if (s.alpha <= 0 || s.size <= 0.2) {
          sparkles.splice(i, 1);
          continue;
        }

        // Draw stardust spark with slight glow
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

  return (
    <>
      {/* Secondary canvas overlay for high performance stardust stardust stardust trail */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50 h-full w-full select-none"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Silver crescent moon custom cursor */}
      <motion.div
        ref={cursorRef}
        style={{
          x: springX,
          y: springY,
          translateX: "-40%",
          translateY: "-40%",
        }}
        className="pointer-events-none fixed left-0 top-0 z-50 select-none mix-blend-difference"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_8px_rgba(200,220,255,0.7)]"
        >
          <path
            d="M12 3a9 9 0 0 0 9 9 9.005 9.005 0 0 1-9-9Z"
            fill="#d1d5db"
            stroke="#9ca3af"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </>
  );
}
