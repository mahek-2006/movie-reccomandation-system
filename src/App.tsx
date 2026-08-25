import React from 'react';
import { useRecommender } from './context/RecommenderContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { MovieModal } from './components/common/MovieModal';
import { SearchModal } from './components/common/SearchModal';

// Pages / Views
import { HeroSection } from './components/home/HeroSection';
import { PersonalizedPreview } from './components/home/PersonalizedPreview';
import { RecommendationDashboard } from './components/recommendations/RecommendationDashboard';
import { MovieExplorer } from './components/explorer/MovieExplorer';
import { HowOurAIWorks } from './components/model/HowOurAIWorks';
import { SystemArchitecture } from './components/model/SystemArchitecture';
import { DatasetDashboard } from './components/dataset/DatasetDashboard';
import { ModelEvaluation } from './components/evaluation/ModelEvaluation';
import { TechStackView } from './components/techstack/TechStackView';
import { ChallengesFuture } from './components/challenges/ChallengesFuture';
import { UserProfileView } from './components/profile/UserProfileView';

export const App: React.FC = () => {
  const { activeTab, toasts } = useRecommender();

  return (
    <div className="min-h-screen flex flex-col bg-[#080a10] text-slate-100 relative selection:bg-rose-500 selection:text-white">
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main Content Router based on activeTab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-4">
            <HeroSection />
            <PersonalizedPreview />
          </div>
        )}

        {activeTab === 'recommendations' && <RecommendationDashboard />}
        {activeTab === 'movies' && <MovieExplorer />}
        {activeTab === 'model' && <HowOurAIWorks />}
        {activeTab === 'architecture' && <SystemArchitecture />}
        {activeTab === 'dataset' && <DatasetDashboard />}
        {activeTab === 'evaluation' && <ModelEvaluation />}
        {activeTab === 'techstack' && <TechStackView />}
        {activeTab === 'challenges' && <ChallengesFuture />}
        {activeTab === 'profile' && <UserProfileView />}
      </main>

      {/* Global Modals & Overlays */}
      <MovieModal />
      <SearchModal />

      {/* Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-2xl text-xs font-semibold shadow-2xl backdrop-blur-md border pointer-events-auto animate-in slide-in-from-bottom-5 duration-200 ${
              toast.type === 'success'
                ? 'bg-rose-950/90 text-white border-rose-500/50 shadow-rose-950/50'
                : toast.type === 'warning'
                ? 'bg-amber-950/90 text-amber-200 border-amber-500/50'
                : 'bg-slate-900/90 text-slate-200 border-slate-700/80'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default App;
