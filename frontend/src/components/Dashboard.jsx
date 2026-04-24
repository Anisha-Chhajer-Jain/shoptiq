import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const [activeNav, setActiveNav] = useState('Dashboard');

  const navItems = ['Dashboard', 'Style Profile', 'Orders', 'Store Management', 'Analytics', 'Settings'];

  return (
    <div className="dashboard-container">
      {/* Navbar Component */}
      <Navbar onLogout={onLogout} />

      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-hub">
            <div className="sidebar-hub-title">Enterprise Hub</div>
            <div className="sidebar-hub-subtitle">SMART UNIFIED COMMERCE</div>
          </div>
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <button
                key={item}
                className={`sidebar-nav-item ${activeNav === item ? 'active' : ''}`}
                onClick={() => setActiveNav(item)}
              >
                <span className="nav-dot"></span>
                {item}
              </button>
            ))}
          </nav>
          <button className="new-negotiation-btn">+ New Negotiation</button>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="welcome-header">
            <div className="welcome-header-left">
              <h1 className="welcome-title">Welcome back, Alexander</h1>
              <p className="welcome-sub">Here is what is happening with your commerce ecosystem today.</p>
            </div>
            <button className="add-product-btn" onClick={() => alert('Add Product / Item')}>  
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Product
            </button>
          </div>

          <div className="content-grid">
            {/* Left Column */}
            <div className="left-col">

              {/* Active Negotiations */}
              <section className="section-card">
                <div className="section-header">
                  <div className="section-title"><span className="green-dot"></span> Active Negotiations</div>
                  <a href="#" className="view-all">View All</a>
                </div>
                <div className="negotiation-item">
                  <div className="negotiation-icon">📦</div>
                  <div className="negotiation-info">
                    <div className="negotiation-name">Bulk Order: M3 Pro Workstations</div>
                    <div className="negotiation-meta">Pending seller response • 50 units</div>
                  </div>
                  <div className="negotiation-right">
                    <div className="negotiation-price">₹1,18,40,000</div>
                    <span className="badge-green">COUNTER OFFERED</span>
                  </div>
                </div>
                <div className="negotiation-item">
                  <div className="negotiation-icon">🪑</div>
                  <div className="negotiation-info">
                    <div className="negotiation-name">Ergonomic Seating Cluster</div>
                    <div className="negotiation-meta">Awaiting your approval • 12 units</div>
                  </div>
                  <div className="negotiation-right">
                    <div className="negotiation-price">₹6,85,000</div>
                    <span className="badge-blue">IN REVIEW</span>
                  </div>
                </div>
              </section>

              {/* Recent Orders */}
              <section className="section-card">
                <div className="section-header">
                  <div className="section-title">Recent Orders</div>
                  <button className="filter-btn">⊞ Filter</button>
                </div>
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>PRODUCT</th>
                      <th>DATE</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#ORD-9921</td>
                      <td>Wireless Charging Hub (v2)</td>
                      <td>12 Oct, 2023</td>
                      <td><span className="badge-green">Delivered</span></td>
                    </tr>
                    <tr>
                      <td>#ORD-9844</td>
                      <td>Nordic Desk Lamp</td>
                      <td>08 Oct, 2023</td>
                      <td><span className="badge-blue">Shipped</span></td>
                    </tr>
                    <tr>
                      <td>#ORD-9801</td>
                      <td>Studio Monitor Speakers</td>
                      <td>01 Oct, 2023</td>
                      <td><span className="badge-yellow">Processing</span></td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* Pending Reviews */}
              <section className="section-card">
                <div className="section-header">
                  <div className="section-title">Pending Reviews</div>
                  <div className="verification-level">
                    <span>Verification Level:</span>
                    <span className="dot-green"></span>
                    <span className="dot-green"></span>
                    <span className="dot-green"></span>
                    <span className="dot-gray"></span>
                  </div>
                </div>
                <p className="section-subtitle">Help others by verifying product reality vs marketing.</p>
                <div className="reviews-grid">
                  <div className="review-card">
                    <div className="upload-placeholder">📷 UPLOAD PHOTO</div>
                    <div className="review-name">Ceramic Studio Series Vase</div>
                    <div className="review-meta">Ordered: 28 Sept • Arrived: 02 Oct</div>
                    <div className="expectation-meter-label">Expectation Meter</div>
                    <div className="meter-bar">
                      <div className="meter-fill" style={{ width: '65%' }}></div>
                      <div className="meter-thumb" style={{ left: '65%' }}></div>
                    </div>
                    <div className="meter-labels">
                      <span>NOT AS DESCRIBED</span>
                      <span>EXACT MATCH</span>
                    </div>
                    <button className="submit-review-btn">Submit Review</button>
                  </div>
                  <div className="smart-insights-card">
                    <div className="insights-icon">📈</div>
                    <div className="insights-title">Smart Insights</div>
                    <p className="insights-text">Users like you mentioned the Nordic Desk Lamp has a warmer tone in person than studio photos suggest. Upload a photo in natural light to help the community.</p>
                  </div>
                </div>
              </section>

              {/* Featured Collections */}
              <section className="section-card">
                <div className="section-header">
                  <div className="section-title">Featured Collections</div>
                  <a href="#" className="view-all">View All Collections</a>
                </div>
                <p className="section-subtitle">Curated high-performance gear and apparel.</p>
                <div className="products-grid">
                  {[
                    { name: 'Quantum Watch X1', brand: 'TIXR', price: '₹24,900', tag: 'In Stock' },
                    { name: 'Velocity Runners', brand: 'Holobik', price: '₹9,999', tag: 'Live Stock' },
                    { name: 'Sonic Studio Pro', brand: 'AXRR', price: '₹37,500', tag: 'In Stock' },
                    { name: 'Essential Tee', brand: 'Holobik', price: '₹3,750', tag: 'In Stock' },
                  ].map((product) => (
                    <div key={product.name} className="product-card">
                      <div className="product-img"></div>
                      <div className="product-tag">{product.tag}</div>
                      <div className="product-brand">{product.brand}</div>
                      <div className="product-name">{product.name}</div>
                      <div className="product-footer">
                        <div className="product-price">{product.price}</div>
                        <button className="add-to-cart">🛒</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Trending Community Deals */}
              <section className="section-card">
                <div className="section-header">
                  <div className="section-title">Trending Community Deals</div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="filter-btn">‹</button>
                    <button className="filter-btn">›</button>
                  </div>
                </div>
                <div className="products-grid">
                  {[
                    { name: 'Studio Headset Pro', price: '₹16,590', original: '₹28,999', tag: '-40% Today', left: '14 Left' },
                    { name: 'Ultra-Slim Hub', price: '₹3,750', original: null, tag: 'COMMUNITY FAVOURITE', left: 'Ends in 2h' },
                  ].map((item) => (
                    <div key={item.name} className="product-card">
                      <div className="product-img" style={{ background: 'linear-gradient(135deg, #1a202c, #2d3748)' }}></div>
                      <div className="product-tag" style={{ background: '#fed7d7', color: '#c53030' }}>{item.tag}</div>
                      <div className="product-name" style={{ padding: '0.5rem 0.75rem 0.25rem' }}>{item.name}</div>
                      <div className="product-footer">
                        <div>
                          <div className="product-price">{item.price}</div>
                          {item.original && <div style={{ fontSize: '0.7rem', color: '#a0aec0', textDecoration: 'line-through' }}>{item.original}</div>}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#718096' }}>{item.left}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Member Flash Sale */}
              <section className="flash-sale-card">
                <div>
                  <div className="flash-sale-title">Member Flash Sale</div>
                  <p className="flash-sale-text">Get an extra 15% off at all local boutiques this weekend.</p>
                  <button className="claim-voucher-btn">CLAIM VOUCHER</button>
                </div>
                <div className="flash-sale-icon">🏷️</div>
              </section>
            </div>

            {/* Right Column */}
            <div className="right-col">
              {/* Style Profile */}
              <section className="section-card dark-card">
                <div className="section-title white">My Style Profile</div>
                <p className="white-sub">Personalised preferences for smart recommendations.</p>
                <div className="style-row">
                  <span className="style-label">Primary Style</span>
                  <span className="style-value">Minimalist Modern</span>
                </div>
                <div className="style-row">
                  <span className="style-label">Preferred Materials</span>
                  <span className="style-value">Recycled Steel, Oak</span>
                </div>
                <div className="style-row">
                  <span className="style-label">Color Palette</span>
                  <div className="color-dots">
                    <div className="color-dot white-dot"></div>
                    <div className="color-dot gray-dot"></div>
                    <div className="color-dot dark-dot"></div>
                  </div>
                </div>
                <button className="update-pref-btn">Update Preferences</button>
              </section>

              {/* My Reservations */}
              <section className="section-card">
                <div className="section-title" style={{ marginBottom: '1rem' }}>My Reservations</div>
                <div className="reservation-item">
                  <div className="reservation-img" style={{ backgroundColor: '#2d3748' }}></div>
                  <div className="reservation-info">
                    <div className="reservation-name">EV Genesis Prototype</div>
                    <div className="reservation-meta">Priority Queue #142</div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '75%' }}></div>
                    </div>
                    <div className="progress-label">PRODUCTION: 75% COMPLETE</div>
                  </div>
                </div>
              </section>

              {/* Live Inventory Nearby */}
              <section className="section-card">
                <div className="section-header">
                  <div className="section-title">Live Inventory Near You</div>
                  <a href="#" className="view-all">View Map</a>
                </div>
                <p className="section-subtitle">Real-time stock from authorised local boutiques in your city.</p>
                {[
                  { name: 'The Archive', dist: '1.2 km away', tags: ["Men's Outerwear", "+12 tags"], status: 'OPEN NOW', statusColor: '#38a169' },
                  { name: 'Lumina Boutique', dist: '2.0 km away', tags: ['Footwear', 'Accessories'], status: 'OPENS 10AM', statusColor: '#d69e2e' },
                  { name: 'Elysian Goods', dist: '4.0 km away', tags: ['Home Decor', 'Gifts'], status: 'OPEN NOW', statusColor: '#38a169' },
                ].map((store) => (
                  <div key={store.name} className="store-card">
                    <div className="store-header">
                      <div className="store-icon">🏬</div>
                      <span className="store-status" style={{ color: store.statusColor }}>{store.status}</span>
                    </div>
                    <div className="store-name">{store.name}</div>
                    <div className="store-dist">📍 {store.dist}</div>
                    <div className="store-tags">
                      {store.tags.map((tag) => <span key={tag} className="store-tag">{tag}</span>)}
                    </div>
                    <button className="browse-stock-btn">Browse Stock</button>
                  </div>
                ))}
              </section>

              {/* Smart Pricing */}
              <section className="section-card" style={{ background: '#f0f4f8' }}>
                <div className="section-title">Smart Pricing</div>
                <p className="section-subtitle">Negotiate &amp; Bulk Deals auto-calculated based on market demand and loyalty.</p>
                <div style={{ height: '8px', background: '#38a169', borderRadius: '4px', marginTop: '1rem' }}></div>
                <p style={{ color: '#38a169', fontSize: '0.75rem', marginTop: '0.5rem', fontWeight: 600 }}>💡 Savings optimised: 24% lower than market</p>
              </section>
            </div>
          </div>
        </main>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Dashboard;
