import React from 'react';

const Education = () => {
  const education = [
    {
      degree: "Master of Science in Computer Science",
      institution: "University Name",
      period: "2014 - 2016",
      details: "Specialized in Software Engineering and Machine Learning. Thesis on distributed systems architecture."
    },
    {
      degree: "Bachelor of Science in Computer Engineering",
      institution: "College Name",
      period: "2010 - 2014",
      details: "Graduated Magna Cum Laude. Relevant coursework: Data Structures, Algorithms, Database Systems, Web Development."
    }
  ];

  return (
    <section className="section education">
      <div className="container">
        <h2>Education</h2>
        <div className="experience-timeline">
          {education.map((edu, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <h3>{edu.degree}</h3>
                <h4>{edu.institution}</h4>
                <span className="period">{edu.period}</span>
              </div>
              <p className="experience-description">{edu.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
