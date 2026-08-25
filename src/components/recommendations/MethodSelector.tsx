import React from 'react';
import { RecommendationMethod } from '../../types/movie';
import { useRecommender } from '../../context/RecommenderContext';
import { Users, Tag, Sparkles, Sliders } from 'lucide-react';

export const MethodSelector: React.FC = () => {
  const { 
    recommendationMethod, 
    setRecommendationMethod, 
    hybridWeight, 
    setHybridWeight 
  } = useRecommender();

  const methods: { id: RecommendationMethod; label: string; desc: string; icon: React.ComponentType<any> }[] = [
    {
      id: 'collaborative',
      label: 'Collaborative Filtering',
      desc: 'Based on user ratings and peer interaction matrices',
      icon: Users
    },
    {
      id: 'content',
      label: 'Content-Based',
      desc: 'Based on movie genres, tags, plot keywords & features',
      icon: Tag
    },
    {
      id: 'hybrid',
      label: 'Hybrid',
      desc: 'Combines collaborative + content signals (Default)',
      icon: Sparkles
    }
  ];

  return (
    <div className="space-y-4">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
        Recommendation Method
      </label>

      {/* 3 selectable method cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {methods.map((m) => {
          const Icon = m.icon;
          const isSelected = recommendationMethod === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setRecommendationMethod(m.id)}
              className={`p-3.5 rounded-2xl text-left border transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-900 border-rose-500/80 shadow-lg shadow-rose-950/40'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-xl ${isSelected ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {m.id === 'hybrid' && (
                  <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase rounded-full bg-rose-600/30 text-rose-300 border border-rose-500/40">
                    Recommended
                  </span>
                )}
              </div>
              <div>
                <h4 className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                  {m.label}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  {m.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Live Hybrid Weight Tuning Slider (Visible when Hybrid is selected) */}
      {recommendationMethod === 'hybrid' && (
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-rose-400" />
              <span>Hybrid Weight Ratio (α Slider)</span>
            </span>
            <span className="font-mono text-rose-300 font-bold">
              CF {(hybridWeight * 100).toFixed(0)}% : CB {((1 - hybridWeight) * 100).toFixed(0)}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={hybridWeight}
            onChange={(e) => setHybridWeight(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />

          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
            <span>100% Content-Based (α=0)</span>
            <span className="text-rose-400 font-bold">Default (0.6 / 0.4)</span>
            <span>100% Collaborative (α=1)</span>
          </div>

          <div className="p-2 rounded-lg bg-black/40 text-[11px] font-mono text-slate-400 text-center border border-white/5">
            Formula: S_hybrid = {hybridWeight.toFixed(2)} × S_CF + {(1 - hybridWeight).toFixed(2)} × S_CB
          </div>
        </div>
      )}
    </div>
  );
};
