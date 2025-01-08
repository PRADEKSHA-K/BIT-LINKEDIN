import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaBriefcase, FaSearch, FaEnvelope, FaFileAlt, FaCalendarAlt } from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose, darkMode }) => {
  const location = useLocation();
  
  const styles = {
    sidebar: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '250px',
      height: '100%',
      backgroundColor: darkMode ? '#333' : '#fff',
      color: darkMode ? '#fff' : '#333',
      padding: '20px',
      boxShadow: darkMode ? '2px 0 5px rgba(0, 0, 0, 0.5)' : '2px 0 5px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease',
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      zIndex: 1000,
      overflowY: 'auto',
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'none',
      border: 'none',
      color: darkMode ? '#fff' : '#333',
      fontSize: '24px',
      cursor: 'pointer',
    },
    list: {
      listStyle: 'none',
      padding: 0,
      marginTop: '60px', // To give space below the close button
    },
    listItem: {
      margin: '10px 0',
    },
    link: {
      color: darkMode ? '#fff' : '#333',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
    },
    linkActive: {
      backgroundColor: darkMode ? '#575757' : '#ddd',
    },
    linkIcon: {
      marginRight: '10px',
    },
  };

  return (
    <div style={styles.sidebar}>
      <button onClick={onClose} style={styles.closeButton}>×</button>
      
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <Link
            to="/job-search"
            style={{
              ...styles.link,
              ...(location.pathname === '/job-search' ? styles.linkActive : {}),
            }}
          >
            <FaBriefcase style={styles.linkIcon} /> Job Search
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link
            to="/resume-builder"
            style={{
              ...styles.link,
              ...(location.pathname === '/resume-builder' ? styles.linkActive : {}),
            }}
          >
            <FaFileAlt style={styles.linkIcon} /> Resume Builder
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link
            to="/messaging"
            style={{
              ...styles.link,
              ...(location.pathname === '/messaging' ? styles.linkActive : {}),
            }}
          >
            <FaEnvelope style={styles.linkIcon} /> Messaging
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link
            to="/placement-info"
            style={{
              ...styles.link,
              ...(location.pathname === '/placement-info' ? styles.linkActive : {}),
            }}
          >
            <FaSearch style={styles.linkIcon} /> Placement Info
          </Link>
        </li>
        {/* Add the Calendar button here */}
        <li style={styles.listItem}>
          <Link
            to="/calendar"
            style={{
              ...styles.link,
              ...(location.pathname === '/calendar' ? styles.linkActive : {}),
            }}
          >
            <FaCalendarAlt style={styles.linkIcon} /> Calendar
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link
            to="/profile"
            style={{
              ...styles.link,
              ...(location.pathname === '/profile' ? styles.linkActive : {}),
            }}
          >
            <FaUser style={styles.linkIcon} /> Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
