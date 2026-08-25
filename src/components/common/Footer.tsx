import React from 'react';
import { Sparkles } from 'lucide-react';
import { useRecommender } from '../../context/RecommenderContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useRecommender();

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-[#07090e] py-12 px-4 sm:px-6 lg:px-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-600/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-base font-extrabold text-white tracking-tight">
              Cine<span className="text-rose-500">AI</span> Recommender
            </span>
          </div>
          <p className="text-slate-400 max-w-md leading-relaxed text-xs">
            College Machine Learning Project demonstration showcasing a state-of-the-art Hybrid Recommendation Engine combining Collaborative Filtering (SVD Matrix Factorization) with Content-Based Cosine Similarity.
          </p>
          <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold border border-slate-700">
              Evaluation RMSE: 0.83
            </span>
            <span className="px-2 py-0.5 rounded bg-rose-950/50 text-rose-300 font-semibold border border-rose-800/40">
              Precision@10: 0.41
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Project Modules</h4>
          <ul className="space-y-2">
            <li><button onClick={() => setActiveTab('recommendations')} className="hover:text-rose-400 transition-colors">Interactive Recommender</button></li>
            <li><button onClick={() => setActiveTab('movies')} className="hover:text-rose-400 transition-colors">Movie Explorer & Catalog</button></li>
            <li><button onClick={() => setActiveTab('model')} className="hover:text-rose-400 transition-colors">How Our AI Works</button></li>
            <li><button onClick={() => setActiveTab('architecture')} className="hover:text-rose-400 transition-colors">System Architecture</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Faculty Viva & Metrics</h4>
          <ul className="space-y-2">
            <li><button onClick={() => setActiveTab('dataset')} className="hover:text-rose-400 transition-colors">Dataset Statistics (MovieLens 25M)</button></li>
            <li><button onClick={() => setActiveTab('evaluation')} className="hover:text-rose-400 transition-colors">Model Evaluation & Precision</button></li>
            <li><button onClick={() => setActiveTab('techstack')} className="hover:text-rose-400 transition-colors">Technology Stack</button></li>
            <li><button onClick={() => setActiveTab('challenges')} className="hover:text-rose-400 transition-colors">Challenges & Future Work</button></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
        <div>© 2026 CineAI — College ML Final Year Capstone Project. Built for viva examination.</div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Hybrid Scoring: S_hybrid = α·S_cf + (1-α)·S_cb</span>
        </div>
      </div>
    </footer>
  );
};
