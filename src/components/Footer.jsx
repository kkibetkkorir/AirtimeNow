// components/Footer.jsx
import React from 'react';

const Footer = ({ handleNavigation }) => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>AirtimeHub</h3>
            <p>The leading airtime vendor with thousands of satisfied customers across the country.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className="footer-column wrapper">
            <div>
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#" onClick={() => handleNavigation('home')}>Home</a></li>
              <li><a href="#" onClick={() => handleNavigation('offers')}>Offers</a></li>
              <li><a href="#" onClick={() => handleNavigation('support')}>Support</a></li>
              <li><a href="#" onClick={() => handleNavigation('contact')}>Contact</a></li>
            </ul>
            </div>
            <div>
              <h3>Legal</h3>
              <ul className="footer-links">
              <li><a href="#" onClick={() => handleNavigation('terms')}>Terms of Service</a></li>
              <li><a href="#" onClick={() => handleNavigation('privacy')}>Privacy Policy</a></li>
              <li><a href="#" onClick={() => handleNavigation('refund')}>Refund Policy</a></li>
              <li><a href="#" onClick={() => handleNavigation('faq')}>FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul className="footer-links">
              <li><i className="fas fa-envelope"></i> support@airtimehub.biz</li>
              <li><i className="fas fa-phone"></i> +1 (234) 567-8900</li>
              <li><i className="fas fa-map-marker-alt"></i> 123 Moi Av, Nairobi, KE</li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2025 AirtimeHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;