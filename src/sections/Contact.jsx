import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUpRight, Heart } from "lucide-react";
import { PORTFOLIO_INFO } from "../constants/portfolio";

const socials = [
  { name: "GitHub", icon: Github, href: PORTFOLIO_INFO.github },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: PORTFOLIO_INFO.linkedin,
  },
  //   { name: "Twitter", icon: Twitter, href: "#" },
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
