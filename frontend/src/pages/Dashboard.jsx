import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { PRODUCTS, NEGOTIATIONS, GROUP_BUYS } from '../data/products';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [dbProducts, setDbProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setDbProducts(data);
      } catch (error) {
        console.error('Failed to fetch DB products', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="dashboard-root">


      {/* ── Hero Banner ── */}
      <section className="hero-banner-pro">
        <div className="hero-content-pro">
          <div className="hero-badge-hub">
            <span className="dot"></span>
            UNIFIED COMMERCE 2.0
          </div>
          <h1 className="hero-h1">Shopping, Exactly How You Expect It.</h1>
          <p className="hero-p">Experience zero-friction commerce with verified live stock, dynamic smart pricing, and high-fidelity AR visualization.</p>
          <div className="hero-btns">
            <button className="btn-solid" onClick={() => navigate('/groupbuy')}>Explore Group Pools</button>
            <button className="btn-blur" onClick={() => navigate('/aistyling')}>Style Profile</button>
          </div>
        </div>
        <div className="hero-metric-pro">
           <div className="m-label">ACTIVE SAVINGS</div>
           <div className="m-value">₹8,450</div>
           <div className="m-trend">+12.5% THIS WEEK</div>
        </div>
      </section>

      {/* ── Main Dashboard Grid ── */}
      <div className="dashboard-main-grid">
        {/* Left: Negotiation Hub */}
        <section className="dashboard-card-section">
          <div className="card-section-header">
            <h3>Negotiation Hub</h3>
            <button className="card-link" onClick={() => navigate('/negotiation')}>View All</button>
          </div>
          <div className="neg-stack-pro">
            {NEGOTIATIONS.map((neg) => (
              <div key={neg.id} className="neg-item-pro">
                <div className="neg-info">
                  <strong>{neg.name}</strong>
                  <p>Asking: ₹{neg.asking.toLocaleString()} • Bid: <span className="blue">₹{neg.bid.toLocaleString()}</span></p>
                </div>
                <div className="neg-status-row">
                   <span className={`status-tag ${neg.type}`}>{neg.status}</span>
                   <button className="btn-manage-pro" onClick={() => navigate('/negotiation')}>Manage</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right: Featured Group Buys */}
        <section className="dashboard-card-section">
          <div className="card-section-header">
            <h3>Featured Group Buys</h3>
            <button className="card-link" onClick={() => navigate('/groupbuy')}>Browse Pools</button>
          </div>
          <div className="gb-stack-pro">
            {GROUP_BUYS.map((gb) => (
              <div key={gb.id} className="gb-item-pro" onClick={() => navigate('/groupbuy')}>
                <div className="gb-img-mini" style={{ backgroundImage: `url(${gb.img})` }}>
                  <div className="gb-discount-pro">{gb.discount}</div>
                </div>
                <div className="gb-details-pro">
                  <strong>{gb.name}</strong>
                  <div className="gb-bar-pro">
                    <div className="fill" style={{ width: `${gb.progress}%` }}></div>
                  </div>
                  <p>{gb.backers} backers • {gb.needed} more needed</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Precision Collection ── */}
      <section className="collection-section-pro">
        <div className="section-header-pro">
          <div>
            <h2 className="section-title-pro">The Precision Collection</h2>
            <p className="section-subtitle-pro">Curated high-fidelity essentials for the modern professional.</p>
          </div>
          <div className="nav-controls-pro">
            <button className="nav-btn">‹</button>
            <button className="nav-btn">›</button>
          </div>
        </div>

        <div className="precision-grid-pro">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="p-card-pro" onClick={() => navigate(`/product/${product.id}`)}>
              <div className="p-img-pro">
                <img src={product.img} alt={product.name} />
                <span className={`p-stock-pro ${product.status.toLowerCase().replace(' ', '-')}`}>{product.status}</span>
                <button className="p-add-pro" onClick={(e) => { 
                   e.stopPropagation(); 
                   navigate('/cart');
                }}>
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
              <div className="p-info-pro">
                <span className="p-brand-pro">{product.brand}</span>
                <h4 className="p-name-pro">{product.name}</h4>
                <div className="p-footer-pro">
                   <div className="p-pricing-pro">
                      <span className="p-price-pro">₹{product.price.toLocaleString()}</span>
                      <span className="p-old-price-pro" style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '0.8rem', marginLeft: '8px' }}>₹{product.oldPrice.toLocaleString()}</span>
                   </div>
                   <span className="p-offer-pro">{product.discount} SAVINGS</span>
                </div>
              </div>
            </div>
          ))}
          {/* Render Products fetched from MongoDB */}
          {dbProducts.map((product) => (
            <div key={product._id} className="p-card-pro" onClick={() => navigate(`/product/${product._id}`)}>
              <div className="p-img-pro">
                <img src={product.img || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'} alt={product.name} />
                <span className={`p-stock-pro in-stock`}>IN STOCK</span>
                <button className="p-add-pro" onClick={(e) => { 
                   e.stopPropagation(); 
                   navigate('/cart');
                }}>
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
              <div className="p-info-pro">
                <span className="p-brand-pro">{product.category}</span>
                <h4 className="p-name-pro">{product.name}</h4>
                <div className="p-footer-pro">
                   <div className="p-pricing-pro">
                      <span className="p-price-pro">₹{product.price.toLocaleString()}</span>
                   </div>
                   <span className="p-offer-pro">NEW</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAB Assistant */}
      <div className="fab-pro">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
         <span>Assistant</span>
      </div>
    </div>
  );
};

export default Dashboard;
