import React, { useState } from 'react';
import { Star, Bookmark, Info, Sparkles, Check } from 'lucide-react';
import { Movie } from '../../types/movie';
import { useRecommender } from '../../context/RecommenderContext';

interface MovieCardProps {
  movie: Movie;
  matchPercentage?: number;
  badgeLabel?: string;
  showWhyButton?: boolean;
  onWhyClick?: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  matchPercentage,
  badgeLabel,
  showWhyButton = true,
  onWhyClick
}) => {
  const { openMovieModal, toggleWatchlist, isInWatchlist } = useRecommender();
  const [imageError, setImageError] = useState(false);
  const inWatchlist = isInWatchlist(movie.id);

  const getMatchColor = (pct: number) => {
    if (pct >= 90) return 'from-rose-500 to-purple-600 text-white shadow-rose-500/20';
    if (pct >= 80) return 'from-indigo-500 to-cyan-500 text-white shadow-indigo-500/20';
    return 'from-slate-700 to-slate-800 text-slate-200 shadow-slate-900/30';
  };

  return (
    <div className="group relative bg-[#0f131f] rounded-2xl border border-slate-800/90 hover:border-rose-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-rose-950/30 flex flex-col overflow-hidden">
      
      {/* Poster Media Box */}
      <div 
        onClick={() => openMovieModal(movie)}
        className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900 cursor-pointer"
      >
        {!imageError ? (
          <img
            src={movie.poster}
            alt={movie.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-slate-900 via-slate-850 to-rose-950/40">
            <Sparkles className="w-8 h-8 text-rose-500 mb-2 opacity-80" />
            <h4 className="font-bold text-sm text-slate-200 line-clamp-2">{movie.title}</h4>
            <p className="text-[11px] text-slate-400 mt-1">{movie.year} • {movie.genres[0]}</p>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0f131f] via-transparent to-black/40 opacity-70 group-hover:opacity-40 transition-opacity" />

        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {matchPercentage ? (
            <div className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-gradient-to-r ${getMatchColor(matchPercentage)} shadow-lg flex items-center gap-1 border border-white/20 backdrop-blur-md`}>
              <Sparkles className="w-3 h-3" />
              <span>{matchPercentage}% Match</span>
            </div>
          ) : badgeLabel ? (
            <div className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-600/90 text-white shadow-lg border border-white/20 backdrop-blur-md">
              {badgeLabel}
            </div>
          ) : (
            <div className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-black/60 text-slate-200 backdrop-blur-md border border-white/10">
              {movie.year}
            </div>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWatchlist(movie.id);
            }}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
              inWatchlist
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/40 scale-105'
                : 'bg-black/60 text-slate-300 hover:text-white hover:bg-black/90 border border-white/10'
            }`}
            title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          >
            {inWatchlist ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/70 backdrop-blur-md text-[11px] text-amber-300 font-semibold border border-white/10">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{movie.imdbRating.toFixed(1)}</span>
          <span className="text-slate-400 font-normal">/ 10</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {movie.genres.slice(0, 2).map((g) => (
              <span 
                key={g} 
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50"
              >
                {g}
              </span>
            ))}
            {movie.genres.length > 2 && (
              <span className="text-[10px] text-slate-400 self-center">
                +{movie.genres.length - 2}
              </span>
            )}
          </div>

          <h3 
            onClick={() => openMovieModal(movie)}
            className="font-bold text-slate-100 text-base line-clamp-1 hover:text-rose-400 cursor-pointer transition-colors"
          >
            {movie.title}
          </h3>

          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {movie.overview}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          {showWhyButton && (
            <button
              onClick={() => (onWhyClick ? onWhyClick() : openMovieModal(movie))}
              className="text-[11px] font-medium text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Why this movie?</span>
            </button>
          )}

          <button
            onClick={() => openMovieModal(movie)}
            className="ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
