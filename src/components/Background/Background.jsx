import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export default function Background() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    function handleMouseMove({ clientX, clientY }) {
      mouseX.set(clientX);
      mouseY.set(clientY);
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-0 bg-[#0a0a0a] w-full h-full overflow-hidden">
      {/* Subtle gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0a1a] to-[#0a0a0a] opacity-80" />

      {/* Dot grid pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]" />

      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise opacity-100 pointer-events-none" />

      {/* Mouse-following glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(245, 158, 11, 0.06),
              transparent 80%
            )
          `,
        }}
      />

      {/* Ambient floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/[0.02] blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/[0.02] blur-[100px] animate-pulse [animation-delay:2s]" />
      <div className="absolute top-3/4 left-1/2 w-[300px] h-[300px] rounded-full bg-violet-500/[0.015] blur-[80px] animate-pulse [animation-delay:4s]" />

      {/* Top fade */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#0a0a0a] to-transparent pointer-events-none" />
    </div>
  );
}
