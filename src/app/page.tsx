"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Phone,
  ChevronRight,
  ArrowRight,
  MessageCircle,
  Menu,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { branches, NETWORK_STATS } from "@/lib/branches";
import BlurFade from "@/components/magicui/blur-fade";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import MarqueeStrip from "@/components/marquee-strip";
import NumbersSection from "@/components/numbers-section";
import ChessSection from "@/components/chess-section";
import RealMap from "@/components/real-map";
import ClipMenu from "@/components/clip-menu";
import FloatingCTA from "@/components/floating-cta";

/* ── Branch card ── */
function BranchCard({ branch, index }: { branch: (typeof branches)[0]; index: number }) {
  return (
    <BlurFade delay={0.15 + index * 0.12} inView inViewMargin="-50px">
      <Link href={`/${branch.slug}`} className="block h-full">
        <SpotlightCard className="h-full rounded-2xl" spotlightColor="rgba(201,169,110,0.1)">
          <div className="group relative h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-500 overflow-hidden">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <BorderBeam lightColor="#c9a96e" duration={6} lightWidth={150} />
            </div>

            {/* Top */}
            <div className="relative h-28 bg-gradient-to-br from-[#c9a96e]/8 to-transparent flex items-center justify-center overflow-hidden">
              <span className="text-4xl font-[family-name:var(--font-heading)] italic font-bold text-[#c9a96e]/10 group-hover:text-[#c9a96e]/20 transition-colors select-none">
                {branch.shortName}
              </span>
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur border border-[#c9a96e]/20">
                <Star className="h-3 w-3 fill-[#c9a96e] text-[#c9a96e]" />
                <span className="text-[10px] font-bold text-[#c9a96e]">{branch.rating}</span>
              </div>
              <span className="absolute top-3 left-3 px-2 py-0.5 text-[8px] rounded-full border border-white/[0.08] text-white/30 uppercase tracking-[0.15em] font-medium">
                {branch.city}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              <h3 className="text-base font-bold text-white group-hover:text-[#c9a96e] transition-colors font-[family-name:var(--font-heading)]">
                {branch.shortName}
              </h3>
              <div className="flex items-start gap-1.5 text-white/30">
                <MapPin className="h-3 w-3 mt-0.5 shrink-0 text-[#c9a96e]/40" />
                <p className="text-[11px]">{branch.address}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {branch.amenities.slice(0, 3).map((a) => (
                  <span key={a} className="px-2 py-0.5 text-[8px] rounded-full border border-white/[0.06] text-white/25 uppercase tracking-wider">{a}</span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                <div>
                  <span className="text-white/20 text-[10px]">от </span>
                  <span className="text-lg font-bold text-white">{branch.priceFrom.toLocaleString("ru-RU")}</span>
                  <span className="text-white/20 text-[10px]"> ₸</span>
                </div>
                <span className="text-[#c9a96e]/50 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Подробнее <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </Link>
    </BlurFade>
  );
}

/* ══════════════ MAIN PAGE ══════════════ */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#050508] text-white overflow-hidden">
      <ClipMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        {/* BG */}
        <div className="absolute inset-0 z-0">
          <FlickeringGrid className="absolute inset-0 opacity-25" squareSize={3} gridGap={10} maxOpacity={0.1} flickerChance={0.12} color="rgb(201,169,110)" />
        </div>
        <div className="absolute inset-x-0 top-0 h-60 bg-gradient-to-b from-[#050508] to-transparent z-[1]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050508] to-transparent z-[1]" />

        {/* Gradient orbs */}
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[hsl(220,70%,78%)]/[0.04] blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[hsl(40,80%,82%)]/[0.04] blur-[100px]" />

        {/* Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10 px-4 sm:px-8 py-5 flex items-center justify-between"
        >
          <button
            onClick={() => setMenuOpen(true)}
            className="inline-flex items-center gap-3 px-4 py-2 border border-white/20 rounded-full text-sm cursor-pointer hover:bg-white/5 transition"
          >
            <div className="flex flex-col gap-[5px]">
              <div className="w-5 h-[1.5px] bg-white" />
              <div className="w-5 h-[1.5px] bg-white" />
            </div>
            <span className="text-xs tracking-[0.15em] uppercase text-white/70">Меню</span>
          </button>

          <span className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold tracking-wider font-[family-name:var(--font-heading)]">
            JULDYZ
          </span>

          <div className="hidden md:flex items-center gap-3">
            <Link href="#map" className="px-4 py-2 border border-white/15 rounded-full text-xs tracking-[0.1em] uppercase text-white/50 hover:text-white hover:border-white/30 transition">
              Филиалы
            </Link>
            <a href="https://wa.me/77474404076" target="_blank" rel="noopener noreferrer">
              <button
                className="px-5 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all hover:scale-[1.03]"
                style={{ background: "linear-gradient(135deg, hsl(220,70%,78%), hsl(40,80%,82%))", color: "#0a0a0f" }}
              >
                Забронировать
              </button>
            </a>
          </div>
        </motion.nav>

        {/* Hero content */}
        <div className="relative z-10 px-4 sm:px-8 pb-8 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            {/* Left */}
            <div>
              <BlurFade delay={0.4}>
                <div className="flex items-center gap-2 mb-4">
                  <ArrowRight className="w-3.5 h-3.5 text-[#c9a96e]" />
                  <span className="text-xs font-medium tracking-[0.25em] uppercase text-white/50">Сеть гостиниц Juldyz</span>
                </div>
              </BlurFade>
              <BlurFade delay={0.5}>
                <h1
                  style={{ fontSize: "clamp(2rem, 6vw, 5rem)", lineHeight: 0.9, letterSpacing: "-0.02em" }}
                  className="font-light"
                >
                  Чисто. Тихо.
                  <br />
                  В центре
                  <br />
                  <span className="font-[family-name:var(--font-heading)] italic text-white/80">
                    Алматы.
                  </span>
                </h1>
              </BlurFade>
            </div>

            {/* Right — stats ring */}
            <BlurFade delay={0.7}>
              <div className="flex items-center gap-5 md:pb-2">
                {/* Circular progress */}
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                    <motion.circle
                      cx="60" cy="60" r="54" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 54}
                      initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 54 * (1 - 0.86) }}
                      transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold">4.3</span>
                  </div>
                </div>
                <p className="text-sm text-white/40 max-w-[200px] leading-relaxed">
                  Средний рейтинг на 2ГИС.{" "}
                  {NETWORK_STATS.totalRatings.toLocaleString("ru-RU")}+ оценок по всей сети.
                </p>
              </div>
            </BlurFade>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative z-10">
          <div className="flex items-center justify-between px-4 sm:px-8 py-3 text-xs text-white/30">
            <span>Наши филиалы</span>
            <span className="hidden sm:inline">5 локаций по Казахстану</span>
          </div>
          <MarqueeStrip />
        </div>
      </section>

      {/* ═══ BRANCHES GRID ═══ */}
      <section className="py-24 md:py-36 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <BlurFade delay={0.1} inView>
                <div className="flex items-center gap-2 mb-4">
                  <ArrowRight className="w-3.5 h-3.5 text-[#c9a96e]" />
                  <span className="text-xs font-medium tracking-[0.25em] uppercase text-white/50">Наши гостиницы</span>
                </div>
              </BlurFade>
              <BlurFade delay={0.2} inView>
                <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }} className="font-light">
                  Выберите удобный
                  <br />
                  <span className="font-[family-name:var(--font-heading)] italic text-white/80">филиал</span>
                </h2>
              </BlurFade>
            </div>
            <BlurFade delay={0.3} inView>
              <p className="text-white/40 text-sm max-w-sm">
                {NETWORK_STATS.totalBranches} филиалов в Алматы и Жетысу области. Круглосуточно, без выходных. Номера от 5 000 ₸.
              </p>
            </BlurFade>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((b, i) => (
              <BranchCard key={b.slug} branch={b} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CHESS 1 — Чистота ═══ */}
      <ChessSection
        direction="image-left"
        tag="Наш подход"
        title="Чистота — не обещание,"
        titleAccent="а стандарт"
        description="Ежедневная уборка каждого номера, свежее бельё, профессиональные горничные. Мы не экономим на чистоте — это то, что гости отмечают чаще всего в своих отзывах на 2ГИС."
        stats={[
          { value: "97%", label: "Довольных гостей" },
          { value: "5★", label: "За чистоту" },
        ]}
        imageUrl="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2000&auto=format&fit=crop"
        ctaText="Забронировать"
        ctaHref="https://wa.me/77474404076"
      />

      {/* ═══ CHESS 2 — Расположение ═══ */}
      <ChessSection
        direction="image-right"
        tag="Расположение"
        title="В каждом районе Алматы —"
        titleAccent="ваш Juldyz рядом"
        description="Райымбека, Тастак, Аксай, Арлан — мы в ключевых точках города. Рядом с рынками, остановками и транспортными развязками. А филиал в Жаркенте — удобная остановка по дороге на Хоргос."
        stats={[
          { value: "5", label: "Филиалов" },
          { value: "2", label: "Города" },
        ]}
        imageUrl="https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=2000&auto=format&fit=crop"
        ctaText="Посмотреть на карте"
        ctaHref="#map"
      />

      {/* ═══ NUMBERS ═══ */}
      <NumbersSection />

      {/* ═══ REAL MAP ═══ */}
      <section id="map" className="py-24 md:py-36 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <BlurFade delay={0.1} inView inViewMargin="-80px">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <ArrowRight className="w-3.5 h-3.5 text-[#c9a96e]" />
                  <span className="text-xs font-medium tracking-[0.25em] uppercase text-white/50">Расположение</span>
                </div>
                <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }} className="font-light">
                  Найдите ближайший
                  <br />
                  <span className="font-[family-name:var(--font-heading)] italic text-white/80">Juldyz на карте</span>
                </h2>
              </div>
              <p className="text-white/40 text-sm max-w-sm">
                Наведите на точку, чтобы увидеть детали филиала — рейтинг, цены, удобства и контакты.
              </p>
            </div>
          </BlurFade>
          <BlurFade delay={0.2} inView inViewMargin="-50px">
            <RealMap />
          </BlurFade>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-24 md:py-36 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <BlurFade delay={0.1} inView>
            <div className="flex items-center gap-2 mb-4">
              <ArrowRight className="w-3.5 h-3.5 text-[#c9a96e]" />
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-white/50">Отзывы</span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }} className="font-light mb-14">
              Нам доверяют гости
              <br />
              <span className="font-[family-name:var(--font-heading)] italic text-white/80">со всего Казахстана</span>
            </h2>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Асхат М.", title: "Командировочный, Астана", text: "Будем только к вам приезжать с Астаны, теперь мы ваши постоянники! Чисто, уютно, персонал на высоте." },
              { name: "Нұрлан Қ.", title: "Постоянный гость", text: "Тап таза, тазалығы жоғары. Администратор Мереке — всегда с улыбкой, заботливая. Баға мен сапа сәйкес." },
              { name: "Елена В.", title: "Гость, Аксай", text: "Лучший филиал по удобствам. SPA на уровне. Уже дважды здесь побывали, надеемся ещё приехать. Рекомендуем!" },
            ].map((t, i) => (
              <BlurFade key={i} delay={0.15 + i * 0.12} inView>
                <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 md:p-10 flex flex-col justify-between h-full">
                  {/* Decorative quote */}
                  <span className="absolute top-6 right-8 text-white/[0.04] text-7xl font-[family-name:var(--font-heading)] select-none">"</span>
                  <p className="text-white/60 text-[15px] leading-relaxed mb-8 relative z-10">
                    «{t.text}»
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-[#0a0a0f]"
                      style={{ background: "linear-gradient(135deg, hsl(220,70%,78%), hsl(40,80%,82%))" }}
                    >
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-white/40">{t.title}</p>
                    </div>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-24 md:py-36 px-4 overflow-hidden">
        {/* BG image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#050508]/80 to-[#050508]" />
        </div>
        {/* Orbs */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[hsl(220,70%,78%)]/[0.04] blur-[120px]" />
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[hsl(40,80%,82%)]/[0.04] blur-[100px]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <BlurFade delay={0.1} inView>
            <span className="inline-flex items-center px-5 py-1.5 border border-white/20 rounded-full text-[10px] tracking-[0.25em] uppercase text-white/60 mb-8">
              Забронировать
            </span>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.04em", lineHeight: 1.05 }} className="font-light mb-6">
              Готовы забронировать
              <br />
              <span className="font-[family-name:var(--font-heading)] italic text-white/80">номер в Juldyz?</span>
            </h2>
          </BlurFade>
          <BlurFade delay={0.3} inView>
            <p className="text-white/40 text-base max-w-xl mx-auto mb-10">
              Напишите в WhatsApp или позвоните — мы подтвердим бронь за 5 минут. Круглосуточно, без предоплаты.
            </p>
          </BlurFade>
          <BlurFade delay={0.4} inView>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://wa.me/77474404076" target="_blank" rel="noopener noreferrer">
                <button
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold cursor-pointer transition-all hover:scale-[1.03]"
                  style={{ background: "linear-gradient(135deg, hsl(220,70%,78%), hsl(40,80%,82%))", color: "#0a0a0f" }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Забронировать в WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </button>
              </a>
              <a href="tel:+77474404076">
                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#0a0a0f] text-base font-semibold cursor-pointer hover:bg-white/90 transition">
                  <Phone className="w-5 h-5" />
                  Позвонить
                </button>
              </a>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="px-4 sm:px-8 pt-8 pb-6 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-2xl font-bold font-[family-name:var(--font-heading)] tracking-wider text-white/60">JULDYZ</span>
          <div className="flex flex-wrap items-center gap-6">
            {["Главная", "Райымбека", "Тастак", "Аксай", "Арлан", "Жаркент"].map((l, i) => (
              <Link
                key={l}
                href={i === 0 ? "/" : `/${branches[i - 1]?.slug || ""}`}
                className="text-white/30 text-xs tracking-[0.15em] uppercase hover:text-white/60 transition-colors"
              >
                {l}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4 text-white/20 text-xs">
            <a href="https://instagram.com/juldyz_apart" target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a96e] transition">@juldyz_apart</a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

      <FloatingCTA />
    </div>
  );
}
