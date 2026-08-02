"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "auto";
      onComplete();
    }, 1800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[var(--background)] flex flex-col items-center justify-center select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Logo container with exact #9598c7 background */}
          <motion.div
            className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden mb-6 relative flex items-center justify-center bg-[var(--logo-bg)] border-2 border-[#8b5cf6]/60 shadow-[0_0_30px_rgba(139,92,246,0.4)] p-3"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
          >
            <Image
              src="/only panther.png"
              alt="Panther Web Studio"
              fill
              sizes="112px"
              className="object-contain z-10 p-2"
              priority
            />
          </motion.div>

          {/* Text reveal with font-ethno */}
          <div className="overflow-hidden h-10">
            <motion.h2
              className="font-ethno text-lg sm:text-xl md:text-3xl font-bold tracking-[0.2em] text-[var(--foreground)]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              PANTHER WEB STUDIO
            </motion.h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
