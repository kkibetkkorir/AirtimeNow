// pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Profile = ({ user, userData, db }) => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchPurchases = async () => {
      if (!user) return;

      try {
        const q = query(collection(db, 'purchases'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const userPurchases = [];

        querySnapshot.forEach((doc) => {
          userPurchases.push({ id: doc.id, ...doc.data() });
        });

        setPurchases(userPurchases);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [user, db]);

  if (!user) {
    return (
      <div className="page-content">
        <div className="container">
          <div className="page-header">
            <h1>Profile</h1>
            <p>Please log in to view your profile</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="container">
        <div className="page-header">
          <h1>Your Profile</h1>
          <p>Manage your account and view your purchase history</p>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <h2>Personal Information</h2>
            <div className="profile-info">
              <div className="info-item">
                <span className="label">Name:</span>
                <span className="value">{userData?.name || 'Not provided'}</span>
              </div>
              <div className="info-item">
                <span className="label" onClick={() => console.log(userData)}>Email:</span>
                <span className="value">{user.email}</span>
              </div>
              <div className="info-item">
                <span className="label">Phone:</span>
                <span className="value">{userData?.phone || 'Not provided'}</span>
              </div>
            </div>
          </div>

          <div className="profile-card">
            <h2>Purchase History</h2>
            {loading ? (
              <p>Loading purchases...</p>
            ) : purchases.length === 0 ? (
              <p>No purchases yet</p>
            ) : (
              <div className="purchases-list">
                {purchases.map(purchase => (
                  <div key={purchase.id} className="purchase-item">
                    <div className="purchase-details">
                      <h3>{purchase.offerName}</h3>
                      <p>Amount: ${purchase.amount}</p>
                      <p>Payment Method: {purchase.paymentMethod}</p>
                      <p>Phone: {purchase.phoneNumber}</p>
                      <p>Date: {purchase.createdAt?.toDate().toLocaleDateString()}</p>
                      <p>Status: <span className={`status ${purchase.status}`}>{purchase.status}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;