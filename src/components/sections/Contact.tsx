"use client";

import { useRef } from "react";
import Section from "../Section";
import { Mail, Phone } from "lucide-react";
import { Linkedin } from "../Icons";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for 3D tilt & Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 150, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 150, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useTransform(smoothMouseY, [-1, 1], [4, -4]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-4, 4]);

  const spotlightX = useTransform(smoothMouseX, [-1, 1], ["0%", "100%"]);
  const spotlightY = useTransform(smoothMouseY, [-1, 1], ["0%", "100%"]);
  const spotlightBackground = useMotionTemplate`radial-gradient(circle 400px at ${spotlightX} ${spotlightY}, rgba(56, 189, 248, 0.15), transparent 80%)`;

  return (
    <Section id="contact" title="Get In Touch">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Info */}
        <div className="space-y-8">
          <p className="text-lg text-text-secondary leading-relaxed">
            I'm currently open to new opportunities. Whether you have a question, a project proposal, or just want to say hi, feel free to drop a message.
          </p>
          
          <div className="flex flex-wrap gap-6">
            <a href="mailto:kandunuritharunsai@gmail.com" aria-label="Email" className="p-4 bg-panel border border-white/5 rounded-xl text-accent-cyan hover:border-accent-cyan/50 hover:bg-white/5 hover:-translate-y-1 transition-all cursor-pointer shadow-lg shadow-black/20">
              <Mail className="w-7 h-7" />
            </a>
            
            <a href="tel:+917672052950" aria-label="Phone" className="p-4 bg-panel border border-white/5 rounded-xl text-accent-purple hover:border-accent-purple/50 hover:bg-white/5 hover:-translate-y-1 transition-all cursor-pointer shadow-lg shadow-black/20">
              <Phone className="w-7 h-7" />
            </a>
            
            <a href="https://www.linkedin.com/in/kandunuri-tharun-sai" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="p-4 bg-panel border border-white/5 rounded-xl text-foreground hover:border-white/20 hover:bg-white/5 hover:-translate-y-1 transition-all cursor-pointer shadow-lg shadow-black/20">
              <Linkedin className="w-7 h-7" />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="relative w-full">
          {/* Animated Glow Background */}
          <div className="absolute -inset-2 bg-gradient-to-r from-accent-cyan/20 via-accent-purple/20 to-accent-cyan/20 rounded-[3rem] blur-2xl opacity-70 animate-pulse -z-10"></div>
          
          <motion.div 
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            className="relative bg-panel/40 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl overflow-hidden group transition-all duration-500"
          >
            {/* Premium Glassmorphism Hover Border */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none shadow-[inset_0_0_0_1px_rgba(56,189,248,0.5)] z-20" />
            
            {/* Outer Glow on Hover */}
            <div className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_40px_rgba(56,189,248,0.15)] z-0" />

            {/* Mouse Tracking Spotlight */}
            <motion.div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 mix-blend-screen"
              style={{ background: spotlightBackground }}
            />

            <form className="relative z-30 space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-white tracking-wide">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:border-accent-cyan focus:bg-background/80 transition-all relative z-40"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-white tracking-wide">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:border-accent-cyan focus:bg-background/80 transition-all relative z-40"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-semibold text-white tracking-wide">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:border-accent-cyan focus:bg-background/80 transition-all relative z-40"
                  placeholder="What would you like to discuss?"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-semibold text-white tracking-wide">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:border-accent-cyan focus:bg-background/80 transition-all resize-none relative z-40"
                  placeholder="Tell me more about your project or question"
                ></textarea>
              </div>
              
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden w-full bg-gradient-to-r from-accent-cyan to-blue-600 text-white font-bold py-4 px-4 rounded-xl shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all mt-6 border border-white/10 group/btn magnetic-card z-40"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                <span className="relative z-10">Send Message</span>
              </motion.button>
            </form>
          </motion.div>
        </div>

      </div>
    </Section>
  );
}
