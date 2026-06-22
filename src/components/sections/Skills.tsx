"use client";

import { motion } from "framer-motion";
import Section from "../Section";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
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
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 85 },
      { name: "SQL", level: 85 },
    ]
  },
  {
    title: "Web Technologies",
    skills: [
      { name: "HTML/CSS", level: 95 },
      { name: "JavaScript", level: 90 },
    ]
  },
  {
    title: "Cybersecurity Tools",
    skills: [
      { name: "Wireshark", level: 95 },
      { name: "Nmap", level: 90 },
      { name: "Kali Linux", level: 95 },
    ]
  },
  {
    title: "Developer Tools",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Docker", level: 80 },
      { name: "Jenkins", level: 75 },
    ]
  },
  {
    title: "Operating Systems",
    skills: [
      { name: "Linux", level: 95 },
      { name: "Windows", level: 95 },
    ]
  },
  {
    title: "Design Tools",
    skills: [
      { name: "Figma", level: 85 },
      { name: "Canva", level: 90 },
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skillCategories.map((category) => (
          <motion.div key={category.title} variants={itemVariants} className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden group">
            {/* Noise overlay */}
            <div 
              className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay z-0" 
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
            ></div>

            <h3 className="relative z-10 text-lg font-semibold text-foreground mb-6 font-heading">{category.title}</h3>
            <div className="relative z-10 space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-medium text-text-secondary">{skill.name}</span>
                    <span className="text-xs text-text-secondary/50 font-mono">{skill.level}%</span>
                  </div>
                  {/* Minimal progress bar */}
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
