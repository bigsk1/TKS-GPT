import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  
  // Add this line to define the apiUrl
  const apiUrl = process.env.NODE_ENV === "production" ? `${window.location.protocol}//${window.location.hostname}/chat` : "http://127.0.0.1:5000/chat";

  useEffect(() => {
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [chatHistory]);
  

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents the default behavior of creating a new line
      sendMessage(); // Sends the message
    }
  }; 

  const sendMessage = async () => {
    const response = await axios.post(apiUrl, { message });

    const aiMessage = response.data.message;

      
    setChatHistory([...chatHistory, { message, from: 'user' }, { message: aiMessage, from: 'bot' }]);
    setMessage('');
  };

  return (
    <div className="App">
       <div className="banner">
       <h1>TKS-GPT Ai Chat</h1>
    </div>
      <div className="chat-container">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`message ${msg.from}`}>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="form-control"
          placeholder="Type your message ...."
          id="userMessage"
        />
        <button onClick={sendMessage}>Send it!</button>
      </div>
    </div>
  );
} 

export default App;