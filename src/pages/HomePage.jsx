import React from 'react';
import './HomePage.css';

const HomePage = ({ setActivePage }) => {
  // Inline style for background image from public folder
  const heroStyle = {
    backgroundImage: 'url("/background.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed', // This creates a nice parallax effect
  };

  return (
    <div>
      <section style={heroStyle} className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Jesus Christ Is The Answer Ministries</h1>
          <h2 className="hero-subtitle">JCAM</h2>
          <p className="hero-text">2026 - The Year of CELEBRATION</p>
          <p className="hero-text-small">Psalm 126:1-5 - "When the Lord restored the fortunes of Zion, we were like those who dreamed. Our mouths were filled with laughter, our tongues with songs of joy. Then it was said among the nations. "The Lord has done great things for them". The Lord has done great things for us and we are filled with joy...</p>
          <div className="hero-buttons">
            <button onClick={() => setActivePage('register')} className="btn-primary">Join Us Sunday</button>
            <button onClick={() => setActivePage('events')} className="btn-secondary">Learn More</button>
          </div>
        </div>
      </section>
      <section className="announcement">
        <div className="container">
          <h3>Mark 12:28</h3>
          <p>One of the teachers of the law came and heard them debating. Noticing that Jesus had given them a good answer, he asked him, "Of all the commandments, which is the most important?"</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;