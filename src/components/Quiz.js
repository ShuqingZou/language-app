import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quiz.css';

const Quiz = () => {
  const [username, setUsername] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/quiz';

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const fetchQuiz = async () => {
    if (!username) return;
    try {
      const data = { username };
      const response = await axios.post(apiUrl + '/getQuiz', data);
      const quizData = response.data;
      
      if (quizData.answers && quizData.answers.length > 0) {
        quizData.answers = shuffleArray(quizData.answers);
      }
      
      setQuiz(quizData);
      setSelectedAnswer(null);
      setIsCorrectAnswer(null);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  useEffect(() => {
    if (username !== '') {
      fetchQuiz();
    }
  }, [username]);

  useEffect(() => {
    if (feedbackMessage) {
      const timer = setTimeout(() => {
        setFeedbackMessage(null);
        fetchQuiz();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [feedbackMessage]);

  const handleAnswerClick = async (answer) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    const isCorrect = answer === quiz.correctAnswer;
    setIsCorrectAnswer(isCorrect);
    setFeedbackMessage(isCorrect ? "CORRECT" : "WRONG");

    const endpoint = isCorrect ? (apiUrl + '/correct') : (apiUrl + '/wrong');
    const payload = { username };

    try {
      await axios.post(endpoint, payload);
    } catch (error) {
      console.error("Error posting answer:", error);
    }
  };

  if (!username) {
    return (
      <div className="username-container">
        <input
          type="text"
          placeholder="Enter username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        <button onClick={() => setUsername(usernameInput)}>Submit</button>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="quiz-container">
        <div className="loading-message">Loading quiz...</div>
      </div>
    );
  }

  if (quiz.status === "failure") {
    return (
      <div className="quiz-container">
        <div className="error-message">No words detected for this user.</div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className={`feedback ${isCorrectAnswer !== null ? (isCorrectAnswer ? 'correct' : 'wrong') : ''}`}>
        {feedbackMessage}
      </div>
      <div className="quiz">
        <h2 className="question">{quiz.question}</h2>
        <div className="answers">
          {quiz.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer)}
              className={`answer-button ${
                selectedAnswer === answer
                  ? answer === quiz.correctAnswer
                    ? 'correct'
                    : 'incorrect'
                  : ''
              }`}
              disabled={!!selectedAnswer}
            >
              {answer}
            </button>
          ))}
        </div>
        <div className="score">
          {quiz.correctAnswers} / {quiz.totalAnswers}
        </div>
      </div>
    </div>
  );
};

export default Quiz;