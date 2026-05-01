import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { 
  ShoppingBag, 
  Clock, 
  XCircle, 
  Search, 
  Filter, 
  Download,
  Eye
} from 'lucide-react';
import OrderDetailModal from '../components/OrderDetailModal';
import './Orders.css';

const Orders = () => {
  const orders = useSelector((state) => state.orders?.orders || []);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate Stats
  const stats = useMemo(() => {
    return {
      new: orders.filter(o => o.status === 'Processing').length,
      pending: orders.filter(o => o.status === 'Shipped').length,
      cancelled: orders.filter(o => o.status === 'Cancelled' || o.status === 'Refunded').length
    };
  }, [orders]);

  // Filtered Orders
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.shippingDetails?.name || 'Guest').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="orders-root">
      {/* ── Header ── */}
      <header className="orders-management-header">
        <div className="header-title-section">
          <h1>Orders Management</h1>
          <p>Track, manage, and fulfill customer orders across all channels.</p>
        </div>
        <div className="header-actions">
          <button className="btn-filter">
            <Filter size={18} />
            All Statuses
          </button>
          <button className="btn-export-csv" onClick={() => toast.info('Exporting order database to CSV...')}>
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </header>

      {/* ── Stats Row ── */}
      <div className="orders-stats-grid">
        <div className="stat-card-pro">
          <div className="stat-info">
            <h3>New Orders</h3>
            <div className="stat-value">{stats.new}</div>
          </div>
          <div className="stat-icon-wrap blue">
            <ShoppingBag size={24} />
          </div>
        </div>

        <div className="stat-card-pro">
          <div className="stat-info">
            <h3>Pending Fulfillment</h3>
            <div className="stat-value">{stats.pending}</div>
          </div>
          <div className="stat-icon-wrap amber">
            <Clock size={24} />
          </div>
        </div>

        <div className="stat-card-pro">
          <div className="stat-info">
            <h3>Cancelled</h3>
            <div className="stat-value">{stats.cancelled}</div>
          </div>
          <div className="stat-icon-wrap rose">
            <XCircle size={24} />
          </div>
        </div>
      </div>

      {/* ── Table Section ── */}
      <section className="recent-orders-section">
        <div className="section-header-row">
          <h2>Recent Orders</h2>
          <div className="table-search-wrap">
            <Search size={18} className="search-icon-inline" />
            <input 
              type="text" 
              placeholder="Search Order ID or Customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="orders-table-container">
          <table className="orders-management-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="col-order-id">{order.id}</td>
                    <td className="col-date">{order.date}</td>
                    <td className="col-customer">
                      {order.shippingDetails?.name || 'Anisha Chhajer'}
                    </td>
                    <td className="col-total">₹{order.total.toLocaleString()}</td>
                    <td>
                      <span className={`status-badge-pro ${order.status.toLowerCase()}`}>
                        ● {order.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn-action-view"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No orders found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  );
};

export default Orders;
