import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, name: 'Swift-Core Enterprise Hubs', sku: 'SCH-902-X', price: 8500, original: 10500, qty: 3, discount: 2000, img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=200' },
    { id: 2, name: 'Quantum Series Workstation', price: 42000, qty: 1, img: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=200', hasGroupBuy: true },
    { id: 3, name: 'Audio-Link Pro 5', price: 4500, qty: 5, img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=200', priceMatch: true }
  ]);

  const updateQty = (id, delta) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const bulkDiscounts = items.reduce((acc, item) => acc + (item.discount || 0), 0) + (subtotal > 50000 ? 2500 : 0);
  const shippingCredit = 450;
  const totalSaved = bulkDiscounts + shippingCredit;
  const finalTotal = subtotal - bulkDiscounts - shippingCredit;

  return (
    <div className="cart-root">
      <div className="cart-container">
        <div className="cart-main">
          <header className="cart-header">
            <h1 className="cart-title">Cart & Bulk Savings</h1>
            <p className="cart-subtitle">Review your inventory selection and unlock enterprise-tier discounts.</p>
            <div className="shipping-status-pill">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              Consolidated shipping active
            </div>
          </header>

          <div className="cart-items-list">
            {items.map(item => (
              <div key={item.id} className="cart-item-card">
                <div className="item-img-area">
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="item-details-area">
                  <div className="item-info-top">
                    <div>
                      <h3 className="item-name">{item.name}</h3>
                      {item.sku && <span className="item-sku">SKU: {item.sku}</span>}
                    </div>
                    <div className="item-price-area">
                      <div className="item-current-price">₹{(item.price * item.qty).toLocaleString()}</div>
                      {item.original && <div className="item-old-price">₹{(item.original * item.qty).toLocaleString()}</div>}
                    </div>
                  </div>

                  {item.id === 1 && (
                    <div className="bulk-trigger-bar">
                      <div className="trigger-text">Add 2 more for 15% off</div>
                      <div className="trigger-progress"><div className="fill" style={{ width: '60%' }}></div></div>
                      <span className="trigger-count">3/5 units</span>
                    </div>
                  )}

                  {item.hasGroupBuy && (
                    <div className="group-buy-alert">
                      <div className="alert-content">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        <div>
                          <strong>Active Group Buy Found</strong>
                          <p>Join 12 others to drop price to ₹38,500.00</p>
                        </div>
                      </div>
                      <button className="join-gb-btn" onClick={() => navigate('/groupbuy')}>Join Group Buy</button>
                    </div>
                  )}

                  <div className="item-actions-row">
                    <div className="qty-controls">
                      <button onClick={() => updateQty(item.id, -1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                    <div className="item-meta-badges">
                      {item.priceMatch && <span className="price-match-badge">✓ Price Match Active</span>}
                      <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="negotiation-cta-card">
            <div className="cta-content">
               <strong>Need volume pricing?</strong>
               <p>Start a dynamic negotiation for orders over ₹50k.</p>
            </div>
            <button className="btn-negotiate" onClick={() => navigate('/negotiation')}>New Negotiation</button>
          </div>
        </div>

        <aside className="cart-sidebar">
          <div className="savings-summary-card">
            <h3>Savings Summary</h3>
            <div className="summary-row">
              <span>Subtotal ({items.length} Items)</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row discount">
              <span>Bulk Discounts Applied</span>
              <span>−₹{bulkDiscounts.toLocaleString()}</span>
            </div>
            <div className="summary-row discount">
              <span>Volume Shipping Credit</span>
              <span>−₹{shippingCredit.toLocaleString()}</span>
            </div>
            
            <div className="total-saved-pill">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
               <div className="saved-info">
                  <span className="label">Total Saved Today</span>
                  <span className="value">₹{totalSaved.toLocaleString()}</span>
               </div>
            </div>

            <div className="summary-row grand-total">
              <div className="total-label">
                <strong>Total</strong>
                <p>Excl. estimated GST</p>
              </div>
              <div className="total-value">₹{finalTotal.toLocaleString()}</div>
            </div>

            <button className="btn-checkout-secure" onClick={() => navigate('/checkout')}>
               Secure Checkout
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <div className="encryption-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              256-bit AES Encryption
            </div>
          </div>

          <div className="enterprise-quote-card">
             <strong>Enterprise Quote?</strong>
             <p>Orders over $25k qualify for custom negotiation with a regional agent.</p>
             <button className="btn-talk-sales" onClick={() => navigate('/negotiation')}>Talk to Sales</button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
