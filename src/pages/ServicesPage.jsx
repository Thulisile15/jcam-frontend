import React from 'react';
import './ServicesPage.css';

const ServicesPage = () => {
  const services = [
    { 
      title: 'Sunday Service', 
      time: '9:30 AM', 
      description: 'Join us for powerful worship, prayer, and the Word of God.',
      color: '#1a3c8f',
      bgLight: '#e8eeff',
      day: 'Sunday',
      image: '/sundayservice.jpeg',
      imageAlt: 'Sunday Worship Service'
    },
    { 
      title: "Women's Fellowship", 
      time: '3:30 PM', 
      description: 'A time of fellowship, prayer, and empowerment for women.',
      color: '#f5a623',
      bgLight: '#fff8e7',
      day: 'Tuesday',
      image: '/tuesdayservice.jpeg',
      imageAlt: 'Women Fellowship Gathering'
    },
    { 
      title: 'Healing & Deliverance', 
      time: '3:30 PM', 
      description: 'Experience God\'s healing power and freedom through prayer.',
      color: '#c41e3a',
      bgLight: '#ffe8eb',
      day: 'Friday',
      image: '/fridayservice.jpeg',
      imageAlt: 'Healing and Deliverance Service'
    },
    { 
      title: 'Saturday Service', 
      time: 'TBC Weekly', 
      description: 'Check our announcements for Saturday service schedule.',
      color: '#6c5ce7',
      bgLight: '#f0ecff',
      day: 'Saturday',
      image: '/saturdayservice.jpeg',
      imageAlt: 'Saturday Church Service'
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Our Services</h1>
        <p>Come worship with us - You are welcome!</p>
      </div>
      
      <div className="container">
        {/* Featured Service - Sunday */}
        <div className="featured-service">
          <div className="featured-content">
            <span className="featured-badge">Weekly Main Service </span>
            <h2>Sunday Service</h2>
            <p className="featured-time">🕙 9:30 AM</p>
            <p className="featured-desc">Start your week with a powerful encounter with God. Dynamic worship, life-changing message, and a loving community awaits you!</p>
            <button className="featured-btn">Plan Your Visit</button>
          </div>
          <div className="featured-image">
            <img src="/sundayservice.jpeg" alt="Sunday Service" className="featured-img" />
          </div>
        </div>

        {/* Weekly Schedule Cards with Images */}
        <div className="weekly-schedule">
          <h2 className="section-title">Weekly Schedule</h2>
          <div className="schedule-cards">
            {services.map((service, index) => (
              <div key={index} className="schedule-card" style={{ background: service.bgLight }}>
                <div className="card-image-container">
                  <img 
                    src={service.image} 
                    alt={service.imageAlt}
                    className="card-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x200?text=Church+Service';
                    }}
                  />
                  <div className="card-image-overlay" style={{ background: service.color }}>
                    <span className="card-day-badge">{service.day}</span>
                  </div>
                </div>
                <div className="card-body">
                  <h3 style={{ color: service.color }}>{service.title}</h3>
                  <div className="card-time">
                    🕙 {service.time}
                  </div>
                  <div className="card-location">
                    📍 {service.location}
                  </div>
                  <p className="card-desc">{service.description}</p>
                </div>
                <div className="card-footer">
                  <button className="reminder-btn" style={{ background: service.color }}>
                    📅 Add Reminder
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default ServicesPage;