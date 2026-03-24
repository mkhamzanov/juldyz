export interface Branch {
  slug: string;
  name: string;
  shortName: string;
  address: string;
  area: string;
  city: string;
  phone: string;
  phoneDisplay: string;
  rating: number;
  reviewCount: number;
  ratingCount: number;
  priceFrom: number;
  rooms: number | null;
  stars: number;
  amenities: string[];
  coords: { lat: number; lng: number };
  mapEmbed: string;
  twoGisUrl: string;
  whatsappUrl: string;
  instagram: string | null;
  reviews: { name: string; text: string; rating: number }[];
}

export const branches: Branch[] = [
  {
    slug: "raiymbeka",
    name: "Juldyz · Проспект Райымбека",
    shortName: "пр. Райымбека",
    address: "проспект Райымбека, 237в",
    area: "Центр",
    city: "Алматы",
    phone: "+77474404076",
    phoneDisplay: "+7 747 440-40-76",
    rating: 4.2,
    reviewCount: 518,
    ratingCount: 974,
    priceFrom: 6000,
    rooms: null,
    stars: 3,
    amenities: ["SPA", "Сауна", "Кафе", "Wi-Fi", "Номер на час", "Круглосуточно"],
    coords: { lat: 43.264845, lng: 76.902075 },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2907.5!2d76.9!3d43.265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836ea06fcc4fa1%3A0x0!2zNDPCsDE1JzUzLjUiTiA3NsKwNTQnMDcuNSJF!5e0!3m2!1sru!2skz!4v1",
    twoGisUrl: "https://2gis.kz/almaty/firm/70000001077386532",
    whatsappUrl:
      "https://wa.me/77474404076?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%20(%D0%A0%D0%B0%D0%B9%D1%8B%D0%BC%D0%B1%D0%B5%D0%BA%D0%B0)",
    instagram: "@juldyz_hotel_",
    reviews: [
      { name: "Асхат М.", text: "Гостиница всегда чистая, всё новое! Ресепшн всегда вежливый!", rating: 5 },
      { name: "Динара К.", text: "Чисто, уютно, самое главное — тишина. Выспалась отлично.", rating: 5 },
      { name: "Ерлан С.", text: "Огромная благодарность персоналу — все приветливы, всегда готовы помочь.", rating: 5 },
      { name: "Айгуль Н.", text: "Номера уютные, особенно 4 этаж. Всё чисто, есть всё необходимое.", rating: 5 },
      { name: "Максат Б.", text: "Будем только к вам приезжать с Астаны, теперь мы ваши постоянники!", rating: 5 },
      { name: "Ольга Т.", text: "Цена = качество. Снял номер — всё понравилось, продлю ещё на неделю.", rating: 4 },
      { name: "Нұрлан Қ.", text: "Тап таза, тазалығы жоғары. Барлығы жақсы.", rating: 5 },
      { name: "Руслан А.", text: "Уже дважды здесь побывали, надеемся ещё приехать. Рекомендуем!", rating: 5 },
    ],
  },
  {
    slug: "tastak",
    name: "Juldyz · Рынок Тастак",
    shortName: "Тастак",
    address: "улица Прокофьева, 89а",
    area: "Тастак",
    city: "Алматы",
    phone: "+77474015447",
    phoneDisplay: "+7 747 401-54-47",
    rating: 4.2,
    reviewCount: 277,
    ratingCount: 628,
    priceFrom: 5000,
    rooms: 16,
    stars: 3,
    amenities: ["Wi-Fi", "Прачечная", "Номер на час", "16 номеров", "Круглосуточно"],
    coords: { lat: 43.249133, lng: 76.874266 },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.0!2d76.873!3d43.249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDE0JzU2LjkiTiA3NsKwNTInMjcuNCJF!5e0!3m2!1sru!2skz!4v1",
    twoGisUrl: "https://2gis.kz/almaty/firm/70000001076785498",
    whatsappUrl:
      "https://wa.me/77474015447?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20(%D0%A2%D0%B0%D1%81%D1%82%D0%B0%D0%BA)",
    instagram: "@juldyz_apart",
    reviews: [
      { name: "Нурлан О.", text: "Рядом с рынком Тастак — очень удобно. Чисто и уютно, есть прачечная.", rating: 5 },
      { name: "Марина П.", text: "Прачечная — огромный плюс. Номер чистый, персонал приветливый.", rating: 5 },
      { name: "Данияр К.", text: "За 5000 тенге — отличный вариант. Есть всё необходимое.", rating: 4 },
      { name: "Гульмира С.", text: "Останавливаюсь не первый раз, всегда довольна. Номера чистые как дома.", rating: 5 },
      { name: "Бақыт Ж.", text: "Персонал молодцы, горничные Назгуль и Ася — спасибо за порядок!", rating: 5 },
    ],
  },
  {
    slug: "aksay",
    name: "Juldyz · Аксай",
    shortName: "Аксай-3Б",
    address: "микрорайон Аксай-3Б, 11/3",
    area: "Аксай",
    city: "Алматы",
    phone: "+77056112890",
    phoneDisplay: "+7 705 611-28-90",
    rating: 4.2,
    reviewCount: 307,
    ratingCount: 638,
    priceFrom: 7000,
    rooms: null,
    stars: 3,
    amenities: ["Завтрак", "SPA", "Сауна", "Кафе", "Прачечная", "Широкий лифт", "Wi-Fi", "Номер на час", "Круглосуточно"],
    coords: { lat: 43.235857, lng: 76.824155 },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.5!2d76.823!3d43.236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDE0JzA5LjEiTiA3NsKwNDknMjcuMCJF!5e0!3m2!1sru!2skz!4v1",
    twoGisUrl: "https://2gis.kz/almaty/firm/70000001038627108",
    whatsappUrl:
      "https://wa.me/77056112890?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20(%D0%90%D0%BA%D1%81%D0%B0%D0%B9)",
    instagram: "@juldyz_apart",
    reviews: [
      { name: "Тимур Р.", text: "Завтрак включён — большой плюс. Номер чистый, сауна отличная.", rating: 5 },
      { name: "Елена В.", text: "Лучший филиал по удобствам. SPA на уровне. Вернёмся обязательно.", rating: 5 },
      { name: "Кайрат М.", text: "Приятный вежливый администратор. Широкий лифт удобен с чемоданами.", rating: 4 },
      { name: "Анна Л.", text: "Администратор Мереке — всегда с улыбкой, заботливая. Спасибо!", rating: 5 },
      { name: "Серік Б.", text: "Таза, жылы, барлығы бар. Баға мен сапа сәйкес.", rating: 5 },
    ],
  },
  {
    slug: "arlan",
    name: "Juldyz · Рынок Арлан",
    shortName: "Арлан",
    address: "Северное Кольцо шоссе, 34в/1",
    area: "Северное кольцо",
    city: "Алматы",
    phone: "+77476008073",
    phoneDisplay: "+7 747 600-80-73",
    rating: 4.6,
    reviewCount: 158,
    ratingCount: 348,
    priceFrom: 5000,
    rooms: 18,
    stars: 3,
    amenities: ["Wi-Fi", "Лифт", "18 номеров", "Номер на час", "Круглосуточно"],
    coords: { lat: 43.317655, lng: 76.898867 },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2904.5!2d76.897!3d43.318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDE5JzAzLjYiTiA3NsKwNTMnNTUuOSJF!5e0!3m2!1sru!2skz!4v1",
    twoGisUrl: "https://2gis.kz/almaty/firm/70000001090328981",
    whatsappUrl:
      "https://wa.me/77476008073?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20(%D0%90%D1%80%D0%BB%D0%B0%D0%BD)",
    instagram: "@juldyz_apart",
    reviews: [
      { name: "Берик Т.", text: "Самый высокий рейтинг не зря — чисто, тихо, персонал вежливый. Топ!", rating: 5 },
      { name: "Жанна А.", text: "Удобно рядом с рынком Арлан. Номера новые, всё работает исправно.", rating: 5 },
      { name: "Сергей В.", text: "Хороший вариант на ночь. Есть всё необходимое, цена адекватная.", rating: 4 },
      { name: "Алия М.", text: "Приятно удивлена качеством за 5000 тенге. Обязательно вернусь.", rating: 5 },
    ],
  },
  {
    slug: "zharkent",
    name: "Juldyz · Жаркент",
    shortName: "Жаркент",
    address: "улица Лутфуллина, 8а",
    area: "Центр",
    city: "Жаркент, Жетысу обл.",
    phone: "+77071104939",
    phoneDisplay: "+7 707 110-49-39",
    rating: 4.4,
    reviewCount: 0,
    ratingCount: 341,
    priceFrom: 5000,
    rooms: null,
    stars: 3,
    amenities: ["Wi-Fi", "Номер на час", "Круглосуточно"],
    coords: { lat: 44.167524, lng: 80.004726 },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2880.0!2d80.003!3d44.168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDEwJzAzLjEiTiA4MMKwMDAnMTcuMCJF!5e0!3m2!1sru!2skz!4v1",
    twoGisUrl: "https://2gis.kz/zharkent/firm/70000001090342253",
    whatsappUrl:
      "https://wa.me/77071104939?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20(%D0%96%D0%B0%D1%80%D0%BA%D0%B5%D0%BD%D1%82)",
    instagram: null,
    reviews: [
      { name: "Бауыржан К.", text: "Для Жаркента — отличный вариант. Чисто, есть Wi-Fi, горячая вода.", rating: 5 },
      { name: "Сауле М.", text: "Единственная нормальная гостиница в городе. Рекомендую всем.", rating: 4 },
      { name: "Азамат Т.", text: "Останавливался проездом на Хоргос, всё понравилось. Чисто и тепло.", rating: 5 },
    ],
  },
];

/* ── Shared data ── */

export const NETWORK_STATS = {
  totalBranches: 5,
  totalRatings: 2929,
  avgRating: 4.3,
  totalReviews: 1260,
  cities: ["Алматы", "Жаркент"],
  instagram: ["@juldyz_apart", "@juldyz_hotel_"],
};

export const PAYMENT_METHODS = [
  "Наличные",
  "Перевод с карты (Kaspi)",
  "Картой (зависит от филиала)",
];

export const DEPOSIT_INFO =
  "При заселении взимается возвратный залог. Залог возвращается полностью при выезде, если номер в порядке. Сумму залога уточняйте при бронировании.";

export const INCLUDED_IN_ROOM = [
  "Чистое постельное бельё",
  "Полотенца",
  "Мыло и шампунь",
  "Горячая вода 24/7",
  "Wi-Fi",
  "Кондиционер",
  "Телевизор",
  "Тапочки",
];

export const OBJECTION_CLOSERS = [
  {
    concern: "Звукоизоляция",
    answer: "Номера с улучшенной звукоизоляцией. При заселении можете выбрать этаж потише.",
  },
  {
    concern: "Актуальные цены",
    answer: "Цены на сайте — актуальные. Окончательную стоимость подтвердим в WhatsApp до заселения.",
  },
  {
    concern: "Залог",
    answer: DEPOSIT_INFO,
  },
  {
    concern: "Сервис",
    answer: "Наш персонал — лицо гостиницы. Мы следим за стандартами обслуживания и обучаем каждого сотрудника.",
  },
];
