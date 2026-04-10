"use client";

import Image from "next/image";

const navItems = [
  { label: "Кейсы", href: "#cases" },
  { label: "Продукты", href: "#services" },
  { label: "Контакты", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)]/60 bg-[rgba(6,6,6,0.88)] backdrop-blur-xl supports-[backdrop-filter]:bg-[rgba(6,6,6,0.82)]">
      <nav className="container-site relative flex h-[72px] items-center justify-between md:h-20">
        <a
          href="#hero"
          className="group relative z-10 shrink-0 outline-none transition-opacity hover:opacity-90"
          aria-label="На главную"
        >
          <span className="brand-logo-wrap relative block h-9 w-[104px] overflow-hidden p-1 sm:w-[128px] md:h-11 md:w-[188px] md:p-1.5">
            <Image
              src="/brand-logo.png"
              alt="LN — системные продажи"
              fill
              sizes="(max-width: 640px) 104px, 188px"
              className="brand-logo-img object-contain object-left"
              priority
            />
          </span>
        </a>

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden -translate-x-1/2 -translate-y-1/2 md:flex md:items-center md:gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="pointer-events-auto nav-link-premium text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a href="#contact" className="btn-primary nav-cta-btn relative z-10 shrink-0">
          Заявка
        </a>
      </nav>
    </header>
  );
}
