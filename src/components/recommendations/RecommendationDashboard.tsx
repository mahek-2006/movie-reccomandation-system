import React from 'react';
import { useRecommender } from '../../context/RecommenderContext';
import { GenreSelector } from './GenreSelector';
import { MethodSelector } from './MethodSelector';
import { RecommendationCard } from './RecommendationCard';
import { Sparkles, RefreshCw, Cpu, CheckCircle2 } from 'lucide-react';
import { PRESET_PROFILES } from '../../data/userProfiles';

export const RecommendationDashboard: React.FC = () => {
  const { 
    recommendedMovies, 
    isGenerating, 
    triggerGenerateRecommendations,
    selectedUser,
    setSelectedUser,
    recommendationMethod,
    hybridWeight
  } = useRecommender();

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-widest mb-1.5">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span>AI Recommender Studio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Your Recommendations
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Personalized Top-N candidate ranking calculated in real time using hybrid collaborative & content signals.
          </p>
        </div>

        {/* Persona Switcher Selector */}
        <div className="flex items-center gap-3 bg-[#0f131f] p-2 rounded-2xl border border-slate-800">
          <img src={selectedUser.avatar} alt={selectedUser.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-rose-500/50" />
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Persona</div>
            <div className="text-xs sm:text-sm font-bold text-white">{selectedUser.name}</div>
          </div>
          <div className="flex gap-1 ml-2 border-l border-slate-800 pl-3">
            {PRESET_PROFILES.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedUser(p)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                  selectedUser.id === p.id 
                    ? 'bg-rose-600 text-white shadow-md' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
                title={p.tagline}
              >
                {p.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Control Panel: Genres + Algorithm Method */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 rounded-3xl bg-[#0d101a] border border-slate-800/90 shadow-2xl">
        <div className="lg:col-span-6 space-y-6">
          <GenreSelector />
        </div>
        <div className="lg:col-span-6 space-y-6">
          <MethodSelector />
        </div>

        {/* Generate Recommendations Action Bar */}
        <div className="lg:col-span-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-rose-400" />
            <span>
              Engine: <strong className="text-slate-200 capitalize">{recommendationMethod}</strong> 
              {recommendationMethod === 'hybrid' && ` (α=${hybridWeight.toFixed(2)})`} • 
              Active Catalog: <strong className="text-slate-200">28+ High-Res Titles</strong>
            </span>
          </div>

          <button
            onClick={triggerGenerateRecommendations}
            disabled={isGenerating}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm shadow-xl shadow-rose-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Computing ML Vectors...' : 'Generate Recommendations'}</span>
          </button>
        </div>
      </div>

      {/* Generated Results Stream */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Top-N Recommended Movies ({recommendedMovies.length} results)</span>
          </div>
          <span className="text-xs text-slate-400">
            Ranked by Hybrid Score Descending
          </span>
        </div>

        {isGenerating ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-12">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="h-44 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedMovies.map((result) => (
              <RecommendationCard key={result.movie.id} result={result} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
