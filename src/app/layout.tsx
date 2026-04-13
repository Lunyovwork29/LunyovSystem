import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ContentProvider } from "@/context/ContentContext";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
});

const displayFont = Manrope({
  variable: "--font-display",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["500", "600", "700", "800"],
});

const ICON_CACHE = "9";

export const metadata: Metadata = {
  title: {
    default: "LN Systems",
    template: "%s | LN Systems",
  },
  description:
    "Системные отделы продаж, внедрение CRM (amo, Kommo, Bitrix), контроль и рост выручки без хаоса.",
  icons: {
    icon: [
      { url: `/favicon.png?v=${ICON_CACHE}`, type: "image/png", sizes: "32x32" },
    ],
    apple: [
      {
        url: `/apple-touch-icon.png?v=${ICON_CACHE}`,
        type: "image/png",
        sizes: "180x180",
      },
    ],
    shortcut: `/favicon.png?v=${ICON_CACHE}`,
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
