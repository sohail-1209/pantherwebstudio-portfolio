"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "CEO, TechCorp",
    content: "Panther Web Studio delivered an exceptional website that completely transformed our digital presence. The 3D elements and smooth animations are world-class.",
    avatar: "S"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, Innovate AI",
    content: "Working with this team was a breeze. They understood our vision and executed it flawlessly with cutting-edge tech and stunning visuals.",
    avatar: "M"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director, Bloom",
    content: "Our conversion rates doubled after the redesign. The luxury dark mode aesthetic fits our brand perfectly. Highly recommend!",
    avatar: "E"
  },
  {
    id: 4,
    name: "David Kim",
    role: "CTO, NextGen",
    content: "The performance and code quality are top-notch. It's rare to find an agency that balances extreme aesthetics with perfect lighthouse scores.",
    avatar: "D"
  },
  {
    id: 5,
    name: "Jessica Alba",
    role: "Owner, Alba Boutique",
    content: "Absolutely stunning work. The attention to detail in the micro-animations makes the entire experience feel premium and alive.",
    avatar: "J"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getCardStyle = (index: number) => {
    const total = testimonials.length;
    // Calculate shortest distance in a circular array
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    let x = 0;
    let scale = 1;
    let zIndex = 10;
    let opacity = 1;
    let blur = 0;
    let rotateY = 0;

    if (diff === 0) {
      x = 0;
      scale = 1;
      zIndex = 30;
      opacity = 1;
      blur = 0;
      rotateY = 0;
    } else if (diff === 1 || diff === -4) { 
      // 1 position to the right
      x = window.innerWidth < 768 ? 150 : 350;
      scale = 0.8;
      zIndex = 20;
      opacity = 0.5;
      blur = 5;
      rotateY = -15;
    } else if (diff === -1 || diff === 4) { 
      // 1 position to the left
      x = window.innerWidth < 768 ? -150 : -350;
      scale = 0.8;
      zIndex = 20;
      opacity = 0.5;
      blur = 5;
      rotateY = 15;
    } else if (diff === 2 || diff === -3) {
      // 2 positions to the right
      x = window.innerWidth < 768 ? 250 : 600;
      scale = 0.6;
      zIndex = 10;
      opacity = 0.2;
      blur = 10;
      rotateY = -25;
    } else {
      // 2 positions to the left
      x = window.innerWidth < 768 ? -250 : -600;
      scale = 0.6;
      zIndex = 10;
      opacity = 0.2;
      blur = 10;
      rotateY = 25;
    }

    return { x, scale, zIndex, opacity, filter: `blur(${blur}px)`, rotateY };
  };

  return (
    <section id="testimonials" className="py-32 relative bg-black overflow-hidden select-none">
      <div className="container mx-auto px-6 mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Client <span className="text-[#C084FC]">Testimonials</span>
          </h2>
          <p className="text-[rgba(255,255,255,0.55)] max-w-2xl mx-auto text-lg leading-relaxed">
            Don't just take our word for it. Here's what our partners have to say about the experiences we build.
          </p>
        </motion.div>
      </div>

      {/* 3D Auto Slider Container */}
      <div className="relative w-full h-[400px] flex items-center justify-center perspective-[1500px]">
        <AnimatePresence>
          {testimonials.map((testimonial, index) => {
            const style = getCardStyle(index);
            return (
              <motion.div
                key={testimonial.id}
                animate={{
                  x: style.x,
                  scale: style.scale,
                  zIndex: style.zIndex,
                  opacity: style.opacity,
                  filter: style.filter,
                  rotateY: style.rotateY,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute w-[90vw] md:w-[500px] cursor-pointer"
                onClick={() => setCurrentIndex(index)}
              >
                <div
                  className="p-8 md:p-10 rounded-[30px] w-full h-full"
                  style={{
                    background: "rgba(18,18,28,0.75)",
                    border: "1px solid rgba(180,140,255,0.22)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    boxShadow: "0 0 30px rgba(165,95,255,0.1), inset 0 0 0 1px rgba(255,255,255,0.02)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="flex items-center space-x-6 mb-8 transform-gpu" style={{ transform: "translateZ(30px)" }}>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#C084FC] flex items-center justify-center text-white font-bold text-2xl shadow-[0_0_20px_rgba(192,132,252,0.4)]">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xl">{testimonial.name}</h4>
                      <p className="text-[#C084FC] font-semibold text-sm tracking-wide uppercase mt-1">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-[rgba(255,255,255,0.7)] text-lg leading-relaxed transform-gpu italic" style={{ transform: "translateZ(20px)" }}>
                    "{testimonial.content}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center space-x-3 mt-16 relative z-10">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-500 rounded-full ${
              currentIndex === idx 
                ? "w-8 h-2 bg-[#C084FC] shadow-[0_0_10px_#C084FC]" 
                : "w-2 h-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
