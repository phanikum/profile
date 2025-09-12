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
              <p>phanikum@outlook.com</p>
            </div>
            <div className="contact-item">
              <h3>Phone</h3>
              <p>+1 (111) 123-4567</p>
            </div>
            <div className="contact-item">
              <h3>Location</h3>
              <p>Seattle, WA</p>
            </div>
            <div className="contact-item">
              <h3>LinkedIn</h3>
              <p>
                <a 
                  href="https://www.linkedin.com/in/phanibhamidipati/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/phanibhamidipati
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
