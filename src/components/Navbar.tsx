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
        <a href="#hero" className="group outline-none transition-opacity hover:opacity-90">
          <span className="relative block h-9 w-[min(100%,200px)] shrink-0 md:h-11 md:w-[220px]">
            <Image
              src="/brand-logo.png"
              alt="Lunyov System"
              fill
              className="object-contain object-left"
              priority
            />
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
