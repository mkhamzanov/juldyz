"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const links = [
  { href: "#rooms", label: "Номера" },
  { href: "#included", label: "Удобства" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050508]/80 backdrop-blur-2xl border-b border-white/[0.04]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-white/90"
        >
          Juldyz
        </a>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/30 hover:text-[#c9a96e] transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
          <a href="tel:+77474404076">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/[0.06] border border-white/[0.08] text-white/60 hover:bg-white/[0.1] hover:text-white transition-all duration-300 cursor-pointer">
              <Phone className="w-3.5 h-3.5" />
              Позвонить
            </button>
          </a>
        </div>

        {/* Mobile */}
        <button
          className="sm:hidden p-2 text-white/60"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-[#050508]/95 backdrop-blur-2xl border-b border-white/[0.04] overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block text-base font-medium text-white/50 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <a href="tel:+77474404076" className="block pt-2">
                <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/60 text-sm font-medium cursor-pointer">
                  <Phone className="w-4 h-4" />
                  +7 747 440-40-76
                </button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
