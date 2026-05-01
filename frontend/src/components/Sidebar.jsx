import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddProductModal from './AddProductModal';
import './Sidebar.css';

const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const sidebarItems = [
    { id: 'dashboard', path: '/dashboard', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>, label: 'Dashboard' },
    { id: 'aistyling', path: '/aistyling', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>, label: 'Style Profile' },
    { id: 'orders', path: '/orders', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>, label: 'Orders' },
    { id: 'negotiation-hub', path: '/negotiation', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>, label: 'Store Management' },
    { id: 'analytics', path: '/analytics', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>, label: 'Analytics' },
    { id: 'add-product', path: '/add-product', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>, label: 'Add New Item' }
  ];

  return (
    <aside className="app-sidebar-hub">
      <div className="sidebar-header-hub-top">
        <strong>Enterprise Hub</strong>
        <p>SMART UNIFIED COMMERCE</p>
      </div>
      <nav className="sidebar-nav-hub">
        {sidebarItems.map((item) => {
          if (item.id === 'add-product') {
            return (
              <button 
                key={item.id} 
                className="sidebar-nav-item"
                style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
                onClick={() => setIsModalOpen(true)}
              >
                <span className="item-icon-svg">{item.icon}</span>
                <span className="item-label">{item.label}</span>
              </button>
            );
          }
          return (
            <Link 
              key={item.id} 
              to={item.path}
              className={`sidebar-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="item-icon-svg">{item.icon}</span>
              <span className="item-label">{item.label}</span>
              {location.pathname === item.path && <div className="active-curve"></div>}
            </Link>
          );
        })}

        {/* Service Button */}
        <button 
          className="sidebar-nav-item service-sidebar-btn"
          onClick={() => navigate('/support')}
          style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', marginTop: '2rem' }}
        >
          <span className="item-icon-svg">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line></svg>
          </span>
          <span className="item-label">Service / Help</span>
        </button>

        {/* Log Out Button */}
        <button 
          className="sidebar-nav-item logout-sidebar-btn"
          onClick={onLogout}
          style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
        >
          <span className="item-icon-svg">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </span>
          <span className="item-label">Log Out</span>
        </button>
      </nav>
      
      <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </aside>
  );
};

export default Sidebar;
