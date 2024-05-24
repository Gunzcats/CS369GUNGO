const { sql, poolPromise } = require('../config/database'); // เชื่อมต่อกับฐานข้อมูล
const bcrypt = require('bcrypt'); // สำหรับ hash รหัสผ่าน
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
import React, { createContext, useState, useEffect } from 'react'; // เพิ่ม useEffect ที่นี่


useEffect(() => {
  const storedToken = localStorage.getItem('token');
  if (storedToken) {
    try {
      setToken(storedToken);
      setUser(jwtDecode(storedToken)); 
    } catch (error) {
      if (error instanceof InvalidTokenError) { // ตรวจสอบ error type
        logout(); // Logout ผู้ใช้ถ้า token ไม่ถูกต้อง
      }
    }
  }
}, []);


const authController = {
  async register(req, res, next) {
    try {
      // 1. รับข้อมูลจาก request body
      const { username, password} = req.body;

      // 2. ตรวจสอบความถูกต้องของข้อมูล (validation)
      // ... (ตรวจสอบว่า username, passwordไม่เป็นค่าว่าง, รูปแบบถูกต้อง, etc.)
      if (!username || !password) {
        throw new Error('All fields are required');
      }
      const existingUser = await userModel.getUserByUsername(username); // สร้างฟังก์ชันนี้ใน userModel
        if (existingUser) {
          return res.status(409).json({ message: `Username already exists ${username}` }); 
    }

      // 3. Hash รหัสผ่าน
      const hashedPassword = await bcrypt.hash(password, 10); // 10 คือ salt rounds

      // 4. สร้างผู้ใช้ในฐานข้อมูล
      const newUser = await userModel.createUser({ 
        username, 
        password: hashedPassword
      });

      // 5. ตอบกลับ client
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      next(err); // ส่ง error ไปให้ error handler จัดการ
    }
  },

  async login(req, res, next) {
    try {
      // 1. รับข้อมูลจาก request body
      const { username, password } = req.body;

      // 2. ตรวจสอบความถูกต้องของข้อมูล (validation)
      // ...
      if (!username || !password) {
        const error = new Error('Username and password are required');
        error.statusCode = 400; // Bad Request
        throw error;
      }


      // 3. ดึงข้อมูลผู้ใช้จากฐานข้อมูล
      const user = await userModel.getUserByUsername(username);  

      // 4. ตรวจสอบรหัสผ่าน
      if (!user) {
        const error = new Error('Invalid user');
        error.statusCode = 401; // Unauthorized
        throw error; 
      }
      if (!(await bcrypt.compare(password, user.password))) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401; // Unauthorized
        throw error; 
      }

      // 5. สร้างและส่ง token (ถ้าใช้ JWT)
      // ...
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      // 6. ตอบกลับ client
      res.json({ message: 'Login successful', user }); // อาจส่งข้อมูลผู้ใช้กลับไปด้วย
    } catch (err) {
      console.error('Login error:', err); // log error ที่ชัดเจนขึ้น
    if (err.message === 'Error getting user from database') {
      return res.status(500).json({ message: 'Internal server error' }); 
    }
    return res.status(500).json({ message: err.message });
    }
  },

  async logout(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]; // ดึง token จาก header
      // ถอดรหัส token เพื่อดู expiration time
      const decoded = jwt.decode(token);
      // คำนวณเวลาที่เหลือ
      const remainingTime = decoded.exp - Math.floor(Date.now() / 1000); 
      // สร้าง token ใหม่ที่มี expiration time เหลือน้อยมาก (เช่น 1 วินาที)
      const newToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: remainingTime + 1 }); 
      res.json({ message: 'Logout successful', newToken }); // ส่ง token ใหม่กลับไปให้ client
    } catch (err) {
      next(err);
    }
  }



};

module.exports = authController;
