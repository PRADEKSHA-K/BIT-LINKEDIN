import React from 'react';
import { FaMoon, FaSun, FaBell, FaUser, FaHome, FaBars, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Topbar = ({ onToggleSidebar, darkMode, toggleDarkMode }) => {
  const styles = {
    topbar: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: darkMode ? '#222' : '#fff',
      borderBottom: `1px solid ${darkMode ? '#444' : '#ddd'}`,
      boxShadow: darkMode ? '0 2px 4px rgba(0, 0, 0, 0.5)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      color: darkMode ? '#e0e0e0' : '#333',
    },
    topbarContent: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'space-between',
    },
    searchForm: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      maxWidth: '400px',
      marginLeft: '5rem',
    },
    searchInput: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: '5px',
      border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
      backgroundColor: darkMode ? '#333' : '#fff',
      color: darkMode ? '#e0e0e0' : '#333',
    },
    searchButton: {
      background: darkMode ? '#444' : '#ddd',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '5px',
      cursor: 'pointer',
      color: darkMode ? '#e0e0e0' : '#333',
      fontSize: '1.2rem',
      marginLeft: '10px',
    },
    icon: {
      margin: '0 10px',
      cursor: 'pointer',
      fontSize: '1.5rem',
      color: darkMode ? '#e0e0e0' : '#333',
    },
    sidebarToggle: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: darkMode ? '#e0e0e0' : '#333',
    },
    leftSection: {
      display: 'flex',
      alignItems: 'center',
      marginRight: '1rem',
    },
  };

  return (
    <div style={styles.topbar}>
      <button style={styles.sidebarToggle} onClick={onToggleSidebar}>
        <FaBars />
      </button>
      <div style={styles.topbarContent}>
        <div style={styles.searchForm}>
          <form style={{ display: 'flex', width: '100%' }}>
            <input
              type="text"
              placeholder="Search..."
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchButton}>
              <FaSearch />
            </button>
          </form>
        </div>
        <div style={styles.leftSection}>
          <Link to="/" style={styles.icon}>
            <FaHome />
          </Link>
          <div style={styles.icon} onClick={toggleDarkMode}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </div>
          <div style={styles.icon}>
            <FaBell />
          </div>
          <Link to="/profile" style={styles.icon}>
            <FaUser />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;