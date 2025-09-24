import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import SmartyQuestPage from './pages/SmartyQuestPage';
import AppMartPage from './pages/AppMartPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/smartyquest" element={<SmartyQuestPage />} />
          <Route path="/appmart" element={<AppMartPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
