"use client";

import { motion } from "framer-motion";
import { Phone, Bed, Users, Check, Crown } from "lucide-react";

const WHATSAPP_BASE =
  "https://wa.me/77474404076?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%20";

const rooms = [
  {
    name: "Стандарт",
    desc: "Уютный номер для одного или двоих",
    price: "5 000",
    beds: "1 двуспальная",
    guests: "1–2",
    features: ["Wi-Fi", "Душ", "ТВ", "Кондиционер"],
    popular: false,
  },
  {
    name: "Комфорт",
    desc: "Просторный номер с улучшенной отделкой",
    price: "8 000",
    beds: "1 двуспальная",
    guests: "1–2",
    features: ["Wi-Fi", "Душ", "ТВ", "Кондиционер", "Мини-бар", "Халат"],
    popular: true,
  },
  {
    name: "Люкс",
    desc: "Максимум комфорта и пространства",
    price: "12 000",
    beds: "1 king-size",
    guests: "1–3",
    features: ["Wi-Fi", "Ванна", "ТВ", "Кондиционер", "Мини-бар", "Халат", "Вид"],
    popular: false,
  },
];

export default function Rooms() {
  return (
    <section
      id="rooms"
      className="w-full py-24 sm:py-32 px-4 relative overflow-hidden bg-[#050508]"
    >
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
            Размещение
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Номера и цены
          </h2>
          <p className="text-white/30 max-w-md mx-auto">
            Все номера после ремонта, с чистым бельём и всем необходимым
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rooms.map((room, i) => (
            <motion.div
              key={room.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative group"
            >
              {/* Animated gradient border for popular */}
              {room.popular && (
                <motion.div
                  className="absolute -inset-px rounded-3xl z-0"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #c9a96e, #f5e6c8, #c9a96e, #e8d5a8, #c9a96e)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              )}

              <div
                className={`relative h-full flex flex-col rounded-3xl p-8 z-10 transition-all duration-500 ${
                  room.popular
                    ? "bg-[#0c0c14]"
                    : "bg-[#0c0c12] border border-white/[0.06] hover:border-white/[0.12]"
                }`}
              >
                {room.popular && (
                  <div className="flex items-center gap-1.5 text-[#c9a96e] text-xs font-semibold tracking-wider uppercase mb-6">
                    <Crown className="w-3.5 h-3.5" />
                    Популярный
                  </div>
                )}

                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white mb-1">
                  {room.name}
                </h3>
                <p className="text-white/30 text-sm mb-6">{room.desc}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-white/30 text-sm">от</span>
                    <span className="text-5xl font-bold text-white tracking-tight">
                      {room.price}
                    </span>
                    <span className="text-white/30 text-sm">₸ / сутки</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm mb-6 pb-6 border-b border-white/[0.06] text-white/40">
                  <span className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4" /> {room.beds}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" /> {room.guests}
                  </span>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {room.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-white/40">
                      <Check
                        className={`w-4 h-4 shrink-0 ${
                          room.popular ? "text-[#c9a96e]" : "text-green-500/70"
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={`${WHATSAPP_BASE}${encodeURIComponent(room.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-2 ${
                      room.popular
                        ? "bg-gradient-to-r from-[#c9a96e] to-[#e8d5a8] text-[#0a0a0f] hover:opacity-90"
                        : "bg-white/[0.06] text-white hover:bg-white/[0.1] border border-white/[0.06]"
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    Забронировать
                  </motion.button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-white/20 mt-10 tracking-wide">
          Точные цены уточняйте при бронировании · Есть почасовая оплата
        </p>
      </div>
    </section>
  );
}
