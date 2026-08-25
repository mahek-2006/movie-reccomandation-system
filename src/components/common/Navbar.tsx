import React, { useState } from 'react';
import { 
  Sparkles, Search, Bookmark, Menu, X, BrainCircuit, Film, Database, LineChart, Layers, Cpu, ChevronDown
} from 'lucide-react';
import { useRecommender } from '../../context/RecommenderContext';
import { PRESET_PROFILES } from '../../data/userProfiles';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, watchlist, selectedUser, setSelectedUser, setIsSearchOpen } = useRecommender();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Film },
    { id: 'recommendations', label: 'Recommendations', icon: Sparkles, badge: 'AI' },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'model', label: 'About Model', icon: BrainCircuit },
    { id: 'architecture', label: 'Architecture', icon: Layers },
    { id: 'dataset', label: 'Dataset', icon: Database },
    { id: 'evaluation', label: 'Evaluation', icon: LineChart },
    { id: 'techstack', label: 'Tech Stack', icon: Cpu },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#080a10]/85 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div onClick={() => handleNavClick('home')} className="flex items-center gap-2.5 cursor-pointer group select-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-indigo-600 p-[1.5px] shadow-lg shadow-rose-600/25 group-hover:shadow-rose-600/40 transition-all duration-300">
              <div className="w-full h-full bg-[#0d1017] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-rose-400 bg-clip-text text-transparent">
                Cine<span className="text-rose-500">AI</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-rose-400/90 -mt-1">Hybrid Engine</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive ? 'text-white bg-white/10 shadow-sm border border-white/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                  {isActive && <span className="absolute -bottom-1.5 left-3 right-3 h-[2px] bg-gradient-to-r from-rose-500 to-purple-500 rounded-full" />}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs transition-all shadow-inner"
              title="Search movies (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-rose-400" />
              <span className="hidden md:inline">Search...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-slate-800 border border-slate-700 rounded text-slate-400">Ctrl K</kbd>
            </button>

            <button
              onClick={() => handleNavClick('profile')}
              className="relative p-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              title="View Watchlist and Profile"
            >
              <Bookmark className="w-4 h-4 text-slate-300 hover:text-rose-400 transition-colors" />
              {watchlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {watchlist.length}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 transition-all"
              >
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-rose-500/50"
                />
                <span className="hidden sm:inline font-semibold">{selectedUser.name.split(' ')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0f131f] border border-slate-700/80 shadow-2xl p-2 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-2 border-b border-slate-800 mb-1">
                    <p className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">Switch Viva Persona</p>
                    <p className="text-xs text-slate-300 font-medium">{selectedUser.name}</p>
                  </div>
                  {PRESET_PROFILES.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => { setSelectedUser(p); setProfileDropdown(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-colors ${
                        selectedUser.id === p.id ? 'bg-rose-600/20 text-rose-300 border border-rose-500/30' : 'text-slate-300 hover:bg-slate-800/80'
                      }`}
                    >
                      <img src={p.avatar} alt={p.name} className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-slate-100">{p.name}</div>
                        <div className="text-[10px] text-slate-400 line-clamp-1">{p.tagline}</div>
                      </div>
                    </button>
                  ))}
                  <div className="mt-2 pt-2 border-t border-slate-800">
                    <button onClick={() => { handleNavClick('profile'); setProfileDropdown(false); }} className="w-full text-center py-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold">
                      Open Full Profile →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0d16] border-b border-slate-800 px-4 pt-2 pb-6 space-y-1.5 shadow-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-rose-600/20 text-rose-300 border border-rose-500/30' : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-rose-400" />
                  <span>{item.label}</span>
                </div>
                {item.badge && <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-rose-600 text-white">{item.badge}</span>}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
