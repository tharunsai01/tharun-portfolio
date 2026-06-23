"use client";

import { useRef } from "react";
import { motion, Variants, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import Section from "../Section";
import { ExternalLink } from "lucide-react";
import { Github } from "../Icons";

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
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  status: string;
  image?: string;
}

const projects: Project[] = [
  {
    title: "Agentic AI for Smart Traffic Management",
    description: "Built an Agentic AI-based traffic management platform for real-time monitoring and signal optimization. Designed a multi-agent AI pipeline to predict congestion and optimize traffic signal timings. Implemented JWT authentication, OAuth 2.0, Docker, and Jenkins CI/CD.",
    tags: ["React", "Node.js", "MongoDB", "Docker", "Jenkins", "Agentic AI"],
    githubUrl: "https://github.com",
    liveUrl: "",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Zero-Trust Network Architecture",
    description: "Implemented a zero-trust security model for an enterprise network, enforcing strict identity verification for every user and device. Utilized advanced threat hunting techniques to secure sensitive endpoints.",
    tags: ["Security", "Networking", "Zero-Trust", "Firewall", "IAM"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Penetration Testing Automation Suite",
    description: "Developed a custom suite of automated penetration testing scripts. Integrates with Nmap and Metasploit to automatically scan for vulnerabilities and generate comprehensive security audit reports.",
    tags: ["Python", "Nmap", "Metasploit", "Automation", "Pentesting"],
    githubUrl: "https://github.com",
    liveUrl: "",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1510511459019-5efa3183ceb8?q=80&w=2070&auto=format&fit=crop"
  }
];

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for 3D tilt & Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 150, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 150, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    // Normalize coordinates from -1 to 1 based on center of card
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Subtle 3D Tilt
  const rotateX = useTransform(smoothMouseY, [-1, 1], [6, -6]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-6, 6]);

  // Spotlight position
  const spotlightX = useTransform(smoothMouseX, [-1, 1], ["0%", "100%"]);
  const spotlightY = useTransform(smoothMouseY, [-1, 1], ["0%", "100%"]);
  const spotlightBackground = useMotionTemplate`radial-gradient(circle 300px at ${spotlightX} ${spotlightY}, rgba(56, 189, 248, 0.15), transparent 80%)`;

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -10 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="relative flex flex-col group rounded-2xl overflow-hidden bg-panel/30 backdrop-blur-xl border border-white/10 shadow-xl transition-all duration-500 h-full"
    >
      {/* Premium Glassmorphism Hover Border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none shadow-[inset_0_0_0_1px_rgba(56,189,248,0.5)] z-20" />
      
      {/* Outer Glow on Hover */}
      <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_30px_rgba(56,189,248,0.15)] z-0" />

      {/* Mouse Tracking Spotlight */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 mix-blend-screen"
        style={{ background: spotlightBackground }}
      />

      {/* Image Preview Area */}
      <div className="relative z-10 w-full h-56 sm:h-64 p-5 pb-0">
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl border border-white/5">
          {/* Animated Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          
          {/* Image Zoom Reveal */}
          <div 
            className="absolute inset-0 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-700 ease-out bg-cover bg-center"
            style={{ backgroundImage: `url('${project.image}')` }}
          >
              <div className="absolute inset-0 bg-background/60 group-hover:bg-background/20 transition-colors duration-500 mix-blend-overlay"></div>
          </div>
          
          {/* Status Badge */}
          <div className="absolute top-3 left-3 z-20">
            <span className={`text-[10px] font-mono px-2 py-1 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-105 ${
              project.status === 'Completed' 
                ? 'border-emerald-500/50 text-emerald-300 bg-emerald-500/20'
                : 'border-amber-500/50 text-amber-300 bg-amber-500/20'
            }`}>
              {project.status}
            </span>
          </div>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="relative z-10 p-5 flex flex-col flex-grow w-full bg-gradient-to-br from-transparent to-background/50">
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-2 group-hover:text-accent-cyan transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-xs sm:text-sm text-text-secondary mb-5 flex-grow leading-relaxed">
          {project.description}
        </p>
        
        {/* Technologies / Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] sm:text-[11px] font-mono text-white/70 bg-black/40 border border-white/10 px-2.5 py-1 rounded-full group-hover:border-accent-cyan/30 group-hover:text-accent-cyan transition-colors duration-300 whitespace-nowrap shadow-sm">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Magnetic Buttons */}
        <div className="flex gap-3 mt-auto relative z-20">
          {project.githubUrl && (
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative overflow-hidden flex items-center justify-center gap-1.5 rounded-lg bg-black/50 border border-white/10 px-4 py-2 text-xs font-semibold text-white shadow-lg transition-all group/btn hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] magnetic-card w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
              <span>GitHub</span>
            </motion.a>
          )}
          {project.liveUrl && (
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative overflow-hidden flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all group/btn hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] magnetic-card w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto gap-6 lg:gap-8 group/list"
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </motion.div>
    </Section>
  );
}
