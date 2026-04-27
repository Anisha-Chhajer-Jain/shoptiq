import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="shoptiq-footer">
      <div className="footer-container">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <div className="f-logo-wrapper">
              <span className="f-logo">Shoptiq</span>
              <span className="f-logo-dot">.</span>
            </div>
            <p className="f-desc">
              The world's first Unified Commerce 2.0 ecosystem. Bridging the gap between digital vision and retail reality with AI-driven procurement.
            </p>
            <div className="f-social-links">
              {/* Twitter */}
              <a href="#" className="social-icon" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              {/* GitHub */}
              <a href="#" className="social-icon" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              {/* Mail */}
              <a href="#" className="social-icon" aria-label="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
            </div>
          </div>
          
          <div className="footer-links-col">
            <h4 className="f-col-title">Platform</h4>
            <ul className="f-links-list">
              <li><Link to="/inventory">Logistics Map</Link></li>
              <li><Link to="/analytics">Yield Analytics</Link></li>
              <li><Link to="/negotiation">Negotiation Hub</Link></li>
              <li><Link to="/dashboard">Unified Shop</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="f-col-title">Solutions</h4>
            <ul className="f-links-list">
              <li><Link to="/groupbuy">Group Procurement</Link></li>
              <li><Link to="/aistyling">AI Style Profile</Link></li>
              <li><Link to="/community">Community Gallery</Link></li>
              <li><Link to="/orders">Real-time Tracking</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="f-col-title">Enterprise</h4>
            <ul className="f-links-list">
              <li><a href="#">API Documentation</a></li>
              <li><a href="#">Global Logistics</a></li>
              <li><a href="#">Merchant Portal</a></li>
              <li><a href="#">Security Audit</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-newsletter">
          <div className="newsletter-content">
            <h4>Stay ahead of the curve</h4>
            <p>Join 10,000+ merchants receiving our weekly commerce insights.</p>
          </div>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" aria-label="Email for newsletter" />
            <button type="button">Subscribe</button>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="f-legal">
            <p>© {currentYear} Shoptiq OmniCommerce. All rights reserved.</p>
            <div className="legal-links">
              <a href="#">Privacy Policy</a>
              <span className="dot-sep">•</span>
              <a href="#">Terms of Service</a>
              <span className="dot-sep">•</span>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
          <div className="f-security">
            <div className="secure-badge-premium">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shield-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              <span>256-BIT SSL SECURE</span>
            </div>
            <div className="region-selector">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              <span>Global / English</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
