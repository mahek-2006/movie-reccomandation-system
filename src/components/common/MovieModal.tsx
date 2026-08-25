import React from 'react';
import { 
  X, Star, Bookmark, Check, Sparkles, Languages, UserCheck, Film, BrainCircuit, Share2
} from 'lucide-react';
import { useRecommender } from '../../context/RecommenderContext';
import { getSimilarMovies, calculateCollaborativeScore, calculateContentScore } from '../../services/recommendationEngine';

export const MovieModal: React.FC = () => {
  const { 
    activeModalMovie, 
    closeMovieModal, 
    watchlist, 
    toggleWatchlist, 
    userRatings, 
    rateMovie,
    selectedGenres,
    selectedUser,
    addToast
  } = useRecommender();

  if (!activeModalMovie) return null;

  const movie = activeModalMovie;
  const inWatchlist = watchlist.includes(movie.id);
  const userCurrentRating = userRatings[movie.id] || 0;
  const similarMovies = getSimilarMovies(movie, 4);

  const cbAnalysis = calculateContentScore(movie, selectedGenres, selectedUser.tasteVector, userRatings);
  const cfAnalysis = calculateCollaborativeScore(movie, userRatings);
  const hybridScoreEstimate = Math.round(((cfAnalysis.score * 0.6) + (cbAnalysis.score * 0.4)) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={closeMovieModal} />

      <div className="relative w-full max-w-4xl bg-[#0d101a] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Backdrop Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img
            src={movie.backdrop || movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover opacity-60"
            onError={(e) => { (e.target as HTMLImageElement).src = movie.poster; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d101a] via-[#0d101a]/60 to-transparent" />
          
          <button
            onClick={closeMovieModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="relative px-6 sm:px-10 pb-10 -mt-32">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            
            <div className="w-36 sm:w-48 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700/80 bg-slate-800 shrink-0">
              <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-600/90 text-white border border-rose-500/30">
                  {movie.year}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {movie.duration}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                  <Languages className="w-3.5 h-3.5" />
                  {movie.language}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {movie.title}
              </h1>

              <div className="flex flex-wrap gap-2 mt-3">
                {movie.genres.map(g => (
                  <span key={g} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-950/50 text-rose-300 border border-rose-800/40">
                    {g}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 mt-4 pt-3 border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`w-5 h-5 ${star <= Math.round(movie.imdbRating / 2) ? 'fill-amber-400' : 'text-slate-600'}`} />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-200">{movie.imdbRating} / 10 IMDb</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-bold bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-800/30">
                  <BrainCircuit className="w-4 h-4" />
                  <span>Predicted Match: {hybridScoreEstimate}%</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-5">
                <button
                  onClick={() => toggleWatchlist(movie.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    inWatchlist ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30' : 'bg-white text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {inWatchlist ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  <span>{inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}</span>
                </button>

                <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-2 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-medium">Your Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((ratingVal) => (
                      <button
                        key={ratingVal}
                        onClick={() => rateMovie(movie.id, ratingVal)}
                        className="p-0.5 hover:scale-125 transition-transform"
                        title={`Rate ${ratingVal} Stars`}
                      >
                        <Star className={`w-4 h-4 ${ratingVal <= userCurrentRating ? 'fill-amber-400 text-amber-400' : 'text-slate-600 hover:text-amber-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    addToast('Project link copied to clipboard!', 'info');
                  }}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Share Movie"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* AI Explanation Card */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-rose-950/30 via-purple-950/20 to-slate-900/60 border border-rose-500/20">
            <div className="flex items-center gap-2 text-sm font-bold text-rose-400 mb-2">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>Why We Recommend This (CineAI Hybrid Engine)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Recommended because this movie shares strong collaborative affinity with your highly rated titles and exhibits significant cosine similarity with your preferred genres (<span className="text-rose-300 font-semibold">{movie.genres.join(', ')}</span>).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-800/80">
              <div className="flex items-start gap-2.5 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span><strong>Collaborative Signal:</strong> {cfAnalysis.reason}</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span><strong>Content-Based Signal:</strong> {cbAnalysis.reason}</span>
              </div>
            </div>
          </div>

          {/* Plot Overview & Cast */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Film className="w-4 h-4 text-rose-500" />
                <span>Plot Synopsis</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">{movie.overview}</p>

              <div className="pt-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Feature Tags and Descriptors</h4>
                <div className="flex flex-wrap gap-1.5">
                  {movie.tags.map(t => (
                    <span key={t} className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 border border-slate-700/50">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Director</span>
                <span className="text-sm font-bold text-slate-200 mt-0.5 block">{movie.director}</span>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-1">Key Cast</span>
                <ul className="text-xs text-slate-300 space-y-1">
                  {movie.cast.map(actor => (
                    <li key={actor} className="flex items-center gap-1.5">
                      <UserCheck className="w-3 h-3 text-rose-400" />
                      <span>{actor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Similar Movies */}
          <div className="mt-10 pt-8 border-t border-slate-800">
            <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>Similar Movies You Might Like</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {similarMovies.map(sim => (
                <div 
                  key={sim.id}
                  onClick={() => { addToast(`Selected "${sim.title}"`, 'info'); }}
                  className="group bg-slate-900 rounded-xl p-2 border border-slate-800 hover:border-rose-500/50 cursor-pointer transition-all"
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-slate-800 mb-2">
                    <img src={sim.poster} alt={sim.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-200 line-clamp-1 group-hover:text-rose-400">{sim.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{sim.year} • {sim.genres[0]}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
