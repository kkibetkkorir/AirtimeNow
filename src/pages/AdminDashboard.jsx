// pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';

const AdminDashboard = ({ user, db }) => {
  const [purchases, setPurchases] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch purchases
      const purchasesQuery = query(collection(db, 'purchases'), orderBy('createdAt', 'desc'));
      const purchasesSnapshot = await getDocs(purchasesQuery);
      const purchasesData = purchasesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPurchases(purchasesData);

      // Fetch users
      const usersQuery = query(collection(db, 'users'), where('role', '==', 'user'));
      const usersSnapshot = await getDocs(usersQuery);
      const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-content">
        <div className="container">
          <div className="loading">Loading admin data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="container">
        <div className="page-header">
          <h1>Admin Dashboard</h1>
          <p>Manage users, purchases, and platform settings</p>
        </div>

        <div className="admin-tabs">
          <div
            className={`admin-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </div>
          <div
            className={`admin-tab ${activeTab === 'purchases' ? 'active' : ''}`}
            onClick={() => setActiveTab('purchases')}
          >
            Purchases
          </div>
          <div
            className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="admin-overview">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p className="stat-number">{users.length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Purchases</h3>
                <p className="stat-number">{purchases.length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Revenue</h3>
                <p className="stat-number">
                  KES{purchases.reduce((total, purchase) => total + purchase.amount, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'purchases' && (
          <div className="purchases-table">
            <h2>Recent Purchases</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Offer</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map(purchase => (
                  <tr key={purchase.id}>
                    <td>{purchase.id.substring(0, 8)}...</td>
                    <td>{purchase.userId.substring(0, 8)}...</td>
                    <td>{purchase.offerName}</td>
                    <td>KES{purchase.amount}</td>
                    <td>{purchase.paymentMethod}</td>
                    <td>{purchase.createdAt?.toDate().toLocaleDateString()}</td>
                    <td>
                      <span className={`status ${purchase.status}`}>
                        {purchase.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-table">
            <h2>Registered Users</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Join Date</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id.substring(0, 8)}...</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.createdAt?.toDate().toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;