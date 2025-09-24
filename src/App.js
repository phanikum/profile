import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import SmartyQuestPage from './pages/SmartyQuestPage';
import AppMartPage from './pages/AppMartPage';

function App() {
  return (
    <>
      {/* Root level router for handling redirect from "/" to "/profile" */}
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/profile" replace />} />
          <Route path="/profile/*" element={<ProfileApp />} />
        </Routes>
      </Router>
    </>
  );
}

// Separate component for the profile app with its own routing
function ProfileApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/smartyquest" element={<SmartyQuestPage />} />
        <Route path="/appmart" element={<AppMartPage />} />
      </Routes>
    </div>
  );
}

export default App;
