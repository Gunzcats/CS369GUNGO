import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/productcard.css'; // สร้างไฟล์ CSS สำหรับ styling

function ProductCard({ product }) {
  const { id, name, image, price, productDescription } = product;

  return (
    <div className="product-card">
      <Link to={`/product/${id}`}>
        <img src={`/uploads/${image}`} alt={name} className="product-image" />
      </Link>
      <div className="product-details">
        <h2 className="product-name">{name}</h2>
        <p className="product-price">{price} บาท</p>
        {/* <p className="product-description">{productDescription}</p> */} 
      </div>
    </div>
  );
}

export default ProductCard;
