import type { CaseMetric } from "@/types/case";

export type CaseCardProps = {
  /** Порядковый номер для фона «01», «02»… */
  index: number;
  title: string;
  category: string;
  country: string;
  metrics: CaseMetric[];
  description: string;
  /** Эмодзи в квадрате слева, как в эталоне */
  logoEmoji?: string;
};

function formatCaseIndex(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * Кейс 1:1 по эталону Claude: фон --bg, сетка без скруглений карточки,
 * верхняя золотая полоса scaleX при hover, крупный номер, теги, метрики display.
 */
export default function CaseCard({
  index,
  title,
  category,
  country,
  metrics,
  description,
  logoEmoji = "📊",
}: CaseCardProps) {
  return (
    <article
      className="group relative overflow-hidden bg-[var(--bg)] p-8 transition-[background-color] duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[rgba(200,169,110,0.03)] md:p-10"
    >
      {/* Верхняя акцентная линия — как .case-card::before */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 ease-out group-hover:scale-x-100"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute right-8 top-5 font-[family-name:var(--font-display)] text-[64px] leading-none text-[rgba(200,169,110,0.08)]"
        aria-hidden
      >
        {formatCaseIndex(index)}
      </div>

      <div className="relative z-[1]">
        <div className="mb-5 flex items-start gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-[var(--border)] bg-[var(--surface-2)] text-lg"
            aria-hidden
          >
            {logoEmoji}
          </div>
          <div className="min-w-0 pt-0.5">
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-block rounded-sm bg-[rgba(200,169,110,0.1)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                {category}
              </span>
              <span className="inline-block rounded-sm bg-[rgba(200,169,110,0.1)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                {country}
              </span>
            </div>
          </div>
        </div>

        <h3 className="mb-5 text-[20px] font-bold leading-snug text-[var(--text)]">{title}</h3>

        {metrics.length > 0 ? (
          <div className="mb-5 flex flex-wrap gap-6">
            {metrics.map((metric, i) => (
              <div key={`${metric.value}-${i}`} className="min-w-0">
                <div className="font-[family-name:var(--font-display)] text-[36px] leading-none tracking-tight text-[var(--accent)]">
                  {metric.value}
                </div>
                {metric.label ? (
                  <div className="mt-1 text-[11px] uppercase tracking-[0.06em] text-[var(--muted)]">
                    {metric.label}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

        <p className="text-sm leading-[1.7] text-[var(--muted)]">{description}</p>
      </div>
    </article>
  );
}
