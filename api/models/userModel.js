const sql = require('mssql');

const userSchema = new sql.Table('users')
    .columns([
        { name: 'id', type: sql.Int, nullable: false, primary: true, identity: true },
        { name: 'username', type: sql.NVarChar(50), nullable: false, unique: true },
        { name: 'password', type: sql.NVarChar(255), nullable: false },
    ]);

module.exports = userSchema;

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
  
  module.exports = { userSchema, createUser, getUserByUsername };
  