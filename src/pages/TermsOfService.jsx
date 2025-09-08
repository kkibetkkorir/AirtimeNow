// pages/TermsOfService.jsx
import React from 'react';
import './LegalPages.css';

const TermsOfService = () => {
  return (
    <div className="page-content">
      <div className="container">
        <div className="page-header">
          <h1>Terms of Service</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="legal-content">
          <div className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using AirtimeHub services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.</p>
          </div>

          <div className="legal-section">
            <h2>2. Use License</h2>
            <p>Permission is granted to temporarily use AirtimeHub services for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul>
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose or for any public display;</li>
              <li>Attempt to reverse engineer any software contained on AirtimeHub;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>3. Account Registration</h2>
            <p>To access certain features of our service, you may be required to register for an account. You are responsible for maintaining the confidentiality of your account information, including your password, and for all activity that occurs under your account.</p>
          </div>

          <div className="legal-section">
            <h2>4. Service Usage</h2>
            <p>You agree to use AirtimeHub services only for lawful purposes and in accordance with these Terms. You agree not to use our services:</p>
            <ul>
              <li>In any way that violates any applicable national or international law or regulation;</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material;</li>
              <li>To impersonate or attempt to impersonate AirtimeHub, an employee, another user, or any other person or entity;</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the service.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>5. Pricing and Payments</h2>
            <p>All prices for airtime and related services are displayed on our platform. We reserve the right to change prices at any time. Payment must be made through one of our accepted payment methods. By providing payment information, you represent that you are authorized to use the payment method.</p>
          </div>

          <div className="legal-section">
            <h2>6. Limitation of Liability</h2>
            <p>In no event shall AirtimeHub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.</p>
          </div>

          <div className="legal-section">
            <h2>7. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
          </div>

          <div className="legal-section">
            <h2>8. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us at legal@airtimehub.com.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;