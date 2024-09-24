import React from 'react';
import '../styles/guestLogin.scss';

const GuestLogin = () => {
  const handleGuestLogin = () => {
    // Handle guest login logic here
    console.log('Logged in as guest');
  };

  return (
    <div className="guest-login-container">
      <h2>Continue as Guest</h2>
      <button onClick={handleGuestLogin}>Login as Guest</button>
    </div>
  );
};

export default GuestLogin;
