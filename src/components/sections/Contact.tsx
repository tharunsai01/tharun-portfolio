"use client";

import Section from "../Section";
import { Mail, Phone } from "lucide-react";
import { Linkedin } from "../Icons";
import { motion } from "framer-motion";

export default function Contact() {
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
          
          <div className="bg-panel/60 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-2xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-white tracking-wide">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-background/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:border-accent-cyan focus:bg-background transition-all"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-white tracking-wide">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-background/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:border-accent-cyan focus:bg-background transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-semibold text-white tracking-wide">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full bg-background/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:border-accent-cyan focus:bg-background transition-all"
                  placeholder="What would you like to discuss?"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-semibold text-white tracking-wide">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full bg-background/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:border-accent-cyan focus:bg-background transition-all resize-none"
                  placeholder="Tell me more about your project or question"
                ></textarea>
              </div>
              
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-accent-cyan to-blue-600 text-white font-bold py-4 px-4 rounded-xl hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all mt-6 border border-white/10"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>

      </div>
    </Section>
  );
}
