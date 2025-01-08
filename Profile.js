import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define common styles
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
    border: '1px solid',
    transition: 'border-color 0.3s ease, background-color 0.3s ease',
  },
  button: {
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '16px',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
  },
  heading: {
    marginBottom: '20px',
    opacity: 0,
    animation: 'fadeIn 1s forwards',
  },
};

// Styles for light mode
const lightModeStyles = {
  ...commonStyles,
  container: {
    ...commonStyles.container,
    backgroundColor: '#f0f0f0',
  },
  input: {
    ...commonStyles.input,
    borderColor: '#ccc',
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
};

// Styles for dark mode
const darkModeStyles = {
  ...commonStyles,
  container: {
    ...commonStyles.container,
    backgroundColor: '#333',
  },
  input: {
    ...commonStyles.input,
    borderColor: '#444',
    color: '#f9f9f9',
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
};

// Inject keyframes into the document
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
    .input-focus {
      border-color: #007bff !important;
      background-color: #f0f8ff !important;
    }
    .dark-mode .input-focus {
      border-color: #444 !important;
      background-color: #666 !important;
    }
  `;
  document.head.appendChild(style);
};

const Profile = ({ darkMode }) => {
  const [profileData, setProfileData] = useState({
    name: '',
    skills: '',
    education: '',
    interests: '',
  });

  useEffect(() => {
    injectKeyframes();
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/profile', profileData);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  const currentStyles = darkMode ? darkModeStyles : lightModeStyles;

  return (
    <div style={currentStyles.container} className={darkMode ? 'dark-mode' : ''}>
      <h2 style={currentStyles.heading}>Profile</h2>
      <form onSubmit={handleSubmit} style={currentStyles.form}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={profileData.name}
          onChange={handleChange}
          style={currentStyles.input}
          className="resume-input"
          onFocus={(e) => e.target.classList.add('input-focus')}
          onBlur={(e) => e.target.classList.remove('input-focus')}
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills"
          value={profileData.skills}
          onChange={handleChange}
          style={currentStyles.input}
          className="resume-input"
          onFocus={(e) => e.target.classList.add('input-focus')}
          onBlur={(e) => e.target.classList.remove('input-focus')}
        />
        <input
          type="text"
          name="education"
          placeholder="Education"
          value={profileData.education}
          onChange={handleChange}
          style={currentStyles.input}
          className="resume-input"
          onFocus={(e) => e.target.classList.add('input-focus')}
          onBlur={(e) => e.target.classList.remove('input-focus')}
        />
        <input
          type="text"
          name="interests"
          placeholder="Interests"
          value={profileData.interests}
          onChange={handleChange}
          style={currentStyles.input}
          className="resume-input"
          onFocus={(e) => e.target.classList.add('input-focus')}
          onBlur={(e) => e.target.classList.remove('input-focus')}
        />
        <button
          type="submit"
          style={currentStyles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = currentStyles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = currentStyles.button.backgroundColor)}
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
