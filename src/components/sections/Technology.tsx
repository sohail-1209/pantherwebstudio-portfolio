"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, 
  SiMongodb, SiFirebase, SiTailwindcss, 
  SiFramer, SiGreensock, SiTypescript, SiVercel
} from "react-icons/si";
import { Sparkles } from "lucide-react";

const techRow1 = [
  { name: "React", icon: <SiReact size={36} />, color: "#61DAFB" },
  { name: "Next.js", icon: <SiNextdotjs size={36} />, color: "#8b5cf6" },
  { name: "Node.js", icon: <SiNodedotjs size={36} />, color: "#339933" },
  { name: "Express", icon: <SiExpress size={36} />, color: "#8b5cf6" },
  { name: "MongoDB", icon: <SiMongodb size={36} />, color: "#47A248" },
  { name: "Firebase", icon: <SiFirebase size={36} />, color: "#FFCA28" },
];

const techRow2 = [
  { name: "Tailwind", icon: <SiTailwindcss size={36} />, color: "#06B6D4" },
  { name: "Framer Motion", icon: <SiFramer size={36} />, color: "#0055FF" },
  { name: "GSAP", icon: <SiGreensock size={36} />, color: "#88CE02" },
  { name: "TypeScript", icon: <SiTypescript size={36} />, color: "#3178C6" },
  { name: "Vercel", icon: <SiVercel size={36} />, color: "#8b5cf6" },
];

function MarqueeRow({ items, direction = "left" }: { items: any[], direction?: "left" | "right" }) {
  const [duration, setDuration] = useState(14);

  useEffect(() => {
    const updateSpeed = () => {
      // Faster scrolling speed: 8s on mobile screens, 14s on desktop
      setDuration(window.innerWidth < 768 ? 8 : 14);
    };
    updateSpeed();
    window.addEventListener("resize", updateSpeed);
    return () => window.removeEventListener("resize", updateSpeed);
  }, []);

  return (
    <div className="flex w-full overflow-x-auto py-3 relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
       {/* Fade edges */}
       <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
       <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />
       
       <motion.div
         animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
         transition={{ duration: duration, ease: "linear", repeat: Infinity }}
         className="flex gap-4 sm:gap-6 px-4 w-[220%] sm:w-[200%] flex-nowrap"
       >
          {[...items, ...items, ...items, ...items].map((tech, idx) => (
             <div 
               key={`${tech.name}-${idx}`} 
               className="flex-shrink-0 flex items-center justify-center gap-3 sm:gap-4 px-5 sm:px-7 py-3.5 sm:py-5 rounded-2xl bg-[var(--surface)]/75 backdrop-blur-xl border border-[var(--glass-border)] hover:border-[#8b5cf6]/50 hover:bg-[var(--surface-hover)] transition-all duration-300 cursor-pointer shadow-[0_6px_25px_rgba(0,0,0,0.06)] group"
             >
               <div 
                 className="text-[var(--foreground)] transition-all duration-300"
                 onMouseEnter={(e) => {
                   e.currentTarget.style.color = tech.color;
                   e.currentTarget.style.filter = `drop-shadow(0 0 12px ${tech.color})`;
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.color = "";
                   e.currentTarget.style.filter = "none";
                 }}
               >
                 {tech.icon}
               </div>
               <span className="text-sm sm:text-lg font-bold text-[var(--foreground)] tracking-wide">{tech.name}</span>
             </div>
          ))}
       </motion.div>
    </div>
  )
}

export default function Technology() {
  return (
    <section className="py-14 md:py-20 relative bg-[var(--background)] overflow-hidden select-none transition-colors duration-300">
      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16 px-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--glass-border)] mb-4">
            <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
            <span className="text-xs font-semibold tracking-wider text-[#8b5cf6] uppercase">Tech Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[var(--foreground)] tracking-tight">
            Cutting-Edge <span className="text-gradient-purple">Technologies</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
            We engineer fast, scalable, and secure digital applications using modern enterprise frameworks and tools.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4 mt-6 w-full">
          <MarqueeRow items={techRow1} direction="left" />
          <MarqueeRow items={techRow2} direction="right" />
        </div>
      </div>
    </section>
  );
}
