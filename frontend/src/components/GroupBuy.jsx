import React, { useState } from 'react';
import './GroupBuy.css';

const initialItems = [
  {
    id: 1,
    name: 'Swift-Core Enterprise Hubs',
    sku: 'SKU: SCH-902-X',
    price: 1299,
    original: 1450,
    qty: 3,
    maxQty: 10,
    bulkThreshold: 5,
    bulkDiscount: '15%',
    image: null,
    tag: null,
    groupBuy: null,
    priceMatch: false,
    color: '#2d3748',
  },
  {
    id: 2,
    name: 'Quantum Series Workstation',
    sku: 'Lead time: 4–6 weeks',
    price: 2499,
    original: null,
    qty: 1,
    maxQty: 5,
    bulkThreshold: null,
    bulkDiscount: null,
    image: null,
    tag: 'HOT DEAL',
    groupBuy: { members: 12, dropPrice: 2150 },
    priceMatch: false,
    color: '#1a202c',
  },
  {
    id: 3,
    name: 'Audio-Link Pro 5',
    sku: 'Standard corporate accessory',
    price: 299,
    original: null,
    qty: 5,
    maxQty: 20,
    bulkThreshold: null,
    bulkDiscount: null,
    image: null,
    tag: null,
    groupBuy: null,
    priceMatch: true,
    color: '#4a5568',
  },
];

const GroupBuy = () => {
  const [items, setItems] = useState(initialItems);

  const updateQty = (id, delta) => {
    setItems(prev => prev.map(item =>
      item.id === id
        ? { ...item, qty: Math.max(1, Math.min(item.maxQty, item.qty + delta)) }
        : item
    ));
  };

  const removeItem = (id) => setItems(prev => prev.filter(item => item.id !== id));

  const subtotalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const bulkDiscount = 453;
  const shippingCredit = 120;
  const totalSaved = bulkDiscount + shippingCredit;
  const total = subtotalPrice - bulkDiscount - shippingCredit;

  return (
    <div className="groupbuy-container">
      {/* Consolidated Shipping Banner */}
      <div className="shipping-banner">
        <span className="shipping-banner-icon">🚚</span>
        Consolidated shipping active
      </div>

      <div className="groupbuy-layout">
        {/* Left: Cart */}
        <div className="groupbuy-cart">
          <div className="groupbuy-header">
            <h1 className="groupbuy-title">Cart &amp; Bulk Savings</h1>
            <p className="groupbuy-subtitle">Review your inventory selection and unlock enterprise-tier discounts.</p>
          </div>

          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                {/* Product Image */}
                <div className="cart-item-img" style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}88)` }}>
                  {item.tag && <span className="item-tag">{item.tag}</span>}
                </div>

                {/* Product Info */}
                <div className="cart-item-info">
                  <div className="cart-item-top">
                    <div>
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-sku">{item.sku}</div>
                    </div>
                    <div className="cart-item-price-col">
                      <div className="cart-item-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
                      {item.original && (
                        <div className="cart-item-original">₹{(item.original * item.qty).toLocaleString('en-IN')}</div>
                      )}
                    </div>
                  </div>

                  {/* Bulk Progress */}
                  {item.bulkThreshold && (
                    <div className="bulk-progress-wrap">
                      <div className="bulk-progress-label">
                        Add {item.bulkThreshold - item.qty} more for {item.bulkDiscount} off
                      </div>
                      <div className="bulk-progress-bar">
                        <div
                          className="bulk-progress-fill"
                          style={{ width: `${Math.min(100, (item.qty / item.bulkThreshold) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="bulk-progress-meta">{item.qty}/{item.bulkThreshold} units</div>
                    </div>
                  )}

                  {/* Group Buy Banner */}
                  {item.groupBuy && (
                    <div className="group-buy-banner">
                      <div className="group-buy-left">
                        <span className="group-buy-icon">👥</span>
                        <div>
                          <div className="group-buy-title">Active Group Buy Found</div>
                          <div className="group-buy-sub">Join {item.groupBuy.members} others to drop price to ₹{item.groupBuy.dropPrice.toLocaleString('en-IN')}</div>
                        </div>
                      </div>
                      <button className="join-group-btn">Join Group Buy</button>
                    </div>
                  )}

                  {/* Price Match */}
                  {item.priceMatch && (
                    <div className="price-match-badge">
                      <span>✓</span> Price Match Active
                    </div>
                  )}

                  {/* Qty Controls + Remove */}
                  <div className="cart-item-actions">
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                      <span className="qty-value">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, +1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                      🗑 Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Summary */}
        <div className="groupbuy-summary">
          <div className="summary-card">
            <div className="summary-title">Savings Summary</div>
            <div className="summary-row">
              <span>Subtotal ({subtotalItems} items)</span>
              <span>₹{subtotalPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-row discount">
              <span>Bulk Discounts Applied</span>
              <span>−₹{bulkDiscount.toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-row discount">
              <span>Volume Shipping Credit</span>
              <span>−₹{shippingCredit.toLocaleString('en-IN')}</span>
            </div>

            <div className="total-saved-box">
              <span className="total-saved-icon">🏷️</span>
              <div>
                <div className="total-saved-label">Total Saved Today</div>
              </div>
              <div className="total-saved-amount">₹{totalSaved.toLocaleString('en-IN')}</div>
            </div>

            <div className="summary-total-row">
              <span className="summary-total-label">Total</span>
              <div>
                <div className="summary-total-price">₹{total.toLocaleString('en-IN')}</div>
                <div className="summary-total-sub">Excl. estimated VAT</div>
              </div>
            </div>

            <button className="checkout-btn">
              Secure Checkout →
            </button>
            <div className="checkout-note">🔒 256-bit AES Encryption</div>
          </div>

          {/* Enterprise Quote */}
          <div className="enterprise-card">
            <div className="enterprise-title">Enterprise Quote?</div>
            <p className="enterprise-text">Orders over ₹20k qualify for custom negotiation with a regional agent.</p>
            <button className="talk-sales-btn">Talk to Sales</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupBuy;
