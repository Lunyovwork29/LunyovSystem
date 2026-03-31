"use client";

import { useContent } from "@/context/ContentContext";

export default function Cases() {
  const { cases } = useContent();

  return (
    <section id="cases" className="section-space border-t border-[var(--border)]">
      <div className="container-site">
        <div className="max-w-3xl">
          <div className="kicker">Кейсы</div>
          <h2 className="section-title mt-6">Результаты, которые получают клиенты</h2>
          <p className="section-text mt-6">
            Не просто консультации, а конкретные цифры после внедрения системы.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {cases.map((item) => (
            <div key={item.id} className="card-premium p-8">
              <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">
                {item.niche}
              </p>

              <h3 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--accent)]">
                {item.result}
              </h3>

              <ul className="mt-6 space-y-3">
                {item.points.map((point, i) => (
                  <li key={i} className="text-base leading-7 text-[var(--muted)]">
                    — {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}