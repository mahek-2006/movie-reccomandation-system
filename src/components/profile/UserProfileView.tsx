import React from 'react';
import { useRecommender } from '../../context/RecommenderContext';
import { PRESET_PROFILES } from '../../data/userProfiles';
import { MOVIES_DATABASE } from '../../data/movies';
import { MovieCard } from '../common/MovieCard';
import { User, Bookmark, Star, Sparkles, Heart } from 'lucide-react';

export const UserProfileView: React.FC = () => {
  const { 
    selectedUser, 
    setSelectedUser, 
    watchlist, 
    userRatings, 
    rateMovie,
    setActiveTab 
  } = useRecommender();

  const watchlistMovies = MOVIES_DATABASE.filter(m => watchlist.includes(m.id));
  const ratedMoviesList = MOVIES_DATABASE.filter(m => userRatings[m.id] !== undefined);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header Profile Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0f131f] border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={selectedUser.avatar}
            alt={selectedUser.name}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-rose-500/40 shadow-2xl"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-950/50 text-rose-300 border border-rose-800/40 text-[10px] font-bold uppercase tracking-wider mb-1">
              Active Viva Persona
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {selectedUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{selectedUser.tagline}</p>
          </div>
        </div>

        {/* Switch Persona Buttons */}
        <div className="flex flex-wrap gap-2">
          {PRESET_PROFILES.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedUser(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedUser.id === p.id 
                  ? 'bg-rose-600 text-white shadow-md' 
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {p.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Genre Affinity Radar / Breakdown */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0f131f] border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span>User Taste Vector & Preferred Genres</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {Object.entries(selectedUser.tasteVector).map(([genre, weight]) => (
            <div key={genre} className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-200">{genre}</span>
                <span className="text-rose-400 font-mono">{((weight || 0) * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-rose-500 to-purple-600 rounded-full" 
                  style={{ width: `${(weight || 0) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Watchlist Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg font-bold text-white">
            <Bookmark className="w-5 h-5 text-rose-500" />
            <span>Saved Watchlist ({watchlistMovies.length} movies)</span>
          </div>
          {watchlistMovies.length > 0 && (
            <button 
              onClick={() => setActiveTab('recommendations')}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
            >
              Get More Recommendations →
            </button>
          )}
        </div>

        {watchlistMovies.length === 0 ? (
          <div className="py-12 text-center bg-[#0f131f] rounded-3xl border border-slate-800 p-6 text-slate-400 text-xs">
            Your Watchlist is empty. Browse movies and click the bookmark icon to save titles!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {watchlistMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>

      {/* Past Rated Movies Section with interactive 5-star live adjustments */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg font-bold text-white">
            <Star className="w-5 h-5 text-amber-400" />
            <span>Rated Movies & Interaction History ({ratedMoviesList.length})</span>
          </div>
          <span className="text-xs text-slate-400">
            Adjusting ratings dynamically updates collaborative recommendations!
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ratedMoviesList.map(movie => {
            const score = userRatings[movie.id] || 0;
            return (
              <div key={movie.id} className="p-4 rounded-2xl bg-[#0f131f] border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img src={movie.poster} alt={movie.title} className="w-12 h-16 rounded-lg object-cover bg-slate-800 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{movie.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{movie.year} • {movie.genres.slice(0, 2).join(', ')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {[1, 2, 3, 4, 5].map(starVal => (
                    <button
                      key={starVal}
                      onClick={() => rateMovie(movie.id, starVal)}
                      className="p-1 hover:scale-125 transition-transform"
                      title={`Change rating to ${starVal}★`}
                    >
                      <Star className={`w-4 h-4 ${starVal <= score ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
