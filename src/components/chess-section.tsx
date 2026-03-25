"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";

interface ChessSectionProps {
  direction: "image-left" | "image-right";
  tag: string;
  title: string;
  titleAccent: string;
  description: string;
  stats: { value: string; label: string }[];
  imageUrl: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function ChessSection({
  direction,
  tag,
  title,
  titleAccent,
  description,
  stats,
  imageUrl,
  ctaText = "Подробнее",
  ctaHref,
}: ChessSectionProps) {
  const isLeft = direction === "image-left";

  return (
    <section className="w-full py-16 md:py-28 px-4 sm:px-6 md:px-10">
      <div
        className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-stretch ${
          !isLeft ? "md:[direction:rtl] [&>*]:md:[direction:ltr]" : ""
        }`}
      >
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[500px] relative"
        >
          <img
            src={imageUrl}
            alt={tag}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 to-transparent" />
        </motion.div>

        {/* Text */}
        <div className="flex flex-col justify-center py-4 md:py-8">
          <BlurFade delay={0.15} inView inViewMargin="-50px">
            <div className="flex items-center gap-2 mb-6">
              <ArrowRight className="w-3.5 h-3.5 text-[#c9a96e]" />
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-white/60">
                {tag}
              </span>
            </div>
          </BlurFade>

          <BlurFade delay={0.25} inView inViewMargin="-50px">
            <h2
              className="font-light text-white mb-6"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
            >
              {title}
              <br />
              <span className="font-[family-name:var(--font-heading)] italic text-white/80">
                {titleAccent}
              </span>
            </h2>
          </BlurFade>

          <BlurFade delay={0.35} inView inViewMargin="-50px">
            <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-lg">
              {description}
            </p>
          </BlurFade>

          <BlurFade delay={0.45} inView inViewMargin="-50px">
            <div className="flex gap-12 mb-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-light text-white">{s.value}</div>
                  <div className="text-xs tracking-[0.15em] uppercase text-white/40 mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </BlurFade>

          {ctaHref && (
            <BlurFade delay={0.55} inView inViewMargin="-50px">
              <a href={ctaHref} target="_blank" rel="noopener noreferrer">
                <button
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold cursor-pointer transition-all duration-300 hover:scale-[1.03]"
                  style={{
                    background: "linear-gradient(135deg, hsl(220,70%,78%), hsl(40,80%,82%))",
                    color: "#0a0a0f",
                  }}
                >
                  {ctaText}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </a>
            </BlurFade>
          )}
        </div>
      </div>
    </section>
  );
}
