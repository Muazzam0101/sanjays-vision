import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Scanning from './pages/Scanning';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';
import Login from './pages/Login';
import Signup from './pages/Signup';
import History from './pages/History';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scanning" element={<Scanning />} />
        <Route path="/history" element={<History />} />
        <Route path="/report" element={<Report />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
