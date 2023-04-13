import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import robotHead from './happyb.gif';


function App() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  
  const apiUrl = process.env.NODE_ENV === "production" ? `${window.location.protocol}//${window.location.hostname}/chat` : "http://0.0.0.0:5000/chat";

  useEffect(() => {
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [chatHistory]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const sendMessage = async () => {
    try {
      const response = await axios.post(apiUrl, { message });
  
      console.log('Response:', response);
  
      let aiMessage = response.data.message;
  
      console.log('AI Message:', aiMessage);
  
      if (!aiMessage) {
        aiMessage = 'I\'m sorry, I didn\'t understand that. Wayne says I\'m a dumbass. Could you rephrase your question?';
      }
  
      setChatHistory([...chatHistory, { message, from: 'user' }, { message: aiMessage, from: 'bot' }]);
      setMessage('');
    } catch (error) {
      console.log('Error:', error);
      console.log('Error response:', error.response);
      console.log('Error request:', error.request);
    }
  };

  return (
    <div className="App">
      <div className="banner">
        <h1>TKS-GPT Ai Chat</h1>
      </div>
      <div className="chat-container">
    {chatHistory.map((chat, index) => (
      <div key={index} className={chat.from === 'user' ? 'user-message' : 'bot-message'}>
        {chat.from === 'bot' && <img src={robotHead} alt="Robot head" className="robot-head" />}
        <p>{chat.message}</p>
      </div>
      ))}
    </div>
      <form onSubmit={handleFormSubmit} className="input-container">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="form-control chat-input"
          placeholder="Got questions? I've got bytes of knowledge!...."
          id="userMessage"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          style={{ fontSize: "16px" }}
        />
        <button type="submit">Send it!</button>
      </form>
    </div>
  );
}

export default App;
