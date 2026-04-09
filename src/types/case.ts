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
};
