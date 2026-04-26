import React from 'react';
import './Analytics.css';

const Analytics = () => {
  const metrics = [
    { label: 'Total Revenue', value: '₹1,24,50,000.00', trend: '+12.5%', type: 'positive' },
    { label: 'Active Negotiations', value: '42', trend: '+8.2%', type: 'positive' },
    { label: 'Conversion Rate', value: '3.8%', trend: '-0.4%', type: 'negative' },
    { label: 'Avg. Order Value', value: '₹45,500.00', trend: '+5.1%', type: 'positive' }
  ];

  const recentTransactions = [
    { id: '#TR-9021', item: 'Onyx Mechanical Watch', date: 'Oct 24, 2023', status: 'Completed', amount: '₹35,800.00' },
    { id: '#TR-8842', item: 'Eames Lounge Chair', date: 'Oct 23, 2023', status: 'Pending', amount: '₹75,500.00' },
    { id: '#TR-8710', item: 'Studio Audio Pack', date: 'Oct 22, 2023', status: 'Completed', amount: '₹1,12,000.00' },
    { id: '#TR-8605', item: 'Nordic Chrono 40', date: 'Oct 21, 2023', status: 'Refunded', amount: '₹18,240.00' }
  ];

  return (
    <div className="analytics-root">
      <header className="analytics-header">
        <div className="header-text-pro">
          <h1 className="analytics-title">Business Analytics</h1>
          <p className="analytics-subtitle">Monitor your unified commerce performance, conversion metrics, and negotiation health in real-time.</p>
        </div>
        <div className="header-actions-pro">
          <button className="btn-export-pro">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Export Report
          </button>
          <div className="date-range-pro">Last 30 Days</div>
        </div>
      </header>

      {/* ── Key Metrics ── */}
      <div className="metrics-grid-pro">
        {metrics.map((m, idx) => (
          <div key={idx} className="metric-card-pro">
            <div className="metric-label-row">
              <span className="m-label">{m.label}</span>
              <span className={`m-trend ${m.type}`}>{m.trend}</span>
            </div>
            <div className="m-value">{m.value}</div>
            <div className="m-chart-mini">
               <div className="bar" style={{ height: '40%' }}></div>
               <div className="bar" style={{ height: '60%' }}></div>
               <div className="bar" style={{ height: '50%' }}></div>
               <div className="bar" style={{ height: '80%' }}></div>
               <div className="bar" style={{ height: '70%' }}></div>
               <div className="bar" style={{ height: '90%' }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Analytics Section ── */}
      <div className="analytics-main-grid">
        <section className="analytics-chart-section">
          <div className="section-header-pro">
            <h3>Revenue Overview</h3>
            <div className="chart-legend">
               <span className="dot revenue"></span> Revenue
               <span className="dot target"></span> Target
            </div>
          </div>
          <div className="main-chart-placeholder">
             {/* Simple SVG Line Chart for High Fidelity */}
             <svg width="100%" height="250" viewBox="0 0 800 250">
                <path d="M0 200 Q 100 180, 200 150 T 400 120 T 600 80 T 800 50" fill="none" stroke="var(--accent)" strokeWidth="4" />
                <path d="M0 220 Q 100 200, 200 180 T 400 160 T 600 140 T 800 120" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="8,8" />
                <circle cx="200" cy="150" r="6" fill="var(--accent)" />
                <circle cx="400" cy="120" r="6" fill="var(--accent)" />
                <circle cx="600" cy="80" r="6" fill="var(--accent)" />
             </svg>
             <div className="chart-x-axis">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
             </div>
          </div>
        </section>

        <section className="analytics-list-section">
          <div className="section-header-pro">
            <h3>Recent Transactions</h3>
            <button className="text-link-pro">View Ledger</button>
          </div>
          <div className="transaction-table-wrap">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Item</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tr, idx) => (
                  <tr key={idx}>
                    <td><strong>{tr.id}</strong><br/><span>{tr.date}</span></td>
                    <td>{tr.item}</td>
                    <td><span className={`status-tag-pro ${tr.status.toLowerCase()}`}>{tr.status}</span></td>
                    <td className="amount-cell">{tr.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* ── Secondary Insights ── */}
      <div className="analytics-secondary-grid">
         <section className="inventory-health-hub">
            <h3>Inventory Health</h3>
            <div className="health-stat-row">
               <div className="health-item">
                  <span className="h-val">94%</span>
                  <span className="h-lab">In Stock Rate</span>
               </div>
               <div className="health-item">
                  <span className="h-val">1.2%</span>
                  <span className="h-lab">Return Rate</span>
               </div>
            </div>
            <div className="health-progress-bar">
               <div className="fill" style={{ width: '94%' }}></div>
            </div>
         </section>
         
         <section className="negotiation-success-hub">
            <h3>Negotiation Success</h3>
            <div className="success-pie-wrap">
               <div className="pie-chart-mock">
                  <div className="pie-inner">
                     <strong>78%</strong>
                     <span>Success</span>
                  </div>
               </div>
               <div className="pie-legend">
                  <p><span className="dot success"></span> Accepted: 78%</p>
                  <p><span className="dot counter"></span> Countered: 15%</p>
                  <p><span className="dot failed"></span> Rejected: 7%</p>
               </div>
            </div>
         </section>
      </div>
    </div>
  );
};

export default Analytics;
