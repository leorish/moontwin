import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * CONFIGURATION CONSTANTS
 * You can customize the cursor dimensions and colors here:
 */
export const CURSOR_CONFIG = {
  // Dot styling
  dotSize: 8, // diameter in pixels
  dotColor: "#ffffff", // dot background color

  // Ring styling (normal state)
  ringSize: 36, // diameter in pixels
  ringBorderWidth: 1.5, // ring border thickness in pixels
  ringColor: "rgba(255, 255, 255, 0.85)", // ring border color
  ringBg: "rgba(255, 255, 255, 0.05)", // subtle fill inside ring

  // Ring hover state (over clickable elements)
  hoverRingScale: 1.6, // expands ring on hover
  hoverRingBg: "rgba(255, 255, 255, 0.15)", // fill when hovering

  // Click state
  clickScale: 0.8, // shrink factor on mouse down
};

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  // Exact coordinates for the inner dot (no lag)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Coordinates for the outer ring (smooth spring physics with slight delay)
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  // Smooth, slightly delayed spring config for outer ring
  const ringSpringConfig = { damping: 28, stiffness: 220, mass: 0.6 };
  const smoothRingX = useSpring(ringX, ringSpringConfig);
  const smoothRingY = useSpring(ringY, ringSpringConfig);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable custom cursor if fine pointer (mouse/trackpad) and hover supported
    const checkFinePointer = () => {
      const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
      setIsFinePointer(fine);
      return fine;
    };

    if (!checkFinePointer()) {
      return;
    }

    // Handle mouse movement
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Make visible on first mouse move inside viewport
      if (!isVisible) {
        setIsVisible(true);
        // Only hide system cursor once custom cursor is verified active & moving
        document.body.classList.add("custom-cursor-active");
      }

      // Exact position for dot
      dotX.set(clientX);
      dotY.set(clientY);

      // Delayed position for ring
      ringX.set(clientX);
      ringY.set(clientY);
    };

    // Handle hover states on interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"]), .cursor-pointer, [data-clickable="true"]'
      );

      setIsHovered(!!interactive);
    };

    // Handle click down / up
    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    // Handle cursor leaving the window
    const onMouseLeave = () => {
      setIsVisible(false);
      document.body.classList.remove("custom-cursor-active");
    };

    const onMouseEnter = () => {
      setIsVisible(true);
      document.body.classList.add("custom-cursor-active");
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible, dotX, dotY, ringX, ringY]);

  // If touch device or mouse hasn't moved yet, render nothing (system cursor remains intact)
  if (!isFinePointer || !isVisible) {
    return null;
  }

  // Calculate current scale based on hover & click
  let targetRingScale = 1;
  let targetDotScale = 1;

  if (isClicked) {
    targetRingScale = CURSOR_CONFIG.clickScale * (isHovered ? CURSOR_CONFIG.hoverRingScale : 1);
    targetDotScale = CURSOR_CONFIG.clickScale;
  } else if (isHovered) {
    targetRingScale = CURSOR_CONFIG.hoverRingScale;
    targetDotScale = 0.5; // Dot shrinks slightly into ring on hover for elegance
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none">
      {/* 1. Outer Smooth Follower Ring */}
      <motion.div
        ref={ringRef}
        style={{
          x: smoothRingX,
          y: smoothRingY,
          translateX: "-50%",
          translateY: "-50%",
          width: CURSOR_CONFIG.ringSize,
          height: CURSOR_CONFIG.ringSize,
          borderColor: CURSOR_CONFIG.ringColor,
          borderWidth: `${CURSOR_CONFIG.ringBorderWidth}px`,
        }}
        animate={{
          scale: targetRingScale,
          backgroundColor: isHovered ? CURSOR_CONFIG.hoverRingBg : CURSOR_CONFIG.ringBg,
        }}
        transition={{
          scale: { type: "spring", damping: 20, stiffness: 300, mass: 0.5 },
          backgroundColor: { duration: 0.2 },
        }}
        className="pointer-events-none fixed left-0 top-0 rounded-full border border-solid mix-blend-difference"
      />

      {/* 2. Inner Dot (Follows mouse immediately with zero lag) */}
      <motion.div
        ref={dotRef}
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: CURSOR_CONFIG.dotSize,
          height: CURSOR_CONFIG.dotSize,
          backgroundColor: CURSOR_CONFIG.dotColor,
        }}
        animate={{
          scale: targetDotScale,
          opacity: isClicked ? 0.7 : 1,
        }}
        transition={{
          scale: { type: "spring", damping: 25, stiffness: 400 },
          opacity: { duration: 0.15 },
        }}
        className="pointer-events-none fixed left-0 top-0 rounded-full mix-blend-difference shadow-[0_0_10px_rgba(255,255,255,0.8)]"
      />
    </div>
  );
}
