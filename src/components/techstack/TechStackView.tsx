import React from 'react';
import { Cpu, Terminal, Database, Server, BarChart3, Code2, Sparkles } from 'lucide-react';

export const TechStackView: React.FC = () => {
  const categories = [
    {
      title: 'Programming & Data',
      icon: Terminal,
      color: 'border-blue-500/40 text-blue-400 bg-blue-950/30',
      items: [
        { name: 'Python', role: 'Core ML Development Language', tag: 'v3.11+' },
        { name: 'Pandas', role: 'Dataframe Manipulation & Cleaning', tag: 'v2.2+' },
        { name: 'NumPy', role: 'High-Performance Vectorized Computations', tag: 'v1.26+' },
        { name: 'Scikit-learn', role: 'TF-IDF, Cosine Similarity, Metrics', tag: 'v1.4+' },
      ]
    },
    {
      title: 'Recommendation / ML Algorithms',
      icon: Cpu,
      color: 'border-rose-500/40 text-rose-400 bg-rose-950/30',
      items: [
        { name: 'SVD', role: 'Singular Value Matrix Decomposition', tag: '100 Latent Dims' },
        { name: 'ALS', role: 'Alternating Least Squares Collaborative Filtering', tag: 'Matrix Factorization' },
        { name: 'Surprise / implicit', role: 'Recommendation Benchmarking Toolkit', tag: 'Evaluation' },
        { name: 'PyTorch', role: 'Deep Learning Embeddings & Neural Nets', tag: 'v2.2+' },
        { name: 'SciPy', role: 'Sparse Matrix Compression (CSR / CSC)', tag: 'SciPy.sparse' },
      ]
    },
    {
      title: 'Backend & Storage',
      icon: Server,
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30',
      items: [
        { name: 'FastAPI', role: 'High-Performance Async API Serving', tag: 'Python ASGI' },
        { name: 'Redis', role: 'In-Memory Cache for Precomputed Embeddings', tag: 'Sub-10ms' },
        { name: 'PostgreSQL', role: 'Relational User Metadata & Rating Storage', tag: 'SQL' },
      ]
    },
    {
      title: 'Experimentation & Tracking',
      icon: BarChart3,
      color: 'border-purple-500/40 text-purple-400 bg-purple-950/30',
      items: [
        { name: 'Jupyter', role: 'Exploratory Data Analysis Notebooks', tag: 'EDA' },
        { name: 'MLflow', role: 'Model Parameter & Metric Tracking', tag: 'MLOps' },
        { name: 'Matplotlib', role: 'Static Visualizations & Loss Curves', tag: 'Plotting' },
        { name: 'Seaborn', role: 'Statistical Correlation Heatmaps', tag: 'Analytics' },
      ]
    },
    {
      title: 'Modern Frontend & Demonstration UI',
      icon: Code2,
      color: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/30',
      items: [
        { name: 'React', role: 'Component-Based Reactive UI Architecture', tag: 'v18' },
        { name: 'TypeScript', role: 'Strict Typing & Model Interface Safety', tag: 'v5.7' },
        { name: 'Tailwind CSS', role: 'Cinematic Dark Streaming Theme Styling', tag: 'v3.4' },
        { name: 'Recharts', role: 'Interactive Metric & Dataset Visualizations', tag: 'Charts' },
      ]
    }
  ];

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 mb-3">
          <Cpu className="w-3.5 h-3.5 text-rose-400" />
          <span>Project Engineering Stack</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Technology Stack
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-2">
          Modular architecture built with industry-standard machine learning libraries, scalable backend components, and a modern reactive presentation layer.
        </p>
      </div>

      {/* Tech Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.title} className="p-6 sm:p-8 rounded-3xl bg-[#0f131f] border border-slate-800 space-y-5">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-2xl border ${cat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{cat.title}</h3>
              </div>

              <div className="space-y-3">
                {cat.items.map((item) => (
                  <div key={item.name} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-bold text-slate-100">{item.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.role}</div>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-mono font-semibold rounded-md bg-slate-800 text-slate-300 shrink-0 border border-slate-700">
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
