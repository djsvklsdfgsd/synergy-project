import React, { useEffect, useState, useRef } from 'react';
import './Messages.css'

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const messagesListRef = useRef();

  useEffect(() => {
    fetch('http://localhost:3004/allPosts')
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, []);

  const addMessage = () => {
    if (newMessage.trim() !== '') {
      const newMessageObj = {
        id: Date.now(),
        username: username,
        text: newMessage
      };

      setMessages(prevMessages => [...prevMessages, newMessageObj]);
      setNewMessage('');
    }
  };

  const deleteMessage = (id) => {
    setMessages(prevMessages => prevMessages.filter(message => message.id !== id));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addMessage();
    }
  };

  return (
    <div className="container">
      <div className="messages-container">
        <ul className="message-list" ref={messagesListRef}>
          {messages.map(message => (
            <li key={message.id}>
              <span className="username">{message.username}: </span>
              <span className="message">{message.text}</span>
              <button onClick={() => deleteMessage(message.id)}>Удалить</button>
            </li>
          ))}
        </ul>
        <div className="input-container">
          <input
            type="text"
            placeholder="Ваше имя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Введите сообщение"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={addMessage}>Добавить</button>
        </div>
      </div>
    </div>
  );
};

export default Messages;