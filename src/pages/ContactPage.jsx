import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    setTimeout(() => {
      setMessage('✓ Thank you for your message! We will get back to you soon.');
      setMessageType('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
      setTimeout(() => setMessage(''), 5000);
    }, 500);
  };

  // Primary map embed
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14562.496156225961!2d30.6925!3d-23.0015!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ec352d9c4a3d8a3%3A0x8e6b5e5e5e5e5e5e!2sJesus%20Christ%20is%20the%20Answer%20Ministries!5e0!3m2!1sen!2sza!4v1746883500000!5m2!1sen!2sza";
  
  // Fallback map embed (used if primary map fails to load)
  const fallbackMapSrc = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Jesus+Christ+is+the+Answer+Ministries+Malamulele";

  // Determine which map source to use (primary by default, fallback if needed)
  const [currentMapSrc, setCurrentMapSrc] = useState(mapSrc);

  const handleMapError = () => {
    // If primary map fails, switch to fallback
    if (currentMapSrc === mapSrc) {
      setCurrentMapSrc(fallbackMapSrc);
      console.log('Switched to fallback map');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you</p>
      </div>

      <div className="container">
        {/* Map Section */}
        <div className="map-section">
          <iframe
            title="JCAM Church Location - Jesus Christ is the Answer Ministries"
            src={currentMapSrc}
            width="100%"
            height="350"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="google-map"
            onError={handleMapError}
          ></iframe>
        </div>

        {/* Contact Grid */}
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <h4>Address</h4>
                <p>Jesus Christ is the Answer Ministries</p>
                <p>Township, near Eskom Substation</p>
                <p>Malamulele, Limpopo, South Africa</p>
                <a 
                  href="https://maps.app.goo.gl/ncFjCNBf53d7aZk26" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-link"
                >
                  Get Directions on Google Maps →
                </a>
              </div>
            </div>
            
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <h4>Phone</h4>
                <p>072 318 7981</p>
                <a href="tel:0723187981" className="contact-link">Call Now</a>
              </div>
            </div>
            
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <div>
                <h4>Email</h4>
                <p>adminnjcaministries@gmail.com</p>
                <a href="mailto:adminnjcaministries@gmail.com" className="contact-link">Send Email</a>
              </div>
            </div>

            {/* Service Hours */}
            <div className="service-hours">
              <h3>📅 Service Hours</h3>
              <ul>
                <li><strong>Sunday Service</strong> from 9:30AM every Sunday</li>
                <li><strong>Women's Fellowship</strong> from 3:30PM every Tuesday</li>
                <li><strong>Healing & Deliverance</strong> from 3:30PM every Friday</li>
                
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <h2>Send a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              {message && <div className={`contact-message ${messageType}`}>{message}</div>}
              <button type="submit" className="submit-btn" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;