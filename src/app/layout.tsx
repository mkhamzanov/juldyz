import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Гостиница Juldyz — Алматы | Чисто. Тихо. В центре.",
  description:
    "Гостиница Juldyz в Алматы. Проспект Райымбека, 237в. Чистые номера, тихое расположение, вежливый персонал. Круглосуточно. Забронируйте через WhatsApp.",
  keywords:
    "гостиница алматы, отель алматы, juldyz, жулдыз, дешевая гостиница алматы",
  openGraph: {
    title: "Гостиница Juldyz — Алматы",
    description: "Чисто. Тихо. В центре Алматы. Бронируйте через WhatsApp.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${playfair.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
