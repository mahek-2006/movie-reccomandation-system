import React, { useState } from 'react';
import { Layers, Database, ArrowDown, ArrowRight, Cpu, Server, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export const SystemArchitecture: React.FC = () => {
  const [pipelineMode, setPipelineMode] = useState<'both' | 'offline' | 'online'>('both');

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-xs font-bold text-indigo-300 mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>End-to-End System Pipeline</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          System Architecture
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
          Interactive workflow diagram showing offline ML model training, vector embedding generation, and online low-latency recommendation serving.
        </p>

        {/* Pipeline Mode Switcher */}
        <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 mt-6">
          <button
            onClick={() => setPipelineMode('both')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              pipelineMode === 'both' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Full Architecture
          </button>
          <button
            onClick={() => setPipelineMode('offline')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              pipelineMode === 'offline' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Offline Pipeline
          </button>
          <button
            onClick={() => setPipelineMode('online')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              pipelineMode === 'online' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Online Serving
          </button>
        </div>
      </div>

      {/* Interactive Flow Diagram */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#0f131f] border border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Glowing Background Ambiance */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-rose-600/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Diagram Flow Nodes */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          
          {/* 1. Dataset Node */}
          <div className="flex flex-col items-center">
            <div className="px-6 py-3.5 rounded-2xl bg-slate-900 border-2 border-slate-700 text-white font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-lg">
              <Database className="w-5 h-5 text-amber-400" />
              <span>DATASET (MovieLens 25M Benchmark)</span>
            </div>
            <ArrowDown className="w-5 h-5 text-slate-500 my-2 animate-bounce" />
          </div>

          {/* 2. Ingestion & Preprocessing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <div className="text-xs font-mono text-slate-400 uppercase font-semibold">Stage 1</div>
              <div className="text-sm font-bold text-slate-100 mt-1">Data Ingestion</div>
              <p className="text-[11px] text-slate-400 mt-1">Ratings CSV, Movie Metadata, User Logs</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <div className="text-xs font-mono text-slate-400 uppercase font-semibold">Stage 2</div>
              <div className="text-sm font-bold text-slate-100 mt-1">Preprocessing & Normalization</div>
              <p className="text-[11px] text-slate-400 mt-1">Null handling, 80/10/10 Split, Matrix Construction</p>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-5 h-5 text-slate-500 my-1" />
          </div>

          {/* 3. Feature Engineering */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
            <div className="text-xs font-mono text-slate-400 uppercase font-semibold">Stage 3</div>
            <div className="text-sm font-bold text-slate-100 mt-1">Feature Engineering</div>
            <p className="text-[11px] text-slate-400 mt-1">User Taste Vectors, Genre One-Hot Encoding, TF-IDF Tag Vectors</p>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-5 h-5 text-slate-500 my-1" />
          </div>

          {/* 4. Dual ML Branch: CF and CB */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            {/* CF Branch */}
            <div className="p-5 rounded-2xl bg-purple-950/30 border border-purple-800/40 text-center">
              <div className="text-xs font-mono text-purple-400 font-bold uppercase">Collaborative Branch</div>
              <div className="text-base font-bold text-purple-200 mt-1">Collaborative Filtering (SVD)</div>
              <p className="text-xs text-slate-300 mt-2">Latent Factor Decomposition P · Q^T & User Neighborhoods</p>
              <div className="mt-3 text-[11px] font-mono text-purple-300 font-bold">Outputs: S_CF</div>
            </div>

            {/* CB Branch */}
            <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 text-center">
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase">Content Branch</div>
              <div className="text-base font-bold text-cyan-200 mt-1">Content-Based Filtering</div>
              <p className="text-xs text-slate-300 mt-2">TF-IDF Vector Space & Cosine Similarity Matrix</p>
              <div className="mt-3 text-[11px] font-mono text-cyan-300 font-bold">Outputs: S_CB</div>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-5 h-5 text-rose-500 my-1" />
          </div>

          {/* 5. Hybrid Scoring Engine */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-950/50 via-slate-900 to-purple-950/50 border-2 border-rose-500 text-center shadow-xl">
            <div className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">Fusion Layer</div>
            <div className="text-lg font-extrabold text-white mt-1">Hybrid Scoring Engine</div>
            <p className="text-xs font-mono text-rose-200 mt-1">S_hybrid = α · S_CF + (1 - α) · S_CB</p>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-5 h-5 text-rose-500 my-1" />
          </div>

          {/* 6. Candidate Ranking & Serving */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
            <div className="text-xs font-mono text-slate-400 uppercase font-semibold">Final Stage</div>
            <div className="text-base font-bold text-slate-100">Ranking & Top-N Selection</div>
            <p className="text-xs text-slate-400">Score descending sort, diversity filtering & dynamic explanation synthesis</p>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-5 h-5 text-emerald-400 my-1" />
          </div>

          {/* 7. End User UI */}
          <div className="flex justify-center">
            <div className="px-8 py-3.5 rounded-2xl bg-emerald-950/60 border-2 border-emerald-500 text-emerald-200 font-bold text-sm sm:text-base flex items-center gap-2 shadow-xl">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>User (CineAI Interactive UI)</span>
            </div>
          </div>

        </div>
      </div>

      {/* Offline vs Online Comparison Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Offline Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0f131f] border border-purple-900/40 space-y-4">
          <div className="flex items-center gap-2.5 text-purple-400 font-bold text-lg">
            <Clock className="w-5 h-5" />
            <span>Offline Pipeline (Batch Processing)</span>
          </div>
          <ul className="text-xs sm:text-sm text-slate-300 space-y-2.5">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
              <span><strong>Data preprocessing:</strong> Filtering sparse users, standardizing 0.5–5.0 ratings.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
              <span><strong>Model training:</strong> SVD Matrix Factorization with 100 latent dimensions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
              <span><strong>Embedding/model refresh:</strong> Periodic batch index updates to TF-IDF vectors.</span>
            </li>
          </ul>
        </div>

        {/* Online Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0f131f] border border-cyan-900/40 space-y-4">
          <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
            <Server className="w-5 h-5" />
            <span>Online Serving (Real-Time Inference)</span>
          </div>
          <ul className="text-xs sm:text-sm text-slate-300 space-y-2.5">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
              <span><strong>User request:</strong> Real-time genre preferences and custom ratings capture.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
              <span><strong>Recommendation retrieval:</strong> Candidate generation across movie catalog.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
              <span><strong>Ranking & serving:</strong> Sub-50ms linear combination scoring and UI delivery.</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
};
