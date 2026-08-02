"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Detect if device is touch or coarse pointer
    const checkTouch = () => {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(isCoarse || hasTouch);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName?.toLowerCase() === "a" ||
        target.tagName?.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList?.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", checkTouch);
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  // Completely disable custom cursor on mobile / touch devices
  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Inner Dot - Highest Z-Index (z-[99999]) */}
      <motion.div
        className="fixed top-0 left-0 w-3.5 h-3.5 bg-[#a78bfa] rounded-full pointer-events-none z-[99999] shadow-[0_0_12px_#8b5cf6]"
        animate={{
          x: mousePosition.x - 7,
          y: mousePosition.y - 7,
          scale: isHovering ? 2.2 : 1,
          backgroundColor: isHovering ? "#c084fc" : "#a78bfa",
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.12,
        }}
      />
      
      {/* Outer Ring - Highest Z-Index */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-[#a78bfa]/60 rounded-full pointer-events-none z-[99999] bg-[#8b5cf6]/5"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.6 : 1,
          borderColor: isHovering ? "rgba(192, 132, 252, 0.9)" : "rgba(167, 139, 250, 0.6)",
        }}
        transition={{
          type: "tween",
          ease: "easeOut",
          duration: 0.22,
        }}
      />
    </>
  );
}
