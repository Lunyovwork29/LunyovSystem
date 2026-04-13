"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useContent } from "@/context/ContentContext";

const ADMIN_LOGIN = "admin";
const ADMIN_PASSWORD = "1234";

type CaseDraft = {
  title: string;
  category: string;
  country: string;
  description: string;
  metricsRaw: string;
  logoSrc: string;
};

type ArticleDraft = {
  title: string;
  excerpt: string;
  body: string;
};

const emptyCaseDraft: CaseDraft = {
  title: "",
  category: "",
  country: "",
  description: "",
  metricsRaw: "",
  logoSrc: "",
};
const emptyArticleDraft: ArticleDraft = { title: "", excerpt: "", body: "" };

function parseMetrics(raw: string) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const colon = line.indexOf(":");
      if (colon > 0) {
        const label = line.slice(0, colon).trim();
        const value = line.slice(colon + 1).trim();
        return { label, value };
      }
      return { value: line };
    });
}

export default function AdminPanel() {
  const { cases, articles, addCase, updateCase, deleteCase, addArticle, updateArticle, deleteArticle } =
    useContent();

  const [open, setOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [editingCaseId, setEditingCaseId] = useState<string | null>(null);
  const [caseDraft, setCaseDraft] = useState<CaseDraft>(emptyCaseDraft);

  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [articleDraft, setArticleDraft] = useState<ArticleDraft>(emptyArticleDraft);

  const sortedArticles = useMemo(
    () =>
      [...articles].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [articles]
  );

  const closeEditor = () => setOpen(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasAdminAccess =
      window.location.search.includes("admin=1") || window.location.hash.toLowerCase() === "#admin";
    if (hasAdminAccess) setOpen(true);
  }, []);

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      setIsAuth(true);
      setAuthError("");
      return;
    }
    setAuthError("Неверный логин или пароль");
  };

  const startEditCase = (id: string) => {
    const item = cases.find((entry) => entry.id === id);
    if (!item) return;
    setEditingCaseId(id);
    const metricsRaw = item.metrics
      .map((m) => (m.label ? `${m.label}: ${m.value}` : m.value))
      .join("\n");
    setCaseDraft({
      title: item.title,
      category: item.category,
      country: item.country,
      description: item.description,
      metricsRaw,
      logoSrc: item.logoSrc ?? "",
    });
  };

  const submitCase = (event: FormEvent) => {
    event.preventDefault();
    const metrics = parseMetrics(caseDraft.metricsRaw);
    const logoTrim = caseDraft.logoSrc.trim();
    const payload = {
      title: caseDraft.title.trim(),
      category: caseDraft.category.trim(),
      country: caseDraft.country.trim(),
      description: caseDraft.description.trim(),
      metrics,
      logoSrc: logoTrim || undefined,
    };
    if (!payload.title || !payload.category || !payload.country || metrics.length === 0) return;

    if (editingCaseId) {
      updateCase(editingCaseId, payload);
    } else {
      addCase(payload);
    }
    setEditingCaseId(null);
    setCaseDraft(emptyCaseDraft);
  };

  const startEditArticle = (id: string) => {
    const item = articles.find((entry) => entry.id === id);
    if (!item) return;
    setEditingArticleId(id);
    setArticleDraft({ title: item.title, excerpt: item.excerpt, body: item.body });
  };

  const submitArticle = (event: FormEvent) => {
    event.preventDefault();
    const payload = {
      title: articleDraft.title.trim(),
      excerpt: articleDraft.excerpt.trim(),
      body: articleDraft.body.trim(),
    };
    if (!payload.title || !payload.excerpt || !payload.body) return;

    if (editingArticleId) {
      updateArticle(editingArticleId, payload);
    } else {
      addArticle(payload);
    }
    setEditingArticleId(null);
    setArticleDraft(emptyArticleDraft);
  };

  return (
    <>
      <div className={`fixed inset-0 z-[70] ${open ? "" : "pointer-events-none"}`}>
        <div
          onClick={closeEditor}
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition ${open ? "opacity-100" : "opacity-0"}`}
        />

        <aside
          className={`absolute right-0 top-0 h-full w-full max-w-3xl overflow-auto border-l border-[var(--border)] bg-[var(--bg)] p-6 transition duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          {!isAuth ? (
            <form onSubmit={handleLogin} className="mx-auto mt-24 max-w-md rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8">
              <h3 className="text-3xl font-semibold">Вход в админку</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">Введите данные для управления кейсами и статьями.</p>
              <input
                className="input-premium mt-6 w-full"
                placeholder="Логин"
                value={login}
                onChange={(event) => setLogin(event.target.value)}
              />
              <input
                className="input-premium mt-4 w-full"
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {authError ? <p className="mt-3 text-sm text-red-400">{authError}</p> : null}
              <button type="submit" className="btn-primary mt-6 w-full">
                Войти
              </button>
            </form>
          ) : (
            <div className="space-y-10 pb-12">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                <h3 className="text-3xl font-semibold">Админ-панель</h3>
                <button type="button" className="btn-secondary px-4 py-2 text-xs" onClick={closeEditor}>
                  Закрыть
                </button>
              </div>

              <section>
                <h4 className="text-xl font-semibold">Кейсы</h4>
                <form onSubmit={submitCase} className="mt-5 grid gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
                  <input
                    className="input-premium"
                    placeholder="Заголовок кейса"
                    value={caseDraft.title}
                    onChange={(event) => setCaseDraft((prev) => ({ ...prev, title: event.target.value }))}
                  />
                  <input
                    className="input-premium"
                    placeholder="Категория / ниша"
                    value={caseDraft.category}
                    onChange={(event) => setCaseDraft((prev) => ({ ...prev, category: event.target.value }))}
                  />
                  <input
                    className="input-premium"
                    placeholder="Страна"
                    value={caseDraft.country}
                    onChange={(event) => setCaseDraft((prev) => ({ ...prev, country: event.target.value }))}
                  />
                  <div>
                    <input
                      className="input-premium"
                      placeholder="/cases/logos/case-1.png"
                      value={caseDraft.logoSrc}
                      onChange={(event) => setCaseDraft((prev) => ({ ...prev, logoSrc: event.target.value }))}
                      aria-describedby="case-logo-hint"
                    />
                    <p id="case-logo-hint" className="mt-1.5 text-[11px] leading-snug text-[var(--muted)]">
                      PNG в репозитории: положите в{" "}
                      <code className="rounded bg-[var(--surface-2)] px-1 text-[var(--accent-soft)]">
                        public/cases/logos/
                      </code>
                      , здесь укажите путь с ведущим слэшем, например{" "}
                      <code className="rounded bg-[var(--surface-2)] px-1">/cases/logos/staleks.png</code>.
                    </p>
                  </div>
                  <textarea
                    className="input-premium"
                    placeholder="Метрики: строка — значение (×1.8) или подпись: значение (рост: +35%)"
                    value={caseDraft.metricsRaw}
                    onChange={(event) => setCaseDraft((prev) => ({ ...prev, metricsRaw: event.target.value }))}
                  />
                  <textarea
                    className="input-premium"
                    placeholder="Краткое описание результата"
                    value={caseDraft.description}
                    onChange={(event) => setCaseDraft((prev) => ({ ...prev, description: event.target.value }))}
                  />
                  <div className="flex gap-3">
                    <button className="btn-primary px-4 py-2 text-xs" type="submit">
                      {editingCaseId ? "Сохранить кейс" : "Добавить кейс"}
                    </button>
                    {editingCaseId ? (
                      <button
                        className="btn-secondary px-4 py-2 text-xs"
                        type="button"
                        onClick={() => {
                          setEditingCaseId(null);
                          setCaseDraft(emptyCaseDraft);
                        }}
                      >
                        Отмена
                      </button>
                    ) : null}
                  </div>
                </form>

                <div className="mt-4 space-y-3">
                  {cases.map((item) => (
                    <div key={item.id} className="card-premium flex items-center justify-between p-4">
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-[var(--muted)]">
                          {item.category} · {item.country}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="btn-secondary px-3 py-2 text-xs" onClick={() => startEditCase(item.id)}>
                          Редактировать
                        </button>
                        <button type="button" className="btn-secondary px-3 py-2 text-xs text-red-300 hover:text-red-200" onClick={() => deleteCase(item.id)}>
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="text-xl font-semibold">Статьи</h4>
                <form onSubmit={submitArticle} className="mt-5 grid gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
                  <input
                    className="input-premium"
                    placeholder="Заголовок"
                    value={articleDraft.title}
                    onChange={(event) => setArticleDraft((prev) => ({ ...prev, title: event.target.value }))}
                  />
                  <textarea
                    className="input-premium"
                    placeholder="Короткий анонс"
                    value={articleDraft.excerpt}
                    onChange={(event) => setArticleDraft((prev) => ({ ...prev, excerpt: event.target.value }))}
                  />
                  <textarea
                    className="input-premium"
                    placeholder="Полный текст статьи"
                    value={articleDraft.body}
                    onChange={(event) => setArticleDraft((prev) => ({ ...prev, body: event.target.value }))}
                  />
                  <div className="flex gap-3">
                    <button className="btn-primary px-4 py-2 text-xs" type="submit">
                      {editingArticleId ? "Сохранить статью" : "Добавить статью"}
                    </button>
                    {editingArticleId ? (
                      <button
                        className="btn-secondary px-4 py-2 text-xs"
                        type="button"
                        onClick={() => {
                          setEditingArticleId(null);
                          setArticleDraft(emptyArticleDraft);
                        }}
                      >
                        Отмена
                      </button>
                    ) : null}
                  </div>
                </form>

                <div className="mt-4 space-y-3">
                  {sortedArticles.map((item) => (
                    <div key={item.id} className="card-premium flex items-center justify-between p-4">
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-[var(--muted)]">{item.excerpt}</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="btn-secondary px-3 py-2 text-xs" onClick={() => startEditArticle(item.id)}>
                          Редактировать
                        </button>
                        <button type="button" className="btn-secondary px-3 py-2 text-xs text-red-300 hover:text-red-200" onClick={() => deleteArticle(item.id)}>
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
