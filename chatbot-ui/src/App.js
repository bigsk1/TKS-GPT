import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import MessageContent from './MessageContent';
import Prompts from './Prompts';
import SavedChats from './SavedChats';

function App() {
  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  
  const [message, setMessage] = useState('');
  const processAIResponse = (response) => {
    return response.replace(/^(?<!\n)1\.(?!\s*\n)\s*/, "");
  };
  const [chatHistory, setChatHistory] = useState([]);
  const [showPrompts, setShowPrompts] = useState(false);
  const [showSavedChats, setShowSavedChats] = useState(false);
  const [savedChats, setSavedChats] = useState([]);
  const [isSending, setIsSending] = useState(false);

  const handlePromptSelect = (prompt) => {
    setMessage(prompt);
    setShowPrompts(false);
  };

  const togglePrompts = () => {
    setShowPrompts(!showPrompts);
  };

  const toggleSavedChats = () => {
    setShowSavedChats(!showSavedChats);
  };

  // below statement allows app to work on both http and https at the same time - if only going to use in https setup then remove 5 lines of code and replace with 
  // const apiUrl = process.env.NODE_ENV === "production" ? `${window.location.protocol}//${window.location.hostname}/chat` : "http://0.0.0.0:5000/chat";
  const isProduction = process.env.NODE_ENV === "production";
  const isHttps = window.location.protocol === "https:";

  const apiUrl = isProduction && isHttps
  ? `${window.location.protocol}//${window.location.hostname}/chat`
  : `${window.location.protocol}//${window.location.hostname}:5000/chat`;

  useEffect(() => {
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [chatHistory]);

  const handleKeyPress = debounce((event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }, 500);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const sendMessage = async () => {
    // Check if the message is empty or only contains whitespace
    if (!message.trim()) {
      // If the message is empty or only contains whitespace, do nothing
      return;
    }
  
    try {
      // Disable the button
      setIsSending(true);
  
      // Include the entire conversation history in the API call
      const conversation = chatHistory.map((chat) => ({
        from: chat.from,
        message: chat.message,
      }));
  
      const response = await axios.post(apiUrl, {
        message,
        chat_history: conversation,
      });
  
      console.log('Response:', response);
  
      let aiMessage = response.data.message;
  
      console.log('AI Message:', aiMessage);
  
      if (!aiMessage) {
        aiMessage = processAIResponse(aiMessage);
      }
  
      setChatHistory([
        ...chatHistory,
        { message, from: 'user' },
        { message: processAIResponse(aiMessage), from: 'bot' },
      ]);
      setMessage('');
    } catch (error) {
      console.log('Error:', error);
      console.log('Error response:', error.response);
      console.log('Error request:', error.request);
    } finally {
      // Re-enable the button
      setIsSending(false);
    }
  };

  return (
    <div className="App">
      <button onClick={toggleSavedChats} className="saved-chats-btn">
        Saved Chats
      </button>
      <div className="banner">
        <h1>GPT Ai Chat</h1>
      </div>
      <div className="chat-container">
        {chatHistory.map((chat, index) => (
          <div key={index} className={chat.from === 'user' ? 'user-message' : 'bot-message'}>
            <MessageContent from={chat.from} message={chat.message} />
          </div>
        ))}
      </div>
      <form onSubmit={handleFormSubmit} className="input-container">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={handleKeyPress}
          className="form-control chat-input"
          placeholder="Got questions? I've got bytes of knowledge!...."
          id="userMessage"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          style={{ fontSize: "16px" }}
        />
        <button type="submit" disabled={isSending}>
          Send it!
        </button>
      </form>
      <Prompts
        onSelect={handlePromptSelect}
        showPrompts={showPrompts}
        togglePrompts={togglePrompts}
      />
      <SavedChats
        showSavedChats={showSavedChats}
        toggleSavedChats={toggleSavedChats}
        setCurrentChat={setChatHistory}
        clearCurrentChat={() => setChatHistory([])}
        currentChat={chatHistory}
        savedChats={savedChats}
        setSavedChats={setSavedChats}
      />
    </div>
  );
}

export default App;
