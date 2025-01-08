import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ darkMode }) => {
  return (
    <div style={darkMode ? styles.containerDark : styles.container}>
      <h1 style={darkMode ? styles.headingDark : styles.heading}>Welcome to BIT LinkedIn Portal</h1>
      <nav style={styles.nav}>
        <Link to="/login" style={darkMode ? styles.linkDark : styles.link}>
          Login
        </Link>
      </nav>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("https://source.unsplash.com/random/1920x1080")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'background 0.3s ease',
    position: 'relative',
    padding: '0 20px',
    color: '#333', // Default text color for light mode
  },
  containerDark: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("https://source.unsplash.com/random/1920x1080?dark")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'background 0.3s ease',
    position: 'relative',
    padding: '0 20px',
    color: '#f9f9f9', // Light text color for dark mode
  },
  heading: {
    color: '#222', // Dark color for light mode (darker shade for better contrast)
    fontSize: '3rem',
    marginBottom: '20px',
    textAlign: 'center',
    animation: 'fadeIn 1s ease',
  },
  headingDark: {
    color: '#ffffff', // Pure white for dark mode heading for maximum contrast
    fontSize: '3rem',
    marginBottom: '20px',
    textAlign: 'center',
    animation: 'fadeIn 1s ease',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'slideIn 1s ease',
  },
  link: {
    color: '#007bff', // Default link color
    textDecoration: 'none',
    fontSize: '1.5rem',
    margin: '0 10px',
    padding: '10px 15px',
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transition: 'color 0.3s ease, background-color 0.3s ease',
  },
  linkDark: {
    color: '#66b3ff', // Lighter link color for dark mode
    textDecoration: 'none',
    fontSize: '1.5rem',
    margin: '0 10px',
    padding: '10px 15px',
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Keep the same background for consistency
    transition: 'color 0.3s ease, background-color 0.3s ease',
  },
};

export default Home;