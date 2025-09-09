import React, { useState, useEffect } from 'react';
import { addDoc, collection, doc, updateDoc, arrayUnion } from 'firebase/firestore';

const Offers = ({ user, db }) => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('paystack');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [paystackLoaded, setPaystackLoaded] = useState(false);
  const [message, setMessage] = useState('');

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
        '3GB data bonus',
        '10 free SMS'
      ]
    }
  ];

  // Network specific offers
  const networkOffers = [
    {
      id: 4,
      name: 'Safaricom OFA',
      price: 100,
      network: 'Safaricom',
      description: 'Get 25% extra airtime on all Safaricom top-ups this week',
      color: '#1c9e41ff'
    },
    {
      id: 5,
      name: 'AT&T Special',
      price: 80,
      network: 'AT&T',
      description: 'Get 15% extra airtime on all AT&T top-ups this week',
      color: '#e74c3c'
    },
    {
      id: 6,
      name: 'Verizon Deal',
      price: 50,
      network: 'Verizon',
      description: 'Double data bonus with every Verizon airtime purchase',
      color: '#3498db'
    },
    {
      id: 7,
      name: 'T-Mobile Offer',
      price:100,
      network: 'T-Mobile',
      description: 'Free international calls bonus with T-Mobile top-ups',
      color: '#9b59b6'
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
    setMessage('Initializing payment...');

    // Initialize Paystack
    const paystack = new window.PaystackPop();

    // Generate a unique reference
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
        setMessage('Payment successful! Recording your purchase...');

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

          setMessage(`Purchase successful! Your ${selectedOffer.name} has been activated.`);
          setTimeout(() => {
            setSelectedOffer(null);
            setPhoneNumber('');
            setPaymentMethod('');
            setMessage('');
          }, 3000);
        } catch (error) {
          console.error('Error recording purchase:', error);
          setMessage('Payment was successful but there was an error recording your purchase. Please contact support with reference: ' + transaction.reference);
        } finally {
          setLoading(false);
        }
      },
      onCancel: () => {
        // User closed the payment modal
        setLoading(false);
        setMessage('Payment was cancelled');
        setTimeout(() => setMessage(''), 3000);
      },
      onError: (error) => {
        // Handle payment error
        setLoading(false);
        console.error('Paystack error:', error);
        setMessage('Payment failed: ' + error.message);
        setTimeout(() => setMessage(''), 5000);
      }
    });
  };

  const handlePurchase = () => {
    if (!user) {
      alert('Please login to make a purchase');
      return;
    }

    if (!selectedOffer || !paymentMethod || !phoneNumber) {
      alert('Please select an offer, payment method, and provide your phone number');
      return;
    }

    if (paymentMethod === 'paystack') {
      handlePaystackPayment();
    } else {
      // Handle other payment methods
      setLoading(true);
      setMessage(`Processing ${paymentMethod} payment...`);

      // Simulate other payment processing
      setTimeout(() => {
        setLoading(false);
        alert(`${paymentMethod} integration would be handled here`);
        setMessage('');
      }, 2000);
    }
  };

  return (
    <div className="page-content">
      <div className="container">
        <div className="page-header">
          <h1>Special Airtime Offers</h1>
          <p>Get the best value with our exclusive airtime deals and promotions</p>
        </div>

        {message && (
          <div className={`message ${message.includes('Error') || message.includes('failed') ? 'error' : 'info'}`}>
            {message}
          </div>
        )}

        <div className="offers-grid">
          {offers.map(offer => (
            <div key={offer.id} className="offer-card">
              <div className="offer-header">
                <h3>{offer.name}</h3>
              </div>
              <div className="offer-body">
                <div className="offer-price">KES{offer.price}</div>
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

        <div className="page-header">
          <h2>Network Specific Offers</h2>
          <p>Special deals tailored for your mobile network</p>
        </div>

        <div className="offers-grid">
          {networkOffers.map(offer => (
            <div key={offer.id} className="offer-card">
              <div className="offer-header" style={{ background: offer.color }}>
                <h3>{offer.name}</h3>
              </div>
              <div className="offer-body">
                <div className="offer-price">KES{offer.price}</div>
                <p>{offer.description}</p>
                <button
                  className="btn btn-outline"
                  style={{ width: '100%', marginTop: '20px' }}
                  onClick={() => setSelectedOffer(offer)}
                  disabled={!paystackLoaded}
                >
                  {paystackLoaded ? 'View Details' : 'Loading...'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedOffer && (
          <div className="purchase-modal">
            <div className="modal-content">
              <h2>Purchase {selectedOffer.name}</h2>
              <p>Price: KES{selectedOffer.price}</p>

              {selectedOffer.description && <p>{selectedOffer.description}</p>}

              <div className="form-group">
                <label htmlFor="phone">Your Phone Number To Top-Up</label>
                <input
                  type="tel"
                  id="phone"
                  className="form-control"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Payment Method</label>
                <div className="payment-options">
                  <div
                    className={`payment-option ${paymentMethod === 'paystack' ? 'selected' : ''}`}
                    onClick={() => !loading && setPaymentMethod('paystack')}
                  >
                    <i className="fas fa-credit-card"></i>
                    <span>Paystack</span>
                  </div>
                  {/*<div
                    className={`payment-option ${paymentMethod === 'mpesa' ? 'selected' : ''}`}
                    onClick={() => !loading && setPaymentMethod('mpesa')}
                  >
                    <i className="fas fa-mobile-alt"></i>
                    <span>M-Pesa</span>
                  </div>
                  <div
                    className={`payment-option ${paymentMethod === 'paypal' ? 'selected' : ''}`}
                    onClick={() => !loading && setPaymentMethod('paypal')}
                  >
                    <i className="fab fa-paypal"></i>
                    <span>PayPal</span>
                  </div>*/}
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setSelectedOffer(null);
                    setPhoneNumber('');
                    setPaymentMethod('');
                    setMessage('');
                  }}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handlePurchase}
                  disabled={loading || !phoneNumber || !paymentMethod}
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