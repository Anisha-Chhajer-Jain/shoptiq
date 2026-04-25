import React, { useState } from 'react';
import './Inventory.css';

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState('Market Street Flagship');

  const stores = [
    {
      name: 'Market Street Flagship',
      dist: '0.4 miles away • 4 min drive',
      units: '42 units available',
      status: 'In Stock',
      statusColor: 'green',
      location: { top: '25%', left: '55%' }
    },
    {
      name: 'Mission District Boutique',
      dist: '1.2 miles away • 12 min drive',
      units: '3 units remaining',
      status: 'Low Stock',
      statusColor: 'yellow',
      location: { top: '58%', left: '65%' }
    },
    {
      name: 'SOMA Distribution Center',
      dist: '2.1 miles away • 18 min drive',
      units: 'Restocking in 2 days',
      status: 'Out of Stock',
      statusColor: 'red',
      location: { top: '43%', left: '82%' }
    },
    {
      name: 'Hayes Valley Outlet',
      dist: '1.8 miles away • 15 min drive',
      units: '18 units available',
      status: 'In Stock',
      statusColor: 'green',
      location: { top: '80%', left: '50%' }
    }
  ];

  return (
    <div className="inventory-root">
      {/* ── Sidebar ── */}
      <aside className="inventory-sidebar">
        <div className="sidebar-header">
          <h3>Real-Time Inventory</h3>
          <p>Currently viewing: 24 stores in San Francisco area</p>
        </div>

        <div className="sidebar-search">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search stores or locations..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="sidebar-actions">
          <button className="filter-btn-black">
            <span className="icon">≡</span> Filters
          </button>
          <button className="sort-btn">Sort by: Closest</button>
        </div>

        <div className="store-list">
          {stores.map((store) => (
            <div 
              key={store.name} 
              className={`store-item-card ${selectedStore === store.name ? 'selected' : ''}`}
              onClick={() => setSelectedStore(store.name)}
            >
              <div className="store-row-top">
                <div className="store-info">
                  <div className="store-title">{store.name}</div>
                  <div className="store-meta">{store.dist}</div>
                </div>
                <div className={`status-badge ${store.statusColor}`}>
                   {store.status}
                </div>
              </div>
              <div className="store-units">
                <span className="icon">{store.statusColor === 'red' ? '⚠️' : '📦'}</span>
                {store.units}
              </div>
              <div className="store-actions">
                <button className={`reserve-btn ${store.statusColor === 'red' ? 'disabled' : ''}`}>
                  {store.statusColor === 'red' ? 'Unavailable' : 'Reserve for 2h'}
                </button>
                <button className="nav-btn-sm">
                   {store.statusColor === 'red' ? '🔔' : '🧭'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ── Map Area ── */}
      <main className="inventory-map-view">
        {/* Map Background (SVG/Image placeholder) */}
        <div className="map-canvas">
          <div className="map-water"></div>
          <div className="map-grid-lines"></div>
          
          {/* Legend */}
          <div className="map-legend">
            <div className="legend-title">Inventory Status</div>
            <div className="legend-item">
              <span className="dot green"></span> Available
            </div>
            <div className="legend-item">
              <span className="dot yellow"></span> Limited Stock
            </div>
            <div className="legend-item">
              <span className="dot red"></span> Out of Stock
            </div>
          </div>

          {/* Map Pins */}
          {stores.map((store) => (
            <div 
              key={store.name} 
              className={`map-pin-wrap ${selectedStore === store.name ? 'active' : ''}`}
              style={{ top: store.location.top, left: store.location.left }}
            >
              <div className={`map-pin-icon ${store.statusColor}`}>
                 {store.statusColor === 'green' && '🏬'}
                 {store.statusColor === 'yellow' && '🏪'}
                 {store.statusColor === 'red' && '🏭'}
              </div>
              <div className="map-pin-label">
                {store.name.split(' ')[0]} <span className={`dot-sm ${store.statusColor}`}></span>
              </div>
            </div>
          ))}

          {/* Map Controls */}
          <div className="map-controls">
            <button className="map-ctrl locate">🎯</button>
            <div className="zoom-group">
              <button className="map-ctrl">+</button>
              <button className="map-ctrl">−</button>
            </div>
          </div>

          {/* City Label */}
          <div className="city-label">San Francisco</div>
        </div>
      </main>
    </div>
  );
};

export default Inventory;
