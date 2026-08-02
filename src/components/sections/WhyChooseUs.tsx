"use client";

import { motion, useInView, animate, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import DotField from "@/components/DotField";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "100%", label: "Responsive Design" },
  { value: "99%", label: "Performance Score" },
  { value: "SEO", label: "Friendly Architecture" },
  { value: "UI/UX", label: "Modern & Premium" },
  { value: "Fast", label: "Delivery Time" },
  { value: "Clean", label: "Maintainable Code" },
  { value: "24/7", label: "Dedicated Support" },
];

const processes = [
  { step: "01", title: "Discovery", desc: "Understanding your vision, business goals, target market, and technical requirements." },
  { step: "02", title: "Planning", desc: "Crafting a strategic UX roadmap, system architecture, and project timeline." },
  { step: "03", title: "Design", desc: "Creating bespoke, conversion-optimized UI designs tailored to your brand." },
  { step: "04", title: "Development", desc: "Writing clean, high-performance code with Next.js, React, and modern APIs." },
  { step: "05", title: "Testing", desc: "Rigorous quality assurance, cross-browser validation, and speed optimization." },
  { step: "06", title: "Launch & Scale", desc: "Deploying to production, monitoring analytics, and supporting ongoing growth." },
];

function AnimatedCounter({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  const numMatch = text.match(/\d+/);
  const isNumber = numMatch !== null;
  
  const endValue = isNumber ? parseInt(numMatch[0]) : 0;
  const suffix = isNumber ? text.substring(numMatch[0].length) : "";

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (inView && isNumber) {
      const controls = animate(0, endValue, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setValue(Math.round(v)),
      });
      return controls.stop;
    }
  }, [inView, isNumber, endValue]);

  return (
    <span ref={ref}>
      {isNumber ? (
        <>
          {value}
          <span className="text-[#8b5cf6]">{suffix}</span>
        </>
      ) : (
        text
      )}
    </span>
  );
}

export default function WhyChooseUs() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.1, 1], [0, 1, 1]);

  return (
    <section id="why-us" className="py-14 md:py-20 relative bg-[var(--background)] select-none overflow-hidden transition-colors duration-300">
      {/* Interactive DotField Canvas Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <DotField
          dotRadius={1.8}
          dotSpacing={16}
          cursorRadius={400}
          bulgeStrength={50}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0.8}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--glass-border)] mb-4">
            <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
            <span className="text-xs font-semibold tracking-wider text-[#8b5cf6] uppercase">Why Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-[var(--foreground)] tracking-tight">
            Engineering Digital <span className="text-gradient-purple">Excellence</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
            We don't just build websites; we craft highly conversion-focused, lightning-fast digital solutions that scale your business.
          </p>
        </motion.div>

        {/* Glass Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-28 md:mb-36">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="p-5 sm:p-6 rounded-2xl flex flex-col items-center justify-center text-center bg-[var(--surface)]/75 backdrop-blur-xl border border-[var(--glass-border)] hover:border-[#8b5cf6]/50 shadow-[0_10px_25px_rgba(0,0,0,0.06)] hover:shadow-[0_15px_35px_rgba(139,92,246,0.2)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-2">
                <AnimatedCounter text={stat.value} />
              </div>
              <span className="text-[var(--text-muted)] text-xs sm:text-sm font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Process Timeline */}
        <div ref={timelineRef} className="relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">
              Our Proven <span className="text-gradient-purple">Process</span>
            </h3>
          </motion.div>
          
          <div className="relative max-w-4xl mx-auto">
            
            {/* Background Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--glass-border)] transform md:-translate-x-1/2 rounded-full" />
            
            {/* Animated Draw Line */}
            <motion.div 
              style={{ height: lineHeight, opacity: glowOpacity }} 
              className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-[#7c3aed] via-[#8b5cf6] to-[#a78bfa] transform md:-translate-x-1/2 rounded-full shadow-[0_0_15px_#8b5cf6] z-0" 
            />
            
            <div className="space-y-12 md:space-y-16">
              {processes.map((process, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={process.step}
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 0.6 }}
                    className={`relative flex flex-col md:flex-row items-center z-10 ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Content Box */}
                    <div className="w-full md:w-1/2 pl-14 md:pl-0 md:px-10">
                      <div className={`p-6 rounded-2xl bg-[var(--surface)]/75 backdrop-blur-xl border border-[var(--glass-border)] hover:border-[#8b5cf6]/50 transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_25px_rgba(0,0,0,0.06)] ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                        <span className="text-[#8b5cf6] font-bold text-xs tracking-wider uppercase mb-2 block">
                          Step {process.step}
                        </span>
                        <h4 className="text-[var(--foreground)] font-bold text-lg sm:text-xl mb-2">{process.title}</h4>
                        <p className="text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed">{process.desc}</p>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[var(--background)] border-2 border-[#8b5cf6] z-20 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
