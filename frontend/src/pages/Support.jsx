import React, { useState } from 'react';
import './Support.css';

const Support = () => {
  const [formData, setFormData] = useState({
    subject: 'General Inquiry',
    urgency: 'Normal',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Ticket Submitted! Our technical team will reach out within 24 hours.');
    setFormData({ ...formData, message: '' });
  };

  const faqs = [
    {
      q: "How does the AI negotiation work?",
      a: "Our OmniBot uses real-time inventory data and your set margin thresholds to negotiate prices with customers automatically. It ensures you never sell below your minimum acceptable price while maximizing conversion."
    },
    {
      q: "Can I cancel a negotiation session?",
      a: "Yes, as a retailer, you can reject any active negotiation from your dashboard. Customers can also leave a session at any time, which will mark it as ended."
    },
    {
      q: "How do I sync my physical store inventory?",
      a: "You can use our API keys in the Settings portal to connect your existing POS system, or use the Bulk Import feature in the Inventory page to upload CSV/Excel files."
    }
  ];

  return (
    <div className="support-root animate-fade-in">
      <div className="support-header-area">
        <div className="support-header-main">
          <h1>Help & Support</h1>
          <p>Need help with your store? Browse our FAQs or get in touch with our technical team.</p>
        </div>
        <div className="support-status-bar">
          <div className="status-dot-pulse"></div>
          <div className="status-text-hub">
            <strong>All Systems Operational</strong>
            <span>Support response time: ~2h</span>
          </div>
        </div>
      </div>

      <div className="support-container">
        {/* Left Column: Form */}
        <div className="support-form-card">
          <div className="form-header-pro">
            <div className="form-icon">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <div className="form-title-text">
              <h3>Send us a message</h3>
              <span>We typically respond within 24 hours.</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="support-form">
            <div className="form-row">
              <div className="form-group">
                <label>SUBJECT TYPE</label>
                <select 
                  value={formData.subject} 
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                >
                  <option>General Inquiry</option>
                  <option>Technical Issue</option>
                  <option>Billing</option>
                  <option>Feature Request</option>
                </select>
              </div>
              <div className="form-group">
                <label>URGENCY</label>
                <select 
                  value={formData.urgency} 
                  onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                >
                  <option>Normal</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>MESSAGE</label>
              <textarea 
                placeholder="Describe your issue in detail..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              />
            </div>

            <div className="form-footer-pro">
              <div className="attach-trigger">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                <span>Attach screenshot</span>
              </div>
              <button type="submit" className="submit-ticket-btn">SUBMIT TICKET</button>
            </div>
          </form>
        </div>

        {/* Right Column: Contacts & FAQ */}
        <div className="support-sidebar-col">
          <div className="contact-cards-row">
            <div className="contact-card">
              <div className="icon-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <strong>Email</strong>
              <span>support@shoptiq.com</span>
            </div>
          </div>

          <div className="faq-card-pro">
            <div className="faq-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              <h3>Common Questions</h3>
            </div>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <div key={i} className="faq-item">
                  <div className="faq-q">
                    <span className="q-mark">Q.</span>
                    <strong>{faq.q}</strong>
                  </div>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
