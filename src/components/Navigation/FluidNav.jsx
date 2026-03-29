import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, FileText, Volume2, VolumeX } from "lucide-react";
import { useSoundEffect } from "../../hooks/useSoundEffect";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function FluidNav({ soundEnabled, onToggleSound }) {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const { play } = useSoundEffect(soundEnabled);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll-spy: find which section is currently in view
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    play("pop");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 flex items-center justify-between pointer-events-none transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      {/* Logo */}
      <div className="pointer-events-auto">
        <button
          onClick={() => scrollToSection("hero")}
          className="text-xl font-heading font-bold tracking-tight text-white hover:text-amber-400 transition-colors duration-300"
        >
          Shubham<span className="text-amber-400">.</span>
        </button>
      </div>

      {/* Nav Links + Controls */}
      <div className="glass rounded-full px-1.5 py-1.5 flex items-center gap-0.5 pointer-events-auto">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`relative px-3 md:px-4 py-1.5 text-sm font-medium transition-colors duration-300 rounded-full ${
                isActive
                  ? "text-white"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {isActive && (
                <motion.div
                  layoutId="nav-glow"
                  className="absolute inset-0 bg-amber-500/15 rounded-full blur-md -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{section.label}</span>
            </button>
          );
        })}

        {/* Divider */}
        <div className="w-px h-5 bg-white/10 mx-1" />

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className="p-1.5 text-white/50 hover:text-amber-400 hover:bg-white/5 rounded-full transition-all duration-300"
          aria-label={soundEnabled ? "Mute sounds" : "Enable sounds"}
        >
          {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-white/10 mx-1" />

        {/* Social Icons */}
        <div className="flex items-center gap-0.5">
          <a
            href="https://github.com/shubham-ram"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-white/50 hover:text-amber-400 hover:bg-white/5 rounded-full transition-all duration-300"
            aria-label="GitHub"
          >
            <Github size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/shubhamram/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-white/50 hover:text-amber-400 hover:bg-white/5 rounded-full transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={15} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-white/50 hover:text-amber-400 hover:bg-white/5 rounded-full transition-all duration-300"
            aria-label="Resume"
          >
            <FileText size={15} />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
