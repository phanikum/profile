import React from 'react';

const Patents = () => {
  const patents = [
    {
      title: "Distributed Data Processing System",
      patentNumber: "US Patent 10,123,456",
      date: "2023",
      status: "Granted"
    },
    {
      title: "Real-time Analytics Framework",
      patentNumber: "US Patent Application 17,987,654",
      date: "2022",
      status: "Pending"
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
                  <span className="patent-date">{patent.date}</span>
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
