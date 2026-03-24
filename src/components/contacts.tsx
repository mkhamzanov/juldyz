"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/77474404076?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20%D0%BD%D0%BE%D0%BC%D0%B5%D1%80";

const info = [
  {
    icon: MapPin,
    title: "Адрес",
    value: "г. Алматы, пр. Райымбека, 237в",
    href: "https://2gis.kz/almaty/firm/70000001077386532",
  },
  {
    icon: Phone,
    title: "Телефон",
    value: "+7 747 440-40-76",
    href: "tel:+77474404076",
  },
  {
    icon: Clock,
    title: "Режим работы",
    value: "Круглосуточно, без выходных",
    href: undefined,
  },
];

export default function Contacts() {
  return (
    <section
      id="contacts"
      className="w-full py-24 sm:py-32 px-4 bg-[#050508] relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#c9a96e] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Связаться
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            Контакты
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {info.map((item) => {
              const Tag = item.href ? "a" : "div";
              const tagProps = item.href
                ? {
                    href: item.href,
                    target: item.href.startsWith("http") ? "_blank" as const : undefined,
                    rel: item.href.startsWith("http") ? "noopener noreferrer" : undefined,
                  }
                : {};
              return (
                <Tag key={item.title} {...tagProps} className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-[#c9a96e]/10 flex items-center justify-center shrink-0 group-hover:bg-[#c9a96e]/20 transition-colors">
                    <item.icon className="w-5 h-5 text-[#c9a96e]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-white/20 uppercase tracking-[0.15em] mb-0.5">
                      {item.title}
                    </p>
                    <p className="font-medium text-white/70 group-hover:text-[#c9a96e] transition-colors">
                      {item.value}
                    </p>
                  </div>
                </Tag>
              );
            })}

            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green-500 hover:bg-green-400 text-white rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer shadow-lg shadow-green-500/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </motion.button>
              </a>
              <a href="tel:+77474404076">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/[0.04] border border-white/[0.08] text-white/70 rounded-full font-semibold text-sm hover:bg-white/[0.08] transition-all duration-300 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  Позвонить
                </motion.button>
              </a>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 rounded-2xl overflow-hidden border border-white/[0.06] h-[300px] lg:h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2907.1!2d76.9!3d43.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDE1JzAwLjAiTiA3NsKwNTQnMDAuMCJF!5e0!3m2!1sru!2skz!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.6)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Гостиница Juldyz на карте"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
