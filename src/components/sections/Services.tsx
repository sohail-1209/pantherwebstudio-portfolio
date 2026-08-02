"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, AppWindow, Smartphone, Layout,
  Search, Palette, ArrowDownToLine, Briefcase,
  User, LayoutDashboard, Settings, ShoppingCart, Sparkles,
  ChevronLeft, ChevronRight
} from "lucide-react";

const services = [
  { name: "Website Development", icon: Globe, desc: "Custom, responsive websites built with modern frameworks for top performance." },
  { name: "Web Applications", icon: AppWindow, desc: "Scalable, feature-rich web applications tailored to your business operations." },
  { name: "PWAs", icon: Smartphone, desc: "Progressive web apps delivering native-like mobile experiences directly in-browser." },
  { name: "Responsive Design", icon: Layout, desc: "Flawless layout responsiveness across all screen sizes and mobile devices." },
  { name: "SEO Optimization", icon: Search, desc: "Technical & structural search engine optimization to boost organic rankings." },
  { name: "UI/UX Design", icon: Palette, desc: "User-centric interface design, wireframes, and intuitive user experiences." },
  { name: "Landing Pages", icon: ArrowDownToLine, desc: "High-converting landing pages structured for maximum marketing impact." },
  { name: "Business Websites", icon: Briefcase, desc: "Professional corporate websites that establish trust and win clients." },
  { name: "Portfolio Websites", icon: User, desc: "Stunning personal portfolios designed to highlight creative achievements." },
  { name: "Custom Dashboards", icon: LayoutDashboard, desc: "Real-time data visualization dashboards tailored for quick decision making." },
  { name: "Admin Panels", icon: Settings, desc: "Secure, role-based backend portals for managing platform content and users." },
  { name: "E-Commerce Solutions", icon: ShoppingCart, desc: "Complete online storefronts with payment gateways, inventory, and analytics." },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const rotationAngle = -activeIndex * 30;

  return (
    <section id="services" className="py-14 md:py-20 relative bg-[var(--background)] select-none overflow-hidden flex flex-col justify-center items-center transition-colors duration-300">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] md:w-[700px] h-[550px] md:h-[700px] bg-[#8b5cf6]/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--glass-border)] mb-4">
            <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
            <span className="text-xs font-semibold tracking-wider text-[#8b5cf6] uppercase">Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--foreground)] tracking-tight">
            Our Core <span className="text-gradient-purple">Services</span>
          </h2>
          <p className="text-[var(--text-muted)] text-xs sm:text-sm md:text-base mt-3 max-w-md">
            Use the left & right buttons or select any icon on the circle to rotate through our services.
          </p>
        </motion.div>

        {/* Outer Flanking Buttons + Circle Container */}
        <div className="relative flex items-center justify-between w-full max-w-4xl my-2">
          
          {/* Left Rotate Button */}
          <button
            onClick={handlePrev}
            className="z-30 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[var(--surface)] border border-[var(--glass-border)] hover:bg-[#8b5cf6] text-[#8b5cf6] hover:text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 active:scale-95 flex-shrink-0"
            aria-label="Previous Service"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
          </button>

          {/* Center Orbit Circle Container */}
          <div className="relative w-[290px] h-[290px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] flex items-center justify-center mx-auto">
            {/* Guide Rings */}
            <div className="absolute inset-0 rounded-full border border-[var(--glass-border)] pointer-events-none shadow-sm" />
            <div className="absolute inset-12 sm:inset-16 rounded-full border border-dashed border-[var(--glass-border)] pointer-events-none opacity-60" />

            {/* Center Active Preview Card */}
            <div className="absolute inset-14 sm:inset-16 md:inset-20 rounded-full bg-[var(--surface)]/95 border border-[var(--glass-border)] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.1)] z-20 flex flex-col items-center justify-center p-4 sm:p-6 text-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center max-w-[170px] sm:max-w-[220px] md:max-w-[240px]"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-2xl bg-[var(--surface-hover)] border border-[#8b5cf6]/50 shadow-md flex items-center justify-center mb-2 sm:mb-3">
                    {(() => {
                      const IconComponent = services[activeIndex].icon;
                      return <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#8b5cf6]" />;
                    })()}
                  </div>
                  <h3 className="text-xs sm:text-base md:text-lg font-bold text-[var(--foreground)] mb-1 sm:mb-2 leading-tight">
                    {services[activeIndex].name}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] md:text-xs text-[var(--text-muted)] leading-relaxed line-clamp-3">
                    {services[activeIndex].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Rotating Icons Ring */}
            <motion.div
              animate={{ rotate: rotationAngle }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
              className="w-full h-full relative flex items-center justify-center z-10"
            >
              {services.map((item, index) => {
                const baseAngle = (index * 360) / 12;
                const isSelected = activeIndex === index;

                return (
                  <div
                    key={item.name}
                    className="absolute"
                    style={{
                      transform: `rotate(${baseAngle}deg) translate(var(--radius, 195px)) rotate(-${baseAngle}deg)`,
                    }}
                  >
                    <style jsx>{`
                      div {
                        --radius: 120px;
                      }
                      @media (min-width: 640px) {
                        div {
                          --radius: 155px;
                        }
                      }
                      @media (min-width: 768px) {
                        div {
                          --radius: 195px;
                        }
                      }
                    `}</style>
                    <motion.div
                      animate={{ rotate: -rotationAngle }}
                      transition={{ type: "spring", stiffness: 90, damping: 18 }}
                    >
                      <button
                        onClick={() => setActiveIndex(index)}
                        className={`w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isSelected
                            ? "bg-[#8b5cf6] text-white border-2 border-[#a78bfa] shadow-[0_0_25px_rgba(139,92,246,0.6)] scale-125"
                            : "bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--glass-border)] hover:bg-[#8b5cf6] hover:text-white"
                        }`}
                        aria-label={`Select ${item.name}`}
                      >
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      </button>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Rotate Button */}
          <button
            onClick={handleNext}
            className="z-30 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[var(--surface)] border border-[var(--glass-border)] hover:bg-[#8b5cf6] text-[#8b5cf6] hover:text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 active:scale-95 flex-shrink-0"
            aria-label="Next Service"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>

        {/* Service Counter Indicator */}
        <div className="mt-4 z-30">
          <span className="text-xs font-mono text-[var(--text-muted)] px-4 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--glass-border)]">
            Service {activeIndex + 1} of {services.length}
          </span>
        </div>

      </div>
    </section>
  );
}
