import { UserProfile } from '../types/movie';

export const PRESET_PROFILES: UserProfile[] = [
  {
    id: 'alex',
    name: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    tagline: 'Sci-Fi & Cyberpunk Enthusiast',
    favoriteGenres: ['Sci-Fi', 'Thriller', 'Action'],
    ratedMovies: {
      'm1': 5, // Interstellar
      'm2': 5, // Inception
      'm5': 5, // Blade Runner 2049
      'm11': 5, // The Matrix
      'm13': 4, // Arrival
      'm4': 4  // The Dark Knight
    },
    watchlist: ['m3', 'm19', 'm26'],
    tasteVector: {
      'Sci-Fi': 0.95,
      'Thriller': 0.80,
      'Action': 0.75,
      'Adventure': 0.70,
      'Drama': 0.50
    }
  },
  {
    id: 'sarah',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    tagline: 'Auteur & Indie Drama Critic',
    favoriteGenres: ['Drama', 'Mystery', 'Romance'],
    ratedMovies: {
      'm6': 5, // Oppenheimer
      'm7': 5, // Parasite
      'm9': 5, // Whiplash
      'm23': 5, // Her
      'm24': 4, // La La Land
      'm20': 4  // Knives Out
    },
    watchlist: ['m14', 'm17', 'm25'],
    tasteVector: {
      'Drama': 0.98,
      'Mystery': 0.85,
      'Romance': 0.75,
      'Comedy': 0.60,
      'Thriller': 0.55
    }
  },
  {
    id: 'david',
    name: 'David Miller',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    tagline: 'Adrenaline & Blockbuster Buff',
    favoriteGenres: ['Action', 'Adventure', 'Crime'],
    ratedMovies: {
      'm4': 5, // The Dark Knight
      'm15': 5, // Top Gun: Maverick
      'm26': 5, // Mad Max: Fury Road
      'm2': 4,  // Inception
      'm25': 4  // Seven
    },
    watchlist: ['m3', 'm8', 'm11'],
    tasteVector: {
      'Action': 0.95,
      'Adventure': 0.88,
      'Crime': 0.80,
      'Thriller': 0.70,
      'Sci-Fi': 0.65
    }
  },
  {
    id: 'emma',
    name: 'Emma Watson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    tagline: 'Animation & Fantasy Connoisseur',
    favoriteGenres: ['Animation', 'Adventure', 'Fantasy'],
    ratedMovies: {
      'm8': 5, // Spider-Verse
      'm12': 5, // Spirited Away
      'm16': 5, // Coco
      'm22': 5, // WALL-E
      'm28': 5  // Princess Mononoke
    },
    watchlist: ['m10', 'm14', 'm1'],
    tasteVector: {
      'Animation': 0.99,
      'Fantasy': 0.90,
      'Adventure': 0.85,
      'Comedy': 0.70,
      'Sci-Fi': 0.60
    }
  }
];
