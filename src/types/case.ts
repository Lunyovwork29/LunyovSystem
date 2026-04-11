export type CaseMetric = {
  value: string;
  label?: string;
};

export type CaseItem = {
  id: string;
  title: string;
  category: string;
  country: string;
  metrics: CaseMetric[];
  description: string;
  /**
   * Логотип компании (PNG/SVG/WebP).
   * Рекомендуется: положить файл в `public/cases/logos/` и указать путь от корня сайта,
   * совпадающий с `id` кейса — так проще не путаться:
   *   id: "case-1"  →  logoSrc: "/cases/logos/case-1.png"
   * Допустимы и произвольные имена: `/cases/logos/staleks.png`
   * Внешний URL тоже можно (https://...), если лого хостится не у вас.
   */
  logoSrc?: string;
};
