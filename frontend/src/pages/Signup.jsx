import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

const Signup = ({ onSignup }) => {
  const [role, setRole] = useState('buyer');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSignup) onSignup(true);
    navigate('/dashboard');
  };

  return (
    <div className="signup-root">
      <div className="signup-card-layout">
        {/* ── Left Panel (Vision) ── */}
        <div className="signup-hero-panel">
          <div className="hero-overlay-gradient"></div>
          <div className="hero-content-wrap">
            <div className="hero-text-main">
              <h2>Join the future of Unified Commerce.</h2>
              <p>Register your enterprise to bridge the gap between digital vision and physical reality.</p>
            </div>
            
            <div className="hero-feature-row">
              <div className="feature-item-pro">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>
                 <span>INSTANT SYNC</span>
              </div>
              <div className="feature-item-pro">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
                 <span>VERIFIED AGENTS</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Panel (Form) ── */}
        <div className="signup-auth-panel">
          <div className="auth-scroll-wrap">
            <header className="auth-header-new">
              <h1>Create Account</h1>
              <p>Register your organization for the 2.0 ecosystem.</p>
            </header>

            <div className="role-toggle-group">
               <button 
                className={`role-toggle ${role === 'buyer' ? 'active' : ''}`}
                onClick={() => setRole('buyer')}
               >
                 I'm a Buyer
               </button>
               <button 
                className={`role-toggle ${role === 'seller' ? 'active' : ''}`}
                onClick={() => setRole('seller')}
               >
                 I'm a Seller
               </button>
            </div>

            <form className="auth-form-new" onSubmit={handleSubmit}>
              <div className="field-group-new">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  <input type="text" placeholder="Alex Sterling" required />
                </div>
              </div>

              <div className="field-group-new">
                <label>Organization Name</label>
                <div className="input-with-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 21h18"></path><path d="M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3"></path><path d="M19 21V11"></path><path d="M5 21V11"></path></svg>
                  <input type="text" placeholder="Acme Enterprise" required />
                </div>
              </div>

              <div className="field-group-new">
                <label>Enterprise Email</label>
                <div className="input-with-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>
                  <input type="email" placeholder="name@company.com" required />
                </div>
              </div>

              <div className="field-group-new">
                <label>Security Password</label>
                <div className="input-with-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  <input type="password" placeholder="Min. 8 characters" required />
                </div>
              </div>

              <button type="submit" className="btn-access-main">
                Register Organization
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </form>

            <footer className="auth-footer-new">
              <p>Already registered? <Link to="/login">Sign in here</Link></p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
