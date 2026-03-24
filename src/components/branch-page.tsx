"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Phone,
  Clock,
  ChevronLeft,
  MessageCircle,
  Check,
  Wifi,
  ShowerHead,
  Wind,
  Tv,
  BedDouble,
  Droplets,
  Bath,
  Footprints,
  Bed,
  Users,
  Crown,
  ShieldCheck,
  CreditCard,
  Camera,
  Volume2,
  BadgeCheck,
  Banknote,
  Heart,
} from "lucide-react";
import type { Branch } from "@/lib/branches";
import { PAYMENT_METHODS, OBJECTION_CLOSERS, INCLUDED_IN_ROOM } from "@/lib/branches";

/* ── Amenities icons ── */
const amenityIcons = [
  { icon: Wifi, label: "Бесплатный Wi-Fi" },
  { icon: BedDouble, label: "Чистое бельё" },
  { icon: Droplets, label: "Полотенца" },
  { icon: Bath, label: "Мыло и шампунь" },
  { icon: ShowerHead, label: "Горячая вода 24/7" },
  { icon: Wind, label: "Кондиционер" },
  { icon: Tv, label: "Телевизор" },
  { icon: Footprints, label: "Тапочки" },
];

/* ── Rooms data ── */
function getRooms(priceFrom: number) {
  return [
    {
      name: "Стандарт",
      desc: "Уютный номер для одного или двоих",
      price: priceFrom,
      beds: "1 двуспальная",
      guests: "1–2",
      features: ["Wi-Fi", "Душ", "ТВ", "Кондиционер"],
      popular: false,
    },
    {
      name: "Комфорт",
      desc: "Просторный номер с улучшенной отделкой",
      price: Math.round(priceFrom * 1.4),
      beds: "1 двуспальная",
      guests: "1–2",
      features: ["Wi-Fi", "Душ", "ТВ", "Кондиционер", "Мини-бар"],
      popular: true,
    },
    {
      name: "Люкс",
      desc: "Максимум комфорта",
      price: Math.round(priceFrom * 2),
      beds: "1 king-size",
      guests: "1–3",
      features: ["Wi-Fi", "Ванна", "ТВ", "Кондиционер", "Мини-бар", "Халат"],
      popular: false,
    },
  ];
}

/* ── Stars ── */
function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          style={{ width: size, height: size }}
          className={
            s <= Math.round(rating)
              ? "fill-[#c9a96e] text-[#c9a96e]"
              : "fill-white/10 text-white/10"
          }
        />
      ))}
    </div>
  );
}

/* ── Scrolling review column ── */
function ScrollColumn({ reviews, duration = 18 }: { reviews: Branch["reviews"]; duration?: number }) {
  const doubled = [...reviews, ...reviews];
  return (
    <div className="overflow-hidden w-full max-w-[360px]">
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-4 pb-4"
      >
        {doubled.map((r, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#c9a96e]/20 transition-colors">
            <Stars rating={r.rating} size={13} />
            <p className="text-white/50 text-sm leading-relaxed mt-3 mb-3">«{r.text}»</p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#9a7b4f] flex items-center justify-center text-white text-[10px] font-bold">
                {r.name[0]}
              </div>
              <div>
                <p className="text-white/60 text-xs font-medium">{r.name}</p>
                <p className="text-white/20 text-[10px]">2ГИС</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Objection icons ── */
const objectionIcons = [Volume2, Banknote, ShieldCheck, Heart];

/* ═══════════════════════════════════════ */
export default function BranchPage({ branch }: { branch: Branch }) {
  const rooms = getRooms(branch.priceFrom);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050508]/80 backdrop-blur-2xl border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
            <ChevronLeft className="w-4 h-4" /> Все филиалы
          </Link>
          <span className="font-[family-name:var(--font-heading)] font-bold text-white/80">Juldyz</span>
          <a href={`tel:${branch.phone}`}>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.06] text-white/50 text-xs font-medium hover:bg-white/[0.1] transition cursor-pointer">
              <Phone className="w-3 h-3" /> Позвонить
            </button>
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle, rgba(201,169,110,0.4) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#c9a96e]/[0.04] blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Rating + Stars badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] mb-8">
            <Stars rating={branch.rating} size={14} />
            <span className="text-sm font-semibold text-[#c9a96e]">{branch.rating}</span>
            <span className="w-px h-4 bg-white/10" />
            <span className="text-sm text-white/40">{branch.ratingCount} оценок · 2ГИС</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4">
            <span className="text-white">Juldyz</span>
            <br />
            <span style={{ background: "linear-gradient(135deg, #e8d5a8, #c9a96e, #e8d5a8)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s ease-in-out infinite" }}>
              {branch.shortName}
            </span>
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-white/35 text-sm mb-4">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {branch.address}, {branch.city}</span>
            <span className="w-1 h-1 rounded-full bg-white/15" />
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Круглосуточно</span>
            <span className="w-1 h-1 rounded-full bg-white/15" />
            <span>★★★</span>
          </motion.div>

          {/* Instagram */}
          {branch.instagram && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mb-8">
              <a
                href={`https://instagram.com/${branch.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white/25 text-sm hover:text-[#c9a96e] transition-colors"
              >
                <Camera className="w-3.5 h-3.5" /> {branch.instagram}
              </a>
            </motion.div>
          )}

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={branch.whatsappUrl} target="_blank" rel="noopener noreferrer">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="relative group px-8 py-4 bg-green-500 text-white font-semibold text-base rounded-full cursor-pointer overflow-hidden">
                <div className="absolute inset-0 rounded-full bg-green-400/20 blur-xl group-hover:bg-green-400/40 transition-all duration-500" />
                <span className="relative z-10 inline-flex items-center gap-2"><MessageCircle className="w-5 h-5" /> Забронировать</span>
              </motion.button>
            </a>
            <a href={`tel:${branch.phone}`}>
              <button className="px-6 py-3.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/50 font-medium text-sm hover:bg-white/[0.08] transition cursor-pointer">
                {branch.phoneDisplay}
              </button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Amenities badges ── */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-2">
          {branch.amenities.map((a) => (
            <span key={a} className="px-4 py-2 rounded-full bg-[#c9a96e]/[0.07] border border-[#c9a96e]/15 text-[#c9a96e]/80 text-sm font-medium">{a}</span>
          ))}
        </div>
      </section>

      <div className="max-w-2xl mx-auto h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* ── Rooms & Prices ── */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-[#c9a96e] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Размещение</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-5xl font-bold mb-3">Номера и цены</h2>
            <p className="text-white/25 text-sm max-w-md mx-auto">Цены актуальные. Окончательную стоимость подтвердим в WhatsApp до заселения.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {rooms.map((room, i) => (
              <motion.div key={room.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative group">
                {room.popular && (
                  <motion.div className="absolute -inset-px rounded-2xl z-0" style={{ background: "conic-gradient(from 0deg, #c9a96e, #f5e6c8, #c9a96e, #e8d5a8, #c9a96e)" }} animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
                )}
                <div className={`relative h-full flex flex-col rounded-2xl p-7 z-10 ${room.popular ? "bg-[#0c0c14]" : "bg-white/[0.02] border border-white/[0.06]"}`}>
                  {room.popular && (
                    <div className="flex items-center gap-1.5 text-[#c9a96e] text-[10px] font-semibold tracking-wider uppercase mb-5"><Crown className="w-3 h-3" /> Популярный</div>
                  )}
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold mb-1">{room.name}</h3>
                  <p className="text-white/30 text-sm mb-5">{room.desc}</p>
                  <div className="mb-5">
                    <span className="text-white/30 text-xs">от </span>
                    <span className="text-4xl font-bold">{room.price.toLocaleString("ru-RU")}</span>
                    <span className="text-white/30 text-xs"> ₸/сутки</span>
                  </div>
                  <div className="flex gap-4 text-sm text-white/30 mb-5 pb-5 border-b border-white/[0.06]">
                    <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{room.beds}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{room.guests}</span>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {room.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/40">
                        <Check className={`w-3.5 h-3.5 ${room.popular ? "text-[#c9a96e]" : "text-green-500/60"}`} />{f}
                      </li>
                    ))}
                  </ul>
                  <a href={`${branch.whatsappUrl}%20${encodeURIComponent(room.name)}`} target="_blank" rel="noopener noreferrer">
                    <button className={`w-full py-3 rounded-full text-sm font-semibold cursor-pointer inline-flex items-center justify-center gap-2 transition-all ${room.popular ? "bg-gradient-to-r from-[#c9a96e] to-[#e8d5a8] text-[#0a0a0f]" : "bg-white/[0.06] text-white/70 border border-white/[0.06] hover:bg-white/[0.1]"}`}>
                      <Phone className="w-3.5 h-3.5" /> Забронировать
                    </button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Payment info */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <CreditCard className="w-4 h-4 text-white/20" />
            <span className="text-white/20 text-xs">Оплата:</span>
            {PAYMENT_METHODS.map((m) => (
              <span key={m} className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/30 text-xs">{m}</span>
            ))}
          </motion.div>
          <p className="text-center text-[10px] text-white/15 mt-4 max-w-md mx-auto">
            Номера на час доступны на всех филиалах. Точные цены уточняйте при бронировании.
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* ── What's included ── */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-[#c9a96e] text-xs font-semibold tracking-[0.2em] uppercase mb-3">В каждом номере</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-5xl font-bold mb-3">Что включено</h2>
            <p className="text-white/30 max-w-md mx-auto text-sm">Всё необходимое уже в номере — ничего не нужно просить на ресепшн</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {amenityIcons.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="flex flex-col items-center text-center gap-2.5 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#c9a96e]/20 transition-all">
                  <div className="w-9 h-9 rounded-xl bg-[#c9a96e]/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#c9a96e]" />
                  </div>
                  <span className="text-xs font-medium text-white/50">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-2xl mx-auto h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* ── Closing objections / Guarantees ── */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-[#c9a96e] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Гарантии</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-5xl font-bold mb-3">Наши стандарты</h2>
            <p className="text-white/25 max-w-md mx-auto text-sm">Мы знаем, что важно гостям, и работаем над этим каждый день</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OBJECTION_CLOSERS.map((item, i) => {
              const Icon = objectionIcons[i] || ShieldCheck;
              return (
                <motion.div
                  key={item.concern}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#c9a96e]/15 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#c9a96e]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white/80 mb-1.5">{item.concern}</h4>
                      <p className="text-sm text-white/35 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-2xl mx-auto h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* ── Reviews ── */}
      {branch.reviews.length > 0 && (
        <section className="py-20 sm:py-28 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <p className="text-[#c9a96e] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Отзывы</p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-5xl font-bold mb-4">Что говорят гости</h2>
              <div className="flex items-center justify-center gap-2">
                <Stars rating={branch.rating} size={18} />
                <span className="text-2xl font-bold">{branch.rating}</span>
                <span className="text-white/30">/ 5</span>
              </div>
              <p className="text-white/20 text-sm mt-1">{branch.ratingCount} оценок на 2ГИС</p>
            </motion.div>

            <div
              className="flex justify-center gap-4 max-h-[450px] overflow-hidden"
              style={{
                maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
              }}
            >
              <ScrollColumn reviews={branch.reviews} duration={16} />
              {branch.reviews.length > 3 && (
                <ScrollColumn reviews={[...branch.reviews].reverse()} duration={22} />
              )}
            </div>

            <div className="text-center mt-10">
              <a href={branch.twoGisUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#c9a96e]/60 hover:text-[#c9a96e] transition-colors">
                Все отзывы на 2ГИС →
              </a>
            </div>
          </div>
        </section>
      )}

      <div className="max-w-2xl mx-auto h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* ── Map & Contacts ── */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-[#c9a96e] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Расположение</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-5xl font-bold">Как добраться</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-5">
              {[
                { icon: MapPin, label: "Адрес", value: `${branch.address}, ${branch.city}` },
                { icon: Phone, label: "Телефон", value: branch.phoneDisplay },
                { icon: Clock, label: "Режим", value: "Круглосуточно, без выходных" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[#c9a96e]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.15em] font-semibold mb-0.5">{item.label}</p>
                    <p className="text-white/60 text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}

              {/* Instagram */}
              {branch.instagram && (
                <a href={`https://instagram.com/${branch.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/10 flex items-center justify-center shrink-0 group-hover:bg-[#c9a96e]/20 transition-colors">
                    <Camera className="w-5 h-5 text-[#c9a96e]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.15em] font-semibold mb-0.5">Instagram</p>
                    <p className="text-white/60 text-sm font-medium group-hover:text-[#c9a96e] transition-colors">{branch.instagram}</p>
                  </div>
                </a>
              )}

              <div className="flex flex-col gap-3 pt-4">
                <a href={branch.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <button className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-400 text-white rounded-full text-sm font-semibold transition cursor-pointer shadow-lg shadow-green-500/20">
                    <MessageCircle className="w-4 h-4" /> Написать в WhatsApp
                  </button>
                </a>
                <a href={`tel:${branch.phone}`}>
                  <button className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/[0.04] border border-white/[0.08] text-white/50 rounded-full text-sm font-semibold hover:bg-white/[0.08] transition cursor-pointer">
                    <Phone className="w-4 h-4" /> {branch.phoneDisplay}
                  </button>
                </a>
                <a href={branch.twoGisUrl} target="_blank" rel="noopener noreferrer">
                  <button className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/[0.02] border border-white/[0.05] text-white/30 rounded-full text-sm hover:bg-white/[0.05] transition cursor-pointer">
                    Открыть в 2ГИС
                  </button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-white/[0.06] h-[300px] lg:h-[420px]">
              <iframe
                src={branch.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.6)" }}
                allowFullScreen
                loading="lazy"
                title={`${branch.name} на карте`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-4 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/20">
          <Link href="/" className="font-[family-name:var(--font-heading)] font-semibold text-white/30 hover:text-white/50 transition">
            ← Все филиалы Juldyz
          </Link>
          <span>© {new Date().getFullYear()} · Сеть гостиниц Juldyz</span>
          <a href={`tel:${branch.phone}`} className="hover:text-[#c9a96e] transition-colors">{branch.phoneDisplay}</a>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href={branch.whatsappUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 group">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping" />
          <div className="relative w-14 h-14 bg-green-500 hover:bg-green-400 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all group-hover:scale-110">
            <MessageCircle className="w-6 h-6" />
          </div>
        </div>
      </a>
    </div>
  );
}
