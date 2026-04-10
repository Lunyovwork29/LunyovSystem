"use client";

import { useCart } from "@/context/CartContext";

type Service = {
  title: string;
  price: string;
  numericPrice: number;
  desc: string;
  points: string[];
  featured?: boolean;
  icon: string;
};

export default function Services() {
  const { addToCart } = useCart();

  const services: Service[] = [
    {
      title: "Построение отдела продаж под ключ",
      price: "от 350 000 ₸",
      numericPrice: 350000,
      desc: "Структура, процессы, CRM, найм и обучение — вы получаете работающую машину продаж, а не набор советов.",
      icon: "🏗️",
      featured: true,
      points: ["Диагностика и модель продаж", "Регламенты и контроль", "Внедрение CRM в процесс"],
    },
    {
      title: "Внедрение CRM",
      price: "от 150 000 ₸",
      numericPrice: 150000,
      desc: "AmoCRM, Kommo, Bitrix24 под вашу воронку: поля, автоматизации, интеграции, обучение команды.",
      icon: "⚙️",
      points: ["Проектирование воронки", "Настройка и интеграции", "Запуск и сопровождение"],
    },
    {
      title: "Аудит отдела продаж",
      price: "от 100 000 ₸",
      numericPrice: 100000,
      desc: "Разбор воронки, CRM, менеджеров и управленческой отчётности — с приоритетами и планом.",
      icon: "📋",
      points: ["Точки потерь и узкие места", "CRM и дисциплина", "Дорожная карта на 90 дней"],
    },
    {
      title: "Автоматизация и интеграции",
      price: "от 120 000 ₸",
      numericPrice: 120000,
      desc: "Связка сайта, телефонии, мессенджеров и CRM — меньше ручного труда, больше прозрачности.",
      icon: "🔗",
      points: ["Интеграции под процесс", "Сценарии и уведомления", "Единое окно для ОП"],
    },
  ];

  return (
    <section id="services" className="border-t border-[var(--border)] py-[100px] md:px-6">
      <div className="container-site">
        <div className="mb-14 md:mb-[60px]">
          <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Форматы работы
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4.5rem)] font-normal uppercase leading-[0.95] tracking-[0.02em] text-[var(--text)]">
            Услуги
          </h2>
          <div className="mt-6 h-0.5 w-[60px] bg-[var(--accent)]" />
          <p className="mt-6 max-w-2xl text-[var(--muted)] leading-relaxed">
            Чёткие продукты под этап зрелости отдела — от диагностики до полной системы и автоматизации.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative flex min-h-full flex-col overflow-hidden border border-[var(--border)] bg-[var(--surface)] px-6 pb-8 pt-9 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[var(--accent)]/55 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] ${
                service.featured
                  ? "border-[var(--accent)]/50 bg-[linear-gradient(160deg,var(--surface)_0%,rgba(184,154,98,0.07)_100%)]"
                  : ""
              }`}
            >
              {service.featured ? (
                <div className="absolute right-4 top-4 rounded-sm bg-[var(--accent)] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--bg)]">
                  Ключевой формат
                </div>
              ) : null}

              <div className="mb-4 text-[34px] leading-none" aria-hidden>
                {service.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold leading-snug text-[var(--text)]">{service.title}</h3>
              <p className="mb-5 text-sm leading-[1.65] text-[var(--muted)]">{service.desc}</p>

              <ul className="mb-6 flex-1 list-none space-y-0">
                {service.points.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 border-b border-[var(--border)] py-2 text-[12px] leading-snug text-[var(--muted)] last:border-b-0"
                  >
                    <span className="font-bold text-[var(--accent)]">—</span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mb-5 font-[family-name:var(--font-display)] text-[26px] leading-none tracking-tight text-[var(--text)] xl:text-[28px]">
                {service.price}{" "}
                <span className="font-[family-name:var(--font-body)] text-sm font-normal text-[var(--muted)]">
                  / проект
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  addToCart({
                    title: service.title,
                    price: service.price,
                    numericPrice: service.numericPrice,
                  })
                }
                className="mt-auto w-full rounded-sm bg-[var(--accent)] py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--bg)] opacity-[0.82] transition-all duration-300 ease-out hover:bg-[var(--accent-hover)] group-hover:opacity-100"
              >
                В корзину
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
