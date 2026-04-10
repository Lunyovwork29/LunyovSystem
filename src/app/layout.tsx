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

/* Иконка вкладки: `src/app/icon.png` и `apple-icon.png` (копия логотипа) — Next подставляет сам */

export const metadata: Metadata = {
  title: {
    default: "LN — Lunyov System",
    template: "%s | Lunyov System",
  },
  description:
    "Системные отделы продаж, внедрение CRM (amo, Kommo, Bitrix), контроль и рост выручки без хаоса.",
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
