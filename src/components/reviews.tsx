"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

/* ── Data ── */
const col1 = [
  { name: "Асхат М.", text: "Чисто, всё новое, вежливый ресепшн. Рекомендую всем командировочным. Отличное место!", rating: 5 },
  { name: "Динара К.", text: "Чисто, тихо — главное тишина. Выспалась отлично, никто не мешал. Приеду ещё.", rating: 5 },
  { name: "Ерлан С.", text: "Персонал классный, администраторы доброжелательные. Помогли с багажом, подсказали где поесть рядом.", rating: 5 },
];

const col2 = [
  { name: "Айгуль Н.", text: "Номера уютные, особенно 4 этаж. Всё чисто, есть всё необходимое для комфортного проживания.", rating: 5 },
  { name: "Максат Б.", text: "Всем советую. Приезжаю в Алматы — только сюда. Цена-качество на высоте, лучше не найти.", rating: 5 },
  { name: "Ольга Т.", text: "Хороший отель за свои деньги. Удобное расположение, рядом остановки и магазины.", rating: 4 },
];

const col3 = [
  { name: "Руслан А.", text: "Останавливался в командировке на 3 ночи. Всё отлично — чисто, тепло, Wi-Fi быстрый.", rating: 5 },
  { name: "Камила Д.", text: "Очень приятный персонал, быстрое заселение даже поздно ночью. Буду рекомендовать коллегам.", rating: 5 },
  { name: "Арман Ж.", text: "Для своей цены — лучший вариант в этом районе. Чисто, есть всё что нужно.", rating: 4 },
];

/* ── Vertical scrolling column (from 21st.dev Testimonial-v2 pattern) ── */
function ScrollColumn({
  reviews,
  duration = 15,
  className = "",
}: {
  reviews: typeof col1;
  duration?: number;
  className?: string;
}) {
  const doubled = [...reviews, ...reviews];
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-4 pb-4"
      >
        {doubled.map((review, i) => (
          <motion.div
            key={i}
            whileHover={{
              scale: 1.03,
              y: -4,
              transition: { type: "spring", stiffness: 400, damping: 17 },
            }}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#c9a96e]/20 hover:bg-white/[0.05] transition-colors duration-300 cursor-default select-none"
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-3.5 h-3.5 ${
                    s <= review.rating
                      ? "fill-[#c9a96e] text-[#c9a96e]"
                      : "fill-white/10 text-white/10"
                  }`}
                />
              ))}
            </div>
            {/* Text */}
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              «{review.text}»
            </p>
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#9a7b4f] flex items-center justify-center text-white text-xs font-bold">
                {review.name[0]}
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium">{review.name}</p>
                <p className="text-white/20 text-xs">2ГИС</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="w-full py-24 sm:py-32 px-4 bg-[#050508] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#c9a96e] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Отзывы
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Что говорят гости
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((s) => (
                <Star key={s} className="w-5 h-5 fill-[#c9a96e] text-[#c9a96e]" />
              ))}
              <Star className="w-5 h-5 fill-[#c9a96e]/30 text-[#c9a96e]/30" />
            </div>
            <span className="text-3xl font-bold text-white">4.3</span>
            <span className="text-white/30 text-lg">/ 5</span>
          </div>
          <p className="text-white/20 text-sm mt-2">1 357 оценок на 2ГИС</p>
        </motion.div>

        {/* Scrolling columns */}
        <div
          className="flex justify-center gap-4 max-h-[550px] overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <ScrollColumn reviews={col1} duration={18} className="w-full max-w-[340px]" />
          <ScrollColumn reviews={col2} duration={22} className="w-full max-w-[340px] hidden md:block" />
          <ScrollColumn reviews={col3} duration={20} className="w-full max-w-[340px] hidden lg:block" />
        </div>

        <div className="text-center mt-12">
          <a
            href="https://2gis.kz/almaty/firm/70000001077386532"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#c9a96e]/70 hover:text-[#c9a96e] transition-colors"
          >
            Все отзывы на 2ГИС →
          </a>
        </div>
      </div>
    </section>
  );
}
