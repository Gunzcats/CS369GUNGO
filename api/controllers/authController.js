const { sql, poolPromise } = require('../config/database'); // เชื่อมต่อกับฐานข้อมูล
const bcrypt = require('bcrypt'); // สำหรับ hash รหัสผ่าน
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

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
      const existingUser = await getUserByUsername(username); // สร้างฟังก์ชันนี้ใน userModel
        if (existingUser) {
        throw new Error('Username already exists');
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
      const request = (await poolPromise).request();
      const result = await request
      .input('username', sql.NVarChar, username)
      .query('SELECT * FROM users WHERE username = @username;');

      const user = result.recordset[0];

      // 4. ตรวจสอบรหัสผ่าน
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid username or password');
      }

      // 5. สร้างและส่ง token (ถ้าใช้ JWT)
      // ...
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      // 6. ตอบกลับ client
      res.json({ message: 'Login successful', user }); // อาจส่งข้อมูลผู้ใช้กลับไปด้วย
    } catch (err) {
      next(err);
    }
  },
};

module.exports = authController;
