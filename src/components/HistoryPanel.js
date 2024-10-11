import React, { useState } from 'react';
import './HistoryPanel.css';

function HistoryPanel({ username }) {
  const [isOpen, setIsOpen] = useState(false);
  const [histories, setHistories] = useState([]);
  const [error, setError] = useState('');

  const togglePanel = async () => {
    if (!username) {
      setError('username not provided.');
      return;
    }

    if (!isOpen) {
      try {
        console.log(`/api/learner/getHistory?username=${encodeURIComponent(username)}`);
        const response = await fetch(
          `http://localhost:8080/api/learner/getHistory?username=${encodeURIComponent(username)}`
        );
        
        if (!response.ok) {
          throw new Error('failed to fetch history');
        }
        const data = await response.json();
        console.log(data)
        setHistories(data);
        setError('');
      } catch (error) {
        console.error('error fetching history:', error);
        setError('unable to fetch history.');
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="right-container">
        {/* clock */}
        <ClockIcon onClick={togglePanel} />
      </div>

      {/* error message display */}
      {error && <p className="error-message">{error}</p>}

      {isOpen && <div className="overlay" onClick={togglePanel}></div>}
      <div className={`panel ${isOpen ? 'open' : ''}`}>
        <div style={{ padding: '20px' }}>
          <h2>search history</h2>
          {histories.length > 0 ? (
            <ul>
              {histories.map((history) => (
                <li key={history.id} style={{ marginBottom: '15px' }}>
                  <strong>search term:</strong> {history.searchTerm}
                  <br />
                  <strong>search result:</strong> {history.searchResult}
                </li>
              ))}
            </ul>
          ) : (
            <p>no history available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryPanel;

/* ezpz clock icon */
function ClockIcon({ onClick }) {
  return (
    <span onClick={onClick} className="clock-icon" role="button" aria-label="Open Search History">
      🕒
    </span>
  );
}