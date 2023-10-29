import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'

function Home() {
  const navigate = useNavigate();
  const handleStartButtonClick = () => {
    navigate('/messages');
  };

  return (
    <div className='container'>
      <div className='transition'>
        <div className="welcome-message">
          <p>Чтобы начать общение, нажмите на кнопку ниже.</p>
          <button className="start-button" onClick={handleStartButtonClick}>
            Начать
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;