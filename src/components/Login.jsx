// src/components/Login.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Login.css';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('Student');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const user = await login(data.email, data.password);
      navigate(user.userType === 'Student' ? '/student-form' : '/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="user-type-selector">
        <button onClick={() => setUserType('Student')}>Student</button>
        <button onClick={() => setUserType('Placement Officer')}>Placement Officer</button>
      </div>
      <motion.form
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit(onSubmit)}
        className="login-form"
      >
        <h2>{userType} Login</h2>
        <div>
          <label>Email</label>
          <input {...register('email', { required: true })} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...register('password', { required: true })} />
        </div>
        <button type="submit">Login</button>
        {error && <span className="error">{error}</span>}
      </motion.form>
    </div>
  );
};

export default Login;
