"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { Sparkles, Send, Mail, Phone, Globe } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    toast.success("Message sent successfully! We'll get back to you soon.", {
      style: {
        background: 'var(--surface)',
        color: 'var(--foreground)',
        border: '1px solid var(--glass-border)',
        backdropFilter: 'blur(10px)',
      },
      iconTheme: {
        primary: '#8b5cf6',
        secondary: '#fff',
      },
    });
    setIsSubmitting(false);
    reset();
  };

  return (
    <section id="contact" className="py-14 md:py-20 relative bg-[var(--background)] select-none overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#8b5cf6]/10 rounded-full blur-[160px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Left Text / Contact Info */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--surface)]/80 backdrop-blur-xl border border-[var(--glass-border)] mb-4">
                <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
                <span className="text-xs font-semibold tracking-wider text-[#8b5cf6] uppercase">Contact Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 text-[var(--foreground)] tracking-tight">
                Let's build something <span className="text-gradient-purple">extraordinary.</span>
              </h2>
              <p className="text-[var(--text-muted)] text-sm sm:text-base md:text-lg mb-10 max-w-md leading-relaxed">
                Ready to elevate your digital presence with high performance and award-winning design? Get in touch today.
              </p>
              
              <div className="space-y-6 sm:space-y-8">
                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[var(--surface)] border border-[var(--glass-border)] flex items-center justify-center text-[#8b5cf6] shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[var(--text-muted)] uppercase tracking-widest text-[11px] font-bold">Email Us</h4>
                    <a href="mailto:pantherwebstudio@gmail.com" className="text-base sm:text-lg md:text-xl text-[var(--foreground)] hover:text-[#8b5cf6] transition-colors font-medium">
                      pantherwebstudio@gmail.com
                    </a>
                  </div>
                </div>

                {/* Mobile */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[var(--surface)] border border-[var(--glass-border)] flex items-center justify-center text-[#8b5cf6] shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[var(--text-muted)] uppercase tracking-widest text-[11px] font-bold">Call / WhatsApp</h4>
                    <a href="tel:9553081586" className="text-base sm:text-lg md:text-xl text-[var(--foreground)] hover:text-[#8b5cf6] transition-colors font-medium">
                      +91 9553081586
                    </a>
                  </div>
                </div>

                {/* Socials */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[var(--surface)] border border-[var(--glass-border)] flex items-center justify-center text-[#8b5cf6] shadow-sm">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[var(--text-muted)] uppercase tracking-widest text-[11px] font-bold">Social Media</h4>
                    <div className="flex space-x-5 mt-1">
                      <a href="https://instagram.com/pantherweb" target="_blank" rel="noopener noreferrer" className="text-[var(--foreground)] hover:text-[#8b5cf6] transition-all duration-300 font-medium text-xs sm:text-sm">
                        Instagram (@pantherweb)
                      </a>
                      <a href="https://wa.me/919553081586" target="_blank" rel="noopener noreferrer" className="text-[var(--foreground)] hover:text-[#8b5cf6] transition-all duration-300 font-medium text-xs sm:text-sm">
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Glass Form */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-7 sm:p-10 md:p-12 rounded-3xl bg-[var(--surface)]/75 backdrop-blur-xl border border-[var(--glass-border)] shadow-[0_15px_40px_rgba(0,0,0,0.15)]"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-6 sm:mb-8">Send us a message</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
                <div>
                  <input 
                    {...register("name")}
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full bg-[var(--background)]/80 backdrop-blur-xl border border-[var(--glass-border)] rounded-xl px-5 py-3.5 sm:py-4 text-[var(--foreground)] placeholder-[var(--text-muted)]/60 focus:outline-none focus:border-[#8b5cf6] transition-colors text-sm sm:text-base"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-2 ml-1">{errors.name.message}</p>}
                </div>
                
                <div>
                  <input 
                    {...register("email")}
                    type="email" 
                    placeholder="Your Email Address" 
                    className="w-full bg-[var(--background)]/80 backdrop-blur-xl border border-[var(--glass-border)] rounded-xl px-5 py-3.5 sm:py-4 text-[var(--foreground)] placeholder-[var(--text-muted)]/60 focus:outline-none focus:border-[#8b5cf6] transition-colors text-sm sm:text-base"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-2 ml-1">{errors.email.message}</p>}
                </div>
                
                <div>
                  <textarea 
                    {...register("message")}
                    placeholder="Tell us about your project or inquiry..." 
                    rows={4}
                    className="w-full bg-[var(--background)]/80 backdrop-blur-xl border border-[var(--glass-border)] rounded-xl px-5 py-3.5 sm:py-4 text-[var(--foreground)] placeholder-[var(--text-muted)]/60 focus:outline-none focus:border-[#8b5cf6] transition-colors resize-none text-sm sm:text-base"
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-2 ml-1">{errors.message.message}</p>}
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] text-white font-semibold py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 mt-2"
                >
                  {isSubmitting ? (
                    <motion.div 
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
