// pages/Offers.jsx
import React, { useState } from 'react';
import { addDoc, collection, doc, updateDoc, arrayUnion } from 'firebase/firestore';

const Offers = ({ user, db }) => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const offers = [
    {
      id: 1,
      name: 'Starter Pack',
      price: 5,
      features: [
        '10% bonus airtime',
        'Valid for 30 days',
        'All networks',
        'Instant delivery'
      ]
    },
    {
      id: 2,
      name: 'Value Pack',
      price: 15,
      features: [
        '15% bonus airtime',
        'Valid for 60 days',
        'All networks',
        'Instant delivery',
        '1GB data bonus'
      ]
    },
    {
      id: 3,
      name: 'Premium Pack',
      price: 30,
      features: [
        '20% bonus airtime',
        'Valid for 90 days',
        'All networks',
        'Instant delivery',
        '3GB data bonus',
        '10 free SMS'
      ]
    }
  ];

  const handlePurchase = async () => {
    if (!user) {
      alert('Please login to make a purchase');
      return;
    }

    if (!selectedOffer || !paymentMethod || !phoneNumber) {
      alert('Please select an offer, payment method, and provide your phone number');
      return;
    }

    setLoading(true);

    try {
      // Simulate payment processing
      let paymentStatus = 'pending';

      if (paymentMethod === 'paypal') {
        // Integrate PayPal payment here
        // This is a mock implementation
        paymentStatus = 'completed';
      } else if (paymentMethod === 'mpesa') {
        // Integrate M-Pesa STK push here
        // This is a mock implementation
        paymentStatus = 'completed';
      }

      // Record the purchase
      const purchaseData = {
        userId: user.uid,
        offerId: selectedOffer.id,
        offerName: selectedOffer.name,
        amount: selectedOffer.price,
        paymentMethod,
        phoneNumber,
        status: paymentStatus,
        createdAt: new Date()
      };

      // Add to purchases collection
      const purchaseRef = await addDoc(collection(db, 'purchases'), purchaseData);

      // Update user's purchase history
      await updateDoc(doc(db, 'users', user.uid), {
        purchases: arrayUnion(purchaseRef.id)
      });

      alert(`Purchase successful! Your ${selectedOffer.name} has been activated.`);
      setSelectedOffer(null);
      setPaymentMethod('');
      setPhoneNumber('');
    } catch (error) {
      console.error('Error processing purchase:', error);
      alert('There was an error processing your purchase. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      <div className="container">
        <div className="page-header">
          <h1>Special Airtime Offers</h1>
          <p>Get the best value with our exclusive airtime deals and promotions</p>
        </div>

        <div className="offers-grid">
          {offers.map(offer => (
            <div key={offer.id} className="offer-card">
              <div className="offer-header">
                <h3>{offer.name}</h3>
              </div>
              <div className="offer-body">
                <div className="offer-price">${offer.price}</div>
                <ul className="offer-features">
                  {offer.features.map((feature, index) => (
                    <li key={index}>
                      <i className="fas fa-check"></i> {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => setSelectedOffer(offer)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedOffer && (
          <div className="purchase-modal">
            <div className="modal-content">
              <h2>Purchase {selectedOffer.name}</h2>
              <p>Price: ${selectedOffer.price}</p>

              <div className="form-group">
                <label htmlFor="phone">Your Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  className="form-control"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Payment Method</label>
                <div className="payment-options">
                  <div
                    className={`payment-option ${paymentMethod === 'mpesa' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('mpesa')}
                  >
                    <i className="fas fa-mobile-alt"></i>
                    <span>M-Pesa</span>
                  </div>
                  <div
                    className={`payment-option ${paymentMethod === 'paypal' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <i className="fab fa-paypal"></i>
                    <span>PayPal</span>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="btn btn-outline"
                  onClick={() => setSelectedOffer(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handlePurchase}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Confirm Purchase'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;