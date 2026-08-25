import React, { useState, useMemo } from 'react';
import { Search, X, Star, Film, ArrowRight } from 'lucide-react';
import { useRecommender } from '../../context/RecommenderContext';
import { MOVIES_DATABASE } from '../../data/movies';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openMovieModal } = useRecommender();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return MOVIES_DATABASE.filter(m => 
      m.title.toLowerCase().includes(q) ||
      m.director.toLowerCase().includes(q) ||
      m.genres.some(g => g.toLowerCase().includes(q)) ||
      m.tags.some(t => t.toLowerCase().includes(q)) ||
      m.cast.some(c => c.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={() => setIsSearchOpen(false)} />

      <div className="relative w-full max-w-2xl bg-[#0f131f] rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden z-10">
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-rose-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by movie title, genre, director, tag, or actor..."
            className="w-full bg-transparent border-none outline-none text-slate-100 placeholder-slate-500 text-sm sm:text-base font-medium"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="px-2 py-1 rounded-md text-xs font-semibold bg-slate-800 text-slate-400 hover:text-white"
          >
            Esc
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="py-12 px-6 text-center text-slate-500">
              <Film className="w-10 h-10 mx-auto mb-3 opacity-40 text-slate-400" />
              <p className="text-sm font-semibold text-slate-300">Quick Global Movie Search</p>
              <p className="text-xs text-slate-500 mt-1">
                Type titles like "Interstellar", "Sci-Fi", "Christopher Nolan", or "Cyberpunk"
              </p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-12 px-6 text-center text-slate-400">
              <p className="text-sm font-bold text-slate-300">No movies found</p>
              <p className="text-xs text-slate-500 mt-1">
                "No movies found. Try another title or filter."
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Found {searchResults.length} matching titles
              </div>
              {searchResults.map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    openMovieModal(m);
                    setIsSearchOpen(false);
                  }}
                  className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={m.poster}
                      alt={m.title}
                      className="w-10 h-14 object-cover rounded-md bg-slate-800"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-100 group-hover:text-rose-400 transition-colors">
                        {m.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span>{m.year}</span>
                        <span>•</span>
                        <span className="text-rose-300 font-medium">{m.genres.slice(0, 2).join(', ')}</span>
                        <span>•</span>
                        <span>Dir. {m.director}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs font-semibold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{m.imdbRating}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
