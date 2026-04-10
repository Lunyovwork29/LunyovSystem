import type { CaseMetric } from "@/types/case";

export type CaseCardProps = {
  index: number;
  title: string;
  category: string;
  country: string;
  metrics: CaseMetric[];
  description: string;
  logoSrc?: string;
  logoEmoji?: string;
};

function formatCaseIndex(n: number) {
  return String(n).padStart(2, "0");
}

export default function CaseCard({
  index,
  title,
  category,
  country,
  metrics,
  description,
  logoSrc,
  logoEmoji = "📊",
}: CaseCardProps) {
  return (
    <article
      className="group relative z-0 overflow-hidden bg-[var(--bg)] p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-[1] hover:-translate-y-1 hover:scale-[1.02] hover:bg-[rgba(184,154,98,0.04)] hover:shadow-[0_24px_64px_rgba(0,0,0,0.45),0_0_0_1px_rgba(184,154,98,0.12),0_0_48px_rgba(184,154,98,0.1)] md:p-10"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 ease-out group-hover:scale-x-100"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute right-8 top-5 font-[family-name:var(--font-display)] text-[64px] leading-none text-[rgba(184,154,98,0.07)] transition-opacity duration-500 group-hover:opacity-80"
        aria-hidden
      >
        {formatCaseIndex(index)}
      </div>

      <div className="relative z-[1]">
        <div className="mb-5 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface-2)] transition-colors duration-500 group-hover:border-[var(--accent)]/35">
            {logoSrc ? (
              // Произвольные URL из админки — без доменов в next.config
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoSrc} alt="" className="h-full w-full object-contain p-1" loading="lazy" />
            ) : (
              <span className="text-lg" aria-hidden>
                {logoEmoji}
              </span>
            )}
          </div>
          <div className="min-w-0 pt-0.5">
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-block rounded-sm border border-[rgba(184,154,98,0.2)] bg-[rgba(184,154,98,0.08)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                {category}
              </span>
              <span className="inline-block rounded-sm border border-[rgba(184,154,98,0.2)] bg-[rgba(184,154,98,0.08)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
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
                <div className="font-[family-name:var(--font-display)] text-[36px] leading-none tracking-tight text-[var(--accent)] transition-transform duration-500 ease-out group-hover:scale-105">
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
