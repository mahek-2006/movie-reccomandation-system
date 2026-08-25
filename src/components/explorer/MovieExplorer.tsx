import React, { useState, useMemo } from 'react';
import { FilterOptions } from '../../types/movie';
import { MOVIES_DATABASE } from '../../data/movies';
import { FilterPanel } from './FilterPanel';
import { MovieCard } from '../common/MovieCard';
import { Film, Sparkles, Frown } from 'lucide-react';

const INITIAL_FILTERS: FilterOptions = {
  search: '',
  genre: 'All',
  minRating: 0,
  yearRange: [1970, 2026],
  language: 'All',
  sortBy: 'recommended'
};

export const MovieExplorer: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>(INITIAL_FILTERS);

  const filteredMovies = useMemo(() => {
    return MOVIES_DATABASE.filter(m => {
      // Search match
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        const matchTitle = m.title.toLowerCase().includes(q);
        const matchDirector = m.director.toLowerCase().includes(q);
        const matchTag = m.tags.some(t => t.toLowerCase().includes(q));
        const matchGenre = m.genres.some(g => g.toLowerCase().includes(q));
        if (!matchTitle && !matchDirector && !matchTag && !matchGenre) return false;
      }

      // Genre filter
      if (filters.genre !== 'All' && !m.genres.includes(filters.genre as any)) {
        return false;
      }

      // Rating filter
      if (filters.minRating > 0 && m.imdbRating < filters.minRating) {
        return false;
      }

      // Language filter
      if (filters.language !== 'All' && m.language !== filters.language) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'highest_rated') return b.imdbRating - a.imdbRating;
      if (filters.sortBy === 'most_popular') return b.popularity - a.popularity;
      if (filters.sortBy === 'newest') return b.year - a.year;
      return (b.collaborativeScore + b.contentScore) - (a.collaborativeScore + a.contentScore);
    });
  }, [filters]);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-widest mb-1.5">
          <Film className="w-4 h-4 text-rose-400" />
          <span>Movie Explorer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Browse Movie Catalog
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Explore curated cinematic titles with comprehensive metadata, feature tags, and predicted ratings.
        </p>
      </div>

      {/* Filter Bar */}
      <FilterPanel 
        filters={filters} 
        setFilters={setFilters} 
        onReset={() => setFilters(INITIAL_FILTERS)} 
      />

      {/* Catalog Grid View */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filteredMovies.length} of {MOVIES_DATABASE.length} Movies</span>
          <span>Sorted by: {filters.sortBy.replace('_', ' ')}</span>
        </div>

        {filteredMovies.length === 0 ? (
          <div className="py-20 text-center bg-[#0f131f] rounded-3xl border border-slate-800 p-8">
            <Frown className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-200">No movies found. Try another title.</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              We couldn't find any movie matching your active filters. Try adjusting the search keywords or resetting filters.
            </p>
            <button
              onClick={() => setFilters(INITIAL_FILTERS)}
              className="mt-5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} showWhyButton={true} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
