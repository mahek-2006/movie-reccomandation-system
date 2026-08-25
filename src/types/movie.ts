export type Genre =
  | 'Action'
  | 'Adventure'
  | 'Animation'
  | 'Comedy'
  | 'Crime'
  | 'Drama'
  | 'Family'
  | 'Fantasy'
  | 'Horror'
  | 'Mystery'
  | 'Romance'
  | 'Sci-Fi'
  | 'Thriller';

export interface Movie {
  id: string;
  title: string;
  year: number;
  genres: Genre[];
  rating: number; // 0.5 - 5.0 (ML project scale)
  imdbRating: number; // 0 - 10.0 scale
  poster: string;
  backdrop: string;
  overview: string;
  director: string;
  cast: string[];
  duration: string;
  language: string;
  tags: string[];
  collaborativeScore: number; // Base latent affinity (0.0 - 1.0)
  contentScore: number;       // Base content metadata affinity (0.0 - 1.0)
  popularity: number;         // Vote count weight
  releaseDate: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  tagline: string;
  favoriteGenres: Genre[];
  ratedMovies: Record<string, number>; // movieId -> rating (1-5)
  watchlist: string[];
  tasteVector: Partial<Record<Genre, number>>;
}

export type RecommendationMethod = 'collaborative' | 'content' | 'hybrid';

export interface RecommendationResult {
  movie: Movie;
  matchPercentage: number; // e.g. 94
  hybridScore: number;     // 0.0 - 1.0
  collaborativeScore: number; // 0.0 - 1.0
  contentScore: number;       // 0.0 - 1.0
  primaryReason: string;
  collaborativeReason: string;
  contentReason: string;
  similarAttributes: string[];
}

export interface FilterOptions {
  search: string;
  genre: string;
  minRating: number;
  yearRange: [number, number];
  language: string;
  sortBy: 'recommended' | 'highest_rated' | 'most_popular' | 'newest';
}

export interface ModelMetricComparison {
  model: string;
  precision10: number;
  recall10: number;
  rmse: number;
  coverage: number;
  color: string;
  highlight?: boolean;
}
