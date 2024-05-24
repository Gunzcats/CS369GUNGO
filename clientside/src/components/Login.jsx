import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';

function Login() {
    const { login, setError } = useAuthContext(); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const validateForm = () => {
      let isValid = true;
      let newErrors = { username: '', password: '' };
  
      if (!username.trim()) {
        newErrors.username = 'Please enter your username or email.';
        isValid = false;
      }
  
      if (!password.trim()) {
        newErrors.password = 'Please enter your password.';
        isValid = false;
      }
  
      setErrors(newErrors);
      return isValid;
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        if (name === 'username' ){
            setUsername(value);
        } else if (name === 'password'){
            setPassword(value);
        }
    };

    const handleSubmit =async (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (validateForm()) {
          try {
            const loginResult = await login({ username, password });
            if (loginResult.success) { // Check if login was successful
              navigate('/');
            }else {
              setError(loginResult.message || 'Login failed'); // Handle other errors
            }
          } catch (err) {
            setError(err.message || 'Login failed');
          }finally {
            setIsLoading(false); // หยุด loading ไม่ว่าจะสำเร็จหรือไม่
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
          <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Login'}
                </button>
          {errors.username && <p className="error">{errors.username}</p>}
          {errors.password && <p className="error">{errors.password}</p>}
        </form>
        <Link to="/register">
          <button type="button">Register</button>
        </Link>
      </div>
      );
}

export default Login;