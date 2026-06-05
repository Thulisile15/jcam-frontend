import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  // Array of church family images in the order you specified
  const familyImages = [
    { src: '/oldabout.jpeg', alt: 'JCAM Early Days - Our Foundation' },
    { src: '/midoldabout.jpeg', alt: 'JCAM Growing Together - Mid Journey' },
    { src: '/backabout.jpeg', alt: 'JCAM Church Family - Standing Together' },
    { src: '/newabout.jpeg', alt: 'JCAM Present Day - Moving Forward in Faith' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        
        <h1>About JCAM</h1>
        <p>Jesus Christ Is The Answer Ministries</p>
      </div>
      
      <div className="container">
        {/* Welcome & Introduction Section */}
        <div className="welcome-section">
          <div className="welcome-content">
            <p className="welcome-text-large">
              Welcome to <strong>Jesus Christ Is The Answer Ministries (JCAM)</strong> — a place where Jesus Christ truly changes lives because He genuinely cares.
            </p>
            <p>
              Founded in 2015 under the leadership of <strong>Apostle T. Mabasa</strong>, JCAM was born out of a simple but powerful vision: to preach the Gospel of Jesus Christ without compromise, bring hope to the hopeless, healing to the brokenhearted, and lead people into a real, life-changing relationship with God.
            </p>
            <p>
              Based in <strong>Malamulele, Limpopo, South Africa</strong>, our ministry has grown into a sacred place of prayer, worship, deliverance, restoration, and spiritual growth. We are not just a church — we are a family of believers who have experienced God's power firsthand and believe with all our hearts that Jesus Christ is still the answer to every question, every struggle, and every need.
            </p>
          </div>
        </div>

        {/* Mission, Vision, and What We Believe */}
        <div className="about-grid">
          <div className="about-card">
            <div className="card-icon">🎯</div>
            <h2>Our Mission</h2>
            <p>To reach our communities with the life-changing love of Jesus Christ. We do this through powerful church services, outreach programs that touch the hurting, prayer that moves mountains, and the faithful teaching of God's Word. Everything we do is aimed at one thing — helping people find their way back to God.</p>
          </div>
          
          <div className="about-card">
            <div className="card-icon">👁️</div>
            <h2>Our Vision</h2>
            <p>To see lives completely transformed by God's love, families restored and reunited, and our communities in Malamulele and beyond impacted so profoundly for Christ that generations to come will know there is a God in heaven who still answers prayer.</p>
          </div>
          
          <div className="about-card">
            <div className="card-icon">📖</div>
            <h2>What We Believe</h2>
            <p>We believe in the Triune God — Father, Son, and Holy Spirit. We believe salvation comes through faith in Jesus Christ alone, not by works but by grace. We believe the Bible is the inspired, infallible Word of God — our final authority in all matters of faith and practice.</p>
          </div>
          
          <div className="about-card">
            <div className="card-icon">💎</div>
            <h2>Our Values</h2>
            <p><strong>Faith</strong> — Trusting God no matter what.<br />
            <strong>Love</strong> — Loving others the way Christ loved us.<br />
            <strong>Unity</strong> — Standing together as one body.<br />
            <strong>Excellence</strong> — Doing everything as unto the Lord.<br />
            <strong>Service</strong> — Giving generously of our time and gifts.</p>
          </div>
        </div>

        {/* Church Journey - Image Timeline */}
        <div className="family-section">
          <h2 className="family-title">Our Journey Through The Years</h2>
          <p className="family-subtitle">From our humble beginnings to where we are today — all glory to God.</p>
          
          <div className="family-images-grid">
            {familyImages.map((image, index) => (
              <div key={index} className="family-image-card">
                <div className="family-image-container">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="family-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x300?text=JCAM+Church+Family';
                    }}
                  />
                </div>
                <div className="family-image-caption">
                  <p>{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hope Message */}
        <div className="hope-section">
          <div className="hope-content">
            <p className="hope-text">
              "<strong>No matter your background, no matter your situation, no matter how far you think you've wandered — there is hope for you at Jesus Christ Is The Answer Ministries.</strong>"
            </p>
            <p className="hope-verse">For with God nothing shall be impossible. — Luke 1:37</p>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="closing-section">
          <p className="closing-text">
            <strong>JCAM — Where Jesus Christ Still Changes Lives Today.</strong>
          </p>
          <p className="invite-text">
            We invite you to worship with us. Come as you are — you belong here. 🙏
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;