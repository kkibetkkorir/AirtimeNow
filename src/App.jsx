// App.jsx
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Support from './pages/Support';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

// Import the new pages
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import FAQ from './pages/FAQ';
import './App.css';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTb8_n1CEzFV2uFV-diOZZEINxqbuR60U",
  authDomain: "airtimehub-26299.firebaseapp.com",
  projectId: "airtimehub-26299",
  storageBucket: "airtimehub-26299.firebasestorage.app",
  messagingSenderId: "984720555167",
  appId: "1:984720555167:web:ac565eedb5e5a012a276aa",
  measurementId: "G-77DZ5LN2Q7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUser({
              ...firebaseUser,
              userData: userDoc.data()
            });
          } else {
            // Create a basic user document if it doesn't exist
            const userData = {
              email: firebaseUser.email,
              role: 'user',
              createdAt: new Date()
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), userData);
            setUser({
              ...firebaseUser,
              userData
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(firebaseUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const updateUserData = async (userId) => {
    if (!userId) return;

    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        setUser(prevUser => ({
          ...prevUser,
          userData: userDoc.data()
        }));
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'offers':
        return <Offers user={user} db={db} updateUserData={updateUserData} />;
      case 'support':
        return <Support />;
      case 'contact':
        return <Contact />;
        case 'auth':
          return <Auth auth={auth} db={db} setCurrentPage={setCurrentPage} setUser={setUser} updateUserData={updateUserData} />;
        case 'profile':
          return <Profile user={user} db={db} updateUserData={updateUserData} />;
        case 'admin':
          return <AdminDashboard user={user} db={db} />;
        case 'terms':
          return <TermsOfService />;
        case 'privacy':
          return <PrivacyPolicy />;
        case 'refund':
          return <RefundPolicy />;
        case 'faq':
          return <FAQ />;
      default:
        return <Home />;
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <Header
        user={user}
        currentPage={currentPage}
        handleNavigation={handleNavigation}
        auth={auth}
        setUser={setUser}
      />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer handleNavigation={handleNavigation} />
    </div>
  );
}

export default App;