"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const brandTitle = "PANTHER WEB STUDIO";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Progress bar animation timer
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 80);

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "auto";
      onComplete();
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[var(--background)] flex flex-col items-center justify-center select-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Ambient Background Radial Glows */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8b5cf6]/20 rounded-full blur-[140px]" 
            />
            <motion.div 
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#3b82f6]/15 rounded-full blur-[120px]" 
            />
          </div>

          {/* Center Logo Showcase with Dual Orbit Rings */}
          <div className="relative mb-8 flex items-center justify-center">
            {/* Outer Rotating Energy Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
              className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full border border-dashed border-[#8b5cf6]/60"
            />
            {/* Inner Counter-Rotating Pulsing Glow Ring */}
            <motion.div
              animate={{ rotate: -360, scale: [1, 1.05, 1] }}
              transition={{ rotate: { duration: 12, ease: "linear", repeat: Infinity }, scale: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full border border-[#a78bfa]/40 shadow-[0_0_25px_rgba(139,92,246,0.3)]"
            />

            {/* Central Logo Container with --logo-bg (#e5d7fc) */}
            <motion.div
              className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden relative flex items-center justify-center bg-[var(--logo-bg)] border-2 border-[#8b5cf6]/80 shadow-[0_0_35px_rgba(139,92,246,0.6)] z-10 p-3"
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/panther.png"
                alt="Panther Web Studio"
                fill
                sizes="112px"
                className="object-contain z-10 p-2"
                priority
              />
            </motion.div>
          </div>

          {/* Letter-by-Letter Animated Brand Title */}
          <div className="flex items-center justify-center flex-wrap px-4 mb-3">
            {brandTitle.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + index * 0.03,
                  ease: "easeOut",
                }}
                className={`font-ethno text-lg sm:text-2xl md:text-3xl font-extrabold tracking-widest ${
                  letter === " " ? "mr-2 sm:mr-3" : ""
                } ${
                  index < 7 ? "text-gradient-purple" : "text-[var(--foreground)]"
                }`}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Subtitle with Pulsing Ellipsis */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold tracking-wider text-[var(--text-muted)] uppercase mb-8"
          >
            <span>Engineering Exceptional Web Experiences</span>
            <motion.span
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              ...
            </motion.span>
          </motion.div>

          {/* Progress Bar Container & Counter */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-48 sm:w-64 flex flex-col items-center gap-2"
          >
            <div className="w-full h-1.5 rounded-full bg-[var(--surface-hover)] border border-[var(--glass-border)] overflow-hidden relative shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#a78bfa] rounded-full shadow-[0_0_12px_#8b5cf6]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between w-full text-[10px] font-mono text-[var(--text-muted)]">
              <span>LOADING</span>
              <span>{progress}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
