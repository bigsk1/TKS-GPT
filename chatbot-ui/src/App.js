import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents the default behavior of creating a new line
      sendMessage(); // Sends the message
    }
  }; 

  const sendMessage = async () => {
    const response = await axios.post('http://127.0.0.1:5000/chat', { message });

    const aiMessage = response.data.message;

      
    setChatHistory([...chatHistory, { message, from: 'user' }, { message: aiMessage, from: 'bot' }]);
    setMessage('');
  };

  return (
    <div className="App">
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