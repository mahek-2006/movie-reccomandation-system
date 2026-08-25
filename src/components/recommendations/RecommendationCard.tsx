import React from 'react';
import { RecommendationResult } from '../../types/movie';
import { useRecommender } from '../../context/RecommenderContext';
import { Sparkles, Star, Bookmark, Check, Info, Users, Tag } from 'lucide-react';

interface RecommendationCardProps {
  result: RecommendationResult;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ result }) => {
  const { openMovieModal, toggleWatchlist, isInWatchlist } = useRecommender();
  const { movie, matchPercentage, hybridScore, collaborativeScore, contentScore, primaryReason } = result;
  const inWatchlist = isInWatchlist(movie.id);

  const getMatchBadgeStyle = (pct: number) => {
    if (pct >= 90) return 'from-rose-500 to-purple-600 text-white';
    if (pct >= 80) return 'from-indigo-500 to-cyan-500 text-white';
    return 'from-slate-700 to-slate-800 text-slate-200';
  };

  return (
    <div className="bg-[#0f131f] rounded-2xl border border-slate-800/90 hover:border-rose-500/40 p-4 sm:p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-rose-950/20 flex flex-col sm:flex-row gap-5">
      
      {/* Poster Media Box */}
      <div 
        onClick={() => openMovieModal(movie)}
        className="w-full sm:w-36 aspect-[2/3] rounded-xl overflow-hidden bg-slate-900 shrink-0 relative cursor-pointer group"
      >
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Watchlist Corner Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWatchlist(movie.id);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all ${
            inWatchlist ? 'bg-rose-600 text-white' : 'bg-black/60 text-slate-300 hover:text-white'
          }`}
          title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        >
          {inWatchlist ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
        </button>

        <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[11px] font-bold text-amber-300">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{movie.imdbRating.toFixed(1)}</span>
        </div>
      </div>

      {/* Details and Reason Column */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Header Row: Title & Match Badge */}
          <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
            <div>
              <h3 
                onClick={() => openMovieModal(movie)}
                className="text-base sm:text-lg font-bold text-white hover:text-rose-400 cursor-pointer transition-colors"
              >
                {movie.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span>{movie.year}</span>
                <span>•</span>
                <span>{movie.duration}</span>
                <span>•</span>
                <span>Dir. {movie.director}</span>
              </div>
            </div>

            <div className={`px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r ${getMatchBadgeStyle(matchPercentage)} shadow-md flex items-center gap-1`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{matchPercentage}% Match</span>
            </div>
          </div>

          {/* Genre Chips */}
          <div className="flex flex-wrap gap-1.5 my-2.5">
            {movie.genres.map(g => (
              <span key={g} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/50">
                {g}
              </span>
            ))}
          </div>

          {/* Dynamic AI Recommendation Reason Box */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-rose-950/30 via-slate-900 to-slate-900 border border-rose-500/20 my-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-400 mb-1">
              <Sparkles className="w-3 h-3 text-rose-400" />
              <span>Why this movie?</span>
            </div>
            <p className="text-xs text-slate-300 font-medium italic leading-relaxed">
              "{primaryReason}"
            </p>
          </div>

          {/* Score breakdown metrics */}
          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              <span>Collab Affinity: <strong>{(collaborativeScore * 100).toFixed(0)}%</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              <span>Content Sim: <strong>{(contentScore * 100).toFixed(0)}%</strong></span>
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-4 pt-3 flex items-center justify-between">
          <button
            onClick={() => openMovieModal(movie)}
            className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Full AI Feature Breakdown</span>
          </button>

          <button
            onClick={() => openMovieModal(movie)}
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
          >
            View Details
          </button>
        </div>
      </div>

    </div>
  );
};
