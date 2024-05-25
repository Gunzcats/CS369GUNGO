const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateJWT = require('../middleware/authMiddleware'); // ถ้าคุณมี middleware สำหรับตรวจสอบ JWT



// GET /api/products - ดึงข้อมูลสินค้าทั้งหมด
router.get('/', productController.getAllProducts);

// GET /api/products/:id - ดึงข้อมูลสินค้าตาม ID
router.get('/:id', productController.getProductById);

// POST /api/products - สร้างสินค้าใหม่ (ต้อง login ก่อน)
router.post('/', authenticateJWT, productController.createProduct);


// PUT /api/products/:id - อัปเดตสินค้า (ต้อง login ก่อน)
// router.put('/:id', authenticateJWT, productController.updateProduct);

// DELETE /api/products/:id - ลบสินค้า (ต้อง login ก่อน)
// router.delete('/:id', authenticateJWT, productController.deleteProduct);

module.exports = router;
