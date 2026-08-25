import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useRecommender } from '../../context/RecommenderContext';
import { MovieCard } from '../common/MovieCard';

export const PersonalizedPreview: React.FC = () => {
  const { recommendedMovies, setActiveTab } = useRecommender();
  const previewItems = recommendedMovies.slice(0, 8);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Hybrid Recommendations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Personalized For You
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Top-N predicted titles based on collaborative user neighborhood and content vector features.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('recommendations')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-rose-400 hover:text-rose-300 transition-colors group"
        >
          <span>Open Full Recommendation Studio</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {previewItems.map((rec) => (
          <MovieCard
            key={rec.movie.id}
            movie={rec.movie}
            matchPercentage={rec.matchPercentage}
            showWhyButton={true}
          />
        ))}
      </div>
    </section>
  );
};
