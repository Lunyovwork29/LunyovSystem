import type { CaseMetric } from "@/types/case";

export type CaseCardProps = {
  title: string;
  category: string;
  country: string;
  metrics: CaseMetric[];
  description: string;
};

/**
 * Премиальная карточка кейса: glow, lift, scale, золотая обводка при hover.
 */
export default function CaseCard({
  title,
  category,
  country,
  metrics,
  description,
}: CaseCardProps) {
  return (
    <div className="group relative cursor-pointer pb-2">
      {/* Мягкий blur-glow под карточкой */}
      <div
        className="pointer-events-none absolute inset-x-6 top-1/2 h-24 -translate-y-1/4 rounded-[2rem] bg-[#d4af37]/20 blur-2xl opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:blur-3xl"
        aria-hidden
      />

      <article
        className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#0b0b0b] p-6 shadow-none transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:border-[#d4af37] group-hover:shadow-2xl md:p-8"
      >
        {/* Внутренний radial glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.15), transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              <span className="text-white/70">{category}</span>
              <span className="mx-2 text-white/25">·</span>
              <span>{country}</span>
            </p>
            <span
              className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-all duration-300 ease-out group-hover:border-[#d4af37]/40 group-hover:text-[#d4af37]"
              aria-hidden
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
          </div>

          <h3 className="mt-5 text-xl font-semibold leading-snug text-white transition-colors duration-300 ease-out group-hover:text-[#d4af37] md:text-2xl">
            {title}
          </h3>

          {metrics.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-6 md:gap-8">
              {metrics.map((metric, index) => (
                <div key={`${metric.value}-${index}`} className="min-w-0">
                  <p className="metric text-3xl font-semibold tracking-tight text-white transition-all duration-300 ease-out group-hover:scale-110 group-hover:text-[#d4af37] md:text-4xl">
                    {metric.value}
                  </p>
                  {metric.label ? (
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
                      {metric.label}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}

          <p className="mt-6 text-sm leading-relaxed text-white/60 md:text-base">{description}</p>
        </div>
      </article>
    </div>
  );
}
