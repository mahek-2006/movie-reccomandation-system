import React from 'react';
import { BrainCircuit, Users, Tag, Sparkles, ArrowRight, CheckCircle, Database, Layers } from 'lucide-react';

export const HowOurAIWorks: React.FC = () => {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/40 border border-rose-500/30 text-xs font-bold text-rose-300 mb-3">
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>Core Recommendation Methodology</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          How Our AI Works
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
          Comprehensive breakdown of the three recommendation paradigms implemented in our college project, highlighting how the Hybrid approach overcomes classical ML limitations.
        </p>
      </div>

      {/* 3 Core Approach Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 1. Collaborative Filtering */}
        <div className="bg-[#0f131f] rounded-3xl border border-slate-800 p-6 sm:p-7 flex flex-col justify-between hover:border-purple-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/20">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400 mb-5">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              1. Collaborative Filtering
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              "Finds patterns from user-item rating interactions and recommends movies based on users with similar preferences."
            </p>

            {/* Visual Diagram */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5 my-4">
              <div className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                Algorithm Flow
              </div>
              <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] font-semibold text-slate-200">
                <span className="px-2 py-1 bg-slate-800 rounded-md">Users</span>
                <ArrowRight className="w-3 h-3 text-purple-400 shrink-0" />
                <span className="px-2 py-1 bg-slate-800 rounded-md">Ratings</span>
                <ArrowRight className="w-3 h-3 text-purple-400 shrink-0" />
                <span className="px-2 py-1 bg-slate-800 rounded-md">Similarity</span>
                <ArrowRight className="w-3 h-3 text-purple-400 shrink-0" />
                <span className="px-2 py-1 bg-purple-900/60 text-purple-200 rounded-md">Recs</span>
              </div>
            </div>

            {/* Mathematical Summary */}
            <div className="text-xs text-slate-400 space-y-2 mt-4">
              <p>• <strong>Matrix Factorization (SVD):</strong> Decomposes user-item interaction matrix R into latent factor vectors P_u and Q_i.</p>
              <p>• <strong>Strength:</strong> Serendipitous discovery of cross-genre preferences without needing movie metadata.</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-purple-300 font-medium">
            Benchmark Precision@10: <strong>0.33</strong>
          </div>
        </div>

        {/* 2. Content-Based Filtering */}
        <div className="bg-[#0f131f] rounded-3xl border border-slate-800 p-6 sm:p-7 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400 mb-5">
              <Tag className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              2. Content-Based Filtering
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              "Analyzes movie features such as genres, tags and keywords to find movies similar to those a user already likes."
            </p>

            {/* Visual Diagram */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5 my-4">
              <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Feature Pipeline
              </div>
              <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] font-semibold text-slate-200">
                <span className="px-2 py-1 bg-slate-800 rounded-md">Features</span>
                <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="px-2 py-1 bg-slate-800 rounded-md">Cosine Sim</span>
                <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="px-2 py-1 bg-cyan-900/60 text-cyan-200 rounded-md">Similar Movies</span>
              </div>
            </div>

            {/* Mathematical Summary */}
            <div className="text-xs text-slate-400 space-y-2 mt-4">
              <p>• <strong>TF-IDF & Cosine Similarity:</strong> Computes cos(θ) = (u · v) / (||u|| ||v||) between user profile vector and item descriptors.</p>
              <p>• <strong>Strength:</strong> Immediate recommendations for brand-new movies without waiting for user ratings.</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-cyan-300 font-medium">
            Benchmark Precision@10: <strong>0.27</strong>
          </div>
        </div>

        {/* 3. Hybrid Recommendation (Highlighted Star) */}
        <div className="relative bg-gradient-to-b from-rose-950/30 via-[#0f131f] to-[#0f131f] rounded-3xl border-2 border-rose-500/80 p-6 sm:p-7 flex flex-col justify-between shadow-2xl shadow-rose-950/40">
          <div className="absolute -top-3.5 right-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-rose-600 to-purple-600 text-[10px] font-extrabold text-white uppercase tracking-wider shadow-lg">
            Primary Project Approach
          </div>

          <div>
            <div className="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center text-white mb-5 shadow-lg shadow-rose-600/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              3. Hybrid Recommendation
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              "Combines collaborative and content-based signals to produce more personalized and robust recommendations."
            </p>

            {/* Flow Visual */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-rose-500/30 space-y-2 my-4">
              <div className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider">
                Hybrid Scoring & Ranking
              </div>
              <div className="text-xs font-semibold text-slate-200 text-center space-y-1">
                <div className="bg-purple-950/50 text-purple-300 py-1 px-2 rounded-md border border-purple-800/40">
                  Collaborative Score (S_CF)
                </div>
                <div className="text-rose-400 font-extrabold text-sm">+</div>
                <div className="bg-cyan-950/50 text-cyan-300 py-1 px-2 rounded-md border border-cyan-800/40">
                  Content Score (S_CB)
                </div>
                <div className="text-rose-400 font-extrabold text-sm">↓</div>
                <div className="bg-rose-900/60 text-white py-1 px-2 rounded-md border border-rose-500/40 font-bold">
                  Hybrid Score → Ranking → Top-N
                </div>
              </div>
            </div>

            {/* Mathematical Formula */}
            <div className="p-3 rounded-xl bg-black/50 border border-white/5 text-[11px] font-mono text-rose-300 text-center mt-3">
              S_hybrid = α · S_collab + (1 - α) · S_content
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-rose-300 font-bold flex items-center justify-between">
            <span>Winning Model Precision@10:</span>
            <span className="text-sm text-emerald-400 font-extrabold">0.41 (+24%)</span>
          </div>
        </div>

      </div>

      {/* Why Hybrid is Superior Callout */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0f131f] border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-rose-500" />
          <span>Why Hybrid Recommendation Solves Classical ML Pitfalls</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h4 className="font-bold text-slate-100 mb-1">Solves Cold-Start</h4>
            <p className="text-slate-400">Content features backfill predictions when new movies or users lack sufficient rating history.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h4 className="font-bold text-slate-100 mb-1">Overcomes Sparsity</h4>
            <p className="text-slate-400">In 99.74% sparse rating matrices, latent factor matrices combine with text similarity to preserve recall.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h4 className="font-bold text-slate-100 mb-1">Mitigates Popularity Bias</h4>
            <p className="text-slate-400">Prevents recommendations from solely showing blockbuster titles by weighting unique user genre affinities.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
