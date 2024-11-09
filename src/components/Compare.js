import React, { useState } from 'react';
import axios from 'axios';
import './Compare.css';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

function Compare() {
  const [word1, setWord1] = useState('');
  const [word2, setWord2] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCompare = async () => {
    if (!word1 || !word2) {
      setResult('Please enter both words.');
      return;
    }
    setIsLoading(true);
    setResult('');
    try {
      const response = await axios.post(`${apiUrl}/compare`, { word1, word2 });
      setResult(response.data.result);
    } catch (error) {
      setResult('An error occurred.');
    }
    setIsLoading(false);
  };

  return (
    <div className="compare-container">
      <div className="compare-form">
        <div className="input-container">
          <input
            type="text"
            className="compare-input"
            value={word1}
            onChange={(e) => setWord1(e.target.value)}
            placeholder="word1"
          />
        </div>
        <button className="compare-button" onClick={handleCompare}>
          compare
        </button>
        <div className="input-container">
          <input
            type="text"
            className="compare-input"
            value={word2}
            onChange={(e) => setWord2(e.target.value)}
            placeholder="word2"
          />
        </div>
      </div>
      {isLoading && <div className="loading-message">Loading...</div>}
      {result && <div className="result-message">{result}</div>}
    </div>
  );
}

export default Compare;