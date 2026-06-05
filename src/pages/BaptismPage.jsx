import React, { useState } from 'react';
import './BaptismPage.css';

const API_URL = 'https://localhost:7234/api';

const BaptismPage = () => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    preferredDate: '',
    notes: '',
    requestCertificate: false
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Hero section style with background image
  const heroStyle = {
    backgroundImage: 'url("/baptism.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

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
      const response = await fetch(`${API_URL}/baptism/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage('✓ Baptism request submitted! Admin will review and contact you.');
        setMessageType('success');
        setShowRequestForm(false);
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          preferredDate: '',
          notes: '',
          requestCertificate: false
        });
        setTimeout(() => setMessage(''), 5000);
      } else {
        const error = await response.json();
        setMessage(error.message || 'Error submitting request');
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
      {/* Hero Section with Baptism Image */}
      <div className="baptism-hero" style={heroStyle}>
        <div className="baptism-hero-overlay"></div>
        <div className="baptism-hero-content">
          <h1>Baptism Registration</h1>
          <p>Make a public declaration of your faith in Jesus Christ</p>
        </div>
      </div>

      <div className="container">
        <div className="baptism-info-card">
          <div className="info-icon">💧</div>
          <h2>What is Baptism?</h2>
          <p>Baptism is a public declaration of your faith in Jesus Christ. It symbolizes dying to your old life and being raised to new life in Christ.</p>
          <p className="bible-verse">"Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit." — Matthew 28:19</p>
        </div>

        {!showRequestForm ? (
          <div className="text-center">
            <button onClick={() => setShowRequestForm(true)} className="request-btn">
               Request Baptism
            </button>
          </div>
        ) : (
          <div className="form-card">
            <h3>Request Baptism</h3>
            <form onSubmit={handleSubmit}>
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
                <label>Preferred Baptism Date *</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="form-input"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="form-group">
                <label>Additional Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="3"
                  placeholder="Any special requests or information..."
                />
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="requestCertificate"
                    checked={formData.requestCertificate}
                    onChange={handleChange}
                  />
                  I would like to receive a baptism certificate after my baptism
                </label>
              </div>
              {message && <div className={`message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>{message}</div>}
              <div className="button-group">
                <button type="submit" disabled={submitting} className="submit-btn">
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
                <button type="button" onClick={() => setShowRequestForm(false)} className="btn-secondary-cancel">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BaptismPage;