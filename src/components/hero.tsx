"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Phone, ChevronDown } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/77474404076?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20%D0%BD%D0%BE%D0%BC%D0%B5%D1%80";

/* ── Rotating text ── */
const words = ["Чисто.", "Тихо.", "Уютно.", "Доступно."];

function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-block relative h-[1.15em] overflow-hidden align-bottom">
      {words.map((w, i) => (
        <motion.span
          key={w}
          className="absolute left-0"
          initial={false}
          animate={{
            y: i === index ? 0 : i < index ? "-110%" : "110%",
            opacity: i === index ? 1 : 0,
            filter: i === index ? "blur(0px)" : "blur(8px)",
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background:
              "linear-gradient(135deg, #c9a96e 0%, #f5e6c8 50%, #c9a96e 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Animated grid bg ── */
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(201,169,110,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Moving gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)",
        }}
        animate={{ x: ["-20%", "80%", "-20%"], y: ["-10%", "60%", "-10%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)",
          right: "10%",
          top: "20%",
        }}
        animate={{ x: ["10%", "-30%", "10%"], y: ["0%", "40%", "0%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* ── Counter ── */
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return <span ref={ref}>{display.toLocaleString("ru-RU")}</span>;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#050508]"
    >
      <GridBackground />

      {/* Noise overlay */}
      <div className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* Horizontal line accent */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent z-[2]" />

      <motion.div style={{ y: bgY, opacity }} className="relative z-10 flex flex-col items-center px-4 sm:px-6 text-center max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] backdrop-blur-xl">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-[#c9a96e] text-[#c9a96e]" />
              ))}
              <Star className="w-3.5 h-3.5 fill-[#c9a96e]/40 text-[#c9a96e]/40" />
            </div>
            <span className="text-white/50 text-sm font-medium">4.3</span>
            <span className="w-px h-4 bg-white/10" />
            <span className="text-white/40 text-sm">
              <AnimatedNumber value={1357} /> отзывов
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-[family-name:var(--font-heading)] text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.95] tracking-tight text-white mb-6"
        >
          Гостиница
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #c9a96e 40%, #f5e6c8 60%, #c9a96e 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 4s ease-in-out infinite",
            }}
          >
            Juldyz
          </span>
        </motion.h1>

        {/* Rotating tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl text-white/50 font-light mb-4"
        >
          <RotatingWord /> В центре Алматы.
        </motion.p>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-white/25 text-sm tracking-widest uppercase mb-12"
        >
          пр. Райымбека, 237в · Круглосуточно
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="relative group px-8 py-4 bg-green-500 text-white font-semibold text-lg rounded-full cursor-pointer overflow-hidden"
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-green-400/20 blur-xl group-hover:bg-green-400/40 transition-all duration-500" />
              <span className="relative z-10 inline-flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Забронировать
              </span>
            </motion.button>
          </a>
          <a
            href="tel:+77474404076"
            className="text-white/30 text-sm hover:text-white/60 transition-colors duration-300 tracking-wide"
          >
            +7 747 440-40-76
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5 text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
