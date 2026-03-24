"use client";

import { motion } from "framer-motion";
import {
  Wifi,
  ShowerHead,
  Wind,
  Tv,
  BedDouble,
  Droplets,
  Bath,
  Footprints,
} from "lucide-react";

const items = [
  { icon: Wifi, label: "Бесплатный Wi-Fi" },
  { icon: BedDouble, label: "Чистое бельё" },
  { icon: Droplets, label: "Полотенца" },
  { icon: Bath, label: "Мыло и шампунь" },
  { icon: ShowerHead, label: "Горячая вода 24/7" },
  { icon: Wind, label: "Кондиционер" },
  { icon: Tv, label: "Телевизор" },
  { icon: Footprints, label: "Тапочки" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 120, damping: 14 },
  },
};

export default function Included() {
  return (
    <section
      id="included"
      className="w-full py-24 sm:py-32 px-4 bg-[#050508] relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#c9a96e] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Удобства
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Что включено
          </h2>
          <p className="text-white/30 max-w-md mx-auto">
            Всё необходимое уже в каждом номере — ничего не нужно просить
            отдельно
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
        >
          {items.map((item) => (
            <motion.div key={item.label} variants={itemVariants}>
              <div className="group flex flex-col items-center text-center gap-3 p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#c9a96e]/30 hover:bg-white/[0.04] transition-all duration-500 cursor-default">
                <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/10 flex items-center justify-center group-hover:bg-[#c9a96e]/20 group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-5 h-5 text-[#c9a96e]" />
                </div>
                <span className="text-sm font-medium text-white/60 leading-tight">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
