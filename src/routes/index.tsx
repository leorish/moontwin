import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Hero } from "@/components/sections/Hero";
import { MusicSection } from "@/components/sections/MusicSection";
import { BookSection } from "@/components/sections/BookSection";
import { ReaderSection } from "@/components/sections/ReaderSection";
import { KrishnaSection } from "@/components/sections/KrishnaSection";
import { ItalyGallery } from "@/components/sections/ItalyGallery";
import { Terminal } from "@/components/sections/Terminal";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { CustomCursor } from "@/components/CustomCursor";
import { AntigravityParticles } from "@/components/AntigravityParticles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Midnight Sanctuary — For Prachi" },
      { name: "description", content: "A celestial, deeply personal web experience crafted for Prachi. Luxury Dark Academia meets Divine Mysticism." },
      { property: "og:title", content: "The Midnight Sanctuary — For Prachi" },
      { property: "og:description", content: "A celestial, deeply personal web experience crafted for Prachi." },
    ],
  }),
  component: Index,
});

function Index() {
  const [isLoading, setIsLoading] = useState(true);

  const cascadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.28,
        delayChildren: 0.1,
      },
    },
  };

  const blockVariants = {
    hidden: { opacity: 0, y: 45, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <>
      <CustomCursor />

      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden h-screen w-screen bg-background">
        <AntigravityParticles count={35} className="opacity-80" />
      </div>

      <LoadingOverlay onComplete={() => setIsLoading(false)} />

      <AnimatePresence>
        {!isLoading && (
          <motion.main
            variants={cascadeVariants}
            initial="hidden"
            animate="visible"
            className="relative overflow-hidden"
          >
            <motion.div variants={blockVariants}><Hero /></motion.div>
            <motion.div variants={blockVariants}><MusicSection /></motion.div>
            <motion.div variants={blockVariants}><BookSection /></motion.div>
            <motion.div variants={blockVariants}><ReaderSection /></motion.div>
            <motion.div variants={blockVariants}><KrishnaSection /></motion.div>
            <motion.div variants={blockVariants}><ItalyGallery /></motion.div>
            <motion.div variants={blockVariants}><Terminal /></motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
