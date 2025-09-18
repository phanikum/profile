import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      category: "Organizational Leadership",
      skills: ["Engineering Leadership", "Technical Strategy", "Leading Transformational Change"]
    },
    {
      category: "Technical Skills",
      skills: ["Voice AI", "Geneartive AI", "Distributed Systems", "AWS", "Finance Technology",  "Accessibility Tech"]
    },
  ];

  return (
    <section className="section skills">
      <div className="container">
        <h2>Key Skills</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3>{category.category}</h3>
              <ul className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="skill-item">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
