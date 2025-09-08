// components/Header.jsx
import React from 'react';
import { signOut } from 'firebase/auth';

const Header = ({ user, currentPage, handleNavigation, auth, setUser }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      if (setUser) {
        setUser(null);
      }
      handleNavigation('home');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header>
      <div className="container">
        <nav className="navbar">
          <a href="#" className="logo" onClick={() => handleNavigation('home')}>
            <i className="fas fa-mobile-alt"></i> AirtimeHub
          </a>
          <ul className="nav-links">
            <li><a
              href="#"
              className={currentPage === 'home' ? 'active' : ''}
              onClick={() => handleNavigation('home')}
            >Home</a></li>
            <li><a
              href="#"
              className={currentPage === 'offers' ? 'active' : ''}
              onClick={() => handleNavigation('offers')}
            >Offers</a></li>
            <li><a
              href="#"
              className={currentPage === 'support' ? 'active' : ''}
              onClick={() => handleNavigation('support')}
            >Support</a></li>
            <li><a
              href="#"
              className={currentPage === 'contact' ? 'active' : ''}
              onClick={() => handleNavigation('contact')}
            >Contact</a></li>
          </ul>
          <div className="auth-buttons">
            {user ? (
              <>
                <a href="#" className="btn btn-outline" onClick={() => handleNavigation('profile')}>
                  Profile
                </a>
                {user.userData && user.userData.role === 'admin' && (
                  <a href="#" className="btn btn-outline" onClick={() => handleNavigation('admin')}>
                    Admin
                  </a>
                )}
                <a href="#" className="btn btn-primary" onClick={handleLogout}>
                  Logout
                </a>
              </>
            ) : (
              <>
                <a href="#" className="btn btn-outline" onClick={() => handleNavigation('auth')}>
                  Login
                </a>
                <a href="#" className="btn btn-primary" onClick={() => handleNavigation('auth')}>
                  Register
                </a>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;