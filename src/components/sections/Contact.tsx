import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";

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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    toast.success("Message sent successfully! We'll get back to you soon.", {
      style: {
        background: 'rgba(18,18,28,0.9)',
        color: '#fff',
        border: '1px solid rgba(180,140,255,0.4)',
        backdropFilter: 'blur(10px)',
      },
      iconTheme: {
        primary: '#C084FC',
        secondary: '#fff',
      },
    });
    setIsSubmitting(false);
    reset();
  };

  return (
    <section id="contact" className="py-32 relative bg-black select-none">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Text / Info */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                Let's build something <span className="text-[#C084FC]">amazing.</span>
              </h2>
              <p className="text-[rgba(255,255,255,0.55)] text-lg mb-12 max-w-md leading-relaxed">
                Ready to take your digital presence to the next level? Drop us a message and we'll start the conversation.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-[rgba(255,255,255,0.4)] uppercase tracking-widest text-xs font-bold mb-2">Email</h4>
                  <a href="mailto:hello@pantherwebstudio.com" className="text-xl text-white hover:text-[#C084FC] transition-colors font-medium">
                    hello@pantherwebstudio.com
                  </a>
                </div>
                <div>
                  <h4 className="text-[rgba(255,255,255,0.4)] uppercase tracking-widest text-xs font-bold mb-2">Phone</h4>
                  <a href="tel:+1234567890" className="text-xl text-white hover:text-[#C084FC] transition-colors font-medium">
                    +1 (234) 567-890
                  </a>
                </div>
                <div>
                  <h4 className="text-[rgba(255,255,255,0.4)] uppercase tracking-widest text-xs font-bold mb-3">Socials</h4>
                  <div className="flex space-x-6">
                    <a href="#" className="text-white/70 hover:text-[#C084FC] hover:-translate-y-1 transition-all duration-300 font-medium">Instagram</a>
                    <a href="#" className="text-white/70 hover:text-[#C084FC] hover:-translate-y-1 transition-all duration-300 font-medium">LinkedIn</a>
                    <a href="#" className="text-white/70 hover:text-[#C084FC] hover:-translate-y-1 transition-all duration-300 font-medium">WhatsApp</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 md:p-12 rounded-[30px] relative overflow-hidden"
              style={{
                background: "rgba(18,18,28,0.45)",
                border: "1px solid rgba(180,140,255,0.22)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                boxShadow: "0 0 30px rgba(165,95,255,0.1), inset 0 0 0 1px rgba(255,255,255,0.02)"
              }}
            >
              <h3 className="text-3xl font-bold text-white mb-8">Send us a message</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="relative group">
                  <input 
                    {...register("name")}
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full bg-[rgba(255,255,255,0.03)] border-b-2 border-white/10 rounded-t-xl px-6 py-4 text-white placeholder-white/30 focus:outline-none transition-colors"
                  />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#C084FC] transition-all duration-300 group-focus-within:w-full shadow-[0_0_10px_#C084FC]" />
                  {errors.name && <p className="text-red-400 text-sm mt-2 ml-2">{errors.name.message}</p>}
                </div>
                
                <div className="relative group">
                  <input 
                    {...register("email")}
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full bg-[rgba(255,255,255,0.03)] border-b-2 border-white/10 rounded-t-xl px-6 py-4 text-white placeholder-white/30 focus:outline-none transition-colors"
                  />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#C084FC] transition-all duration-300 group-focus-within:w-full shadow-[0_0_10px_#C084FC]" />
                  {errors.email && <p className="text-red-400 text-sm mt-2 ml-2">{errors.email.message}</p>}
                </div>
                
                <div className="relative group">
                  <textarea 
                    {...register("message")}
                    placeholder="Tell us about your project..." 
                    rows={4}
                    className="w-full bg-[rgba(255,255,255,0.03)] border-b-2 border-white/10 rounded-t-xl px-6 py-4 text-white placeholder-white/30 focus:outline-none transition-colors resize-none"
                  />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#C084FC] transition-all duration-300 group-focus-within:w-full shadow-[0_0_10px_#C084FC]" />
                  {errors.message && <p className="text-red-400 text-sm mt-2 ml-2">{errors.message.message}</p>}
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] hover:opacity-90 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(165,95,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center mt-4"
                >
                  {isSubmitting ? (
                    <motion.div 
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    "Send Message"
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
