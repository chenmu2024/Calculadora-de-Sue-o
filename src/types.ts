export type CalculationMode = 'wake_time' | 'bed_time' | 'sleep_now';

export interface SleepCycleResult {
  time: string; // e.g., "06:30 AM" or "23:15"
  time24: string; // "06:30"
  cycles: number; // e.g. 5 or 6
  cycleLengthMinutes?: number; // e.g. 90, 85, 95
  totalMinutes: number; // e.g. 465 (7h 45m including 15m latency)
  hours: number; // e.g. 7.5
  hoursFormatted: string; // "7h 30m"
  qualityTag: 'optimal' | 'recommended' | 'good' | 'minimum' | 'short';
  badgeText: string; // "Óptimo (5 Ciclos)", "Excelente (6 Ciclos)"
  description: string;
}

export interface AgeGroupConfig {
  id: string;
  name: string;
  ageRange: string;
  recHoursMin: number;
  recHoursMax: number;
  recCyclesMin: number;
  recCyclesMax: number;
  description: string;
  tips: string[];
}

export interface AppReview {
  id: string;
  name: string;
  score: number;
  badge?: string;
  price: string;
  platforms: string[];
  description: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  hasAdidasRuntasticRelation?: boolean;
}

export interface ProductRecommendation {
  id: string;
  name: string;
  category: 'almohadas' | 'suplementos' | 'colchones' | 'antifaces' | 'ruido_blanco';
  price: string;
  rating: number;
  reviewsCount: number;
  description: string;
  badge: string;
  pros: string[];
}

export interface Article {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  date: string;
  datePublished: string;
  dateModified: string;
  readTime: string;
  category: string;
  targetKeywords: string[];
  summary: string;
  contentMarkdown: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  keywordMatched: string;
  category?: 'Algoritmo y Calculadora' | 'Salud y Fisiología' | 'Hábitos y Estilo de Vida' | 'Apps y Comparativas';
  actionLink?: {
    label: string;
    targetId: string; // e.g. "test-cronotipo", "calculadora-cafeina", "diario-sueno"
  };
}
