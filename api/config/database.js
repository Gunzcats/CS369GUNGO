const sql = require('mssql');

const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: 'Gunzcats\\SQLSERVER',
    database: 'master'
  };

  sql.connect(config)
  .then(pool => {
    console.log('Connected to MSSQL');
    global.pool = pool; // สร้าง global pool เพื่อนำไปใช้ในส่วนอื่นๆ ของแอพพลิเคชัน
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err));