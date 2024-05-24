import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode, InvalidTokenError } from "jwt-decode";
import axios from 'axios';


const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false, // เพิ่ม isAuthenticated
  error: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // เพิ่ม state isAuthenticated



  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        setToken(storedToken);
        setUser(jwtDecode(storedToken)); 
        setIsAuthenticated(true);
      } catch (error) {
        if (error instanceof InvalidTokenError) { // ตรวจสอบ error type
          logout(); // Logout ผู้ใช้ถ้า token ไม่ถูกต้อง
        }
    }
  }
}, []);

  const login = async (userData) => {
    try {
      const response = await axios.post('/api/auth/login', userData, {
          headers: { 'Content-Type': 'application/json' },
      });
  
      // Axios automatically parses JSON responses
      const data = response.data; 
      const token = data?.token;
  
      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setToken(token);
        setUser(user);
        setError(null); // Clear any previous errors
        setIsAuthenticated(true);
        return { success: true, token, user }; // Return success object with token and user data
      }else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      // Handle Axios errors
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server error:', error.response.data);
        setError(error.response.data.message || 'Login failed'); 
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response from server:', error.request);
        setError('No response from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
        setError(error.message);
      }
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, error, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
    export const useAuthContext = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
    };