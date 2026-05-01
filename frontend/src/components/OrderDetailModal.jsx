import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './OrderDetailModal.css';

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

const OrderDetailModal = ({ order, onClose }) => {
  if (!order) return null;

  // Simulated delivery path (Store to Customer)
  const storePos = [19.0600, 72.8360];
  const customerPos = [19.1136, 72.8697];
  const polyline = [storePos, customerPos];

  return (
    <div className="order-modal-overlay animate-fade-in" onClick={onClose}>
      <div className="order-modal-content animate-slide-up-3d" onClick={(e) => e.stopPropagation()}>
        <div className="order-modal-header">
          <div className="header-info">
            <h2>Order Details</h2>
            <span className="order-id-badge">{order.id}</span>
          </div>
          <button className="btn-close-modal" onClick={onClose}>×</button>
        </div>

        <div className="order-modal-body">
          {/* ── Delivery Progress Section ── */}
          <div className="detail-section delivery-tracking">
            <div className="section-title">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
               <h3>Delivery Progress</h3>
               <span className="eta-tag">ETA: 25 Mins</span>
            </div>
            
            <div className="delivery-map-container">
              <MapContainer center={[19.085, 72.85]} zoom={12} zoomControl={false} style={{ height: "180px", width: "100%", borderRadius: "12px" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={storePos} />
                <Marker position={customerPos} />
                <Polyline positions={polyline} color="#3b82f6" dashArray="10, 10" />
              </MapContainer>
              <div className="tracking-status-info">
                <div className="status-node active">
                  <span className="dot"></span>
                  <div className="node-text">
                    <strong>Order Dispatched</strong>
                    <p>Bandra Warehouse • 10:30 AM</p>
                  </div>
                </div>
                <div className="status-node current">
                  <span className="dot"></span>
                  <div className="node-text">
                    <strong>In Transit</strong>
                    <p>On the way to Andheri • 10:45 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <div className="section-title">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
               <h3>Shipping Address</h3>
            </div>
            <div className="shipping-info">
              <p><strong>{order.shippingDetails?.name || 'Anisha Chhajer'}</strong></p>
              <p>{order.shippingDetails?.address || '123 Enterprise Way, Tech Park'}</p>
              <p>{order.shippingDetails?.city || 'Mumbai'}, {order.shippingDetails?.state || 'Maharashtra'} {order.shippingDetails?.zipCode || '400001'}</p>
            </div>
          </div>

          <div className="detail-section">
            <div className="section-title">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
               <h3>Order Items</h3>
            </div>
            <div className="order-items-list">
              {(order.cartItems || []).map((item, idx) => (
                <div key={idx} className="order-item-row">
                  <img src={item.img} alt={item.name} />
                  <div className="item-details">
                    <strong>{item.name}</strong>
                    <span>Qty: {item.qty}</span>
                  </div>
                  <span className="item-price">₹{(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-summary-box">
             <div className="sum-row">
                <span>Total Amount</span>
                <span className="total-val">₹{order.total.toLocaleString()}</span>
             </div>
          </div>
        </div>

        <div className="order-modal-footer">
          <button className="btn-print" onClick={() => window.print()}>Print Receipt</button>
          <button className="btn-close-bottom" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
