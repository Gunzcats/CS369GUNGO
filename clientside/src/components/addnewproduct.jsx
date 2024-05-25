import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setProduct({ ...product, image: e.target.files[0] }); // เก็บไฟล์รูปภาพ
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", product.image);
      const res = await axios.post("/api/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    console.log(product.productDescription)
    try {
        const token = localStorage.getItem('token');
        console.log(product.image)
        await axios.post('/api/products', {
          name:product.name,
          image:imgUrl,
          price:product.price,
          description:product.productDescription
        }, {
           
            headers: { 
                      'Authorization': `Bearer ${token}`
            } // กำหนด header
          });

          // Redirect to Home
    navigate('/'); 

    // handle success
    alert('เพิ่มสินค้าสำเร็จ');
    setProduct({
      name: '',
      image: null,
      price: '',
      productDescription: '',
    });
      // handle success, e.g., redirect to product list or show a success message
    } catch (err) {
      // handle error, e.g., show an error message
    }
  };

  return (
    <>
    
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">ชื่อสินค้า:</label>
        <input type="text" id="name" name="name" value={product.name} required onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="image">รูปภาพ:</label>
        <input type="file" id="image" accept="image/*" name="image" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="price">ราคา:</label>
        <input type="number" id="price" name="price" value={product.price} required onChange={handleChange} />
      </div>
      <div> 
        <label htmlFor="productDescription">รายละเอียดสินค้า:</label>
        <textarea id="productDescription" name="productDescription" required value={product.productDescription} onChange={handleChange} />
      </div>
      <button type="submit">เพิ่มสินค้า</button>
    </form>

    </>
  );
}

export default AddNewProduct;
