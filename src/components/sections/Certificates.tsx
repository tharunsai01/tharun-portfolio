"use client";

import { useState } from "react";
import Section from "../Section";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import InteractiveCard from "../InteractiveCard";

const certificates = [
  {
    name: "Tata Cybersecurity Analyst Job Simulation",
    issuer: "Forage",
    date: "Recent",
    category: "Security",
    verifyUrl: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/gmf3ypEXBj2wvfQWC_ifobHAoMjQs9s6bKS_6a2fac3dbe513965a4368053_1781521541633_completion_certificate.pdf",
    imageUrl: "/forage logo.png"
  },
  {
    name: "Networking Basics",
    issuer: "Cisco Networking Academy",
    date: "Recent",
    category: "General",
    verifyUrl: "https://www.credly.com/badges/718a67d6-c8e6-4de9-ba90-fc5d38f51ce9",
    imageUrl: "/cisco logo.png"
  }
];

const categories = ["All", "Security", "Cloud", "General"];

export default function Certificates() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCertificates = certificates.filter(
    (cert) => activeCategory === "All" || cert.category === activeCategory
  );

  return (
    <Section id="certificates" title="Certifications">
      
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category 
                ? "bg-foreground text-background" 
                : "bg-panel text-text-secondary hover:text-foreground hover:bg-white/10 border border-white/5"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 group/list">
        {filteredCertificates.map((cert, index) => (
          <motion.div key={index} layout className="h-full">
            <InteractiveCard className="group-hover/list:opacity-40 hover:!opacity-100 transition-opacity duration-300 min-h-[320px]">
              <div className="relative h-full w-full flex-grow overflow-hidden rounded-[24px]">
                {/* Top Slide */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center transition-all duration-500 ease-out group-hover/card:-translate-y-[40%] group-hover/card:opacity-0 group-hover/card:scale-95">
                  {/* Ambient Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-accent-cyan/10 blur-[60px] rounded-full pointer-events-none transition-all duration-500 group-hover/card:w-56 group-hover/card:h-56 group-hover/card:bg-accent-cyan/20" />
                  
                  {/* Small Logo Container */}
                  <div className="relative z-10 w-16 h-16 mb-6 rounded-[1.25rem] bg-white p-2 shadow-[0_0_20px_rgba(255,255,255,0.05)] ring-1 ring-white/10 shrink-0 overflow-hidden flex items-center justify-center group-hover/card:scale-110 group-hover/card:rotate-3 transition-transform duration-500">
                    {cert.imageUrl ? (
                      <Image src={cert.imageUrl} alt={cert.name} fill className="object-contain p-2" />
                    ) : (
                      <span className="text-black/50 font-mono text-[10px]">No Image</span>
                    )}
                  </div>
                  
                  <h3 className="relative z-10 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 font-heading tracking-tight mb-2 line-clamp-2">
                    {cert.name}
                  </h3>
                  <span className="relative z-10 text-xs font-semibold text-accent-cyan tracking-wider uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                    {cert.issuer}
                  </span>
                </div>

                {/* Bottom Slide */}
                <div className="p-8 h-full w-full flex flex-col justify-center items-center text-center transition-all duration-500 ease-out translate-y-[60%] opacity-0 scale-95 group-hover/card:translate-y-0 group-hover/card:opacity-100 group-hover/card:scale-100 bg-transparent">
                  <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-4 font-heading line-clamp-2">
                    {cert.name}
                  </h3>
                  
                  <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                    <span className="text-xs font-mono text-white/70 bg-gradient-to-r from-white/[0.05] to-transparent border border-white/10 px-3 py-1.5 rounded-full shadow-sm">
                      {cert.category}
                    </span>
                    <span className="text-xs font-medium text-text-secondary flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-text-secondary/50" />
                      {cert.date}
                    </span>
                  </div>

                  {cert.verifyUrl && (
                    <a 
                      href={cert.verifyUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative overflow-hidden flex items-center gap-2 rounded-full bg-gradient-to-r from-white/[0.05] to-transparent border border-white/[0.1] px-6 py-2.5 text-sm font-semibold text-white/90 shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all group/btn hover:border-accent-cyan/40 hover:bg-accent-cyan/[0.05] hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:-translate-y-0.5"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                      <span className="relative z-10">Verify Credential</span>
                      <ExternalLink className="relative z-10 w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </InteractiveCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
