import React from 'react';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Patents from '../components/Patents';
import SideProjects from '../components/SideProjects';
import Contact from '../components/Contact';

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="app-header">
        <div className="container">
          <h1>Phani Bhamidipati</h1>
          <p className="tagline"></p>
        </div>
      </header>
      
      <main className="main-content">
        <About />
        <div className="content-grid">
          <div className="left-column">
            <Skills />
            <Patents />
          </div>
          <div className="right-column">
            <Experience />
            <Education />
          </div>
        </div>
        <div className="bottom-section">
          <div className="bottom-grid">
            <Contact />
            <SideProjects />
          </div>
        </div>
      </main>
      
      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2025 Phani Bhamidipati. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
