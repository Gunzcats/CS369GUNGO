const sql = require('mssql');

const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: 'localhost\\LocalDB',
    database: 'master',
    options: {
      // encrypt: false, 
      trustServerCertificate: true, // บังคับให้ Node.js เชื่อถือ self-signed certificate
    },
  };

  const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log('Connected to MSSQL database');
    return pool;
  })
  .catch((err) => {
    console.error('Error connecting to MSSQL database:', err);
    throw err; // Rethrow the error to handle it elsewhere
  });

module.exports = { sql, poolPromise };