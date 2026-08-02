"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sun, Moon } from "lucide-react";
import SpecularButton from "@/components/SpecularButton";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Why Us", href: "#why-us" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("pws_theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("pws_theme", newTheme);
    if (newTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[var(--background)]/85 backdrop-blur-md border-b border-[var(--glass-border)] shadow-lg"
          : "py-5"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center max-w-7xl">
        {/* Logo with #9598c7 Background */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="bg-[var(--logo-bg)] w-10 h-10 rounded-full overflow-hidden border border-[#8b5cf6]/50 shadow-[0_0_15px_rgba(139,92,246,0.35)] group-hover:scale-105 transition-transform relative p-0.5">
            <Image
              src="/logo.png"
              alt="Panther Web Studio Logo"
              fill
              sizes="40px"
              className="object-cover rounded-full"
            />
          </div>
          <span className="font-ethno font-bold text-lg tracking-wider text-[var(--foreground)]">
            PANTHER <span className="text-[#8b5cf6] font-normal">STUDIO</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 bg-[var(--surface)]/75 backdrop-blur-xl border border-[var(--glass-border)] px-8 py-2.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#8b5cf6] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Action Controls: Theme Toggle & Specular Button */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#8b5cf6] hover:scale-110 transition-all duration-300 shadow-md"
            aria-label="Toggle Theme"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-[#facc15]" />
            ) : (
              <Moon className="w-5 h-5 text-[#7c3aed]" />
            )}
          </button>

          {/* Specular Button */}
          <SpecularButton
            size="sm"
            radius={999}
            tint="#8b5cf6"
            tintOpacity={0.25}
            blur={8}
            textColor="#ffffff"
            lineColor="#a78bfa"
            baseColor={theme === "light" ? "#7c3aed" : "#1f1e2c"}
            intensity={1}
            shineSize={18}
            shineFade={45}
            thickness={1.5}
            speed={0.35}
            followMouse
            proximity={180}
            autoAnimate={false}
            href="#contact"
          >
            <span>Let's Talk</span>
          </SpecularButton>
        </div>

        {/* Mobile Menu & Theme Controls */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--glass-border)] text-[var(--foreground)]"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5 text-[#facc15]" /> : <Moon className="w-5 h-5 text-[#7c3aed]" />}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[var(--foreground)] p-2 rounded-lg bg-[var(--surface)] border border-[var(--glass-border)]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#8b5cf6]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[var(--background)]/95 backdrop-blur-2xl border-b border-[var(--glass-border)] px-6 py-6"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2">
                <SpecularButton
                  size="md"
                  radius={14}
                  tint="#8b5cf6"
                  tintOpacity={0.25}
                  textColor="#ffffff"
                  lineColor="#a78bfa"
                  baseColor={theme === "light" ? "#7c3aed" : "#1f1e2c"}
                  intensity={1}
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full justify-center"
                >
                  <span>Let's Talk</span>
                </SpecularButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
