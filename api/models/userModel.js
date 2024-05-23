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
  
      const result = await request.query(`
        INSERT INTO users (username, password)
        VALUES (@username, @password);
      `);
  
      return result.recordset;
    } catch (err) {
      throw new Error('Error creating user in database');
    }
  }
  
  async function getUserByUsername(username) {
    try {
      const pool = await poolPromise;
      const request = pool.request();
  
      request.input('username', sql.NVarChar(50), username);
  
      const result = await request.query(`
        SELECT * FROM users
        WHERE username = @username;
      `);
  
      return result.recordset[0]; // Assuming you only expect one user
    } catch (err) {
      throw new Error('Error getting user from database');
    }
  }
  
  module.exports = { userModel, createUser, getUserByUsername };
  