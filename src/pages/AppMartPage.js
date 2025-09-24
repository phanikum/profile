import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppService from '../services/AppService';

const AppMartPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [topPicks, setTopPicks] = useState([]);
  const [entertainmentApps, setEntertainmentApps] = useState([]);
  const [socialApps, setSocialApps] = useState([]);
  const [gamesApps, setGamesApps] = useState([]);
  const [businessApps, setBusinessApps] = useState([]);
  const [financeApps, setFinanceApps] = useState([]);
  const [travelApps, setTravelApps] = useState([]);

  useEffect(() => {
    // Load initial data
    setTopPicks(AppService.getTopPicks(4));
    setEntertainmentApps(AppService.getAppsByCategory('Entertainment').slice(0, 4));
    setSocialApps(AppService.getAppsByCategory('Social').slice(0, 4));
    setGamesApps(AppService.getAppsByCategory('Games').slice(0, 4));
    setBusinessApps(AppService.getAppsByCategory('Business').slice(0, 4));
    setFinanceApps(AppService.getAppsByCategory('Finance').slice(0, 4));
    setTravelApps(AppService.getAppsByCategory('Travel').slice(0, 4));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setSearchResults(AppService.searchApps(query));
    } else {
      setSearchResults([]);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }
    
    return stars;
  };

  const AppCard = ({ app }) => (
    <div className="app-card" data-category={app.category.toLowerCase()}>
      <div className="app-icon">
        <div className="icon-placeholder">
          {app.name.charAt(0)}
        </div>
      </div>
      
      <div className="app-info">
        <h4 className="app-name">{app.name}</h4>
        <p className="app-developer">{app.developer}</p>
        <div className="app-rating">
          <div className="stars">
            {renderStars(app.rating)}
          </div>
          <span className="rating-text">
            {app.rating} ({AppService.formatReviewCount(app.reviews)})
          </span>
        </div>
      </div>
      
      <div className="app-details">
        <p className="app-description">{app.description}</p>
        <div className="app-features">
          <div className="features-list">
            {app.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="feature-tag">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="app-price-section">
        <p className="app-price">{AppService.formatPrice(app.price)}</p>
        <button className="install-btn">
          {app.installationStatus.isInstalled ? 'Open' : 'Install'}
        </button>
      </div>
    </div>
  );

  const AppSection = ({ title, apps, emoji }) => (
    <section className="app-section">
      <h2 className="section-title">
        <span className="section-emoji">{emoji}</span>
        {title}
      </h2>
      <div className="apps-grid">
        {apps.map(app => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="app-mart-page">
      <div className="container">
        <header className="page-header">
          <Link to="/" className="back-link">← Back to Profile</Link>
          <h1>🏪 App Mart</h1>
          <p className="page-subtitle">Discover Amazing Apps</p>
        </header>
        
        <main className="page-content">
          {/* Search Section */}
          <section className="search-section">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search apps, games, and more..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="search-input"
              />
              <button className="search-btn">🔍</button>
            </div>
            
            {searchResults.length > 0 && (
              <div className="search-results">
                <h3>Search Results ({searchResults.length})</h3>
                <div className="apps-grid">
                  {searchResults.slice(0, 8).map(app => (
                    <AppCard key={app.id} app={app} />
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Top Picks Section */}
          {!searchQuery && (
            <>
              <AppSection 
                title="Top Picks" 
                apps={topPicks} 
                emoji="🏆" 
              />

              {/* Entertainment Section */}
              <AppSection 
                title="Entertainment" 
                apps={entertainmentApps} 
                emoji="🎬" 
              />

              {/* Social Section */}
              <AppSection 
                title="Social" 
                apps={socialApps} 
                emoji="👥" 
              />

              {/* Games Section */}
              <AppSection 
                title="Games" 
                apps={gamesApps} 
                emoji="🎮" 
              />

              {/* Business Section */}
              <AppSection 
                title="Business" 
                apps={businessApps} 
                emoji="💼" 
              />

              {/* Finance Section */}
              <AppSection 
                title="Finance" 
                apps={financeApps} 
                emoji="💰" 
              />

              {/* Travel Section */}
              <AppSection 
                title="Travel" 
                apps={travelApps} 
                emoji="✈️" 
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AppMartPage;
