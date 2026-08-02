import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--glass-border)] bg-[var(--background)] pt-14 pb-8 relative z-10 select-none">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4 group inline-flex">
              <div className="w-10 h-10 rounded-full overflow-hidden relative bg-[var(--logo-bg)] border border-[#8b5cf6]/50 shadow-md">
                <Image
                  src="/only panther.png"
                  alt="Panther Web Studio"
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                />
              </div>
              <span className="font-ethno font-bold text-xl tracking-wider text-[var(--foreground)]">
                PANTHER
              </span>
              <span className="text-[#8b5cf6] font-light text-xl">WEB STUDIO</span>
            </Link>
            <p className="text-[var(--text-muted)] text-sm max-w-sm leading-relaxed">
              We build high-performance Websites, Web Applications, PWAs, and SEO-optimized enterprise solutions engineered for maximum conversion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[var(--foreground)] font-semibold text-base mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Home", href: "#home" },
                { name: "Services", href: "#services" },
                { name: "Portfolio", href: "#portfolio" },
                { name: "Why Us", href: "#why-us" },
                { name: "Testimonials", href: "#testimonials" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-muted)] hover:text-[#8b5cf6] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-[var(--foreground)] font-semibold text-base mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="mailto:pantherwebstudio@gmail.com" className="text-[var(--text-muted)] hover:text-[var(--foreground)] flex items-center space-x-3 transition-colors">
                  <FaEnvelope className="text-[#8b5cf6]" />
                  <span>pantherwebstudio@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:9553081586" className="text-[var(--text-muted)] hover:text-[var(--foreground)] flex items-center space-x-3 transition-colors">
                  <FaPhone className="text-[#8b5cf6]" />
                  <span>+91 9553081586</span>
                </a>
              </li>
              <li className="pt-4 flex space-x-3">
                <a href="https://instagram.com/pantherwebstudio" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--foreground)] hover:text-[#8b5cf6] hover:border-[#8b5cf6] transition-all" title="Instagram @pantherwebstudio">
                  <FaInstagram />
                </a>
                <a href="https://wa.me/919553081586" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--foreground)] hover:text-[#8b5cf6] hover:border-[#8b5cf6] transition-all" title="WhatsApp 9553081586">
                  <FaWhatsapp />
                </a>
                <a href="mailto:pantherwebstudio@gmail.com" className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--foreground)] hover:text-[#8b5cf6] hover:border-[#8b5cf6] transition-all" title="Email">
                  <FaEnvelope />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[var(--glass-border)] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[var(--text-muted)]">
          <p>
            © {new Date().getFullYear()} Panther Web Studio. All rights reserved.
          </p>
          <p className="flex items-center mt-4 md:mt-0">
            Crafted with precision by Panther Web Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
