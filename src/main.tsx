import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecommenderProvider } from './context/RecommenderContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecommenderProvider>
      <App />
    </RecommenderProvider>
  </React.StrictMode>
);
