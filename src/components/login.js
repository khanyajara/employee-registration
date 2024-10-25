import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './login.css';

const Auth = ({ employees, deleteEmployee, handleUpdate }) => { // Pass props if needed
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState('');
  
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { username, email, password } = formData;

    if (!email || !password || (!isLogin && !username)) {
      setErrors('All fields are required.');
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrors('Please enter a valid email address.');
      return false;
    }

    if (!isLogin && password.length < 6) {
      setErrors('Password must be at least 6 characters long.');
      return false;
    }

    setErrors('');
    return true;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem(formData.email, JSON.stringify(formData));
      setMessage('Signup successful! You can now log in.');
      setIsLogin(true);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const storedUser = localStorage.getItem(formData.email);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.password === formData.password) {
          setMessage('Login successful!');
          navigate('/Home'); // Navigate to Home route on successful login
        } else {
          setMessage('Invalid password.');
        }
      } else {
        setMessage('User not found.');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      <form onSubmit={isLogin ? handleLogin : handleSignup}>
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors && <p className="error-message">{errors}</p>}
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
      </p>
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default Auth;
