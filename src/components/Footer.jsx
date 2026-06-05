import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = ({ setActivePage, setIsAdminLoggedIn }) => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

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
          if (setIsAdminLoggedIn) setIsAdminLoggedIn(true);
          setShowAdminLogin(false);
          setAdminPassword('');
          setActivePage('admin');
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

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>JCAM Ministries</h3>
            <p>Jesus Christ Is The Answer Ministries</p>
            <p>Mark 12:28</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <button onClick={() => setActivePage('home')} className="footer-link">Home</button>
            <button onClick={() => setActivePage('events')} className="footer-link">Events</button>
            <button onClick={() => setActivePage('testimonies')} className="footer-link">Testimonies</button>
            <button onClick={() => setActivePage('prayer')} className="footer-link">Prayer Requests</button>
          </div>
          <div className="footer-section">
            <h3>Connect With Us</h3>
            <div className="social-links">
              <a href="https://www.facebook.com/jcamministries" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaFacebook size={24} /> Facebook
              </a>
              <a href="https://www.instagram.com/jcam.ministries/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaInstagram size={24} /> Instagram
              </a>
              <a href="https://www.youtube.com/@jcamministries" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaYoutube size={24} /> YouTube
              </a>
              <a href="https://www.tiktok.com/@jcamministries" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaYoutube size={24} /> TikTok
              </a>

            </div>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>📍 007 Excel View, Malamulele</p>
            <p>📞 072 318 7981</p>
            <p>✉️ jesuschrististheanswerministri@gmail.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 JCAM - Jesus Christ Is The Answer Ministries</p>
        </div>
        
        {/* Hidden Admin Link - Double click to reveal admin login */}
        <div 
          onDoubleClick={() => setShowAdminLogin(true)} 
          style={{ 
            textAlign: 'center', 
            opacity: 0.1, 
            fontSize: '10px', 
            cursor: 'pointer',
            padding: '5px',
            marginTop: '10px'
          }}
          title="Admin Access (Double-click)"
        >
          🔒 Admin
        </div>
      </footer>

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

export default Footer;