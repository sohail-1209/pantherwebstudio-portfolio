"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Globe, AppWindow, Smartphone, Layout,
  Search, Palette, ArrowDownToLine, Briefcase,
  User, LayoutDashboard, Settings, ShoppingCart
} from "lucide-react";
import BorderGlow from "../BorderGlow";

const services = [
  { name: "Website Development", icon: Globe, color: "#C084FC" },
  { name: "Web Applications", icon: AppWindow, color: "#F472B6" },
  { name: "PWAs", icon: Smartphone, color: "#38BDF8" },
  { name: "Responsive Websites", icon: Layout, color: "#4ADE80" },
  { name: "SEO Optimization", icon: Search, color: "#FBBF24" },
  { name: "UI/UX Design", icon: Palette, color: "#F87171" },
  { name: "Landing Pages", icon: ArrowDownToLine, color: "#818CF8" },
  { name: "Business Websites", icon: Briefcase, color: "#34D399" },
  { name: "Portfolio Websites", icon: User, color: "#A78BFA" },
  { name: "Custom Dashboards", icon: LayoutDashboard, color: "#F43F5E" },
  { name: "Admin Panels", icon: Settings, color: "#2DD4BF" },
  { name: "E-Commerce Solutions", icon: ShoppingCart, color: "#FB923C" },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  // The circle will rotate from 0 to -360 degrees as we scroll
  const rotate = useTransform(smoothProgress, [0, 1], [0, -360]);

  const [activeIndex, setActiveIndex] = useState(6); // Default to item at 180 deg

  useEffect(() => {
    return smoothProgress.onChange((v) => {
      // Calculate which item is at the left edge (180 degrees)
      const index = Math.round(6 + v * 12) % 12;
      const safeIndex = (index + 12) % 12;
      setActiveIndex(safeIndex);
    });
  }, [smoothProgress]);

  return (
    <section ref={containerRef} id="services" className="relative h-[400vh] bg-[#030303] select-none">

      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-[#8B5CF6]/10 rounded-full blur-[150px]" />
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#38BDF8]/5 rounded-full blur-[150px]" />
        </div>

        {/* Left Side Content (Text) */}
        <div className="absolute left-6 md:left-16 lg:left-32 top-[35%] md:top-1/2 -translate-y-1/2 z-30 w-[90%] md:w-full max-w-lg flex flex-col pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-ethno text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-wide">
              PREMIUM <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] to-[#38bdf8]">
                SERVICES
              </span>
            </h2>
            <p className="text-lg text-gray-400 mb-12 max-w-md border-l-2 border-[#C084FC]/30 pl-4 py-1">
              Orbiting the bleeding edge of web technology to deliver unparalleled digital experiences. Keep scrolling to explore.
            </p>

            {/* Active Item Details with BorderGlow */}
            <div className="relative h-[160px] w-full md:w-[450px]">
              {services.map((service, idx) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{
                    opacity: activeIndex === idx ? 1 : 0,
                    y: activeIndex === idx ? 0 : 20,
                    scale: activeIndex === idx ? 1 : 0.9,
                    pointerEvents: activeIndex === idx ? 'auto' : 'none'
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <BorderGlow
                    edgeSensitivity={40}
                    glowColor="0 0 100"
                    backgroundColor="rgba(15,15,22,0.8)"
                    borderRadius={24}
                    glowRadius={40}
                    glowIntensity={0.8}
                    coneSpread={30}
                    animated={true}
                    colors={[service.color, '#ffffff', service.color]}
                    className="w-full h-full"
                  >
                    <div className="w-full h-full p-6 flex items-center gap-6 rounded-[24px] backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                      <div className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg bg-white/5 border border-white/10" style={{ boxShadow: `0 0 20px ${service.color}40` }}>
                        <service.icon className="w-8 h-8" style={{ color: service.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-ethno text-xl md:text-2xl text-white tracking-wide">{service.name}</h3>
                        <p className="text-sm text-gray-400 mt-2 font-sans">
                          Bespoke solutions tailored to elevate your business in the digital landscape.
                        </p>
                      </div>
                    </div>
                  </BorderGlow>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side Rotating Wheel */}
        <div className="absolute top-[80%] md:top-1/2 right-[-25%] sm:right-[-10%] md:right-[5%] lg:right-[15%] -translate-y-1/2 pointer-events-none z-10 scale-[0.6] sm:scale-75 md:scale-100">
          <motion.div
            className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full border border-white/10 shadow-[inset_0_0_100px_rgba(255,255,255,0.02)]"
            style={{ rotate }}
          >
            {services.map((service, i) => {
              const angle = (i * 360) / 12;
              const radius = 50;
              const x = `calc(${radius}% * ${Math.cos((angle * Math.PI) / 180)} + 50%)`;
              const y = `calc(${radius}% * ${Math.sin((angle * Math.PI) / 180)} + 50%)`;

              // Un-rotate the icons so they stay perfectly upright while the wheel turns!
              const unRotate = useTransform(rotate, (r) => -r);
              const isActive = i === activeIndex;

              return (
                <motion.div
                  key={i}
                  className="absolute w-20 h-20 md:w-24 md:h-24 -ml-10 -mt-10 md:-ml-12 md:-mt-12"
                  style={{ left: x, top: y, rotate: unRotate }}
                >
                  <div
                    className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-700 border ${isActive
                        ? 'scale-125 md:scale-150 border-white/50 bg-white/10 z-20 shadow-2xl'
                        : 'scale-100 border-white/10 bg-black/50 z-10'
                      }`}
                    style={{
                      backdropFilter: 'blur(12px)',
                      boxShadow: isActive ? `0 0 40px ${service.color}60, inset 0 0 20px ${service.color}40` : 'none'
                    }}
                  >
                    <service.icon
                      className="w-8 h-8 md:w-10 md:h-10 transition-colors duration-700"
                      style={{ color: isActive ? service.color : 'rgba(255,255,255,0.2)' }}
                    />
                  </div>
                </motion.div>
              );
            })}

            {/* Center Orbital Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-white/5 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border border-white/10 flex items-center justify-center bg-black/40 backdrop-blur-md">
                <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary rounded-full animate-pulse shadow-[0_0_30px_#8B5CF6]" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
