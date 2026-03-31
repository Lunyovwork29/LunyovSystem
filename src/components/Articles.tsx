"use client";

import { useMemo, useState } from "react";
import { useContent } from "@/context/ContentContext";

export default function Articles() {
  const { articles } = useContent();
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeArticle = useMemo(
    () => articles.find((article) => article.id === activeId) ?? null,
    [activeId, articles]
  );

  return (
    <section id="blog" className="section-space border-t border-[var(--border)]">
      <div className="container-site">
        <div className="max-w-3xl">
          <div className="kicker">Статьи</div>
          <h2 className="section-title mt-6">Практические материалы по продажам</h2>
          <p className="section-text mt-6">
            Короткие разборы, которые помогают увеличить конверсию и навести порядок в отделе продаж.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {articles.map((article) => (
            <button
              key={article.id}
              type="button"
              onClick={() => setActiveId(article.id)}
              className="card-premium text-left p-8 transition-transform hover:-translate-y-1"
            >
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                {new Date(article.createdAt).toLocaleDateString("ru-RU")}
              </p>
              <h3 className="mt-4 text-2xl font-semibold">{article.title}</h3>
              <p className="mt-4 text-[var(--muted)] leading-7">{article.excerpt}</p>
              <span className="mt-6 inline-flex text-sm font-semibold text-[var(--accent)]">Читать материал</span>
            </button>
          ))}
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[60] bg-black/70 p-4 backdrop-blur-sm transition ${activeArticle ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setActiveId(null)}
      >
        {activeArticle && (
          <article
            className="mx-auto mt-14 max-h-[82vh] w-full max-w-3xl overflow-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
              {new Date(activeArticle.createdAt).toLocaleDateString("ru-RU")}
            </p>
            <h3 className="mt-4 text-4xl font-semibold leading-tight">{activeArticle.title}</h3>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">{activeArticle.body}</p>
            <button type="button" className="btn-secondary mt-8" onClick={() => setActiveId(null)}>
              Закрыть
            </button>
          </article>
        )}
      </div>
    </section>
  );
}