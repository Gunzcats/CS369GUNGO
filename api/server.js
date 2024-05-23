const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/database');
const authRoutes = require('./routes/authRoutes');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello from server!');
  });

app.get('/test-db', async (req, res) => {
  try {
    const result = await global.pool.request().query('SELECT 1');
    res.json({ message: 'Database connected!', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
