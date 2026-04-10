"use client";

import Navbar from "@/components/Navbar";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pb-24 pt-28 md:pb-32 md:pt-36">
      <Navbar />

      <div className="hero-depth pointer-events-none absolute inset-0 opacity-90" />
      <div className="hero-grid-overlay pointer-events-none absolute inset-0" />

      <div className="container-site relative z-10">
        <div className="mx-auto max-w-4xl text-center md:text-left">
          <p className="fade-up stagger-1 mb-6 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Lunyov System · системные продажи
          </p>

          <h1 className="fade-up stagger-2 font-[family-name:var(--font-display)] text-[clamp(1.85rem,5vw,3.35rem)] font-semibold leading-[1.08] tracking-tight text-[var(--text)] md:max-w-none">
            Строим отделы продаж, которые приносят деньги, а не создают хаос
          </h1>

          <ul className="fade-up stagger-3 mx-auto mt-8 max-w-xl space-y-2 text-left text-base leading-relaxed text-[var(--muted)] md:mx-0 md:text-[1.05rem]">
            <li className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
              <span>
                Внедрение CRM <span className="text-[var(--text)]/90">(amo / Kommo / Bitrix)</span>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
              <span>Построение системных продаж</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
              <span>Контроль и рост выручки</span>
            </li>
          </ul>

          <div className="fade-up stagger-4 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-start">
            <a href="#contact" className="btn-primary w-full sm:w-auto">
              Разобрать мой отдел продаж
            </a>
            <a href="#cases" className="btn-secondary w-full sm:w-auto">
              Смотреть кейсы
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
