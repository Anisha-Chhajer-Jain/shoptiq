import React, { useState } from 'react';
import './ProductDetail.css';

const ProductDetail = ({ onAddToCart, onNegotiate }) => {
  const [height, setHeight] = useState(185);
  const [weight, setWeight] = useState(82);
  const [activeImg, setActiveImg] = useState(0);

  const images = [
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1544923246-77307dd654ca?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400'
  ];

  const getRecommendedSize = () => {
    if (height > 180 && weight > 80) return 'Large (Slim Fit)';
    if (height > 170 && weight > 70) return 'Medium (Regular Fit)';
    return 'Small (Tailored Fit)';
  };

  return (
    <div className="product-detail-root">
      <div className="pd-container">
        {/* ── Left: Image Gallery ── */}
        <div className="pd-gallery-area">
          <div className="main-image-wrap">
            <img src={images[activeImg]} alt="Structured Wool Overcoat" />
            <button className="ar-tryon-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
              AR TRY-ON
            </button>
          </div>
          <div className="gallery-thumbnails">
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className={`thumb-wrap ${activeImg === idx ? 'active' : ''}`}
                onClick={() => setActiveImg(idx)}
              >
                <img src={img} alt={`Thumbnail ${idx}`} />
              </div>
            ))}
          </div>
          
          <div className="expectation-meter-pd">
            <div className="meter-header-pd">
               <div className="meter-title">
                 <strong>Expectation Meter</strong>
                 <p>Comparing catalog visuals vs. real-world customer photos</p>
               </div>
               <span className="match-pill">94% Match</span>
            </div>
            <div className="meter-gradient-bar">
               <div className="meter-fill-pd" style={{ width: '94%' }}></div>
            </div>
            <div className="meter-labels">
               <span>Low Fidelity</span>
               <span>Catalog Accurate</span>
            </div>
          </div>
        </div>

        {/* ── Right: Purchase Info ── */}
        <div className="pd-info-area">
          <div className="pd-brand-header">HERITAGE COLLECTION</div>
          <h1 className="pd-title">Structured Wool Overcoat</h1>
          <div className="pd-pricing-row">
              <span className="p-price-val">₹4,500</span>
            <span className="pd-old-price">$1,200.00</span>
          </div>

          {/* AI Size Finder */}
          <div className="ai-size-finder-card">
            <div className="finder-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              AI SIZE FINDER
            </div>
            <div className="finder-inputs">
              <div className="f-input-group">
                <label>Height (cm)</label>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
              </div>
              <div className="f-input-group">
                <label>Weight (kg)</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
              </div>
            </div>
            <div className="recommendation-box">
              <span>Recommended Size:</span>
              <strong>{getRecommendedSize()}</strong>
            </div>
          </div>

          <div className="purchase-actions">
            <button className="btn-add-cart" onClick={() => onAddToCart({ name: 'Structured Wool Overcoat', price: 4500 })}>
              ADD TO CART
            </button>
            <button className="btn-make-offer" onClick={() => onNegotiate({ name: 'Structured Wool Overcoat', price: 4500 })}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              MAKE AN OFFER
            </button>
          </div>

          <div className="availability-section">
            <div className="avail-header">
              <h3>Nearby Availability</h3>
              <button className="text-btn">Change Location</button>
            </div>
            <div className="avail-list">
              <div className="avail-item">
                <div className="avail-info">
                  <strong>Flagship Store - SoHo</strong>
                  <p>0.4 miles away</p>
                </div>
                <span className="status-pill green">● In-Stock</span>
              </div>
              <div className="avail-item">
                <div className="avail-info">
                  <strong>Brooklyn Yards</strong>
                  <p>2.8 miles away</p>
                </div>
                <span className="status-pill red">● Out of Stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Community Gallery ── */}
      <section className="community-gallery-pd">
        <div className="cg-header">
          <h2>Community Gallery</h2>
          <button className="upload-look-btn">
            Upload Your Look
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          </button>
        </div>
        <div className="cg-grid">
          <div className="cg-item"><img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400" alt="Look 1" /></div>
          <div className="cg-item"><img src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=400" alt="Look 2" /></div>
          <div className="cg-item"><img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400" alt="Look 3" /></div>
          <div className="cg-item"><img src="https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&q=80&w=400" alt="Look 4" /></div>
          <div className="cg-item more">
             <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=400" alt="More" />
             <div className="more-overlay">+24 More</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
