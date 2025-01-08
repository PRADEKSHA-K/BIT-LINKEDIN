import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlacementInfo = ({ darkMode }) => {
  const [placementData, setPlacementData] = useState([
    { company: 'Google', position: 'Software Engineer', number_of_positions: 10 },
    { company: 'Amazon', position: 'Product Manager', number_of_positions: 5 },
    { company: 'Microsoft', position: 'Data Scientist', number_of_positions: 8 },
    { company: 'Apple', position: 'UX Designer', number_of_positions: 6 },
    { company: 'Facebook', position: 'DevOps Engineer', number_of_positions: 7 },
  ]);

  const [placementSummary, setPlacementSummary] = useState({
    totalCompanies: 5,
    totalPlaced: 3,
    totalWaiting: 1,
  });

  useEffect(() => {
    const fetchPlacementInfo = async () => {
      try {
        // Assuming the response contains a summary object with these fields
        const summaryResponse = await axios.get('/api/placement-summary');
        setPlacementSummary(summaryResponse.data);
      } catch (error) {
        console.error('Error fetching placement info:', error);
      }
    };

    fetchPlacementInfo();
  }, []);

  return (
    <div style={styles.container(darkMode)}>
      <h2 style={styles.heading(darkMode)}>Placement Information</h2>

      {/* Placement Summary Table */}
      <h3 style={styles.subHeading(darkMode)}>Placement Summary</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th(darkMode)}>Total Companies Attended</th>
            <th style={styles.th(darkMode)}>Total Students Placed</th>
            <th style={styles.th(darkMode)}>Total Students in Waiting List</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.td(darkMode)}>{placementSummary.totalCompanies}</td>
            <td style={styles.td(darkMode)}>{placementSummary.totalPlaced}</td>
            <td style={styles.td(darkMode)}>{placementSummary.totalWaiting}</td>
          </tr>
        </tbody>
      </table>

      {/* Placement Data List */}
      <h3 style={styles.subHeading(darkMode)}>Companies and Positions</h3>
      

      {/* Table for Company Vacancies */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th(darkMode)}>Company Name</th>
            <th style={styles.th(darkMode)}>Position</th>
            <th style={styles.th(darkMode)}>Number of Vacant Places</th>
          </tr>
        </thead>
        <tbody>
          {placementData.map((info, index) => (
            <tr key={index}>
              <td style={styles.td(darkMode)}>{info.company}</td>
              <td style={styles.td(darkMode)}>{info.position}</td>
              <td style={styles.td(darkMode)}>{info.number_of_positions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Styles for the table and container
const styles = {
  container: (darkMode) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: darkMode ? '#2C2C2C' : '#F0F0F0',
    color: darkMode ? '#F9F9F9' : '#333',
    minHeight: '100vh', // Full height of the viewport
  }),
  heading: (darkMode) => ({
    fontSize: '2rem',
    marginBottom: '20px',
    color: darkMode ? '#FFD700' : '#007bff', // Softer color in dark mode
  }),
  subHeading: (darkMode) => ({
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: darkMode ? '#FFD700' : '#007bff', // Softer color in dark mode
  }),
  table: {
    width: '100%',
    maxWidth: '600px', // Limit the width of the table
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  th: (darkMode) => ({
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'center', // Center align text in header
    backgroundColor: darkMode ? '#444' : '#f2f2f2',
    color: darkMode ? '#F9F9F9' : '#333',
  }),
  td: (darkMode) => ({
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'center', // Center align text in body
    backgroundColor: darkMode ? '#555' : '#fff',
    color: darkMode ? '#F9F9F9' : '#333',
  }),
  list: {
    listStyleType: 'none',
    padding: '0',
    width: '100%',
    maxWidth: '600px', // Limit the width of the list
  },
  listItem: (darkMode) => ({
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'center', // Center align text in list items
    backgroundColor: darkMode ? '#555' : '#fff',
    color: darkMode ? '#F9F9F9' : '#333',
  }),
};

export default PlacementInfo;