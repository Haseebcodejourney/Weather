import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../src/style/login.css';  // Assuming this CSS is imported here

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'user' && password === 'password') {
      navigate('/home');
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h3>Welcome Back!</h3>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input 
            type="text" 
            placeholder="Enter Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          
          <button type="submit">Login</button>
        </form>

        <p className="login-text">Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
