import React from 'react';

const Annotations = ({ page = 'profile' }) => {
  const annotations = {
    profile: {
      title: "Technical Details",
      details: [
        "This page and the layout are auto-generated using Cline and Visual Studio Code as a demonstration of AI driven implementation", 
        "Page is rendered using React 18 and modern JavaScript (ES6+)",
        "Package is hosted on GitHub via React Actions", 
      ]
    },
    smartyquest: {
      title: "SmartyQuest Technical Details",
      details: [
        "Most of the code was auto-generated using Cline and Visual Studio Code", 
        "Frontend: React with hooks and functional components",
        "State Management: React Context API and useState hooks",
        "Backend: AWS Lambda functions with Node.js",
        "Database: DynamoDB for scalable question storage",
        "API: RESTful services with AWS API Gateway",
        "Deployment: Serverless architecture on AWS",
        "Quiz Logic: Dynamic question generation and scoring algorithms",
        "Responsive UI: Mobile-first design with CSS animations"
      ]
    }
  };

  const currentAnnotation = annotations[page];

  return (
    <section className="annotations">
      <div className="container">
        <h3 className="annotations-title">{currentAnnotation.title}</h3>
        <div className="annotations-content">
          {currentAnnotation.details.map((detail, index) => (
            <span key={index} className="annotation-item">
              {detail}
              {index < currentAnnotation.details.length - 1 && ' • '}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Annotations;
