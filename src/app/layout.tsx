import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ContentProvider } from "@/context/ContentContext";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
});

const displayFont = Sora({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Никита Лунёв — Консалтинг по продажам",
  description: "Построение отделов продаж, CRM, автоматизация, контроль и рост выручки.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--bg)] text-[var(--text)]">
        <ContentProvider>
          <CartProvider>{children}</CartProvider>
        </ContentProvider>
      </body>
    </html>
  );
}