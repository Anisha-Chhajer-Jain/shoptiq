import React, { useState } from 'react';
import './AIStyling.css';

const AIStyling = () => {
  const [height, setHeight] = useState(180);
  const [weight, setWeight] = useState(75);
  const [bodyShape, setBodyShape] = useState('Inverted Triangle');
  const [isCameraActive, setIsCameraActive] = useState(false);

  const shapes = [
    { icon: '⬜', label: 'Rectangle' },
    { icon: '△', label: 'Inverted Triangle' },
    { icon: '🍐', label: 'Pear' },
    { icon: '◯', label: 'Oval' }
  ];

  return (
    <div className="aistyling-root">
      <main className="aistyling-content-pro">
        <div className="content-inner-pro">
          <header className="page-header-pro">
            <h1 className="page-title-pro">AI Style Profile</h1>
            <p className="page-subtitle-pro">Refine your digital twin to unlock ultra-precise fit recommendations and personalized smart commerce suggestions.</p>
          </header>

          <div className="aistyling-full-width">
            <section className="hub-card-pro-white">
              <div className="card-header-pro-hub">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                <h3>Physical Metrics</h3>
              </div>
              <div className="metrics-inputs-pro">
                <div className="input-group-pro">
                  <label>Height (cm)</label>
                  <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
                </div>
                <div className="input-group-pro">
                  <label>Weight (kg)</label>
                  <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
              </div>
              <div className="body-shape-selector-pro">
                <label>Body Shape</label>
                <div className="shape-grid-pro">
                  {shapes.map((shape) => (
                    <div 
                      key={shape.label} 
                      className={`shape-item-pro ${bodyShape === shape.label ? 'active' : ''}`}
                      onClick={() => setBodyShape(shape.label)}
                    >
                      <span className="shape-icon-pro">{shape.icon}</span>
                      <span className="shape-label-pro">{shape.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="ar-scan-card-pro">
              <div className="ar-scan-content-pro">
                <span className="ar-badge-pro-hub">SMART FEATURE</span>
                <h3>AR Body Scan</h3>
                <p>Instant 3D body mapping for 99.8% measurement accuracy using your device's LiDAR.</p>
                <button 
                  className={`init-cam-btn-pro ${isCameraActive ? 'active' : ''}`}
                  onClick={() => setIsCameraActive(!isCameraActive)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                  {isCameraActive ? 'Stop Mapping' : 'Initialize Scan'}
                </button>
              </div>
              <div className="ar-visual-pro-placeholder">
                <div className={`silhouette-pro ${isCameraActive ? 'scanning' : ''}`}>
                  <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                  </svg>
                </div>
                {isCameraActive && <div className="scan-line-pro"></div>}
              </div>
            </section>

            <section className="insights-card-pro-blue">
              <div className="insights-header-pro-hub">
                <h3>Size Finder Insights</h3>
                <p>REAL-TIME ANALYSIS</p>
              </div>
              <div className="insight-item-pro-hub">
                <div className="insight-icon-box-pro green">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                </div>
                <div className="insight-text-pro-hub">
                  <strong>Size Accuracy: High</strong>
                  <p>Based on your {bodyShape} profile, we recommend EU 52 for optimal fit.</p>
                </div>
              </div>
              <div className="tip-box-pro-light">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                <p><strong>Professional Tip:</strong> Broad shoulders detected. Look for "Athletic Cut" labels for maximum comfort.</p>
              </div>
              <button className="save-profile-btn-pro">
                Save & Apply Profile
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIStyling;
