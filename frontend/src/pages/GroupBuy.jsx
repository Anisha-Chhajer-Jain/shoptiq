import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GroupBuy.css';

const GroupBuy = () => {
  const navigate = useNavigate();
  const [pools] = useState([
    { id: 1, name: 'Quantum X-Series Rack', cat: 'Hardware', price: 12500, oldPrice: 18500, discount: '-32% TIER 2', progress: 82, timeLeft: '02d : 14h : 45m', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=400' },
    { id: 2, name: 'OmniHub Pro Controller', cat: 'IoT', price: 3500, oldPrice: 5500, discount: '-40% MAX TIER', progress: 100, timeLeft: '05h : 22m : 10s', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400' },
    { id: 3, name: 'Vanguard Modular Desk', cat: 'Furniture', price: 8500, oldPrice: 12500, discount: 'Tier 1', progress: 45, timeLeft: '12d : 08h : 15m', img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=400' }
  ]);

  const tiers = [
    { id: 1, title: 'Tier 1: Early Adopters', desc: 'The starting bulk price. Guaranteed lower than MSRP, but requires initial pool formation.', status: 'completed' },
    { id: 2, title: 'Tier 2: Growth Phase', desc: 'Reached at mid-capacity. Significant cost reduction is unlocked for everyone in the pool.', status: 'active' },
    { id: 3, title: 'Tier 3: Enterprise Price', desc: 'Maximum capacity reached. The absolute lowest price point possible, typically reserved for massive B2B orders.', status: 'pending' }
  ];

  return (
    <div className="groupbuy-root">
      {/* ── Hero Section ── */}
      <div className="gb-hero-grid">
        <section className="gb-hero-main">
          <span className="hero-status-pill">Active Now</span>
          <h1 className="hero-title">OmniCommerce Group Buy Portal</h1>
          <p className="hero-sub">Join high-volume pools to unlock enterprise-grade pricing. Collective bargaining power, simplified for your business.</p>
          <div className="hero-actions">
            <button className="btn-primary-hub">Explore Pools</button>
            <button className="btn-outline-hub">How it Works</button>
          </div>
        </section>

        <aside className="savings-hub-card">
          <h3>Your Savings Hub</h3>
          <div className="stat-item-hub">
            <div className="stat-icon-wrap"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></div>
            <div className="stat-text">
              <span className="label">TOTAL SAVINGS</span>
              <span className="value">₹1,24,500.00</span>
            </div>
          </div>
          <div className="stat-item-hub">
            <div className="stat-icon-wrap"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
            <div className="stat-text">
              <span className="label">ACTIVE PARTICIPATIONS</span>
              <span className="value">4 Pools</span>
            </div>
          </div>
        </aside>
      </div>

      {/* ── Featured Pools ── */}
      <section className="featured-pools-section">
        <div className="section-header-hub">
          <h2>Featured Active Pools</h2>
          <button className="text-link-hub">View All Pools</button>
        </div>
        <div className="pools-grid-hub">
          {pools.map(pool => (
            <div key={pool.id} className="pool-card-hub">
              <div className="pool-img-wrap">
                <img src={pool.img} alt={pool.name} />
                <div className="time-left-badge">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                   {pool.timeLeft}
                </div>
              </div>
              <div className="pool-body-hub">
                <div className="pool-cat-row">
                   <span className="pool-cat-pill">{pool.cat}</span>
                   <span className="pool-discount-text">{pool.discount}</span>
                </div>
                <h3 className="pool-name">{pool.name}</h3>
                <div className="pool-price-row">
                   <span className="current-price">₹{pool.price}</span>
                   <span className="old-price">₹{pool.oldPrice}</span>
                </div>
                <div className="pool-progress-area">
                   <div className="progress-labels">
                      <span>Unlocking Next Tier Discount (-45%)</span>
                      <span>{pool.progress}%</span>
                   </div>
                   <div className="progress-bar-hub">
                      <div className="fill" style={{ width: `${pool.progress}%` }}></div>
                   </div>
                   <p className="pool-hint">Only 18 more units needed to unlock $999 pricing!</p>
                </div>
                <div className="pool-actions-row">
                   <button className="btn-join-pool" onClick={() => navigate(`/groupbuy/${pool.id}`)}>Join Pool</button>
                   <button className="icon-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg></button>
                   <button className="icon-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom Section ── */}
      <div className="gb-bottom-grid">
        <section className="upcoming-buys-hub">
           <div className="card-header-pro">
              <h3>Upcoming Group Buys</h3>
              <button className="set-alerts-btn">Set Alerts</button>
           </div>
           <div className="upcoming-list">
              {[
                { name: 'Chronos Elite Fleet Watch', date: 'Starting July 15th', target: '₹35,000', img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=100' },
                { name: 'Titan-G Industrial Tablets', date: 'Starting July 20th', target: '₹22,000', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=100' },
                { name: 'SonicWave ANC Audio Kit', date: 'Starting July 28th', target: '₹12,500', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=100' }
              ].map((item, idx) => (
                <div key={idx} className="upcoming-item">
                   <img src={item.img} alt={item.name} />
                   <div className="item-info">
                      <strong>{item.name}</strong>
                      <p>{item.date} • Target Price: {item.target}</p>
                   </div>
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
              ))}
           </div>
        </section>

        <section className="how-tiers-hub">
           <div className="card-header-pro">
              <h3>How Tiers Work</h3>
           </div>
           <div className="tiers-stepper">
              {tiers.map((tier, idx) => (
                <div key={idx} className={`tier-step ${tier.status}`}>
                   <div className="step-num">{tier.status === 'completed' ? '✓' : idx + 1}</div>
                   <div className="step-content">
                      <strong>{tier.title}</strong>
                      <p>{tier.desc}</p>
                   </div>
                </div>
              ))}
           </div>
           <div className="propose-box">
              <p>Want to start your own custom procurement pool?</p>
              <button className="btn-propose">Propose a New Pool</button>
           </div>
        </section>
      </div>
    </div>
  );
};

export default GroupBuy;
