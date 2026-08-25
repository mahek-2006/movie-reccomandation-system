import React from 'react';
import { LineChart, CheckCircle2, Award, Zap, ShieldCheck, Cpu } from 'lucide-react';
import { 
  CORE_EVALUATION_METRICS, 
  MODEL_COMPARISON_DATA 
} from '../../data/evaluationData';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, Legend 
} from 'recharts';

export const ModelEvaluation: React.FC = () => {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/40 border border-rose-500/30 text-xs font-bold text-rose-300 mb-3">
          <LineChart className="w-3.5 h-3.5" />
          <span>Model Evaluation & Benchmarking</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Model Evaluation
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-2">
          Empirical comparison of recommendation algorithms on test splits, highlighting precision, recall, and error minimization.
        </p>
      </div>

      {/* 3 Core Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* RMSE */}
        <div className="p-6 rounded-3xl bg-[#0f131f] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Root Mean Squared Error</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
              Baseline: {CORE_EVALUATION_METRICS.rmse.baseline}
            </span>
          </div>
          <div className="text-4xl font-extrabold text-cyan-400">
            {CORE_EVALUATION_METRICS.rmse.value}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {CORE_EVALUATION_METRICS.rmse.explanation}
          </p>
        </div>

        {/* Recall@10 */}
        <div className="p-6 rounded-3xl bg-[#0f131f] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Recall @ 10</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-800">
              Baseline: {CORE_EVALUATION_METRICS.recall10.baseline}
            </span>
          </div>
          <div className="text-4xl font-extrabold text-purple-400">
            {CORE_EVALUATION_METRICS.recall10.value}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {CORE_EVALUATION_METRICS.recall10.explanation}
          </p>
        </div>

        {/* Coverage */}
        <div className="p-6 rounded-3xl bg-[#0f131f] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Catalog Coverage</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
              Diversity
            </span>
          </div>
          <div className="text-4xl font-extrabold text-rose-400">
            {CORE_EVALUATION_METRICS.coverage.value}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {CORE_EVALUATION_METRICS.coverage.explanation}
          </p>
        </div>

      </div>

      {/* Precision@10 Comparison Chart (Recharts) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0f131f] border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white">
              Model Comparison: Precision@10
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Precision of Top-10 recommended candidates across four model implementations.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs font-bold text-rose-300">
            <Award className="w-4 h-4 text-rose-400" />
            <span>Hybrid Wins: 0.41 Precision</span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MODEL_COMPARISON_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="model" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 0.5]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0d1017', borderColor: '#334155', borderRadius: '12px' }}
                formatter={(val: any) => [`${val} Precision@10`, 'Score']}
              />
              <Bar dataKey="precision10" radius={[8, 8, 0, 0]}>
                {MODEL_COMPARISON_DATA.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.highlight ? '#e11d48' : entry.color} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto pt-4 border-t border-slate-800">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 pb-2">
                <th className="py-2.5 font-bold uppercase">Model Architecture</th>
                <th className="py-2.5 font-bold uppercase">Precision@10</th>
                <th className="py-2.5 font-bold uppercase">Recall@10</th>
                <th className="py-2.5 font-bold uppercase">RMSE</th>
                <th className="py-2.5 font-bold uppercase">Coverage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {MODEL_COMPARISON_DATA.map((row) => (
                <tr key={row.model} className={row.highlight ? 'bg-rose-950/30 font-bold text-rose-200' : 'text-slate-300'}>
                  <td className="py-3 flex items-center gap-2">
                    {row.highlight && <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />}
                    <span>{row.model}</span>
                  </td>
                  <td className="py-3 font-mono">{row.precision10}</td>
                  <td className="py-3 font-mono">{row.recall10}</td>
                  <td className="py-3 font-mono">{row.rmse}</td>
                  <td className="py-3 font-mono">{row.coverage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Performance Summary Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-slate-900 border border-rose-500/30 space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-rose-400" />
          <span>Model Performance Summary</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-slate-200">
          <div className="p-3 bg-black/40 rounded-xl border border-white/5">
            <div className="text-[10px] uppercase font-semibold text-slate-400">Hybrid Precision@10</div>
            <div className="text-xl font-extrabold text-white mt-0.5">0.41</div>
          </div>
          <div className="p-3 bg-black/40 rounded-xl border border-white/5">
            <div className="text-[10px] uppercase font-semibold text-slate-400">Recall@10</div>
            <div className="text-xl font-extrabold text-white mt-0.5">0.29</div>
          </div>
          <div className="p-3 bg-black/40 rounded-xl border border-white/5">
            <div className="text-[10px] uppercase font-semibold text-slate-400">RMSE</div>
            <div className="text-xl font-extrabold text-white mt-0.5">0.83</div>
          </div>
          <div className="p-3 bg-black/40 rounded-xl border border-white/5">
            <div className="text-[10px] uppercase font-semibold text-slate-400">Catalog Coverage</div>
            <div className="text-xl font-extrabold text-white mt-0.5">87%</div>
          </div>
        </div>
        <p className="text-xs text-slate-400 pt-2 italic">
          * Note: Presented as project evaluation and demo values derived from MovieLens test split benchmarking for college viva demonstration.
        </p>
      </div>

    </div>
  );
};
