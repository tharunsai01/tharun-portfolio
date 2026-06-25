"use client";

import { motion, Variants } from "framer-motion";
import { Code2, Globe, Shield, Wrench, Monitor, Palette } from "lucide-react";
import Section from "../Section";
import InteractiveCard from "../InteractiveCard";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code2,
    skills: [
      { name: "Python" },
      { name: "Java" },
    ]
  },
  {
    title: "Web Technologies",
    icon: Globe,
    skills: [
      { name: "HTML/CSS" },
      { name: "JavaScript" },
    ]
  },
  {
    title: "Cybersecurity Tools",
    icon: Shield,
    skills: [
      { name: "Wireshark" },
      { name: "Nmap" },
      { name: "Kali Linux" },
    ]
  },
  {
    title: "Developer Tools",
    icon: Wrench,
    skills: [
      { name: "Git & GitHub" },
      { name: "Docker" },
      { name: "Jenkins" },
    ]
  },
  {
    title: "Operating Systems",
    icon: Monitor,
    skills: [
      { name: "Linux" },
      { name: "Windows" },
    ]
  },
  {
    title: "Design Tools",
    icon: Palette,
    skills: [
      { name: "Figma" },
      { name: "Canva" },
    ]
  }
];

export default function Skills() {
  return (
    <Section id="skills" title="Technical Skills">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 group/list"
      >
        {skillCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div key={category.title} variants={itemVariants} className="h-full">
              <InteractiveCard className="group-hover/list:opacity-40 hover:!opacity-100 transition-opacity duration-300 min-h-[320px]">
                <div className="relative h-full w-full flex-grow overflow-hidden rounded-[24px]">
                  {/* Top Slide (Icon and Title) */}
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-transparent transition-all duration-500 ease-out group-hover/card:-translate-y-[40%] group-hover/card:opacity-0 group-hover/card:scale-95">
                    {/* Ambient Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-cyan/20 blur-[50px] rounded-full pointer-events-none transition-all duration-500 group-hover/card:w-48 group-hover/card:h-48 group-hover/card:bg-accent-cyan/30" />
                    
                    {/* Icon Container */}
                    <div className="shrink-0 relative z-10 w-24 h-24 mb-6 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center text-accent-cyan transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-6">
                      <Icon size={40} strokeWidth={1.5} className="drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                    </div>
                    
                    <h3 className="shrink-0 relative z-10 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 font-heading text-center tracking-tight">{category.title}</h3>
                  </div>

                  {/* Bottom Slide (Skills List) */}
                  <div className="p-8 h-full w-full flex flex-col transition-all duration-500 ease-out translate-y-[60%] opacity-0 scale-95 group-hover/card:translate-y-0 group-hover/card:opacity-100 group-hover/card:scale-100 bg-transparent">
                    <h3 className="shrink-0 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-6 font-heading flex items-center gap-3 border-b border-white/5 pb-5">
                      <div className="p-2.5 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                        <Icon size={18} className="text-accent-cyan drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]" strokeWidth={2} />
                      </div>
                      {category.title}
                    </h3>
                    
                    <div className="relative z-10 flex flex-wrap gap-2.5">
                      {category.skills.map((skill) => (
                        <div 
                          key={skill.name} 
                          className="px-4 py-2 rounded-full bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] hover:bg-accent-cyan/[0.05] hover:border-accent-cyan/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 flex items-center gap-2.5 group/skill cursor-default"
                        >
                          <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-white/20 group-hover/skill:bg-accent-cyan group-hover/skill:shadow-[0_0_10px_rgba(6,182,212,0.9)] transition-all duration-300" />
                          <span className="text-sm font-medium text-white/70 group-hover/skill:text-white transition-colors">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
