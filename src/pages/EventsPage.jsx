import React from 'react';
import './EventsPage.css';

const EventsPage = ({ events }) => (
  <div className="page-container">
    <div className="page-header">
      <h1>Upcoming Events</h1>
      <p>Join us for these special gatherings</p>
    </div>
    <div className="container">
      {events.length === 0 ? (
        <p className="no-events">No upcoming events at this time.</p>
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>📅 {new Date(event.eventDate).toLocaleDateString()}</p>
              <p>📍 {event.location}</p>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default EventsPage;