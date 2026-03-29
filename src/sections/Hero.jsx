import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowDown, Download } from "lucide-react";
import avatarImg from "../assets/avatar3.png";
import { useSoundEffect } from "../hooks/useSoundEffect";

const roles = ["Frontend Engineer", "UI Architect", "Creative Developer"];

export default function Hero({ soundEnabled }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const { play } = useSoundEffect(soundEnabled);

  // Typing animation
  useEffect(() => {
    const role = roles[currentRole];
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    const type = () => {
      if (!isDeleting) {
        setDisplayText(role.slice(0, charIndex + 1));
        charIndex++;
        play("tick");
        if (charIndex === role.length) {
          isDeleting = false;
          timeout = setTimeout(() => {
            isDeleting = true;
            type();
          }, 2000);
          return;
        }
        timeout = setTimeout(type, 60 + Math.random() * 40);
      } else {
        setDisplayText(role.slice(0, charIndex));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          setCurrentRole((prev) => (prev + 1) % roles.length);
          return;
        }
        timeout = setTimeout(type, 30);
      }
    };

    timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, [currentRole]);

  const scrollToProjects = () => {
    play("click");
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Avatar with orbital ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative group cursor-pointer mb-8"
        onMouseEnter={() => play("pop")}
      >
        {/* Outer glow ring */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-amber-500/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Rotating orbital ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute -inset-3 rounded-full border border-amber-500/20"
        >
          {/* Orbital dots */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-orange-400/60 shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
        </motion.div>

        {/* Second orbital ring (counter-rotate) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
          className="absolute -inset-6 rounded-full border border-white/5"
        >
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-amber-400/40" />
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-orange-400/30" />
        </motion.div>

        {/* Avatar image */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/10 z-10 bg-black">
          <img
            src={avatarImg}
            alt="Shubham's avatar"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 relative top-[30px] scale-125"
          />
        </div>

        {/* Status dot */}
        <div className="absolute bottom-1 right-1 z-20 flex items-center justify-center w-6 h-6 rounded-full bg-[#0a0a0a]">
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
          />
        </div>

        {/* Hover tooltip */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="glass rounded-lg px-3 py-1.5 text-xs text-white/80 whitespace-nowrap">
            👋 That's me!
          </div>
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-6"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-white leading-none mb-4">
          Hi, I'm{" "}
          <span className="text-gradient">Shubham</span>
        </h1>
      </motion.div>

      {/* Typed subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-2 text-white/60 font-mono text-base md:text-lg mb-10"
      >
        <span className="text-amber-400">&gt;</span>
        <span>{displayText}</span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
          className="inline-block w-2.5 h-[1.2em] bg-amber-400"
        />
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <button
          onClick={scrollToProjects}
          className="group relative px-8 py-3.5 rounded-full font-medium text-sm overflow-hidden bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_50px_rgba(245,158,11,0.5)] transition-shadow duration-500"
        >
          <span className="relative z-10 flex items-center gap-2 font-semibold">
            See My Work
            <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </button>

        <a
          href="#"
          className="flex items-center gap-2 px-6 py-3 rounded-full glass text-white/80 text-sm font-medium hover:text-white hover:border-amber-500/30 transition-all duration-300 group"
        >
          <Download size={15} className="group-hover:translate-y-0.5 transition-transform" />
          Resume
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
