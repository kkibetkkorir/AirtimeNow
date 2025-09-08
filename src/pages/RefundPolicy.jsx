// pages/RefundPolicy.jsx
import React from 'react';
import './LegalPages.css';

const RefundPolicy = () => {
  return (
    <div className="page-content">
      <div className="container">
        <div className="page-header">
          <h1>Refund Policy</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="legal-content">
          <div className="legal-section">
            <h2>1. General Refund Policy</h2>
            <p>Due to the digital nature of our services, all sales of airtime are final. Once airtime has been purchased and delivered to your mobile device, we cannot issue a refund. However, we understand that exceptional circumstances can occur, and we will review each case individually.</p>
          </div>

          <div className="legal-section">
            <h2>2. Eligibility for Refund</h2>
            <p>You may be eligible for a refund only in the following circumstances:</p>
            <ul>
              <li>If the airtime was not delivered to your mobile number due to a technical error on our part.</li>
              <li>If you were charged multiple times for a single transaction.</li>
              <li>If the wrong amount of airtime was delivered due to an error on our system.</li>
            </ul>
            <p>Refunds are not available for:</p>
            <ul>
              <li>Change of mind or accidental purchases.</li>
              <li>Incorrect mobile number entered by the customer.</li>
              <li>Network issues on the recipient's mobile provider side.</li>
              <li>Airtime that has already been used.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>3. Refund Process</h2>
            <p>To request a refund, please contact our customer support team within 24 hours of the transaction. You will need to provide:</p>
            <ul>
              <li>Your registered email address</li>
              <li>The mobile number that received the airtime</li>
              <li>The transaction ID or receipt number</li>
              <li>The date and time of the transaction</li>
              <li>The amount of the transaction</li>
              <li>A detailed explanation of why you are requesting a refund</li>
            </ul>
            <p>Our team will review your request and respond within 3-5 business days. If your refund is approved, it will be processed, and a credit will automatically be applied to your original method of payment within 7-10 business days.</p>
          </div>

          <div className="legal-section">
            <h2>4. Processing Time</h2>
            <p>Once approved, refunds may take 7-10 business days to appear on your account, depending on your financial institution's processing times.</p>
          </div>

          <div className="legal-section">
            <h2>5. Contact Information</h2>
            <p>For any questions about our refund policy or to request a refund, please contact us at support@airtimehub.com.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;