import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Heart, Clock, Calendar } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function BlogCard({ post, variants }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const publishedDate = new Date(post.published_at).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={variants}
      onMouseMove={handleMouseMove}
      className="glass relative group rounded-2xl overflow-hidden hover:border-amber-500/20 transition-colors duration-500 block"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(245, 158, 11, 0.05),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl font-heading font-bold text-white group-hover:text-amber-400 transition-colors duration-300 leading-snug">
            {post.title}
          </h3>
          <ExternalLink
            size={16}
            className="shrink-0 mt-1 text-white/20 group-hover:text-amber-500/60 transition-colors duration-300"
          />
        </div>

        {/* Description */}
        {post.description && (
          <p className="text-white/55 text-sm leading-relaxed mb-5 line-clamp-2">
            {post.description}
          </p>
        )}

        {/* Tags */}
        {post.tag_list?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {post.tag_list.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full bg-black/40 border border-white/[0.05] text-xs font-medium text-white/40 group-hover:text-amber-400/70 group-hover:border-amber-400/15 transition-all duration-500"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-white/30 pt-4 mt-auto border-t border-white/5">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} />
            {publishedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} />
            {post.reading_time_minutes} min read
          </span>
          <span className="flex items-center gap-1.5">
            <Heart size={12} />
            {post.public_reactions_count}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function SkeletonCard() {
  return (
    <div className="glass rounded-2xl p-6 md:p-8 animate-pulse">
      <div className="h-5 bg-white/5 rounded-lg mb-3 w-3/4" />
      <div className="h-3 bg-white/5 rounded-lg mb-2 w-full" />
      <div className="h-3 bg-white/5 rounded-lg mb-5 w-2/3" />
      <div className="flex gap-2 mb-5">
        <div className="h-5 w-16 bg-white/5 rounded-full" />
        <div className="h-5 w-20 bg-white/5 rounded-full" />
      </div>
      <div className="h-px bg-white/5 mb-4" />
      <div className="flex gap-4">
        <div className="h-3 w-20 bg-white/5 rounded-lg" />
        <div className="h-3 w-16 bg-white/5 rounded-lg" />
        <div className="h-3 w-10 bg-white/5 rounded-lg" />
      </div>
    </div>
  );
}

export default function Writing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://dev.to/api/articles?username=shubhamram&per_page=6")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section
      ref={ref}
      id="writing"
      className="section-padding px-4 md:px-8 max-w-5xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white mb-3">
          Writing<span className="text-gradient">.</span>
        </h2>
        <p className="text-white/50 text-lg font-light max-w-xl">
          Thoughts on engineering, architecture, and things I've learned along
          the way.
        </p>
      </motion.div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {error && (
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-white/40">
            Couldn't load articles right now.{" "}
            <a
              href="https://dev.to/shubhamram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              Read them on dev.to →
            </a>
          </p>
        </div>
      )}

      {!loading && !error && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} variants={cardVariants} />
          ))}
        </motion.div>
      )}
    </section>
  );
}
