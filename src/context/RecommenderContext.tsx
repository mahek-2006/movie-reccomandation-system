import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Movie, Genre, UserProfile, RecommendationMethod, RecommendationResult } from '../types/movie';
import { MOVIES_DATABASE } from '../data/movies';
import { PRESET_PROFILES } from '../data/userProfiles';
import { generateRecommendations } from '../services/recommendationEngine';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface RecommenderContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedUser: UserProfile;
  setSelectedUser: (user: UserProfile) => void;
  selectedGenres: Genre[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<Genre[]>>;
  toggleGenre: (genre: Genre) => void;
  recommendationMethod: RecommendationMethod;
  setRecommendationMethod: (method: RecommendationMethod) => void;
  hybridWeight: number;
  setHybridWeight: (weight: number) => void;
  watchlist: string[];
  toggleWatchlist: (movieId: string) => void;
  isInWatchlist: (movieId: string) => boolean;
  userRatings: Record<string, number>;
  rateMovie: (movieId: string, rating: number) => void;
  recommendedMovies: RecommendationResult[];
  isGenerating: boolean;
  triggerGenerateRecommendations: () => void;
  activeModalMovie: Movie | null;
  openMovieModal: (movie: Movie) => void;
  closeMovieModal: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const RecommenderContext = createContext<RecommenderContextType | undefined>(undefined);

export const RecommenderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedUser, setSelectedUser] = useState<UserProfile>(PRESET_PROFILES[0]);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>(PRESET_PROFILES[0].favoriteGenres);
  const [recommendationMethod, setRecommendationMethod] = useState<RecommendationMethod>('hybrid');
  const [hybridWeight, setHybridWeight] = useState<number>(0.6); // 60% Collab, 40% Content
  const [watchlist, setWatchlist] = useState<string[]>(PRESET_PROFILES[0].watchlist);
  const [userRatings, setUserRatings] = useState<Record<string, number>>(PRESET_PROFILES[0].ratedMovies);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeModalMovie, setActiveModalMovie] = useState<Movie | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Toast helper
  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  // Sync profile changes
  const handleSelectUser = (user: UserProfile) => {
    setSelectedUser(user);
    setSelectedGenres(user.favoriteGenres);
    setWatchlist(user.watchlist);
    setUserRatings(user.ratedMovies);
    addToast(`Switched persona to ${user.name} (${user.tagline})`, 'info');
  };

  // Toggle genre in multi-select
  const toggleGenre = (genre: Genre) => {
    setSelectedGenres(prev => {
      const exists = prev.includes(genre);
      if (exists) {
        if (prev.length === 1) {
          addToast('At least one genre should remain selected for optimal recommendations', 'warning');
          return prev;
        }
        return prev.filter(g => g !== genre);
      } else {
        return [...prev, genre];
      }
    });
  };

  // Watchlist toggle
  const toggleWatchlist = (movieId: string) => {
    const movie = MOVIES_DATABASE.find(m => m.id === movieId);
    const movieTitle = movie ? movie.title : 'Movie';
    
    setWatchlist(prev => {
      if (prev.includes(movieId)) {
        addToast(`Removed "${movieTitle}" from Watchlist`, 'info');
        return prev.filter(id => id !== movieId);
      } else {
        addToast(`Added "${movieTitle}" to Watchlist!`, 'success');
        return [...prev, movieId];
      }
    });
  };

  const isInWatchlist = (movieId: string) => watchlist.includes(movieId);

  // Rate a movie
  const rateMovie = (movieId: string, rating: number) => {
    const movie = MOVIES_DATABASE.find(m => m.id === movieId);
    setUserRatings(prev => ({
      ...prev,
      [movieId]: rating
    }));
    addToast(`Rated "${movie?.title || 'Movie'}" ${rating} ★ — Model updated!`, 'success');
  };

  // Compute recommendations
  const recommendedMovies = useMemo(() => {
    return generateRecommendations(
      MOVIES_DATABASE,
      selectedGenres,
      recommendationMethod,
      hybridWeight,
      selectedUser,
      userRatings
    );
  }, [selectedGenres, recommendationMethod, hybridWeight, selectedUser, userRatings]);

  // Simulate ML generation latency
  const triggerGenerateRecommendations = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      addToast('Recommendations recalculated successfully using CineAI Engine!', 'success');
    }, 450);
  };

  const openMovieModal = (movie: Movie) => setActiveModalMovie(movie);
  const closeMovieModal = () => setActiveModalMovie(null);

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setActiveModalMovie(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <RecommenderContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedUser,
        setSelectedUser: handleSelectUser,
        selectedGenres,
        setSelectedGenres,
        toggleGenre,
        recommendationMethod,
        setRecommendationMethod,
        hybridWeight,
        setHybridWeight,
        watchlist,
        toggleWatchlist,
        isInWatchlist,
        userRatings,
        rateMovie,
        recommendedMovies,
        isGenerating,
        triggerGenerateRecommendations,
        activeModalMovie,
        openMovieModal,
        closeMovieModal,
        isSearchOpen,
        setIsSearchOpen,
        toasts,
        addToast
      }}
    >
      {children}
    </RecommenderContext.Provider>
  );
};

export const useRecommender = () => {
  const context = useContext(RecommenderContext);
  if (!context) {
    throw new Error('useRecommender must be used within a RecommenderProvider');
  }
  return context;
};
