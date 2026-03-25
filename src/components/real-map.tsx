"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, Phone, ChevronRight, Navigation } from "lucide-react";
import Link from "next/link";
import { branches } from "@/lib/branches";
import type { Branch } from "@/lib/branches";

/*
  Real map using Yandex Maps Static API (no API key needed for static tiles)
  + custom SVG overlay with interactive pins
*/

// Almaty bounds
const BOUNDS = {
  minLat: 43.19,
  maxLat: 43.36,
  minLng: 76.78,
  maxLng: 76.96,
};

function project(lat: number, lng: number, w: number, h: number) {
  // Mercator-like projection within bounds
  const x = ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * w;
  const latRad = (lat * Math.PI) / 180;
  const minLatRad = (BOUNDS.minLat * Math.PI) / 180;
  const maxLatRad = (BOUNDS.maxLat * Math.PI) / 180;
  const yNorm =
    (Math.log(Math.tan(Math.PI / 4 + maxLatRad / 2)) -
      Math.log(Math.tan(Math.PI / 4 + latRad / 2))) /
    (Math.log(Math.tan(Math.PI / 4 + maxLatRad / 2)) -
      Math.log(Math.tan(Math.PI / 4 + minLatRad / 2)));
  const y = yNorm * h;
  return { x: Math.max(30, Math.min(w - 30, x)), y: Math.max(30, Math.min(h - 30, y)) };
}

export default function RealMap() {
  const [active, setActive] = useState<string | null>(null);
  const W = 900;
  const H = 550;

  const almatyBranches = branches.filter((b) => b.city === "Алматы");
  const zharkent = branches.find((b) => b.slug === "zharkent");
  const activeBranch = branches.find((b) => b.slug === active);

  // Yandex Static Map tile (dark style, no key needed)
  const centerLat = (BOUNDS.minLat + BOUNDS.maxLat) / 2;
  const centerLng = (BOUNDS.minLng + BOUNDS.maxLng) / 2;
  const yandexUrl = `https://static-maps.yandex.ru/v1?ll=${centerLng},${centerLat}&z=11&size=900,550&l=map&theme=dark&lang=ru_RU`;

  // OpenStreetMap tile as fallback (dark themed via filter)
  const osmZ = 12;
  const osmX = Math.floor(((centerLng + 180) / 360) * Math.pow(2, osmZ));
  const osmY = Math.floor(
    ((1 - Math.log(Math.tan((centerLat * Math.PI) / 180) + 1 / Math.cos((centerLat * Math.PI) / 180)) / Math.PI) / 2) * Math.pow(2, osmZ)
  );

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0a0a10]">
      {/* Map background — using iframe with OSM dark tiles */}
      <div className="absolute inset-0">
        <iframe
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${BOUNDS.minLng},${BOUNDS.minLat},${BOUNDS.maxLng},${BOUNDS.maxLat}&layer=mapnik`}
          className="w-full h-full border-0"
          style={{
            filter: "invert(0.92) hue-rotate(180deg) saturate(0.2) brightness(0.5) contrast(1.2)",
          }}
          loading="lazy"
          title="Карта Алматы"
        />
      </div>

      {/* Gold overlay tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#c9a96e]/[0.03] to-transparent pointer-events-none" />

      {/* SVG overlay with pins */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 w-full h-full z-10"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow2">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c9a96e" stopOpacity="0" />
            <stop offset="50%" stopColor="#c9a96e" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#c9a96e" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Connection lines */}
        {almatyBranches.map((b, i) => {
          if (i === 0) return null;
          const prev = almatyBranches[i - 1];
          const p1 = project(prev.coords.lat, prev.coords.lng, W, H);
          const p2 = project(b.coords.lat, b.coords.lng, W, H);
          const mx = (p1.x + p2.x) / 2;
          const my = Math.min(p1.y, p2.y) - 25;
          return (
            <motion.path
              key={`conn-${i}`}
              d={`M ${p1.x} ${p1.y} Q ${mx} ${my} ${p2.x} ${p2.y}`}
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 + i * 0.3, ease: "easeInOut" }}
            />
          );
        })}

        {/* Pins */}
        {almatyBranches.map((b, i) => {
          const pos = project(b.coords.lat, b.coords.lng, W, H);
          const isActive = active === b.slug;
          return (
            <g key={b.slug}>
              {/* Pulse */}
              <circle cx={pos.x} cy={pos.y} r="4" fill="#c9a96e" opacity="0.3">
                <animate attributeName="r" from="4" to="24" dur="2.5s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.4" to="0" dur="2.5s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              </circle>
              {/* Second pulse */}
              <circle cx={pos.x} cy={pos.y} r="4" fill="#c9a96e" opacity="0.2">
                <animate attributeName="r" from="4" to="16" dur="2s" begin={`${i * 0.5 + 0.8}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.3" to="0" dur="2s" begin={`${i * 0.5 + 0.8}s`} repeatCount="indefinite" />
              </circle>

              {/* Pin dot */}
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? 9 : 6}
                fill={isActive ? "#e8d5a8" : "#c9a96e"}
                filter="url(#glow2)"
                className="cursor-pointer"
                whileHover={{ scale: 1.4 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
                onHoverStart={() => setActive(b.slug)}
                onHoverEnd={() => setActive(null)}
                onClick={() => setActive(isActive ? null : b.slug)}
              />

              {/* Inner white dot */}
              <circle cx={pos.x} cy={pos.y} r="2" fill="white" opacity="0.8" className="pointer-events-none" />

              {/* Label */}
              <motion.g
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.2, duration: 0.5 }}
              >
                <foreignObject x={pos.x - 55} y={pos.y + 14} width="110" height="32">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#0a0a10]/80 backdrop-blur border border-[#c9a96e]/20 text-[#c9a96e] whitespace-nowrap">
                      {b.shortName}
                    </span>
                  </div>
                </foreignObject>
              </motion.g>

              {/* Rating badge */}
              <foreignObject x={pos.x + 10} y={pos.y - 22} width="55" height="20">
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#0a0a10]/70 backdrop-blur border border-[#c9a96e]/15">
                  <Star className="w-2.5 h-2.5 fill-[#c9a96e] text-[#c9a96e]" />
                  <span className="text-[9px] font-bold text-[#c9a96e]">{b.rating}</span>
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* Zharkent indicator */}
        {zharkent && (
          <g>
            <rect x={W - 165} y={H - 75} width="155" height="65" rx="10" fill="rgba(10,10,16,0.8)" stroke="rgba(201,169,110,0.15)" />
            <text x={W - 88} y={H - 55} textAnchor="middle" fill="rgba(201,169,110,0.3)" fontSize="7" letterSpacing="0.2em" fontWeight="600">
              ЖЕТЫСУ ОБЛАСТЬ
            </text>
            <circle cx={W - 108} cy={H - 32} r="5" fill="#c9a96e" filter="url(#glow2)" className="cursor-pointer" />
            <circle cx={W - 108} cy={H - 32} r="1.5" fill="white" opacity="0.8" />
            <text x={W - 93} y={H - 28} fill="rgba(201,169,110,0.7)" fontSize="10" fontWeight="600">Жаркент</text>
            <foreignObject x={W - 65} y={H - 42} width="40" height="14">
              <div className="flex items-center gap-0.5">
                <Star className="w-2 h-2 fill-[#c9a96e] text-[#c9a96e]" />
                <span className="text-[8px] font-bold text-[#c9a96e]">{zharkent.rating}</span>
              </div>
            </foreignObject>
            {/* Arrow from main map */}
            <line x1={W - 165} y1={H - 42} x2={W - 180} y2={H - 42} stroke="rgba(201,169,110,0.15)" strokeDasharray="3,3" />
          </g>
        )}
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {activeBranch && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-20"
          >
            <div className="p-5 rounded-2xl bg-[#0c0c14]/95 backdrop-blur-2xl border border-[#c9a96e]/20 shadow-2xl shadow-black/60">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-[family-name:var(--font-heading)] font-bold text-white text-lg">
                    {activeBranch.shortName}
                  </h4>
                  <p className="text-white/35 text-xs flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {activeBranch.address}, {activeBranch.city}
                  </p>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/20 shrink-0">
                  <Star className="w-3 h-3 fill-[#c9a96e] text-[#c9a96e]" />
                  <span className="text-xs font-bold text-[#c9a96e]">{activeBranch.rating}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {activeBranch.amenities.slice(0, 4).map((a) => (
                  <span key={a} className="px-2 py-0.5 text-[8px] rounded-full bg-white/[0.04] border border-white/[0.05] text-white/40 uppercase tracking-wider font-medium">{a}</span>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-4 text-xs text-white/30">
                <Phone className="w-3 h-3" />
                <span>{activeBranch.phoneDisplay}</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white/25 text-xs">от </span>
                  <span className="text-xl font-bold text-white">{activeBranch.priceFrom.toLocaleString("ru-RU")}</span>
                  <span className="text-white/25 text-xs"> ₸</span>
                </div>
                <div className="flex gap-2">
                  <a href={activeBranch.whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <button className="px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-[10px] font-bold hover:bg-green-500/30 transition cursor-pointer">
                      WhatsApp
                    </button>
                  </a>
                  <Link href={`/${activeBranch.slug}`}>
                    <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#c9a96e] text-[#0a0a0f] text-[10px] font-bold hover:bg-[#e8d5a8] transition cursor-pointer">
                      Открыть <ChevronRight className="w-3 h-3" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 py-3 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-white/20 text-xs">
            <Navigation className="w-3 h-3" />
            <span>5 филиалов по Казахстану</span>
          </div>
          <div className="text-white/15 text-[10px]">Наведите на точку для деталей</div>
        </div>
      </div>
    </div>
  );
}
