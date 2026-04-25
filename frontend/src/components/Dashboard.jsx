import React from 'react';
import './Dashboard.css';

const Dashboard = ({ onNavigate }) => {
  const negotiations = [
    { name: 'Onyx Mechanical Watch', asking: '₹4,500', bid: '₹3,800', status: 'Counter-Offer', type: 'offer' },
    { name: 'Eames Lounge Chair Rep.', asking: '₹12,999', bid: '₹10,500', status: 'Waiting for Seller', type: 'waiting' }
  ];

  const groupBuys = [
    { name: 'Studio Audio Pack', progress: 85, backers: 142, needed: 8, discount: '35% OFF', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400' },
    { name: 'Smart Garden Kit v2', progress: 62, backers: 94, needed: 26, discount: '20% OFF', img: 'https://images.unsplash.com/photo-1585336139118-1079a79c5155?auto=format&fit=crop&q=80&w=400' }
  ];

  const precisionCollection = [
    { id: 'p1', name: 'Structured Wool Overcoat', brand: 'HERITAGE COLLECTION', price: '₹4,500', oldPrice: '₹6,500', status: 'IN STOCK', img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=400' },
    { id: 'p2', name: 'Raw Edge Shorts', brand: 'STUDIO DENIM', price: '₹1,200', oldPrice: '₹1,800', status: 'LOW STOCK', img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=400' },
    { id: 'p3', name: 'Nordic Chrono 40', brand: 'ACCESSORIES', price: '₹2,400', oldPrice: '₹3,200', status: 'IN STOCK', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400' },
    { id: 'p4', name: 'Satchel 1.0', brand: 'LUXURY LEATHER', price: '₹3,500', oldPrice: '₹4,800', status: 'IN STOCK', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400' }
  ];

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
            <button className="btn-solid" onClick={() => onNavigate('groupbuy')}>Explore Group Pools</button>
            <button className="btn-blur" onClick={() => onNavigate('aistyling')}>Style Profile</button>
          </div>
        </div>
        <div className="metrics-summary-pro">
          <div className="metric-pill">Active Savings: <strong>₹8,450</strong></div>
          <div className="metric-pill">Negotiations: <strong>4 Active</strong></div>
          <div className="m-trend">+12.5% THIS WEEK</div>
        </div>
      </section>

      {/* ── Main Dashboard Grid ── */}
      <div className="dashboard-main-grid">
        {/* Left: Negotiation Hub */}
        <section className="dashboard-card-section">
          <div className="card-section-header">
            <h3>Negotiation Hub</h3>
            <button className="card-link">View All</button>
          </div>
          <div className="neg-stack-pro">
            {negotiations.map((neg, idx) => (
              <div key={idx} className="neg-item-pro">
                <div className="neg-info">
                  <strong>{neg.name}</strong>
                  <p>Asking: {neg.asking} • Bid: <span className="blue">{neg.bid}</span></p>
                </div>
                <div className="neg-status-row">
                  <span className={`status-tag ${neg.type}`}>{neg.status}</span>
                  <button className="btn-manage-pro">Manage</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right: Featured Group Buys */}
        <section className="dashboard-card-section">
          <div className="card-section-header">
            <h3>Featured Group Buys</h3>
            <button className="card-link" onClick={() => onNavigate('groupbuy')}>Browse Pools</button>
          </div>
          <div className="gb-stack-pro">
            {groupBuys.map((gb, idx) => (
              <div key={idx} className="gb-item-pro" onClick={() => onNavigate('groupbuy')}>
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
          {precisionCollection.map((product) => (
            <div key={product.id} className="p-card-pro" onClick={() => onNavigate('product-detail')}>
              <div className="p-img-pro">
                <img src={product.img} alt={product.name} />
                <span className={`p-stock-pro ${product.status.toLowerCase().replace(' ', '-')}`}>{product.status}</span>
                <button className="p-add-pro" onClick={(e) => { e.stopPropagation(); onNavigate('cart'); }}>
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
              <div className="p-info-pro">
                <span className="p-brand-pro">{product.brand}</span>
                <h4 className="p-name-pro">{product.name}</h4>
                <div className="p-footer-pro">
                  <span className="cur-price">{product.price}</span>
                  <span className="old-price">{product.oldPrice}</span>
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
