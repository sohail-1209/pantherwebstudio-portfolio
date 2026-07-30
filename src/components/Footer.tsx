import Link from "next/link";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-8 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4 group inline-block">
              <span className="font-bold text-2xl tracking-wider text-white">
                PANTHER
              </span>
              <span className="text-primary font-light text-2xl">WEB STUDIO</span>
            </Link>
            <p className="text-gray-400 max-w-sm">
              We build premium Websites, Web Applications, PWAs and SEO optimized business solutions that grow your brand.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Services", "Portfolio", "Why Us", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:hello@pantherwebstudio.com" className="text-gray-400 hover:text-white flex items-center space-x-3 transition-colors">
                  <FaEnvelope className="text-primary" />
                  <span>hello@pantherwebstudio.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="text-gray-400 hover:text-white flex items-center space-x-3 transition-colors">
                  <FaPhone className="text-primary" />
                  <span>+1 (234) 567-890</span>
                </a>
              </li>
              <li className="pt-4 flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-primary hover:scale-110 transition-all">
                  <FaInstagram />
                </a>
                <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-primary hover:scale-110 transition-all">
                  <FaLinkedin />
                </a>
                <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-primary hover:scale-110 transition-all">
                  <FaWhatsapp />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Panther Web Studio. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center mt-4 md:mt-0">
            Made with <span className="text-red-500 mx-1">❤️</span> by Panther Web Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
