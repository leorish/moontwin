import { motion } from "motion/react";
import { useState } from "react";

interface InteractiveTextProps {
  text: string;
  className?: string;
}

export function InteractiveText({ text, className = "" }: InteractiveTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  const letters = text.split("");

  // Letter animations
  const containerVariants = {
    initial: {},
    hover: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const letterVariants = {
    initial: { y: 0, scale: 1 },
    hover: {
      y: [0, -10, 0],
      scale: [1, 1.15, 1],
      transition: {
        duration: 0.65,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.span
      className={`relative inline-block cursor-default ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={containerVariants}
      initial="initial"
      animate={isHovered ? "hover" : "initial"}
    >
      {/* Soft warm gold background glow expanding behind the text */}
      <motion.span
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-32 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15"
        style={{ filter: "blur(30px)" }}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={
          isHovered
            ? { scale: 1.4, opacity: 0.8, filter: "blur(35px)" }
            : { scale: 0.4, opacity: 0, filter: "blur(30px)" }
        }
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Main text content */}
      <span className="relative flex justify-center flex-wrap">
        {letters.map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block origin-bottom font-serif"
            style={{
              // Keep space characters formatted as normal spaces
              marginRight: char === " " ? "0.25em" : "0.02em",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}
