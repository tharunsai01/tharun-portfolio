"use client";

import { useState, useEffect } from "react";
import { Menu, X, Eye, Download, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Leadership", href: "#leadership" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isResumeDropdownOpen, setIsResumeDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section
      const sections = navLinks.map(link => link.name.toLowerCase());
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 w-full pointer-events-none">
      <nav 
        className={`pointer-events-auto w-full max-w-7xl transition-all duration-300 rounded-2xl ${
          scrolled ? "bg-black/60 backdrop-blur-md border border-white/10 shadow-xl" : "bg-transparent border border-transparent"
        }`}
      >
        <div className="mx-auto px-4 sm:px-5">
        <div className="flex justify-between items-center h-16 relative">
          <div className="flex-shrink-0 flex items-center z-10">
            <Link href="#home" className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Kandunuri Tharun <span className="text-text-secondary">Sai</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex absolute left-0 right-0 justify-center pointer-events-none">
            <div className="flex items-baseline space-x-6 xl:space-x-8 pointer-events-auto">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-accent-cyan relative group ${
                      activeSection === link.name.toLowerCase() ? "text-accent-cyan" : "text-text-secondary"
                    }`}
                  >
                    {link.name}
                    {activeSection === link.name.toLowerCase() && (
                      <motion.div 
                        layoutId="activeSection"
                        className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-accent-cyan" 
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Desktop Right Buttons */}
          <div className="hidden lg:flex items-center space-x-5 z-10">
            <a 
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold tracking-widest text-text-secondary hover:text-foreground transition-colors uppercase"
            >
              <Eye className="w-4 h-4" />
              <div className="flex flex-col text-left leading-tight">
                <span>View</span>
                <span>Resume</span>
              </div>
            </a>
            <a 
              href="/resume.pdf"
              download
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold tracking-wider transition-colors uppercase"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-foreground focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-panel border-b border-white/5 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    activeSection === link.name.toLowerCase()
                      ? "text-accent-cyan bg-white/5"
                      : "text-text-secondary hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Resume actions for mobile */}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-1">
                <a 
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-foreground hover:bg-white/5"
                >
                  <Eye className="w-5 h-5" />
                  View Resume
                </a>
                <a 
                  href="/resume.pdf"
                  download
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-foreground hover:bg-white/5"
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
    </div>
  );
}
