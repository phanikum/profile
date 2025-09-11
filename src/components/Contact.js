import React from 'react';

const Contact = () => {
  return (
    <section className="section contact">
      <div className="container">
        <h2>Contact</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <h3>Email</h3>
              <p>your.email@example.com</p>
            </div>
            <div className="contact-item">
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="contact-item">
              <h3>Location</h3>
              <p>San Francisco, CA</p>
            </div>
            <div className="contact-item">
              <h3>LinkedIn</h3>
              <p>linkedin.com/in/yourprofile</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
