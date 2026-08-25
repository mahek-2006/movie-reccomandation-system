import { ModelMetricComparison } from '../types/movie';

export const DATASET_STATS = {
  users: '160,000+',
  movies: '60,000+',
  ratings: '25,000,000+',
  ratingScale: '0.5 – 5.0 (0.5 increments)',
  trainSplit: '80%',
  valSplit: '10%',
  testSplit: '10%',
  benchmarkDataset: 'MovieLens 25M (Standard ML Benchmark)',
  sparsity: '99.74%',
  avgRatingsPerUser: 156.2
};

export const CORE_EVALUATION_METRICS = {
  rmse: {
    value: 0.83,
    baseline: 1.02,
    explanation: 'Lower RMSE indicates better rating prediction accuracy (Standard Root Mean Squared Error).'
  },
  recall10: {
    value: 0.29,
    baseline: 0.14,
    explanation: 'Measures what fraction of relevant movies were captured in the Top-10 recommendation list.'
  },
  coverage: {
    value: '87%',
    explanation: 'Catalog exploration breadth indicating 87% of all items have a probability of being recommended.'
  },
  hybridSummary: {
    model: 'Hybrid Model',
    precision10: 0.41,
    recall10: 0.29,
    rmse: 0.83,
    coverage: '87%'
  }
};

export const MODEL_COMPARISON_DATA: ModelMetricComparison[] = [
  {
    model: 'Popularity Baseline',
    precision10: 0.18,
    recall10: 0.14,
    rmse: 1.02,
    coverage: 24,
    color: '#64748b',
    highlight: false
  },
  {
    model: 'Content-Based',
    precision10: 0.27,
    recall10: 0.21,
    rmse: 0.94,
    coverage: 62,
    color: '#38bdf8',
    highlight: false
  },
  {
    model: 'Collaborative Filtering',
    precision10: 0.33,
    recall10: 0.25,
    rmse: 0.87,
    coverage: 73,
    color: '#a855f7',
    highlight: false
  },
  {
    model: 'Hybrid (CineAI)',
    precision10: 0.41,
    recall10: 0.29,
    rmse: 0.83,
    coverage: 87,
    color: '#e11d48',
    highlight: true
  }
];

export const RATING_DISTRIBUTION_DATA = [
  { rating: '0.5★', count: 0.4, fill: '#475569' },
  { rating: '1.0★', count: 0.9, fill: '#475569' },
  { rating: '1.5★', count: 1.2, fill: '#64748b' },
  { rating: '2.0★', count: 2.1, fill: '#64748b' },
  { rating: '2.5★', count: 3.4, fill: '#0284c7' },
  { rating: '3.0★', count: 5.6, fill: '#0284c7' },
  { rating: '3.5★', count: 6.8, fill: '#8b5cf6' },
  { rating: '4.0★', count: 7.2, fill: '#a855f7' },
  { rating: '4.5★', count: 4.8, fill: '#e11d48' },
  { rating: '5.0★', count: 3.9, fill: '#f43f5e' }
];

export const GENRE_DISTRIBUTION_DATA = [
  { genre: 'Drama', count: 25.6, share: '28%' },
  { genre: 'Comedy', count: 16.8, share: '18%' },
  { genre: 'Action', count: 12.4, share: '14%' },
  { genre: 'Thriller', count: 9.8, share: '11%' },
  { genre: 'Sci-Fi', count: 7.5, share: '8%' },
  { genre: 'Adventure', count: 6.9, share: '7%' },
  { genre: 'Romance', count: 6.2, share: '7%' },
  { genre: 'Animation', count: 4.1, share: '4%' },
  { genre: 'Horror', count: 3.8, share: '4%' },
  { genre: 'Mystery', count: 3.2, share: '3%' }
];
