import React, { useState } from 'react';
import { NEGOTIATIONS } from '../data/products';
import './NegotiationHub.css';

const NegotiationHub = ({ onNavigate }) => {
  const [activeDealId, setActiveDealId] = useState(NEGOTIATIONS[0].id);

  const activeDeal = NEGOTIATIONS.find(d => d.id === activeDealId) || NEGOTIATIONS[0];

  const steps = [
    { label: 'Initiated', icon: '🛒', status: 'completed' },
    { label: 'Reviewing', icon: '💬', status: 'completed' },
    { label: 'Negotiating', icon: '📄', status: 'active' },
    { label: 'Completed', icon: '✅', status: 'upcoming' }
  ];

  const handleAction = (type) => {
    alert(`Action "${type}" recorded for ${activeDeal.name}. Processing settlement...`);
    if (type === 'accept') onNavigate('checkout');
  };

  return (
    <div className="neg-hub-root">
      <header className="neg-hub-header animate-fade-in">
        <div className="neg-hub-title-area">
          <h2 onClick={() => onNavigate('dashboard')} style={{ cursor: 'pointer' }}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ marginRight: '10px', display: 'inline-block' }}><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
             Smart Negotiation Hub
          </h2>
          <div className="shared-session-badge">
             <div className="active-users-stack">
                <div className="u-avatar" style={{ background: '#4f46e5' }}>A</div>
                <div className="u-avatar" style={{ background: '#10b981' }}>M</div>
                <div className="u-avatar plus">+2</div>
             </div>
             <span>Active Collaborative Session</span>
          </div>
        </div>
        <div className="ai-optimizer-badge">
           <span className="ai-icon">✦</span>
           AI Optimizer Active
        </div>
      </header>

      <div className="neg-hub-layout">
        {/* ── Active Deals ── */}
        <aside className="active-deals-panel animate-slide-in">
           <div className="deals-panel-header">
              <h3>Active Deals</h3>
              <span className="new-badge">3 New</span>
           </div>
           <div className="deals-stack" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {NEGOTIATIONS.map(deal => (
                <div 
                  key={deal.id} 
                  className={`deal-card ${activeDealId === deal.id ? 'active' : ''}`}
                  onClick={() => setActiveDealId(deal.id)}
                >
                   <div className="deal-thumb" style={{ backgroundImage: `url(${deal.img})` }}></div>
                   <div className="deal-info">
                      <h4>{deal.name}</h4>
                      <p>Last update: {deal.time}</p>
                   </div>
                   <span className={`status-label ${deal.status.toLowerCase()}`}>{deal.status}</span>
                </div>
              ))}
           </div>
           
           <button 
             className="new-neg-btn" 
             style={{ marginTop: 'auto', padding: '1.25rem', background: '#1e293b', color: 'white', borderRadius: '12px', fontWeight: '800', border: 'none', cursor: 'pointer' }}
             onClick={() => onNavigate('dashboard')}
           >
             + New Negotiation
           </button>
        </aside>

        {/* ── Main Panel ── */}
        <div className="negotiation-main-panel animate-fade-in" style={{ animationDelay: '0.2s' }}>
           <header className="product-detail-header">
              <div className="prod-brief">
                 <div className="prod-img-large" style={{ backgroundImage: `url(${activeDeal.img})` }}></div>
                 <div className="prod-meta">
                    <h3>{activeDeal.name}</h3>
                    <p>ID: #NC-88291 • Batch: Q4-Enterprise</p>
                    <div className="tag-row">
                       <span className="meta-tag stock">IN STOCK</span>
                       <span className="meta-tag partner">TIER 1 PARTNER</span>
                    </div>
                 </div>
              </div>
              <div className="market-price-box">
                 <div className="label">MARKET PRICE</div>
                 <div className="val">₹{(activeDeal.asking * 1.1).toLocaleString()}</div>
              </div>
           </header>

           <div className="offer-comparison-grid">
              <div className="offer-box">
                 <span className="type-label">Your Offer</span>
                 <div className="offer-amount">₹{activeDeal.bid.toLocaleString()}</div>
                 <div className="offer-meta">Margin: 12.4% • 500 units</div>
              </div>
              <div className="offer-box seller">
                 <span className="type-label">Seller Counter-Offer</span>
                 <div className="offer-amount">₹{activeDeal.asking.toLocaleString()}</div>
                 <div className="offer-meta">Includes priority shipping</div>
              </div>
           </div>

           <div className="neg-chat-area">
              <div className="chat-bubble-neg buyer">
                 We are looking to secure 500 units for the upcoming regional marathon. Could we do ₹{activeDeal.bid.toLocaleString()} per unit?
                 <span className="chat-time">10:42 AM</span>
              </div>
              <div className="chat-bubble-neg seller">
                 Thank you for the proposal. Given the high demand for {activeDeal.name}, we can offer ₹{activeDeal.asking.toLocaleString()}. This includes expedited logistics to meet your event deadline.
                 <span className="chat-time">11:05 AM</span>
              </div>
           </div>

           <div className="neg-action-row">
              <button className="neg-btn btn-accept" onClick={() => handleAction('accept')}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                 Accept Offer
              </button>
              <button className="neg-btn btn-counter" onClick={() => handleAction('counter')}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                 Make Counter
              </button>
              <button className="neg-btn btn-decline" onClick={() => handleAction('decline')}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                 Decline
              </button>
           </div>

           {/* Sustainability Module */}
           <div className="sustainability-impact-card">
              <div className="s-header">
                 <div className="s-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
                    <span>Sustainability Impact of this Offer</span>
                 </div>
                 <span className="s-score">GRADE: A+</span>
              </div>
              <div className="s-metrics-grid">
                 <div className="s-metric">
                    <span className="s-label">Carbon Saved</span>
                    <span className="s-val">42.5kg CO2e</span>
                 </div>
                 <div className="s-metric">
                    <span className="s-label">Logistics Path</span>
                    <span className="s-val">Optimal (Regional)</span>
                 </div>
                 <div className="s-metric">
                    <span className="s-label">Circular Score</span>
                    <span className="s-val">92% Recyclable</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="transaction-progress-panel animate-fade-in" style={{ animationDelay: '0.4s' }}>
         <div className="progress-header">Transaction Progress</div>
         <div className="stepper-neg">
            {steps.map((step, i) => (
              <div key={i} className={`step-item-neg ${step.status}`}>
                 <div className="step-icon">{step.icon}</div>
                 <span className="step-label-neg">{step.label}</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default NegotiationHub;
