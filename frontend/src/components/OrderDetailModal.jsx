import React from 'react';
import './OrderDetailModal.css';

const OrderDetailModal = ({ order, onClose }) => {
  if (!order) return null;

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
          <div className="detail-section">
            <div className="section-title">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
               <h3>Shipping Address</h3>
            </div>
            <div className="shipping-info">
              {order.shippingDetails ? (
                <>
                  <p><strong>{order.shippingDetails.name}</strong></p>
                  <p>{order.shippingDetails.address}</p>
                  <p>{order.shippingDetails.city}, {order.shippingDetails.state} {order.shippingDetails.zipCode}</p>
                </>
              ) : (
                <p>Standard Shipping to Main Hub</p>
              )}
            </div>
          </div>

          <div className="detail-section">
            <div className="section-title">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
               <h3>Order Items</h3>
            </div>
            <div className="order-items-list">
              {order.cartItems && order.cartItems.length > 0 ? (
                order.cartItems.map((item, idx) => (
                  <div key={idx} className="order-item-row">
                    <img src={item.img} alt={item.name} />
                    <div className="item-details">
                      <strong>{item.name}</strong>
                      <span>Qty: {item.qty}</span>
                    </div>
                    <span className="item-price">₹{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))
              ) : (
                <div className="order-item-row">
                  <img src={order.img} alt="Order" />
                  <div className="item-details">
                    <strong>Standard Product Bundle</strong>
                    <span>Qty: {order.items}</span>
                  </div>
                  <span className="item-price">₹{order.total.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          <div className="order-summary-box">
             <div className="sum-row">
                <span>Status</span>
                <span className={`status-text ${order.status.toLowerCase()}`}>{order.status}</span>
             </div>
             <div className="sum-row">
                <span>Placed On</span>
                <span>{order.date}</span>
             </div>
             <div className="sum-row total">
                <span>Total Amount</span>
                <span>₹{order.total.toLocaleString()}</span>
             </div>
          </div>
        </div>

        <div className="order-modal-footer">
          <button className="btn-print" onClick={() => window.print()}>Print Receipt</button>
          <button className="btn-track" onClick={() => alert('Tracking system integration coming soon!')}>Track Shipment</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
