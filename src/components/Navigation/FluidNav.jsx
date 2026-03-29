import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  FileText,
  Volume2,
  VolumeX,
  Menu,
  X,
} from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id) => {
    play("pop");
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 flex items-center justify-between pointer-events-none transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        {/* Logo */}
        <div className="pointer-events-auto z-50">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xl font-heading font-bold tracking-tight text-white hover:text-amber-400 transition-colors duration-300"
          >
            Shubham<span className="text-amber-400">.</span>
          </button>
        </div>

        {/* Mobile Menu Toggle (Visible only on < md) */}
        <div className="pointer-events-auto md:hidden z-50">
          <button
            onClick={() => {
              play("pop");
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="p-2.5 text-white/70 hover:text-amber-400 hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-md bg-zinc-900/50 border border-white/10 shadow-[0_4px_24px_-1px_rgba(0,0,0,0.3)]"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Desktop Nav Links + Controls (Hidden on < md) */}
        <div className="hidden md:flex glass rounded-full px-1.5 py-1.5 items-center gap-0.5 pointer-events-auto">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`relative px-3 md:px-4 py-1.5 text-sm font-medium transition-colors duration-300 rounded-full ${
                  isActive ? "text-white" : "text-white/50 hover:text-white/80"
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

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-zinc-950/90 flex flex-col justify-center items-center pointer-events-auto"
          >
            {/* Nav Links */}
            <div className="flex flex-col items-center gap-8 w-full px-6">
              {sections.map((section, i) => {
                const isActive = activeSection === section.id;
                return (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.05 + 0.1,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-4xl sm:text-5xl font-heading font-bold tracking-tight transition-colors duration-300 ${
                      isActive
                        ? "text-amber-500 text-shadow-glow"
                        : "text-white hover:text-amber-400/80"
                    }`}
                  >
                    {section.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom Controls */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-12 left-0 w-full flex flex-col items-center gap-8"
            >
              <div className="w-12 h-px bg-white/10" />

              <div className="flex items-center gap-6">
                <a
                  href="https://github.com/shubham-ram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-amber-400 transition-colors"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/shubhamram/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-amber-400 transition-colors"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-amber-400 transition-colors"
                >
                  <FileText size={24} />
                </a>

                <div className="w-px h-6 bg-white/10 mx-2" />

                <button
                  aria-label="Toggle Sound"
                  onClick={onToggleSound}
                  className="text-white/50 hover:text-amber-400 transition-colors"
                >
                  {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
