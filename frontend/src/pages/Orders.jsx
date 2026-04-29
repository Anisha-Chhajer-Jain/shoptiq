import React from 'react';
import { toast } from 'react-toastify';
import './Orders.css';

const ORDERS_DATA = [
  { id: 'ORD-99021', date: 'Oct 24, 2024', total: 12500, status: 'Delivered', items: 3, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200' },
  { id: 'ORD-88712', date: 'Oct 12, 2024', total: 4500, status: 'Processing', items: 1, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200' },
  { id: 'ORD-77621', date: 'Sep 28, 2024', total: 28400, status: 'Shipped', items: 5, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200' }
];

const Orders = ({ onNavigate }) => {
  return (
    <div className="orders-root">
      <header className="orders-header">
        <div className="title-area">
           <h1>Order History</h1>
           <p>Track your enterprise procurement and settlement status.</p>
        </div>
        <button className="btn-export" onClick={() => toast.success('PDF Report is being generated and will download shortly.')}>Export PDF Report</button>
      </header>

      <div className="orders-list">
        {ORDERS_DATA.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-main-info">
               <div className="order-img" style={{ backgroundImage: `url(${order.img})` }}></div>
               <div className="order-details">
                  <span className="order-id">{order.id}</span>
                  <span className="order-date">{order.date}</span>
                  <div className="order-stats">
                     <strong>₹{order.total.toLocaleString()}</strong>
                     <span>• {order.items} Items</span>
                  </div>
               </div>
            </div>
            <div className="order-status-area">
               <span className={`status-pill ${order.status.toLowerCase()}`}>
                  ● {order.status}
               </span>
               <button className="btn-details" onClick={() => toast.info(`Viewing details for order ${order.id}`)}>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
