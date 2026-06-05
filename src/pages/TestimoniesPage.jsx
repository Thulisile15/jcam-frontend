import React, { useState } from 'react';
import API_URL from '../config/api';
import './TestimoniesPage.css';

const TestimoniesPage = ({ loggedIn }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    email: '',
    submitterName: ''
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Hero section style with background image - OPTIMIZED
  const heroStyle = {
    backgroundImage: 'url("/testimonies.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center 35%',
    backgroundRepeat: 'no-repeat',
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    
    const previews = files.map(file => {
      if (file.type.startsWith('image/')) {
        return URL.createObjectURL(file);
      }
      return null;
    });
    setFilePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    const formDataToSend = new FormData();
    formDataToSend.append('Title', formData.title);
    formDataToSend.append('Content', formData.content);
    formDataToSend.append('Email', formData.email);
    formDataToSend.append('SubmitterName', formData.submitterName);
    
    selectedFiles.forEach(file => {
      formDataToSend.append('files', file);
    });

    try {
      const response = await fetch(`${API_URL}/testimonies`, {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        setMessage('✓ Testimony submitted successfully! Pending approval.');
        setMessageType('success');
        // Reset form
        setFormData({ title: '', content: '', email: '', submitterName: '' });
        setSelectedFiles([]);
        setFilePreviews([]);
        setTimeout(() => setMessage(''), 5000);
      } else {
        const error = await response.json();
        setMessage(error.message || 'Error submitting testimony');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error connecting to server');
      setMessageType('error');
    } finally {
      setSubmitting(false);
    }
  };

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = filePreviews.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setFilePreviews(newPreviews);
  };

  return (
    <div className="page-container">
      {/* Hero Section with Testimonies Image */}
      <div className="testimonies-hero" style={heroStyle}>
        <div className="testimonies-hero-overlay"></div>
        <div className="testimonies-hero-content">
          <h1>Testimonies</h1>
          <p>Share what God has done in your life</p>
        </div>
      </div>

      <div className="container">
        <div className="form-card">
          <h3>Share Your Testimony</h3>
          <form onSubmit={handleSubmit}>
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
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Your Testimony *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="form-textarea"
                rows="6"
                required
              />
            </div>
            <div className="form-group">
              <label>Upload Photos/Documents (Optional)</label>
              <div className="file-upload-area">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="file-input"
                  accept="image/*,.pdf,.doc,.docx"
                  multiple
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="file-upload-label">📎 Click to upload files</label>
                <p className="file-hint">Supported: JPG, PNG, GIF, PDF, DOC (Max 10MB each)</p>
              </div>
              {selectedFiles.length > 0 && (
                <div className="file-list">
                  <h4>Selected Files ({selectedFiles.length})</h4>
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="file-item">
                      {file.type.startsWith('image/') ? (
                        <div className="file-preview-image">
                          <img src={filePreviews[index]} alt="Preview" />
                        </div>
                      ) : (
                        <div className="file-preview-doc">📄</div>
                      )}
                      <div className="file-info">
                        <span className="file-name">{file.name}</span>
                        <span className="file-size">({(file.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <button type="button" onClick={() => removeFile(index)} className="remove-file-btn">✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {message && <div className={`message ${messageType}`}>{message}</div>}
            <div className="button-group">
              <button type="submit" disabled={submitting} className="submit-btn">
                {submitting ? 'Submitting...' : 'Submit Testimony'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestimoniesPage;