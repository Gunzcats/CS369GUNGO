import React, { useState } from "react";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '' });

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

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {

        }
    };



    return (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={username} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={handleChange} />
          </div>
          <button type="submit">Login</button>
          {errors.username && <p className="error">{errors.username}</p>}
          {errors.password && <p className="error">{errors.password}</p>}
        </form>
      );
}

export default Login;