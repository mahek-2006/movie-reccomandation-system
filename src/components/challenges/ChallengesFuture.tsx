import React from 'react';
import { AlertTriangle, Rocket, Sparkles, Database, Compass, Eye, Sliders } from 'lucide-react';

export const ChallengesFuture: React.FC = () => {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Viva Discussion Points</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Challenges & Future Work
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-2">
          Theoretical constraints identified in classical recommendation systems and our roadmap for future neural ranker enhancements.
        </p>
      </div>

      {/* 2 Main Sections: Current Challenges & Future Work */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Current Challenges */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0f131f] border border-amber-900/40 space-y-6">
          <div className="flex items-center gap-3 text-amber-400">
            <AlertTriangle className="w-6 h-6" />
            <h2 className="text-xl font-bold text-white">Current Challenges</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <h4 className="text-sm font-bold text-amber-300">1. Data Sparsity</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Users interact with only a small portion of the movie catalog." (MovieLens matrix is 99.74% sparse, which restricts nearest-neighbor overlap for niche titles).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <h4 className="text-sm font-bold text-amber-300">2. Cold Start Problem</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                "New users and movies have limited interaction history." (Pure collaborative filtering fails without ratings, requiring content-based backfill).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <h4 className="text-sm font-bold text-amber-300">3. Popularity Bias</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Collaborative signals can favor already popular movies." (Super-popular blockbusters dominate candidate pools unless inverse popularity regularization is applied).
              </p>
            </div>
          </div>
        </div>

        {/* Future Work */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0f131f] border border-rose-900/40 space-y-6">
          <div className="flex items-center gap-3 text-rose-400">
            <Rocket className="w-6 h-6" />
            <h2 className="text-xl font-bold text-white">Future Work</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <h4 className="text-sm font-bold text-rose-300">1. Deep Learning Ranker</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Explore neural/two-tower embeddings for improved ranking." (Implementing Two-Tower DNN architecture with dot-product user and item vector projections in PyTorch).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <h4 className="text-sm font-bold text-rose-300">2. Implicit Feedback</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Use clicks, watch time and viewing behaviour in addition to explicit ratings." (Incorporating Bayesian Personalized Ranking (BPR) for continuous telemetry streams).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <h4 className="text-sm font-bold text-rose-300">3. Real-Time A/B Testing</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Evaluate recommendation strategies using real-world user engagement." (Automated multi-armed bandit routing between purely CF, CB, and adaptive Hybrid weights).
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
