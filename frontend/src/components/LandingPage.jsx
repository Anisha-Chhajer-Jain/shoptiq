import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="landing-root">
      {/* ── Navbar ── */}
      <nav className="landing-nav">
        <div className="nav-logo">SHOPTIQ</div>
        <div className="nav-links-mid">
          <a href="#platform">Platform</a>
          <a href="#solutions">Solutions</a>
          <a href="#inventory">Inventory</a>
          <a href="#ar">AR Try-On</a>
          <a href="#pricing">Pricing</a>
        </div>
        <div className="nav-actions">
          <button className="btn-login-text" onClick={onGetStarted}>Login</button>
          <button className="btn-get-started" onClick={onGetStarted}>Get Started</button>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="landing-hero">
        <div className="hero-content">
          <span className="hero-badge">UNIFIED COMMERCE 2.0</span>
          <h1 className="hero-title">Bridge the Gap Between Digital Vision and Physical Reality.</h1>
          <p className="hero-sub">Commerce exactly how you expect it. Real-time availability, dynamic pricing, and hyper-realistic visualization in one unified platform.</p>
          <div className="hero-actions">
            <button className="btn-primary-hero" onClick={onGetStarted}>Start Your Integration →</button>
            <button className="btn-outline-hero">View Live Demo</button>
          </div>
        </div>
        <div className="hero-visual">
           <div className="city-bg-wrap">
              <img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1200" alt="Cityscape" />
              <div className="sync-status-card">
                 <div className="sync-header">
                    <span>In-Store Sync Status</span>
                    <span className="status-live">● LIVE 99.9% ACCURACY</span>
                 </div>
                 <div className="sync-progress"><div className="fill"></div></div>
              </div>
           </div>
        </div>
      </section>

      {/* ── Crisis Section ── */}
      <section className="crisis-section">
         <div className="section-intro">
            <span className="subtitle">The Fragmentation Crisis</span>
            <h2>Modern commerce is broken by three distinct gaps that erode customer trust and bleed revenue.</h2>
         </div>
         
         <div className="gaps-grid">
            <div className="gap-card">
               <div className="gap-icon">📦</div>
               <h3>Availability Gap</h3>
               <p>The "In-Stock" promise online that turns into "Out of Stock" reality at the physical counter.</p>
            </div>
            <div className="gap-card">
               <div className="gap-icon">🏷️</div>
               <h3>Pricing Gap</h3>
               <p>Rigid online price tags that ignore the dynamic reality of local store volume and customer loyalty.</p>
            </div>
            <div className="gap-card">
               <div className="gap-icon">👁️</div>
               <h3>Expectation Gap</h3>
               <p>The digital rendering that simply doesn't match the tactile reality of the product in person.</p>
            </div>
         </div>
      </section>

      {/* ── Features Mix ── */}
      <section className="features-mix">
         <div className="feat-inventory-card">
            <div className="feat-text">
               <span className="feat-badge">REAL-TIME INVENTORY</span>
               <h3>Know it's there before you go.</h3>
               <p>Our edge-sync technology connects your shelf sensors directly to the user's browser with sub-second latency.</p>
               <div className="loc-pills">
                  <span className="pill green">● Manhattan: 12 Units</span>
                  <span className="pill red">● Brooklyn: 0 Units</span>
               </div>
            </div>
            <div className="feat-visual-inv">
               <div className="sensor-glow"></div>
            </div>
         </div>

         <div className="feat-pricing-card">
            <span className="feat-badge">SMART PRICING</span>
            <h3>Your price, your terms.</h3>
            <p>Dynamic discount engine that rewards loyalty and bulk procurement in real-time.</p>
            <div className="price-box-mock">
               <div className="row"><span>Standard Price</span> <span>₹2,499.00</span></div>
               <div className="row highlight"><span>Your Offer</span> <span>₹2,112.50</span></div>
            </div>
         </div>
      </section>

      {/* ── AR Hub Section ── */}
      <section className="ar-fashion-fix">
         <div className="ar-content-wrap">
            <div className="ar-text">
               <span className="feat-badge">AR FASHION FIX</span>
               <h3>Try on with 99.8% accuracy.</h3>
               <p>Eliminate return logistics costs by allowing customers to visualize drape, fit, and texture with precision physics modeling.</p>
               <button className="btn-ar-hub">Explore AR Hub</button>
            </div>
         </div>
      </section>

      {/* ── Trust Section ── */}
      <section className="trust-section">
         <div className="trust-left">
            <p className="trusted-label">Trusted by Global Enterprise</p>
            <div className="logo-grid">
               <div className="logo-box">LUMINA</div>
               <div className="logo-box">APEX</div>
               <div className="logo-box">VERTEX</div>
               <div className="logo-box">NEXUS</div>
               <div className="logo-box">ORION</div>
               <div className="logo-box">CORE</div>
            </div>
         </div>
         <div className="trust-right">
            <div className="expectation-meter-card">
               <h3>Expectation Meter</h3>
               <div className="meter-row">
                  <div className="m-lab"><span>Price Transparency</span> <span>92%</span></div>
                  <div className="m-bar"><div className="fill" style={{ width: '92%' }}></div></div>
               </div>
               <div className="meter-row">
                  <div className="m-lab"><span>Inventory Accuracy</span> <span>99.4%</span></div>
                  <div className="m-bar"><div className="fill" style={{ width: '99.4%' }}></div></div>
               </div>
               <div className="meter-row">
                  <div className="m-lab"><span>Visual Fidelity</span> <span>99.8%</span></div>
                  <div className="m-bar"><div className="fill" style={{ width: '99.8%' }}></div></div>
               </div>
               <p className="quote">"CommerceIntel has reduced our return rate by 42% in six months." — Global Retail Lead</p>
            </div>
         </div>
      </section>

      <footer className="landing-bottom-bar">
         <p>Join 500+ enterprises bridging the gap between digital vision and retail reality.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
