import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Topbar from './Topbar'; // Import Topbar

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if dark mode preference is stored in localStorage
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);
    document.body.classList.toggle('dark-mode', storedDarkMode);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error

    // Validation checks
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/signup', { email, password });
      if (response.data.success) {
        navigate('/login'); // Redirect to Login page upon success
      } else {
        setError('Error creating account');
      }
    } catch (error) {
      console.error('Signup error', error);
      setError('An error occurred during signup. Please try again later.');
    }
  };

  return (
    <div style={darkMode ? styles.containerDark : styles.container}>
      <Topbar darkMode={darkMode} />
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <h2 style={styles.heading}>Signup</h2>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={darkMode ? styles.inputDark : styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={darkMode ? styles.inputDark : styles.input}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={darkMode ? styles.inputDark : styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={darkMode ? styles.buttonDark : styles.button}>Signup</button>
        </form>
        <p style={styles.switchLink}>
          Already have an account? <a href="/login" style={darkMode ? styles.linkDark : styles.link}>Login</a>
        </p>
      </div>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9',
    padding: '0 20px',
    transition: 'background-color 0.3s ease',
  },
  containerDark: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#333',
    padding: '0 20px',
    transition: 'background-color 0.3s ease',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '500px',
    marginTop: '60px', // Adjust margin to account for the Topbar
  },
  header: {
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    color: darkMode ? '#f9f9f9' : '#333',
    margin: '0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    transition: 'border-color 0.3s ease',
  },
  inputDark: {
    borderColor: '#555',
    backgroundColor: '#222',
    color: '#ddd',
  },
  button: {
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonDark: {
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#0056b3',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    textAlign: 'center',
  },
  switchLink: {
    textAlign: 'center',
    marginTop: '10px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
  linkDark: {
    color: '#1e90ff',
  },
};

export default Signup;
