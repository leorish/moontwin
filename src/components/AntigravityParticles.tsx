import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVy: number;
  size: number;
  type: "moon" | "star" | "petal";
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

interface AntigravityParticlesProps {
  count?: number;
  className?: string;
}

export function AntigravityParticles({ count = 60, className = "" }: AntigravityParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Fit canvas to display size
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const types: ("moon" | "star" | "petal")[] = ["moon", "star", "petal"];
      for (let i = 0; i < count; i++) {
        const type = types[i % 3];
        const size =
          type === "moon"
            ? 8 + Math.random() * 10
            : type === "star"
            ? 2 + Math.random() * 4
            : 6 + Math.random() * 8;

        const baseVy = -(0.3 + Math.random() * 0.7); // Float upwards slowly

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
          opacity: 0.15 + Math.random() * 0.45,
        });
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse movement inside canvas container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const container = canvas.parentElement || window;
    container.addEventListener("mousemove", handleMouseMove as any);
    container.addEventListener("mouseleave", handleMouseLeave as any);

    // Draw crescent moon path
    const drawCrescentMoon = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      rot: number,
      alpha: number
    ) => {
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

    // Draw glowing star path
    const drawStar = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      alpha: number
    ) => {
      c.save();
      c.beginPath();
      c.arc(x, y, r, 0, Math.PI * 2);
      c.fillStyle = `rgba(180, 220, 255, ${alpha})`;
      c.shadowBlur = 15;
      c.shadowColor = `rgba(0, 243, 255, ${alpha})`;
      c.fill();
      c.restore();
    };

    // Draw organic ruby-black rose petal
    const drawPetal = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      rot: number,
      alpha: number
    ) => {
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
        // Physics logic: Repel from mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius; // 0 (outer edge) to 1 (at cursor)
          const angle = Math.atan2(dy, dx);
          
          // Inject repel force
          p.vx += Math.cos(angle) * force * 0.8;
          p.vy += Math.sin(angle) * force * 0.8;
        }

        // Apply friction/relaxation back to standard floating path
        p.vx *= 0.94;
        p.vy = p.vy * 0.94 + p.baseVy * 0.06;

        // Apply velocities
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Wrap boundaries
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

        // Draw particle
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
      container.removeEventListener("mousemove", handleMouseMove as any);
      container.removeEventListener("mouseleave", handleMouseLeave as any);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 block h-full w-full ${className}`}
      style={{ mixBlendMode: "screen" }}
    />
  );
}
