import React from 'react';

const SideProjects = () => {
  const projects = [
    {
      title: "Theoretical Project",
      description: "A placeholder for an upcoming innovative project. Details to be updated soon.",
      link: "#",
      status: "In Development"
    }
  ];

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
                <span className="period">In Development</span>
              </div>
              <p className="experience-description">{project.description}</p>
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
