import React, { useState, useEffect, useCallback } from 'react';
import './AdminPage.css';

const API_URL = 'https://localhost:7234/api';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('testimonies');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  
  const [events, setEvents] = useState([]);
  const [pendingTestimonies, setPendingTestimonies] = useState([]);
  const [allTestimonies, setAllTestimonies] = useState([]);
  const [pendingPrayers, setPendingPrayers] = useState([]);
  const [allPrayers, setAllPrayers] = useState([]);
  const [pendingBaptisms, setPendingBaptisms] = useState([]);
  const [pendingCounselling, setPendingCounselling] = useState([]);
  const [allCounselling, setAllCounselling] = useState([]);
  
  const [showEventForm, setShowEventForm] = useState(false);
  const [showApproveBaptismForm, setShowApproveBaptismForm] = useState(false);
  const [showApproveCounsellingForm, setShowApproveCounsellingForm] = useState(false);
  const [selectedBaptism, setSelectedBaptism] = useState(null);
  const [selectedCounselling, setSelectedCounselling] = useState(null);
  
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    eventDate: '',
    location: '',
    eventType: 'Service'
  });

  const [baptismApprovalForm, setBaptismApprovalForm] = useState({
    baptismDate: '',
    baptismLocation: '',
    baptismOfficiant: ''
  });

  const [counsellingApprovalForm, setCounsellingApprovalForm] = useState({
    scheduledDate: '',
    counsellorNotes: ''
  });

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/events`);
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, []);

  const fetchPendingTestimonies = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/testimonies/pending`);
      if (response.ok) {
        const data = await response.json();
        setPendingTestimonies(data);
      }
    } catch (error) {
      console.error('Error fetching pending testimonies:', error);
    }
  }, []);

  const fetchAllTestimonies = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/testimonies`);
      if (response.ok) {
        const data = await response.json();
        setAllTestimonies(data);
      }
    } catch (error) {
      console.error('Error fetching all testimonies:', error);
    }
  }, []);

  const fetchPendingPrayers = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/prayerrequests/pending`);
      if (response.ok) {
        const data = await response.json();
        setPendingPrayers(data);
      }
    } catch (error) {
      console.error('Error fetching pending prayers:', error);
    }
  }, []);

  const fetchAllPrayers = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/prayerrequests/all`);
      if (response.ok) {
        const data = await response.json();
        setAllPrayers(data);
      }
    } catch (error) {
      console.error('Error fetching all prayers:', error);
    }
  }, []);

  const fetchPendingBaptisms = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/baptism/pending`);
      if (response.ok) {
        const data = await response.json();
        setPendingBaptisms(data);
      }
    } catch (error) {
      console.error('Error fetching pending baptisms:', error);
    }
  }, []);

  const fetchPendingCounselling = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/counselling/pending`);
      if (response.ok) {
        const data = await response.json();
        setPendingCounselling(data);
      }
    } catch (error) {
      console.error('Error fetching pending counselling:', error);
    }
  }, []);

  const fetchAllCounselling = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/counselling/all`);
      if (response.ok) {
        const data = await response.json();
        setAllCounselling(data);
      }
    } catch (error) {
      console.error('Error fetching all counselling:', error);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchEvents(),
        fetchPendingTestimonies(),
        fetchAllTestimonies(),
        fetchPendingPrayers(),
        fetchAllPrayers(),
        fetchPendingBaptisms(),
        fetchPendingCounselling(),
        fetchAllCounselling()
      ]);
      setLoading(false);
    };
    loadData();
  }, [
    fetchEvents,
    fetchPendingTestimonies,
    fetchAllTestimonies,
    fetchPendingPrayers,
    fetchAllPrayers,
    fetchPendingBaptisms,
    fetchPendingCounselling,
    fetchAllCounselling
  ]);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const eventData = {
        title: eventForm.title,
        description: eventForm.description,
        eventDate: eventForm.eventDate,
        location: eventForm.location,
        eventType: eventForm.eventType,
        isActive: true
      };
      
      const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      });
      
      if (response.ok) {
        setMessage('✓ Event created successfully!');
        setMessageType('success');
        setShowEventForm(false);
        setEventForm({ title: '', description: '', eventDate: '', location: '', eventType: 'Service' });
        fetchEvents();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error creating event');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error connecting to server');
      setMessageType('error');
    }
  };

  const handleDeleteEvent = async (eventId, eventTitle) => {
    if (window.confirm(`Delete "${eventTitle}"?`)) {
      try {
        const response = await fetch(`${API_URL}/events/${eventId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setMessage(`✓ "${eventTitle}" deleted`);
          setMessageType('success');
          fetchEvents();
          setTimeout(() => setMessage(''), 3000);
        } else {
          setMessage('Error deleting event');
          setMessageType('error');
        }
      } catch (error) {
        setMessage('Error connecting to server');
        setMessageType('error');
      }
    }
  };

  const handleApproveTestimony = async (testimonyId) => {
    if (!testimonyId) {
      setMessage('Error: Invalid testimony ID');
      setMessageType('error');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/testimonies/${testimonyId}/approve`, {
        method: 'PUT'
      });
      if (response.ok) {
        setMessage('✓ Testimony approved!');
        setMessageType('success');
        fetchPendingTestimonies();
        fetchAllTestimonies();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error approving testimony');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error connecting to server');
      setMessageType('error');
    }
  };

  const handleMarkPrayerAsPrayed = async (prayerId) => {
    if (!prayerId) {
      setMessage('Error: Invalid prayer ID');
      setMessageType('error');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/prayerrequests/${prayerId}/mark-prayed`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify("Prayed for by admin")
      });
      if (response.ok) {
        setMessage('✓ Prayer marked as prayed for!');
        setMessageType('success');
        fetchPendingPrayers();
        fetchAllPrayers();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error marking prayer');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error connecting to server');
      setMessageType('error');
    }
  };

  const handleApproveBaptism = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch(`${API_URL}/baptism/${selectedBaptism?.id}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baptismDate: baptismApprovalForm.baptismDate,
          baptismLocation: baptismApprovalForm.baptismLocation,
          baptismOfficiant: baptismApprovalForm.baptismOfficiant
        })
      });
      if (response.ok) {
        setMessage('✓ Baptism approved!');
        setMessageType('success');
        setShowApproveBaptismForm(false);
        setSelectedBaptism(null);
        setBaptismApprovalForm({ baptismDate: '', baptismLocation: '', baptismOfficiant: '' });
        fetchPendingBaptisms();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error approving baptism');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error connecting to server');
      setMessageType('error');
    }
  };

  const handleApproveCounselling = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch(`${API_URL}/counselling/${selectedCounselling?.id}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scheduledDate: counsellingApprovalForm.scheduledDate })
      });
      if (response.ok) {
        setMessage('✓ Counselling session approved!');
        setMessageType('success');
        setShowApproveCounsellingForm(false);
        setSelectedCounselling(null);
        fetchPendingCounselling();
        fetchAllCounselling();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error approving counselling');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error connecting to server');
      setMessageType('error');
    }
  };

  const totalEvents = events.length;
  const totalTestimoniesCount = allTestimonies.length;
  const totalPrayersCount = allPrayers.length;
  const totalPendingTestimonies = pendingTestimonies.length;
  const totalPendingPrayers = pendingPrayers.length;
  const totalPendingBaptisms = pendingBaptisms.length;
  const totalPendingCounselling = pendingCounselling.length;

  if (loading) {
    return <div className="admin-container"><div className="loading">Loading Admin Dashboard...</div></div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage testimonies, prayer requests, baptisms, counselling sessions, and events</p>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card" onClick={() => setActiveTab('testimonies')}>
          <div className="stat-icon">✝️</div>
          <div className="stat-info">
            <h3>Pending Testimonies</h3>
            <p className="stat-number">{totalPendingTestimonies}</p>
          </div>
        </div>
        <div className="admin-stat-card" onClick={() => setActiveTab('prayers')}>
          <div className="stat-icon">🙏</div>
          <div className="stat-info">
            <h3>Pending Prayers</h3>
            <p className="stat-number">{totalPendingPrayers}</p>
          </div>
        </div>
        <div className="admin-stat-card" onClick={() => setActiveTab('baptisms')}>
          <div className="stat-icon">💧</div>
          <div className="stat-info">
            <h3>Pending Baptisms</h3>
            <p className="stat-number">{totalPendingBaptisms}</p>
          </div>
        </div>
        <div className="admin-stat-card" onClick={() => setActiveTab('counselling')}>
          <div className="stat-icon">💬</div>
          <div className="stat-info">
            <h3>Pending Counselling</h3>
            <p className="stat-number">{totalPendingCounselling}</p>
          </div>
        </div>
        <div className="admin-stat-card" onClick={() => setActiveTab('events')}>
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>Upcoming Events</h3>
            <p className="stat-number">{totalEvents}</p>
          </div>
        </div>
      </div>

      <div className="admin-tabs">
        <button className={`admin-tab ${activeTab === 'testimonies' ? 'active' : ''}`} onClick={() => setActiveTab('testimonies')}>✝️ Testimonies</button>
        <button className={`admin-tab ${activeTab === 'prayers' ? 'active' : ''}`} onClick={() => setActiveTab('prayers')}>🙏 Prayer Requests</button>
        <button className={`admin-tab ${activeTab === 'baptisms' ? 'active' : ''}`} onClick={() => setActiveTab('baptisms')}>💧 Baptisms</button>
        <button className={`admin-tab ${activeTab === 'counselling' ? 'active' : ''}`} onClick={() => setActiveTab('counselling')}>💬 Counselling</button>
        <button className={`admin-tab ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')}>📅 Events</button>
      </div>

      {message && <div className={`admin-message ${messageType}`}>{message}</div>}

      {/* TESTIMONIES TAB */}
      {activeTab === 'testimonies' && (
        <div className="admin-section">
          <div className="section-header">
            <h2>Testimonies Management</h2>
            <span>Total: {totalTestimoniesCount} | Pending: {totalPendingTestimonies}</span>
          </div>
          {pendingTestimonies.length === 0 ? (
            <p className="no-data">✅ No pending testimonies. All testimonies have been approved.</p>
          ) : (
            <div className="pending-list">
              {pendingTestimonies.map((t, index) => (
                <div key={t.id || index} className="pending-card">
                  <h3>{t.title}</h3>
                  <p>{t.content}</p>
                  <div className="pending-meta">
                    <span>📧 {t.email || 'No email provided'}</span>
                    <span>👤 {t.submitterName || 'Anonymous'}</span>
                    <span>📅 {new Date(t.submittedAt).toLocaleDateString()}</span>
                  </div>
                  <button className="approve-btn" onClick={() => handleApproveTestimony(t.id)}>✓ Approve Testimony</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PRAYER REQUESTS TAB */}
      {activeTab === 'prayers' && (
        <div className="admin-section">
          <div className="section-header">
            <h2>Prayer Requests Management</h2>
            <span>Total: {totalPrayersCount} | Pending: {totalPendingPrayers}</span>
          </div>
          {pendingPrayers.length === 0 ? (
            <p className="no-data">✅ No pending prayer requests. All prayers have been answered.</p>
          ) : (
            <div className="pending-list">
              {pendingPrayers.map((p, index) => (
                <div key={p.id || index} className="pending-card prayer-card">
                  <p className="prayer-text">"{p.prayerRequestText}"</p>
                  <div className="pending-meta">
                    <span>📧 {p.email || 'No email provided'}</span>
                    <span>👤 {p.isAnonymous ? 'Anonymous' : p.submitterName || 'Anonymous'}</span>
                    <span>📅 {new Date(p.submittedAt).toLocaleDateString()}</span>
                  </div>
                  <button className="pray-btn" onClick={() => handleMarkPrayerAsPrayed(p.id)}>🙏 Mark as Prayed</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* BAPTISMS TAB */}
      {activeTab === 'baptisms' && (
        <div className="admin-section">
          <h2>Pending Baptism Requests</h2>
          {pendingBaptisms.length === 0 ? (
            <p className="no-data">✅ No pending baptism requests.</p>
          ) : (
            <div className="pending-list">
              {pendingBaptisms.map((b, index) => (
                <div key={b.id || index} className="pending-card">
                  <h3>{b.fullName}</h3>
                  <p><strong>Preferred Date:</strong> {new Date(b.preferredDate).toLocaleDateString()}</p>
                  <div className="pending-meta">
                    <span>📧 {b.email || 'No email provided'}</span>
                    <span>📞 {b.phoneNumber || 'No phone provided'}</span>
                  </div>
                  {b.notes && <p><strong>Notes:</strong> {b.notes}</p>}
                  {b.requestCertificate && <p className="certificate-request">📄 Certificate requested</p>}
                  <button className="approve-btn" onClick={() => { setSelectedBaptism(b); setShowApproveBaptismForm(true); }}>✓ Approve & Schedule</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Approve Baptism Modal */}
      {showApproveBaptismForm && selectedBaptism && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Approve Baptism for {selectedBaptism.fullName}</h3>
            <form onSubmit={handleApproveBaptism}>
              <div className="form-group"><label>Baptism Date *</label><input type="date" className="form-input" value={baptismApprovalForm.baptismDate} onChange={(e) => setBaptismApprovalForm({...baptismApprovalForm, baptismDate: e.target.value})} required /></div>
              <div className="form-group"><label>Location *</label><input type="text" className="form-input" value={baptismApprovalForm.baptismLocation} onChange={(e) => setBaptismApprovalForm({...baptismApprovalForm, baptismLocation: e.target.value})} placeholder="JCAM Main Sanctuary" required /></div>
              <div className="form-group"><label>Officiant (Pastor) *</label><input type="text" className="form-input" value={baptismApprovalForm.baptismOfficiant} onChange={(e) => setBaptismApprovalForm({...baptismApprovalForm, baptismOfficiant: e.target.value})} placeholder="Pastor's name" required /></div>
              <div className="modal-buttons"><button type="submit" className="save-btn">Approve Baptism</button><button type="button" className="cancel-btn" onClick={() => { setShowApproveBaptismForm(false); setSelectedBaptism(null); }}>Cancel</button></div>
            </form>
          </div>
        </div>
      )}

      {/* COUNSELLING TAB */}
      {activeTab === 'counselling' && (
        <div className="admin-section">
          <div className="section-header">
            <h2>Counselling Management</h2>
            <span>Total: {allCounselling.length} | Pending: {pendingCounselling.length}</span>
          </div>
          {pendingCounselling.length === 0 ? (
            <p className="no-data">✅ No pending counselling requests.</p>
          ) : (
            <div className="pending-list">
              {pendingCounselling.map((c, index) => (
                <div key={c.id || index} className="pending-card counselling-card">
                  <h3>Request from: {c.fullName}</h3>
                  <p><strong>Requested:</strong> {new Date(c.requestedDate).toLocaleDateString()}</p>
                  {c.preferredDate && <p><strong>Preferred Date:</strong> {new Date(c.preferredDate).toLocaleDateString()}</p>}
                  <div className="pending-meta">
                    <span>📧 {c.email || 'No email provided'}</span>
                    <span>📞 {c.phoneNumber || 'No phone provided'}</span>
                  </div>
                  <p><strong>Notes:</strong> {c.notes || 'No notes provided'}</p>
                  <button className="approve-btn" onClick={() => { setSelectedCounselling(c); setShowApproveCounsellingForm(true); }}>✓ Approve Session</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Approve Counselling Modal */}
      {showApproveCounsellingForm && selectedCounselling && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Approve Counselling for {selectedCounselling.fullName}</h3>
            <form onSubmit={handleApproveCounselling}>
              <div className="form-group"><label>Scheduled Date & Time *</label><input type="datetime-local" className="form-input" value={counsellingApprovalForm.scheduledDate} onChange={(e) => setCounsellingApprovalForm({...counsellingApprovalForm, scheduledDate: e.target.value})} required /></div>
              <div className="form-group"><label>Counsellor Notes (Optional)</label><textarea className="form-textarea" value={counsellingApprovalForm.counsellorNotes} onChange={(e) => setCounsellingApprovalForm({...counsellingApprovalForm, counsellorNotes: e.target.value})} rows="3" /></div>
              <div className="modal-buttons"><button type="submit" className="save-btn">Approve Session</button><button type="button" className="cancel-btn" onClick={() => { setShowApproveCounsellingForm(false); setSelectedCounselling(null); }}>Cancel</button></div>
            </form>
          </div>
        </div>
      )}

      {/* EVENTS TAB */}
      {activeTab === 'events' && (
        <div className="admin-section">
          <div className="section-header">
            <h2>Events Management</h2>
            <button className="add-btn" onClick={() => setShowEventForm(true)}>+ Create Event</button>
          </div>

          {showEventForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Create Event</h3>
                <form onSubmit={handleCreateEvent}>
                  <div className="form-grid">
                    <input type="text" placeholder="Title *" value={eventForm.title} onChange={(e) => setEventForm({...eventForm, title: e.target.value})} required />
                    <textarea placeholder="Description" value={eventForm.description} onChange={(e) => setEventForm({...eventForm, description: e.target.value})} required />
                    <input type="date" placeholder="Date *" value={eventForm.eventDate} onChange={(e) => setEventForm({...eventForm, eventDate: e.target.value})} required />
                    <input type="text" placeholder="Location *" value={eventForm.location} onChange={(e) => setEventForm({...eventForm, location: e.target.value})} required />
                    <select value={eventForm.eventType} onChange={(e) => setEventForm({...eventForm, eventType: e.target.value})}>
                      <option value="Service">Service</option>
                      <option value="Prayer">Prayer Meeting</option>
                      <option value="Fellowship">Fellowship</option>
                      <option value="Outreach">Outreach</option>
                      <option value="Special">Special Event</option>
                    </select>
                  </div>
                  <div className="modal-buttons">
                    <button type="submit" className="save-btn">Create Event</button>
                    <button type="button" className="cancel-btn" onClick={() => setShowEventForm(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="events-list">
            {events.length === 0 ? (
              <p className="no-data">No events. Create one using the button above.</p>
            ) : (
              events.map((event) => (
                <div key={event.id} className="event-card">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="event-meta">
                    <span>📅 {new Date(event.eventDate).toLocaleDateString()}</span>
                    <span>📍 {event.location}</span>
                    <span>📌 {event.eventType || 'Service'}</span>
                  </div>
                  <button className="delete-event-btn" onClick={() => handleDeleteEvent(event.id, event.title)}>🗑️ Delete</button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;