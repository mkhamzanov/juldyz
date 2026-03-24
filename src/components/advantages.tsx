"use client";

import { useState, useRef, useEffect, type MouseEvent as ReactMouseEvent } from "react";
import { motion } from "framer-motion";
import { Sparkles, VolumeOff, MapPin, Clock } from "lucide-react";

/* ── Mouse-tracking gradient card (from 21st.dev Animated Card pattern) ── */
function GlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  const handleMove = (e: ReactMouseEvent) => {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - left, y: e.clientY - top });
  };

  const handleLeave = () => setMouse({ x: null, y: null });

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative transform-gpu overflow-hidden rounded-2xl p-px transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      {/* Rainbow gradient that follows cursor */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-full transition-transform duration-500 group-hover:scale-[2.5] ${
          mouse.x === null ? "opacity-0" : "opacity-100"
        }`}
        style={{
          width: 350,
          height: 350,
          left: mouse.x ?? 0,
          top: mouse.y ?? 0,
          background:
            "conic-gradient(from 0deg, #c9a96e, #f5e6c8, #c9a96e, #e8d5a8, #c9a96e)",
          maskImage: "radial-gradient(175px circle at center, white, transparent)",
          WebkitMaskImage:
            "radial-gradient(175px circle at center, white, transparent)",
        }}
      />
      {/* Inner card */}
      <div className="relative rounded-[15px] bg-[#0c0c12] p-6 sm:p-8 h-full">
        {children}
      </div>
    </div>
  );
}

const items = [
  {
    icon: Sparkles,
    title: "Чисто",
    desc: "Ежедневная уборка, свежее бельё, новая мебель во всех номерах",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: VolumeOff,
    title: "Тихо",
    desc: "Спокойный район, комфортный сон без посторонних шумов",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    icon: MapPin,
    title: "Центр города",
    desc: "Проспект Райымбека — быстрый доступ к любой точке Алматы",
    gradient: "from-emerald-400 to-green-500",
  },
  {
    icon: Clock,
    title: "24 / 7",
    desc: "Заселение в любое время дня и ночи, без ожидания",
    gradient: "from-violet-400 to-purple-500",
  },
];

export default function Advantages() {
  return (
    <section className="w-full py-24 sm:py-32 px-4 bg-[#050508] relative overflow-hidden">
      {/* Top accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#c9a96e] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Преимущества
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            Почему выбирают нас
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlowCard>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 opacity-90`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/40 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
