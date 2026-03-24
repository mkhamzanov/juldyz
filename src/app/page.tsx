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
import Image from "next/image";
import { branches, NETWORK_STATS } from "@/lib/branches";
import FloatingCTA from "@/components/floating-cta";
import BlurFade from "@/components/magicui/blur-fade";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import AlmatyMap from "@/components/almaty-map";

/* ── Branch card with SpotlightCard + BorderBeam ── */
function BranchCard({ branch, index }: { branch: (typeof branches)[0]; index: number }) {
  return (
    <BlurFade delay={0.15 + index * 0.1} inView inViewMargin="-50px">
      <Link href={`/${branch.slug}`} className="block h-full">
        <SpotlightCard
          className="h-full rounded-2xl"
          spotlightColor="rgba(201,169,110,0.1)"
        >
          <div className="group relative h-full rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#c9a96e]/30 transition-all duration-500 overflow-hidden">
            {/* Border beam on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <BorderBeam lightColor="#c9a96e" duration={6} lightWidth={150} />
            </div>

            {/* Top visual */}
            <div className="relative h-32 bg-gradient-to-br from-[#c9a96e]/8 to-[#c9a96e]/3 flex items-center justify-center overflow-hidden">
              <FlickeringGrid
                className="absolute inset-0 opacity-30"
                squareSize={3}
                gridGap={8}
                maxOpacity={0.15}
                color="rgb(201,169,110)"
              />
              <motion.span
                className="relative text-5xl font-[family-name:var(--font-heading)] font-bold text-[#c9a96e]/15 group-hover:text-[#c9a96e]/25 transition-colors select-none"
                whileHover={{ scale: 1.1 }}
              >
                {branch.shortName}
              </motion.span>

              {/* Rating */}
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-[#c9a96e]/20">
                <Star className="h-3 w-3 fill-[#c9a96e] text-[#c9a96e]" />
                <span className="text-xs font-bold text-[#c9a96e]">{branch.rating}</span>
                <span className="text-[9px] text-white/30">({branch.ratingCount})</span>
              </div>

              {/* City */}
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.06] text-[9px] font-medium text-white/40 uppercase tracking-wider">
                {branch.city}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              <div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#c9a96e] transition-colors font-[family-name:var(--font-heading)]">
                  {branch.shortName}
                </h3>
                <div className="flex items-start gap-1.5 text-white/35">
                  <MapPin className="h-3 w-3 mt-0.5 shrink-0 text-[#c9a96e]/50" />
                  <p className="text-xs">{branch.address}</p>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-1">
                {branch.amenities.slice(0, 3).map((a) => (
                  <span key={a} className="px-2 py-0.5 text-[9px] rounded-full bg-[#c9a96e]/[0.06] text-[#c9a96e]/70 border border-[#c9a96e]/10 uppercase tracking-wider font-medium">
                    {a}
                  </span>
                ))}
                {branch.amenities.length > 3 && (
                  <span className="px-2 py-0.5 text-[9px] rounded-full bg-white/[0.03] text-white/20 border border-white/[0.04]">
                    +{branch.amenities.length - 3}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div className="flex items-center gap-1.5 text-[10px] text-white/20">
                <Phone className="w-2.5 h-2.5" /> {branch.phoneDisplay}
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                <div>
                  <span className="text-white/25 text-[10px]">от </span>
                  <span className="text-xl font-bold text-white">{branch.priceFrom.toLocaleString("ru-RU")}</span>
                  <span className="text-white/25 text-[10px]"> ₸</span>
                </div>
                <div className="flex items-center gap-1 text-[#c9a96e] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Подробнее
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </Link>
    </BlurFade>
  );
}

/* ── Main page ── */
export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050508]">
      {/* BG flicker */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FlickeringGrid
          className="absolute inset-0 opacity-20"
          squareSize={3}
          gridGap={10}
          maxOpacity={0.08}
          flickerChance={0.15}
          color="rgb(201,169,110)"
        />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#c9a96e]/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#c9a96e]/[0.02] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* ═══ HERO ═══ */}
        <div className="text-center mb-20 sm:mb-28">
          <BlurFade delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/20 mb-8">
              <Building2 className="h-4 w-4 text-[#c9a96e]" />
              <span className="text-sm text-[#c9a96e] font-medium tracking-wide">
                Сеть гостиниц · {NETWORK_STATS.totalBranches} филиалов
              </span>
            </div>
          </BlurFade>

          <BlurFade delay={0.2}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 font-[family-name:var(--font-heading)]">
              <span style={{ background: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Гостиницы
              </span>
              <br />
              <span style={{ background: "linear-gradient(135deg, #e8d5a8 0%, #c9a96e 50%, #e8d5a8 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s ease-in-out infinite" }}>
                Juldyz
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.3}>
            <p className="text-lg text-white/35 max-w-xl mx-auto leading-relaxed mb-3">
              Чисто. Тихо. Доступно. Круглосуточно.
            </p>
            <p className="text-sm text-white/20 mb-8">
              Более {NETWORK_STATS.totalRatings.toLocaleString("ru-RU")} оценок на 2ГИС · Рейтинг {NETWORK_STATS.avgRating} / 5 · ★★★
            </p>
          </BlurFade>

          <BlurFade delay={0.4}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href="tel:+77474404076">
                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/60 text-sm font-medium hover:bg-white/[0.1] transition-all cursor-pointer">
                  <Phone className="w-4 h-4" /> +7 747 440-40-76
                </button>
              </a>
              <a href="https://wa.me/77474404076" target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium hover:bg-green-500/30 transition-all cursor-pointer">
                  <Image src="/icons/social/whatsapp-logo.svg" alt="WhatsApp" width={16} height={16} className="invert opacity-70" />
                  WhatsApp
                </button>
              </a>
              <a href="https://instagram.com/juldyz_apart" target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/40 text-sm font-medium hover:bg-white/[0.08] transition-all cursor-pointer">
                  <Image src="/icons/social/instagram-logo.svg" alt="Instagram" width={16} height={16} className="invert opacity-50" />
                  @juldyz_apart
                </button>
              </a>
            </div>
          </BlurFade>
        </div>

        {/* ═══ INTERACTIVE MAP ═══ */}
        <BlurFade delay={0.5} inView inViewMargin="-50px">
          <div className="mb-20 sm:mb-28">
            <div className="text-center mb-10">
              <p className="text-[#c9a96e] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Карта</p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-white">
                Наши филиалы
              </h2>
              <p className="text-white/25 text-sm mt-2">Наведите на точку, чтобы увидеть детали</p>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.06]">
              <AlmatyMap branches={branches} />
            </div>
          </div>
        </BlurFade>

        {/* ═══ BRANCH CARDS ═══ */}
        <div className="mb-20">
          <BlurFade delay={0.1} inView inViewMargin="-50px">
            <div className="text-center mb-12">
              <p className="text-[#c9a96e] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Филиалы</p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-white">
                Выберите гостиницу
              </h2>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {branches.map((branch, i) => (
              <BranchCard key={branch.slug} branch={branch} index={i} />
            ))}
          </div>
        </div>

        {/* ═══ FOOTER ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center pt-10 border-t border-white/[0.04]"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/20">
            <span className="font-[family-name:var(--font-heading)] font-semibold text-white/30">
              Juldyz
            </span>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/juldyz_apart" target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a96e] transition-colors">
                @juldyz_apart
              </a>
              <a href="https://instagram.com/juldyz_hotel_" target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a96e] transition-colors">
                @juldyz_hotel_
              </a>
            </div>
            <span>© {new Date().getFullYear()} · Круглосуточно</span>
          </div>
        </motion.div>
      </div>

      <FloatingCTA />
    </div>
  );
}
