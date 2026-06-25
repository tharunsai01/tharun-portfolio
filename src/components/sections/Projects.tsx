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
    title: "FORENSIC-AI: Intelligent Deepfake Video Detection for Digital Evidence",
    description: "Built an AI-driven deepfake detection system for digital forensics using Vision Transformers, frequency analysis, and temporal attention. The model achieved 97.31% AUC on unseen datasets, ensuring robust generalization and reliable real-world performance.",
    tags: ["Digital Forensics", "AI/ML", "Deep Learning", "Vision Transformers", "Computer Vision"],
    githubUrl: "",
    liveUrl: "",
    status: "Completed",
    image: "/forensic.png"
  },
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
      className="relative flex flex-col group rounded-2xl overflow-hidden bg-panel border border-white/10 shadow-xl h-[420px] sm:h-[460px] cursor-pointer"
    >
      {/* Premium Glassmorphism Hover Border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none shadow-[inset_0_0_0_1px_rgba(56,189,248,0.5)] z-30" />

      {/* Outer Glow on Hover */}
      <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_30px_rgba(56,189,248,0.15)] z-0" />

      {/* Mouse Tracking Spotlight */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30 mix-blend-screen"
        style={{ background: spotlightBackground }}
      />

      {/* Top Slide (Image + Title) */}
      <div className="absolute inset-0 z-20 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-[60%]">
        <div className="w-full h-full relative bg-panel">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${project.image}')` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
          </div>
          {/* Content inside Top Slide */}
          <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center justify-end h-full">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-panel/95 via-panel/60 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Status Badge */}
              <div className="mb-4">
                <span className={`text-[10px] font-mono px-3 py-1.5 rounded-full border shadow-xl backdrop-blur-md ${project.status === 'Completed'
                  ? 'border-emerald-500/50 text-emerald-300 bg-emerald-500/20'
                  : 'border-amber-500/50 text-amber-300 bg-amber-500/20'
                  }`}>
                  {project.status}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white text-center drop-shadow-md group-hover:text-accent-cyan transition-colors duration-300">
                {project.title}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Slide (Text) */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] z-10 p-6 flex flex-col bg-panel/95 backdrop-blur-xl border-t border-white/10 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] translate-y-full group-hover:translate-y-0">
        <p className="text-xs sm:text-sm text-text-secondary mb-4 flex-grow leading-relaxed whitespace-pre-line overflow-y-auto custom-scrollbar">
          {project.description}
        </p>

        {/* Technologies / Features */}
        <div className="flex flex-wrap gap-2 mb-5 shrink-0">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-mono text-white/70 bg-black/40 border border-white/10 px-2.5 py-1 rounded-full group-hover:border-accent-cyan/30 group-hover:text-accent-cyan transition-colors duration-300">
              {tag}
            </span>
          ))}
        </div>

        {/* Magnetic Buttons */}
        <div className="flex gap-3 shrink-0 relative z-40">
          {project.githubUrl && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden flex items-center justify-center gap-1.5 rounded-lg bg-black/50 border border-white/10 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-white/10 shadow-lg"
            >
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
              className="relative overflow-hidden flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]"
            >
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
