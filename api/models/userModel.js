const sql = require('mssql');
const { poolPromise } = require('../config/database');

const userModel = {
  id: { type: sql.Int, nullable: false, primary: true, identity: true },
  username: { type: sql.NVarChar(50), nullable: false, unique: true },
  password: { type: sql.NVarChar(255), nullable: false },
};

async function createUser(user) {
    try {
      const pool = await poolPromise;
      const request = pool.request();
  
      request.input('username', sql.NVarChar(50), user.username);
      request.input('password', sql.NVarChar(255), user.password);
  
      await request.query(`
        INSERT INTO users (username, password)
        VALUES (@username, @password);
      `);
      const newUserIdResult = await request.query('SELECT SCOPE_IDENTITY() AS id');
      const newUserId = newUserIdResult.recordset[0].id;
      return { id: newUserId };
    } catch (err) {
      throw new Error('Error creating user in database');
    }
  }
  
  async function getUserByUsername(username) {
    try {
      const pool = await poolPromise;
      if (!pool) { // ตรวจสอบว่า pool ไม่ใช่ null หรือ undefined
        throw new Error('Database connection not available');
      }
      const request = pool.request();
  
      request.input('username', sql.NVarChar(50), username);
  
      const result = await request.query(`
        SELECT * FROM users
        WHERE username = @username;
      `);
      if (result.recordset.length === 0) {
        return null; // Return null ถ้าไม่พบ user
    }
      return result.recordset[0]; // Assuming you only expect one user
    } catch (err) {
      console.error('Error getting user:', err);
      throw new Error('Error getting user from database');
    }
  }
  
  module.exports = { userModel, createUser, getUserByUsername };
  