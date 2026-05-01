import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { toast } from 'react-toastify';
import './Inventory.css';

// Fix Leaflet marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Helper to pan the map
const ChangeView = ({ center }) => {
  const map = useMap();
  map.setView(center, 13);
  return null;
};

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState(null);
  const [mapCenter, setMapCenter] = useState([19.0760, 72.8777]); // Mumbai Center

  const stores = [
    {
      name: 'Bandra West Flagship',
      dist: '0.6 km away • 5 min drive',
      units: '42 units available',
      status: 'In Stock',
      statusColor: 'green',
      position: [19.0600, 72.8360],
      address: 'Hill Road, Bandra West'
    },
    {
      name: 'Andheri East Hub',
      dist: '2.4 km away • 15 min drive',
      units: '3 units remaining',
      status: 'Low Stock',
      statusColor: 'yellow',
      position: [19.1136, 72.8697],
      address: 'JB Nagar, Andheri East'
    },
    {
      name: 'Kurla Distribution Center',
      dist: '4.2 km away • 25 min drive',
      units: 'Restocking in 2 days',
      status: 'Out of Stock',
      statusColor: 'red',
      position: [19.0727, 72.8826],
      address: 'LBS Marg, Kurla'
    },
    {
      name: 'Colaba Waterfront Outlet',
      dist: '1.8 km away • 12 min drive',
      units: '18 units available',
      status: 'In Stock',
      statusColor: 'green',
      position: [18.9067, 72.8147],
      address: 'Cuffe Parade, Colaba'
    }
  ];

  const handleStoreSelect = (store) => {
    setSelectedStore(store);
    setMapCenter(store.position);
  };

  const handleReserve = (e, store) => {
    e.stopPropagation();
    if (store.statusColor === 'red') {
      toast.info(`Item is out of stock at ${store.name}.`);
      return;
    }
    toast.success(`Items reserved at ${store.name} for 2 hours!`);
  };

  return (
    <div className="inventory-root">
      <aside className="inventory-sidebar">
        <div className="sidebar-header">
          <h3>Live Mapping Inventory</h3>
          <p>Currently tracking availability across Mumbai Metro</p>
        </div>

        <div className="sidebar-search">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search stores..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="store-list">
          {stores.map((store) => (
            <div 
              key={store.name} 
              className={`store-item-card ${selectedStore?.name === store.name ? 'selected' : ''}`}
              onClick={() => handleStoreSelect(store)}
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
                  Reserve
                </button>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="inventory-map-view">
        <MapContainer center={mapCenter} zoom={12} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeView center={mapCenter} />
          {stores.map((store) => (
            <Marker key={store.name} position={store.position}>
              <Popup>
                <div className="map-popup-custom">
                  <strong>{store.name}</strong>
                  <p>{store.address}</p>
                  <span className={`status-text-${store.statusColor}`}>{store.status}</span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </main>
    </div>
  );
};

export default Inventory;
