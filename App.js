import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Profile from './components/Profile';
import JobSearch from './components/JobSearch';
import Messaging from './components/Messaging';
import ResumeBuilder from './components/ResumeBuilder';
import PlacementInfo from './pages/PlacementInfo';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import CalendarComponent from './components/CalendarComponent'; // Import the CalendarComponent
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]); // State to track applied jobs

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);
    document.body.classList.toggle('dark-mode', storedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle('dark-mode', newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const commonStyles = {
    backgroundColor: darkMode ? '#333' : '#f0f0f0',
    color: darkMode ? '#f9f9f9' : '#333',
    marginLeft: isSidebarOpen ? '250px' : '0',
    transition: 'margin-left 0.3s ease',
    paddingTop: '2px',
  };

  return (
    <Router>
      <div style={commonStyles}>
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} darkMode={darkMode} />
        <Topbar onToggleSidebar={toggleSidebar} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="content" style={{ paddingTop: '2px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile darkMode={darkMode} />} />
            <Route path="/job-search" element={<JobSearch darkMode={darkMode} setAppliedJobs={setAppliedJobs} />} />
            <Route path="/messaging" element={<Messaging darkMode={darkMode} />} />
            <Route path="/resume-builder" element={<ResumeBuilder darkMode={darkMode} />} />
            <Route path="/placement-info" element={<PlacementInfo darkMode={darkMode} appliedJobs={appliedJobs} />} />
            {/* Add the Calendar route */}
            <Route path="/calendar" element={<CalendarComponent darkMode={darkMode} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;