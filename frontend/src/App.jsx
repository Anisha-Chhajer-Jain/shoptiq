import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import AIStyling from './components/AIStyling';
import GroupBuy from './components/GroupBuy';
import Community from './components/Community';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import SearchResults from './components/SearchResults';
import Analytics from './components/Analytics';
import NegotiatorBot from './components/NegotiatorBot';
import Footer from './components/Footer';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import './index.css';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLanding, setIsLanding] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [botProduct, setBotProduct] = useState(null);

  useEffect(() => {
    const authStatus = localStorage.getItem('shoptiq_auth');
    if (authStatus === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (status) => {
    setIsAuthenticated(status);
    localStorage.setItem('shoptiq_auth', status);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('shoptiq_auth');
    setActivePage('dashboard');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setActivePage('search-results');
  };

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, { ...product, id: Date.now() }]);
    setActivePage('cart');
  };

  const handleOpenNegotiator = (product) => {
    setBotProduct(product);
    setIsBotOpen(true);
  };

  if (!isAuthenticated) {
    if (isLanding) {
      return <LandingPage onGetStarted={() => setIsLanding(false)} />;
    }
    return <Login onLogin={handleLogin} />;
  }

  // Define pages that should NOT have a sidebar (like Checkout, ProductDetail)
  const noSidebarPages = ['checkout', 'product-detail', 'groupbuy'];
  const hasSidebar = !noSidebarPages.includes(activePage);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard onNavigate={(page) => setActivePage(page)} />;
      case 'inventory': return <Inventory />;
      case 'aistyling': return <AIStyling />;
      case 'groupbuy': return <GroupBuy />;
      case 'community': return <Community />;
      case 'analytics': return <Analytics />;
      case 'product-detail': return <ProductDetail onAddToCart={handleAddToCart} onNegotiate={handleOpenNegotiator} />;
      case 'cart': return <Cart onCheckout={() => setActivePage('checkout')} />;
      case 'checkout': return <Checkout onComplete={() => setActivePage('dashboard')} />;
      case 'search-results': return <SearchResults query={searchQuery} onNavigate={(page) => setActivePage(page)} />;
      default: return <Dashboard onNavigate={(page) => setActivePage(page)} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar 
        activePage={activePage} 
        onNavLink={(page) => setActivePage(page)} 
        onLogout={handleLogout} 
        onSearch={handleSearch}
        cartCount={cartItems.length}
      />
      
      <div className={`app-body-layout ${hasSidebar ? 'with-sidebar' : ''}`}>
        {hasSidebar && (
          <Sidebar activePage={activePage} onNavigate={(page) => setActivePage(page)} />
        )}
        <main className="main-content-view">
          {renderPage()}
        </main>
      </div>

      <NegotiatorBot 
        isOpen={isBotOpen} 
        onClose={() => setIsBotOpen(false)} 
        product={botProduct} 
      />

      <Footer onNavLink={(page) => setActivePage(page)} />
    </div>
  );
}

export default App;
