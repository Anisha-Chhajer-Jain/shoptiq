import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { toast } from 'react-toastify';
import api from '../services/api';
import axios from 'axios';
import { NEGOTIATIONS, GROUP_BUYS } from '../data/products';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { localProducts } = useSelector((state) => state.products);
  const [dbProducts, setDbProducts] = useState([]);
  const [dummyProducts, setDummyProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setDbProducts(data);
      } catch (error) {
        console.error('Failed to fetch DB products', error);
      }
    };
    
    const fetchDummyProducts = async () => {
      try {
        const [mensRes, womensRes] = await Promise.all([
          axios.get('https://dummyjson.com/products/category/mens-shirts?limit=4'),
          axios.get('https://dummyjson.com/products/category/womens-dresses?limit=4')
        ]);
        setDummyProducts([...mensRes.data.products, ...womensRes.data.products].sort(() => Math.random() - 0.5));
      } catch (error) {
        console.error('Failed to fetch dummy products', error);
      }
    };

    fetchProducts();
    fetchDummyProducts();
  }, []);

  return (
    <div className="dashboard-root animate-fade-in">
      <section className="hero-banner-pro animate-slide-in-3d">
        <div className="hero-content-pro">
          <div className="hero-badge-hub">
            <span className="dot"></span>
            LIVE COMMERCE PORTAL
          </div>
          <h1 className="hero-h1">Command your retail <br /> empire with precision.</h1>
          <p className="hero-p">Manage inventory, negotiate deals, and scale your business with Shoptiq's enterprise-grade commerce engine.</p>
          <div className="hero-btns">
            <button className="btn-solid" onClick={() => navigate('/inventory')}>Inventory Map</button>
            <button className="btn-blur" onClick={() => navigate('/orders')}>Active Orders</button>
          </div>
        </div>
        <div className="hero-metric-pro animate-float-3d">
          <div className="m-label">TOTAL REVENUE (MTD)</div>
          <div className="m-value">₹8,42,900</div>
          <div className="m-trend">↑ 12.5% from last month</div>
        </div>
      </section>

      <div className="dashboard-main-grid stagger-items">
        <section className="dashboard-card-section">
          <div className="card-section-header">
            <h3>Negotiation Hub</h3>
            <button className="card-link" onClick={() => navigate('/negotiation')}>VIEW ALL</button>
          </div>
          <div className="neg-stack-pro">
            {NEGOTIATIONS.map((neg) => (
              <div key={neg.id} className="neg-item-pro">
                <div className="neg-info">
                  <strong>{neg.name}</strong>
                  <p>Asking: ₹{neg.asking.toLocaleString()} • Bid: <span className="blue">₹{neg.bid.toLocaleString()}</span></p>
                </div>
                <div className="neg-status-row">
                   <span className={`status-tag ${neg.type}`}>{neg.status}</span>
                   <button className="btn-manage-pro" onClick={() => navigate('/negotiation')}>MANAGE</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-card-section">
          <div className="card-section-header">
            <h3>Group Buy Pools</h3>
            <button className="card-link" onClick={() => navigate('/groupbuy')}>EXPLORE</button>
          </div>
          <div className="gb-stack-pro">
            {GROUP_BUYS.map((pool) => (
              <div key={pool.id} className="gb-item-pro" onClick={() => navigate(`/groupbuy/${pool.id}`)}>
                <div className="gb-img-mini" style={{ backgroundImage: `url(${pool.img})` }}>
                  <span className="gb-discount-pro">{pool.discount}</span>
                </div>
                <div className="gb-details-pro">
                  <strong>{pool.name}</strong>
                  <div className="gb-bar-pro">
                    <div className="fill" style={{ width: `${pool.progress}%` }}></div>
                  </div>
                  <p>{pool.backers} backers • {pool.needed} more needed</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="collection-section-pro">
        <div className="section-header-pro">
          <div className="section-info-pro">
            <h2 className="section-title-pro">The Precision Collection</h2>
            <p className="section-subtitle-pro">Curated high-fidelity essentials for the modern professional.</p>
          </div>
          <div className="nav-controls-pro">
            <button className="nav-btn">{'<'}</button>
            <button className="nav-btn">{'>'}</button>
          </div>
        </div>

        <div className="precision-grid-pro stagger-items">
          {localProducts.map((product) => (
            <div key={product.id} className="p-card-pro animate-fade-in" onClick={() => navigate(`/product/${product.id}`)}>
              <div className="p-img-pro">
                <img src={product.image || product.img} alt={product.name} />
                <span className="p-stock-pro in-stock">NEW ASSET</span>
                <button className="p-add-pro" onClick={(e) => { 
                   e.stopPropagation(); 
                   dispatch(addToCart({ 
                     id: product.id, 
                     name: product.name, 
                     price: product.price, 
                     img: product.image || product.img, 
                     discount: 0 
                   }));
                   toast.success(`${product.name} added to cart!`);
                }}>
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
              <div className="p-info-pro">
                <span className="p-brand-pro">{product.category.toUpperCase()}</span>
                <h4 className="p-name-pro">{product.name}</h4>
                <div className="p-footer-pro">
                   <div className="p-pricing-pro">
                      <span className="p-price-pro">₹{product.price.toLocaleString()}</span>
                   </div>
                   <span className="p-offer-pro">LOCAL SYNC</span>
                </div>
              </div>
            </div>
          ))}

          {dummyProducts.map((product) => (
            <div key={product.id} className="p-card-pro animate-slide-in-3d" onClick={() => navigate(`/product/${product.id}`)}>
              <div className="p-img-pro">
                <img src={product.thumbnail} alt={product.title} />
                <span className={`p-stock-pro ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>{product.stock > 0 ? 'IN STOCK' : 'OUT OF STOCK'}</span>
                <button className="p-add-pro" onClick={(e) => { 
                   e.stopPropagation(); 
                   dispatch(addToCart({ 
                     id: product.id, 
                     name: product.title, 
                     price: product.price, 
                     img: product.thumbnail, 
                     discount: product.discountPercentage > 10 ? (product.price * 0.1) : 0 
                   }));
                   toast.success(`${product.title} added to cart!`);
                }}>
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
              <div className="p-info-pro">
                <span className="p-brand-pro">{product.brand || product.category.toUpperCase()}</span>
                <h4 className="p-name-pro">{product.title}</h4>
                <div className="p-footer-pro">
                   <div className="p-pricing-pro">
                      <span className="p-price-pro">${product.price.toFixed(2)}</span>
                      {product.discountPercentage > 0 && (
                        <span className="p-old-price-pro" style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '0.8rem', marginLeft: '8px' }}>
                          ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                        </span>
                      )}
                   </div>
                   <span className="p-offer-pro">{Math.round(product.discountPercentage)}% OFF</span>
                </div>
              </div>
            </div>
          ))}
          {/* Render Products fetched from MongoDB */}
          {dbProducts.map((product) => (
            <div key={product._id} className="p-card-pro" onClick={() => navigate(`/product/${product._id}`)}>
              <div className="p-img-pro">
                <img src={product.image || product.img || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'} alt={product.name} />
                <span className={`p-stock-pro in-stock`}>IN STOCK</span>
                <button className="p-add-pro" onClick={(e) => { 
                   e.stopPropagation(); 
                   dispatch(addToCart({ 
                     id: product._id, 
                     name: product.name, 
                     price: product.price, 
                     img: product.image || product.img || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', 
                     discount: 0 
                   }));
                   toast.success(`${product.name} added to cart!`);
                }}>
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
              <div className="p-info-pro">
                <span className="p-brand-pro">{product.category}</span>
                <h4 className="p-name-pro">{product.name}</h4>
                <div className="p-footer-pro">
                   <div className="p-pricing-pro">
                      <span className="p-price-pro">₹{product.price.toLocaleString()}</span>
                   </div>
                   <span className="p-offer-pro">NEW</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAB Assistant */}
      <div className="fab-pro">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
         <span>Assistant</span>
      </div>
    </div>
  );
};

export default Dashboard;
