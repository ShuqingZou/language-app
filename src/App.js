import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Chat from './components/Chat';
import Quiz from './components/Quiz';
import ImportWords from './components/ImportWords';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/chat">Chat</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/importWords">Import</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/importWords" element={<ImportWords />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;