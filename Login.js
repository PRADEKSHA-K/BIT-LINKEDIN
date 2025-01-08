import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Common styles between ResumeBuilder and Login
const commonStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '20px',
    transition: 'background-color 0.3s ease',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '500px',
    width: '100%',
    opacity: 0,
    animation: 'fadeIn 1s forwards',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  },
  button: {
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '16px',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
    boxSizing: 'border-box', // Ensures padding doesn't affect size
    width: '100%', // Ensures consistent button size
  },
  buttonHover: {
    backgroundColor: '#555',
  },
  heading: {
    marginBottom: '20px',
    opacity: 0,
    animation: 'fadeIn 1s forwards',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    textAlign: 'center',
  },
  link: {
    marginTop: '10px',
    textAlign: 'center',
    textDecoration: 'none',
  },
};

// Light mode specific styles
const lightModeStyles = {
  ...commonStyles,
  container: {
    ...commonStyles.container,
    backgroundColor: '#f0f0f0',
  },
  input: {
    ...commonStyles.input,
    border: '1px solid #ccc',
    color: '#333', // Ensure text is visible
  },
  inputFocus: {
    borderColor: '#007bff',
    backgroundColor: '#f0f8ff',
  },
  button: {
    ...commonStyles.button,
    backgroundColor: '#007bff',
    color: 'white',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  heading: {
    ...commonStyles.heading,
    color: '#333',
  },
  link: {
    ...commonStyles.link,
    color: '#007bff',
  },
};

// Dark mode specific styles
const darkModeStyles = {
  ...commonStyles,
  container: {
    ...commonStyles.container,
    backgroundColor: '#333',
  },
  input: {
    ...commonStyles.input,
    border: '1px solid #444',
    color: '#f9f9f9', // Ensure text is visible
    backgroundColor: '#555',
  },
  inputFocus: {
    borderColor: '#444',
    backgroundColor: '#666',
  },
  button: {
    ...commonStyles.button,
    backgroundColor: '#444',
    color: '#f9f9f9',
  },
  buttonHover: {
    backgroundColor: '#555',
  },
  heading: {
    ...commonStyles.heading,
    color: '#f9f9f9',
  },
  link: {
    ...commonStyles.link,
    color: '#1e90ff',
  },
  error: {
    color: '#ff6b6b', // Lighter red for visibility in dark mode
  },
};

// Inject keyframes into the document (same as ResumeBuilder for consistency)
const injectKeyframes = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Inject fade-in animation keyframes
    injectKeyframes();

    // Check if dark mode preference is stored in localStorage
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);
    document.body.classList.toggle('dark-mode', storedDarkMode);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error

    // Validation check for empty fields
    if (!email || !password) {
      setError('Please fill in both email and password fields');
      return;
    }

    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.data.success) {
        navigate('/'); // Redirect to Home page upon success
      } else {
        setError('Invalid login credentials');
      }
    } catch (error) {
      console.error('Login error', error);
      setError('An error occurred during login. Please try again later.');
    }
  };

  const currentStyles = darkMode ? darkModeStyles : lightModeStyles;

  return (
    <div style={currentStyles.container}>
      <h2 style={currentStyles.heading}>Login</h2>
      <form onSubmit={handleSubmit} style={currentStyles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={currentStyles.input}
          onFocus={(e) => (e.target.style = { ...currentStyles.input, ...currentStyles.inputFocus })}
          onBlur={(e) => (e.target.style = currentStyles.input)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={currentStyles.input}
          onFocus={(e) => (e.target.style = { ...currentStyles.input, ...currentStyles.inputFocus })}
          onBlur={(e) => (e.target.style = currentStyles.input)}
        />
        {error && <p style={currentStyles.error}>{error}</p>}
        <button
          type="submit"
          style={currentStyles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = currentStyles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = currentStyles.button.backgroundColor)}
        >
          Login
        </button>
      </form>
      <p style={currentStyles.link}>
        Don't have an account? <a href="/signup" style={currentStyles.link}>Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
