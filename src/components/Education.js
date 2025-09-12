import React from 'react';

const Education = () => {
  const education = [
    {
      degree: "Master of Science in Computer Science",
      institution: "IIIT - Hyderabad, India",
      period: "2007 - 2009",
      details: "Specialization in Database Systems, Data Mining and Natural Language Processing. Thesis on Recommendation Systems."
    },
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "IIIT - Hyderabad, India",
      period: "2000 - 2004",
      details: "Graduated with Honors in Data Engineering."
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
