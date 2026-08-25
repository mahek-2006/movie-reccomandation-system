import { Movie, Genre, UserProfile, RecommendationMethod, RecommendationResult } from '../types/movie';
import { MOVIES_DATABASE } from '../data/movies';

/**
 * Calculates Content-Based Similarity between a user taste profile/selected genres and a movie.
 * Uses Cosine / Jaccard similarity over genre vectors and keyword tags.
 */
export function calculateContentScore(
  movie: Movie,
  selectedGenres: Genre[],
  userTasteVector: Partial<Record<Genre, number>> = {},
  userRatedMovies: Record<string, number> = {}
): { score: number; reason: string; matchingGenres: string[] } {
  const movieGenres = movie.genres;
  
  // 1. Genre Overlap
  const matchingGenres = movieGenres.filter(g => selectedGenres.includes(g));
  let genreScore = 0;
  if (selectedGenres.length > 0) {
    genreScore = matchingGenres.length / Math.sqrt(selectedGenres.length * movieGenres.length || 1);
  }

  // 2. Taste Vector Weighting
  let tasteWeight = 0;
  let tasteCount = 0;
  movieGenres.forEach(g => {
    if (userTasteVector[g]) {
      tasteWeight += userTasteVector[g]!;
      tasteCount++;
    }
  });
  const avgTaste = tasteCount > 0 ? tasteWeight / tasteCount : 0.6;

  // 3. User past highly-rated movies keyword affinity
  let tagBoost = 0;
  const highlyRatedIds = Object.entries(userRatedMovies)
    .filter(([_, r]) => r >= 4)
    .map(([id]) => id);
  
  const highlyRatedMovies = MOVIES_DATABASE.filter(m => highlyRatedIds.includes(m.id));
  const userFavoriteTags = new Set(highlyRatedMovies.flatMap(m => m.tags));
  const sharedTags = movie.tags.filter(t => userFavoriteTags.has(t));
  tagBoost = Math.min(0.25, (sharedTags.length * 0.05));

  // Combine Content Signals
  const rawScore = (genreScore * 0.45) + (avgTaste * 0.35) + (movie.contentScore * 0.10) + (tagBoost * 0.10);
  const normalizedScore = Math.min(0.99, Math.max(0.20, rawScore));

  // Build Explanations
  let reason = '';
  if (matchingGenres.length > 0) {
    reason = `Matches your affinity for ${matchingGenres.slice(0, 2).join(' & ')}`;
  } else {
    reason = `Aligned with your preferred themes and cinematic style`;
  }

  return {
    score: Number(normalizedScore.toFixed(3)),
    reason,
    matchingGenres
  };
}

/**
 * Calculates Collaborative Filtering Score based on user rating history,
 * simulated matrix factorization latent factor dot product, and neighbor consensus.
 */
export function calculateCollaborativeScore(
  movie: Movie,
  userRatedMovies: Record<string, number> = {}
): { score: number; reason: string } {
  // If user already rated this movie with 5 stars
  const userDirectRating = userRatedMovies[movie.id];
  let ratingBoost = 0;
  if (userDirectRating) {
    ratingBoost = (userDirectRating / 5.0) * 0.2;
  }

  // Simulate neighborhood similarity based on co-rated items
  let coRatingAffinity = 0.5;
  const ratedKeys = Object.keys(userRatedMovies);
  if (ratedKeys.length > 0) {
    const relatedCount = MOVIES_DATABASE.filter(m => 
      ratedKeys.includes(m.id) && m.genres.some(g => movie.genres.includes(g))
    ).length;
    coRatingAffinity = Math.min(0.98, 0.55 + (relatedCount * 0.08));
  }

  const baseCollab = movie.collaborativeScore;
  const combined = (baseCollab * 0.55) + (coRatingAffinity * 0.35) + ratingBoost;
  const score = Math.min(0.99, Math.max(0.25, combined));

  // Dynamic Collaborative Reason
  const highRated = MOVIES_DATABASE.filter(m => (userRatedMovies[m.id] || 0) >= 4);
  let reason = '';
  if (highRated.length >= 2) {
    const sample = highRated.slice(0, 2).map(m => m.title).join(' & ');
    reason = `Because you rated ${sample} highly`;
  } else if (highRated.length === 1) {
    reason = `Similar audience engagement to ${highRated[0].title}`;
  } else {
    reason = `Highly recommended by users with similar viewing patterns`;
  }

  return {
    score: Number(score.toFixed(3)),
    reason
  };
}

/**
 * Main Hybrid Recommendation Engine
 * Combines Collaborative & Content-Based scores using dynamic weight alpha:
 * S_hybrid = alpha * S_collab + (1 - alpha) * S_content
 */
export function generateRecommendations(
  movies: Movie[],
  selectedGenres: Genre[],
  method: RecommendationMethod,
  hybridWeight: number = 0.6, // Default alpha = 0.6 (60% CF, 40% CB)
  userProfile?: UserProfile,
  customRatings: Record<string, number> = {}
): RecommendationResult[] {
  const ratedMovies = { ...(userProfile?.ratedMovies || {}), ...customRatings };
  const tasteVector = userProfile?.tasteVector || {};

  const results: RecommendationResult[] = movies.map(movie => {
    const cb = calculateContentScore(movie, selectedGenres, tasteVector, ratedMovies);
    const cf = calculateCollaborativeScore(movie, ratedMovies);

    let effectiveScore = 0;
    let primaryReason = '';

    if (method === 'collaborative') {
      effectiveScore = cf.score;
      primaryReason = cf.reason;
    } else if (method === 'content') {
      effectiveScore = cb.score;
      primaryReason = cb.reason;
    } else {
      // Hybrid
      const alpha = hybridWeight;
      effectiveScore = (alpha * cf.score) + ((1 - alpha) * cb.score);
      
      // Dynamic Hybrid Reason
      if (alpha >= 0.7) {
        primaryReason = `${cf.reason} (Collaborative affinity: ${(cf.score * 100).toFixed(0)}%)`;
      } else if (alpha <= 0.3) {
        primaryReason = `${cb.reason} (Content feature match: ${(cb.score * 100).toFixed(0)}%)`;
      } else {
        primaryReason = `${cf.reason} • ${cb.reason}`;
      }
    }

    // Match percentage (scaled 75% to 99% for top tier demonstration)
    const matchPercentage = Math.round(72 + (effectiveScore * 27));

    return {
      movie,
      matchPercentage: Math.min(99, Math.max(65, matchPercentage)),
      hybridScore: Number(effectiveScore.toFixed(3)),
      collaborativeScore: cf.score,
      contentScore: cb.score,
      primaryReason,
      collaborativeReason: cf.reason,
      contentReason: cb.reason,
      similarAttributes: [...cb.matchingGenres, ...movie.tags.slice(0, 3)]
    };
  });

  // Sort by final score descending
  results.sort((a, b) => b.hybridScore - a.hybridScore);

  return results;
}

/**
 * Gets nearest-neighbor similar movies for the Movie Details modal
 */
export function getSimilarMovies(targetMovie: Movie, limit: number = 4): Movie[] {
  const targetGenres = new Set(targetMovie.genres);
  const targetTags = new Set(targetMovie.tags);

  return MOVIES_DATABASE
    .filter(m => m.id !== targetMovie.id)
    .map(m => {
      const genreOverlap = m.genres.filter(g => targetGenres.has(g)).length;
      const tagOverlap = m.tags.filter(t => targetTags.has(t)).length;
      const score = (genreOverlap * 2.0) + (tagOverlap * 1.5) + (m.rating * 0.5);
      return { movie: m, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.movie);
}
