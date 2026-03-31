export default function Process() {
  const steps = [
    {
      title: "Анализ",
      desc: "Разбираем текущую систему продаж, узкие места и где прямо сейчас теряются деньги.",
    },
    {
      title: "Стратегия",
      desc: "Формируем понятный план: что менять, внедрять и в какой последовательности.",
    },
    {
      title: "Внедрение",
      desc: "Настраиваем CRM, скрипты, контроль, регламенты и работу менеджеров.",
    },
    {
      title: "Результат",
      desc: "Вы получаете предсказуемую систему продаж, а не хаос, завязанный на людях.",
    },
  ];

  return (
    <section id="process" className="section-space border-t border-[var(--border)]">
      <div className="container-site">
        <div className="max-w-3xl">
          <div className="kicker">Процесс</div>
          <h2 className="section-title mt-6">Как мы работаем</h2>
          <p className="section-text mt-6">
            Чёткий путь без хаоса — вы понимаете, что происходит на каждом этапе.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="card-premium p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(200,169,110,0.35)] text-xl font-semibold text-[var(--accent)]">
                0{index + 1}
              </div>
              <h3 className="text-2xl font-semibold">{step.title}</h3>
              <p className="mt-4 text-[var(--muted)] leading-7">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}