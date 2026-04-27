import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import NegotiatorBot from './components/NegotiatorBot';
import Footer from './components/Footer';
import { logout, loginSuccess } from './store/authSlice';
import './index.css';

// Lazy loading pages for performance optimization
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Inventory = lazy(() => import('./pages/Inventory'));
const AIStyling = lazy(() => import('./pages/AIStyling'));
const GroupBuy = lazy(() => import('./pages/GroupBuy'));
const Community = lazy(() => import('./pages/Community'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const Analytics = lazy(() => import('./pages/Analytics'));
const NegotiationHub = lazy(() => import('./pages/NegotiationHub'));
const Orders = lazy(() => import('./pages/Orders'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const LandingPage = lazy(() => import('./pages/LandingPage'));

// Skeleton Loader component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
  </div>
);

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogin = (user) => {
    dispatch(loginSuccess(user));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="app-container">
      {isAuthenticated && (
        <Navbar 
          onLogout={handleLogout} 
          cartCount={0} // To be connected to a cart slice later
        />
      )}
      
      <div className={`app-body-layout ${isAuthenticated ? 'with-sidebar' : ''}`}>
        {isAuthenticated && <Sidebar />}
        
        <main className="main-content-view">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/dashboard" />} />
              <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
              <Route path="/signup" element={!isAuthenticated ? <Signup onSignup={handleLogin} /> : <Navigate to="/dashboard" />} />
              
              {/* Protected Routes */}
              {isAuthenticated ? (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/aistyling" element={<AIStyling />} />
                  <Route path="/groupbuy" element={<GroupBuy />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/negotiation" element={<NegotiationHub />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
              ) : (
                <Route path="*" element={<Navigate to="/" />} />
              )}
            </Routes>
          </Suspense>
        </main>
      </div>

      {isAuthenticated && <NegotiatorBot />}
      <Footer />
    </div>
  );
}

export default App;
