"use client";

import { FormEvent, useMemo, useState } from "react";
import { useContent } from "@/context/ContentContext";

const ADMIN_LOGIN = "admin";
const ADMIN_PASSWORD = "1234";

type CaseDraft = {
  niche: string;
  result: string;
  pointsRaw: string;
};

type ArticleDraft = {
  title: string;
  excerpt: string;
  body: string;
};

const emptyCaseDraft: CaseDraft = { niche: "", result: "", pointsRaw: "" };
const emptyArticleDraft: ArticleDraft = { title: "", excerpt: "", body: "" };

function parsePoints(raw: string) {
  return raw
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
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

  const openEditor = () => setOpen(true);
  const closeEditor = () => setOpen(false);

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
    setCaseDraft({ niche: item.niche, result: item.result, pointsRaw: item.points.join("\n") });
  };

  const submitCase = (event: FormEvent) => {
    event.preventDefault();
    const payload = {
      niche: caseDraft.niche.trim(),
      result: caseDraft.result.trim(),
      points: parsePoints(caseDraft.pointsRaw),
    };
    if (!payload.niche || !payload.result || payload.points.length === 0) return;

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
      <button
        type="button"
        onClick={openEditor}
        className="fixed bottom-6 left-6 z-40 rounded border border-[rgba(200,169,110,0.35)] bg-[rgba(9,9,9,0.82)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)] backdrop-blur-md transition hover:border-[var(--accent)] hover:bg-[rgba(200,169,110,0.1)]"
      >
        Admin
      </button>

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
                    placeholder="Ниша"
                    value={caseDraft.niche}
                    onChange={(event) => setCaseDraft((prev) => ({ ...prev, niche: event.target.value }))}
                  />
                  <input
                    className="input-premium"
                    placeholder="Результат"
                    value={caseDraft.result}
                    onChange={(event) => setCaseDraft((prev) => ({ ...prev, result: event.target.value }))}
                  />
                  <textarea
                    className="input-premium"
                    placeholder="Пункты, каждый с новой строки"
                    value={caseDraft.pointsRaw}
                    onChange={(event) => setCaseDraft((prev) => ({ ...prev, pointsRaw: event.target.value }))}
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
                        <p className="font-semibold">{item.niche}</p>
                        <p className="text-sm text-[var(--muted)]">{item.result}</p>
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
