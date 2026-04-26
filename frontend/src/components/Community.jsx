import React, { useState } from 'react';
import './Community.css';

const Community = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Home Decor', 'Furniture', 'Electronics', 'Apparel'];

  const comparisons = [
    {
      id: 1,
      title: 'Nordic Oak Bed Frame',
      match: '98% Match',
      matchType: 'high',
      quote: '"Exceeded expectations. The wood grain is actually more beautiful in person than the studio shots suggest."',
      user: 'Sarah J.',
      likes: 42,
      comments: 3,
      catalogImg: 'https://images.unsplash.com/photo-1505693419148-db19f38768e7?auto=format&fit=crop&q=80&w=400',
      realImg: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 2,
      title: '34" Ultrawide OLED',
      match: '99% Match',
      matchType: 'high',
      quote: '"Exact match. Colors are identical. The stand is actually more stable than it looks in the promo shots."',
      user: 'David L.',
      likes: 256,
      comments: 45,
      catalogImg: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400',
      realImg: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 3,
      title: 'Velo S-Watch Pro',
      match: '96% Match',
      matchType: 'high',
      quote: '"Display is actually brighter in person. Straps are high quality. Very happy with this one!"',
      user: 'Alex B.',
      likes: 312,
      comments: 27,
      catalogImg: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400',
      realImg: 'https://images.unsplash.com/photo-1508685096489-775b39920194?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 4,
      title: 'Arctic Expedition Parka',
      match: '85% Match',
      matchType: 'medium',
      quote: '"The blue is slightly darker than the photos, but the warmth is incredible. Fits true to size."',
      user: 'Marcus T.',
      likes: 128,
      comments: 12,
      catalogImg: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=400',
      realImg: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 5,
      title: 'Artisan Ceramic Vase',
      match: '72% Match',
      matchType: 'low',
      quote: '"The texture is much rougher than it appears in the photos. Still nice, but not what I expected from the smooth studio look."',
      user: 'Elena R.',
      likes: 89,
      comments: 18,
      catalogImg: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=400',
      realImg: 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 6,
      title: 'Turbo Streak Runners',
      match: '94% Match',
      matchType: 'high',
      quote: '"The color pops just like the photos. They\'ve held up well after 50 miles of trails."',
      user: 'Jordan K.',
      likes: 45,
      comments: 6,
      catalogImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
      realImg: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <div className="community-root">
      <header className="community-header">
        <h1 className="community-title">Expectation Comparison Wall</h1>
        <p className="community-subtitle">Real-world proof from the community. See how our products look in your homes versus our studio catalog.</p>
        
        <div className="filter-row-pro">
          {filters.map(filter => (
            <button 
              key={filter} 
              className={`filter-pill-pro ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      <div className="comparison-grid-pro">
        {comparisons.map(comp => (
          <div key={comp.id} className="comparison-card-pro">
            <div className="comparison-images-hub">
              <div className="img-container catalog">
                <img src={comp.catalogImg} alt="Catalog" />
                <span className="img-tag">CATALOG</span>
              </div>
              <div className="img-container real">
                <img src={comp.realImg} alt="Real Life" />
                <span className="img-tag">REAL LIFE</span>
              </div>
            </div>
            
            <div className="comparison-body-pro">
              <div className="card-top-row">
                <h3 className="comp-item-title">{comp.title}</h3>
                <span className={`match-badge-pro ${comp.matchType}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {comp.match}
                </span>
              </div>
              <p className="comp-quote">{comp.quote}</p>
              
              <div className="comp-footer-pro">
                <div className="user-info-mini">
                  <div className="user-avatar-hub">{comp.user[0]}</div>
                  <span className="user-name-hub">{comp.user}</span>
                </div>
                <div className="comp-actions-hub">
                  <button className="comp-action-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                    {comp.likes}
                  </button>
                  <button className="comp-action-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    {comp.comments}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="load-more-hub">
        <button className="btn-load-more">
          Load More Comparisons
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
      </div>
    </div>
  );
};

export default Community;
