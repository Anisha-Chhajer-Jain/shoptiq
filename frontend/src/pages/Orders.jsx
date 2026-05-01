import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import OrderDetailModal from '../components/OrderDetailModal';
import './Orders.css';

const Orders = ({ onNavigate }) => {
  const orders = useSelector((state) => state.orders?.orders || []);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
        {orders.map(order => (
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
               <button className="btn-details" onClick={() => setSelectedOrder(order)}>View Details</button>
            </div>
          </div>
        ))}
      </div>

      <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  );
};

export default Orders;
