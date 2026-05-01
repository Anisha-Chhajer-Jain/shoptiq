import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Community.css';

const Community = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [comparisons, setComparisons] = useState([]);
  const [loading, setLoading] = useState(true);

  const filters = ['All', 'Home Decor', 'Furniture', 'Electronics', 'Apparel'];

  const categoryMap = {
    'Home Decor': 'home-decoration',
    'Furniture': 'furniture',
    'Electronics': 'laptops',
    'Apparel': 'womens-dresses'
  };

  const fetchComparisons = async (category) => {
    setLoading(true);
    try {
      let url = 'https://dummyjson.com/products?limit=12';
      if (category !== 'All') {
        url = `https://dummyjson.com/products/category/${categoryMap[category]}?limit=12`;
      }
      const response = await axios.get(url);
      
      let mappedData = response.data.products.map(p => ({
        id: p.id,
        title: p.title,
        match: `${Math.floor((p.rating / 5) * 100)}% Match`,
        matchType: p.rating > 4.5 ? 'high' : p.rating > 4.0 ? 'medium' : 'low',
        quote: `"${p.description}"`,
        user: `Reviewer ${p.id}`,
        likes: Math.floor(Math.random() * 500),
        comments: Math.floor(Math.random() * 50),
        catalogImg: p.thumbnail,
        realImg: p.images.length > 1 ? p.images[1] : p.images[0]
      }));

      // Shuffle array
      mappedData = mappedData.sort(() => Math.random() - 0.5);

      setComparisons(mappedData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComparisons(activeFilter);
  }, [activeFilter]);

  const handleLike = (id) => {
    setComparisons(prev => prev.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c));
  };

  const handleComment = (id) => {
    setComparisons(prev => prev.map(c => c.id === id ? { ...c, comments: c.comments + 1 } : c));
  };

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

      {loading ? (
        <div className="loading-spinner" style={{ textAlign: 'center', padding: '50px', fontSize: '1.2rem', fontWeight: 'bold' }}>
          Loading Community Posts...
        </div>
      ) : (
        <div className="comparison-grid-pro">
          {comparisons.map(comp => (
            <div key={comp.id} className="comparison-card-pro animate-slide-in-3d">
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
                    <div className="user-avatar-hub">{comp.user[9]}</div>
                    <span className="user-name-hub">{comp.user}</span>
                  </div>
                  <div className="comp-actions-hub">
                    <button className="comp-action-btn" onClick={() => handleLike(comp.id)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                      {comp.likes}
                    </button>
                    <button className="comp-action-btn" onClick={() => handleComment(comp.id)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      {comp.comments}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="load-more-hub">
        <button className="btn-load-more" onClick={() => fetchComparisons(activeFilter)}>
          Shuffle & Load More
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
      </div>
    </div>
  );
};

export default Community;
