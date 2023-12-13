import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../imports/ui/styles.css'; // Import the styles

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        console.error('Login error:', error.reason);
      } else {
        console.log('Logged in successfully!');

        // Save the token to localStorage
        const token = Meteor.userId();
        localStorage.setItem('authToken', token);

        // After successful login, redirect to the desired page
        navigate('/');
      }
    });
  };

  return (
    <div className="login-container"> {/* Apply the container style */}
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;