// pages/Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div className="page-content">
      <div className="hero">
        <div className="container">
          <h1>Instant Airtime Top-Up, Anytime, Anywhere</h1>
          <p>Buy airtime for all networks at competitive rates and enjoy instant delivery directly to your phone</p>
          <a href="#" className="btn btn-primary">Get Started Now</a>
        </div>
      </div>

      <div className="features">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose AirtimeHub</h2>
            <p>We provide the fastest, most reliable airtime top-up service with exceptional customer support</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <h3>Instant Delivery</h3>
              <p>Receive your airtime instantly, 24/7, even on weekends and public holidays.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Secure Payments</h3>
              <p>All transactions are encrypted and secure with multiple payment options.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-percentage"></i>
              </div>
              <h3>Best Rates</h3>
              <p>Enjoy competitive rates and occasional bonus airtime on selected networks.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <div className="container">
          <div className="section-title">
            <h2>How It Works</h2>
            <p>Getting airtime has never been easier. Just follow these simple steps</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create Account</h3>
              <p>Sign up for a free account in less than a minute</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Select Amount</h3>
              <p>Choose your network and enter the amount you want</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Make Payment</h3>
              <p>Pay securely with your preferred payment method</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Receive Airtime</h3>
              <p>Get your airtime instantly delivered to your phone</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;