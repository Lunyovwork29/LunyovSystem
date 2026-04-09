"use client";

import CaseCard from "@/components/CaseCard";
import { useContent } from "@/context/ContentContext";

export default function Cases() {
  const { cases } = useContent();

  return (
    <section id="cases" className="border-t border-[var(--border)] bg-[var(--surface)] py-[100px] md:px-6">
      <div className="container-site">
        <div className="mb-14 max-w-3xl md:mb-[60px]">
          <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Реальные результаты
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4.5rem)] font-normal uppercase leading-[0.95] tracking-[0.02em] text-[var(--text)]">
            Кейсы
          </h2>
          <div className="mt-6 h-0.5 w-[60px] bg-[var(--accent)]" />
        </div>

        {/* gap: 2px как в эталоне — «плитка» на surface */}
        <div className="grid grid-cols-1 gap-[2px] md:grid-cols-2">
          {cases.map((item, i) => (
            <CaseCard
              key={item.id}
              index={i + 1}
              title={item.title}
              category={item.category}
              country={item.country}
              metrics={item.metrics}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
