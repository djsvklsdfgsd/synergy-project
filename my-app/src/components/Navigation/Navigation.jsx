import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navigation.css';

function Logout() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/login') {
    return null;
  }
  if (location.pathname === '/registration') {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    navigate('/');
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Выйти
    </button>
  );
}

function Navigation() {
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }
  if (location.pathname === '/registration') {
    return null;
  }

  return (
    <nav className="navbar">
      <ul>
        {location.pathname !== '/home' && (
          <li>
            <Link to="/home">На главную</Link>
          </li>
        )}
      </ul>
      <div className="logout-container">
        <Logout />
      </div>
    </nav>
  );
}

export default Navigation;