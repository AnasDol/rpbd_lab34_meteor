import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        console.error(error.reason);
      } else {
        console.log('Logged in successfully!');
        setLoggedIn(true); // Set the state to indicate successful login
      }
    });
  };


  if (isLoggedIn) {
    return <Navigate to="/app" />;
  }

  return (
    <div>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;