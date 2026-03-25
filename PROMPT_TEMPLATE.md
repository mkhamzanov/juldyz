# 🏨 ПОЛНЫЙ ПРОМПТ: Создание premium landing page для локального бизнеса

> Этот промпт — пошаговая инструкция для AI (Claude, ChatGPT) по созданию стильного, анимированного, mobile-first сайта для любого локального бизнеса (гостиница, кафе, барбершоп, автомойка и т.д.)
> Проверено на реальном проекте: сеть гостиниц Juldyz (5 филиалов, Алматы)

---

## 📦 СТЕК

```
React 18+ / Next.js 14+ (App Router)
TypeScript
Tailwind CSS v4
Framer Motion (анимации)
Shadcn/ui (базовые компоненты)
Lucide React (иконки)
```

### Установка с нуля:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --use-npm
npx shadcn@latest init -d
npx shadcn@latest add card badge avatar button
npm install framer-motion lucide-react
```

---

## 🎨 ДИЗАЙН-СИСТЕМА

### Цветовая схема (тёмная тема)
```css
:root {
  --background: #050508;        /* Почти чёрный — основной фон */
  --foreground: #ffffff;         /* Белый текст */
  --card: #0c0c14;              /* Фон карточек */
  --muted: rgba(255,255,255,0.04); /* Подложки */
  --border: rgba(255,255,255,0.06); /* Границы */
  --accent: #c9a96e;            /* Золотой акцент */
  --accent-light: #e8d5a8;      /* Светлое золото */
  --accent-dark: #9a7b4f;       /* Тёмное золото */
}
```

**Правило:** весь сайт на `#050508`, акценты только золотом. Белый текст с прозрачностью: заголовки `text-white`, обычный текст `text-white/50`, вспомогательный `text-white/30`, еле видный `text-white/15`.

### Signature gradient (для CTA кнопок и аватаров)
```css
background: linear-gradient(135deg, hsl(220,70%,78%), hsl(40,80%,82%));
/* steel blue → warm gold */
color: #0a0a0f; /* тёмный текст на градиенте */
```

### Шрифты (Google Fonts)
```
Основной (body): Inter — font-sans, weights 300-700
Заголовки (display): Playfair Display — font-heading, serif italic
```
В layout.tsx:
```tsx
import { Inter, Playfair_Display } from "next/font/google";
const inter = Inter({ variable: "--font-sans", subsets: ["latin", "cyrillic"] });
const playfair = Playfair_Display({ variable: "--font-heading", subsets: ["latin", "cyrillic"] });
```
В Tailwind: `font-[family-name:var(--font-heading)]` для заголовков.

### Типографика
```
Заголовки секций: font-light, clamp(2rem, 4vw, 3.5rem), tracking: -0.04em, line-height: 1.1
Акцентная строка: font-heading italic, text-white/80
Теги секций: Arrow icon + text-xs tracking-[0.25em] uppercase text-white/50
Pill badges: border border-white/20 rounded-full px-5 py-1.5 text-[10px] tracking-[0.25em] uppercase
```

**Паттерн заголовка:**
```tsx
<div className="flex items-center gap-2 mb-4">
  <ArrowRight className="w-3.5 h-3.5 text-[#c9a96e]" />
  <span className="text-xs font-medium tracking-[0.25em] uppercase text-white/50">
    Название секции
  </span>
</div>
<h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }} className="font-light">
  Первая строка обычная
  <br />
  <span className="font-[family-name:var(--font-heading)] italic text-white/80">
    вторая строка italic serif
  </span>
</h2>
```

### Карточки
```
rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm
hover: border-white/[0.15] bg-white/[0.05]
transition: duration-500
padding: p-8 md:p-10
```

---

## ✨ АНИМАЦИИ

### 1. BlurFade (viewport-triggered)
Компонент для viewport-triggered анимации с blur:
```tsx
// Обёртка для любого элемента — появляется при скролле
<BlurFade delay={0.2} inView inViewMargin="-50px">
  <YourComponent />
</BlurFade>
```
Эффект: элемент плавно появляется с blur(6px) → blur(0px), y: -6 → 0, opacity: 0 → 1.

### 2. Staggered animations
Для списков/гридов — каждый элемент с нарастающей задержкой:
```tsx
{items.map((item, i) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.12, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
  >
    {/* content */}
  </motion.div>
))}
```

### 3. SpotlightCard (mouse-tracking)
Карточка с spotlight-эффектом — золотой radial-gradient следует за курсором:
```tsx
<SpotlightCard className="rounded-2xl" spotlightColor="rgba(201,169,110,0.1)">
  {/* Контент карточки */}
</SpotlightCard>
```

### 4. BorderBeam (бегущий свет по границе)
Свет, который бежит по периметру карточки:
```tsx
<div className="relative rounded-2xl">
  <BorderBeam lightColor="#c9a96e" duration={6} lightWidth={150} />
  {/* Контент */}
</div>
```

### 5. FlickeringGrid (мерцающая сетка)
Canvas-based фоновая анимация — золотые точки мерцают:
```tsx
<FlickeringGrid
  className="absolute inset-0 opacity-20"
  squareSize={3} gridGap={10} maxOpacity={0.1}
  flickerChance={0.15} color="rgb(201,169,110)"
/>
```

### 6. Clip-path меню
Полноэкранное меню с круговым раскрытием:
```tsx
<motion.div
  initial={{ clipPath: "circle(0% at 40px 32px)" }}
  animate={{ clipPath: "circle(150% at 40px 32px)" }}
  exit={{ clipPath: "circle(0% at 40px 32px)" }}
  transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
  className="fixed inset-0 z-[100] bg-white text-black"
>
```

### 7. Marquee (бегущая строка)
```css
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
.animate-marquee { animation: marquee 20s linear infinite; }
```
Дублировать массив элементов (`[...items, ...items]`) для бесшовного цикла.

### 8. Animated counter (числа при скролле)
При попадании в viewport — числа плавно считают от 0 до значения:
```tsx
function AnimatedNumber({ value, suffix, duration = 1600 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    // Анимация от 0 до value за duration мс, 40 шагов
  }, [inView]);
  return <span ref={ref}>{display}{suffix}</span>;
}
```

### 9. Circular progress ring (SVG)
```tsx
<svg className="w-20 h-20 -rotate-90" viewBox="0 0 120 120">
  <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
  <motion.circle cx="60" cy="60" r="54" fill="none" stroke="white" strokeWidth="3"
    strokeDasharray={2 * Math.PI * 54}
    initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
    animate={{ strokeDashoffset: 2 * Math.PI * 54 * (1 - percentage) }}
    transition={{ duration: 1.5, ease: "easeOut" }}
  />
</svg>
```

### 10. Градиентные orbs (фоновые)
```tsx
<div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[hsl(220,70%,78%)]/[0.04] blur-[120px] pointer-events-none" />
<div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[hsl(40,80%,82%)]/[0.04] blur-[100px] pointer-events-none" />
```

---

## 📐 СЕКЦИИ САЙТА (порядок)

### 1. HERO (полный экран)
```
Структура: min-h-screen flex flex-col justify-between
Фон: FlickeringGrid + gradient orbs + top/bottom gradient fade
Навбар: hamburger-pill слева | логотип по центру | CTA справа
Контент: прижат к низу. Слева — заголовок + тег. Справа — circular progress ring + описание.
Под контентом: marquee-полоса с ключевыми словами бизнеса.
```

### 2. КАРТОЧКИ УСЛУГ / ФИЛИАЛОВ (grid 3 колонки)
```
Паттерн: tag + заголовок слева | описание справа (flex, items-end, justify-between)
Grid: grid-cols-1 md:grid-cols-3 gap-6
Карточки: SpotlightCard + BorderBeam + иконка + заголовок + описание + "Подробнее →"
```

### 3. CHESS-LAYOUT (фото + текст, чередуются)
```
Секция 1: фото слева — текст справа
Секция 2: текст слева — фото справа
Grid: grid-cols-1 md:grid-cols-2 gap-16, items-stretch
Текст: тег + заголовок + описание + stats row + gradient CTA
Фото: rounded-2xl, aspect-[4/3] на мобильном, full height на десктопе
Stats: 2-3 метрики в ряд (value text-3xl font-light + label text-xs uppercase)
```

### 4. NUMBERS / МЕТРИКИ (animated counters)
```
Фон: watermark текст (opacity 2%) — название компании огромным шрифтом
Pill badge: "В цифрах"
Grid: grid-cols-2 md:grid-cols-4, gap-px, bg-white/[0.06], rounded-2xl
Каждая ячейка: bg-background, p-8 md:p-12, text-center
Значение: clamp(2.5rem, 5vw, 4.5rem), animated counter
Подпись + подподпись
```

### 5. КАРТА (реальная + SVG overlay)
```
Фон: OSM iframe с dark-inverted фильтром ИЛИ Google Maps embed (dark style)
CSS filter для тёмной темы: filter: invert(0.92) hue-rotate(180deg) saturate(0.2) brightness(0.5)
SVG overlay: пины на реальных координатах, пульсирующие круги, connection lines
Tooltip при hover: всплывающая карточка с деталями
```

### 6. ОТЗЫВЫ (testimonials, 3 карточки)
```
Декоративная кавычка: absolute top-6 right-8, text-7xl, opacity 4%
Текст отзыва: text-white/60, 15px, leading-relaxed
Аватар: gradient circle (steel blue → gold), инициал внутри
Имя + должность/город
```

### 7. CTA (призыв к действию)
```
Фон: фото с overlay (opacity-20) + gradient от background сверху/снизу
Gradient orbs по углам
Pill badge + заголовок + описание
Две кнопки: gradient pill (основной) + solid white (вторичный)
```

### 8. FOOTER
```
border-t border-white/[0.06]
Лого слева | Навигация по центру (links uppercase tracking-wider) | Копирайт + соцсети справа
```

---

## 🗺️ ИНТЕРАКТИВНАЯ КАРТА

### Вариант 1: OSM + SVG overlay (без API ключа)
```tsx
// Фон — OSM embed с dark фильтром
<iframe
  src={`https://www.openstreetmap.org/export/embed.html?bbox=${minLng},${minLat},${maxLng},${maxLat}&layer=mapnik`}
  style={{ filter: "invert(0.92) hue-rotate(180deg) saturate(0.2) brightness(0.5)" }}
/>

// SVG overlay с пинами
<svg viewBox="0 0 900 550" className="absolute inset-0 w-full h-full z-10">
  {branches.map(b => {
    const pos = project(b.lat, b.lng, 900, 550);
    return (
      <g>
        {/* Пульсирующий круг */}
        <circle cx={pos.x} cy={pos.y} r="4" fill="#c9a96e" opacity="0.3">
          <animate attributeName="r" from="4" to="20" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* Основная точка */}
        <circle cx={pos.x} cy={pos.y} r="6" fill="#c9a96e" />
      </g>
    );
  })}
</svg>
```

### Вариант 2: Google Maps embed
```tsx
<iframe src={`https://www.google.com/maps/embed?pb=...`}
  style={{ filter: "invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.6)" }}
/>
```

### Проекция координат в SVG:
```tsx
function project(lat, lng, width, height) {
  const x = ((lng - minLng) / (maxLng - minLng)) * width;
  const latRad = (lat * Math.PI) / 180;
  // Mercator projection
  const y = /* ... */ height;
  return { x, y };
}
```

---

## 📱 MOBILE-FIRST ПРАВИЛА

1. Все `font-size` через `clamp()` — минимум для мобилки, максимум для десктопа
2. Grid: `grid-cols-1` на мобилке → `md:grid-cols-2` или `md:grid-cols-3`
3. Padding: `px-4` на мобилке → `sm:px-6 md:px-10`
4. Spacing: `py-16` на мобилке → `md:py-28` или `md:py-36`
5. Навбар: прячь правые кнопки (`hidden md:flex`), показывай бургер
6. Hero контент: `flex-col` на мобилке → `md:flex-row md:items-end` на десктопе
7. Тач-target: кнопки не менее `py-3 px-6` (48px минимум)
8. Floating WhatsApp button: `fixed bottom-6 right-6 w-14 h-14` — всегда видна

---

## 🔗 КОНВЕРСИЯ (WhatsApp как основной канал)

### WhatsApp URL с предзаполненным текстом:
```
https://wa.me/77474404076?text=Здравствуйте!%20Хочу%20забронировать%20номер
```
URL-encode кириллицу! Добавляй название филиала в текст.

### Где размещать CTA:
1. Hero — главная кнопка «Забронировать»
2. Каждая карточка номера — «Забронировать» с названием номера в тексте
3. Floating button — всегда видна (с pulse animation)
4. CTA секция внизу — перед футером
5. Контакты — WhatsApp + Позвонить

### Floating WhatsApp:
```tsx
<a href={whatsappUrl} className="fixed bottom-6 right-6 z-50">
  <div className="relative">
    <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping" />
    <div className="relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
      <MessageCircle className="w-6 h-6 text-white" />
    </div>
  </div>
</a>
```

---

## 📊 ЗАКРЫТИЕ ВОЗРАЖЕНИЙ (для сервисного бизнеса)

Читай негативные отзывы на 2ГИС/Google → превращай в секцию «Наши стандарты»:
```
Жалоба: "плохая звукоизоляция" → "Номера с улучшенной звукоизоляцией"
Жалоба: "нет мыла/тапочек" → Секция "Что включено в номер" с полным списком
Жалоба: "цены не совпадают" → Актуальные цены на сайте + "подтвердим в WhatsApp"
Жалоба: "грубый персонал" → "Наш персонал — лицо компании. Стандарты сервиса."
```

---

## 🚀 ДЕПЛОЙ

### Vercel (бесплатно):
```bash
npm i -g vercel
vercel --prod
```

### Или через GitHub:
1. Push в GitHub
2. Подключи репо в vercel.com
3. Автодеплой при каждом push

---

## 📋 ЧЕКЛИСТ ПЕРЕД ЗАПУСКОМ

- [ ] Все телефоны правильные (проверить каждый)
- [ ] WhatsApp ссылки работают (открыть, проверить текст)
- [ ] Цены актуальные
- [ ] Отзывы реальные (с 2ГИС)
- [ ] Карта показывает правильные локации
- [ ] Instagram ссылки рабочие
- [ ] Mobile: всё читаемо, кнопки нажимаемые
- [ ] Lighthouse: Performance > 90
- [ ] SEO: title, description, OG-tags заполнены
- [ ] Favicon добавлен

---

## 💡 КАК АДАПТИРОВАТЬ ПОД ДРУГОЙ БИЗНЕС

### Барбершоп:
- Accent color: `#c9a96e` → `#8B5CF6` (фиолетовый) или `#EF4444` (красный)
- Chess-layout: фото стрижек + текст о мастерах
- Numbers: "5000+ стрижек · 4.8 рейтинг · 12 мастеров · 3 года"
- CTA: "Записаться" вместо "Забронировать"

### Кафе/ресторан:
- Chess-layout: фото блюд + описание кухни
- Marquee: названия блюд
- Numbers: "200+ блюд · 4.6 рейтинг · 3 зала · Live музыка"

### Автомойка:
- Chess-layout: фото до/после
- Numbers: "10000+ авто · 15 мин · 4.5 рейтинг · 24/7"
- Карточки: тарифы (Экспресс / Стандарт / Премиум)

**Формула:** Собери данные из 2ГИС (рейтинг, отзывы, адрес, телефон) → подставь в шаблон → адаптируй цвета и тексты → деплой.
