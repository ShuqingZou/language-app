import React, { useState } from 'react';
import axios from 'axios';
import './Express.css';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/expression';

const Express = () => {
  const [sentence, setSentence] = useState('');
  const [style, setStyle] = useState('');
  const [response, setResponse] = useState(null);

  const styles = [
    'business formal',
    'casual with a friend',
    'respectful to an elder',
    'respectful to an emperor of ancient china',
    'to your girlfriend who is very angry',
    'formally to a professor',
    'sarcastic towards your boss',
    'simple so even a 5 year old can understand',
    'as a fortune cookie message',
    'with excessive formality',
    'overly use online slang and memes',
    'like nietzsche',
    'as a motivational quote',
    'marketing advertisement'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      sentence: sentence,
      style: style,
    };
    try {
      const r = await axios.post(apiUrl, data);
      setResponse(r.data);
    } catch (error) {
      console.error('Error sending expression request:', error);
    }
  };

  return (
    <div className="express-container">
      <div className="input-section">
        <form onSubmit={handleSubmit} className="express-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="enter a sentence..."
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              className="express-input"
            />
          </div>
          <div className="form-group">
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="express-select"
            >
              
              {styles.map((styleOption, index) => (
                <option key={index} value={styleOption}>
                  {styleOption}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
      {response && (
        <div className="output-section">
          <p className="result-text">{response.result}</p>
        </div>
      )}
    </div>
  );
};

export default Express;