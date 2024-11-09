import React, { useState } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/learner';

const ImportWords = () => {
  const [username, setUsername] = useState('');
  const [wordsText, setWordsText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const wordsArray = wordsText.split('\n').filter(word => word.trim() !== '');

    const data = {
      username: username,
      words: wordsArray
    };

    axios.post(apiUrl + '/addWords', data)
  };

  return (
    <div>
      <h2>Import Words</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label><br />
          <input 
            type="text" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Words (one per line):</label><br />
          <textarea 
            value={wordsText} 
            onChange={e => setWordsText(e.target.value)} 
            rows="10" 
            cols="50"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ImportWords;