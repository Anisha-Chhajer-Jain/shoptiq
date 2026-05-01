import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './Inventory.css';

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState('Market Street Flagship');

  const handleReserve = (e, store) => {
    e.stopPropagation();
    if (store.statusColor === 'red') {
      toast.info(`Item is out of stock at ${store.name}.`);
      return;
    }
    toast.success(`Items reserved at ${store.name} for 2 hours!`);
  };

  const handleSecondaryAction = (e, store) => {
    e.stopPropagation();
    if (store.statusColor === 'red') {
      toast.success(`Alert set! You'll be notified when ${store.name} restocks.`);
    } else {
      toast.info(`Starting navigation to ${store.name}...`);
    }
  };

  const stores = [
    {
      name: 'Bandra West Flagship',
      dist: '0.6 km away • 5 min drive',
      units: '42 units available',
      status: 'In Stock',
      statusColor: 'green',
      location: { top: '25%', left: '55%' }
    },
    {
      name: 'Andheri East Hub',
      dist: '2.4 km away • 15 min drive',
      units: '3 units remaining',
      status: 'Low Stock',
      statusColor: 'yellow',
      location: { top: '58%', left: '65%' }
    },
    {
      name: 'Kurla Distribution Center',
      dist: '4.2 km away • 25 min drive',
      units: 'Restocking in 2 days',
      status: 'Out of Stock',
      statusColor: 'red',
      location: { top: '43%', left: '82%' }
    },
    {
      name: 'Colaba Waterfront Outlet',
      dist: '1.8 km away • 12 min drive',
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
          <button className="filter-btn-black" onClick={() => toast.info('Opening filters panel...')}>
            <span className="icon">≡</span> Filters
          </button>
          <button className="sort-btn" onClick={() => toast.info('Changing sort order...')}>Sort by: Closest</button>
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
                <button 
                  className={`reserve-btn ${store.statusColor === 'red' ? 'disabled' : ''}`}
                  onClick={(e) => handleReserve(e, store)}
                >
                  {store.statusColor === 'red' ? 'Unavailable' : 'Reserve for 2h'}
                </button>
                <button 
                  className="nav-btn-sm"
                  onClick={(e) => handleSecondaryAction(e, store)}
                >
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
            <button className="map-ctrl locate" onClick={() => toast.info('Locating current position...')}>🎯</button>
            <div className="zoom-group">
              <button className="map-ctrl" onClick={() => toast.info('Zooming in...')}>+</button>
              <button className="map-ctrl" onClick={() => toast.info('Zooming out...')}>−</button>
            </div>
          </div>

          {/* City Label */}
          <div className="city-label">Mumbai Metro</div>
        </div>
      </main>
    </div>
  );
};

export default Inventory;
