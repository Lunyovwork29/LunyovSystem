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
      title: "Отдел продаж с нуля",
      price: "от 350 000 ₸",
      numericPrice: 350000,
      desc: "Строю ОП под ключ — структура, найм, CRM, скрипты, обучение. Вы получаете работающую систему, не набор рекомендаций.",
      icon: "🏗️",
      points: [
        "Аудит текущей ситуации",
        "Структура и должности",
        "Найм и онбординг",
        "AmoCRM или Bitrix24",
        "Скрипты и стандарты",
        "Обучение и аттестация",
      ],
    },
    {
      title: "Настройка CRM",
      price: "от 150 000 ₸",
      numericPrice: 150000,
      desc: "Внедрение AmoCRM или Bitrix24 под ваш процесс продаж. Воронка, автоматизация, интеграции, обучение команды.",
      featured: true,
      icon: "⚙️",
      points: [
        "Проектирование воронки",
        "Настройка AmoCRM/Bitrix24",
        "Автоматические уведомления",
        "Интеграция с сайтом/телефонией",
        "Обучение сотрудников",
        "Поддержка 30 дней",
      ],
    },
    {
      title: "Скрипты и обучение",
      price: "от 80 000 ₸",
      numericPrice: 80000,
      desc: "Пишу скрипты под ваш продукт и провожу обучение команды. Менеджеры продают больше уже в первую неделю.",
      icon: "📋",
      points: [
        "Анализ продукта",
        "Скрипт входящего звонка",
        "Скрипт исходящего",
        "Работа с возражениями",
        "Тренинг команды (1 день)",
        "Аттестация менеджеров",
      ],
    },
  ];

  return (
    <section id="services" className="border-t border-[var(--border)] py-[100px] md:px-6">
      <div className="container-site">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:mb-[60px] md:flex-row md:items-end">
          <div>
            <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
              Что я делаю
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4.5rem)] font-normal uppercase leading-[0.95] tracking-[0.02em] text-[var(--text)]">
              Услуги
            </h2>
            <div className="mt-6 h-0.5 w-[60px] bg-[var(--accent)]" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-[2px] lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden border border-[var(--border)] bg-[var(--surface)] px-8 pb-10 pt-10 transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-[var(--accent)] ${
                service.featured
                  ? "border-[var(--accent)] bg-[linear-gradient(135deg,var(--surface)_0%,rgba(200,169,110,0.06)_100%)]"
                  : ""
              }`}
            >
              {service.featured ? (
                <div className="absolute right-5 top-5 rounded-sm bg-[var(--accent)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--bg)]">
                  Популярное
                </div>
              ) : null}

              <div className="mb-5 text-[40px] leading-none" aria-hidden>
                {service.icon}
              </div>
              <h3 className="mb-3 text-[22px] font-bold leading-tight text-[var(--text)]">{service.title}</h3>
              <p className="mb-6 text-sm leading-[1.7] text-[var(--muted)]">{service.desc}</p>

              <ul className="mb-8 list-none space-y-0">
                {service.points.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 border-b border-[var(--border)] py-1.5 text-[13px] text-[var(--muted)]"
                  >
                    <span className="font-bold text-[var(--accent)]">—</span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mb-5 font-[family-name:var(--font-display)] text-[32px] leading-none tracking-tight text-[var(--text)]">
                {service.price}{" "}
                <span className="font-[family-name:var(--font-body)] text-base font-normal text-[var(--muted)]">
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
                className="w-full rounded-sm bg-[var(--accent)] py-3.5 text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--bg)] opacity-70 transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[var(--accent-hover)] group-hover:opacity-100"
              >
                Добавить в корзину
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
