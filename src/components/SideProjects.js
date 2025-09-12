import React from 'react';

const SideProjects = () => {
  const projects = [
    {
      title: "🧠 SmartyQuest",
      description: "An engaging and educational quiz platform designed for kids aged 5-12. Features fun questions about science, nature, animals, and the world around us. Built with React and modern web technologies.",
      link: "#smarty-quest",
      status: "Live & Interactive"
    }
  ];

  const handleProjectClick = (link) => {
    if (link === "#smarty-quest") {
      // Scroll to SmartyQuest section
      const smartyQuestSection = document.querySelector('.smarty-quest');
      if (smartyQuestSection) {
        smartyQuestSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="section side-projects">
      <div className="container">
        <h2>Side Projects</h2>
        <div className="experience-timeline">
          {projects.map((project, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <h3>{project.title}</h3>
                <h4>{project.status}</h4>
                <span className="period">Live</span>
              </div>
              <p className="experience-description">{project.description}</p>
              <div className="project-action">
                <button 
                  className="project-link-btn"
                  onClick={() => handleProjectClick(project.link)}
                >
                  🚀 Try SmartyQuest →
                </button>
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

export default SideProjects;
