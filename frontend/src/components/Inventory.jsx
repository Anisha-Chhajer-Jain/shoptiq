import React, { useState } from 'react';
import './Inventory.css';

const stores = [
  { id: 1, name: 'Connaught Place Flagship', dist: '0.6 km', drive: '3 min drive', units: 42, status: 'in-stock', restocking: null },
  { id: 2, name: 'Lajpat Nagar Boutique', dist: '1.9 km', drive: '12 min drive', units: 3, status: 'low-stock', restocking: null },
  { id: 3, name: 'Nehru Place Distribution', dist: '3.4 km', drive: '20 min drive', units: 0, status: 'out-stock', restocking: 'Restocking in 2 days' },
  { id: 4, name: 'Saket Outlet', dist: '2.9 km', drive: '15 min drive', units: 18, status: 'in-stock', restocking: null },
  { id: 5, name: 'Karol Bagh Store', dist: '4.2 km', drive: '22 min drive', units: 7, status: 'low-stock', restocking: null },
  { id: 6, name: 'Vasant Kunj Mall', dist: '6.1 km', drive: '30 min drive', units: 31, status: 'in-stock', restocking: null },
];

const mapPins = [
  { id: 1, x: '28%', y: '38%', label: 'CP', status: 'in-stock' },
  { id: 2, x: '55%', y: '62%', label: 'LN', status: 'low-stock' },
  { id: 3, x: '65%', y: '72%', label: 'NP', status: 'out-stock' },
  { id: 4, x: '42%', y: '78%', label: 'SK', status: 'in-stock' },
  { id: 5, x: '22%', y: '55%', label: 'KB', status: 'low-stock' },
  { id: 6, x: '30%', y: '80%', label: 'VK', status: 'in-stock' },
];

const statusLabel = { 'in-stock': 'In Stock', 'low-stock': 'Low Stock', 'out-stock': 'Out of Stock' };

const Inventory = () => {
  const [search, setSearch] = useState('');
  const [selectedStore, setSelectedStore] = useState(1);
  const [sortBy, setSortBy] = useState('Closest');

  const filtered = stores.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="inventory-container">
      {/* Left Panel */}
      <aside className="inv-panel">
        <div className="inv-panel-header">
          <div className="inv-title">Real-Time Inventory</div>
          <div className="inv-subtitle">Currently viewing: {stores.length} stores in Delhi NCR area</div>
        </div>

        <div className="inv-search-bar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            type="text"
            placeholder="Search stores or locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="inv-controls">
          <button className="inv-filter-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"></line><line x1="8" y1="12" x2="16" y2="12"></line><line x1="10" y1="18" x2="14" y2="18"></line></svg>
            Filters
          </button>
          <button className="inv-sort-btn" onClick={() => setSortBy(sortBy === 'Closest' ? 'Available' : 'Closest')}>
            Sort by: {sortBy}
          </button>
        </div>

        <div className="inv-store-list">
          {filtered.map((store) => (
            <div
              key={store.id}
              className={`inv-store-card ${selectedStore === store.id ? 'selected' : ''}`}
              onClick={() => setSelectedStore(store.id)}
            >
              <div className="inv-store-top">
                <div className="inv-store-name">{store.name}</div>
                <span className={`inv-status-badge ${store.status}`}>{statusLabel[store.status]}</span>
              </div>
              <div className="inv-store-meta">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="10" r="3"></circle><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 13 8 13s8-7.75 8-13a8 8 0 0 0-8-8z"></path></svg>
                {store.dist} away • {store.drive}
              </div>
              {store.restocking && (
                <div className="inv-restocking">🔄 {store.restocking}</div>
              )}
              <div className="inv-units">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"></rect><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path></svg>
                {store.status === 'out-stock' ? 'Currently unavailable' : `${store.units} units available`}
              </div>
              <div className="inv-store-actions">
                <button
                  className={`inv-reserve-btn ${store.status === 'out-stock' ? 'disabled' : ''}`}
                  disabled={store.status === 'out-stock'}
                >
                  {store.status === 'out-stock' ? 'Unavailable' : 'Reserve for 2h'}
                </button>
                <button className="inv-navigate-btn" title="Navigate">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Map Area */}
      <div className="inv-map-area">
        {/* Inventory Status Legend */}
        <div className="inv-legend">
          <div className="inv-legend-title">Inventory Status</div>
          <div className="inv-legend-item"><span className="legend-dot green"></span> Available</div>
          <div className="inv-legend-item"><span className="legend-dot orange"></span> Limited Stock</div>
          <div className="inv-legend-item"><span className="legend-dot red"></span> Out of Stock</div>
        </div>

        {/* Map Placeholder */}
        <div className="inv-map">
          {/* Grid lines to simulate a map */}
          <div className="map-grid"></div>

          {/* City label */}
          <div className="map-city-label">Delhi NCR</div>

          {/* Map roads (decorative) */}
          <svg className="map-roads" viewBox="0 0 800 600" preserveAspectRatio="none">
            <line x1="0" y1="300" x2="800" y2="300" stroke="#d4d8e2" strokeWidth="3"/>
            <line x1="400" y1="0" x2="400" y2="600" stroke="#d4d8e2" strokeWidth="3"/>
            <line x1="0" y1="150" x2="800" y2="450" stroke="#d4d8e2" strokeWidth="2"/>
            <line x1="0" y1="450" x2="800" y2="150" stroke="#d4d8e2" strokeWidth="2"/>
            <line x1="150" y1="0" x2="650" y2="600" stroke="#cdd1db" strokeWidth="1.5"/>
            <line x1="650" y1="0" x2="150" y2="600" stroke="#cdd1db" strokeWidth="1.5"/>
            <circle cx="400" cy="300" r="80" fill="none" stroke="#d4d8e2" strokeWidth="1.5"/>
            <circle cx="400" cy="300" r="160" fill="none" stroke="#d4d8e2" strokeWidth="1"/>
            <circle cx="400" cy="300" r="240" fill="none" stroke="#d4d8e2" strokeWidth="0.75"/>
            <rect x="300" y="220" width="200" height="160" rx="8" fill="#e8eaf0" stroke="#d4d8e2" strokeWidth="1"/>
            <rect x="150" y="100" width="120" height="80" rx="6" fill="#e8eaf0" stroke="#d4d8e2" strokeWidth="1"/>
            <rect x="530" y="400" width="140" height="90" rx="6" fill="#e8eaf0" stroke="#d4d8e2" strokeWidth="1"/>
            <rect x="100" y="350" width="100" height="70" rx="6" fill="#e8eaf0" stroke="#d4d8e2" strokeWidth="1"/>
          </svg>

          {/* Map Pins */}
          {mapPins.map((pin) => (
            <div
              key={pin.id}
              className={`map-pin ${pin.status} ${selectedStore === pin.id ? 'active' : ''}`}
              style={{ left: pin.x, top: pin.y }}
              onClick={() => setSelectedStore(pin.id)}
            >
              <div className="pin-label">{pin.label}</div>
              {selectedStore === pin.id && (
                <div className="pin-tooltip">
                  {stores.find(s => s.id === pin.id)?.name}
                </div>
              )}
            </div>
          ))}

          {/* Zoom Controls */}
          <div className="map-controls">
            <button className="map-ctrl-btn">⊕</button>
            <button className="map-ctrl-btn">⊖</button>
            <button className="map-ctrl-btn map-locate-btn" title="My Location">◎</button>
          </div>

          <div className="map-attribution">© Shoptiq Maps • Delhi NCR</div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
