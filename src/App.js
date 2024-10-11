import React, { useState } from 'react';
import axios from 'axios';
import HistoryPanel from './components/HistoryPanel';
import './App.css';

function App() {
  const [inputs, setInputs] = useState(['']);
  const [response, setResponse] = useState(null);
  const [username, setUsername] = useState('username');

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

  const highlightWords = (result, words = []) => {
    if (!result) return result;
    
    // escape regex
    const escapedWords = words.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escapedWords.join('|')})`, 'gi');
    console.log(regex)
    const parts = result.split(regex);
    
    // highlight only key words
    return parts.map((part, index) =>
      words.includes(part) ? (
        <span key={index} className="highlight">{part}</span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  const handleInputChange = (index, event) => {
    const values = [...inputs];
    values[index] = event.target.value;
    setInputs(values);
  };

  const handleAddInput = () => {
    setInputs([...inputs, '']);
  };

  const handleRemoveInput = (index) => {
    if (inputs.length > 1) {
      const values = [...inputs];
      values.splice(index, 1);
      setInputs(values);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResponse(null);

    const data = {
      username: username,
      words: inputs,
    };

    try {
      // post request
      const result = await axios.post(`${apiUrl}/generateSentence`, data);

      // set response
      setResponse(result.data);

      // clear inputs
      setInputs(['']);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="app">

      <div className="username-container">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="username-input"
        />
      </div>

      <div>
        <HistoryPanel username={username} />
      </div>

      {/* display results */}
      <div className="response-container">
        {response && response.result && (
          <div className="response">
            {highlightWords(response.result, response.words)}
          </div>
        )}
      </div>

      {/* inputs */}
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          {/* render inputs */}
          {inputs.map((input, index) => (
            <div key={index} className="input-group">
              <button
                type="button"
                onClick={() => handleRemoveInput(index)}
                className="minus-button"
                disabled={inputs.length <= 1}
              >
                -
              </button>
              <input
                type="text"
                value={input}
                onChange={(event) => handleInputChange(index, event)}
                className="text-input"
              />
              <button type="button" onClick={handleAddInput} className="plus-button">
                +
              </button>
            </div>
          ))}
          <button type="submit" className="submit-button">
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;