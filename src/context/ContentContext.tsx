"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { MOCK_CASES } from "@/data/cases.mock";
import type { CaseItem } from "@/types/case";

export type { CaseItem } from "@/types/case";
export type { CaseMetric } from "@/types/case";

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

const STORAGE_CASES_V2 = "lunev_cases_v2";
const STORAGE_CASES_V1 = "lunev_cases_v1";
const STORAGE_ARTICLES = "lunev_articles_v1";

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

type LegacyCaseV1 = {
  id: string;
  niche?: string;
  result?: string;
  points?: string[];
};

function isCaseItemV2(item: unknown): item is CaseItem {
  if (!item || typeof item !== "object") return false;
  const o = item as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.title === "string" &&
    typeof o.category === "string" &&
    typeof o.country === "string" &&
    typeof o.description === "string" &&
    Array.isArray(o.metrics)
  );
}

function migrateFromV1(raw: LegacyCaseV1): CaseItem {
  const niche = raw.niche ?? "Кейс";
  const result = raw.result ?? "—";
  const pointsText =
    Array.isArray(raw.points) && raw.points.length > 0 ? raw.points.join(" ") : "";

  return {
    id: raw.id || crypto.randomUUID(),
    title: niche,
    category: niche,
    country: "Казахстан",
    metrics: [{ value: result, label: "результат" }],
    description: pointsText,
  };
}

function normalizeStoredCases(): CaseItem[] {
  const v2 = parseStorage<unknown[] | null>(STORAGE_CASES_V2, null);
  if (Array.isArray(v2) && v2.length > 0) {
    const parsed = v2.filter(isCaseItemV2);
    if (parsed.length > 0) return parsed;
  }

  const v1 = parseStorage<LegacyCaseV1[] | null>(STORAGE_CASES_V1, null);
  if (Array.isArray(v1) && v1.length > 0) {
    return v1.map(migrateFromV1);
  }

  return MOCK_CASES;
}

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [cases, setCases] = useState<CaseItem[]>(MOCK_CASES);
  const [articles, setArticles] = useState<ArticleItem[]>(defaultArticles);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    /* Intentional: read persisted content only on the client after SSR — see https://nextjs.org/docs/app/building-your-application/rendering/client-components#using-local-storage */
    /* eslint-disable react-hooks/set-state-in-effect */
    setCases(normalizeStoredCases());
    setArticles(parseStorage(STORAGE_ARTICLES, defaultArticles));
    setStorageReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (storageReady && typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_CASES_V2, JSON.stringify(cases));
    }
  }, [cases, storageReady]);

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
