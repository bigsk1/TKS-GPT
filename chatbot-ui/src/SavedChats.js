import React, { useState, useEffect } from 'react';
import './SavedChats.css';

const SavedChats = ({ showSavedChats, toggleSavedChats, setCurrentChat, clearCurrentChat, currentChat }) => {
  const [savedChats, setSavedChats] = useState([]);

  useEffect(() => {
    const storedChats = localStorage.getItem('savedChats');
    if (storedChats) {
      setSavedChats(JSON.parse(storedChats));
    }
  }, []);

  const saveCurrentChat = () => {
    const newSavedChats = [...savedChats, { id: Date.now(), chat: [...currentChat] }];
    setSavedChats(newSavedChats);
    localStorage.setItem('savedChats', JSON.stringify(newSavedChats));
    clearCurrentChat();
  };

  const startNewChat = () => {
    saveCurrentChat();
    clearCurrentChat();
    toggleSavedChats();
  };  

  const loadChat = (chat) => {
    setCurrentChat(chat);
    toggleSavedChats();
  };

  const deleteChat = (id) => {
    const filteredChats = savedChats.filter((chat) => chat.id !== id);
    setSavedChats(filteredChats);
    localStorage.setItem('savedChats', JSON.stringify(filteredChats));
  };

  return (
    <div className={`saved-chats-container ${showSavedChats ? 'visible' : 'hidden'}`}>
      <button onClick={toggleSavedChats} className="close-saved-chats-btn">
        &times;
      </button>
      <h2>Saved Chats</h2>
      <button onClick={startNewChat} className="start-new-chat-btn">
        Start New Chat
      </button>
      <ul className="saved-chats-list">
        {savedChats.map((savedChat) => (
          <li key={savedChat.id}>
            <button onClick={() => loadChat(savedChat.chat)} className="load-chat-btn">
              Load
            </button>
            <span className="saved-chat-preview">{savedChat.chat[0]?.message.slice(0, 75)}...</span>
            <button onClick={() => deleteChat(savedChat.id)} className="delete-chat-btn">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  };
  
  export default SavedChats;
