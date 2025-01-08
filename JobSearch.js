import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobSearch = ({ darkMode, setAppliedJobs }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(`/api/jobs?query=${query}`);
      setResults(response.data);
      setSearchHistory(prev => [...new Set([query, ...prev])]); // Add to search history
      setQuery('');
    } catch (error) {
      console.error('Error fetching jobs', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (job) => {
    setAppliedJobs(prev => [...prev, job]); // Add job to applied jobs
    alert(`Applying for ${job.title} at ${job.company}`);
  };

  useEffect(() => {
    const globalStyles = `
      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(-10px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      button:hover {
        background-color: ${darkMode ? '#0056b3' : '#0056b3'};
        border-color: ${darkMode ? '#0056b3' : '#0056b3'};
      }

      input:focus {
        border-color: ${darkMode ? '#444' : '#007bff'};
        outline: none;
      }
    `;
    
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = globalStyles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [darkMode]);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: darkMode ? '#2C2C2C' : '#F0F0F0',
      color: darkMode ? '#F9F9F9' : '#333',
      transition: 'background-color 0.3s ease',
      borderRadius: '10px',
      boxShadow: darkMode ? '0 4px 10px rgba(0,0,0,0.5)' : '0 4px 10px rgba(0,0,0,0.1)',
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '20px',
      animation: 'fadeIn 1s ease',
      color: darkMode ? '#B0BEC5' : '#007bff', // Softer gray in dark mode
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '20px',
      width: '100%',
      maxWidth: '600px',
    },
    input: {
      padding: '10px',
      fontSize: '1rem',
      borderRadius: '5px 0 0 5px',
      border: `1px solid ${darkMode ? '#444' : '#ccc'}`,
      flex: '1',
      backgroundColor: darkMode ? '#555' : '#fff',
      color: darkMode ? '#ffffff' : '#333',
      transition: 'border-color 0.3s ease',
    },
    button: {
      padding: '10px 20px',
      fontSize: '1rem',
      borderRadius: '0 5px 5px 0',
      border: 'none',
      backgroundColor: darkMode ? '#007bff' : '#0056b3',
      color: '#fff',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    resultsList: {
      listStyle: 'none',
      padding: '0',
      width: '100%',
      maxWidth: '600px',
      marginTop: '10px',
    },
    resultItem: {
      padding: '15px',
      margin: '10px 0',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
      backgroundColor: darkMode ? '#444' : '#fff',
      transition: 'transform 0.2s',
      cursor: 'pointer',
    },
    jobTitle: {
      fontSize: '1.25rem',
      margin: '0',
    },
    companyName: {
      fontSize: '1rem',
      color: darkMode ? '#ddd' : '#555',
    },
    applyButton: {
      padding: '8px 16px',
      fontSize: '0.9rem',
      borderRadius: '4px',
      border: 'none',
      color: '#fff',
      backgroundColor: darkMode ? '#007bff' : '#007bff', // Blue color in dark mode
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      marginTop: '10px',
    },
    staticCompaniesContainer: {
      marginTop: '5px',
      width: '100%',
      maxWidth: '600px',
      textAlign: 'left',
    },
    staticCompanyItem: {
      padding: '15px',
      margin: '10px 0',
      borderRadius: '4px',
      border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
      backgroundColor: darkMode ? '#444' : '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  };

  // Static list of companies
  const staticCompanies = [
    { name: 'Company A', title: 'Software Engineer' },
    { name: 'Company B', title: 'Product Manager' },
    { name: 'Company C', title: 'Data Scientist' },
    { name: 'Company D', title: 'UX Designer' },
    { name: 'Company E', title: 'DevOps Engineer' },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Job Search</h2>
      <div style={styles.formContainer}>
        <input
          type="text"
          placeholder="Search by keyword"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />
        <button
          onClick={handleSearch}
          style={styles.button}
        >
          Search
        </button>
      </div>
      {loading && <div style={styles.loading}>Loading...</div>}
      <ul style={styles.resultsList}>
        {results.map((job, index) => (
          <li key={index} style={styles.resultItem}>
            <h3 style={styles.jobTitle}>{job.title}</h3>
            <p style={styles.companyName}>{job.company}</p>
            <button
              style={styles.applyButton}
              onClick={() => handleApply(job)} // Call the handleApply function
            >
              Apply
            </button>
          </li>
        ))}
      </ul>

      {/* Static Companies Section */}
      <div style={styles.staticCompaniesContainer}>
        <h3 style={styles.heading}>Available Positions</h3>
        {staticCompanies.map((company, index) => (
          <div key={index} style={styles.staticCompanyItem}>
            <div>
              <h4 style={styles.jobTitle}>{company.title}</h4>
              <p style={styles.companyName}>{company.name}</p>
            </div>
            <button
              style={styles.applyButton}
              onClick={() => alert(`Applying for ${company.title} at ${company.name}`)}
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSearch;