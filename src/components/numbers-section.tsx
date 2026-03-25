"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import BlurFade from "@/components/magicui/blur-fade";

function AnimatedNumber({
  value,
  suffix = "",
  duration = 1600,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 40;
    const increment = value / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      setDisplay(Math.floor(start));
    }, interval);
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}

const metrics = [
  { value: 5, suffix: "", label: "Филиалов", sublabel: "Алматы и Жаркент" },
  { value: 2929, suffix: "+", label: "Оценок на 2ГИС", sublabel: "Суммарно по сети" },
  { value: 97, suffix: "%", label: "Гостей довольны", sublabel: "По данным 2ГИС" },
  { value: 24, suffix: "/7", label: "Круглосуточно", sublabel: "Без выходных" },
];

export default function NumbersSection() {
  return (
    <section className="relative w-full py-24 sm:py-36 px-4 overflow-hidden">
      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-[family-name:var(--font-heading)] italic text-white/[0.02]"
          style={{ fontSize: "clamp(8rem, 25vw, 20rem)" }}
        >
          Juldyz
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <BlurFade delay={0.1} inView inViewMargin="-100px">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-5 py-1.5 border border-white/20 rounded-full text-[10px] tracking-[0.25em] uppercase text-white/60 mb-6">
              В цифрах
            </span>
            <h2
              className="font-light text-white"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
            >
              Измеримые результаты,
              <br />
              <span className="font-[family-name:var(--font-heading)] italic text-white/80">
                а не пустые обещания
              </span>
            </h2>
          </div>
        </BlurFade>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.08]">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="bg-[#050508] p-8 md:p-12 text-center"
            >
              <div
                className="font-light text-white mb-2"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                <AnimatedNumber value={m.value} suffix={m.suffix} />
              </div>
              <div className="text-sm font-medium text-white/70 mb-1">
                {m.label}
              </div>
              <div className="text-xs text-white/30">{m.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
