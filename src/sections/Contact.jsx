import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUpRight, Heart } from "lucide-react";
import { PORTFOLIO_INFO } from "../constants/portfolio";

function DevToIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.28zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z" />
    </svg>
  );
}

const socials = [
  { name: "GitHub", icon: Github, href: PORTFOLIO_INFO.github },
  { name: "LinkedIn", icon: Linkedin, href: PORTFOLIO_INFO.linkedin },
  { name: "DEV", icon: DevToIcon, href: "https://dev.to/shubhamram" },
  { name: "Email", icon: Mail, href: `mailto:${PORTFOLIO_INFO.email}` },
];

export default function Contact() {
  return (
    <>
      {/* Contact Section */}
      <section
        id="contact"
        className="section-padding px-4 md:px-8 max-w-4xl mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white mb-6">
            Let's build something
            <br />
            <span className="text-gradient">together.</span>
          </h2>
          <p className="text-white/50 text-lg font-light max-w-lg mx-auto mb-10">
            Got a project in mind or just want to chat? I'm always open to
            discussing new opportunities and creative ideas.
          </p>

          {/* CTA Button */}
          <motion.a
            href={`mailto:${PORTFOLIO_INFO.email}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold text-base shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:shadow-[0_0_60px_rgba(245,158,11,0.5)] transition-shadow duration-500"
          >
            Say Hello
            <ArrowUpRight size={18} />
          </motion.a>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-3 mt-10">
            {socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/50 hover:text-amber-400 hover:border-amber-500/20 transition-colors duration-300"
                aria-label={social.name}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 py-8 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © 2026 Ram. All rights reserved.
          </p>
          <p className="text-white/20 text-xs flex items-center gap-1">
            Crafted with <Heart size={12} className="text-amber-500/50" /> using
            React & Framer Motion
          </p>
        </div>
      </footer>
    </>
  );
}
