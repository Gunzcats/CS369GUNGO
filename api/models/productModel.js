const sql = require('mssql');
const { poolPromise } = require('../config/database');

async function getAllProducts() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Products');
    return result.recordset;
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  }
}

async function getProductById(productId) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('productId', sql.Int, productId)
      .query('SELECT * FROM Products WHERE id = @productId');
    return result.recordset[0]; // Assuming there's only one product with the given ID
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  }
}

async function createProduct(product) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('name', sql.NVarChar, product.name)
      .input('image', sql.NVarChar, product.image)
      .input('price', sql.Decimal(10, 2), product.price)
      .input('description', sql.NVarChar, product.description)
      .query('INSERT INTO Products (name, image, price,productDescription) VALUES (@name, @image, @price,@description)');
    return result.rowsAffected[0]; // Number of rows affected
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  }
}

// ... (Add more functions for updateProduct, deleteProduct, etc.)

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  // ... (export other functions)
};
