import React, { useState } from 'react';
import { FaSave } from '../assets/icons/icons';
import './css/ELoginPage.css';
import msLogo from '../assets/images/ms-logo.png';
import { useNavigate } from 'react-router-dom';

const ELoginPage = () => {
  const [email, setEmail] = useState('');
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();

    setFlipped(true); // start flip animation

    // navigate after animation (matches CSS transition: 0.8s)
    setTimeout(() => {
      navigate('/StartPage');
    }, 400);
  };

  return (
    
    <div className="login-page flip-wrapper">
      <div className={`flip-card ${flipped ? 'flipped' : ''}`}>

        <div className="flip-side">
          <div className="login-container">

            <button className="ms-login-btn">
              <img src={msLogo} alt="Microsoft" className="ms-logo" />
              Microsoft Login
            </button>

            <h2>Welcome, Please Login</h2>
            <p className="or-text">Or, Login by providing your email</p>

            <form onSubmit={handleSave}>
              <div className="app-field">
                <input
                  type="email"
                  className="app-input"
                  placeholder=" "
                />
                <label>
                  {'Email address *'.split('').map((char, i) => (
                    <span key={i} style={{ '--i': i }}>
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </label>
              </div>


              <button type="submit" className="app-btn">
                <FaSave /> Save
              </button>
            </form>

          </div>
        </div>
     <div className="flip-side flip-back">
    </div>
      </div>
    </div>
  );
};

export default ELoginPage;
