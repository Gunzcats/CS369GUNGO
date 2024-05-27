import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';
import ThammasartLogo from '../styles/Thammasart.png'; // นำเข้ารูปภาพ
import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'

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
        newErrors.username = 'Please enter your username or username.';
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
       

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={ThammasartLogo}
            alt="Thammasart U."
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  value={username}
                  autoComplete="username"
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
            <button
            type="submit"
              className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              
            >
  Sign in
</button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="/register" className="font-semibold leading-6 text-orange-500 hover:text-orange-400">
              Register
            </a>
          </p>
        </div>
      </div>
      


      </div>
      
      );
}

export default Login;