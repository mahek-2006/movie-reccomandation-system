# CineAI — Hybrid Movie Recommendation System

An AI-powered personalized movie recommendation web platform built as a college Machine Learning capstone project demonstration.

![CineAI Banner](https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80)

---

## 🌟 Key Features

- **Hybrid Recommendation Engine**: Combines Collaborative Filtering and Content-Based signals:
  $$\mathbf{S_{\text{hybrid}}(u, i) = \alpha \cdot S_{\text{CF}}(u, i) + (1 - \alpha) \cdot S_{\text{CB}}(u, i)}$$
- **Dynamic Method Switching**: Toggle between Collaborative Filtering, Content-Based, and Hybrid recommendation algorithms on the fly.
- **Interactive $\alpha$-Weight Slider**: Adjust the Collaborative vs. Content-Based ratio (0% to 100%) in real time.
- **Persona Switcher**: Switch between preset user personas (*Alex, Sarah, David, Emma*) to showcase candidate shift during viva.
- **Interactive 5-Star Ratings & Watchlist**: User ratings immediately influence collaborative neighborhoods and recommendation rankings.
- **Full Movie Explorer**: Multi-faceted filter system (genre, IMDb rating, year, language) and search.
- **Model Explanation & System Architecture**: Visual pipeline diagrams for offline training vs. online serving.
- **Dataset & Evaluation Dashboards**: Interactive charts powered by Recharts (Rating distribution, Genre breakdown, Precision@10 benchmark comparisons).

---

## 📊 Benchmark Model Metrics (MovieLens 25M)

| Metric | Project Value | Baseline | Significance |
| :--- | :--- | :--- | :--- |
| **Precision@10 (Hybrid)** | **0.41** | 0.18 (Popularity) | **+24% increase over standalone CF** |
| **Recall@10** | **0.29** | 0.14 | Higher top-N relevant item retrieval |
| **RMSE** | **0.83** | 1.02 | Lower rating error on test split |
| **Catalog Coverage** | **87%** | 24% | Mitigates popularity bias & cold start |

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Recharts, Vite
- **Recommendation & ML Framework**: Python, Pandas, NumPy, Scikit-learn, SVD, TF-IDF, Cosine Similarity
- **Backend Architecture**: FastAPI, Redis (Caching), PostgreSQL
- **Experimentation**: Jupyter Notebooks, MLflow

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/mahek-2006/movie-reccomandation-system.git
cd movie-reccomandation-system
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000/](http://localhost:3000/) in your browser.

### 4. Build for production
```bash
npm run build
npm run preview
```

---

## 📜 License
MIT License. Built for College ML Project & Viva Examination.