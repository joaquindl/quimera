import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      return;
    }
    const success = await signup(username, password, confirmPassword);
    if (success) {
      setMessage('User registered successfully');
      navigate('/');
    } else {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
