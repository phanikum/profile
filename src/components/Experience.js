import React from 'react';

const Experience = () => {
  const experiences = [
    {
      title: "Sr Manager Software Development",
      company: "Amazon",
      period: "2010 - Present",
      description: "2024-now: Building Alexa+, the next generation of Alexa, powered by Gen AI. 2020-23: Led a new and exciting initiative to delight two Alexa customer segments: 1) Accessibility with focus on vision, hearing, mobility and cognitive impairments; and 2) Aging & Family Safety. Built and launched two Alexa digital subscriptions from ground up (Alexa Emergency Assist, Alexa Together)"
    },
    {
      title: "Software Engineer",
      company: "Oracle",
      period: "2005-2009",
      description: "Developed full-stack applications and contributed to system architecture decisions. Collaborated with cross-functional teams to deliver high-quality software solutions."
    },
  ];

  return (
    <section className="section experience">
      <div className="container">
        <h2>Professional Experience</h2>
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <h3>{exp.title}</h3>
                <h4>{exp.company}</h4>
                <span className="period">{exp.period}</span>
              </div>
              <p className="experience-description">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
