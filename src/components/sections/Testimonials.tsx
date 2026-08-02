"use client";

import { motion } from "framer-motion";
import { Sparkles, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Quikden",
    role: "Verified Client",
    content: "Panther Web Studio delivered an exceptional website that completely transformed our digital presence. The fast performance, responsive design, and smooth user experience are world-class.",
    avatar: "Q"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-14 md:py-20 relative bg-[var(--background)] select-none overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#8b5cf6]/10 rounded-full blur-[160px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--surface)]/80 backdrop-blur-xl border border-[var(--glass-border)] mb-4">
            <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
            <span className="text-xs font-semibold tracking-wider text-[#8b5cf6] uppercase">Client Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--foreground)] tracking-tight">
            Client <span className="text-gradient-purple">Review</span>
          </h2>
        </motion.div>

        {/* Quikden Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-[var(--surface)]/75 backdrop-blur-xl border border-[var(--glass-border)] rounded-3xl p-8 sm:p-12 md:p-14 shadow-[0_15px_40px_rgba(0,0,0,0.15)] max-w-3xl mx-auto"
        >
          <Quote className="w-12 h-12 text-[#8b5cf6]/50 mb-6" />

          <p className="text-lg sm:text-xl md:text-2xl text-[var(--foreground)] font-medium leading-relaxed italic">
            "{testimonials[0].content}"
          </p>

          <div className="mt-8 flex items-center gap-4 pt-6 border-t border-[var(--glass-border)]">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#7c3aed] to-[#8b5cf6] text-white font-bold text-xl flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)] flex-shrink-0">
              {testimonials[0].avatar}
            </div>
            <div>
              <h4 className="text-[var(--foreground)] font-bold text-lg md:text-xl">
                {testimonials[0].name}
              </h4>
              <p className="text-xs md:text-sm text-[#8b5cf6] font-medium">
                {testimonials[0].role}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
