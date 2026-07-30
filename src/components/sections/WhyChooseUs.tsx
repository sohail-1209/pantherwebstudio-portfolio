"use client";

import { motion, useInView, animate, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Threads from "../Threads";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "100%", label: "Responsive Design" },
  { value: "99%", label: "Performance Score" },
  { value: "SEO", label: "Friendly Architecture" },
  { value: "UI/UX", label: "Modern & Premium" },
  { value: "Fast", label: "Delivery Time" },
  { value: "Clean", label: "Maintainable Code" },
];

const processes = [
  { step: "01", title: "Discovery", desc: "Understanding your vision, goals, and target audience." },
  { step: "02", title: "Planning", desc: "Crafting a strategic roadmap and technical architecture." },
  { step: "03", title: "Design", desc: "Creating premium, award-winning visual experiences." },
  { step: "04", title: "Development", desc: "Building scalable, high-performance web solutions." },
  { step: "05", title: "Testing", desc: "Rigorous quality assurance for a flawless launch." },
  { step: "06", title: "Launch", desc: "Deploying your product and scaling your business." },
];

function AnimatedCounter({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  // Extract number and suffix (e.g. "50+" -> num: 50, suffix: "+")
  const numMatch = text.match(/\d+/);
  const isNumber = numMatch !== null;
  
  const endValue = isNumber ? parseInt(numMatch[0]) : 0;
  const suffix = isNumber ? text.substring(numMatch[0].length) : "";

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (inView && isNumber) {
      const controls = animate(0, endValue, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1], // Custom easeOut curve
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
          <span className="text-[#C084FC]">{suffix}</span>
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
    <section id="why-us" className="py-32 relative bg-black select-none">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="sticky top-0 w-full h-screen opacity-40">
          <Threads
            amplitude={1}
            distance={0.1}
            enableMouseInteraction
          />
        </div>
      </div>
      <div className="container mx-auto px-6 relative z-10 max-w-6xl pointer-events-none">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Why <span className="text-[#C084FC]">Choose Us</span>
          </h2>
          <p className="text-[rgba(255,255,255,0.55)] max-w-2xl mx-auto text-lg leading-relaxed">
            We don't just build websites; we craft highly interactive digital experiences that leave a lasting impression.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-40">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-[24px] flex flex-col items-center justify-center text-center group cursor-pointer transition-colors duration-500 hover:bg-[rgba(30,30,45,0.6)] pointer-events-auto"
              style={{
                background: "rgba(18,18,28,0.45)",
                border: "1px solid rgba(180,140,255,0.22)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
              }}
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(192,132,252,0.3)]">
                <AnimatedCounter text={stat.value} />
              </div>
              <span className="text-[rgba(255,255,255,0.55)] text-sm md:text-base font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Process Timeline */}
        <div ref={timelineRef} className="relative">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-24 text-white"
          >
            Our <span className="text-[#C084FC]">Process</span>
          </motion.h3>
          
          <div className="relative max-w-4xl mx-auto">
            
            {/* Background Static Line */}
            <div className="absolute left-12 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 transform md:-translate-x-1/2 rounded-full" />
            
            {/* Animated Draw Line */}
            <motion.div 
              style={{ height: lineHeight, opacity: glowOpacity }} 
              className="absolute left-12 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-[#8B5CF6] to-[#C084FC] transform md:-translate-x-1/2 rounded-full shadow-[0_0_15px_#C084FC] z-0" 
            />
            
            <div className="space-y-20">
              {processes.map((process, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={process.step}
                    initial={{ opacity: 0, x: isEven ? -50 : 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
                    className={`relative flex flex-col md:flex-row items-center z-10 ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Content Box */}
                    <div className="w-full md:w-1/2 pl-24 md:pl-0 md:px-16">
                      <div className={`p-8 rounded-[24px] hover:-translate-y-2 transition-transform duration-300 ${isEven ? 'md:text-left' : 'md:text-right'} pointer-events-auto`}
                        style={{
                          background: "rgba(18,18,28,0.45)",
                          border: "1px solid rgba(180,140,255,0.22)",
                          backdropFilter: "blur(18px)",
                        }}
                      >
                        <span className="text-[#C084FC] font-bold text-xl mb-3 block tracking-wider drop-shadow-[0_0_10px_rgba(192,132,252,0.5)]">
                          STEP {process.step}
                        </span>
                        <h4 className="text-white font-bold text-3xl mb-4">{process.title}</h4>
                        <p className="text-[rgba(255,255,255,0.55)] leading-relaxed text-lg">{process.desc}</p>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-12 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#12121c] border-[3px] border-[#C084FC] z-20 flex items-center justify-center shadow-[0_0_20px_rgba(192,132,252,0.4)]">
                      <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#fff]" />
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
