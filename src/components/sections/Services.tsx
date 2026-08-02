"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, AppWindow, ShoppingCart, Smartphone,
  Search, Edit3, Megaphone, Settings,
  Sparkles, Palette, ChevronLeft, ChevronRight, Check, ArrowRight
} from "lucide-react";
import Link from "next/link";

const services = [
  { 
    name: "Website Development", 
    icon: Globe, 
    desc: "Custom, responsive websites built with modern frameworks for your business.",
    features: ["100% Responsive", "SEO Friendly", "Fast Loading", "Secure & Scalable"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80"
  },
  { 
    name: "Web Development", 
    icon: AppWindow, 
    desc: "Scalable, feature-rich web applications tailored to your business operations.",
    features: ["Custom Architecture", "API Integration", "High Scalability", "Real-time Data"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80"
  },
  { 
    name: "E-Commerce Solutions", 
    icon: ShoppingCart, 
    desc: "Complete online storefronts with payment gateways, inventory, and analytics.",
    features: ["Stripe / Payment", "Inventory System", "Fast Checkout", "Conversion Ready"],
    image: "/quikden.png"
  },
  { 
    name: "Mobile App Development", 
    icon: Smartphone, 
    desc: "Progressive web apps & mobile apps delivering native-like user experiences.",
    features: ["iOS & Android", "Offline Capable", "Push Notifications", "Smooth UI"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80"
  },
  { 
    name: "SEO Optimization", 
    icon: Search, 
    desc: "Technical & structural search engine optimization to boost organic rankings.",
    features: ["Top Google Rank", "Lighthouse 99+", "Meta & Schema", "Keyword Target"],
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&auto=format&fit=crop&q=80"
  },
  { 
    name: "Content Writing", 
    icon: Edit3, 
    desc: "Engaging copy and content marketing designed to convert visitors into clients.",
    features: ["Copywriting", "SEO Content", "Brand Story", "Conversion Copy"],
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80"
  },
  { 
    name: "Social Media Marketing", 
    icon: Megaphone, 
    desc: "Strategic digital marketing campaigns to expand brand reach and drive leads.",
    features: ["Audience Growth", "Ad Campaigns", "Brand Awareness", "Lead Capture"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&auto=format&fit=crop&q=80"
  },
  { 
    name: "Maintenance & Support", 
    icon: Settings, 
    desc: "24/7 technical monitoring, security updates, and performance maintenance.",
    features: ["99.9% Uptime", "Security Patch", "Daily Backups", "24/7 Support"],
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&auto=format&fit=crop&q=80"
  },
  { 
    name: "Branding", 
    icon: Sparkles, 
    desc: "Complete visual brand identity, logos, design systems, and brand guidelines.",
    features: ["Logo Design", "Brand Guidelines", "Color Palette", "Design System"],
    image: "/aura-salon.png"
  },
  { 
    name: "UI/UX Design", 
    icon: Palette, 
    desc: "User-centric interface design, wireframes, and intuitive user experiences.",
    features: ["Figma Prototypes", "Wireframing", "User Research", "Modern Aesthetics"],
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format&fit=crop&q=80"
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const rotationAngle = -activeIndex * 36; // 360 / 10 = 36 deg

  return (
    <section id="services" className="py-14 md:py-20 relative bg-[var(--background)] select-none overflow-hidden flex flex-col justify-center items-center transition-colors duration-300">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[750px] h-[600px] md:h-[750px] bg-[#8b5cf6]/10 rounded-full blur-[160px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center max-w-7xl">
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

        {/* Orbit Wheel Container with Flanking Buttons */}
        <div className="relative flex items-center justify-between w-full max-w-6xl my-2 px-2 sm:px-6">
          
          {/* Left Rotate Arrow Button */}
          <button
            onClick={handlePrev}
            className="z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[var(--surface)] border border-[var(--glass-border)] hover:bg-[#8b5cf6] text-[#8b5cf6] hover:text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 flex-shrink-0"
            aria-label="Previous Service"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Orbit Wheel & Central Mockup Card Container */}
          <div className="relative w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] md:w-[620px] md:h-[620px] lg:w-[720px] lg:h-[720px] flex items-center justify-center mx-auto">
            
            {/* Translucent Guide Orbit Rings */}
            <div className="absolute inset-4 rounded-full border border-[var(--glass-border)] pointer-events-none shadow-sm" />
            <div className="absolute inset-16 sm:inset-20 rounded-full border border-dashed border-[var(--glass-border)] pointer-events-none opacity-50" />

            {/* Central Service Glass Mockup Card */}
            <div className="absolute z-20 w-[270px] sm:w-[380px] md:w-[460px] lg:w-[520px] bg-[var(--surface)]/95 backdrop-blur-2xl border border-[var(--glass-border)] rounded-3xl p-5 sm:p-7 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col items-center text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col items-center"
                >
                  {/* Top Glowing Icon Badge */}
                  <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/40 flex items-center justify-center text-[#8b5cf6] mb-3 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                    {(() => {
                      const IconComponent = services[activeIndex].icon;
                      return <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />;
                    })()}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base sm:text-xl md:text-2xl font-bold text-[var(--foreground)] mb-1 text-center">
                    <span className="text-[#8b5cf6] mr-1.5">–</span>
                    {services[activeIndex].name}
                  </h3>
                  <p className="text-[11px] sm:text-xs md:text-sm text-[var(--text-muted)] text-center leading-relaxed mb-4 max-w-sm">
                    {services[activeIndex].desc}
                  </p>

                  {/* Card Content Grid: Left Bullet Points, Right Preview Mockup Image */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 w-full items-center mb-5">
                    {/* Bullet Points */}
                    <div className="sm:col-span-6 space-y-2">
                      {services[activeIndex].features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center text-[#8b5cf6] flex-shrink-0">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span className="text-[11px] sm:text-xs font-medium text-[var(--foreground)]">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Right Laptop Frame Preview Image */}
                    <div className="hidden sm:block sm:col-span-6">
                      <div className="relative w-full h-28 sm:h-32 rounded-xl overflow-hidden border border-[var(--glass-border)] shadow-md bg-[var(--background)] group">
                        <img
                          src={services[activeIndex].image}
                          alt={services[activeIndex].name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/80 via-transparent to-transparent" />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons Inside Card */}
                  <div className="flex flex-row items-center justify-center gap-3 w-full">
                    <Link
                      href="#portfolio"
                      className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] text-white text-xs sm:text-sm font-semibold shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] flex items-center gap-1.5 transition-all hover:scale-105"
                    >
                      <span>View Projects</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="#contact"
                      className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-[var(--surface-hover)] border border-[var(--glass-border)] text-[var(--foreground)] text-xs sm:text-sm font-semibold hover:border-[#8b5cf6] flex items-center gap-1.5 transition-all hover:scale-105"
                    >
                      <span>Get Quote</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#8b5cf6]" />
                    </Link>
                  </div>

                  {/* Pagination Dots */}
                  <div className="flex items-center gap-1.5 mt-4">
                    {services.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === activeIndex ? "w-5 bg-[#8b5cf6]" : "w-1.5 bg-[var(--text-muted)]/40"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Rotating Orbit Ring Nodes & Text Labels */}
            <motion.div
              animate={{ rotate: rotationAngle }}
              transition={{ type: "spring", stiffness: 85, damping: 18 }}
              className="w-full h-full relative flex items-center justify-center z-10 pointer-events-none"
            >
              {services.map((item, index) => {
                const baseAngle = (index * 360) / services.length;
                const isSelected = activeIndex === index;

                return (
                  <div
                    key={item.name}
                    className="absolute pointer-events-auto"
                    style={{
                      transform: `rotate(${baseAngle}deg) translate(var(--orbit-radius, 290px)) rotate(-${baseAngle}deg)`,
                    }}
                  >
                    <style jsx>{`
                      div {
                        --orbit-radius: 140px;
                      }
                      @media (min-width: 640px) {
                        div {
                          --orbit-radius: 205px;
                        }
                      }
                      @media (min-width: 768px) {
                        div {
                          --orbit-radius: 255px;
                        }
                      }
                      @media (min-width: 1024px) {
                        div {
                          --orbit-radius: 300px;
                        }
                      }
                    `}</style>
                    <motion.div
                      animate={{ rotate: -rotationAngle }}
                      transition={{ type: "spring", stiffness: 85, damping: 18 }}
                      className="flex flex-col items-center"
                    >
                      {/* Node Circle Button */}
                      <button
                        onClick={() => setActiveIndex(index)}
                        className={`w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isSelected
                            ? "bg-gradient-to-tr from-[#7c3aed] to-[#8b5cf6] text-white border-2 border-white/80 shadow-[0_0_25px_rgba(139,92,246,0.7)] scale-125"
                            : "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--glass-border)] hover:bg-[#8b5cf6] hover:text-white shadow-md"
                        }`}
                        aria-label={`Select ${item.name}`}
                      >
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      </button>

                      {/* Text Label Below Node */}
                      <span className={`text-[9px] sm:text-[11px] font-semibold mt-1.5 whitespace-nowrap transition-colors duration-300 ${
                        isSelected ? "text-[#8b5cf6] font-bold" : "text-[var(--text-muted)]"
                      }`}>
                        {item.name}
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Rotate Arrow Button */}
          <button
            onClick={handleNext}
            className="z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[var(--surface)] border border-[var(--glass-border)] hover:bg-[#8b5cf6] text-[#8b5cf6] hover:text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 flex-shrink-0"
            aria-label="Next Service"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Service Counter Indicator Pill */}
        <div className="mt-6 z-30">
          <span className="text-xs font-mono text-[var(--text-muted)] px-5 py-2 rounded-full bg-[var(--surface)] border border-[var(--glass-border)] shadow-sm">
            Service {activeIndex + 1} of {services.length}
          </span>
        </div>

      </div>
    </section>
  );
}
