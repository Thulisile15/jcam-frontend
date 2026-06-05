import React, { useState } from 'react';
import './PrayerPage.css';

const PrayerPage = () => {
  const [formData, setFormData] = useState({
    prayerRequestText: '',
    isAnonymous: false,
    email: '',
    submitterName: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const response = await fetch(`https://localhost:7234/api/prayerrequests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage('✓ Prayer request submitted! Our team will pray for you.');
        setMessageType('success');
        setIsSubmitted(true);
        setFormData({
          prayerRequestText: '',
          isAnonymous: false,
          email: '',
          submitterName: ''
        });
        setTimeout(() => {
          setIsSubmitted(false);
          setMessage('');
        }, 5000);
      } else {
        const error = await response.json();
        setMessage(error.message || 'Error submitting prayer request');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error connecting to server');
      setMessageType('error');
    } finally {
      setSubmitting(false);
    }
  };

  // Hero image style - fixed to not overlap content
  const heroStyle = {
    backgroundImage: 'url("/prayerline.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="page-container">
      {/* Hero Section with Image - Now properly separated */}
      <div className="prayer-hero" style={heroStyle}>
        <div className="prayer-hero-overlay"></div>
        <div className="prayer-hero-content">
          <h1>Prayer Line</h1>
          <p>Write what you want God to do for you</p>
        </div>
      </div>

      <div className="container">
        <div className="prayer-section">
          <div className="prayer-card-main">
            <div className="prayer-icon-large"></div>
            <h2>Submit Your Prayer Request</h2>
            <p className="prayer-subtitle">Let us stand with you in prayer</p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="prayer-form">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    name="submitterName"
                    value={formData.submitterName}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>What would you like God to do for you? *</label>
                  <textarea
                    name="prayerRequestText"
                    value={formData.prayerRequestText}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="6"
                    placeholder="Write your prayer request here..."
                    required
                  />
                </div>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isAnonymous"
                    checked={formData.isAnonymous}
                    onChange={handleChange}
                  />
                  Submit anonymously (your name won't be shown)
                </label>
                {message && <div className={`message ${messageType}`}>{message}</div>}
                <button type="submit" disabled={submitting} className="submit-prayer-btn">
                  {submitting ? 'Submitting...' : 'Submit Prayer Request'}
                </button>
              </form>
            ) : (
              <div className="success-message-large">
                ✓ Prayer request submitted! Our admin team will be in touch with oyu.
              </div>
            )}
          </div>

          <div className="encouragement-section">
            <div className="verse-card">
              <div className="verse-icon">📖</div>
              <p className="verse-text">"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."</p>
              <p className="verse-ref">— Philippians 4:6</p>
            </div>
            <div className="promise-card">
              <div className="promise-icon">✨</div>
              <h3>We Believe in the Power of Prayer</h3>
              <p>Our admin team will get in touch with you. Every request is handled with confidentiality and love.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerPage;