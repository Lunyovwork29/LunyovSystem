export default function PainPoints() {
  const pains = [
    "Менеджеры отвечают по 2–3 часа — заявки остывают",
    "Нет системы — каждый продаёт как умеет",
    "CRM есть, но ей никто нормально не пользуется",
    "Нет контроля — непонятно, кто сливает клиентов",
    "Отдел работает, но выручка не растёт",
    "Сильная зависимость от одного менеджера",
  ];

  return (
    <section className="section-space border-t border-[var(--border)]">
      <div className="container-site">
        <div className="max-w-3xl">
          <div className="kicker">Потери бизнеса</div>
          <h2 className="section-title mt-6">Где вы сейчас теряете деньги</h2>
          <p className="section-text mt-6">
            90% компаний не масштабируются не потому что нет клиентов, а потому
            что отдел продаж работает хаотично. Деньги уже в системе — просто
            она течёт.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {pains.map((pain, index) => (
            <div key={index} className="card-premium p-7">
              <div className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                0{index + 1}
              </div>
              <p className="text-lg leading-8 text-[var(--text)]">{pain}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}