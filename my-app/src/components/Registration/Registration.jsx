import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css'

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistration = () => {
    if (username !== '' && password !== '') {
      fetch('http://localhost:3004/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
        .then(response => {
          if (response.ok) {
            navigate('/home');
          } else {
            alert('Registration failed');
          }
        })
        .catch(error => {
          console.error('Error during registration:', error);
        });
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className='container'>
      <div className='registration-form'>
        <h1>Регистрация</h1>
        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleRegistration}>Зарегистрироваться</button>
      </div>
    </div>
  );
}

export default Registration;