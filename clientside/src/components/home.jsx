import React,{useEffect, useState } from 'react';
import { useNavigate, Link, } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'; // ปรับ path ตามโครงสร้าง project ของคุณ
import axios from 'axios';
import ProductCard from './productcard';

function Home() {
  const { isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const handleLogout = () => {
    logout();
    console.log(isAuthenticated)
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        // Handle error (เช่น แสดงข้อความแจ้งเตือน)
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* เนื้อหาอื่นๆ ของหน้า Home */}

      {/* Conditional rendering ของปุ่ม Login/Logout */}
      {isAuthenticated ? (
        <div>
        <button onClick={handleLogout}>Logout</button>
        <Link to="/addProduct">
          <button>Add Product</button> 
        </Link>
      </div>
      ) : (
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}
    <div className="product-grid">
      {products.map(product => (
      <ProductCard key={product.id} product={product} />
  ))}
</div>

    </div>
  );
}

export default Home;
