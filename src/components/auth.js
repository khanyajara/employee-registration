// Auth.js
import React, { useState } from 'react';
import Signup from './Sign-up';
import Login from './login';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  const handleSignup = (data) => {
    
    localStorage.setItem(data.email, JSON.stringify(data));
    setMessage('Signup successful! You can now log in.');
    setIsLogin(true);
  };

  const handleLogin = (data) => {
    const storedUser = localStorage.getItem(data.email);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.password === data.password) {
        setMessage('Login successful!'); 
      } else {
        setMessage('Invalid password.');
      }
    } else {
      setMessage('User not found.');
    }
  };

  return (
    <div>
      {isLogin ? (
        <>
          <Login onLogin={handleLogin} />
          
        </>
      ) : (
        <>
          <Signup onSignup={handleSignup} />
          <p onClick={() => setIsLogin(true)}>Already have an account? Login</p>
        </>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Auth;
