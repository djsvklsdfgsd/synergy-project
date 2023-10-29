import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Navigation from './components/Navigation/Navigation.jsx';
import Login from './components/Login/Login.jsx';
import Messages from './components/Messages/Messages.jsx';
import Registration from './components/Registration/Registration.jsx'

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </div>
  );
}

export default App;