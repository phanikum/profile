import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      category: "Technical Skills",
      skills: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git"]
    },
    {
      category: "Soft Skills",
      skills: ["Problem Solving", "Team Leadership", "Communication", "Project Management"]
    },
    {
      category: "Tools & Technologies",
      skills: ["VS Code", "Docker", "AWS", "MongoDB", "PostgreSQL"]
    }
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
