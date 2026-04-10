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
      <nav className="container-site flex h-[72px] items-center justify-between md:h-20">
        <a href="#hero" className="group flex items-center gap-3 outline-none transition-opacity hover:opacity-90">
          <span className="relative h-9 w-[108px] shrink-0 md:h-10 md:w-[120px]">
            <Image
              src="/brand-logo.svg"
              alt="LN — Lunyov System"
              fill
              className="object-contain object-left"
              priority
            />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">LN</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
              Lunyov System
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link-premium text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a href="#contact" className="btn-primary nav-cta-btn">
          Заявка
        </a>
      </nav>
    </header>
  );
}
