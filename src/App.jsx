import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import EventsPage from './pages/EventsPage';
import MediaPage from './pages/MediaPage';
import TestimoniesPage from './pages/TestimoniesPage';
import PrayerPage from './pages/PrayerPage';
import CounsellingPage from './pages/CounsellingPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import BaptismPage from './pages/BaptismPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

const API_URL = 'https://localhost:7234/api';

const getToken = () => localStorage.getItem('token');

function App() {
  // Auth state
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
  // Data state
  const [events, setEvents] = useState([]);
  const [testimonies, setTestimonies] = useState([]);
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [activePage, setActivePage] = useState('home');
  const [baptisms, setBaptisms] = useState([]);
  
  // Form state
  const [showTestimonyForm, setShowTestimonyForm] = useState(false);
  const [showPrayerForm, setShowPrayerForm] = useState(false);
  const [testimonyTitle, setTestimonyTitle] = useState('');
  const [testimonyContent, setTestimonyContent] = useState('');
  const [prayerText, setPrayerText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Check if user is Admin
  const isAdmin = user?.role?.toLowerCase() === 'admin';

  // Fetch functions
  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/events`);
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.log('Error fetching events:', error);
    }
  };

  const fetchTestimonies = async () => {
    try {
      const response = await fetch(`${API_URL}/testimonies`);
      if (response.ok) {
        const data = await response.json();
        setTestimonies(data);
      }
    } catch (error) {
      console.log('Error fetching testimonies:', error);
    }
  };

  const fetchPrayerRequests = async () => {
    try {
      const response = await fetch(`${API_URL}/prayerrequests`);
      if (response.ok) {
        const data = await response.json();
        setPrayerRequests(data);
      }
    } catch (error) {
      console.log('Error fetching prayer requests:', error);
    }
  };

  const fetchBaptisms = async () => {
    try {
      const token = getToken();
      if (!token) return;
      const response = await fetch(`${API_URL}/baptism/my`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setBaptisms(data);
      }
    } catch (error) {
      console.log('Error fetching baptisms:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setLoggedIn(true);
      setUser(JSON.parse(savedUser));
      fetchBaptisms();
    }
    fetchEvents();
    fetchTestimonies();
    fetchPrayerRequests();
  }, []);

  // Handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        setLoggedIn(true);
        setMessage('Login successful!');
        setActivePage('dashboard');
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setMessage('Cannot connect to backend.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          fullName, 
          email, 
          password, 
          phoneNumber: phone,
          role: 'Member' 
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        setLoggedIn(true);
        setMessage('Registration successful!');
        setActivePage('dashboard');
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      setMessage('Cannot connect to backend.');
    }
  };

  const handleSubmitTestimony = async (e, files) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('Title', testimonyTitle);
    formData.append('Content', testimonyContent);
    
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }
    
    try {
      const response = await fetch(`${API_URL}/testimonies`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        },
        body: formData
      });
      
      if (response.ok) {
        alert('Testimony submitted successfully! Pending approval.');
        setShowTestimonyForm(false);
        setTestimonyTitle('');
        setTestimonyContent('');
        fetchTestimonies();
      } else {
        const error = await response.json();
        alert(error.message || 'Error submitting testimony');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting testimony. Make sure your backend is running.');
    }
  };

  const handleSubmitPrayer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/prayerrequests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ prayerRequestText: prayerText, isAnonymous })
      });
      if (response.ok) {
        alert('Prayer request submitted! Our team will pray for you.');
        setShowPrayerForm(false);
        setPrayerText('');
        setIsAnonymous(false);
        fetchPrayerRequests();
      } else {
        const error = await response.json();
        alert(error.message || 'Error submitting prayer request');
      }
    } catch (error) {
      alert('Error submitting prayer request');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    setUser(null);
    setActivePage('home');
  };

  return (
    <div>
      <Navbar 
        activePage={activePage}
        setActivePage={setActivePage}
        loggedIn={loggedIn}
        user={user}
        handleLogout={handleLogout}
      />
      
      {/* Public Pages */}
      {activePage === 'home' && <HomePage setActivePage={setActivePage} />}
      {activePage === 'about' && <AboutPage />}
      {activePage === 'services' && <ServicesPage />}
      {activePage === 'events' && <EventsPage events={events} />}
      {activePage === 'media' && <MediaPage />}
      {activePage === 'testimonies' && (
        <TestimoniesPage 
          loggedIn={loggedIn}
          showTestimonyForm={showTestimonyForm}
          setShowTestimonyForm={setShowTestimonyForm}
          testimonyTitle={testimonyTitle}
          setTestimonyTitle={setTestimonyTitle}
          testimonyContent={testimonyContent}
          setTestimonyContent={setTestimonyContent}
          handleSubmitTestimony={handleSubmitTestimony}
          testimonies={testimonies}
        />
      )}
      {activePage === 'prayer' && (
        <PrayerPage 
          loggedIn={loggedIn}
          showPrayerForm={showPrayerForm}
          setShowPrayerForm={setShowPrayerForm}
          prayerText={prayerText}
          setPrayerText={setPrayerText}
          isAnonymous={isAnonymous}
          setIsAnonymous={setIsAnonymous}
          handleSubmitPrayer={handleSubmitPrayer}
          prayerRequests={prayerRequests}
        />
      )}
      {activePage === 'counselling' && <CounsellingPage loggedIn={loggedIn} />}
      {activePage === 'contact' && <ContactPage />}
      {activePage === 'baptism' && loggedIn && (
        <BaptismPage user={user} baptisms={baptisms} fetchBaptisms={fetchBaptisms} />
      )}
      {activePage === 'profile' && loggedIn && (
        <ProfilePage user={user} />
      )}
      
      {/* Member Dashboard */}
      {activePage === 'dashboard' && loggedIn && (
        <DashboardPage 
          user={user}
          events={events}
          testimonies={testimonies}
          prayerRequests={prayerRequests}
          setActivePage={setActivePage}
          setShowTestimonyForm={setShowTestimonyForm}
          setShowPrayerForm={setShowPrayerForm}
        />
      )}
      
      {/* Admin Dashboard - Only visible to Admin users */}
      {activePage === 'admin' && loggedIn && isAdmin && (
        <AdminPage user={user} />
      )}
      
      {/* Auth Pages */}
      {(activePage === 'login' || activePage === 'register') && !loggedIn && (
        <AuthPage 
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          fullName={fullName}
          setFullName={setFullName}
          phone={phone}
          setPhone={setPhone}
          message={message}
          handleLogin={handleLogin}
          handleRegister={handleRegister}
          setActivePage={setActivePage}
        />
      )}
      
      <Footer setActivePage={setActivePage} />
    </div>
  );
}

export default App;