import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand-section">
          <div className="footer-brand">Shoptiq</div>
          <p className="footer-tagline">Bridging the gap between digital vision and physical reality. India's smartest unified commerce platform.</p>
        </div>
        <div className="footer-links-grid">
          <div className="footer-col">
            <div className="footer-col-title">Platform</div>
            <a href="#">Catalog</a>
            <a href="#">Negotiations</a>
            <a href="#">Inventory</a>
            <a href="#">Group Buy</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">AI Features</div>
            <a href="#">Style Recommender</a>
            <a href="#">AR Try-On</a>
            <a href="#">Size Calibrator</a>
            <a href="#">Trend Insights</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Support</div>
            <a href="#">Help Center</a>
            <a href="#">API Documentation</a>
            <a href="#">Global Logistics</a>
            <a href="#">Contact Us</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Legal</div>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Shipping Info</a>
            <a href="#">Store Locator</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">© 2024 Shoptiq Solutions Pvt. Ltd. All rights reserved.</div>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Shipping Info</a>
          <a href="#">Store Locator</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
