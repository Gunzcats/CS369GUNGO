import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrors] = useState('');
  const { login, setError } = useAuthContext();
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    let newErrors = { username: '', password: ''};

    if (!username.trim()) {
      newErrors.username = 'Please enter a username';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Please enter a password';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('/api/auth/register', { username, password});
        // ลงทะเบียนสำเร็จ ให้ login อัตโนมัติ
        await login({ username, password });
        navigate('/');
      } catch (err) {
        setErrors(err.response?.data?.error || 'An error occurred');
      }
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={username} onChange={handleChange} />
        
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={handleChange} />
        
      </div>
      <button type="submit">Register</button>
      
    </form>
    </div>
  );
}

export default Register;
