export default function ProductCTA() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--surface)] py-20 md:py-24">
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold leading-tight text-[var(--text)] md:text-4xl md:leading-tight">
            Готовы убрать хаос из продаж и поставить цифры на контроль?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--muted)] md:text-lg">
            Короткий созвон или заявка — разберём воронку, CRM и точки потерь. Без воды и универсальных чек-листов.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#contact" className="btn-primary">
              Оставить заявку
            </a>
            <a href="#cases" className="btn-secondary">
              Смотреть кейсы
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
