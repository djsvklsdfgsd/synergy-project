import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username !== '' && password !== '') {
      fetch('http://localhost:3004/login', {
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
            alert('Invalid username or password');
          }
        })
        .catch(error => {
          console.error('Error during login:', error);
        });
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <h1>Авторизация</h1>
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
        <button onClick={handleLogin}>Вход</button>
        <button onClick={() => navigate('/registration')}>Регистрация</button>
      </div>
    </div>
  );
}

export default Login;