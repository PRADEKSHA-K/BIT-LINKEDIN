import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

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

const CalendarComponent = ({ darkMode }) => {
  const [events, setEvents] = useState([
    {
      title: 'Interview with ABC Company',
      start: new Date(2024, 7, 28, 10, 0),
      end: new Date(2024, 7, 28, 11, 0),
    },
    {
      title: 'Team Meeting',
      start: new Date(2024, 7, 29, 14, 0),
      end: new Date(2024, 7, 29, 15, 0),
    },
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('Enter the event title:');
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  const styles = {
    pageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: darkMode ? '#222' : '#e0e0e0',
    },
    calendarContainer: {
      width: '80%',
      maxWidth: '900px',
      height: '70vh',
      backgroundColor: darkMode ? '#333' : '#f0f0f0',
      color: darkMode ? '#f9f9f9' : '#333',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: darkMode
        ? '0px 0px 10px rgba(255, 255, 255, 0.1)'
        : '0px 0px 10px rgba(0, 0, 0, 0.1)',
      border: `2px solid #87ceeb`, // Set border color to sky blue in both modes
    },
    calendarHeader: {
      color: darkMode ? '#f9f9f9' : '#333',
      textAlign: 'center',
      marginBottom: '10px',
    },
    calendar: {
      height: '100%',
      fontSize: '14px',
      color: darkMode ? '#f9f9f9' : '#333',
      '& .rbc-event': {
        backgroundColor: darkMode ? '#87ceeb' : '#87ceeb', // Change event background color to sky blue
        color: '#fff', // Change event text color to white
      },
      '& .rbc-row-segment a': {
        color: darkMode ? '#87ceeb' : '#87ceeb', // Change event link color to sky blue
      },
      '& .rbc-row-bg': {
        '& .rbc-off-range-bg': {
          backgroundColor: darkMode ? '#444' : '#ddd', // Change off-range background color
        },
      },
      '& .rbc-day-bg': {
        border: `1px solid ${darkMode ? '#555' : '#ccc'}`, // Change day border color
      },
      '& .rbc-show-more': {
        backgroundColor: darkMode ? '#555' : '#ddd', // Change "show more" background color
        color: darkMode ? '#ffcc00' : '#333', // Change "show more" text color
      },
    },
    button: {
      backgroundColor: darkMode ? '#555' : '#ddd',
      color: darkMode ? '#ffcc00' : '#333',
      border: 'none',
      borderRadius: '4px',
      padding: '5px 10px',
      cursor: 'pointer',
      fontSize: '14px',
      margin: '0 5px',
    },
    buttonHover: {
      backgroundColor: darkMode ? '#444' : '#ccc',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 0',
    },
    monthYear: {
      flex: 1,
      textAlign: 'center',
      color: darkMode ? '#f9f9f9' : '#333',
      fontSize: '16px',
      border: darkMode ? '1px solid #555' : '2px solid #000', // Increase border width for better visibility in light mode
      borderRadius: '4px',
      padding: '5px',
      backgroundColor: darkMode ? '#444' : '#fff',
    },
  };

  const ButtonComponent = ({ label, onClick }) => (
    <button
      style={styles.button}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
      onClick={onClick}
    >
      {label}
    </button>
  );

  const Toolbar = (props) => {
    const { label, onNavigate } = props;
    return (
      <div style={styles.toolbar}>
        <ButtonComponent label="Today" onClick={() => onNavigate('TODAY')} />
        <div style={styles.monthYear}>{label}</div>
        <div>
          <ButtonComponent label="Back" onClick={() => onNavigate('PREV')} />
          <ButtonComponent label="Next" onClick={() => onNavigate('NEXT')} />
        </div>
      </div>
    );
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.calendarContainer}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          defaultView="month"
          views={['month']}
          style={styles.calendar}
          components={{
            toolbar: Toolbar,
          }}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;