import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import './Login.css';

const Login = ({ onLogin }) => {
  const [role, setRole] = useState('buyer');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Try logging in
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('shoptiq_token', data.token);
      if (onLogin) onLogin(data);
      toast.success('Logged in successfully!');
    } catch (error) {
      // If login fails, try auto-registering for demo purposes
      try {
        const { data } = await api.post('/auth/register', { 
          name: 'Enterprise User', 
          email, 
          password, 
          role: role 
        });
        localStorage.setItem('shoptiq_token', data.token);
        if (onLogin) onLogin(data);
        toast.success('Account created and logged in!');
      } catch (regError) {
        toast.error(error.message || 'Authentication failed');
      }
    }
  };

  return (
    <div className="login-root">
      <div className="login-card-layout">
        {/* ── Left Panel (Hero & Vision) ── */}
        <div className="login-hero-panel">
          <div className="hero-overlay-gradient"></div>
          <div className="hero-content-wrap">
            <div className="hero-text-main">
              <h2>Bridging the gap between digital vision and physical reality.</h2>
              <p>Eliminating the mismatch in availability, pricing, and expectations through smart unified commerce solutions.</p>
            </div>

            <div className="hero-feature-row">
              <div className="feature-item-pro">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect><path d="M7 2v20"></path><path d="M17 2v20"></path><path d="M2 12h20"></path></svg>
                <span>REAL-TIME INVENTORY</span>
              </div>
              <div className="feature-item-pro">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                <span>SMART PRICING</span>
              </div>
              <div className="feature-item-pro">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                <span>ACCURATE VISUALIZATION</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Panel (Auth Form) ── */}
        <div className="login-auth-panel">
          <div className="auth-scroll-wrap">
            <header className="auth-header-new">
              <h1>Welcome back</h1>
              <p>Log in to your enterprise commerce portal.</p>
            </header>

            <div className="role-toggle-group">
              <button
                className={`role-toggle ${role === 'buyer' ? 'active' : ''}`}
                onClick={() => setRole('buyer')}
              >
                Login as Buyer
              </button>
              <button
                className={`role-toggle ${role === 'seller' ? 'active' : ''}`}
                onClick={() => setRole('seller')}
              >
                Login as Seller
              </button>
            </div>

            <form className="auth-form-new" onSubmit={handleSubmit}>
              <div className="field-group-new">
                <label>Enterprise Email</label>
                <div className="input-with-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>
                  <input type="email" placeholder="name@company.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>

              <div className="field-group-new">
                <div className="label-row-new">
                  <label>Security Password</label>
                  <button type="button" className="forgot-pass-link">Forgot Password?</button>
                </div>
                <div className="input-with-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  <input type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button type="button" className="eye-toggle">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </button>
                </div>
              </div>

              <div className="auth-options-new">
                <label className="checkbox-wrap-new">
                  <input type="checkbox" />
                  <span className="checkbox-custom"></span>
                  Stay logged in for 30 days
                </label>
              </div>

              <button type="submit" className="btn-access-main">
                Access Dashboard
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </form>

            <div className="auth-divider-new">
              <span>OR CONTINUE WITH</span>
            </div>

            <div className="sso-row-new">
              <button className="sso-pill-new">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                Google
              </button>
              <button className="sso-pill-new">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                Enterprise SSO
              </button>
            </div>

            <footer className="auth-footer-new">
              <p>New to the platform? <a href="#">Contact sales</a> for enterprise access.</p>
              <p style={{ marginTop: '0.5rem' }}>Don't have an account? <Link to="/signup" style={{ color: '#4f46e5', fontWeight: '700' }}>Sign up here</Link></p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
