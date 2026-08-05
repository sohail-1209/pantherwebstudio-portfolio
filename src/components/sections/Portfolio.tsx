"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";

const categories = ["All", "Web App", "Business"];

const projects = [
  {
    id: 1,
    title: "QuikDen - Room & Flatmate Finder",
    category: "Web App",
    description: "India's fastest growing room finder platform connecting users with verified rentals, shared rooms, hostels, and flatmates with zero broker fees.",
    image: "/quikden.png",
    link: "https://quikden.in",
    tags: ["Next.js", "React", "Node.js", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "Aura Salon & Beauty Studio",
    category: "Business",
    description: "Luxury salon & beauty studio web application featuring treatment showcases, online appointment booking, and premium aesthetics.",
    image: "/aura-salon.png",
    link: "https://maseerareem.github.io/aura-salon",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive"],
  },
  {
    id: 3,
    title: "Restaurant X - Sensory Gastronomy",
    category: "Business",
    description: "3 Michelin Star luxury fine dining experience featuring WhatsApp table reservations, interactive culinary menus, and avant-garde minimalist art.",
    image: "/restaurant-x.png",
    link: "https://restaurent-x.vercel.app",
    tags: ["Next.js", "React", "Tailwind CSS", "WhatsApp API"],
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-14 md:py-20 relative bg-[var(--background)] select-none overflow-hidden transition-colors duration-300">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-[#8b5cf6]/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 -left-40 w-[600px] h-[600px] bg-[#6d28d9]/10 rounded-full blur-[160px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--glass-border)] mb-4"
            >
              <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
              <span className="text-xs font-semibold tracking-wider text-[#8b5cf6] uppercase">Our Work</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--foreground)] tracking-tight"
            >
              Featured <span className="text-gradient-purple">Projects</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[var(--text-muted)] text-sm md:text-base max-w-md leading-relaxed"
          >
            Explore our featured client applications built for high performance, verified user trust, and real business scaling.
          </motion.p>
        </div>

        {/* Category Filter Glass Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                  : "bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--glass-border)] hover:bg-[#8b5cf6] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Glass Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl overflow-hidden bg-[var(--surface)]/75 backdrop-blur-xl border border-[var(--glass-border)] hover:border-[#8b5cf6]/50 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_40px_rgba(139,92,246,0.2)] transition-all duration-500 flex flex-col hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-[var(--background)]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-80" />
                  
                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[var(--surface)]/90 backdrop-blur-xl border border-[var(--glass-border)] text-xs font-semibold text-[#8b5cf6]">
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)] group-hover:text-[#8b5cf6] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2.5 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Tags & Live Link */}
                  <div className="mt-6 pt-4 border-t border-[var(--glass-border)] flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-[var(--surface-hover)] border border-[var(--glass-border)] text-[10px] sm:text-[11px] font-medium text-[#8b5cf6]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#8b5cf6] text-white flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:scale-110 flex-shrink-0 gap-1"
                        title={`Visit ${project.title}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
