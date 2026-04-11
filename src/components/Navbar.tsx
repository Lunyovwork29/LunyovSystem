"use client";

import Image from "next/image";

const navItems = [
  { label: "Кейсы", href: "#cases" },
  { label: "Услуги", href: "#services" },
  { label: "Контакты", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)]/60 bg-[rgba(6,6,6,0.88)] backdrop-blur-xl supports-[backdrop-filter]:bg-[rgba(6,6,6,0.82)]">
      <nav className="container-site relative flex h-[72px] items-center justify-between md:h-20">
        <a
          href="#hero"
          className="group relative z-10 flex min-w-0 shrink-0 items-center gap-2.5 outline-none transition-opacity hover:opacity-90 sm:gap-3"
          aria-label="LN Systems — на главную"
        >
          <span className="relative block h-9 w-[132px] shrink-0 md:h-11 md:w-[158px]">
            <Image
              src="/brand-logo.png"
              alt=""
              fill
              sizes="158px"
              className="object-contain object-left drop-shadow-[0_0_14px_rgba(184,154,98,0.22)]"
              priority
            />
          </span>
          <span className="hidden min-w-0 truncate font-[family-name:var(--font-display)] text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text)] sm:inline md:text-[11px]">
            LN Systems
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
