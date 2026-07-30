"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Disable scroll while loading
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "auto";
      onComplete();
    }, 3500); // Loader duration

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Logo container */}
          <motion.div
            className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-8 relative flex items-center justify-center bg-white border-2 border-white/50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "backOut" }}
          >
            {/* Pulsing glow behind logo */}
            <motion.div
              className="absolute inset-0 bg-primary rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Logo Image */}
            <Image
              src="/logo.png"
              alt="Panther Web Studio"
              fill
              sizes="(max-width: 768px) 96px, 128px"
              className="object-cover z-10"
              priority
            />
          </motion.div>

          {/* Text reveal */}
          <div className="overflow-hidden py-1">
            <motion.h2
              className="font-ethno text-xl md:text-3xl font-normal tracking-[0.15em] text-white"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            >
              PANTHER WEB STUDIO
            </motion.h2>
          </div>
          
          {/* Particles placeholder (could be replaced with a tiny three.js canvas if needed) */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
