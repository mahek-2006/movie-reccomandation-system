import React from 'react';
import { FilterOptions, Genre } from '../../types/movie';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  onReset: () => void;
}

const GENRE_OPTIONS: (Genre | 'All')[] = [
  'All', 'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'
];

const LANGUAGE_OPTIONS = ['All', 'English', 'Korean', 'Japanese'];

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, setFilters, onReset }) => {
  return (
    <div className="bg-[#0f131f] p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-5">
      
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          placeholder="Search movies by title, director, or tag..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
        />
      </div>

      {/* Filter Row: Genre, Rating, Language, Sort */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Genre Selector */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            Genre
          </label>
          <select
            value={filters.genre}
            onChange={(e) => setFilters(prev => ({ ...prev, genre: e.target.value }))}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-rose-500"
          >
            {GENRE_OPTIONS.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Min IMDb Rating */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            <span>Min Rating</span>
            <span className="text-amber-400">{filters.minRating > 0 ? `${filters.minRating}★+` : 'Any'}</span>
          </div>
          <select
            value={filters.minRating}
            onChange={(e) => setFilters(prev => ({ ...prev, minRating: parseFloat(e.target.value) }))}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-rose-500"
          >
            <option value="0">All Ratings</option>
            <option value="7.5">7.5+ IMDb</option>
            <option value="8.0">8.0+ IMDb (Great)</option>
            <option value="8.5">8.5+ IMDb (Masterpiece)</option>
          </select>
        </div>

        {/* Language Filter */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            Language
          </label>
          <select
            value={filters.language}
            onChange={(e) => setFilters(prev => ({ ...prev, language: e.target.value }))}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-rose-500"
          >
            {LANGUAGE_OPTIONS.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-rose-500"
          >
            <option value="recommended">Recommended (Hybrid)</option>
            <option value="highest_rated">Highest Rated</option>
            <option value="most_popular">Most Popular</option>
            <option value="newest">Newest Release</option>
          </select>
        </div>

      </div>

      {/* Reset Action */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    </div>
  );
};
