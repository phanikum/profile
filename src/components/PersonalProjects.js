import React from 'react';
import { Link } from 'react-router-dom';

const PersonalProjects = () => {
  const projects = [
    {
      title: "🧠 SmartyQuest",
      description: "An engaging and educational quiz platform designed for kids aged 5-12. Features fun questions about science, nature, animals, and the world around us. Built with React and modern web technologies.",
      link: "/smartyquest",
      status: "Live & Interactive",
      date: "Sep 2025"
    }
  ];

  return (
    <section className="section side-projects">
      <div className="container">
        <h2>Personal Projects</h2>
        <div className="experience-timeline">
          {projects.map((project, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <h3>{project.title}</h3>
                <h4>{project.status}</h4>
                <span className="period">{project.date}</span>
              </div>
              <p className="experience-description">{project.description}</p>
              <div className="project-action">
                <Link 
                  to={project.link}
                  className="project-link-btn"
                >
                  🚀 Try SmartyQuest →
                </Link>
              </div>
            </div>
          ))}
          <p className="add-more-text">
            More projects coming soon...
          </p>
        </div>
      </div>
    </section>
  );
};

export default PersonalProjects;
