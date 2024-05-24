import React, { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function AddNewProduct() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthContext();
  const [product, setProduct] = useState({
    name: '',
    image: '',
    price: '',
    productDescription: '', // เพิ่ม field productDescription
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', product);
      // handle success, e.g., redirect to product list or show a success message
    } catch (err) {
      // handle error, e.g., show an error message
    }
  };

  return (
    <>
    {!isAuthenticated ? ( // ถ้า user ไม่ได้ login ให้ redirect ไปยัง /login
        <navigate to="/login" />
      ) : (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">ชื่อสินค้า:</label>
        <input type="text" id="name" name="name" value={product.name} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="image">รูปภาพ:</label>
        <input type="text" id="image" name="image" value={product.image} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="price">ราคา:</label>
        <input type="number" id="price" name="price" value={product.price} onChange={handleChange} />
      </div>
      <div> 
        <label htmlFor="productDescription">รายละเอียดสินค้า:</label>
        <textarea id="productDescription" name="productDescription" value={product.productDescription} onChange={handleChange} />
      </div>
      <button type="submit">เพิ่มสินค้า</button>
    </form>
)}
    </>
  );
}

export default AddNewProduct;
