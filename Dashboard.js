import React from 'react';
import { Link } from 'react-router-dom';

// Define styles as a JavaScript object
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#121212', // Dark background for dark mode
    color: '#e0e0e0', // Light text color for dark mode
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    marginBottom: '20px',
  },
  nav: {
    listStyleType: 'none',
    padding: 0,
  },
  navItem: {
    margin: '10px 0',
  },
  navLink: {
    textDecoration: 'none',
    color: '#bb86fc', // Light color for links in dark mode
    fontSize: '18px',
  },
  navLinkHover: {
    textDecoration: 'underline',
  },
};

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Dashboard</h2>
      <nav>
        <ul style={styles.nav}>
          <li style={styles.navItem}><Link to="/profile" style={styles.navLink}>Profile</Link></li>
          <li style={styles.navItem}><Link to="/job-search" style={styles.navLink}>Job Search</Link></li>
          <li style={styles.navItem}><Link to="/messaging" style={styles.navLink}>Messaging</Link></li>
          <li style={styles.navItem}><Link to="/resume-builder" style={styles.navLink}>Resume Builder</Link></li>
          <li style={styles.navItem}><Link to="/placement-info" style={styles.navLink}>Placement Info</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
