import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Messaging = ({ darkMode }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch initial messages from the server
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim()) return; // Prevent sending empty messages

    const newMessage = {
      text: message,
      timestamp: new Date().toLocaleTimeString(), // Add timestamp
    };

    try {
      await axios.post('/api/messages', newMessage);
      setMessages([...messages, newMessage]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: darkMode ? '#333' : '#f9f9f9',
      color: darkMode ? '#fff' : '#000',
    },
    messageList: {
      listStyleType: 'none',
      padding: 0,
      margin: '20px 0',
      width: '100%',
      maxWidth: '600px',
      backgroundColor: darkMode ? '#444' : '#fff',
      borderRadius: '5px',
      overflowY: 'auto',
      maxHeight: '400px', // Limit height of message list
    },
    messageItem: {
      padding: '10px',
      borderBottom: `1px solid ${darkMode ? '#555' : '#ddd'}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    input: {
      width: '100%',
      maxWidth: '600px',
      padding: '10px',
      borderRadius: '5px',
      border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
      marginBottom: '10px',
      backgroundColor: darkMode ? '#555' : '#fff',
      color: darkMode ? '#fff' : '#000',
    },
    button: {
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: darkMode ? '#007bff' : '#0056b3',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: darkMode ? '#0056b3' : '#007bff',
    },
    loading: {
      color: '#999',
      fontSize: '16px',
      margin: '20px 0',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Messaging</h2>
      {loading ? (
        <div style={styles.loading}>Loading messages...</div>
      ) : (
        <ul style={styles.messageList}>
          {messages.map((msg, index) => (
            <li key={index} style={styles.messageItem}>
              <span>{msg.text}</span>
              <span style={{ fontSize: '12px', color: '#aaa' }}>{msg.timestamp}</span>
            </li>
          ))}
          <div ref={messagesEndRef} />
        </ul>
      )}
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSend} style={styles.button}>Send</button>
    </div>
  );
};

export default Messaging;