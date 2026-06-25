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
          <div key={index} className="group-hover/list:opacity-40 hover:!opacity-100 transition-opacity duration-300">
            <div className="relative flex flex-col group rounded-2xl overflow-hidden bg-panel border border-white/10 shadow-xl h-[280px] sm:h-[320px] cursor-pointer">
               {/* Hover effects */}
               <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none shadow-[inset_0_0_0_1px_rgba(56,189,248,0.5)] z-30" />
               <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_30px_rgba(56,189,248,0.15)] z-0" />
               
               {/* Top Slide */}
               <div className="absolute inset-0 z-20 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-[55%]">
                 <div className="w-full h-[55%] bg-white flex items-center justify-center p-4 shrink-0 relative">
                    {cert.imageUrl ? (
                      <Image src={cert.imageUrl} alt={cert.name} fill className="object-contain p-6" />
                    ) : (
                      <span className="text-text-secondary/50 font-mono text-sm">No Image</span>
                    )}
                 </div>
                 <div className="w-full h-[45%] flex flex-col items-center justify-center p-5 bg-panel shrink-0 border-b border-transparent">
                    <span className="text-[10px] font-mono text-accent-cyan mb-2 tracking-wider uppercase">{cert.issuer}</span>
                    <h3 className="text-base sm:text-lg font-bold font-heading text-white text-center leading-snug line-clamp-2">
                      {cert.name}
                    </h3>
                 </div>
               </div>

               {/* Bottom Slide */}
               <div className="absolute inset-x-0 bottom-0 h-[55%] z-10 p-6 flex flex-col bg-panel/95 backdrop-blur-xl border-t border-white/10 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] translate-y-full group-hover:translate-y-0">
                 <div className="flex flex-col items-center justify-center text-center flex-grow">
                    <p className="text-sm font-medium text-text-secondary mb-3">{cert.date}</p>
                    <span className="text-[10px] font-mono text-white/70 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
                      Category: {cert.category}
                    </span>
                 </div>
                 
                 {cert.verifyUrl && (
                   <div className="mt-auto shrink-0 relative z-40">
                     <a 
                       href={cert.verifyUrl} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="relative overflow-hidden flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all group/btn hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] w-full"
                     >
                       <span>Verify Certificate</span>
                       <ExternalLink className="w-3.5 h-3.5" />
                     </a>
                   </div>
                 )}
               </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
