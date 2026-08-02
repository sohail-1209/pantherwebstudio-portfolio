"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Globe, ArrowRight, Sparkles, Zap, Layers 
} from "lucide-react";
import SpecularButton from "@/components/SpecularButton";
import DotField from "@/components/DotField";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[var(--background)] pt-24 pb-12 select-none transition-colors duration-300"
    >
      {/* Interactive Light-Colored DotField Canvas Background */}
      <div className="absolute inset-0 pointer-events-none opacity-65 z-0">
        <DotField
          dotRadius={1.8}
          dotSpacing={18}
          cursorRadius={450}
          bulgeStrength={55}
          glowRadius={180}
          sparkle={true}
          waveAmplitude={1.2}
        />
      </div>

      {/* Ambient Light Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#8b5cf6]/20 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-1/3 -left-32 w-[450px] h-[450px] bg-[#7c3aed]/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 -right-32 w-[500px] h-[500px] bg-[#6d28d9]/15 rounded-full blur-[130px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        {/* Main Grid: Text on Left, Logo Showcase on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Announcement Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)]/80 backdrop-blur-xl border border-[var(--glass-border)] shadow-[0_0_20px_rgba(139,92,246,0.15)] mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
              <span className="text-xs md:text-sm font-medium text-[var(--text-muted)]">
                Next-Generation Web Development Agency
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--foreground)] leading-[1.1]"
            >
              Architecting High-Speed <br />
              <span className="text-gradient-purple">Digital Experiences</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-5 text-base sm:text-lg md:text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed"
            >
              We design & build ultra-responsive websites, web applications, and enterprise digital solutions crafted exclusively with performance, SEO, and aesthetics in mind.
            </motion.p>

            {/* Specular Light Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto"
            >
              <SpecularButton
                size="lg"
                radius={18}
                tint="#8b5cf6"
                tintOpacity={0.25}
                blur={0}
                textColor="#ffffff"
                lineColor="#a78bfa"
                baseColor="#7c3aed"
                intensity={1}
                shineSize={12}
                shineFade={45}
                thickness={1.2}
                speed={0.35}
                followMouse
                proximity={250}
                autoAnimate={false}
                href="#portfolio"
              >
                <span>View Our Work</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </SpecularButton>

              <SpecularButton
                size="lg"
                radius={18}
                tint="#ffffff"
                tintOpacity={0}
                blur={0}
                textColor="var(--foreground)"
                lineColor="#8b5cf6"
                baseColor="var(--surface)"
                intensity={1}
                shineSize={10}
                shineFade={40}
                thickness={1}
                speed={0.35}
                followMouse
                proximity={250}
                autoAnimate={false}
                href="#contact"
              >
                <span>Get Started</span>
              </SpecularButton>
            </motion.div>
          </div>

          {/* Right Column: Central Logo Glass Showcase with var(--logo-bg) Background */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="relative flex items-center justify-center my-2 lg:my-0"
            >
              <div className="absolute inset-0 bg-[#8b5cf6]/25 rounded-full blur-3xl animate-pulse" />
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full border-2 border-[#8b5cf6]/50 p-3 shadow-[0_0_40px_rgba(139,92,246,0.35)]">
                <div className="w-full h-full rounded-full border border-dashed border-[#8b5cf6]/60 animate-[spin_20s_linear_infinite] p-3" />
                {/* Logo background adapts smoothly with var(--logo-bg) */}
                <div className="absolute inset-4 rounded-full overflow-hidden bg-[var(--logo-bg)] backdrop-blur-xl border border-[rgba(167,139,250,0.4)] shadow-[0_0_30px_rgba(139,92,246,0.4)] flex items-center justify-center transition-colors duration-300">
                  <Image
                    src="/only panther.png"
                    alt="Panther Web Studio Logo"
                    fill
                    sizes="(max-width: 768px) 200px, 280px"
                    className="object-contain p-3"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Feature Glass Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
        >
          {[
            { icon: Zap, title: "Blazing Fast", desc: "Optimized for 99+ Lighthouse" },
            { icon: Layers, title: "Modern Tech", desc: "React, Next.js, TypeScript" },
            { icon: Globe, title: "SEO-Ready", desc: "Built for top Google rankings" },
            { icon: Sparkles, title: "Tailored UI", desc: "Award-worthy aesthetics" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-4 sm:p-5 rounded-2xl bg-[var(--surface)]/75 backdrop-blur-xl border border-[var(--glass-border)] hover:border-[#8b5cf6]/50 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_35px_rgba(139,92,246,0.2)] transition-all duration-300 hover:-translate-y-1"
            >
              <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#8b5cf6] mb-2" />
              <h3 className="text-xs sm:text-sm font-bold text-[var(--foreground)]">{item.title}</h3>
              <p className="text-[11px] sm:text-xs text-[var(--text-muted)] mt-1 text-center leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
