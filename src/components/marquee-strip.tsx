"use client";

const items = [
  "пр. Райымбека",
  "★ 4.2",
  "Тастак",
  "★ 4.2",
  "Аксай-3Б",
  "★ 4.2",
  "Арлан",
  "★ 4.6",
  "Жаркент",
  "★ 4.4",
  "SPA",
  "Сауна",
  "Кафе",
  "Завтрак",
  "Wi-Fi",
  "24/7",
];

export default function MarqueeStrip() {
  const doubled = [...items, ...items];
  return (
    <div className="w-full border-t border-b border-white/[0.06] py-5 overflow-hidden">
      <div className="flex animate-marquee gap-16 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-white/30 text-lg font-medium tracking-wide shrink-0"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
