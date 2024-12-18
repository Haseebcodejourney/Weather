import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Adjust import path based on your file structure
import { createUserWithEmailAndPassword } from 'firebase/auth';
import '../../src/style/signup.css';  // Assuming this CSS is imported here

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      alert('Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <h3>Create Your Account</h3>
        <form onSubmit={handleSignup}>
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Enter Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
