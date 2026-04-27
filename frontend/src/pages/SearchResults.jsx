import React, { useState } from 'react';
import './SearchResults.css';

const SearchResults = ({ query }) => {
  const products = [
    { id: 1, name: 'Linen Breeze Midi', price: '$124.00', status: 'Live Stock: 4 units nearby', stockColor: 'green', badge: 'NEGOTIABLE', badgeColor: 'green', img: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=600' },
    { id: 2, name: 'Azure Oxford', price: '$89.00', status: 'Low Stock: 1 unit left', stockColor: 'red', badge: 'BULK: 10% OFF', badgeColor: 'blue', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600' },
    { id: 3, name: 'Coastal Straw Fedora', price: '$55.00', status: 'Live Stock: 12 units nearby', stockColor: 'green', badge: 'NEGOTIABLE', badgeColor: 'green', img: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&q=80&w=600' },
    { id: 4, name: 'Canvas Deck Shorts', price: '$68.00', status: 'Live Stock: 8 units nearby', stockColor: 'green', badge: null, badgeColor: null, img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=600' },
    { id: 5, name: 'Tuscan Slide Sandals', price: '$145.00', status: 'Live Stock: 2 units nearby', stockColor: 'green', badge: 'NEGOTIABLE', badgeColor: 'green', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600' },
    { id: 6, name: 'Riviera Silk Scarf', price: '$42.00', status: 'Live Stock: 20 units nearby', stockColor: 'green', badge: null, badgeColor: null, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600' },
  ];

  return (
    <div className="search-results-root">
      {/* ── Filters Sidebar ── */}
      <aside className="filters-sidebar">
        <h2>Filters</h2>
        
        <div className="filter-section">
          <div className="toggle-row">
            <span>Available Near Me</span>
            <div className="toggle-switch active">
              <div className="toggle-thumb"></div>
            </div>
          </div>
        </div>

        <div className="filter-section">
          <label className="checkbox-item">
            <input type="checkbox" />
            <span className="checkmark"></span>
            Negotiable Only
          </label>
          <label className="checkbox-item">
            <input type="checkbox" defaultChecked />
            <span className="checkmark"></span>
            Bulk Discounts
          </label>
        </div>

        <div className="filter-section">
          <label className="section-label">Size</label>
          <div className="size-grid">
            <button className="size-btn">XS</button>
            <button className="size-btn active">S</button>
            <button className="size-btn">M</button>
            <button className="size-btn">L</button>
          </div>
        </div>

        <div className="filter-section">
          <label className="section-label">Color</label>
          <div className="color-grid">
            <div className="color-dot white active"></div>
            <div className="color-dot blue"></div>
            <div className="color-dot yellow"></div>
            <div className="color-dot navy"></div>
            <div className="color-dot peach"></div>
          </div>
        </div>
      </aside>

      {/* ── Results Main ── */}
      <main className="results-main">
        <header className="results-header">
          <div className="header-left">
            <span className="results-count">Showing 24 results for</span>
            <h1 className="results-query">'{query || 'Summer Collection'}'</h1>
          </div>
          <div className="header-right">
            <button className="sort-dropdown">
              Sort: Popularity <span className="chevron">⌄</span>
            </button>
          </div>
        </header>

        <div className="products-grid-results">
          {products.map((product) => (
            <div key={product.id} className="product-card-res">
              <div className="res-img-wrap">
                <img src={product.img} alt={product.name} />
                {product.badge && (
                  <span className={`res-badge ${product.badgeColor}`}>{product.badge}</span>
                )}
                <div className="fit-icon-overlay">🔍</div>
              </div>
              <div className="res-content">
                <div className="res-title-row">
                  <h3 className="res-name">{product.name}</h3>
                  <span className="res-price">{product.price}</span>
                </div>
                <div className={`res-stock ${product.stockColor}`}>
                  <span className="stock-dot"></span> {product.status}
                </div>
                <button className="add-to-cart-res">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Pagination ── */}
        <footer className="pagination">
          <button className="page-btn">‹</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <span className="page-dots">...</span>
          <button className="page-btn">12</button>
          <button className="page-btn">›</button>
        </footer>
      </main>
    </div>
  );
};

export default SearchResults;
