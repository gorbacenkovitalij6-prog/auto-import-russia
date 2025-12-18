import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "БТА ТОРГ — Пригон авто из Европы",
  description: "Профессиональный пригон автомобилей из Германии, Польши, Бельгии и Нидерландов. Подбор, проверка, доставка и растаможка без скрытых платежей. Работаем официально по договору.",
  keywords: "пригон авто из Европы, автомобили из Германии, растаможка авто, доставка авто из Европы, купить авто из Европы",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
