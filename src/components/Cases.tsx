"use client";

import CaseCard from "@/components/CaseCard";
import { useContent } from "@/context/ContentContext";

export default function Cases() {
  const { cases } = useContent();

  return (
    <section
      id="cases"
      className="section-space border-t border-white/5 bg-[#0b0b0b]"
    >
      <div className="container-site">
        <div className="max-w-3xl">
          <div className="kicker">Кейсы</div>
          <h2 className="section-title mt-6 text-white">Результаты, которые получают клиенты</h2>
          <p className="section-text mt-6 text-white/60">
            Не просто консультации — измеримые цифры после внедрения системы продаж.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {cases.map((item) => (
            <CaseCard
              key={item.id}
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
