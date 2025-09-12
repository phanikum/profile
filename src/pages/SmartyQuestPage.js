import React, { useState } from 'react';
import QuizService from '../services/quizService.js';

const SmartyQuestPage = () => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [dataSource, setDataSource] = useState(null);

  const handleTakeQuiz = async () => {
    setLoading(true);
    setError(null);
    setQuizData(null);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setSelectedAnswer('');
    setQuizCompleted(false);
    setScore(0);
    setShowResults(false);

    try {
      // Fetch quiz data from AWS API Gateway with fallback to local JSON
      const data = await QuizService.fetchQuizData({
        count: 5 // Default to 5 questions
      });
      setQuizData(data);
      setDataSource(data.source);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);
    setSelectedAnswer('');

    if (currentQuestion + 1 < quizData.quiz.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed, calculate score
      let correctAnswers = 0;
      newAnswers.forEach((answer, index) => {
        if (answer === quizData.quiz[index].answer) {
          correctAnswers++;
        }
      });
      setScore(correctAnswers);
      setQuizCompleted(true);
    }
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleRestartQuiz = () => {
    setQuizData(null);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setSelectedAnswer('');
    setQuizCompleted(false);
    setScore(0);
    setShowResults(false);
    setDataSource(null);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizData.quiz.length) * 100;
    if (percentage === 100) return "🏆 Perfect! You're a SmartyQuest Champion!";
    if (percentage >= 80) return "🌟 Excellent work! You're almost there!";
    if (percentage >= 60) return "👍 Good job! Keep learning and growing!";
    if (percentage >= 40) return "💪 Nice try! Practice makes perfect!";
    return "🌱 Great start! Every expert was once a beginner!";
  };

  if (!quizData && !loading && !error) {
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
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="smarty-quest-page">
        <div className="container">
          <div className="smarty-quest-content">
            <div className="loading-spinner">
              <h2>🔄 Loading your quiz...</h2>
              <p>Get ready for an amazing adventure!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted && !showResults) {
    return (
      <div className="smarty-quest-page">
        <div className="container">
          <div className="smarty-quest-content">
            <div className="quiz-completion">
              <h2>🎉 Quiz Completed!</h2>
              <p>Great job finishing all the questions!</p>
              <div className="completion-actions">
                <button className="results-btn" onClick={handleShowResults}>
                  📊 See My Results
                </button>
                <button className="restart-btn" onClick={handleRestartQuiz}>
                  🔄 Take Quiz Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="smarty-quest-page">
        <div className="container">
          <div className="smarty-quest-content">
            <div className="quiz-results">
              <h2>📊 Your SmartyQuest Results</h2>
              <div className="score-display">
                <div className="score-circle">
                  <span className="score-number">{score}</span>
                  <span className="score-total">/ {quizData.quiz.length}</span>
                </div>
                <p className="score-message">{getScoreMessage()}</p>
              </div>
              
              <div className="detailed-results">
                <h3>📝 Question Review:</h3>
                {quizData.quiz.map((question, index) => (
                  <div key={index} className="result-item">
                    <div className="question-review">
                      <p className="question-text">
                        <strong>Q{index + 1}:</strong> {question.question}
                      </p>
                      <div className="answer-review">
                        <p className={`user-answer ${userAnswers[index] === question.answer ? 'correct' : 'incorrect'}`}>
                          Your answer: {userAnswers[index] || 'No answer'}
                          {userAnswers[index] === question.answer ? ' ✅' : ' ❌'}
                        </p>
                        {userAnswers[index] !== question.answer && (
                          <p className="correct-answer">
                            Correct answer: {question.answer} ✅
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="results-actions">
                <button className="restart-btn" onClick={handleRestartQuiz}>
                  🚀 Take Quiz Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizData && !quizCompleted) {
    const question = quizData.quiz[currentQuestion];
    return (
      <div className="smarty-quest-page">
        <div className="container">
          <div className="smarty-quest-content">
            <div className="quiz-header">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((currentQuestion + 1) / quizData.quiz.length) * 100}%` }}
                ></div>
              </div>
              <div className="quiz-header-info">
                <p className="question-counter">
                  Question {currentQuestion + 1} of {quizData.quiz.length}
                </p>
                {dataSource && (
                  <div className={`data-source-indicator ${dataSource}`}>
                    {dataSource === 'aws-api-gateway' && '☁️ AWS'}
                    {dataSource === 'local-api' && '🏠 Local API'}
                    {dataSource === 'local-json' && '📄 Local'}
                  </div>
                )}
              </div>
            </div>

            <div className="quiz-question">
              <h2 className="question-text">{question.question}</h2>
              <div className="question-meta">
                <span className="topic-badge">{question.topic}</span>
                <span className="difficulty-badge">{question.difficulty}</span>
              </div>
            </div>

            <div className="quiz-options">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${selectedAnswer === option ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(option)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option}</span>
                </button>
              ))}
            </div>

            <div className="quiz-navigation">
              <button 
                className="next-btn" 
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
              >
                {currentQuestion + 1 === quizData.quiz.length ? '🏁 Finish Quiz' : '➡️ Next Question'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SmartyQuestPage;
