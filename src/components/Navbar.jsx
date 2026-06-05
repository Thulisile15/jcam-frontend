import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ activePage, setActivePage, isAdminLoggedIn, setIsAdminLoggedIn }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'services', label: 'SERVICES' },
    { id: 'events', label: 'EVENTS' },
    { id: 'media', label: 'MEDIA' },
    { id: 'testimonies', label: 'TESTIMONIES' },
    { id: 'prayer', label: 'PRAYERS' },
    { id: 'counselling', label: 'COUNSELLING' },
    { id: 'baptism', label: 'BAPTISM' },
    { id: 'donations', label: 'GIVE' },
    { id: 'contact', label: 'CONTACT' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setIsMobileMenuOpen(false);
  };

  const handleAdminLogin = async () => {
    try {
      const response = await fetch('https://localhost:7234/api/Admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword })
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('adminLoggedIn', 'true');
          setIsAdminLoggedIn(true);
          setShowAdminLogin(false);
          setAdminPassword('');
          handleNavClick('admin');
        } else {
          alert('Invalid password');
        }
      } else {
        alert('Login failed');
      }
    } catch (error) {
      alert('Error connecting to server');
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsAdminLoggedIn(false);
    handleNavClick('home');
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo-section">
            <img 
              src="/logo.png.jpeg" 
              alt="JCAM Logo" 
              className="logo" 
              onClick={() => handleNavClick('home')}
            />
          </div>
          
          <button className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            ☰
          </button>
          
          <div className="nav-links">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`nav-link ${activePage === link.id ? 'nav-link-active' : ''}`}
              >
                {link.label}
              </button>
            ))}
          </div>
          
          <div className="right-section">
            {isAdminLoggedIn ? (
              <>
                <button
                  onClick={() => handleNavClick('admin')}
                  className="nav-link admin-nav-link"
                >
                  👑 ADMIN
                </button>
                <button onClick={handleAdminLogout} className="admin-login-btn">
                  LOGOUT
                </button>
              </>
            ) : null}
          </div>
        </div>
      </nav>

      {/* Spacer div to prevent content from hiding under navbar */}
      <div className="navbar-spacer"></div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        {navLinks.map(link => (
          <button
            key={link.id}
            onClick={() => handleNavClick(link.id)}
            className={`mobile-nav-link ${activePage === link.id ? 'mobile-nav-link-active' : ''}`}
          >
            {link.label}
          </button>
        ))}
        {isAdminLoggedIn ? (
          <>
            <button
              onClick={() => handleNavClick('admin')}
              className="mobile-nav-link mobile-admin-link"
            >
              👑 ADMIN DASHBOARD
            </button>
            <button onClick={handleAdminLogout} className="mobile-nav-link mobile-admin-link">
              LOGOUT
            </button>
          </>
        ) : null}
      </div>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="modal-overlay" onClick={() => setShowAdminLogin(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Admin Login</h3>
            <input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="form-input"
              onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
            />
            <div className="modal-buttons">
              <button onClick={handleAdminLogin} className="save-btn">Login</button>
              <button onClick={() => setShowAdminLogin(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;