import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chat.css';

function Chat() {
  const [conversationID, setConversationID] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('username');
  const [systemPrompt, setSystemPrompt] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080/chat';

  useEffect(() => {

  }, [username]);

  const handleSendMessage = async () => {
    let currentConversationID = conversationID;
    
    
    if (!inputMessage.trim()) return;
    if (conversationID === null) {
      currentConversationID = -1;
      setConversationID(-1);
    }
    const data = {
      conversationID: currentConversationID,
      message: inputMessage,
      systemPrompt,
      username,
    };

    console.log(data)

    try {
      const response = await axios.post(`${apiUrl}/newMessage`, data);
      console.log(response)
      setMessages([...messages, { sender: 'You', text: inputMessage }, { sender: 'AI', text: response.data.aiResponse }]);
      setConversationID(response.data.conversationID)
      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <input
          type="text"
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          placeholder="system prompt"
        />
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'You' ? 'user-message' : 'ai-message'}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;