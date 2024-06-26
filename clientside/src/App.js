import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/register';
import Home from './components/home';
import Addnewproduct from './components/addnewproduct';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
   <BrowserRouter>
    <Routes>
      <Route path = "/Login" element = {<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/addProduct" element={<Addnewproduct />} />
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
