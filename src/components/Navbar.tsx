"use client";

const navItems = [
  { label: "Обо мне", href: "#about" },
  { label: "Кейсы", href: "#cases" },
  { label: "Услуги", href: "#services" },
  { label: "Процесс", href: "#process" },
  { label: "Статьи", href: "#blog" },
  { label: "Контакт", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-[rgba(8,8,8,0.78)] backdrop-blur-xl supports-[backdrop-filter]:bg-[rgba(8,8,8,0.7)]">
      <nav className="container-site flex h-20 items-center justify-between">
        <a
          href="#hero"
          className="text-lg font-semibold uppercase tracking-[0.22em] text-[var(--accent)] transition-colors duration-300 hover:text-[var(--accent-soft)]"
        >
          Лунёв
        </a>

        <div className="hidden items-center gap-9 md:flex">
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
          Связаться
        </a>
      </nav>
    </header>
  );
}
