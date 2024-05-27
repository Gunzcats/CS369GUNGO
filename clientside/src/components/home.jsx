import React,{useEffect, useState} from 'react';
import { useNavigate, Link, } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'; // ปรับ path ตามโครงสร้าง project ของคุณ
import axios from 'axios';
import ProductCard from './productcard';
import Header from './header'

import ProductView from './productview';

function Home() {
  const { isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const handleLogout = () => {
    logout();
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
    
    <div className="min-h-screen bg-gray-50">
      {/* เนื้อหาอื่นๆ ของหน้า Home */}
      <Header className="grid grid-cols-3 gap-4 w-80 h-16"/>

      
    <main> 
       

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 px-4">
            {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      
    </div>
  );
}

export default Home;
