import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordPage.css';

const CORRECT_PASSWORD = 'r';

function PasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setAnimate(true);
      setTimeout(() => {
        navigate('/home');
      }, 3000); // Duration of the animation
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className={`password-page-container ${animate ? 'zoom-in' : ''}`}>
      <form onSubmit={handleSubmit} className={`password-page-form ${animate ? 'hide' : ''}`}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password-input"
        />
        <button type="submit" className="access-button">Access the Vault</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      {animate && (
        <div className="animation-container">
          <img src="key.png" alt="Key" className="key" />
          <img src="lock.webp" alt="Lock" className="lock" />
        </div>
      )}
    </div>
  );
}

export default PasswordPage;
