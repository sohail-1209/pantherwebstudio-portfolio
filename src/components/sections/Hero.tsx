"use client";

import { Canvas } from "@react-three/fiber";
import HeroScene from "@/components/3d/HeroScene";
import { Suspense } from "react";
import { Globe, Code, Smartphone, LineChart, PenTool, ShieldCheck } from "lucide-react";
import BorderGlow from "../BorderGlow";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const FloatingCard = ({ icon: Icon, title, desc, initX, initY, rotY, zValue, amp, dur }: any) => (
  <motion.div
    initial={{
      opacity: 0,
      x: initX,
      y: initY,
      z: zValue * 1000,
      rotateY: rotY,
      rotateZ: 0
    }}
    animate={{
      opacity: 1,
      x: initX,
      y: [initY - amp, initY + amp, initY - amp],
      z: zValue * 1000,
      rotateY: rotY,
      rotateZ: [-1, 1, -1]
    }}
    transition={{
      opacity: { duration: 0.8 },
      y: { duration: dur, repeat: Infinity, ease: "easeInOut" },
      rotateZ: { duration: dur * 1.2, repeat: Infinity, ease: "easeInOut" }
    }}
    className="absolute left-1/2 top-1/2 pointer-events-auto cursor-pointer"
    style={{
      marginLeft: -90,
      marginTop: -38,
      transformStyle: "preserve-3d",
      width: "180px",
      height: "76px",
    }}
  >
    <BorderGlow
      edgeSensitivity={30}
      glowColor="40 80 80"
      backgroundColor="rgba(18,18,28,0.45)"
      borderRadius={20}
      glowRadius={40}
      glowIntensity={1}
      coneSpread={25}
      animated={false}
      colors={['#c084fc', '#f472b6', '#38bdf8']}
      className="w-full h-full"
    >
      <div
        className="flex items-center justify-start w-full h-full overflow-hidden"
        style={{
          padding: "12px",
          gap: "10px",
          borderRadius: "20px",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: "0 0 20px rgba(165,95,255,0.15), inset 0 0 0 1px rgba(255,255,255,0.04)"
        }}
      >
        <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(140,90,255,0.12)", border: "1px solid rgba(170,120,255,0.25)" }} className="flex-shrink-0 flex items-center justify-center">
          <Icon className="w-4 h-4 text-[#C084FC]" />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <h3 className="font-ethno truncate" style={{ fontSize: "10px", color: "#F5F5F7", lineHeight: 1.2 }}>{title}</h3>
          <p className="truncate" style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)", marginTop: "4px", lineHeight: 1.2 }}>{desc}</p>
        </div>
      </div>
    </BorderGlow>
  </motion.div>
);

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden bg-black select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 cursor-move cursor-none">
        <Canvas>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Floating Logo Overlay & Absolute Precision Cards - CSS 3D Parallax */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1500
        }}
      >

        {/* Absolutely Positioned Cards container (Hidden on mobile) */}
        <div className="hidden lg:block absolute inset-2" style={{ transformStyle: "preserve-3d" }}>

          {/* Left Column */}
          <FloatingCard icon={Globe} title="Web Design" desc="Amazing experiences that resonate." initX={-290} initY={-110} rotY={8} zValue={-0.15} amp={8} dur={3.2} />
          <FloatingCard icon={Code} title="Web Apps" desc="Powerful applications built for speed." initX={-260} initY={-20} rotY={6} zValue={0} amp={6} dur={2.8} />
          <FloatingCard icon={Smartphone} title="Web Development" desc="Fast, scalable solutions." initX={-240} initY={80} rotY={5} zValue={0.12} amp={10} dur={3.5} />

          {/* Right Column (Mirrored) */}
          <FloatingCard icon={LineChart} title="SEO Optimization" desc="Rank higher on search engines." initX={290} initY={-110} rotY={-8} zValue={0.08} amp={7} dur={3.1} />
          <FloatingCard icon={PenTool} title="UI/UX Design" desc="Intuitive user experiences." initX={260} initY={-20} rotY={-6} zValue={-0.05} amp={9} dur={2.9} />
          <FloatingCard icon={ShieldCheck} title="Maintenance" desc="We keep your site secure." initX={245} initY={80} rotY={-5} zValue={0.15} amp={8} dur={3.3} />

        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto" style={{ transformStyle: "preserve-3d" }}>
          <motion.div
            className="relative w-56 h-56 md:w-72 md:h-72 flex flex-shrink-0 items-center justify-center"
            initial={{ z: 0 }}
            animate={{ y: [-10, 10, -10], z: 50 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Logo Background Glow */}
            <div className="absolute inset-0 bg-[#8B5CF6]/30 rounded-full blur-2xl animate-pulse"></div>

            {/* Spinning Neon Ring */}
            <div className="absolute inset-0 rounded-full border-[3px] border-[#C084FC]/80 shadow-[0_0_20px_#C084FC] animate-[spin_8s_linear_infinite]">
              {/* Orbital tracking dots */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_white]"></div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#C084FC] rounded-full shadow-[0_0_10px_#C084FC]"></div>
            </div>

            {/* Actual Logo Image */}
            <img
              src="/logo.jpeg"
              alt="Panther Logo"
              className="relative z-10 w-[95%] h-[95%] object-cover rounded-full drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]"
            />
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}
