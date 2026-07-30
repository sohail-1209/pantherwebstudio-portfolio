"use client";

import { motion } from "framer-motion";
import { 
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, 
  SiMongodb, SiFirebase, SiTailwindcss, SiThreedotjs, 
  SiFramer, SiGreensock, SiTypescript, SiVercel
} from "react-icons/si";

const techRow1 = [
  { name: "React", icon: <SiReact size={45} />, color: "#61DAFB" },
  { name: "Next.js", icon: <SiNextdotjs size={45} />, color: "#FFFFFF" },
  { name: "Node.js", icon: <SiNodedotjs size={45} />, color: "#339933" },
  { name: "Express", icon: <SiExpress size={45} />, color: "#FFFFFF" },
  { name: "MongoDB", icon: <SiMongodb size={45} />, color: "#47A248" },
  { name: "Firebase", icon: <SiFirebase size={45} />, color: "#FFCA28" },
];

const techRow2 = [
  { name: "Tailwind", icon: <SiTailwindcss size={45} />, color: "#06B6D4" },
  { name: "Three.js", icon: <SiThreedotjs size={45} />, color: "#FFFFFF" },
  { name: "Framer Motion", icon: <SiFramer size={45} />, color: "#0055FF" },
  { name: "GSAP", icon: <SiGreensock size={45} />, color: "#88CE02" },
  { name: "TypeScript", icon: <SiTypescript size={45} />, color: "#3178C6" },
  { name: "Vercel", icon: <SiVercel size={45} />, color: "#FFFFFF" },
];

function MarqueeRow({ items, direction = "left" }: { items: any[], direction?: "left" | "right" }) {
  return (
    <div className="flex w-full overflow-hidden whitespace-nowrap py-4 relative">
       {/* Fade edges */}
       <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
       <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
       
       <motion.div
         animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
         transition={{ duration: 30, ease: "linear", repeat: Infinity }}
         className="flex gap-6 px-4 w-[200%]"
       >
          {[...items, ...items, ...items, ...items].map((tech, idx) => (
             <div 
               key={`${tech.name}-${idx}`} 
               className="flex-shrink-0 flex items-center justify-center gap-6 px-8 py-6 rounded-[20px] group transition-colors duration-500 hover:bg-[rgba(30,30,45,0.6)] cursor-pointer"
               style={{
                 background: "rgba(18,18,28,0.45)",
                 border: "1px solid rgba(180,140,255,0.22)",
                 backdropFilter: "blur(18px)",
                 WebkitBackdropFilter: "blur(18px)",
               }}
             >
               <div 
                 className="text-white transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                 style={{
                   filter: "drop-shadow(0 0 0px transparent)",
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.color = tech.color;
                   e.currentTarget.style.filter = `drop-shadow(0 0 15px ${tech.color})`;
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.color = "#FFFFFF";
                   e.currentTarget.style.filter = "drop-shadow(0 0 10px rgba(255,255,255,0.2))";
                 }}
               >
                 {tech.icon}
               </div>
               <span className="text-xl font-bold text-white tracking-wide">{tech.name}</span>
             </div>
          ))}
       </motion.div>
    </div>
  )
}

export default function Technology() {
  return (
    <section className="py-32 relative bg-black overflow-hidden select-none">
      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 px-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Premium <span className="text-[#C084FC]">Tech Stack</span>
          </h2>
          <p className="text-[rgba(255,255,255,0.55)] max-w-2xl mx-auto text-lg leading-relaxed">
            We build lightning-fast, highly scalable, and award-winning digital experiences using the industry's most powerful technologies.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4 mt-12 w-full">
          <MarqueeRow items={techRow1} direction="left" />
          <MarqueeRow items={techRow2} direction="right" />
        </div>
      </div>
    </section>
  );
}
