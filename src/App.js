import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import SmartyQuestPage from './pages/SmartyQuestPage';

function App() {
  return (
    <Router basename="/profile">
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/smartyquest" element={<SmartyQuestPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
