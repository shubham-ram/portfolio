import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, Code2, Sparkles } from "lucide-react";
import reactIcon from "../assets/reactjs.svg";
import nextjsIcon from "../assets/nextjs.svg";
import typescriptIcon from "../assets/typescript.svg";
import tailwindIcon from "../assets/tailwindcss.svg";
import nodejsIcon from "../assets/nodejs.svg";
import nestjsIcon from "../assets/nestjs.svg";
import playwrightIcon from "../assets/playwright.svg";
import mysqlIcon from "../assets/mysql.svg";

const techStack = [
  { name: "React", icon: reactIcon },
  { name: "Next.js", icon: nextjsIcon },
  { name: "TypeScript", icon: typescriptIcon },
  { name: "Tailwind", icon: tailwindIcon },
  { name: "Node.js", icon: nodejsIcon },
  { name: "NestJs", icon: nestjsIcon },
  { name: "Playwright", icon: playwrightIcon },
  { name: "MySQL", icon: mysqlIcon },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="section-padding px-4 md:px-8 max-w-6xl mx-auto"
    >
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white mb-3">
          About<span className="text-gradient">.</span>
        </h2>
        <p className="text-white/50 text-lg font-light max-w-xl">
          A bit about who I am and what I work with.
        </p>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]"
      >
        {/* Bio Card — spans 2 cols */}
        <motion.div
          variants={cardVariants}
          className="glass rounded-2xl p-8 md:col-span-2 group hover:border-amber-500/20 transition-colors duration-500 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} className="text-amber-400" />
              <span className="text-sm font-medium text-amber-400/80 uppercase tracking-wider">
                Journey
              </span>
            </div>
            <p className="text-white/80 text-lg leading-relaxed font-light">
              With over <span className="text-white font-medium">3 years</span>{" "}
              of experience in frontend engineering, I specialize in crafting
              pixel-perfect, performant web experiences. I love bridging the gap
              between design and engineering — turning complex interactions into
              smooth, intuitive interfaces.
            </p>
            <p className="text-white/60 text-base leading-relaxed font-light mt-4">
              Currently exploring WebXR, spatial UIs, and AI-powered developer
              tools. When I'm not coding, you'll find me exploring new design
              trends or tinkering with creative experiments.
            </p>
          </div>
        </motion.div>

        {/* Years Card */}
        <motion.div
          variants={cardVariants}
          className="glass rounded-2xl p-8 flex flex-col items-center justify-center group hover:border-amber-500/20 transition-colors duration-500 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 text-center">
            <Calendar size={20} className="text-amber-400 mx-auto mb-3" />
            <div className="text-5xl md:text-6xl font-heading font-extrabold text-gradient mb-2">
              3+
            </div>
            <p className="text-white/50 text-sm">Years of Experience</p>
          </div>
        </motion.div>

        {/* Tech Stack Card — spans 2 cols */}
        <motion.div
          variants={cardVariants}
          className="glass rounded-2xl p-8 md:col-span-2 group hover:border-amber-500/20 transition-colors duration-500 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <Code2 size={18} className="text-amber-400" />
              <span className="text-sm font-medium text-amber-400/80 uppercase tracking-wider">
                Tech Stack
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {techStack.map((tech) => (
                <motion.div
                  key={tech.name}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-amber-500/20 hover:bg-white/[0.05] transition-all duration-300 cursor-default"
                >
                  <span className="w-5 h-5 flex-shrink-0">
                    <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain" />
                  </span>
                  <span className="text-sm text-white/70 font-medium">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Location Card */}
        <motion.div
          variants={cardVariants}
          className="glass rounded-2xl p-8 flex flex-col items-center justify-center group hover:border-amber-500/20 transition-colors duration-500 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 text-center">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <MapPin size={24} className="text-amber-400 mx-auto mb-3" />
            </motion.div>
            <p className="text-white font-medium text-lg">India</p>
            <p className="text-white/40 text-sm mt-1">
              Available for remote work
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
