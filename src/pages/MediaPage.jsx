import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import './MediaPage.css';

const MediaPage = () => {
  const platforms = [
    { 
      name: 'YouTube', 
      icon: <FaYoutube size={40} />, 
      url: 'https://www.youtube.com/@jcamministries', 
      color: '#ff0000', 
      description: 'Watch our services and sermons' 
    },
    { 
      name: 'Facebook', 
      icon: <FaFacebook size={40} />, 
      url: 'https://www.facebook.com/jcamministries', 
      color: '#1877f2', 
      description: 'Daily inspiration and updates' 
    },
    { 
      name: 'TikTok', 
      icon: <FaTiktok size={40} />, 
      url: 'https://www.tiktok.com/@jcamministries', 
      color: '#010101', 
      description: 'Short inspiring videos and clips' 
    },
    { 
      name: 'Instagram', 
      icon: <FaInstagram size={40} />, 
      url: 'https://www.instagram.com/jcam.ministries/', 
      color: '#e4405f', 
      description: 'Photos and stories' 
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Media</h1>
        <p>Sermons, music, and resources</p>
      </div>
      <div className="container">
        <div className="media-grid">
          {platforms.map((platform, index) => (
            <a 
              key={index} 
              href={platform.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="media-card"
              data-platform={platform.name.toLowerCase()}
            >
              <div className="media-icon" style={{ background: platform.color }}>
                {platform.icon}
              </div>
              <h3>{platform.name}</h3>
              <p>{platform.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaPage;