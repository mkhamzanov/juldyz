"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, Phone, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Branch } from "@/lib/branches";

/*
  Interactive SVG map of Almaty with hotel pins.
  We use a simplified bounding box of Almaty:
  lat: 43.20 - 43.35  lng: 76.80 - 76.95
  + Zharkent is shown as an inset
*/

const MAP_BOUNDS = {
  minLat: 43.21,
  maxLat: 43.34,
  minLng: 76.80,
  maxLng: 76.93,
};

function projectToMap(lat: number, lng: number, width: number, height: number) {
  const x = ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * width;
  const y = ((MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * height;
  return { x: Math.max(40, Math.min(width - 40, x)), y: Math.max(40, Math.min(height - 40, y)) };
}

interface Props {
  branches: Branch[];
}

export default function AlmatyMap({ branches }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const W = 800;
  const H = 500;

  const almatyBranches = branches.filter((b) => b.city === "Алматы");
  const zharkent = branches.find((b) => b.slug === "zharkent");

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {/* Background */}
        <rect x="0" y="0" width={W} height={H} rx="16" fill="#0a0a10" />

        {/* Grid pattern */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(201,169,110,0.04)" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="mapGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#c9a96e" stopOpacity="0" />
          </radialGradient>
          <filter id="pinGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="0" y="0" width={W} height={H} fill="url(#grid)" rx="16" />
        <ellipse cx={W / 2} cy={H / 2} rx="300" ry="200" fill="url(#mapGlow)" />

        {/* City label */}
        <text x={W / 2} y="35" textAnchor="middle" fill="rgba(201,169,110,0.2)" fontSize="14" fontWeight="600" letterSpacing="0.3em">
          АЛМАТЫ
        </text>

        {/* Road hints — simplified major roads */}
        <line x1="0" y1={H * 0.45} x2={W} y2={H * 0.45} stroke="rgba(255,255,255,0.03)" strokeWidth="2" strokeDasharray="8,8" />
        <line x1={W * 0.5} y1="0" x2={W * 0.5} y2={H} stroke="rgba(255,255,255,0.03)" strokeWidth="2" strokeDasharray="8,8" />

        {/* Connection lines between branches */}
        {almatyBranches.map((b, i) => {
          if (i === 0) return null;
          const prev = almatyBranches[i - 1];
          const p1 = projectToMap(prev.coords.lat, prev.coords.lng, W, H);
          const p2 = projectToMap(b.coords.lat, b.coords.lng, W, H);
          const mx = (p1.x + p2.x) / 2;
          const my = Math.min(p1.y, p2.y) - 30;
          return (
            <motion.path
              key={`line-${i}`}
              d={`M ${p1.x} ${p1.y} Q ${mx} ${my} ${p2.x} ${p2.y}`}
              fill="none"
              stroke="rgba(201,169,110,0.12)"
              strokeWidth="1"
              strokeDasharray="4,6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5 + i * 0.3, ease: "easeInOut" }}
            />
          );
        })}

        {/* Branch pins */}
        {almatyBranches.map((b, i) => {
          const pos = projectToMap(b.coords.lat, b.coords.lng, W, H);
          const isActive = active === b.slug;

          return (
            <g key={b.slug}>
              {/* Pulse ring */}
              <circle cx={pos.x} cy={pos.y} r="4" fill="#c9a96e" opacity="0.3">
                <animate attributeName="r" from="4" to="20" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.4" to="0" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </circle>

              {/* Main dot */}
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? 8 : 5}
                fill="#c9a96e"
                filter="url(#pinGlow)"
                className="cursor-pointer"
                whileHover={{ scale: 1.5 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
                onHoverStart={() => setActive(b.slug)}
                onHoverEnd={() => setActive(null)}
                onClick={() => setActive(isActive ? null : b.slug)}
              />

              {/* Label */}
              <motion.g
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.2 }}
              >
                <foreignObject x={pos.x - 60} y={pos.y + 12} width="120" height="24">
                  <div className="flex items-center justify-center">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#c9a96e]/10 border border-[#c9a96e]/20 text-[#c9a96e] whitespace-nowrap">
                      {b.shortName}
                    </span>
                  </div>
                </foreignObject>
              </motion.g>

              {/* Rating badge near pin */}
              <foreignObject x={pos.x + 10} y={pos.y - 20} width="50" height="18">
                <div className="flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 fill-[#c9a96e] text-[#c9a96e]" />
                  <span className="text-[9px] font-bold text-[#c9a96e]">{b.rating}</span>
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* Zharkent inset */}
        {zharkent && (
          <g>
            <rect x={W - 150} y={H - 70} width="140" height="60" rx="8" fill="rgba(201,169,110,0.05)" stroke="rgba(201,169,110,0.1)" />
            <text x={W - 80} y={H - 50} textAnchor="middle" fill="rgba(201,169,110,0.3)" fontSize="8" letterSpacing="0.15em">ЖЕТЫСУ ОБЛ.</text>
            <circle cx={W - 80} cy={H - 30} r="4" fill="#c9a96e" filter="url(#pinGlow)" className="cursor-pointer" />
            <text x={W - 80} y={H - 18} textAnchor="middle" fill="rgba(201,169,110,0.6)" fontSize="9" fontWeight="600">Жаркент</text>
            <foreignObject x={W - 60} y={H - 40} width="40" height="14">
              <div className="flex items-center gap-0.5">
                <Star className="w-2 h-2 fill-[#c9a96e] text-[#c9a96e]" />
                <span className="text-[8px] font-bold text-[#c9a96e]">{zharkent.rating}</span>
              </div>
            </foreignObject>
          </g>
        )}
      </svg>

      {/* Tooltip card */}
      <AnimatePresence>
        {active && (() => {
          const b = branches.find((x) => x.slug === active);
          if (!b) return null;
          return (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-4 sm:w-80 p-5 rounded-2xl bg-[#0c0c14]/95 backdrop-blur-xl border border-[#c9a96e]/20 shadow-2xl shadow-black/50 z-20"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-[family-name:var(--font-heading)] font-bold text-white text-lg">{b.shortName}</h4>
                  <p className="text-white/40 text-xs flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {b.address}
                  </p>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/20">
                  <Star className="w-3 h-3 fill-[#c9a96e] text-[#c9a96e]" />
                  <span className="text-xs font-bold text-[#c9a96e]">{b.rating}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {b.amenities.slice(0, 4).map((a) => (
                  <span key={a} className="px-2 py-0.5 text-[9px] rounded-full bg-white/[0.04] border border-white/[0.06] text-white/40 uppercase tracking-wider">{a}</span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white/30 text-xs">от </span>
                  <span className="text-lg font-bold text-white">{b.priceFrom.toLocaleString("ru-RU")}</span>
                  <span className="text-white/30 text-xs"> ₸</span>
                </div>
                <Link href={`/${b.slug}`}>
                  <button className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#c9a96e] text-[#0a0a0f] text-xs font-bold hover:bg-[#e8d5a8] transition cursor-pointer">
                    Подробнее <ChevronRight className="w-3 h-3" />
                  </button>
                </Link>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
