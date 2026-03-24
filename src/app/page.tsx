"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Phone,
  ChevronRight,
  Building2,
  MessageCircle,
  Camera,
} from "lucide-react";
import Link from "next/link";
import { branches, NETWORK_STATS } from "@/lib/branches";
import FloatingCTA from "@/components/floating-cta";

/* ── Floating shape decoration ── */
function FloatingShape({
  className,
  delay = 0,
  w = 400,
  h = 100,
  rotate = 0,
}: {
  className?: string;
  delay?: number;
  w?: number;
  h?: number;
  rotate?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 2, delay, ease: [0.23, 0.86, 0.39, 0.96] }}
      className={`absolute pointer-events-none ${className}`}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: w, height: h }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c9a96e]/[0.07] to-transparent border border-[#c9a96e]/[0.12] backdrop-blur-[2px]" />
      </motion.div>
    </motion.div>
  );
}

/* ── Branch card ── */
function BranchCard({ branch, index }: { branch: (typeof branches)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.12, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link href={`/${branch.slug}`} className="block h-full">
        <div className="group relative h-full overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#c9a96e]/30 transition-all duration-500">
          {/* Hover glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#c9a96e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Top bar with rating */}
          <div className="relative h-36 bg-gradient-to-br from-[#c9a96e]/10 to-[#c9a96e]/5 flex items-center justify-center overflow-hidden">
            <motion.div
              animate={{ scale: hovered ? 1.1 : 1 }}
              transition={{ duration: 0.6 }}
              className="text-6xl font-[family-name:var(--font-heading)] font-bold text-[#c9a96e]/20"
            >
              {branch.shortName.charAt(0)}
            </motion.div>

            {/* Rating badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#c9a96e]/20">
              <Star className="h-3.5 w-3.5 fill-[#c9a96e] text-[#c9a96e]" />
              <span className="text-sm font-semibold text-[#c9a96e]">{branch.rating}</span>
              <span className="text-[10px] text-white/40">({branch.ratingCount})</span>
            </div>

            {/* City badge */}
            <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-[10px] font-medium text-white/50 uppercase tracking-wider">
              {branch.city}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-[#c9a96e] transition-colors font-[family-name:var(--font-heading)]">
                {branch.shortName}
              </h3>
              <div className="flex items-start gap-2 text-white/40">
                <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#c9a96e]/60" />
                <p className="text-sm">{branch.address}</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-1.5">
              {branch.amenities.slice(0, 3).map((a) => (
                <span
                  key={a}
                  className="px-2.5 py-1 text-[10px] rounded-full bg-[#c9a96e]/[0.08] text-[#c9a96e]/80 border border-[#c9a96e]/10 uppercase tracking-wider font-medium"
                >
                  {a}
                </span>
              ))}
              {branch.amenities.length > 3 && (
                <span className="px-2.5 py-1 text-[10px] rounded-full bg-white/[0.04] text-white/30 border border-white/[0.06]">
                  +{branch.amenities.length - 3}
                </span>
              )}
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2 text-xs text-white/25">
              <Phone className="w-3 h-3" />
              <span>{branch.phoneDisplay}</span>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
              <div>
                <span className="text-white/30 text-xs">от </span>
                <span className="text-xl font-bold text-white">{branch.priceFrom.toLocaleString("ru-RU")}</span>
                <span className="text-white/30 text-xs"> ₸/сутки</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#c9a96e] text-sm font-medium">
                Подробнее
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Main page ── */
export default function Home() {
  const totalReviews = NETWORK_STATS.totalRatings;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050508]">
      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#c9a96e]/[0.02] via-transparent to-[#c9a96e]/[0.02] blur-3xl" />

      <FloatingShape delay={0.3} w={600} h={140} rotate={12} className="left-[-10%] top-[15%]" />
      <FloatingShape delay={0.5} w={500} h={120} rotate={-15} className="right-[-5%] top-[70%]" />
      <FloatingShape delay={0.4} w={300} h={80} rotate={-8} className="left-[5%] bottom-[5%]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-16 sm:mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/20 mb-8"
          >
            <Building2 className="h-4 w-4 text-[#c9a96e]" />
            <span className="text-sm text-[#c9a96e] font-medium tracking-wide">
              Сеть гостиниц · 5 филиалов
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 font-[family-name:var(--font-heading)]">
            <span
              style={{
                background: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Гостиницы
            </span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #e8d5a8 0%, #c9a96e 50%, #e8d5a8 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 4s ease-in-out infinite",
              }}
            >
              Juldyz
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-white/40 max-w-xl mx-auto leading-relaxed mb-6"
          >
            Чисто. Тихо. Доступно. Сеть гостиниц в Алматы и Жетысу области.
            <br />
            Более {totalReviews.toLocaleString("ru-RU")} оценок на 2ГИС.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <a href="tel:+77474404076">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/60 text-sm font-medium hover:bg-white/[0.1] transition-all cursor-pointer">
                <Phone className="w-4 h-4" />
                +7 747 440-40-76
              </button>
            </a>
            <a href="https://wa.me/77474404076" target="_blank" rel="noopener noreferrer">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium hover:bg-green-500/30 transition-all cursor-pointer">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
            </a>
            <a href="https://instagram.com/juldyz_apart" target="_blank" rel="noopener noreferrer">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/40 text-sm font-medium hover:bg-white/[0.08] transition-all cursor-pointer">
                <Camera className="w-4 h-4" />
                @juldyz_apart
              </button>
            </a>
          </motion.div>
        </motion.div>

        {/* Branch grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {branches.map((branch, i) => (
            <BranchCard key={branch.slug} branch={branch} index={i} />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-20 pt-8 border-t border-white/[0.04]"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/20">
            <span className="font-[family-name:var(--font-heading)] font-semibold text-white/30">
              Juldyz
            </span>
            <span>© {new Date().getFullYear()} · Все филиалы работают круглосуточно</span>
            <a href="tel:+77474404076" className="hover:text-[#c9a96e] transition-colors">
              +7 747 440-40-76
            </a>
          </div>
        </motion.div>
      </div>

      <FloatingCTA />
    </div>
  );
}
