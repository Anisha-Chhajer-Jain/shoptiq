import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ onLogout, onNavLink, activePage }) => {
  const [activeLink, setActiveLink] = useState('Deals');
  const [aiDropdown, setAiDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = ['Deals', 'Inventory', 'Community', 'Group Buy'];

  return (
    <>
      <nav className="navbar">
        {/* Hamburger for mobile */}
        <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>

        <div className="navbar-brand">Shoptiq</div>

        {/* Desktop Links */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <a key={link} href="#"
              className={`navbar-link ${(activePage === 'inventory' && link === 'Inventory') || (activePage !== 'inventory' && activeLink === link) ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveLink(link); if (onNavLink) onNavLink(link); }}>
              {link}
            </a>
          ))}

          {/* AI Styling Dropdown */}
          <div className="ai-styling-wrapper"
            onMouseEnter={() => setAiDropdown(true)}
            onMouseLeave={() => setAiDropdown(false)}>
            <a href="#" className={`navbar-link ai-link ${activeLink === 'AI Styling' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveLink('AI Styling'); }}>
              <span className="ai-sparkle">✦</span>
              AI Styling
              <svg className={`chevron ${aiDropdown ? 'rotated' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>
            {aiDropdown && (
              <div className="ai-dropdown">
                <div className="ai-dropdown-header">
                  <span className="ai-badge">✦ Powered by Shoptiq AI</span>
                </div>
                <div className="ai-dropdown-items">
                  {[
                    { icon: '🪄', title: 'Style Recommender', sub: 'Get outfits curated to your taste' },
                    { icon: '🧍', title: 'AR Try-On', sub: 'Virtually try clothes before buying' },
                    { icon: '📐', title: 'Size Calibrator', sub: 'AI-powered perfect fit across brands' },
                    { icon: '💡', title: 'Trend Insights', sub: "What's trending in your city right now" },
                  ].map((item) => (
                    <a key={item.title} href="#" className="ai-dropdown-item">
                      <div className="ai-item-icon">{item.icon}</div>
                      <div>
                        <div className="ai-item-title">{item.title}</div>
                        <div className="ai-item-sub">{item.sub}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          <button className="icon-btn" title="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <button className="icon-btn" title="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span className="notif-dot"></span>
          </button>
          <button className="icon-btn cart-icon" title="Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </button>
          <div className="avatar-circle">A</div>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <a key={link} href="#" className="mobile-link"
              onClick={(e) => { e.preventDefault(); setActiveLink(link); setMobileMenuOpen(false); }}>
              {link}
            </a>
          ))}
          <a href="#" className="mobile-link ai-mobile-link"
            onClick={(e) => { e.preventDefault(); setActiveLink('AI Styling'); setMobileMenuOpen(false); }}>
            ✦ AI Styling
          </a>
          <button className="mobile-logout" onClick={onLogout}>Logout</button>
        </div>
      )}
    </>
  );
};

export default Navbar;
