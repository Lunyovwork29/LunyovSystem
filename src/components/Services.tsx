"use client";

import { useCart } from "@/context/CartContext";

export default function Services() {
  const { addToCart } = useCart();

  const services = [
    {
      title: "Аудит отдела продаж",
      price: "100 000 ₸",
      numericPrice: 100000,
      desc: "Разбор текущей системы, поиск узких мест и конкретный план роста.",
      points: ["Анализ воронки", "Разбор менеджеров", "План действий"],
    },
    {
      title: "Внедрение CRM",
      price: "от 300 000 ₸",
      numericPrice: 300000,
      desc: "Настройка CRM под бизнес, автоматизация и прозрачный контроль.",
      points: ["CRM под процесс", "Автоматизация", "Контроль лидов"],
      featured: true,
    },
    {
      title: "Отдел продаж под ключ",
      price: "индивидуально",
      numericPrice: 0,
      desc: "Структура отдела, скрипты, регламенты, KPI и система управления.",
      points: ["Найм и структура", "Обучение", "Полная система"],
    },
  ];

  return (
    <section id="services" className="section-space border-t border-[var(--border)]">
      <div className="container-site">
        <div className="max-w-3xl">
          <div className="kicker">Услуги</div>
          <h2 className="section-title mt-6">Как можно начать работу</h2>
          <p className="section-text mt-6">
            Выберите формат под ваш текущий этап: от точечного аудита до
            полноценного построения отдела продаж.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className={`card-premium p-8 flex flex-col ${
                service.featured ? "ring-1 ring-[rgba(200,169,110,0.35)]" : ""
              }`}
            >
              {service.featured && (
                <div className="mb-5 inline-flex w-fit rounded-full bg-[rgba(200,169,110,0.14)] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                  Популярный формат
                </div>
              )}

              <h3 className="text-2xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-3xl font-semibold text-[var(--accent)]">{service.price}</p>
              <p className="mt-4 text-[var(--muted)] leading-7">{service.desc}</p>

              <ul className="mt-6 space-y-3 flex-1">
                {service.points.map((point, i) => (
                  <li key={i} className="text-[var(--muted)]">
                    — {point}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => addToCart(service)}
                className="btn-primary mt-8 w-full"
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