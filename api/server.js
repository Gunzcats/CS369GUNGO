const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/database');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // กำหนดโฟลเดอร์สำหรับเก็บรูปภาพ
  },
  filename: function (req, file, cb) {
    const type = file.originalname
    const fourlastchar = (type.toString()).slice(type.length-4,type.length)
    const lastnameFile = fourlastchar  === ".jpg" || fourlastchar  === ".png" ? fourlastchar : fourlastchar === "jpeg" ? "." + fourlastchar : "";
    cb(null, Date.now() + '_' +(Math.floor(Math.random() * 90000) + 10000).toString() + lastnameFile);
  },
});
const upload = multer({ storage: storage });

const app = express();
const port = process.env.PORT || 5000;


app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
