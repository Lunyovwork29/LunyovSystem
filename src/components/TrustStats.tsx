const STATS = [
  { value: "300+", unit: "млн ₸", label: "совокупная выручка клиентов" },
  { value: "25+", unit: "", label: "завершённых проектов" },
  { value: "35%", unit: "", label: "средний рост продаж" },
  { value: "7+", unit: "", label: "лет системного опыта" },
  { value: "80+", unit: "", label: "внедрений CRM" },
];

export default function TrustStats() {
  return (
    <section
      id="trust"
      className="border-t border-[var(--border)] bg-[linear-gradient(180deg,var(--surface)_0%,var(--bg)_100%)] py-20 md:py-28"
    >
      <div className="container-site">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
          Цифры и ответственность
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-center text-2xl font-semibold leading-snug text-[var(--text)] md:text-3xl">
          Результат измеряется выручкой и дисциплиной в отделе — не слайдами
        </h2>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {STATS.map((item) => (
            <div
              key={item.label}
              className="group border border-[var(--border)] bg-[var(--bg)]/80 px-5 py-8 text-center transition-all duration-500 ease-out hover:border-[var(--accent)]/40 hover:shadow-[0_0_40px_rgba(184,154,98,0.08)]"
            >
              <div className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] leading-none tracking-tight text-[var(--accent)] transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                {item.value}
                {item.unit ? (
                  <span className="text-[0.55em] font-semibold text-[var(--accent-soft)]"> {item.unit}</span>
                ) : null}
              </div>
              <p className="mx-auto mt-3 max-w-[18ch] text-balance text-[12px] font-medium leading-[1.45] tracking-[0.01em] text-[var(--muted)]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
