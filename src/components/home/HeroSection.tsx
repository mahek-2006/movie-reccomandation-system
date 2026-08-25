import React from 'react';
import { Sparkles, Film, ArrowRight, ShieldCheck, Zap, Cpu } from 'lucide-react';
import { useRecommender } from '../../context/RecommenderContext';

export const HeroSection: React.FC = () => {
  const { setActiveTab } = useRecommender();

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Cinematic Visual with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&auto=format&fit=crop&q=80"
          alt="Cinematic Space"
          className="w-full h-full object-cover opacity-25 scale-105 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a10] via-[#080a10]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080a10] via-transparent to-[#080a10]" />
        
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-rose-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-purple-600/15 blur-[100px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Project Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-rose-500/30 text-xs font-semibold text-rose-300 shadow-xl backdrop-blur-md mb-8">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>College ML Project Demonstration • Hybrid AI Recommendation</span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
          Discover Movies <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-rose-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            You'll Love
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          AI-powered personalized movie recommendations using Hybrid Recommendation.
        </p>

        {/* Dual CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <button
            onClick={() => setActiveTab('recommendations')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-base shadow-xl shadow-rose-600/30 hover:shadow-rose-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 group"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Get Recommendations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setActiveTab('movies')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 hover:text-white font-semibold text-base backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Film className="w-5 h-5 text-slate-400" />
            <span>Explore Movies</span>
          </button>
        </div>

        {/* Metric Badges */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="bg-[#0f131f]/70 border border-slate-800/80 p-3.5 rounded-xl backdrop-blur-sm">
            <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              <span>Hybrid Precision@10</span>
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-slate-100 mt-1">0.41</div>
            <div className="text-[10px] text-emerald-400 font-medium">+24% vs CF Baseline</div>
          </div>

          <div className="bg-[#0f131f]/70 border border-slate-800/80 p-3.5 rounded-xl backdrop-blur-sm">
            <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>RMSE Score</span>
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-slate-100 mt-1">0.83</div>
            <div className="text-[10px] text-cyan-400 font-medium">Lower is better (Base: 1.02)</div>
          </div>

          <div className="bg-[#0f131f]/70 border border-slate-800/80 p-3.5 rounded-xl backdrop-blur-sm">
            <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>Catalog Coverage</span>
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-slate-100 mt-1">87%</div>
            <div className="text-[10px] text-purple-400 font-medium">Mitigates Cold-Start</div>
          </div>

          <div className="bg-[#0f131f]/70 border border-slate-800/80 p-3.5 rounded-xl backdrop-blur-sm">
            <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>Benchmark Data</span>
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-slate-100 mt-1">25M+ Ratings</div>
            <div className="text-[10px] text-amber-400 font-medium">160K Users • 60K Movies</div>
          </div>
        </div>
      </div>
    </div>
  );
};
