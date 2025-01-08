import React, { useState, useEffect } from 'react';

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

const lightModeStyles = {
  ...commonStyles,
  container: {
    ...commonStyles.container,
    backgroundColor: '#f0f0f0',
  },
  input: {
    ...commonStyles.input,
    border: '1px solid #ccc',
    backgroundColor: '#fff',
  },
  button: {
    ...commonStyles.button,
    backgroundColor: '#007bff',
    color: 'white',
  },
  heading: {
    ...commonStyles.heading,
    color: '#333',
  },
};

const darkModeStyles = {
  ...commonStyles,
  container: {
    ...commonStyles.container,
    backgroundColor: '#333',
  },
  input: {
    ...commonStyles.input,
    border: '1px solid #444',
    color: '#ffffff', // Change text color to white
    backgroundColor: '#555',
  },
  button: {
    ...commonStyles.button,
    backgroundColor: '#007bff', // Change button color to blue
    color: '#ffffff', // Change button text color to white
  },
  heading: {
    ...commonStyles.heading,
    color: '#ffffff', // Change heading color to white
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
    .resume-input:focus {
      border-color: #007bff; /* Change based on light or dark mode */
      background-color: #f0f8ff;
    }
    .dark-mode .resume-input:focus {
      border-color: #444;
      background-color: #666;
    }
  `;
  document.head.appendChild(style);
};

const ResumeBuilder = ({ darkMode }) => {
  const [resumeData, setResumeData] = useState({
    name: '',
    email: '',
    phone: '', // Added phone field
    education: '',
    skills: '',
    experience: '',
  });

  useEffect(() => {
    injectKeyframes();
  }, []);

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Resume Created Successfully!');
    console.log(resumeData); // You can handle the resume data as needed
  };

  const currentStyles = darkMode ? darkModeStyles : lightModeStyles;

  return (
    <div style={currentStyles.container} className={darkMode ? 'dark-mode' : ''}>
      <h2 style={currentStyles.heading}>Resume Builder</h2>
      <form
        onSubmit={handleSubmit}
        style={currentStyles.form}
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={resumeData.name}
          onChange={handleChange}
          required
          style={currentStyles.input}
          className="resume-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={resumeData.email}
          onChange={handleChange}
          required
          style={currentStyles.input}
          className="resume-input"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={resumeData.phone}
          onChange={handleChange}
          required
          style={currentStyles.input}
          className="resume-input"
        />
        <input
          type="text"
          name="education"
          placeholder="Education"
          value={resumeData.education}
          onChange={handleChange}
          required
          style={currentStyles.input}
          className="resume-input"
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills"
          value={resumeData.skills}
          onChange={handleChange}
          required
          style={currentStyles.input}
          className="resume-input"
        />
        <input
          type="text"
          name="experience"
          placeholder="Experience"
          value={resumeData.experience}
          onChange={handleChange}
          required
          style={currentStyles.input}
          className="resume-input"
        />
        <button
          type="submit"
          style={currentStyles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
        >
          Generate Resume
        </button>
      </form>
    </div>
  );
};

export default ResumeBuilder;