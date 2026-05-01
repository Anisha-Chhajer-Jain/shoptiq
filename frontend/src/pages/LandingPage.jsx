import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-root">
      <SEO
        title="Welcome to OmniCommerce"
        description="Experience the future of shopping with our smart omnicommerce platform. AI-driven styling, real-time negotiation, and bulk buying made simple."
      />

      <header className="landing-header">
        <div className="landing-nav">
          <div className="nav-logo">SHOPTIQ</div>
          <nav className="nav-links" aria-label="Primary navigation">
            {['Platform', 'Solutions', 'Inventory', 'AR Try-On', 'Pricing'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="nav-link"
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <button className="btn-link" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="btn-primary" onClick={() => navigate('/signup')}>
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy animate-slide-in-3d">
            <span className="hero-badge animate-pulse-3d">UNIFIED COMMERCE 2.0</span>
            <h1 className="hero-title">Bridge the Gap Between Digital Vision and Physical Reality.</h1>
            <p className="hero-description">
              Commerce exactly how you expect it. Real-time availability, dynamic pricing, and hyper-realistic visualization in one unified platform.
            </p>
            <div className="hero-actions">
              <button className="btn-primary btn-primary-hero" onClick={() => navigate('/signup')}>
                Start Your Integration →
              </button>
              <button className="btn-secondary" onClick={() => alert('Loading Live Demo Environment... Connecting to edge node 4.2...')}>
                View Live Demo
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap animate-float-3d">
              <img
                src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1200"
                alt="Cityscape"
              />
              <div className="sync-status-card">
                <div className="sync-status-header">
                  <span>In-Store Sync Status</span>
                  <span className="status-live">● LIVE 99.9% ACCURACY</span>
                </div>
                <div className="sync-progress">
                  <div className="sync-progress-fill" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="crisis-section" id="platform">
          <div className="section-intro">
            <span className="section-subtitle">The Fragmentation Crisis</span>
            <h2 className="section-title">
              Modern commerce is broken by three distinct gaps that erode customer trust and bleed revenue.
            </h2>
          </div>
          <div className="gap-grid">
            {[
              {
                icon: '📦',
                title: 'Availability Gap',
                description: 'The "In-Stock" promise online that turns into "Out of Stock" reality at the physical counter.',
              },
              {
                icon: '🏷️',
                title: 'Pricing Gap',
                description: 'Rigid online price tags that ignore the dynamic reality of local store volume and customer loyalty.',
              },
              {
                icon: '👁️',
                title: 'Expectation Gap',
                description: 'The digital rendering that simply does not match the tactile reality of the product in person.',
              },
            ].map((item) => (
              <article key={item.title} className="gap-card">
                <div className="gap-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="features-section" id="solutions">
          <article className="feature-card feature-inventory" id="inventory">
            <div className="feature-copy">
              <span className="feature-label animate-pulse-3d">REAL-TIME INVENTORY</span>
              <h3>Know it’s there before you go.</h3>
              <p>
                Our edge-sync technology connects your shelf sensors directly to the user's browser with sub-second latency.
              </p>
              <div className="pill-grid">
                <span className="pill pill-positive">● Manhattan: 12 Units</span>
                <span className="pill pill-alert">● Brooklyn: 0 Units</span>
              </div>
            </div>
            <div className="feature-visual" />
          </article>

          <article className="feature-card feature-pricing" id="pricing">
            <div className="feature-copy">
              <span className="feature-label feature-label-light">SMART PRICING</span>
              <h3>Your price, your terms.</h3>
              <p>
                Dynamic discount engine that rewards loyalty and bulk procurement in real-time.
              </p>
              <div className="pricing-box">
                <div className="pricing-row">
                  <span>Standard Price</span>
                  <span>₹2,499.00</span>
                </div>
                <div className="pricing-row pricing-row-highlight">
                  <span>Your Offer</span>
                  <span>₹2,112.50</span>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section className="ar-section" id="ar-try-on" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=1600')" }}>
          <div className="ar-overlay">
            <div className="ar-copy">
              <span className="feature-label feature-label-ar">AR FASHION FIX</span>
              <h3>Try on with 99.8% accuracy.</h3>
              <p>
                Eliminate return logistics costs by allowing customers to visualize drape, fit, and texture with precision physics modeling.
              </p>
              <button className="btn-primary btn-ar" onClick={() => navigate('/signup')}>
                Explore AR Hub
              </button>
            </div>
          </div>
        </section>

        <section className="trust-section">
          <div className="trust-intro">
            <p className="trusted-label">Trusted by Global Enterprise</p>
            <div className="trust-logos">
              {['LUMINA', 'APEX', 'VERTEX', 'NEXUS', 'ORION', 'CORE'].map((name) => (
                <div key={name} className="trust-logo">
                  {name}
                </div>
              ))}
            </div>
          </div>

          <div className="expectation-card">
            <h3>Expectation Meter</h3>
            {[
              { label: 'Price Transparency', value: 92 },
              { label: 'Inventory Accuracy', value: 99.4 },
              { label: 'Visual Fidelity', value: 99.8 },
            ].map((metric) => (
              <div key={metric.label} className="meter-block">
                <div className="meter-row">
                  <span>{metric.label}</span>
                  <span>{metric.value}%</span>
                </div>
                <div className="meter-track">
                  <div className="meter-fill" style={{ width: `${metric.value}%` }} />
                </div>
              </div>
            ))}
            <p className="expectation-quote">
              "CommerceIntel has reduced our return rate by 42% in six months." — Global Retail Lead
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
