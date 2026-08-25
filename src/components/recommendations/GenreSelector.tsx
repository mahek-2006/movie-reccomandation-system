import React from 'react';
import { Genre } from '../../types/movie';
import { useRecommender } from '../../context/RecommenderContext';
import { Check } from 'lucide-react';

const AVAILABLE_GENRES: Genre[] = [
  'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Romance', 'Animation', 'Horror', 'Adventure'
];

export const GenreSelector: React.FC = () => {
  const { selectedGenres, toggleGenre } = useRecommender();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Select your favourite genres <span className="text-rose-500">*</span>
        </label>
        <span className="text-[11px] text-slate-400">
          {selectedGenres.length} selected
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {AVAILABLE_GENRES.map((g) => {
          const isSelected = selectedGenres.includes(g);
          return (
            <button
              key={g}
              type="button"
              onClick={() => toggleGenre(g)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 border border-rose-500 scale-[1.03]'
                  : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {isSelected && <Check className="w-3.5 h-3.5" />}
              <span>{g}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
