import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ onLogout, onNavLink, activePage, onSearch, cartCount = 0 }) => {
  const [query, setQuery] = useState('');

  const navLinks = [
    { name: 'Shop', id: 'dashboard' },
    { name: 'Inventory', id: 'inventory' },
    { name: 'AI Styling', id: 'aistyling' },
    { name: 'Group Buy', id: 'groupbuy' },
    { name: 'Community', id: 'community' }
  ];

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      onSearch(query);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => onNavLink('dashboard')} style={{cursor: 'pointer'}}>
          Shoptiq
        </div>

        {/* Desktop Links */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href="#" 
              className={`navbar-link ${activePage === link.id ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); onNavLink(link.id); }}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Search Bar */}
        <div className="navbar-search-container">
          <div className="search-input-wrap">
            <svg className="search-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search products, pools, stores..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
            />
          </div>
        </div>

        <div className="navbar-actions">
          <button className="icon-btn-action" title="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
          
          <button className="icon-btn-action" title="Shopping Cart" onClick={() => onNavLink('cart')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
          </button>
          
          <div className="user-profile-trigger" onClick={onLogout} title="Logout">
            <div className="avatar-placeholder-pro">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="user-details-mini">
              <span className="user-name-nav">Admin</span>
              <span className="user-role-nav">Pro</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
