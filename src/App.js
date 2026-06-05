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
import BaptismPage from './pages/BaptismPage';
import AdminPage from './pages/AdminPage';
import DonationsPage from './pages/DonationsPage';

const API_URL = 'https://localhost:7234/api';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [events, setEvents] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Check for secret admin key in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const adminKey = urlParams.get('admin');
    if (adminKey === 'JCAM2026') {
      localStorage.setItem('adminLoggedIn', 'true');
      setIsAdminLoggedIn(true);
      setActivePage('admin');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Check if admin is already logged in (from localStorage)
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsAdminLoggedIn(true);
    }
    fetchEvents();
  }, []);

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

  return (
    <div>
      <Navbar 
        activePage={activePage}
        setActivePage={setActivePage}
        isAdminLoggedIn={isAdminLoggedIn}
        setIsAdminLoggedIn={setIsAdminLoggedIn}
      />
      
      {/* Main content wrapper with top padding to prevent navbar overlap */}
      <main className="main-content">
        {activePage === 'home' && <HomePage setActivePage={setActivePage} />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'services' && <ServicesPage />}
        {activePage === 'events' && <EventsPage events={events} />}
        {activePage === 'media' && <MediaPage />}
        {activePage === 'testimonies' && <TestimoniesPage />}
        {activePage === 'prayer' && <PrayerPage />}
        {activePage === 'counselling' && <CounsellingPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'baptism' && <BaptismPage />}
        {activePage === 'donations' && <DonationsPage />}
        {activePage === 'admin' && isAdminLoggedIn && <AdminPage />}
      </main>
      
      <Footer setActivePage={setActivePage} setIsAdminLoggedIn={setIsAdminLoggedIn} />
    </div>
  );
}

export default App;