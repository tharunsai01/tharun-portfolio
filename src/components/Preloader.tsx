"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

// Typing effect component for the bottom text
const TypingText = ({ text, progress }: { text: string; progress: number }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const charsToShow = Math.floor((progress / 100) * text.length);
    setDisplayText(text.substring(0, charsToShow));
  }, [progress, text]);

  return (
    <div className="flex items-center gap-2 mt-8 h-6">
      <span className="text-[#B8C2CC] text-xs font-mono tracking-widest uppercase shadow-[#00D9FF]/50 drop-shadow-md">
        {displayText}
      </span>
      <motion.div
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
        className="w-2 h-3 bg-[#37E8FF] shadow-[0_0_8px_#37E8FF]"
      />
    </div>
  );
};

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setStage(1), 500); // Start showing elements quickly
    return () => {
      clearTimeout(t1);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    let animationFrame: number;
    let startTime: number;
    const duration = 4500; // 4.5 seconds loading

    const updateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed >= duration) {
        setProgress(100);
        return;
      }

      const easeOutQuart = 1 - Math.pow(1 - elapsed / duration, 4);
      setProgress(easeOutQuart * 100);

      animationFrame = requestAnimationFrame(updateProgress);
    };

    if (stage === 1) {
      animationFrame = requestAnimationFrame(updateProgress);
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [stage]);

  useEffect(() => {
    if (progress >= 100) {
      // 0.8s for the zoom/flash transition before unmounting
      const t = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(t);
    }
  }, [progress, onComplete]);

  const isComplete = progress >= 100;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020611] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={isComplete ? { scale: 1.1, filter: "blur(10px)", opacity: 0 } : { scale: 1, filter: "blur(0px)", opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* SVG Noise Filter Definition */}
      <svg className="hidden">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.05 0" />
        </filter>
      </svg>

      {/* Background Layers */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#020611] via-[#040A18] to-[#071326]" />

      {/* Noise Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none" style={{ filter: "url(#noise)" }} />

      {/* Volumetric Fog / Radial Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen">
        <motion.div
          animate={{ x: ["-10%", "10%", "-10%"], y: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#00D9FF] opacity-[0.03] blur-[100px]"
        />
        <motion.div
          animate={{ x: ["10%", "-10%", "10%"], y: ["10%", "-10%", "10%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#6366F1] opacity-[0.03] blur-[120px]"
        />
      </div>

      {/* Animated Cyber Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-screen [mask-image:linear-gradient(to_bottom,transparent,black_60%,transparent)] flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ backgroundPosition: ["0px 0px", "0px 60px"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="absolute w-[200vw] h-[200vh] bg-[linear-gradient(to_right,#00D9FF_1px,transparent_1px),linear-gradient(to_bottom,#00D9FF_1px,transparent_1px)] bg-[size:60px_60px]"
          style={{ transform: "perspective(500px) rotateX(60deg) translateZ(0)" }}
        />
      </div>

      {/* Global HUD Scanline */}
      <motion.div
        animate={{ top: ["-20%", "120%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[30vh] bg-gradient-to-b from-transparent via-[#00D9FF]/[0.05] to-transparent pointer-events-none z-10 border-b border-[#00D9FF]/10"
      />

      {/* Animated Light Rays from Top Corners */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ rotate: [-2, 5, -2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-50%] left-[-20%] w-[150%] h-[150%] bg-[conic-gradient(from_180deg_at_0%_0%,rgba(0,217,255,0.08)_0deg,transparent_60deg)] mix-blend-screen origin-top-left"
        />
        <motion.div
          animate={{ rotate: [2, -5, 2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-50%] right-[-20%] w-[150%] h-[150%] bg-[conic-gradient(from_180deg_at_100%_0%,transparent_300deg,rgba(55,232,255,0.08)_360deg)] mix-blend-screen origin-top-right"
        />
      </div>

      {/* Starfield / Glowing Dust */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen">
        <Canvas>
          <Stars radius={100} depth={50} count={3000} factor={3} saturation={0.5} fade speed={1.5} />
        </Canvas>
      </div>

      {/* TOP HUD ELEMENTS */}
      <AnimatePresence>
        {!isComplete && (
          <>
            {/* Top Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-4 z-50"
            >
              <motion.div
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-1.5 h-1.5 rounded-full bg-[#37E8FF] shadow-[0_0_8px_#37E8FF]"
              />
              <span className="text-[#B8C2CC] text-[10px] md:text-xs font-mono tracking-[0.3em]">WELCOME</span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                className="w-16 md:w-32 h-[1px] bg-gradient-to-r from-[#37E8FF]/40 to-transparent origin-left"
              />
            </motion.div>

            {/* Top Right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-6 right-6 md:top-10 md:right-10 flex flex-col items-end gap-2 z-50"
            >
              <span className="text-[#37E8FF] text-[8px] md:text-[10px] font-mono tracking-[0.2em] uppercase opacity-80">
                Preparing Experience
              </span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                    className="w-3 h-1 bg-[#6366F1]"
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Blue Flash Transition */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#00D9FF] z-[99999] mix-blend-overlay"
          />
        )}
      </AnimatePresence>

      {/* CENTER CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-6">

        {/* Animated Logo Container */}
        <motion.div
          animate={isComplete ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative flex items-center justify-center mb-8 w-32 h-32"
        >
          {/* Background Breathing Glow */}
          <motion.div
            animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#00D9FF] blur-[40px] rounded-full z-0"
          />

          {/* Metallic "T" */}
          <div className="relative z-10 flex items-center justify-center w-full h-full overflow-hidden">
            <span
              className="text-[9rem] md:text-[11rem] font-serif leading-none"
              style={{
                background: "linear-gradient(to bottom, #ffffff 0%, #c4f0ff 40%, #4facfe 70%, #3b28f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 25px rgba(0, 217, 255, 0.4))",
              }}
            >
              T
            </span>

            {/* Premium Neon Scanline */}
            <motion.div
              animate={{ top: ["-50%", "150%"], left: ["-50%", "150%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute w-[150%] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_15px_3px_rgba(0,217,255,1),0_0_30px_6px_rgba(55,232,255,0.8)] -rotate-45 z-20"
            />
          </div>
        </motion.div>

        {/* Name and Tagline */}
        <AnimatePresence>
          {!isComplete && stage >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              {/* Name */}
              <div className="flex gap-4 md:gap-6 mb-4">
                <span className="text-2xl md:text-4xl font-semibold tracking-[0.5em] text-white">
                  THARUN
                </span>
                <span className="text-2xl md:text-4xl font-semibold tracking-[0.5em] text-[#00D9FF] drop-shadow-[0_0_10px_rgba(0,217,255,0.6)]">
                  SAI
                </span>
              </div>

              {/* Tagline */}
              <h2 className="mb-12 text-[9px] md:text-[10px] font-medium tracking-[0.6em] text-[#B8C2CC] uppercase text-center drop-shadow-md">
                CYBERSECURITY <span className="text-[#6366F1] mx-1">•</span> AI <span className="text-[#6366F1] mx-1">•</span> DIGITAL INNOVATION
              </h2>

              {/* Progress Container */}
              <div className="flex flex-col items-center w-full max-w-[280px] gap-6">

                {/* Premium Glass Loading Bar */}
                <div className="w-full h-[3px] md:h-1 bg-white/5 rounded-full overflow-hidden relative backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(0,217,255,0.1)]">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00D9FF] via-[#37E8FF] to-[#6366F1] shadow-[0_0_10px_rgba(55,232,255,0.5)]"
                    style={{ width: `${progress}%` }}
                  />
                  {/* Internal Shimmer */}
                  <motion.div
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                  />
                  {/* Tip Particle */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 h-[6px] w-[6px] md:h-[8px] md:w-[8px] rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.9)]"
                    style={{ left: `calc(${progress}% - 4px)` }}
                  />
                </div>

                {/* Percentage Counter */}
                <div className="text-4xl md:text-5xl font-mono text-white font-light tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  {Math.round(progress)}
                  <span className="text-2xl md:text-3xl text-[#00D9FF] ml-1 drop-shadow-[0_0_10px_rgba(0,217,255,0.5)]">%</span>
                </div>

                {/* Bottom Typing Text */}
                <TypingText text="Initializing Secure Environment..." progress={progress} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
