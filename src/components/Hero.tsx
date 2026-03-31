"use client";

import Navbar from "@/components/Navbar";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pb-18 pt-34 md:pb-24 md:pt-40">
      <Navbar />

      <div className="hero-depth pointer-events-none absolute inset-0" />
      <div className="hero-grid-overlay pointer-events-none absolute inset-0" />

      <div className="container-site relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="fade-up stagger-1">
            <div className="kicker mb-8">Эксперт автоматизации продаж · Казахстан</div>

            <h1 className="text-[clamp(4.1rem,11vw,8.8rem)] font-black uppercase leading-[0.84] tracking-[0.02em]">
              <span className="block text-[var(--text)]">Никита</span>
              <span className="block text-[var(--accent)]">Лунёв</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-[var(--muted)] md:text-[1.07rem]">
              Выстраиваю отделы продаж как систему: стратегия, CRM, контроль,
              автоматизация и рост выручки.
              <span className="font-semibold text-[var(--text)]"> Не консультация ради консультации, а измеримый результат.</span>
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {["AmoCRM", "Bitrix24", "Kommo", "Wazzup", "Sipuni", "Albato"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm border border-[rgba(200,169,110,0.2)] bg-[rgba(200,169,110,0.06)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#services" className="btn-primary">
                Смотреть услуги
              </a>
              <a href="#cases" className="btn-secondary">
                Кейсы
              </a>
            </div>
          </div>

          <aside className="fade-up stagger-3 lg:justify-self-end">
            <article className="hero-floating-card w-full max-w-[430px]">
              <div className="mb-10">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Case preview · B2B</p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--text)]">
                  Внедрение CRM + регламенты продаж
                </h3>
              </div>

              <div className="mb-7 grid grid-cols-2 gap-5">
                <div>
                  <p className="text-5xl font-semibold leading-none text-[var(--accent)]">60%</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                    ускорение обработки лидов
                  </p>
                </div>
                <div>
                  <p className="text-5xl font-semibold leading-none text-[var(--accent)]">0</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                    потерянных заявок
                  </p>
                </div>
              </div>

              <p className="text-sm leading-7 text-[var(--muted)]">
                До проекта лиды &quot;зависали&quot; и терялись на этапе первого контакта.
                После настройки CRM, SLA и скриптов команда начала работать в
                одном стандарте, а воронка стала прозрачной.
              </p>

              <div className="mt-8 inline-flex rounded-sm bg-[var(--accent)] px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-black">
                РОП · Консультант
              </div>
            </article>
          </aside>
        </div>
      </div>
    </section>
  );
}