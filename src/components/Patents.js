import React from 'react';

const Patents = () => {
  const patents = [
    {
      title: "Multi-level key hierarchy for securing cloud-based data sets",
      patentNumber: "US Patent US9544140B1",
      status: "Granted"
    },
    {
      title: "Process for data migration between document stores",
      patentNumber: "US Patent US10157214B1",
      status: "Granted"
    }, 
      {
      title: "System for controlling access to stored values",
      patentNumber: "US Patent US10157214B1",
      status: "Granted"
    }
  ];

  return (
    <section className="section patents">
      <div className="container">
        <h2>Patents</h2>
        <div className="patents-list">
          {patents.map((patent, index) => (
            <div key={index} className="patent-item-compact">
              <div className="patent-info">
                <h4>{patent.title}</h4>
                <div className="patent-meta">
                  <span className="patent-number">{patent.patentNumber}</span>
                  <span className={`patent-status ${patent.status.toLowerCase()}`}>
                    {patent.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Patents;
