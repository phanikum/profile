import React, { useState } from 'react';

const SmartyQuestPage = () => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTakeQuiz = async () => {
    setLoading(true);
    setError(null);
    setQuizData(null);

    try {
      // Fetch the local quiz data
      const response = await fetch('/profile/samplequizdata.json');
      
      if (!response.ok) {
        throw new Error('Failed to fetch quiz data');
      }
      
      const data = await response.json();
      setQuizData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="smarty-quest-page">
      <div className="container">
        <div className="smarty-quest-content">
          <div className="quest-header">
            <h1 className="quest-title">🧠 SmartyQuest 🌟</h1>
            <p className="quest-description">
              Welcome to SmartyQuest - the most exciting learning adventure for curious minds! 
              This fun and educational quiz is specially designed for kids aged 5-12 to explore 
              amazing facts about science, nature, animals, and the world around us.
            </p>
            <p className="quest-subtitle">
              Get ready to discover something new, challenge your brain, and have tons of fun! 
              Each question is a new adventure waiting to be explored. Are you ready to become 
              a SmartyQuest champion? 🏆
            </p>
          </div>

          <div className="quest-action">
            <button 
              className="take-quiz-btn" 
              onClick={handleTakeQuiz}
              disabled={loading}
            >
              {loading ? '🔄 Loading Quiz...' : '🚀 Take the Quiz!'}
            </button>
          </div>

          {error && (
            <div className="error-message">
              <p>Oops! Something went wrong: {error}</p>
            </div>
          )}

          {quizData && (
            <div className="quiz-results">
              <h3>Quiz Data (JSON Response):</h3>
              <pre className="json-output">
                {JSON.stringify(quizData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartyQuestPage;
