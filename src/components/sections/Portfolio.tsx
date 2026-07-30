"use client";

import { motion } from "framer-motion";
import CircularGallery from "../CircularGallery";

const projects = [
  { id: 1, title: "Restaurant Website", category: "E-Commerce", color: "from-orange-500 to-red-500" },
  { id: 2, title: "Hospital Website", category: "Web App", color: "from-blue-500 to-cyan-500" },
  { id: 3, title: "Construction Website", category: "Business", color: "from-yellow-500 to-orange-500" },
  { id: 4, title: "Real Estate Website", category: "Landing Page", color: "from-green-500 to-emerald-500" },
  { id: 5, title: "Portfolio Website", category: "Personal", color: "from-purple-500 to-pink-500" },
  { id: 6, title: "Tech Dashboard", category: "Admin Panel", color: "from-indigo-500 to-purple-500" },
];

export default function Portfolio() {
  const galleryItems = projects.map((p) => ({
    image: `https://picsum.photos/seed/${p.id + 20}/800/600?grayscale`,
    text: p.title
  }));

  return (
    <section id="portfolio" className="relative h-screen bg-black select-none overflow-hidden flex flex-col">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none z-0" />

      {/* Section Header */}
      <div className="absolute top-12 md:top-24 left-6 md:left-24 z-10 pointer-events-none">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-ethno text-3xl md:text-6xl text-white tracking-tight"
        >
          Selected <span className="text-[#C084FC]">Works</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[rgba(255,255,255,0.55)] mt-2 md:mt-4 text-sm md:text-lg max-w-xs md:max-w-sm"
        >
          Swipe or drag to explore our premium digital experiences.
        </motion.p>
      </div>

      {/* Circular Gallery Container */}
      <div className="relative flex-1 w-full h-full pt-16 z-10">
        <CircularGallery
          items={galleryItems}
          bend={1.5}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.05}
          font="30px 'ethnocentric-rg'"
          fontUrl="/ethnocentric-rg.ttf"
          scrollSpeed={2.5}
        />
      </div>
    </section>
  );
}
