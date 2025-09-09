import React, { useState, useEffect } from 'react';
import { addDoc, collection, doc, updateDoc, arrayUnion } from 'firebase/firestore';

const Offers = ({ user, db }) => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [paystackLoaded, setPaystackLoaded] = useState(false);

  const offers = [
    {
      id: 1,
      name: 'Starter Pack',
      price: 50,
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
      price: 100,
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
      price: 250,
      features: [
        '20% bonus airtime',
        'Valid for 90 days',
        'All networks',
        'Instant delivery',
        '2GB data bonus',
        '10 free SMS'
      ]
    }
  ];

  // Load Paystack script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v2/inline.js';
    script.async = true;
    script.onload = () => {
      setPaystackLoaded(true);
      console.log('Paystack script loaded');
    };
    script.onerror = () => {
      console.error('Failed to load Paystack script');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePaystackPayment = () => {
    if (!user || !selectedOffer || !phoneNumber) {
      alert('Please login, select an offer, and provide your phone number');
      return;
    }

    setLoading(true);

    // Initialize Paystack
    const paystack = new window.PaystackPop();

    // Generate a unique reference (you might want to use a better method)
    const reference = `PSK_${user.uid.slice(0, 8)}_${Date.now()}`;

    // Configure transaction
    paystack.newTransaction({
      key: 'pk_test_4ec79b6138a5fea7b8238817becd175e2fc9962e', // Replace with your actual public key
      email: user.email || 'customer@example.com',
      amount: selectedOffer.price * 100, // Convert to kobo
      firstname: user.displayName ? user.displayName.split(' ')[0] : 'Customer',
      lastname: user.displayName ? user.displayName.split(' ')[1] || '' : '',
      phone: phoneNumber,
      metadata: {
        custom_fields: [
          {
            display_name: 'User ID',
            variable_name: 'user_id',
            value: user.uid
          },
          {
            display_name: 'Offer ID',
            variable_name: 'offer_id',
            value: selectedOffer.id
          },
          {
            display_name: 'Phone Number',
            variable_name: 'phone_number',
            value: phoneNumber
          }
        ]
      },
      reference: reference,
      channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money'],
      onSuccess: async (transaction) => {
        // Payment successful
        try {
          // Record the purchase
          const purchaseData = {
            userId: user.uid,
            offerId: selectedOffer.id,
            offerName: selectedOffer.name,
            amount: selectedOffer.price,
            paymentMethod: 'paystack',
            phoneNumber,
            status: 'completed',
            transactionRef: transaction.reference,
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
          setPhoneNumber('');
        } catch (error) {
          console.error('Error recording purchase:', error);
          alert('Payment was successful but there was an error recording your purchase. Please contact support with reference: ' + transaction.reference);
        } finally {
          setLoading(false);
        }
      },
      onCancel: () => {
        // User closed the payment modal
        setLoading(false);
        alert('Payment was cancelled');
      },
      onError: (error) => {
        // Handle payment error
        setLoading(false);
        console.error('Paystack error:', error);
        alert('Payment failed: ' + error.message);
      }
    });
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
                  disabled={!paystackLoaded}
                >
                  {paystackLoaded ? 'Buy Now' : 'Loading Payment...'}
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

              <div className="modal-actions">
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setSelectedOffer(null);
                    setPhoneNumber('');
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handlePaystackPayment}
                  disabled={loading || !phoneNumber}
                >
                  {loading ? 'Processing...' : 'Proceed to Payment'}
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