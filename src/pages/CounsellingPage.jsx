import React, { useState } from 'react';
import './CounsellingPage.css';

const CounsellingPage = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    preferredDate: '',
    notes: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const response = await fetch(`https://localhost:7234/api/counselling`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage('✓ Counselling session requested! Our pastoral team will contact you within 24 hours.');
        setMessageType('success');
        setShowBookingForm(false);
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          preferredDate: '',
          notes: ''
        });
        setTimeout(() => setMessage(''), 5000);
      } else {
        const error = await response.json();
        setMessage(error.message || 'Error requesting counselling');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error connecting to server');
      setMessageType('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Counselling Services</h1>
        <p>We're here to support you</p>
      </div>

      <div className="container">
        <div className="booking-section">
          <div className="booking-header">
            <h2>Book a Counselling Session</h2>
            
          </div>

          {!showBookingForm ? (
            <div className="booking-prompt">
              <div className="booking-info-box">
                <div className="booking-icon">📅</div>
                <div className="booking-text">
                  <h3>Schedule a one-on-one session</h3>
                  <p></p>
                  <ul className="booking-features">
                    <li>✓ Confidential and private</li>
                    <li>✓ Faith-based guidance</li>
                    <li>✓ Available in-person or online</li>
                    <li>✓ Free of charge</li>
                  </ul>
                </div>
              </div>
              <button onClick={() => setShowBookingForm(true)} className="book-btn">
                Book a Session
              </button>
            </div>
          ) : (
            <div className="booking-form-container">
              <h3>Book Your Session</h3>
              <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
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
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Preferred Date (Optional)</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="form-input"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="form-group">
                  <label>What would you like to discuss? (Optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="4"
                    placeholder="Briefly describe what you'd like to talk about..."
                  />
                </div>
                {message && <div className={`message ${messageType}`}>{message}</div>}
                <div className="form-buttons">
                  <button type="submit" disabled={submitting} className="submit-booking-btn">
                    {submitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                  <button type="button" onClick={() => setShowBookingForm(false)} className="cancel-btn">Cancel</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CounsellingPage;