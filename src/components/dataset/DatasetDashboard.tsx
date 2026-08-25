import React from 'react';
import { Database, Users, Film, Star, PieChart, Layers } from 'lucide-react';
import { DATASET_STATS, RATING_DISTRIBUTION_DATA, GENRE_DISTRIBUTION_DATA } from '../../data/evaluationData';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell 
} from 'recharts';

export const DatasetDashboard: React.FC = () => {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-xs font-bold text-amber-300 mb-3">
          <Database className="w-3.5 h-3.5" />
          <span>Benchmark Dataset Analytics</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Dataset & Training Split
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-2">
          Trained and benchmarked on the industry standard MovieLens 25M research dataset.
        </p>
      </div>

      {/* Dataset Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 sm:p-6 rounded-3xl bg-[#0f131f] border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400">
            <Users className="w-5 h-5" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">{DATASET_STATS.users}</div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Users</div>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl bg-[#0f131f] border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
            <Film className="w-5 h-5" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">{DATASET_STATS.movies}</div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Movies</div>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl bg-[#0f131f] border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-800/40 flex items-center justify-center text-rose-400">
            <Star className="w-5 h-5" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">{DATASET_STATS.ratings}</div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">User Ratings</div>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl bg-[#0f131f] border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
            <Layers className="w-5 h-5" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">0.5 – 5.0</div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Rating Scale</div>
        </div>
      </div>

      {/* Dataset Split Summary Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0f131f] border border-slate-800">
        <h3 className="text-base font-bold text-white mb-4">Dataset Partition Split (80 / 10 / 10)</h3>
        <div className="w-full h-4 rounded-full bg-slate-800 overflow-hidden flex">
          <div className="h-full bg-rose-600 w-[80%]" title="Train Split (80%)" />
          <div className="h-full bg-purple-600 w-[10%]" title="Validation Split (10%)" />
          <div className="h-full bg-cyan-600 w-[10%]" title="Test Split (10%)" />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 mt-3 text-xs">
          <span className="flex items-center gap-2 text-slate-300">
            <span className="w-3 h-3 rounded-full bg-rose-600" />
            <strong>Train Set:</strong> 80% (20,000,000 ratings)
          </span>
          <span className="flex items-center gap-2 text-slate-300">
            <span className="w-3 h-3 rounded-full bg-purple-600" />
            <strong>Validation Set:</strong> 10% (2,500,000 ratings)
          </span>
          <span className="flex items-center gap-2 text-slate-300">
            <span className="w-3 h-3 rounded-full bg-cyan-600" />
            <strong>Test Set:</strong> 10% (2,500,000 ratings)
          </span>
        </div>
      </div>

      {/* Interactive Charts: Rating & Genre Distributions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Rating Distribution Histogram */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0f131f] border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center justify-between">
            <span>Rating Distribution (Millions)</span>
            <span className="text-xs font-normal text-slate-400">0.5★ – 5.0★</span>
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RATING_DISTRIBUTION_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="rating" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0d1017', borderColor: '#334155', borderRadius: '12px' }}
                  formatter={(val: any) => [`${val}M Ratings`, 'Volume']}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {RATING_DISTRIBUTION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-400 text-center">
            Bell curve peaking at 3.5★ and 4.0★ reflecting typical user rating optimism in movie evaluation.
          </p>
        </div>

        {/* Genre Distribution Bar Chart */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0f131f] border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center justify-between">
            <span>Movie Catalog Genre Breakdown</span>
            <span className="text-xs font-normal text-slate-400">Dataset Volume (k)</span>
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={GENRE_DISTRIBUTION_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#64748b" fontSize={11} />
                <YAxis dataKey="genre" type="category" stroke="#64748b" fontSize={11} width={65} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0d1017', borderColor: '#334155', borderRadius: '12px' }}
                  formatter={(val: any) => [`${val}k Titles`, 'Count']}
                />
                <Bar dataKey="count" fill="#e11d48" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-400 text-center">
            Drama, Comedy, and Action represent over 60% of all categorized titles in the MovieLens catalog.
          </p>
        </div>

      </div>

    </div>
  );
};
