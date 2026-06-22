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

const leadershipRoles = [
  "House Captain – Orange House, NIIT University",
  "Operations Lead – siNusoid (Technical Fest), NIIT University",
  "Operations & Capture Volunteer – siNusoid, NIIT University",
  "Volunteer – TEDx NIIT University",
  "Volunteer – IngeNUity Fest, NIIT University"
];

export default function Leadership() {
  return (
    <Section id="leadership" title="Leadership & Activities">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-4"
      >
        {leadershipRoles.map((role, index) => (
          <motion.div key={index} variants={itemVariants} className="relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden group">
            {/* Noise overlay */}
            <div 
              className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" 
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
            ></div>
            
            <div className="relative z-10 p-6 flex items-center gap-4 text-lg text-text-secondary group-hover:text-foreground transition-colors">
              <span className="text-xl leading-none">🟢</span>
              <span className="font-medium tracking-wide">{role}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
