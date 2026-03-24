import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Scanning from './pages/Scanning';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';

function App() {
  return (
    <div className="dark min-h-screen bg-background text-on-background selection:bg-primary/30">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/scanning" element={<Scanning />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
