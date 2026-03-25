"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { branches } from "@/lib/branches";

const menuLinks = [
  { href: "/", label: "Главная" },
  ...branches.map((b) => ({ href: `/${b.slug}`, label: b.shortName })),
];

export default function ClipMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ clipPath: "circle(0% at 40px 32px)" }}
          animate={{ clipPath: "circle(150% at 40px 32px)" }}
          exit={{ clipPath: "circle(0% at 40px 32px)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-white text-[#0a0a0f] overflow-auto"
        >
          {/* Close button */}
          <div className="px-6 py-6">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#0a0a0f]/20 rounded-full text-sm font-medium cursor-pointer hover:bg-[#0a0a0f]/5 transition"
            >
              <X className="w-4 h-4" />
              Закрыть
            </button>
          </div>

          {/* Links */}
          <div className="px-6 mt-4">
            {menuLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-center justify-between border-b border-[#0a0a0f]/10 py-5 md:py-6"
                >
                  <span
                    className="font-light transition-transform duration-300 group-hover:translate-x-4"
                    style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)" }}
                  >
                    {link.label}
                  </span>
                  <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-50 transition-all duration-300 group-hover:translate-x-2" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="px-6 py-8 mt-8 flex items-center justify-between text-sm text-[#0a0a0f]/40"
          >
            <span className="font-[family-name:var(--font-heading)] font-bold text-lg text-[#0a0a0f]/60">
              Juldyz
            </span>
            <span>© {new Date().getFullYear()} Сеть гостиниц</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
