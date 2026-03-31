"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CaseItem = {
  id: string;
  niche: string;
  result: string;
  points: string[];
};

export type ArticleItem = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  createdAt: string;
};

type CasePayload = Omit<CaseItem, "id">;
type ArticlePayload = Omit<ArticleItem, "id" | "createdAt">;

type ContentContextType = {
  cases: CaseItem[];
  articles: ArticleItem[];
  addCase: (payload: CasePayload) => void;
  updateCase: (id: string, payload: CasePayload) => void;
  deleteCase: (id: string) => void;
  addArticle: (payload: ArticlePayload) => void;
  updateArticle: (id: string, payload: ArticlePayload) => void;
  deleteArticle: (id: string) => void;
};

const STORAGE_CASES = "lunev_cases_v1";
const STORAGE_ARTICLES = "lunev_articles_v1";

const defaultCases: CaseItem[] = [
  {
    id: "case-1",
    niche: "Мужская клиника",
    result: "+3.2 млн ₸ за месяц",
    points: [
      "Внедрили скрипты продаж",
      "Сократили время ответа с 40 минут до 5 минут",
      "Настроили контроль менеджеров",
    ],
  },
  {
    id: "case-2",
    niche: "Онлайн-магазин",
    result: "x2 рост конверсии",
    points: [
      "Переписали воронку продаж",
      "Внедрили CRM и контроль заявок",
      "Убрали слив клиентов",
    ],
  },
  {
    id: "case-3",
    niche: "Услуги (B2C)",
    result: "+70% к выручке",
    points: [
      "Построили отдел продаж с нуля",
      "Ввели KPI и систему контроля",
      "Настроили обучение менеджеров",
    ],
  },
];

const defaultArticles: ArticleItem[] = [
  {
    id: "article-1",
    title: "Почему CRM не работает в 80% компаний",
    excerpt: "Разбираем 5 системных ошибок внедрения и как превратить CRM в инструмент роста.",
    body: "Большинство компаний внедряют CRM как таблицу, а не как управленческую систему. Нужны процессы, SLA, контроль и единые стандарты работы менеджеров.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "article-2",
    title: "Как убрать потери лидов за 14 дней",
    excerpt: "Практический план по скорости ответа, скриптам и регламентам, который сразу влияет на выручку.",
    body: "Первый шаг - прозрачность воронки. Второй - дисциплина обработки заявок. Третий - контроль качества звонков и касаний.",
    createdAt: new Date().toISOString(),
  },
];

const ContentContext = createContext<ContentContextType | null>(null);

function parseStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [cases, setCases] = useState<CaseItem[]>(() => parseStorage(STORAGE_CASES, defaultCases));
  const [articles, setArticles] = useState<ArticleItem[]>(() =>
    parseStorage(STORAGE_ARTICLES, defaultArticles)
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_CASES, JSON.stringify(cases));
    }
  }, [cases]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_ARTICLES, JSON.stringify(articles));
    }
  }, [articles]);

  const value = useMemo<ContentContextType>(
    () => ({
      cases,
      articles,
      addCase: (payload) => {
        setCases((prev) => [{ id: crypto.randomUUID(), ...payload }, ...prev]);
      },
      updateCase: (id, payload) => {
        setCases((prev) => prev.map((item) => (item.id === id ? { id, ...payload } : item)));
      },
      deleteCase: (id) => {
        setCases((prev) => prev.filter((item) => item.id !== id));
      },
      addArticle: (payload) => {
        setArticles((prev) => [
          { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...payload },
          ...prev,
        ]);
      },
      updateArticle: (id, payload) => {
        setArticles((prev) =>
          prev.map((item) =>
            item.id === id
              ? { ...item, title: payload.title, excerpt: payload.excerpt, body: payload.body }
              : item
          )
        );
      },
      deleteArticle: (id) => {
        setArticles((prev) => prev.filter((item) => item.id !== id));
      },
    }),
    [articles, cases]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used inside ContentProvider");
  }
  return context;
}
