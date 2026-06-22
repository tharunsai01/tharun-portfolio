import Link from "next/link";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-panel border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col items-center md:items-start">
          <Link href="#home" className="text-xl font-bold font-heading tracking-tight text-foreground mb-2">
            Tharun<span className="text-accent-purple">.</span>
          </Link>
          <p className="text-text-secondary text-sm">
            Building secure systems and breaking insecure ones.
          </p>
        </div>

        <div className="flex space-x-6">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-cyan transition-colors">
            <span className="sr-only">GitHub</span>
            <Github className="h-5 w-5" />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-purple transition-colors">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="mailto:contact@example.com" className="text-text-secondary hover:text-foreground transition-colors">
            <span className="sr-only">Email</span>
            <Mail className="h-5 w-5" />
          </a>
        </div>

      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-text-secondary text-xs">
          &copy; {new Date().getFullYear()} Tharun. All rights reserved.
        </p>
        <p className="text-text-secondary text-xs">
          Built with Next.js & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
